import { LOGIN } from "lib/routes";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/auth";
import Navbar from "components/navbar";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected" && !user)) { //if it's not loading only should check if the pathname is protected. If it's loading the it wont run the rest
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading, navigate]);

  if (isLoading) return "loading..";

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
