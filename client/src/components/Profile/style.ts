import styled from 'styled-components';

export const Styled = {
  Profile: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 10%;
    position: relative;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: black;

      cursor: pointer;
    }

    .list-container {
      width: 120px;
      height: 70px;

      position: absolute;
      top: 60px;
      right: 35px;

      background-color: ${({ theme }) => theme.color.gray100};
      border-radius: 10px;
    }

    .dropdown-list {
      width: 100%;
      height: 80%;

      display: flex;
      flex-direction: column;
      justify-content: space-around;

      list-style: none;
      font: ${({ theme }) => theme.font.bold_extra_small};
    }

    li {
      padding-top: 15px;
      padding-left: 15px;
    }

    .logout {
      &:hover {
        cursor: pointer;
      }
    }
  `,
};
