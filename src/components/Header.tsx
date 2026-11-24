import type { HeaderProps } from "../types/student";

function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children}
    </header>
  );
}

export default Header;
