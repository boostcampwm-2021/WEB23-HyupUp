import styled from 'styled-components';

const StyledButtonWrapper = styled.div`
  button {
    font: ${({ theme }) => theme.font.bold_small};
    color: ${({ theme }) => theme.color.gray300};
    background-color: ${({ theme }) => theme.color.white};
  }
`;

export default StyledButtonWrapper;
