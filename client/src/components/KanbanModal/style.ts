import styled from 'styled-components';

const Styled = {
  ContentWrapper: styled.section`
    height: 550px;
    width: 750px;
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      text-align: center;
      margin-bottom: 40px;
      font: ${({ theme }) => theme.font.display_medium};
    }
  `,
  ControlWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 700px;
    margin-bottom: 20px;

    p {
      font: ${({ theme }) => theme.font.bold_regular};
    }

    h4 {
      font: ${({ theme }) => theme.font.bold_small};
    }

    button {
      margin: 0;
      margin-left: 50px;
    }

    ul {
      position: absolute;
      top: 30px;
      right: -5px;
    }
  `,
  MemberContaienr: styled.div`
    p {
      margin-right: 40px;

      font: ${({ theme }) => theme.font.bold_regular};
    }
  `,
};

export default Styled;
