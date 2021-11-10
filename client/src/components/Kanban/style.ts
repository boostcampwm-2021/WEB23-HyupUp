import React from 'react';
import styled from 'styled-components';

const Styled = {
  Container: styled.section`
    display: flex;
    flex-direction: column;

    width: 941px;

    margin: 0 0 0 26px;
    padding: 18px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray100};
  `,

  Title: styled.h3`
    height: 50px;
    font: ${({ theme }) => theme.font.bold_medium};
  `,

  ColumnContainer: styled.section`
    width: 100%;
    height: calc(100% - 50px);

    display: flex;
    justify-content: space-around;

    font: ${({ theme }) => theme.font.body_regular};
  `,

  Column: styled.article`
    width: 30%;
    height: 100%;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.white};
  `,
};

export default Styled;
