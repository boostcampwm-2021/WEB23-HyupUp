import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  height: 95vh;
`;

const Title = styled(NavLink)`
  font: ${({ theme }) => theme.font.display_medium};
  color: ${({ theme }) => theme.color.gray500};
  text-align: center;
`;
const Text = styled.p`
  margin: 10px 20px;
  font: ${({ theme }) => theme.font.body_regular};
`;

export { Container, Title, Text };
