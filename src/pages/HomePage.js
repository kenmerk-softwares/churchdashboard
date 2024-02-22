import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Pathname } from "../routes";

// pages

import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";


// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import User from "./components/User";
import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
 import { getAuth, onAuthStateChanged } from 'firebase/auth';
 import {app,db} from '../components/Config.js'
import Clergy from '../components/Clergy/Clergy.js';
import Addclergy from '../components/Clergy/Addclergy.js';
import Committe from '../components/Committe/Committe.jsx';
import Addcommitte from '../components/Committe/Adcommitte.jsx';
import Addprayers from '../components/Prayers/Addprayers.jsx';
import Prayers from '../components/Prayers/Prayers.jsx';
import Notice from '../components/Notice/Notice.jsx';
import Addnotice from '../components/Notice/Addnotice.jsx';

const AppRoutes = ({element: Element}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  




 
  const [authenticated, setAuthenticated] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      console.log(user);
      setLoaded(true);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true;
  };

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  };

  return (

<>
   { loaded ? (
   
    
    <>
    {authenticated ? (
        <>
         <Routes>
           
      
         <Route path={Pathname.DashboardOverview.path}    element={
              <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <DashboardOverview />
                  <Footer />
                </main>
              </> 
        
              } />
    <Route path={Pathname.Clergy.path} 
    element={
     <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <Clergy />
                  <Footer />
                </main>
              </> 
       } />
    <Route path={Pathname.Addclergy.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <Addclergy />
                  <Footer />
                </main>
              </>} />

                 <Route path={Pathname.Committe.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <Committe />
                  <Footer />
                </main>
              </>} />
                 <Route path={Pathname.Addcommitte.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <Addcommitte />
                  <Footer />
                </main>
              </>} />
                <Route path={Pathname.Addprayers.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <Addprayers />
                  <Footer />
                </main>
              </>} />
                <Route path={Pathname.Prayers.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <Prayers />
                  <Footer />
                </main>
              </>} />
               <Route path={Pathname.Notice.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <Notice />
                  <Footer />
                </main>
              </>} />
               <Route path={Pathname.Addnotice.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <Addnotice />
                  <Footer />
                </main>
              </>} />





    <Route path={Pathname.Upgrade.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                
                  <Footer />
                </main>
              <Upgrade /></>} />
    <Route path={Pathname.Transactions.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  
                  <Footer />
                </main>
               <Transactions /></>} />
    <Route path={Pathname.Settings.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                
                  <Footer />
                </main>
              <Settings /></>} />
    <Route path={Pathname.BootstrapTables.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                
                  <Footer />
                </main><BootstrapTables /></>} />
    <Route path={Pathname.User.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
              
                  <Footer />
                </main><User /></>} />

    {/* components */}
    <Route path={Pathname.Accordions.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                 
                  <Footer />
                </main><Accordion /></>} />
    <Route path={Pathname.Alerts.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                 
                  <Footer />
                </main><Alerts /></>} />
    <Route path={Pathname.Badges.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                
                  <Footer />
                </main><Badges /></>} />
    <Route path={Pathname.Breadcrumbs.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
              
                  <Footer />
                </main><Breadcrumbs /></>} />
    <Route path={Pathname.Buttons.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                
                  <Footer />
                </main><Buttons /></>} />
    <Route path={Pathname.Forms.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
              
                  <Footer />
                </main><Forms /></>} />
    <Route path={Pathname.Modals.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                
                  <Footer />
                </main><Modals /></>} />
    <Route path={Pathname.Navs.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
               
                  <Footer />
                </main><Navs /></>} />
    <Route path={Pathname.Navbars.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                 
                  <Footer />
                </main><Navbars /></>} />
    <Route path={Pathname.Pagination.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  
                  <Footer />
                </main><Pagination /></>} />
    <Route path={Pathname.Popovers.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
               
                  <Footer />
                </main><Popovers /></>} />
    <Route path={Pathname.Progress.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                 
                  <Footer />
                </main><Progress /></>} />
    <Route path={Pathname.Tables.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                 
                  <Footer />
                </main><Tables /></>} />
    <Route path={Pathname.Tabs.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
               
                  <Footer />
                </main><Tabs /></>} />
    <Route path={Pathname.Tooltips.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
              
                  <Footer />
                </main><Tooltips /></>} />
    <Route path={Pathname.Toasts.path} element={ <>
                <Sidebar />
                <main className="content">
                  <Navbar />
                
                  <Footer />
                </main><Toasts /></>} />






        </Routes>
        </>

 ):(
<>
 <Routes>
<Route path={Pathname.DashboardOverview.path} element={<Signin />} />
    <Route path={Pathname.Signup.path} element={<Signup />} />
    <Route path={Pathname.ForgotPassword.path} element={<ForgotPassword />} />
    <Route path={Pathname.ResetPassword.path} element={<ResetPassword />} />
    <Route path={Pathname.Lock.path} element={<Lock />} />
    <Route path={Pathname.NotFound.path} element={<NotFoundPage />} />
    <Route path={Pathname.ServerError.path} element={<ServerError />} />
  
   </Routes>
</>
 )}
</>
    ) : (
      <>
          <Preloader show={true} />
       
</>
        )
      }


    
  </>
    
  )};
    
 export default AppRoutes; 
   
   



 

