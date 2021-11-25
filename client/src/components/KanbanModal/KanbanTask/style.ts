import styled from 'styled-components';

export const KanbanTaskWrapper = styled.article`
  width: 700px;
  height: 70px;
  font: ${({ theme }) => theme.font.bold_regular};
  background-color: ${({ theme }) => theme.color.gray100};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px;

  h4 {
    padding-left: 30px;
  }

  p {
    width: 130px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-right: 30px;
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
    font: ${({ theme }) => theme.font.bold_regular};
    width: 500px;
    height: 30px;
  }
`;
