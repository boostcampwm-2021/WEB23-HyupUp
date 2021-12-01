import React, { useEffect, useState } from 'react';
import S from './style';
import { EpicType } from '@/types/epic';
import { getYMD, isLatter, isSameDay } from '@/lib/utils/date';
import { Modal } from '@/lib/design';
import { useEpicDispatch } from '@/lib/hooks/useContextHooks';
import { updateEpicById } from '@/lib/api/epic';
import { useSocketSend } from '@/lib/hooks';
import { toast } from 'react-toastify';
import { errorMessage } from '@/lib/common/message';
import { checkStringInput } from '@/lib/utils/bytes';

interface EpicEditModalProps {
  showEditModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  epicData: EpicType;
  value: string;
  handleChange: (e: React.ChangeEvent) => void;
}

const formatDate = (date: Date) => {
  const { year, month, day } = getYMD(date);
  return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

const EpicEditModal = ({
  showEditModal,
  setShowModal,
  epicData,
  value,
  handleChange,
}: EpicEditModalProps) => {
  const [startDate, setStartDate] = useState(epicData.startAt);
  const [endDate, setEndDate] = useState(epicData.endAt);
  const dispatchEpic = useEpicDispatch();
  const emitUpdateEpic = useSocketSend('UPDATE_EPIC_BAR');

  useEffect(() => {
    setStartDate(epicData.startAt);
    setEndDate(epicData.endAt);
  }, [epicData]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkStringInput(value)) {
      toast.error(errorMessage.EPIC_TITLE_LENGTH_LIMIT);
      return;
    }

    if (isLatter(startDate, endDate) && !isSameDay(startDate, endDate)) {
      toast.error(errorMessage.START_DATE_IS_LATTER);
      return;
    }
    const updatedEpic = { ...epicData, name: value, startAt: startDate, endAt: endDate };
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic,
    });
    setShowModal(false);

    await updateEpicById(epicData.id, updatedEpic);
    emitUpdateEpic(epicData.id);
  };

  return (
    <Modal
      shouldConfirm
      title="에픽 정보 수정"
      visible={showEditModal}
      onClose={() => setShowModal(false)}
      onClickOk={handleFormSubmit}
    >
      <S.Form onSubmit={handleFormSubmit}>
        <S.Input
          type="text"
          placeholder={'에픽 제목을 입력하세요 (255자 이내)'}
          value={value}
          onChange={handleChange}
          isTitle
        />
        {[
          { label: '시작일', date: startDate, setDate: setStartDate },
          { label: '종료일', date: endDate, setDate: setEndDate },
        ].map((obj, i) => (
          <S.Label key={i}>
            <span>{obj.label}</span>
            <S.Input
              type="date"
              value={formatDate(obj.date)}
              onChange={(e) => obj.setDate(e.target.valueAsDate ?? obj.date)}
            />
          </S.Label>
        ))}
      </S.Form>
    </Modal>
  );
};

export default EpicEditModal;
