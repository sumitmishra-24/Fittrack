import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  LayoutDashboard,
  Utensils,
  TrendingUp,
  LogIn,
  Dumbbell,
  Bot,
} from "lucide-react";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const location = useLocation();
  const isAuthenticated =
    location.pathname !== "/" && location.pathname !== "/auth";

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Workout", path: "/workout", icon: Dumbbell },
    { name: "Diet", path: "/diet", icon: Utensils },
    { name: "Progress", path: "/progress", icon: TrendingUp },
    { name: "AI Coach", path: "/ai-coach", icon: Bot },
  ];

  return (
    <nav className="bg-[#0A0A0A] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to={isAuthenticated ? "/dashboard" : "/"}
              className="flex-shrink-0 flex items-center gap-2"
            >
              <Activity className="h-8 w-8 text-[#CCFF00]" />
              <span className="font-black italic tracking-tighter uppercase text-2xl sm:text-3xl text-[#CCFF00]">
                fitTrack
              </span>
              <span className="h-1 w-1 bg-white rounded-full hidden sm:block ml-1"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 hidden sm:block ml-2">
                Coach v2.1
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-8">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex space-x-5">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={cn(
                          "inline-flex items-center px-1 pt-1 border-b-2 text-[10px] font-black tracking-widest uppercase transition-colors",
                          isActive
                            ? "border-[#CCFF00] text-[#CCFF00]"
                            : "border-transparent text-white/60 hover:border-white/30 hover:text-white",
                        )}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <Link
                  to="/"
                  className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity hidden sm:flex items-center"
                >
                  Sign out
                </Link>
              </>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-[10px] font-black uppercase tracking-widest text-black bg-[#CCFF00] hover:bg-white transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <div className="sm:hidden border-t border-white/10 flex justify-around p-2 bg-[#1A1A1A] overflow-x-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex flex-col items-center justify-center p-2 text-[9px] font-black uppercase tracking-widest min-w-0",
                  isActive ? "text-[#CCFF00]" : "text-white/60",
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
