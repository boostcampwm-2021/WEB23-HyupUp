import React from 'react';
import styled from 'styled-components';

const Styled = {
  Container: styled.section`
    width: 941px;
    background-color: ${({ theme }) => theme.color.gray100};
  `,

  Title: styled.h3``,

  TaskColumn: styled.article``,
};

export default Styled;
