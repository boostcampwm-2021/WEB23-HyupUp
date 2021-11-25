import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import PretendardBold from '../../public/fonts/Pretendard-Bold.woff2';
import PretendardRegular from '../../public/fonts/Pretendard-Regular.woff2';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html{
    font-size: 10px;
  }
  @media screen and (max-width: 1440px) {
    html {
      font-size: 8px;
    }
  }
  @media screen and (max-width: 1024px) {
    html {
      font-size: 6px;
    }
  }

  @font-face {
    font-family: 'Pretendard';	
    src: local('PretendardRegular'),
    url(${PretendardRegular}) format('woff2');
    font-weight: 300; 		
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';	
    src: local('PretendardBold'),
    url(${PretendardBold}) format('woff2');
    font-weight: 600; 		
    font-style: normal;
    font-display: swap;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    padding: 0;
    max-height: 100vh;
    overflow: overlay;
    -ms-overflow-style: none;
    max-width: 1140px;
    margin: 0 auto;
    
    color: #30333E;
    
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: rgba(223, 223, 223, 0.6);
    
      &:hover {
        background-color: rgba(193, 193, 193, 0.6);
      }
    }

  };

  a { color: #fff; text-decoration: none; outline: none }
  button{ outline: none; background: none; border: none; cursor: pointer; };
  input { border: none; outline: none; }
`;

export default GlobalStyle;
