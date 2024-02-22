
import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt,faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter,faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Toast} from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Pathname } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithPhoneNumber, RecaptchaVerifier ,onAuthStateChanged,signInWithEmailAndPassword} from "firebase/auth";
 import {app,db} from '../../components/Config.js'
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
export default () => {

  const navigate = useNavigate();
  const auth = getAuth(app);
   const provider = new GoogleAuthProvider();
       const [e_mail, sete_mail] = useState();
    const [password, setpassword] = useState();
      const [message, setmessage] = useState();
    const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
       setShowPrimary(true);
          animateProgress();
        setmessage("Successfully logged in");
  setTimeout(handleClosePrimary, 3000);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
              setShowPrimary(true);
         setmessage(errorMessage);
         setTimeout(handleClosePrimary, 3000);
         
      });
  };




const user_validation = (e) => {
  e.preventDefault();
  const auth = getAuth(app);


// Your password input value here

  signInWithEmailAndPassword(auth, e_mail, password)
    .then((userCredential) => {
       const user = userCredential.user;
      setShowPrimary(true);
     animateProgress();
      setmessage("Successfully logged in");
      setTimeout(handleClosePrimary, 3000);
    })
    .catch((error) => {
      const errorMessage = error.message;
      setShowPrimary(true);
      setmessage(errorMessage);
      setTimeout(handleClosePrimary, 3000);
    });
};





 const [progress, setProgress] = useState(0);

  
    const animateProgress = () => {
      let startTime;
      const duration = 2000; // 2 seconds

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const newProgress = (elapsedTime / duration) * 100;

        setProgress(newProgress);

        if (elapsedTime < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    



    const [showPrimary, setShowPrimary] = useState(false);
const [showTertiary, setShowTertiary] = useState(true);
const date=new Date();

 const handleClosePrimary = () => {
    setShowPrimary(false);
   navigate("/")
  };
const handleCloseTertiary = () => setShowTertiary(false);
  return (
    <main>


 <Toast show={showPrimary} onClose={handleClosePrimary} className="bg-primary text-white my-3">
      <Toast.Header className="text-primary" closeButton={false}>
          <faArrowCircleUp className="icon icon-xs text-gray-500" />
          <strong className="me-auto ms-2">Login</strong>
         
        
      </Toast.Header>
      <Toast.Body>
   {message}
      </Toast.Body>
  </Toast>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Pathname.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" />homepage
            </Card.Link>
          </p>
           
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>

              
 <ProgressBar variant="success" now={progress} />
               
                    
                </div>
                <Form className="mt-4" onSubmit={user_validation}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text    value={e_mail}
                       
                            onChange={(e) => {
                                sete_mail(e.target.value);
                            }}>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text 
                         value={password}
                       
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                        >
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link  as={Link} to={Pathname.ResetPassword.path}className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
               
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button   onClick={handleGoogleSignIn} variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faGoogle} />
                   
                  </Button>
                  {/* <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button> */}
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Pathname.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
