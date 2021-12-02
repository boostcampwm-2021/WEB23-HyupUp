import styled, { keyframes } from 'styled-components';

const Styled = {
  KanbanTaskWrapper: styled.article`
    width: 700px;
    height: 70px;
    border-radius: 10px;
    font: ${({ theme }) => theme.font.bold_regular};
    background-color: ${({ theme }) => theme.color.gray100};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 10px 70px 10px 20px;

    h4 {
      padding-left: 30px;
    }

    span {
      font: ${({ theme }) => theme.font.bold_extra_small};
      font-size: 14px;
    }

    input {
      background-color: ${({ theme }) => theme.color.gray100};
      font: ${({ theme }) => theme.font.bold_regular};
      ::placeholder {
        color: ${({ theme }) => theme.color.gray500};
      }
      width: 500px;
      height: 30px;
    }
  `,
  Profile: styled.img`
    width: 40px;
    height: 40px;
    margin-right: 16px;
    border-radius: 20px;
  `,
  MemberContainer: styled.div`
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      width: 70%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-left: 10px;
    }
    img {
      width: 15px;
    }

    div > img {
      opacity: 0;
    }

    ul {
      position: absolute;
      top: 50px;
      right: 12px;
    }

    .userImage {
      width: 50px;
    }
  `,
  DropdownWrapper: styled.div`
    position: relative;
    img {
      width: 25px;
      margin-right: 35px;
    }
  `,

  DeleteIcon: styled.img<{ showDelete: boolean }>`
    padding: 5px;
    margin-right: 20px;

    cursor: pointer;
    opacity: ${({ showDelete }) => (showDelete ? 1 : 0)};
    transition: opacity 0.3s;
  `,

  DeleteConfirm: styled.h4`
    margin: 32px;
    font: ${({ theme }) => theme.font.bold_medium};
  `,
};

export default Styled;
