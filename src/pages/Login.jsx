import { useContext, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContex';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    function login() {
        const isCorrectUsername = username === "rafeahmk@gmail.com";
        const isCorrectPassword = password === "rafeahmk";
        if (isCorrectUsername && isCorrectPassword) {
            authContext.setToken("1234");
            navigate("/dashboard");
        }
    }

    return (
        <Container className="d-flex justify-content-center" style={{ marginTop: "50px" }}>
            <Row className="w-100">
                <Col md={8} xs={12} className='mx-auto'>
                    <h1 className='my-3 text-center'>Login to start paving your PhD</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="rafeahmk@gmail.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="rafeahmk"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <Button variant="primary" onClick={login} align="center" className="w-75">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
