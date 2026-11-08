import { Header } from "../components/Header.jsx";
import {Sidebar} from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="layout">

    <Header/>
    <Sidebar/>
     <main className="main-content">
    <Outlet />
  </main>
    
    </div>
  )
}
