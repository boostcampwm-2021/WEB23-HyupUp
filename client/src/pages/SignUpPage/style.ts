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
  height: 250px;
  background-color: none;
`;

const Avatar = styled.img`
  width: 250px;
  height: 250px;

  border: 1px solid black;
  border-radius: 2000px;
`;

const AddBtn = styled.button`
  width: 50px;
  height: 50px;

  position: relative;
  bottom: 60px;
  right: 15px;
  float: right;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 3px solid ${({ theme }) => theme.color.white};
  border-radius: 25px;
  background-color: ${({ theme }) => theme.color.blue200};
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

  padding: 20px 0px;
  background-color: ${({ theme }) => theme.color.gray100};

  border-radius: 8px;
`;
const Title = styled(NavLink)`
  font: ${({ theme }) => theme.font.display_medium};
  color: ${({ theme }) => theme.color.gray500};
  text-align: center;
`;

export { Container, FormBox, Avatar, AvatarContainer, AddBtn, InputBox, Title };
