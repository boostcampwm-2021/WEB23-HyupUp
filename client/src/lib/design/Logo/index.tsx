import styled from 'styled-components';
import logo from '@public/hyupup-logo.svg';
import Link from '@/lib/common/link/Link';

const Logo = styled(Link)`
  display: block;
  width: 165px;
  height: 70px;
  background-image: url(${logo});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;
export default Logo;
