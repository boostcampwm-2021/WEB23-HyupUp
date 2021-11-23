import styled from 'styled-components';

const Container = styled.section`
  width: 941px;

  flex-direction: column;
  justify-content: center;

  margin: 0 0 0 26px;
  padding: 18px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray100};
`;

const ItemListViewer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThreeDot = styled.img`
  padding: 0px 10px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 10px 0px;
`;

const ModalText = styled.div`
  margin: 40px 0px;
  font: ${({ theme }) => theme.font.body_regular};
`;

export { Container, ItemListViewer, ThreeDot, SearchBarContainer, ModalText };
