import styled from 'styled-components';

const Styled = {
  ContentWrapper: styled.section`
    width: 800px;
    height: 500px;
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

    button {
      margin: 0;
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
