import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  MessageSquare,
  Trophy,
  Award,
  Settings,
  BarChart3,
  Users,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();

  const navigationItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/discussion", label: "Discussion", icon: MessageSquare },
    { path: "/rewards", label: "Rewards", icon: Trophy },
    { path: "/profile", label: "Profile", icon: Settings },
  ];

  const statsItems = [
    { path: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
    { path: "/community", label: "Community", icon: Users },
    { path: "/certificates", label: "Certificates", icon: Award },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.container}>
        {/* Main Navigation */}
        <nav className={styles.navigation}>
          <h3 className={styles.sectionTitle}>Main</h3>
          <ul className={styles.navList}>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`${styles.navItem} ${
                      isActive ? styles.active : ""
                    }`}
                  >
                    <Icon size={20} className={styles.navIcon} />
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Stats & Community */}
        <nav className={styles.navigation}>
          <h3 className={styles.sectionTitle}>Community</h3>
          <ul className={styles.navList}>
            {statsItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`${styles.navItem} ${
                      isActive ? styles.active : ""
                    }`}
                  >
                    <Icon size={20} className={styles.navIcon} />
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
