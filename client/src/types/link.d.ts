import { ReactNode } from 'react';

export interface LinkType {
  isActive?: boolean;
  children?: ReactNode;
  className?: string;
  to: string;
}
