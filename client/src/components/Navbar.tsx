import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          <Link
            to="/"
            className="flex items-center gap-2"
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

          {/* Centered Navigation Items matching the text style of 'About' and 'Admin' */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">

            <Link to="/" className="hover:text-primary transition-colors">Home</Link>

            <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>

            <Link to="/sha/register" className="hover:text-primary transition-colors">SHA Register</Link>

            <Link to="/articles" className="hover:text-primary transition-colors">Health Articles</Link>

            <Link to="/about" className="hover:text-primary transition-colors">About</Link>

          </div>

          <div className="flex items-center gap-3">

            {user ? (
              <>
                <span className="hidden md:block text-sm">
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

                <Button
                  asChild
                >
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