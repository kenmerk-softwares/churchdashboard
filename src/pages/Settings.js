import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { useLocation } from "react-router-dom";

export default () => {

  const location = useLocation();

  // Access user information from props.location.state.userInfo
  const userInfo = location.state && location.state.userInfo;

  // Check if user information exists before rendering
  if (!userInfo) {
    return <div>No user information found</div>;
  }
  return (
    <>
   

      <Row>
        <Col xs={12} xl={8}>
          <GeneralInfoForm userInfo={userInfo}/>
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ProfileCardWidget userInfo={userInfo}/>
            </Col>
            <Col xs={12}>
              <ChoosePhotoWidget
                title="Select profile photo"
                photo={userInfo.photoURL}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
