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

    opacity: 0.5;
    background-color: ${({ theme }) => theme.color.gray300};
  `,
  Title: styled.div`
    margin-bottom: 8px;
    font: ${({ theme }) => theme.font.bold_medium};
  `,
  Body: styled.div<{ size: SizeType }>`
    position: relative;

    padding: ${(props) => {
      if (props.size === 'MEDIUM') return '48px';
      else if (props.size === 'LARGE') return '64px';
      else return '32px';
    }};

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
    background-color: ${({ theme }) => theme.color.gray300};
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

type SizeType = 'SMALL' | 'MEDIUM' | 'LARGE';

interface ModalProps {
  root: Element;
  shouldConfirm: boolean;
  title?: string;
  children?: React.ReactNode;
  size?: SizeType;
  onClickOk?: (e: React.MouseEvent) => void;
  onClickCancel?: (e: React.MouseEvent) => void;
}

const Modal = (props: ModalProps) => {
  const [hidden, setHidden] = React.useState(false);
  const toggleModal = () => setHidden((prevState) => !prevState);

  if (hidden) return ReactDOM.createPortal(undefined, props.root);
  const modalContent = (
    <S.Container>
      <S.Body size={props.size ?? 'SMALL'}>
        <S.XButton onClick={toggleModal} />
        <S.Title>{props.title ?? ''}</S.Title>
        {props.children}
        {props.shouldConfirm ? (
          <S.ButtonWrapper>
            <button
              onClick={(e) => {
                props.onClickCancel && props.onClickCancel(e);
                toggleModal();
              }}
            >
              cancel
            </button>
            <button
              onClick={(e) => {
                props.onClickOk && props.onClickOk(e);
                toggleModal();
              }}
            >
              ok
            </button>
          </S.ButtonWrapper>
        ) : undefined}
      </S.Body>
      <S.Overlay onClick={toggleModal} />
    </S.Container>
  );

  return ReactDOM.createPortal(modalContent, props.root);
};

export default Modal;
