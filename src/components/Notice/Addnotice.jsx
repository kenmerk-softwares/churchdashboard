import React, { useState,useEffect } from 'react';
import { Form, Row, Col, Button, Accordion,InputGroup } from 'react-bootstrap';
 import {app,db} from '../../components/Config.js'
import { collection, getDocs, getDoc,query,updateDoc,addDoc,doc,setDoc } from "firebase/firestore";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useLocation } from 'react-router-dom';
import {  Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
function Addnotice() {
 const location=useLocation();
  const[order,setorder]=useState(0);

  useEffect(() => {

    if(location.state.action==="add"){
 const fetchorder = async () => {
    // Reference to your Firestore collection
   const querySnapshot = await getDocs(collection(db, 'notice'));

  
      setorder(querySnapshot.size)
   };
fetchorder();
    }
    
    // Cleanup function to unsubscribe when the component unmounts
 
  }, []);





 const [image, setimage] = useState(null);

  const [validated, setValidated] = useState(false);
    const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [clergyData, setClergyData] = useState({
  
    order:'',
    notice_name: '',
  date:"",
   img_url:"",
    status:false,
  });

  useEffect(() => {
  if (location.state && location.state.action === "edit") {
    setClergyData({
      date:location.state.data.date,
      order: location.state.data.order,
      notice_name: location.state.data.notice_name,
   
      status: location.state.data.status,
      img_url:location.state.data.img_url,
    });
    console.log(location.state.id)
  }
}, [location.state]);



  const storage = getStorage();

  const handleFileUpload = async (event) => {
     event.preventDefault();
    const file = image;

    if (file) {
      try {
        // Create a storage reference
        const storageRef = ref(storage, 'notice_files/' + file.name);

        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        console.log('File uploaded successfully. Download URL:', downloadURL);
   
      
        handleSubmit(downloadURL);

        // Now, you can use the downloadURL as needed (store it in a database, display it, etc.).
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
 
}


  const handleSubmit = async (url) => {
      
  

      if (location.state && location.state.action === "edit") {
           await  updateDoc(doc(db, "notice",location.state.id), {
       ...clergyData,
       img_url:url,
   
  
        }).then(() => {
  console.log("done")
            }).then(() => {  
     console.log("done")
    });
      }else{
   await  addDoc(collection(db, "notice"), {
       ...clergyData,
      order: (order + 100).toString(),
        img_url:url,
  
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
          <Accordion.Header>Prayers</Accordion.Header>
          <Accordion.Body>
            To facilitate the addition of Notices, users can seamlessly accomplish this task  subsequently filling in the corresponding fields with
            relevant information.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Form noValidate validated={validated} onSubmit={handleFileUpload}>
        <Row className="mb-3">
       
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>prayer title</Form.Label>
            <Form.Control
              name="notice_name"
              type="text"
              placeholder="Notice name"
              value={clergyData.notice_name}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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

           <h5 className="mb-4">Notice image</h5>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
            <Image fluid rounded src={clergyData.img_url} />
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
             <input type="file" onChange={(e) => setimage(e.target.files[0])} />
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Choose pdf</div>
                  <div className="text-gray small">PDF . Max size of 800K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  );
}

export default Addnotice;
