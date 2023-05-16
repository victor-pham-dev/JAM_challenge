import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Auth({ children }: Props) {
  return <React.Fragment>{children}</React.Fragment>;
}
