import { ReactNode } from "react";

interface SideBarProps {
  children: ReactNode;
}
function SideBar({ children }: SideBarProps) {
  return (
      <div className="w-3/12 bg-white p-3">{children}</div>
  );
}

export default SideBar;
