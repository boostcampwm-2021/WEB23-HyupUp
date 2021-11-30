import styled from 'styled-components';

const InputBox = styled.input`
  width: 40%;
  padding: 10px 10px;
  margin: 15px 0px;

  border-radius: 8px;
`;
const FormBox = styled.form`
  width: 70%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  padding: 10px 0px;
  background-color: ${({ theme }) => theme.color.gray100};

  border-radius: 8px;
`;

export { InputBox, FormBox };
