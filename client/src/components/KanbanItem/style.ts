import styled from 'styled-components';
import cancelicon from '@public/icons/cancel-icon.svg';

interface KanbanItemPropType {
  isDragEnter: boolean;
}

const Styled = {
  KanBanItem: styled.article<KanbanItemPropType>`
    width: 90%;
    height: 65px;
    border-radius: 8px;
    margin-top: 10px;
    display: flex;
    cursor: grab;
    background-color: ${({ theme }) => theme.color.gray100};
    border-bottom: ${({ isDragEnter, theme }) => isDragEnter && `4px solid ${theme.color.blue200}`};
    border-bottom-left-radius: ${({ isDragEnter }) => isDragEnter && '2px'};
    border-bottom-right-radius: ${({ isDragEnter }) => isDragEnter && '2px'};
  `,

  CancelIcon: styled.p`
    display: inline-block;

    width: 15px;
    height: 15px;
    margin-top: 5px;
    border-radius: 50%;
    background-image: url(${cancelicon});
    background-repeat: no-repeat;
    background-position: center;
    :hover {
      cursor: pointer;
    }
  `,
};

export default Styled;
