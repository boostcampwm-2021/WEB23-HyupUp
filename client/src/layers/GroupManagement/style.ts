import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-direction: column;

  width: 941px;

  margin: 0 0 0 26px;
  padding: 18px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray100};
`;

const ItemListViewer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export { Container, ItemListViewer };
