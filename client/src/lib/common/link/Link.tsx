import React from 'react';
import { LinkType } from '@/types/link';
import { NavLink } from 'react-router-dom';

const Link = ({ children, className, to }: LinkType) => {
  return (
    <NavLink to={to} className={className}>
      {children}
    </NavLink>
  );
};

export default Link;
