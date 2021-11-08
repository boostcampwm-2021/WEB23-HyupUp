import React from 'react';
import styled from 'styled-components';

import theme from '@/styles/theme';
import arrow from '@/../public/arrow_drop_down.png';

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

  transform: translateY(-2em);
  z-index: -1;
  transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
  box-shadow: 0px 4px 16px 4px rgba(0, 0, 0, 0.2);
`;

const Item = styled.li`
  width: fit-content;
  margin: 16px;

  font: ${(props) => props.theme.font};
`;

const Parent = styled.div`
  width: fit-content;
  height: fit-content;

  border-radius: 8px;

  &:hover ${Box} {
    visibility: visible;
    opacity: 1;
    z-index: 1;
    transform: translateY(0%);
    transition-delay: 0s, 0s, 0.3s;
  }
`;

const ContextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  border-radius: 8px;

  background-color: ${theme.color.gray100};
`;

const Context = styled.p`
  padding: 10px;

  font: ${(props) => props.theme.font};
`;

const Line = styled.hr`
  width: 80%;

  border: solid 0.5px #8993a1;
  background-color: #8993a1;
`;

interface dropDownProps {
  title: string;
  list: Array<string>;
  font?: string;
  click: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * DropDown Component를 반환하는 함수
 * @param props title, list, click, font를 key로 가지고 있는 객체
 * title은 string, list는 Array<string>, click은 ul 태그에 붙일 이벤트 리스너, font는 font에 적용할 특징
 * @returns DropDown Component
 */
const DropDown = (props: dropDownProps) => {
  const { title, list, font, click } = props;
  const fontTheme = {
    font: font ? font : theme.font.body_regular,
  };
  return (
    <Parent>
      <ContextContainer>
        <Context theme={fontTheme}>{title}</Context>
        <img src={arrow} />
      </ContextContainer>
      <Box onClick={click}>
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
