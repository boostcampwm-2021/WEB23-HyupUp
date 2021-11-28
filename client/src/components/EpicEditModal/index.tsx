import React, { useState } from 'react';
import S from './style';
import { EpicType } from '@/types/epic';
import { getYMD } from '@/lib/utils/date';

interface EpicEditModalProps {
  epicData: EpicType;
  value: string;
  handleChange: (e: React.ChangeEvent) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

const formatDate = (date: Date) => {
  const { year, month, day } = getYMD(date);
  return `${year}-${month + 1}-${day}`;
};

const EpicEditModal = ({ epicData, value, handleChange, handleFormSubmit }: EpicEditModalProps) => {
  const [startDate, setStartDate] = useState(epicData.startAt);
  const [endDate, setEndDate] = useState(epicData.endAt);

  return (
    <S.Form onSubmit={handleFormSubmit}>
      <S.Input
        type="text"
        placeholder={epicData.name}
        value={value}
        onChange={handleChange}
        isTitle
      />
      <S.Label>
        <span>시작일</span>
        <S.Input
          type="date"
          value={formatDate(startDate)}
          onChange={(e) => setStartDate(e.target.valueAsDate ?? new Date())}
        />
      </S.Label>
      <S.Label>
        <span>종료일</span>
        <S.Input
          type="date"
          value={formatDate(endDate)}
          onChange={(e) => setEndDate(e.target.valueAsDate ?? new Date())}
        />
      </S.Label>
    </S.Form>
  );
};

export default EpicEditModal;
