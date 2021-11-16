import styled from 'styled-components';

const ItemContainer = styled.ul`
  width: 705px;
  height: 70px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.color.gray200};
`;

const Text = styled.span`
  margin-left: 30px;

  font: ${({ theme }) => theme.font.body_medium};
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-right: 30px;
`;

const Avatar = styled.img`
  width: 45px;
  height: 45px;

  border-radius: 25px;
`;

export { ItemContainer, Text, UserProfile, Avatar };
