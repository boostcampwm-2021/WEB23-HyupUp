import React, { useState } from 'react';
import S from './style';
import { EpicType } from '@/types/epic';
import { getYMD } from '@/lib/utils/date';
import { Modal } from '@/lib/design';
import { useEpicDispatch } from '@/lib/hooks/useContextHooks';
import { updateEpicById } from '@/lib/api/epic';

interface EpicEditModalProps {
  showEditModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  epicData: EpicType;
  value: string;
  handleChange: (e: React.ChangeEvent) => void;
}

const formatDate = (date: Date) => {
  const { year, month, day } = getYMD(date);
  return `${year}-${month + 1}-${day}`;
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEpic = { ...epicData, name: value, startAt: startDate, endAt: endDate };
    updateEpicById(epicData.id, updatedEpic);
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic,
    });
    setShowModal(false);
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
          placeholder={epicData.name}
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
              onChange={(e) => obj.setDate(e.target.valueAsDate ?? new Date())}
            />
          </S.Label>
        ))}
      </S.Form>
    </Modal>
  );
};

export default EpicEditModal;
