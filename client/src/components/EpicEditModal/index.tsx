import React, { useState } from 'react';
import S from './style';
import { updateEpicById } from '@/lib/api/epic';
import { Button } from '@/lib/design';
import { useEpicDispatch } from '@/lib/hooks/useContextHooks';
import { EpicType } from '@/types/epic';

interface EpicEditModalProps {
  epicData: EpicType;
  setShowModal: (state: boolean) => void;
}

const EpicEditModal = ({ epicData, setShowModal }: EpicEditModalProps) => {
  const dispatchEpic = useEpicDispatch();
  const [value, setValue] = useState(epicData.name);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEpic = { ...epicData, name: value };
    updateEpicById(epicData.id, updatedEpic);
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic,
    });
    setShowModal(false);
  };

  const handleChange = (ev: React.ChangeEvent) => {
    setValue((ev.target as HTMLInputElement).value);
  };

  return (
    <S.Form onSubmit={handleFormSubmit}>
      <S.Input type="text" placeholder={epicData.name} value={value} onChange={handleChange} />
      <Button category="default" size="small" onClick={handleFormSubmit}>
        OK
      </Button>
    </S.Form>
  );
};

export default EpicEditModal;
