import styled from 'styled-components';

const KanbanModalTitleWrapper = styled.div`
  position: relative;
  input {
    text-align: center;
    margin-bottom: 40px;
    padding: 20px;
    width: 300px;
    font: ${({ theme }) => theme.font.bold_large}}
    ::placeholder {
      font: ${({ theme }) => theme.font.bold_large};
      color: ${({ theme }) => theme.color.gray500};
    }
  }

  img {
    opacity: 0;
    position: absolute;
    top: 22px;
    transition: 100ms ease-in 0s;
  }

  img:hover {
    opacity: 1;
  }
`;

export default KanbanModalTitleWrapper;
