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

    font: ${({ theme }) => theme.font.body_medium};
  `,

  Column: styled.div`
    width: 30%;
    height: 100%;

    display: flex;
    flex-direction: column;

    align-items: center;
    position: relative;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.white};

    h4 {
      padding-top: 12px;
      font: ${({ theme }) => theme.font.bold_regular};
    }

    button {
      width: 250px;
      height: 50px;

      position: absolute;
      bottom: 15px;

      color: ${({ theme }) => theme.color.gray400};
    }
  `,

  KanBanItem: styled.article`
    width: 90%;
    height: 60px;
    border-radius: 8px;
    margin-top: 10px;

    background-color: ${({ theme }) => theme.color.gray100};

    input {
      background-color: ${({ theme }) => theme.color.gray100};

      margin-top: 15px;
      margin-left: 10px;
      padding: 5px;
      width: 90%;
      height: 30px;

      font: ${({ theme }) => theme.font.bold_small};
      font-size: 14px;
    }
  `,
};

export default Styled;
