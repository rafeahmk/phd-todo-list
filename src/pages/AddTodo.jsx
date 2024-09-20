import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import PhDCategory from "../components/PhDCategory";
import OutcomeTodo from "../components/OutcomeTodo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTodo() {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [outcomes, setOutcomes] = useState([{ id: Date.now() + Math.random(), description: "", completed: false }]);
    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const navigate = useNavigate();

    // Add a new outcome to the list
    const addOutcome = () => {
        setOutcomes([...outcomes, { id: Date.now() + Math.random(), description: "", completed: false }]);
    };

    // Handle changes to individual outcomes
    const handleOutcomeChange = (id, field, value) => {
        setOutcomes(outcomes.map(outcome =>
            outcome.id === id ? { ...outcome, [field]: value } : outcome
        ));
    };

    // Delete an outcome from the list, ensuring at least one remains
    const deleteOutcome = (id) => {
        if (outcomes.length > 1) {
            setOutcomes(outcomes.filter(outcome => outcome.id !== id));
        }
    };

    function addTodo(event) {
        event.preventDefault();
        const outcomeList = outcomes.map(outcome => ({
            description: outcome.description,
            completed: outcome.completed
        }));
        setTodos([...todos, { id: Date.now(), category, title, outcomes: outcomeList, startDate, endDate }]);
        navigate("/dashboard");
    }

    return (
        <Container className="d-flex justify-content-center" style={{ marginTop: "50px", marginBottom: "50px" }}>
            <Row className="w-100">
                <Col md={6} xs={12} className='mx-auto'>
                    <h1 className='my-3 text-center'>Add a PhD Goal</h1>
                    <Form onSubmit={addTodo}>

                        {/* CATEGORY INPUT */}
                        <PhDCategory category={category} setCategory={setCategory} /> {/* Use PhDCategory component */}

                        {/* ACTIVITY INPUT */}
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>PhD Goal:</Form.Label>
                            <Form.Control
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="What do you need to do?"
                                required
                            />
                        </Form.Group>

                        {/* DURATION INPUT */}
                        <Form.Group className="mb-3">
                            <Form.Label>Duration:</Form.Label>
                            <Row>
                                <Col>
                                    <i className="bi bi-calendar me-2"></i>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        className="form-control"
                                        placeholderText="Start Date"
                                        required
                                    />
                                </Col>
                                <Col>
                                    <i className="bi bi-calendar me-2"></i>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        className="form-control"
                                        placeholderText="End Date"
                                        required
                                    />
                                </Col>
                            </Row>
                        </Form.Group>

                        {/* OUTCOMES INPUT */}
                        <Form.Label>Outcome:</Form.Label>
                        {outcomes.map((outcome) => (
                            <OutcomeTodo
                                key={outcome.id}
                                outcome={outcome}
                                onOutcomeChange={handleOutcomeChange}
                                onDelete={deleteOutcome}
                                isDeletable={outcomes.length > 1}
                            />
                        ))}

                        {/* Button to add more outcomes */}
                        <Button variant="outline-secondary" onClick={addOutcome} className="mb-3">
                            + Add More Outcome
                        </Button>

                        <div className='d-flex justify-content-center'>
                            <Button variant="primary" className="w-50" type="submit">Lets Grad!</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
