import styled from 'styled-components';
import home from '../../../public/icons/home-icon.svg';
import work from '../../../public/icons/work-icon.svg';
import setting from '../../../public/icons/setting-icon.svg';
import homeActive from '../../../public/icons/home-active-icon.svg';
import workActive from '../../../public/icons/work-active-icon.svg';
import settingActive from '../../../public/icons/setting-active-icon.svg';

interface Props {
  name: string;
  isClicked?: boolean;
}

interface pageName {
  [key: string]: string;
}

const pageName: pageName = {
  home,
  work,
  setting,
  homeActive,
  workActive,
  settingActive,
};

export const PageIcon = styled.button<Props>`
  width: 55px;
  height: 55px;

  border-radius: 8px;
  background-image: ${(props) =>
    props.isClicked ? `url(${pageName[props.name + 'Active']})` : `url(${pageName[props.name]})`};
  background-color: ${({ isClicked, theme }) => isClicked && theme.color.blue100};
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    background-color: ${({ theme }) => theme.color.gray100};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.blue100};
    background-image: ${(props) => `url(${pageName[props.name + 'Active']})`};
  }
`;
