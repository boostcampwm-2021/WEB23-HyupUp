import styled from 'styled-components';

const LogInFormContainer = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 10px;
  border-radius: 8px;
`;

const InputBox = styled.input`
  width: 40%;
  height: 50px;
  margin-bottom: 40px;
  padding: 0px 20px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
  font: ${({ theme }) => theme.font.body_regular};
`;

export { LogInFormContainer, InputBox };
