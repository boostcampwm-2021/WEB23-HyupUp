import styled from 'styled-components';

const Container = styled.div`
  width: 367px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 25px;
  padding-bottom: 29px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray100};
`;

const Name = styled.p`
  margin-left: 32px;

  font: ${({ theme }) => theme.font.body_regular};
`;

const StatusContainer = styled.div`
  width: 277px;
  height: 65px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UsersContainer = styled.div`
  width: 310px;
  height: 650px;

  padding-top: 29px;

  border-radius: 8px;
  background: ${({ theme }) => theme.color.white};
`;

export { Container, Name, StatusContainer, UsersContainer };
