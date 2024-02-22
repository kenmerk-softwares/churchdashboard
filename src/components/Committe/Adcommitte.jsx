import React, { useState,useEffect } from 'react';
import { Form, Row, Col, Button, Accordion,InputGroup } from 'react-bootstrap';
 import {app,db} from '../../components/Config.js'
import { collection, getDocs, getDoc,query,updateDoc,addDoc,doc,setDoc } from "firebase/firestore";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useLocation } from 'react-router-dom';
function Addcommitte() {
 const location=useLocation();
  const[order,setorder]=useState(0);

  useEffect(() => {

    if(location.state.action==="add"){
 const fetchorder = async () => {
    // Reference to your Firestore collection
   const querySnapshot = await getDocs(collection(db, 'committee'));

  
      setorder(querySnapshot.size)
   };
fetchorder();
    }
    
    // Cleanup function to unsubscribe when the component unmounts
 
  }, []);







  const [validated, setValidated] = useState(false);
    const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [clergyData, setClergyData] = useState({
    type: '',
    order:'',
    name: '',
    position: '',
    mobile: '',
    status:false,
  });

  useEffect(() => {
  if (location.state && location.state.action === "edit") {
    setClergyData({
    
      order: location.state.data.order,
      name: location.state.data.name,
      position: location.state.data.position,
      mobile: location.state.data.mobile,
      status: location.state.data.status,
    });
    console.log(location.state.id)
  }
}, [location.state]);
  const handleSubmit = async (event) => {
       event.preventDefault();
  

      if (location.state && location.state.action === "edit") {
           await  updateDoc(doc(db, "committee",location.state.id), {
       ...clergyData
   
  
        }).then(() => {
  console.log("done")
            }).then(() => {  
     console.log("done")
    });
      }else{
   await  addDoc(collection(db, "clergy"), {
       ...clergyData,
      order: (order + 100).toString(),
  
        }).then(() => {

            }).then(() => {  
     console.log("done")
    });
      }
        // Add document to the 'clergy' collection
    
      
  
    
  };

const handleInputChange = (e) => {
  const { name, value, type } = e.target;

  // Check the type of the input value
  const updatedValue = type === 'checkbox' ? e.target.checked : value;

  // For status field, set to false if unchecked
  if (name === 'status') {
    setClergyData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  } else {
    // For other fields, use the updated value
    setClergyData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  }
};

  return (
    <div>
      {console.log(clergyData)}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Bishop/Priest</Accordion.Header>
          <Accordion.Body>
            To facilitate the addition of Committe members, users can seamlessly accomplish this task  subsequently filling in the corresponding fields with
            relevant information.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
       
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>First name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="First name"
              value={clergyData.name}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Position</Form.Label>
            <Form.Control
              name="position"
              type="text"
              placeholder="Position"
              value={clergyData.position}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Contact No</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="mobile"
                type="number"
                placeholder="Contact No"
                aria-describedby="inputGroupPrepend"
                value={clergyData.mobile}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a valid number.</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

   <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Status</Form.Label>
             
          
       <ToggleButton
  id={`radio-1`}
  type="checkbox"
  variant='outline-success' 
  name="status"
  checked={clergyData.status}
  onChange={handleInputChange}
>
  Active
</ToggleButton>

<ToggleButton
  id={`radio-2`}
  type="checkbox"
  variant='outline-danger'
  name="status"
  checked={!clergyData.status} // Invert the value for 'Inactive'
  onChange={handleInputChange}
>
  Inactive
</ToggleButton>
      
   
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  );
}

export default Addcommitte;
