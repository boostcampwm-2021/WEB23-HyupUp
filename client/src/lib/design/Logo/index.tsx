import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '@public/hyupup-logo.svg';

const Logo = styled(NavLink)`
  display: block;
  width: 165px;
  height: 70px;
  background-image: url(${logo});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;
export default Logo;
