import styled from 'styled-components';

const Container = styled.div`
  width: 367px;
  height: 784px;

  padding-top: 50px;

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

  margin-top: 13px;
  margin-bottom: 13px;
`;

export { Container, Name, StatusContainer };
