import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TodoContext } from "../contexts/TodoContext";
import PhDCategory from "../components/PhDCategory";
import OutcomeTodo from "../components/OutcomeTodo";

export default function EditTodo() {
    const { id } = useParams();
    const { todos, setTodos } = useContext(TodoContext);
    const navigate = useNavigate();

    // Find the todo by ID
    const todo = todos.find((t) => t.id === parseInt(id));

    // Local state to manage form inputs
    const [category, setCategory] = useState(todo ? todo.category : "");
    const [title, setTitle] = useState(todo ? todo.title : "");
    const [startDate, setStartDate] = useState(todo ? new Date(todo.startDate) : null); // Set start date from todo
    const [endDate, setEndDate] = useState(todo ? new Date(todo.endDate) : null); // Set end date from todo
    const [outcomes, setOutcomes] = useState(
        todo ? todo.outcomes.map(outcome => ({ ...outcome, id: outcome.id || Date.now() + Math.random() }))
            : [{ id: Date.now() + Math.random(), description: "", completed: false }]
    );

    // Update the todo on form submission
    const updateTodo = (event) => {
        event.preventDefault();

        const updatedTodos = todos.map((t) =>
            t.id === parseInt(id)
                ? { ...t, category, title, outcomes, startDate, endDate }
                : t
        );

        setTodos(updatedTodos);
        navigate("/dashboard");
    };

    // Add a new outcome with a unique ID
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

    // Navigate back to the dashboard
    const handleCancel = () => {
        navigate("/dashboard");
    };

    useEffect(() => {
        if (!todo) {
            navigate("/");
        }
    }, [todo, navigate]);

    return (
        <Container className="d-flex justify-content-center" style={{ marginTop: "50px", marginBottom: "50px" }}>
            <Row className="w-100">
                <Col md={6} xs={12} className='mx-auto'>
                    <h1 className='my-3 text-center'>Edit PhD Goal</h1>
                    <Form onSubmit={updateTodo}>

                        {/* Category Selection */}
                        <PhDCategory category={category} setCategory={setCategory} />

                        {/* Activity Input */}
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

                        {/* Duration Input */}
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

                        {/* Outcome Inputs */}
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

                        {/* Button to Add More Outcomes */}
                        <Button variant="outline-secondary" onClick={addOutcome} className="mb-3">
                            + Add More Outcome
                        </Button>

                        <div className='d-flex justify-content-center'>
                            {/* Cancel Button */}
                            <Button variant="outline-danger" className="me-2 w-25" onClick={handleCancel}>
                                Cancel
                            </Button>

                            {/* Save Changes Button */}
                            <Button variant="primary" className="w-50" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
