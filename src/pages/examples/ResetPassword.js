import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Pathname } from "../../routes";
import { getAuth,sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, signInWithPhoneNumber, RecaptchaVerifier ,onAuthStateChanged,signInWithEmailAndPassword} from "firebase/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
    const [resetSent, setResetSent] = useState(false);

 const handleResetPassword = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      console.error("Error sending reset email", error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
   <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={Pathname.DashboardOverview.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">{resetSent ? "Reset Link Sent" : "Reset Password"}</h3>
                {resetSent ? (
                  <p>
                    A password reset link has been sent to {email}. Please check your email to reset your password.
                  </p>
                ) : (
                  <Form onSubmit={handleResetPassword}>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Your Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          autoFocus
                          required
                          type="email"
                          placeholder="example@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Reset Password
                    </Button>
                  </Form>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default ResetPassword;
