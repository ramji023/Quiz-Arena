import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ErrorNote } from "../pages/ErrorPages/ErrorNote";
export default function Layout() {
 
  return (
    <>
      <div className="">
        <Navbar />
        <Outlet />
        <ErrorNote />
        <Footer />
      </div>
    </>
  );
}
