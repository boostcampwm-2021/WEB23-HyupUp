import styled from 'styled-components';

const Container = styled.div`
  width: 367px;
  height: 784px;

  padding-top: 50px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray100};
`;

const AvatorContainer = styled.div`
  width: 55px;
  height: 49px;

  margin-left: 45px;

  background-color: none;
`;

const AvatorImage = styled.img`
  width: 45px;
  height: 45px;

  border-radius: 25px;
`;

interface Props {
  backgroundColor: string;
}

const AvatorStatus = styled.div<Props>`
  width: 20px;
  height: 20px;

  position: relative;
  bottom: 20px;
  float: right;

  border: 3px solid ${({ theme }) => theme.color.white};
  border-radius: 15px;
  background-color: ${({ theme, backgroundColor }) => theme.color[backgroundColor]};
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

export { Container, AvatorContainer, AvatorImage, AvatorStatus, Name, StatusContainer };
