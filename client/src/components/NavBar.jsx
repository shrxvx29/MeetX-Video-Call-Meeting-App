
import React from "react";
import { dummyUser } from "../assets/asset";
import { Link, useLocation } from "react-router-dom";
import {
  Orbit,
  HistoryIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { UserButton } from "@clerk/react";

const NavBar = () => {
  const { isSignedIn, user } = {
    user: dummyUser,
    isSignedIn: true,
  };

  const location = useLocation();

  const username =
    user?.fullName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "User";

  const navLinkClass = (path) =>
    `whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-medium
    transition-all flex items-center gap-1.5 ${
      location.pathname === path
        ? "ring-1 ring-pink-100 bg-pink-50 text-slate-800"
        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
    }`;

  return (
    <header className="sticky top-0 z-40 mx-auto flex w-full max-w-[1220px] items-center justify-between gap-3 rounded-b-2xl border border-slate-200 bg-white/90 px-3 py-4 backdrop-blur-xl sm:px-5 md:px-6 md:py-5 lg:px-8">

      {/* Brand Logo and Navigation */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-5 md:gap-6">

        <Link
          to="/dashboard"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <img
            src="/logo.svg"
            alt="MeetX Logo"
            className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
          />

          <span className="flex items-center text-xl font-medium tracking-tight text-slate-900 sm:text-2xl">
            MeetX<span className="text-pink-600">.</span>
          </span>
        </Link>

        {isSignedIn && (
          <nav className="hidden items-center gap-1 md:flex lg:ml-2">
            <Link
              to="/dashboard"
              className={navLinkClass("/dashboard")}
            >
              <LayoutDashboardIcon className="h-3.5 w-3.5" />
              Dashboard
            </Link>

            <Link
              to="/sessions"
              className={navLinkClass("/sessions")}
            >
              <HistoryIcon className="h-3.5 w-3.5" />
              Sessions
            </Link>

            <Link
              to="/pricing"
              className={navLinkClass("/pricing")}
            >
              <Orbit className="h-3.5 w-3.5" />
              Pricing
            </Link>
          </nav>
        )}
      </div>

      {/* Right Profile and User Button */}
      {isSignedIn && (
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">

          {/* Mobile Navigation */}
          <nav className="flex items-center gap-1 md:hidden">
            <Link
              to="/dashboard"
              aria-label="Dashboard"
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all sm:h-10 sm:w-10 ${
                location.pathname === "/dashboard"
                  ? "bg-pink-50 text-pink-600 ring-1 ring-pink-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <LayoutDashboardIcon className="h-4 w-4" />
            </Link>

            <Link
              to="/sessions"
              aria-label="Sessions"
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all sm:h-10 sm:w-10 ${
                location.pathname === "/sessions"
                  ? "bg-pink-50 text-pink-600 ring-1 ring-pink-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <HistoryIcon className="h-4 w-4" />
            </Link>

            <Link
              to="/pricing"
              aria-label="Pricing"
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all sm:h-10 sm:w-10 ${
                location.pathname === "/pricing"
                  ? "bg-pink-50 text-pink-600 ring-1 ring-pink-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Orbit className="h-4 w-4" />
            </Link>
          </nav>

          {/* Welcome Text: hide on very small screens */}
          <span className="hidden max-w-36 truncate text-sm font-medium text-slate-600 lg:block">
            Welcome, {username}
          </span>

          <div className="shrink-0">
            <UserButton afterSignOutUrl="/login" />
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
