import styled from 'styled-components';

const ItemContainer = styled.div`
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 15px 0px;
  padding-right: 25px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;

  margin-left: 57px;

  border-radius: 32px;
`;

const Text = styled.span`
  font: ${({ theme }) => theme.font.body_regular};
`;

const TextContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  aligns-content: center;
`;

export { ItemContainer, Avatar, Text, TextContainer };
