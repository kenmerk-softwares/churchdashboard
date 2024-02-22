import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, InputGroup, Button } from '@themesberg/react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Pathname } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
 import {app,db} from '../../components/Config.js'
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      // You can redirect or perform other actions after successful signup
      navigate(Pathname.Signin.path);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Col xs={12} className="d-flex align-items-center justify-content-center">
          <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
            <div className="text-center text-md-center mb-4 mt-md-0">
              <h3 className="mb-0">Create an account</h3>
            </div>
            <Form className="mt-4" onSubmit={handleSignup}>
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
              <Form.Group id="password" className="mb-4">
                <Form.Label>Your Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUnlockAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group id="confirmPassword" className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUnlockAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
              </Button>
            </Form>

            <div className="d-flex justify-content-center align-items-center mt-4">
              <span className="fw-normal">
                Already have an account?
                <Link to={Pathname.DashboardOverview.path} className="fw-bold">
                  {` Login here `}
                </Link>
              </span>
            </div>
          </div>
        </Col>
      </section>
    </main>
  );
};

export default Signup;
