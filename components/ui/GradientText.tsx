import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function GradientText({ children }: Props) {
  return <span className="gradient-text">{children}</span>;
}
