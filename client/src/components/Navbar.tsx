import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check "login" state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove login state
    setUser(null);
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-foreground">AfyaLink</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="/admin" className="text-foreground hover:text-primary transition-colors">Admin</a>
            <a href="/articles" className="text-foreground hover:text-primary transition-colors">Health Articles</a>
            <a href="/about" className="text-foreground hover:text-primary transition-colors">About</a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden md:block">{user}</span>
                <Button variant="ghost" onClick={handleLogout} className="text-foreground hover:text-primary">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
                  <a href="/auth">Login</a>
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <a href="/auth">Sign Up</a>
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
