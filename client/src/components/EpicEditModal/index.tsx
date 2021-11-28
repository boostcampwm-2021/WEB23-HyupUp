import React from 'react';
import S from './style';
import { Button } from '@/lib/design';
import { EpicType } from '@/types/epic';

interface EpicEditModalProps {
  epicData: EpicType;
  value: string;
  handleChange: (e: React.ChangeEvent) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

const EpicEditModal = ({ epicData, value, handleChange, handleFormSubmit }: EpicEditModalProps) => {
  return (
    <S.Form onSubmit={handleFormSubmit}>
      <S.Input type="text" placeholder={epicData.name} value={value} onChange={handleChange} />
    </S.Form>
  );
};

export default EpicEditModal;
