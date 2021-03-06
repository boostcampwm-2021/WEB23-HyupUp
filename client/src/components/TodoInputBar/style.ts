import styled from 'styled-components';

const TodoInputBarContainer = styled.form`
  width: 753px;
  height: 80px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.color.gray100};
`;

const InputBox = styled.input`
  width: 580px;
  height: 42px;
  margin-left: 20px;

  background: none;
  font: ${({ theme }) => theme.font.body_regular};

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.gray500};
    border-radius: 8px;
  }
`;

export { TodoInputBarContainer, InputBox };
