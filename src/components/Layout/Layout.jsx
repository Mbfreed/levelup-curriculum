import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NotificationSystem from "../NotificationSystem/NotificationSystem";
import { useCourse } from "../../contexts/CourseContext";
import styles from "./Layout.module.css";

const Layout = () => {
  const { notifications } = useCourse();

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
      <NotificationSystem notifications={notifications} />
    </div>
  );
};

export default Layout;
