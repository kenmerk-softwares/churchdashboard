
import React, { useState,useEffect } from "react";
 import {app,db} from '../../components/Config.js'
 import { getAuth,onAuthStateChanged} from "firebase/auth";

 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch,faAngleDown, faAngleUp, faArrowDown, faArrowUp,faPlus, faEdit, faEllipsisH,faTags, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown,Table} from 'react-bootstrap';
import {  Nav, Card, ProgressBar, Pagination } from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Pathname } from "../../routes.js";
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import { faChartLine } from '@fortawesome/free-solid-svg-icons'


import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  getDoc
} from "firebase/firestore";
import { CounterWidget } from "../Widgets.js";








function Users() {
  const [loading, setloading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [allDocs, setallDocs] = useState([]);
  const [rows, setRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [first, setFirst] = useState(0);
    const [showA, setShowA] = useState(true);


  const toggleShowA = () => setShowA(!showA);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleNavigate = (action, value, data) => {
    navigate(Pathname.Addclergy.path, { state: { action, id: value, data: data } });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      console.log(user);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    setloading(true);
    const response = collection(db, "clergy");
    const q = query(response, orderBy("order", "asc"));
data_listener(q )
  
  }, [currentPage, rows]);

  const data_listener = (q) => {
    
    var i = 0;
    return onSnapshot(q, (snapshot) => {
      setallDocs([]);
      snapshot.docChanges().forEach((change) => {
        i = i + 1;

        if (change.type === "added") {
          setallDocs((prev) => {
            return [
              ...prev,
              {
                sl: i,
                id: change.doc.id,
                data: change.doc.data(),
              },
            ];
          });
        }
        if (change.type === "modified") {
          setallDocs((current) =>
            current.map((obj) => {
              if (obj.id === change.doc.id) {
                return {
                  ...obj,
                  sl: i,
                  id: change.doc.id,
                  data: change.doc.data(),
                };
              }
              return obj;
            })
          );
        }
        if (change.type === "removed") {
          setallDocs((current) =>
            current.filter((value) => {
              return value.id !== change.doc.id;
            })
          );
        }
      });
      setloading(false);
    });
  };

  const handleDelete = (id) => {
    deleteDoc(doc(db, "clergy", id)).then(() => {
      console.log("done");
    });
  };

  const handleChapterStatusChange = (value, id, cat) => {
    updateDoc(doc(db, "clergy", id), {
      status: value,
    }).then(() => {
      console.log("done");
    });
  };

  const onPageChange = (event) => {
    setCurrentPage(event);
  };

   const handleSearch = (searchInput) => {
   
    const response = collection(db, "clergy");


    // Check if the searchInput is empty
    if (searchInput.trim() === '') {
      // If empty, refresh the page
  
    const q = query(response, orderBy("order", "asc"));

data_listener(q );
    }

    const q = query(
      response,
      orderBy("order", "asc"),
      where("name", "==", searchInput)
    );
  
   data_listener(q);
   }

  return (
  
    <>

{loading?(
  <Spinner animation="grow" size="lg"   style={{
              color: "primary",
              display: "inline-block",
              position: "relative",
              top: "50%",
              left: "50%",
            }} />
):(
  <>
<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>CRM</Breadcrumb.Item>
            <Breadcrumb.Item active>Users</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Users Info</h4>
        
        </div>
       
        <div className="btn-toolbar mb-2 mb-md-0">
          
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
          <ReactHTMLTableToExcel
            id="exportButton"
            className="btn btn-primary"
            table="transactionsTable"
            filename="transactions"
            sheet="transactionsSheet"
            buttonText="Export"
          />

              
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">

        <Col xs={4} md={2} xl={1} >
            <Dropdown className="btn-toolbar">
      <Dropdown.Toggle as={Button} variant="secondary" size="xs" onClick={() => handleNavigate("add")} className="me-2">
        <FontAwesomeIcon icon={faPlus} className="me-2" />Add New
      </Dropdown.Toggle>
    </Dropdown>
        </Col>
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
               <Form.Control
          type="text"
          placeholder="Search by Name"
          onChange={(e) => handleSearch(e.target.value)}
        />
            </InputGroup>
          </Col>
       
        </Row>

           <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Name</th>
              <th className="border-bottom">Mobile</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Created at</th>
              <th className="border-bottom">Last Active Time</th>
              <th className="border-bottom">State</th>
              <th className="border-bottom">Country</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">View</th>
            </tr>
          </thead>

      
           {allDocs.map((doc,data, index) => {
             return (
          <tbody>
          <tr>
        <td>
          <Card.Link as={Link}  className="fw-normal">
            {doc.sl}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
          {doc.data.name}
          </span>
        </td>
        <td>
          <span className="fw-normal">
        13244343444
          </span>
        </td>
        <td>
          <span className="fw-normal">
        user123@gmail.com
          </span>
        </td>
        <td>
           01/04/2024
        </td>
        <td>
        11.06 AM
        </td>
        <td>
          Kerala
        </td>
        <td>India</td>
        <td>Inactive</td>
        <td><Button variant="success">View</Button></td>
      </tr>
      
          </tbody>
              );
                    })}
        </Table>
      <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
        <Nav>
          <Pagination className="mb-2 mb-lg-0">
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Pagination.Prev>
            {Array.from({ length: Math.ceil(allDocs.length / rows) }, (_, index) => (
              <Pagination.Next
                key={index}
                active={index + 1 === currentPage}
                onClick={() => onPageChange(index + 1)}
               
              >
                {index + 1}
              </Pagination.Next>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(allDocs.length / rows)))}
            >
              Next
            </Pagination.Next>
          </Pagination>
        </Nav>
      </Card.Footer>
   </Card.Body>
        </Card>
       
      </div>
      </>
)}

     
    
      {/* ... other JSX ... */}
    </>
  );
}

export default Users;