import { FC, ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  fluid?: boolean;
}

export const Grid: FC<GridProps> = ({ children, fluid = false, ...rest }) => {
  return (
    <div
      className={`grid grid-cols-12 gap-[${fluid ? '4' : '8'}] max-w-[1920px] mx-auto w-full ${
        fluid ? 'px-0' : 'px-[24px]'
      }`}
      {...rest}
    >
      {children}
    </div>
  );
};
