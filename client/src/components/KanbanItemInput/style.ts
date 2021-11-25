import styled from 'styled-components';

const Input = styled.input`
  background-color: ${({ theme }) => theme.color.gray100};

  margin-top: 15px;
  padding: 15px;
  width: 90%;
  height: 30px;

  font: ${({ theme }) => theme.font.bold_extra_small};
  font-size: 14px;
  cursor: grab;
`;

export default Input;
