import { NavLink } from "react-router-dom";

const AppNav = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "font-semibold text-blue-600" : "text-muted-foreground";

  return (
    <nav className="bg-gray-50 border-b px-4 py-2">
      <div className="container mx-auto flex space-x-6 text-sm">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/recipes" className={linkClass}>Recept</NavLink>
        <NavLink to="/shopping-list" className={linkClass}>Inköpslista</NavLink>
        <NavLink to="/profile" className={linkClass}>Profil</NavLink>
      </div>
    </nav>
  );
};

export default AppNav;
