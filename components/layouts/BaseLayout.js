import React from "react";
import Header from "../shared/Header";
import { ToastContainer } from "react-toastify";
export default function BaseLayout({
  className,
  children,
  user,
  loading,
  navClass = "with-bg",
}) {
  return (
    <div className="layout-container">
      <Header className={navClass} user={user} loading={loading} />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
      <ToastContainer></ToastContainer>
    </div>
  );
}
