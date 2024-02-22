
import React, { useState,useEffect } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBoxOpen, faChartPie, faCog, faFileAlt, faHandHoldingUsd, faSignOutAlt, faTable, faTimes, faCalendarAlt, faMapPin, faInbox, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

import { Pathname } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
 import { getAuth, onAuthStateChanged } from 'firebase/auth';
 import {app,db} from '../components/Config.js'
export default (props ,userInfo = {}) => {
  const location = useLocation();
  const navigate=useNavigate();
  const { pathname } = location;

 const [authenticated, setAuthenticated] = useState(false);
  const [permissions, setpermissions] = useState(false);
  const auth = getAuth(app);

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(user)
    });

    return () => unsubscribe();
  }, [auth]);



      const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Set user to null or perform any other cleanup
        // This assumes you are using some user state variable in your component
       navigate({
      pathname: Pathname.Signin.path,
  
    });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey} style={{backgroundColor:"#262B40"}} >
        <Accordion.Item eventKey={eventKey} className="" variant="dark" style={{backgroundColor:"#262B40"}}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center " style={{backgroundColor:"#262B40"}}>
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level " style={{backgroundColor:"#262B40"}}>
            <Nav className="flex-column" variant="dark" style={{backgroundColor:"#262B40"}}>
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "primary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
 
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Pathname.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
      CHURCH NAME
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={authenticated.photoURL?authenticated.photoURL:ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>{authenticated.displayName?authenticated.displayName:authenticated.email}</h6>
                  <Button as={Link} variant="secondary" size="xs" to={Pathname.Signin.path}  onClick={handleLogout} className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              


{/* churchroutes */}

 <NavItem title="Home" link={Pathname.DashboardOverview.path} icon={faChartPie} />
  <NavItem title="Wards" link={Pathname.Wards.path} icon={faChartPie} />
  <NavItem title="Clergy" link={Pathname.Clergy.path} icon={faChartPie} />
   <NavItem title="Notice" link={Pathname.Notice.path} icon={faChartPie} />
    <NavItem title="Blood Donation" link={Pathname.Blood.path} icon={faChartPie} />
     <NavItem title="Committe" link={Pathname.Committe.path} icon={faChartPie} />
      <NavItem title="Audios" link={Pathname.Audios.path} icon={faChartPie} />
       <NavItem title="Prayers" link={Pathname.Prayers.path} icon={faChartPie} />
        <NavItem title="Bible" link={Pathname.Bible.path} icon={faChartPie} />

         <NavItem title="Gallery" link={Pathname.Gallery.path} icon={faChartPie} />
          <NavItem title="Calender" link={Pathname.Calender.path} icon={faChartPie} />
           <NavItem title="Marriage" link={Pathname.Marriage.path} icon={faChartPie} />
           <NavItem title="Notifications" link={Pathname.Notifications.path} icon={faChartPie} />
















             


              

              <Dropdown.Divider className="my-3 border-indigo" />

              {/* <CollapsableNavItem eventKey="documentation/" title="Getting Started" icon={faBook}>
                <NavItem title="Overview" link={Routes.DocsOverview.path} />
                <NavItem title="Download" link={Routes.DocsDownload.path} />
                <NavItem title="Quick Start" link={Routes.DocsQuickStart.path} />
                <NavItem title="License" link={Routes.DocsLicense.path} />
                <NavItem title="Folder Structure" link={Routes.DocsFolderStructure.path} />
                <NavItem title="Build Tools" link={Routes.DocsBuild.path} />
                <NavItem title="Changelog" link={Routes.DocsChangelog.path} />
              </CollapsableNavItem> */}
              <CollapsableNavItem style={{backgroundColor:"#262B40"}} eventKey="components/" title="Components" icon={faTimes}>
                
                <NavItem title="Accordion" icon={faChartPie} link={Pathname.Accordions.path} />
                <NavItem title="Alerts"  icon={faChartPie} link={Pathname.Alerts.path} />
                <NavItem title="Badges" icon={faChartPie} link={Pathname.Badges.path} />
                 <NavItem title="Overview" link={Pathname.DashboardOverview.path} icon={faChartPie} />
           
              <NavItem title="Transactions" icon={faHandHoldingUsd} link={Pathname.Transactions.path} />
            
             

                <NavItem title="Bootstrap Table" icon={faChartPie} link={Pathname.BootstrapTables.path} />
             
         {permissions ? (
        <>
          <NavItem title="User" link={Pathname.User.path} />
      
        </>
      ):null}
                <NavItem     title="Breadcrumbs" link={Pathname.Breadcrumbs.path} />
                <NavItem title="Buttons" link={Pathname.Buttons.path} />
                <NavItem title="Forms" link={Pathname.Forms.path} />
                <NavItem title="Modals" link={Pathname.Modals.path} />
                <NavItem title="Navbars" link={Pathname.Navbars.path} />
                <NavItem title="Navs" link={Pathname.Navs.path} />
                <NavItem title="Pagination" link={Pathname.Pagination.path} />
                <NavItem title="Popovers" link={Pathname.Popovers.path} />
                <NavItem title="Progress" link={Pathname.Progress.path} />
                <NavItem title="Tables" link={Pathname.Tables.path} />
                <NavItem title="Tabs" link={Pathname.Tabs.path} />
                <NavItem title="Toasts" link={Pathname.Toasts.path} />
                <NavItem title="Tooltips" link={Pathname.Tooltips.path} />
              </CollapsableNavItem>
                    </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
