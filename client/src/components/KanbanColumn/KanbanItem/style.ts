import styled from 'styled-components';
import cancelicon from '@public/icons/cancel-icon.svg';

const Styled = {
  KanBanItem: styled.article<{ isDragEnter: boolean; isHover: boolean }>`
    width: 90%;
    height: 77px;
    border-radius: 8px;
    position: relative;
    display: flex;
    cursor: grab;
    background-color: ${({ theme, isHover }) =>
      isHover ? theme.color.gray100 : theme.color.white};
    border-radius: 3px;
    border-bottom: ${({ isDragEnter, theme }) => isDragEnter && `4px solid ${theme.color.blue200}`};
    border-bottom-left-radius: ${({ isDragEnter }) => isDragEnter && '2px'};
    border-bottom-right-radius: ${({ isDragEnter }) => isDragEnter && '2px'};
    box-shadow: rgb(15 15 15 / 3%) 0px 0px 0px 0.5px, rgb(15 15 15 / 3%) 0px 2px 3px;
    transition: 20ms ease-in 0s;
  `,

  CancelIcon: styled.p<{ isHover: boolean }>`
    position: absolute;
    right: 8px;
    width: 15px;
    height: 15px;
    margin-top: 5px;
    border-radius: 50%;
    background-image: url(${cancelicon});
    background-repeat: no-repeat;
    background-position: center;
    opacity: ${({ isHover }) => (isHover ? 1 : 0)};
    transition: opacity 0.2s ease;
    :hover {
      cursor: pointer;
    }
  `,
};

export default Styled;
