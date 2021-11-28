import styled from 'styled-components';

const AvatarContainer = styled.div`
  width: 250px;
  background-color: none;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.img`
  width: 250px;
  height: 250px;

  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 2000px;
`;

const AvatarSelectContainer = styled.div`
  width: 50%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftArrow = styled.img`
  width: 80px;
  height: 80px;

  color: ${({ theme }) => theme.color.gray300};

  transform: rotateY(180deg);
`;

const RightArrow = styled.img`
  width: 80px;
  height: 80px;

  color: ${({ theme }) => theme.color.gray300};
`;

export { Avatar, AvatarContainer, AvatarSelectContainer, LeftArrow, RightArrow };
