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
    height: 100%;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;
  `,
  EpicEntry: styled.ul`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 250px;
    padding: 64px 0 32px 0;

    border-right: 3px solid ${({ theme }) => theme.color.gray100};

    overflow: scroll;

    & button {
      position: absolute;
      bottom: 8px;

      width: 100%;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  EpicEntrySpacer: styled.li<{ activated: boolean }>`
    margin: 5px 0;
    padding: 20px 0;

    font: ${({ theme }) => theme.font.body_regular};
    color: ${({ theme }) => theme.color.gray400};
    border-top: ${({ theme, activated }) =>
      activated ? `4px solid ${theme.color.blue200}` : `4px solid transparent`};
    white-space: nowrap;
  `,
};

export default S;
