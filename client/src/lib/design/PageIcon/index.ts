import styled from 'styled-components';
import home from '@public/icons/home-icon.svg';
import work from '@public/icons/work-icon.svg';
import setting from '@public/icons/setting-icon.svg';
import homeActive from '@public/icons/home-active-icon.svg';
import workActive from '@public/icons/work-active-icon.svg';
import settingActive from '@public/icons/setting-active-icon.svg';
import Link from '@/lib/common/link/Link';

interface PageProps {
  name: 'home' | 'work' | 'setting';
}

interface PageName {
  [key: string]: string;
}

const pageName: PageName = {
  home,
  work,
  setting,
  homeActive,
  workActive,
  settingActive,
};

/**
 * @property {string} name - 'home' | 'work' | 'setting'
 */
export const PageIcon = styled(Link)<PageProps>`
  display: inline-block;

  width: 55px;
  height: 55px;

  border-radius: 8px;
  background-image: ${(props) => `url(${pageName[props.name]})`};
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    background-color: ${({ theme }) => theme.color.gray100};
  }

  &:active,
  &.active {
    background-color: ${({ theme }) => theme.color.blue100};
    background-image: ${(props) => `url(${pageName[props.name + 'Active']})`};
  }
`;
