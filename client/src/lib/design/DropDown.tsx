import React, { useRef } from 'react';
import styled from 'styled-components';

import arrow from '@public/arrow_drop_down.png';
import theme from '@/styles/theme';

const Box = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  visibility: hidden;
  opacity: 0;
  top: 100%;
  left: 0;

  border-radius: 8px;

  transform: translateY(-10px);
  z-index: -1;
  transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
  box-shadow: 0px 4px 16px 4px rgba(0, 0, 0, 0.2);
`;

const Item = styled.li`
  width: fit-content;
  margin: 16px;

  font: ${(props) => props.theme.font};
`;

const ArrowImage = styled.img`
  transform: rotate(90deg);
  transition-duration: 0.1s;
`;

const Parent = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  border-radius: 8px;

  .active-ul {
    visibility: visible;
    opacity: 1;
    z-index: 1;
    transform: translateY(0px);
    transition-delay: 0s, 0s, 0.3s;
  }
  .active-image {
    transform: rotate(0deg);
    transition-duration: 0.1s;
  }
`;

const ContextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.color.gray100};
`;

const Line = styled.hr`
  width: 80%;

  border: solid 0.5px ${({ theme }) => theme.color.gray300};
  background-color: ${({ theme }) => theme.color.gray300};
`;

interface dropDownProps {
  Title: React.ReactNode;
  list: Array<string>;
  font?: string;
  handleClick: (e: React.MouseEvent) => void;
}

const changeClassName = (component: HTMLElement | null, className: string) => {
  if (component?.classList.contains(className)) {
    component.classList.remove(className);
  } else {
    component?.classList.add(className);
  }
};

/**
 * DropDown Component를 반환하는 함수
 * @param props title, list, click, font를 key로 가지고 있는 객체
 * title은 react Node, list는 Array<string>, click은 ul 태그에 붙일 이벤트 리스너, font는 font에 적용할 특징
 * @returns DropDown Component
 */
const DropDown = (props: dropDownProps) => {
  const { Title, list, font, handleClick } = props;
  const fontTheme = {
    font: font ? font : theme.font.body_regular,
  };

  const listRef = useRef<HTMLUListElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const changeState = (e: React.MouseEvent) => {
    e.preventDefault();
    changeClassName(listRef.current, 'active-ul');
    changeClassName(imageRef.current, 'active-image');
  };

  const selectItem = (e: React.MouseEvent) => {
    e.preventDefault();
    changeState(e);
    handleClick(e);
  };

  return (
    <Parent>
      <ContextContainer onClick={changeState} ref={targetRef}>
        {Title}
        <ArrowImage src={arrow} ref={imageRef} />
      </ContextContainer>
      <Box onClick={selectItem} ref={listRef}>
        {list.map((el: string, i: number) =>
          i === list.length - 1 ? (
            <Item key={i} theme={fontTheme}>
              {el}
            </Item>
          ) : (
            <>
              <Item key={i} theme={fontTheme}>
                {el}
              </Item>
              <Line />
            </>
          ),
        )}
      </Box>
    </Parent>
  );
};

export default DropDown;
