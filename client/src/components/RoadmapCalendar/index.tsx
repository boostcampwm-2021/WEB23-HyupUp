import React, { useState } from 'react';
import S from '@/components/RoadmapCalendar/style';

const RoadmapCalendar = () => {
  const [date, setDate] = useState(new Date());
  return (
    <S.RoadmapCalendar>
      <S.CalendarHead>{date.getMonth() + 1}월</S.CalendarHead>
      <S.DaysWrapper>
        {Array.from(new Array(14), (_, i) => (
          // TODO: key props를 index 값이 아닌 date 값과 연관한 값으로 변경
          <div key={i}>{i + 1}</div>
        ))}
      </S.DaysWrapper>
    </S.RoadmapCalendar>
  );
};

export default RoadmapCalendar;
