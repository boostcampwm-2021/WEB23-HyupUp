import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  height: 95vh;
`;

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

const InputBox = styled.input`
  width: 40%;
  padding: 10px 10px;
  margin: 15px 0px;

  border-radius: 8px;
`;
const FormBox = styled.form`
  width: 70%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  padding: 10px 0px;
  background-color: ${({ theme }) => theme.color.gray100};

  border-radius: 8px;
`;
const Title = styled(NavLink)`
  font: ${({ theme }) => theme.font.display_medium};
  color: ${({ theme }) => theme.color.gray500};
  text-align: center;
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

const Text = styled.p`
  margin: 10px 20px;
  font: ${({ theme }) => theme.font.body_regular};
`;

export {
  Container,
  FormBox,
  Avatar,
  AvatarContainer,
  InputBox,
  Title,
  AvatarSelectContainer,
  LeftArrow,
  RightArrow,
  Text,
};
