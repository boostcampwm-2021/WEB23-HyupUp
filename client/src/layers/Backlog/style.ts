import styled from 'styled-components';

const ItemContainer = styled.section`
  width: 947px;
  min-height: 600px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-left: 26px;

  background-color: ${({ theme }) => theme.color.gray100};
  border-radius: 8px;
`;

export { ItemContainer };
