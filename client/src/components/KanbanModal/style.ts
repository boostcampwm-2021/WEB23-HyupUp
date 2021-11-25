import styled from 'styled-components';

const Styled = {
  ContentWrapper: styled.section`
    width: 700px;
    height: 500px;
    overflow: scroll;
    z-index: 999;

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
      margin-right: 40px;
      font: ${({ theme }) => theme.font.bold_regular};
    }

    button {
      margin: 0;
    }
  `,
};

export default Styled;
