import { ReactNode } from "react";

export type TabProps = {
  title: ReactNode;
  children: ReactNode;
};

export const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};
