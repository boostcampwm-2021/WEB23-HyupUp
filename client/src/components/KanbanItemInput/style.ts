import styled from 'styled-components';

export const Input = styled.input`
  background-color: ${({ theme }) => theme.color.gray100};

  margin-top: 5px;
  padding-left: 8px;
  padding-top: 5px;
  width: 95%;
  height: 30px;

  font: ${({ theme }) => theme.font.bold_small};
  color: ${({ theme }) => theme.color.gray400};
  ::placeholder {
    font: ${({ theme }) => theme.font.bold_small};
    color: ${({ theme }) => theme.color.gray400};
  }

  cursor: grab;
`;

export const InputContainer = styled.article`
  display: flex;
  flex-direction: column;
  p {
    font: ${({ theme }) => theme.font.bold_extra_small};
    color: ${({ theme }) => theme.color.gray400};
    font-size: 11px;
    padding: 5px 0 10px 8px;
  }
`;
