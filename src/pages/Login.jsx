import React, { useState } from 'react';
import { Container, Form, Button, Card ,Spinner} from 'react-bootstrap';
import { FieldUserLoginApi } from '../lib/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const Navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const response = await FieldUserLoginApi({email:username, password:password});
      console.log("resss", response);
      if (response.status === true) {
        localStorage.setItem("UserToken", response.token);
        localStorage.setItem("userId", response.user.id);
        setisLoading(false);
        Navigate("/");
      }else{
        alert("Invalid credentials");
      }
    }catch (e) {
      console.error("Error in Login API", e);
      setLoading(false);
      alert("Failed to login");
    }finally {
      setisLoading(false);
    }

    onLogin(username, password);
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Card className="login-card" style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body className="p-4">
        
        <div className="text-center mb-4"><img
                  width={"100px"}
                  src="https://swif.truet.net/public/swifCompany/logo/logo.png"
                  // src="https://demos.creative-tim.com/material-dashboard/assets/img/logo-ct-dark.png"
                  alt="Logo"
                />
              </div>
          <h4 className="text-center mb-4">Sign in to Your Account</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg" disabled={isLoading} className='rounded-pill'>    
              {isLoading ? (
                  <Spinner animation="border" size="sm" className="me-2" />
                ) : (
                  "Login"
                )}  
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;