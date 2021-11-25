import styled from 'styled-components';

export const Input = styled.input`
  background-color: ${({ theme }) => theme.color.gray100};

  margin-top: 5px;
  padding: 15px;
  width: 90%;
  height: 30px;

  font: ${({ theme }) => theme.font.bold_small};
  color: ${({ theme }) => theme.color.gray500};
  font-size: 14px;
  cursor: grab;
`;

export const InputContainer = styled.article`
  display: flex;
  flex-direction: column;
  p {
    font: ${({ theme }) => theme.font.bold_small};
    padding-left: 15px;
    padding-bottom: 10px;
  }
`;
