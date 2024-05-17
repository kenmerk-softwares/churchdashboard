import React, { useState,useEffect } from 'react';
import { Form, Row, Col, Button, Accordion,InputGroup } from 'react-bootstrap';
 import {app,db} from '../../components/Config.js'
import { collection, getDocs, getDoc,query,updateDoc,addDoc,doc,setDoc } from "firebase/firestore";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useLocation } from 'react-router-dom';
function AddWard() {
 const location=useLocation();
  const[order,setorder]=useState(0);

  useEffect(() => {

    if(location.state.action==="add"){
 const fetchorder = async () => {
    // Reference to your Firestore collection
   const querySnapshot = await getDocs(collection(db, 'ward'));

  
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
    total_houses: '',
    order:'',
    ward_name: '',
    ward_number: '',
    ward_rep_1: '',
    ward_rep_2: '',
    status:false,
  });

  useEffect(() => {
  if (location.state && location.state.action === "edit") {
    setClergyData({
      total_houses: location.state.data.total_houses,
      order: location.state.data.order,
      ward_name: location.state.data.ward_name,
      ward_number: location.state.data.ward_number,
      ward_rep_1: location.state.data.ward_rep_1,
      ward_rep_2: location.state.data.ward_rep_2,
      status: location.state.data.status,
    });
    console.log(location.state.id)
  }
}, [location.state]);
  const handleSubmit = async (event) => {
       event.preventDefault();
  

      if (location.state && location.state.action === "edit") {
           await  updateDoc(doc(db, "ward",location.state.id), {
       ...clergyData
   
  
        }).then(() => {
  console.log("done")
            }).then(() => {  
     console.log("done")
    });
      }else{
   await  addDoc(collection(db, "ward"), {
       ...clergyData,
      order: (order + 1).toString(),
  
        }).then(async() => {
            await updateDoc(db,"orders","wardorder");{
                order: (order + 1).toString()
            }

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
const fetchorder =async()=>{
    const docRef = doc(db, "orders", "wardorder");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setorder(docSnap.data().order);
      console.log(order)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(()=>{
    fetchorder();
  },[])
  return (
    <div>
      {console.log(clergyData)}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Bishop/Priest</Accordion.Header>
          <Accordion.Body>
            To facilitate the addition of bishops and priests, users can seamlessly accomplish this task by selecting
            the appropriate role from a dropdown menu and subsequently filling in the corresponding fields with
            relevant information.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className='mt-4'>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Total Houses</Form.Label>
            <Form.Control
              name="totalhouses"
              placeholder=""
              onChange={handleInputChange}
              value={clergyData.totalhouses}
             type='number'
              required
            >
             
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Ward name</Form.Label>
            <Form.Control
              name="wardname"
              type="text"
              placeholder="Ward name"
              value={clergyData.wardname}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Ward number</Form.Label>
            <Form.Control
              name="wardnumber"
              type="number"
              placeholder="Ward number"
              value={clergyData.wardnumber}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Ward Representative</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="wardrep1"
                type="text"
                placeholder=""
                aria-describedby="inputGroupPrepend"
                value={clergyData.wardrep1}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a valid number.</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Ward Representative2</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="wardrep2"
                type="text"
                placeholder=""
                aria-describedby="inputGroupPrepend"
                value={clergyData.wardrep2}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a valid number.</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

   <Form.Group as={Col} md="4" controlId="validationCustom04" className='mt-4'>
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

export default AddWard;
