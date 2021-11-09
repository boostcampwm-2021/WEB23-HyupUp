import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  height: 100vh;
`;

export const Logo = styled.p`
  font: ${theme.font.display_medium};
`;

export const Title = styled.p`
  margin: 5px;

  font: ${theme.font.display_large};
`;

export const Body = styled.p`
  margin: 5px;

  color: #8993a1;

  font: ${theme.font.body_small};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
