import React, { useEffect, useState } from 'react';
import S from './style';
import { EpicType } from '@/types/epic';
import { getYMD } from '@/lib/utils/date';
import { Modal } from '@/lib/design';

interface EpicEditModalProps {
  title?: string;
  showEditModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  epicData: EpicType;
  value: string;
  handleChange: (e: React.ChangeEvent) => void;
  handleFormSubmit: (e: React.FormEvent, datePair: { startDate: Date; endDate: Date }) => void;
}

const formatDate = (date: Date) => {
  const { year, month, day } = getYMD(date);
  return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

const EpicEditModal = ({
  title,
  showEditModal,
  setShowModal,
  epicData,
  value,
  handleChange,
  handleFormSubmit,
}: EpicEditModalProps) => {
  const [startDate, setStartDate] = useState(epicData.startAt);
  const [endDate, setEndDate] = useState(epicData.endAt);

  useEffect(() => {
    setStartDate(epicData.startAt);
    setEndDate(epicData.endAt);
  }, [epicData]);

  return (
    <Modal
      shouldConfirm
      title={title ?? '에픽 정보 수정'}
      visible={showEditModal}
      onClose={() => setShowModal(false)}
      onClickOk={(e) => handleFormSubmit(e, { startDate, endDate })}
    >
      <S.Form onSubmit={(e) => handleFormSubmit(e, { startDate, endDate })}>
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
