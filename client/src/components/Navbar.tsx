import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const currentUser = localStorage.getItem("currentUser");

      if (currentUser) {
        setUser(JSON.parse(currentUser));
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");

    setUser(null);
    navigate("/auth");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors whitespace-nowrap ${
      isActive
        ? "text-primary font-semibold"
        : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Heart
                className="w-5 h-5 text-primary-foreground"
                fill="currentColor"
              />
            </div>

            <span className="text-xl font-bold">
              AfyaLink
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            
            <NavLink
              to="/"
              end
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/admin"
              className={navLinkClass}
            >
              Admin
            </NavLink>

            <NavLink
              to="/sha/register"
              className={navLinkClass}
            >
              SHA Register
            </NavLink>

            <NavLink
              to="/articles"
              className={navLinkClass}
            >
              Health Articles
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkClass}
            >
              About
            </NavLink>

          </div>

          {/* Authentication Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <>
                <span className="hidden lg:block text-sm">
                  {user.email}
                </span>

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                >
                  <Link to="/auth">
                    Login
                  </Link>
                </Button>

                <Button asChild>
                  <Link to="/auth">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;