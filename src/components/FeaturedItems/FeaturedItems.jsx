import React, { useState }  from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Table } from 'react-bootstrap';
import { Nav, Card, ProgressBar, Pagination } from 'react-bootstrap';
import demo from '../../assets/demo.png';
import './Button.css';
import { Pathname } from "../../routes.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch,faAngleDown, faAngleUp, faArrowDown, faArrowUp,faPlus, faEdit, faEllipsisH,faTags, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from 'react-bootstrap/ToggleButton';
export default function FeaturedItems() {
  

 
  const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(Pathname.AddFeaturedItems.path);
      };
      const [ItemData, setItemData] = useState({
       
        status: false,
    });
    const handleInputChange = (e) => {
      const { name, value, type } = e.target;

      // Check the type of the input value
      const updatedValue = type === 'checkbox' ? e.target.checked : value;

      // For status field, set to false if unchecked
      if (name === 'status') {
          setItemData((prevData) => ({
              ...prevData,
              [name]: updatedValue,
          }));
      } else {
          // For other fields, use the updated value
          setItemData((prevData) => ({
              ...prevData,
              [name]: updatedValue,
          }));
      }
  };
  return (
    <div>
      <div className='mb-4'>
      <Col xs={4} md={2} xl={1} >
            <Dropdown className="btn-toolbar">
      <Dropdown.Toggle as={Button} variant="secondary" size="xs" onClick={() => handleNavigate("add")} className="me-2">
        <FontAwesomeIcon icon={faPlus} className="me-2" />Add New
      </Dropdown.Toggle>
    </Dropdown>
        </Col>
      </div>
      <div>
        <Card >
          <Card.Body>
            <Row>
              <Col> <img src={demo} alt="" style={{ width: '60px' }} /></Col>
              <Col  md="6"><span style={{ fontWeight: "bold" }}>Applied Item </span> </Col>
              <Col><div className='ml-4'>
                            <ToggleButton
                                id={`radio-1`}
                                type="checkbox"
                                variant='outline-success'
                                name="status"
                                checked={ItemData.status}
                                onChange={handleInputChange}
                                style={{marginRight:'10px'}}
                            >
                                Active
                            </ToggleButton>

                            <ToggleButton
                                id={`radio-2`}
                                type="checkbox"
                                variant='outline-danger'
                                name="status"
                                checked={!ItemData.status} // Invert the value for 'Inactive'
                                onChange={handleInputChange}
                            >
                                Inactive
                            </ToggleButton>
                            </div></Col>
             
              <Col className="text-right ">
                <Button variant="primary" className='buttonstyle'>  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                </Button>
                
              </Col>
            </Row>
          </Card.Body>
        </Card>

      </div>
    </div>
  )
}
