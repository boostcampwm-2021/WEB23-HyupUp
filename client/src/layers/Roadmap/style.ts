import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    width: 941px;

    margin: 0 0 64px 26px;
    padding: 18px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray100};

    font: ${({ theme }) => theme.font.body_regular};
    color: ${({ theme }) => theme.color.gray400};
  `,
  Title: styled.h2`
    margin-bottom: 16px;

    font: ${({ theme }) => theme.font.bold_medium};
  `,
  Content: styled.section`
    display: flex;

    width: 100%;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;
  `,
  EpicEntry: styled.ul`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 221px;
    padding: 16px;

    border-right: 3px solid ${({ theme }) => theme.color.gray100};

    overflow: scroll;

    & button {
      width: 100%;
    }
  `,
  EpicEntryItem: styled.li`
    margin: 27px 0;

    font: ${({ theme }) => theme.font.body_regular};
    color: ${({ theme }) => theme.color.gray400};

    &:nth-child(1) {
      margin-top: 64px;
    }
  `,
};

export default S;
