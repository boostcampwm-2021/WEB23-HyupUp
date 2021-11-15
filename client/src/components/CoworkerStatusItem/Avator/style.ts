import styled from 'styled-components';

const AvatorContainer = styled.div`
  width: 55px;
  height: 49px;

  margin-left: 29px;

  background-color: none;
`;

const AvatorImage = styled.img`
  width: 45px;
  height: 45px;

  border-radius: 25px;
`;

interface UserAvatorProps {
  status: boolean;
}

const AvatorStatus = styled.div<UserAvatorProps>`
  width: 20px;
  height: 20px;

  position: relative;
  bottom: 20px;
  float: right;

  border: 3px solid ${({ theme }) => theme.color.white};
  border-radius: 15px;
  background-color: ${({ theme, status }) => (status ? theme.color.green300 : theme.color.gray300)};
`;

export { AvatorImage, AvatorContainer, AvatorStatus };
