import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    width: 941px;

    margin: 0 0 0 26px;
    padding: 18px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray100};

    font: ${({ theme }) => theme.font.body_regular};
  `,
  Title: styled.h2`
    margin-bottom: 16px;

    font: ${({ theme }) => theme.font.bold_medium};
  `,
  Content: styled.section`
    display: flex;

    width: 100%;
    height: 100%;
  `,
  ContentEntry: styled.aside`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 206px;
    height: 100%;
    margin-right: 16px;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;

    & > ul {
      width: 100%;
      height: 100%;

      overflow: scroll;
    }

    & > button {
      position: absolute;
      bottom: 0;

      width: calc(100% - 16px);
      margin: 8px;
    }
  `,
  ContentEntryItem: styled.li`
    color: ${({ theme }) => theme.color.gray400};
  `,
  MainContent: styled.section`
    position: relative;

    width: 100%;
    height: 100%;
    padding: 16px;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;
  `,
};

export default S;
