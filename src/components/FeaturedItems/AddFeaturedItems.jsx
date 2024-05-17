import React, { useState, useEffect, useRef } from 'react';
import { Form, Row, Col, Button, Accordion, InputGroup, Card } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useLocation } from 'react-router-dom';
export default function AddFeaturedItems() {

    const [validated, setValidated] = useState(false);
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [ItemData, setItemData] = useState({
        type: '',
        order: '',
        price: '',
        position: '',
        mobile: '',
        status: false,
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the selected files
        setSelectedImage(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger file input when the button is clicked
    };

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
        <div >
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add New Featured Items</Accordion.Header>
                    <Accordion.Body>
                        To facilitate the addition of new Featured Items, users can seamlessly accomplish this task by selecting
                        the appropriate role from a dropdown menu and subsequently filling in the corresponding fields with
                        relevant information.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Card className='mt-4'>
                <div className='mt-4' style={{ padding:'20px' }}>
                    <Form noValidate >
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Select
                                    name="type"
                                    aria-label="Default select example"
                                    onChange={handleInputChange}
                                    value={ItemData.type}
                                    required
                                    style={{
                                        resize:'none',
                                        display:'flex',
                                        verticalAlign: 'bottom',
                                        width:'96%'
                                    }}
                                >
                                    <option value="">Select</option>
                                    <option value="priest">Villa</option>
                                    <option value="bishop">Apartment</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    name="price"
                                    type="text"
                                    placeholder="Price"
                                    value={ItemData.price}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        resize:'none',
                                        display:'flex',
                                        verticalAlign: 'bottom',
                                        width:'96%'
                                    }}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Row className='mt-4'>
    <Col>
        <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Short description</Form.Label>
            <Form.Control
                as="textarea"
                name="position"
                type="text"
                value={ItemData.position}
                onChange={handleInputChange}
                required
                style={{ 
                    resize: 'none',
                    height: 'auto',
                    minHeight: '200px',
                    width: '100%', // Set initial width to 100%
                   
                    verticalAlign: 'bottom',
                    display: 'flex' 
                }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
    </Col>
</Row>

                            <Row className='mt-4'>
                                <Form.Group as={Col} md="6" controlId="validationCustom04">
                                    <Form.Label>Contact No</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            name="mobile"
                                            type="number"
                                            placeholder="Contact No"
                                            aria-describedby="inputGroupPrepend"
                                            value={ItemData.mobile}
                                            onChange={handleInputChange}
                                            required

                                        />
                                        <Form.Control.Feedback type="invalid">Please provide a valid number.</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Col> <Form.Group as={Col} md="4" controlId="validationCustom04" className=''>
                            <Form.Label>Status</Form.Label>
                            <div className='ml-4'>
                                <ToggleButton
                                    id={`radio-1`}
                                    type="checkbox"
                                    variant='outline-success'
                                    name="status"
                                    checked={ItemData.status}
                                    onChange={handleInputChange}
                                    style={{ marginRight: '10px' }}
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
                            </div>




                        </Form.Group></Col>
                            </Row>
                        </Row>

                          <div className='mb-4'>
                             <Card md='12'
                             style={{width:'100%',
                             display:'flex',
                             }}>
                                <Row>
                                    <Col style={{padding:'30px',fontWeight:'bold'}}>Choose image</Col>
                                    
                            <Col className="text-right " style={{padding:'30px'}}><Button onClick={handleButtonClick} style={{ backgroundColor: "green",borderColor:'ButtonShadow',}} >Upload Image</Button></Col>
                            <Row>
                                <Col>
                                <Col style={{padding:'20px'}}> <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*" 
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            {selectedImage && (
                                <div>
                                    <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                                    <p>Filename: {selectedImage.name}</p>
                                </div>
                            )}</Col>
                                </Col>
                            </Row>
                                </Row>
                             </Card>
                          </div>

                       
                        
                        {/* </Row> */}
                        <Button type="submit">Submit</Button>
                    </Form>
                </div></Card>


        </div>
    );
}
