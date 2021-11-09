import * as React from 'react';
import styled from 'styled-components';
import Button from '@/lib/design/Button';

const Roadmap = () => {
  return (
    <S.Container>
      <S.Title>프로젝트 로드맵</S.Title>
      <S.Content>
        <S.ContentEntry>
          <Button size={'small'} category={'cancel'} onClick={() => {}}>
            Add item
          </Button>
        </S.ContentEntry>
        <S.MainContent>content</S.MainContent>
      </S.Content>
    </S.Container>
  );
};

export default Roadmap;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    width: 941px;
    margin: 75px 0 0 26px;
    padding: 18px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray100};

    font: ${({ theme }) => theme.font.body_regular};
  `,
  Title: styled.h2`
    margin-bottom: 16px;

    font: ${({ theme }) => theme.font.bold_medium};
  `,
  Content: styled.section`
    display: flex;

    width: 100%;
    height: 100%;
  `,
  ContentEntry: styled.aside`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 206px;
    height: 100%;
    margin-right: 16px;

    background-color: ${({ theme }) => theme.color.white};

    & > button {
      position: absolute;
      bottom: 0;

      width: calc(100% - 16px);
      margin: 8px;
    }
  `,
  MainContent: styled.section`
    position: relative;

    width: 100%;
    height: 100%;

    background-color: ${({ theme }) => theme.color.white};
  `,
};
