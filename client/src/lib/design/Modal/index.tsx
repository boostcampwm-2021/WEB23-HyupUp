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
    box-shadow: ${({ theme }) => theme.shadow.default};
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
  shouldConfirm: boolean;
  title?: string;
  children?: React.ReactNode;
  size?: SizeType;
  onClickOk?: (e: React.MouseEvent) => void;
  onClickCancel?: (e: React.MouseEvent) => void;
}

/**
 *
 * @param props.shouldConfirm 확인/취소가 가능한 모달인지 여부
 * @param props.title? 제목이 필요한 모달일 경우의 제목 문자열
 * @param props.size? 'SMALL', 'MEDIUM', 'LARGE' 셋 중 하나를 전달. 모달 컨테이너의 패딩 크기를 결정
 * @param props.onClickOk? '확인/취소가 가능한 모달일 경우 확인 버튼을 눌렀을 때 trigger되는 이벤트 핸들러
 * @param props.onClickCancel? '확인/취소가 가능한 모달일 경우 취소 버튼을 눌렀을 때 trigger되는 이벤트 핸들러
 */
const Modal = (props: ModalProps) => {
  const [hidden, setHidden] = React.useState(false);
  const toggleModal = () => setHidden((prevState) => !prevState);
  const root = document.getElementById('root') ?? document.body;

  if (hidden) return ReactDOM.createPortal(undefined, root);

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

  return ReactDOM.createPortal(modalContent, root);
};

export default Modal;
