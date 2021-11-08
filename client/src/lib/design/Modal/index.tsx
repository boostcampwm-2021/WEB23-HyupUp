import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    font: ${({ theme }) => theme.font.body_regular};
  `,
  Overlay: styled.div`
    position: absolute;
    top: 0px;
    height: 0px;

    width: 100%;
    height: 100%;

    background-color: ${({ theme }) => theme.color.gray200};
  `,
  Body: styled.div`
    position: relative;
    width: 600px;
    height: 400px;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;
    z-index: 999;
  `,
  XButton: styled.button`
    position: absolute;
    top: 16px;
    right: 16px;

    width: 16px;
    height: 16px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray400};
  `,
};

interface ModalProps {
  root: Element;
  shouldConfirm: boolean;
  content: React.ReactNode;
  children?: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const [hidden, setHidden] = React.useState(false);
  const hideModal = () => setHidden((prevState) => !prevState);

  if (hidden) return ReactDOM.createPortal(undefined, props.root);
  const modalContent = (
    <S.Container>
      <S.Body>
        <S.XButton onClick={hideModal} />
        {props.children}
        <div>{props.content}</div>
      </S.Body>
      <S.Overlay onClick={hideModal} />
    </S.Container>
  );

  return ReactDOM.createPortal(modalContent, props.root);
};

export default Modal;
