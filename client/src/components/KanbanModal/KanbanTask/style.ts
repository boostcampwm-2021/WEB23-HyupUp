import styled from 'styled-components';

const Styled = {
  KanbanTaskWrapper: styled.article`
    width: 700px;
    height: 120px;
    border-radius: 10px;
    font: ${({ theme }) => theme.font.bold_regular};
    background-color: ${({ theme }) => theme.color.gray100};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 10px 30px;

    h4 {
      padding-left: 30px;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    span {
      font: ${({ theme }) => theme.font.bold_extra_small};
      font-size: 14px;
    }

    input {
      background-color: ${({ theme }) => theme.color.gray100};
      font: ${({ theme }) => theme.font.bold_medium};
      width: 500px;
      height: 30px;
    }
  `,
  MemberContainer: styled.div`
    width: 130px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    p {
      width: 80%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  `,
};

export default Styled;
