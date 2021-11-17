import styled from 'styled-components';

const Styled = {
  Container: styled.li`
    display: flex;
    align-items: center;

    height: 69px;
    padding: 0 20px;
    margin-bottom: 5px;

    border-radius: 8px;
    background-color: white;

    font: ${({ theme }) => theme.font.body_regular};

    &:hover {
      background-color: ${({ theme }) => theme.color.gray100};
    }
  `,
  Title: styled.div`
    display: flex;
    align-items: center;

    width: 120px;
    margin-right: 60px;

    overflow-x: hidden;
    & img {
      margin-right: 10px;
    }
    & h3 {
      font: ${({ theme }) => theme.font.bold_regular};
    }
  `,
  Content: styled.div`
    width: 350px;
    margin-right: 50px;
  `,
};

export default Styled;
