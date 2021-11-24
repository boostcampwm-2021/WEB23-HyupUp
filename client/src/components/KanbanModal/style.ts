import styled from 'styled-components';

const ContentWrapper = styled.section`
  width: 700px;
  height: 500px;
  overflow: scroll;
  z-index: 999;

  h3 {
    margin-bottom: 30px;
    font: ${({ theme }) => theme.font.display_medium};
  }
`;

export default ContentWrapper;
