import * as React from "react";

interface Props {
  children: React.ReactNode;
}

function BasicLayout({ children }: Props) {
  return (
    <div className="grid min-h-screen w-full items-center justify-center">
      <div className=" max-w-[1444px] ">{children}</div>
    </div>
  );
}

export default BasicLayout;
