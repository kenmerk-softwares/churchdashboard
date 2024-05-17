import React from 'react'
import { Form, Row, Col, Button, Accordion, InputGroup, Card } from 'react-bootstrap';
import profile from '../../assets/profile.png';
import "./Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch,faAngleDown, faAngleUp, faArrowDown, faArrowUp,faPlus, faEdit, faEllipsisH,faTags, faExternalLinkAlt, faEye, faTrashAlt,} from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
export default function Profile() {
  return (
    <div>
      <Row>
        <Col>
        <img
        src={profile}
        alt="Rounded Image"
        className="rounded-image"
        style={{ width: '200px', height: '200px' }} // Adjust width and height as needed
      /></Col>
      <Col md='9'className='mt-5'>
      <Row >
        <span style={{fontWeight:"bold",fontSize:"30px"}}>Athul Ram</span>
      </Row>
      <Row >
        <span>athulram123@gmail.com</span>
      </Row>
      <Row>
        <Col className='mt-4'> <Button>Edit profile</Button></Col>
       
      </Row>
      </Col>
      </Row>
      <span style={{fontWeight:'bold',fontSize:'20px',marginTop:'20px',display: 'block'}} >Others</span>
      <Card>
        <Row>
            <Col>
            <FontAwesomeIcon icon={['far', 'circle-question']} className="me-2" />
            </Col>
            <Col>Help</Col>
        </Row>
      </Card>
    </div>
  )
}
