import styled from 'styled-components';

const EmailInputBarContainer = styled.form`
  width: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 8px;
`;

const InputBox = styled.input`
  width: 400px;
  height: 42px;

  background: ${({ theme }) => theme.color.gray100};
  font: ${({ theme }) => theme.font.body_regular};

  margin: 40px 0px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.gray500};
    border-radius: 8px;
  }
`;

const ButtonContainer = styled.div`
  width: 400px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & button {
    width: calc(50% - 16px);

    & + & {
      margin-left: 16px;
    }
  }
`;

export { EmailInputBarContainer, InputBox, ButtonContainer };
