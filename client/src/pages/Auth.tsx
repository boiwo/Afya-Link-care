import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";

interface StoredUser {
  id: number;
  email: string;
  password: string;
}

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";
const TOKEN_KEY = "token";

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const normalizePassword = (password: string) => password.trim();

const getStoredUsers = (): StoredUser[] => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
};

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const cleanEmail = normalizeEmail(email);
    const cleanPassword = normalizePassword(password);

    const users = getStoredUsers();

    let user = users.find(
      (u) => normalizeEmail(u.email) === cleanEmail
    );

    // Automatically create account if it doesn't exist
    if (!user) {
      user = {
        id: Date.now(),
        email: cleanEmail,
        password: cleanPassword,
      };

      users.push(user);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } else {
      // Update password to whatever the user entered
      user.password = cleanPassword;

      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, "logged-in");

    window.dispatchEvent(new Event("storage"));

    toast({
      title: "Success",
      description: "Logged in successfully!",
    });

    setLoading(false);

    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>

            <CardDescription>
              Enter any email and password to continue.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Email</Label>

                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Password</Label>

                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
