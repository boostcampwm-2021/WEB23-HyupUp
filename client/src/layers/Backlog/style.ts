import styled from 'styled-components';

const Container = styled.section`
  width: 947px;
  min-height: 600px;

  margin-left: 26px;

  background-color: ${({ theme }) => theme.color.gray100};
  border-radius: 8px;
`;

const ItemContainer = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-top: 30px;
`;

export { ItemContainer, Container };
