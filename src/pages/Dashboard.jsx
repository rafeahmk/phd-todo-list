import { useContext, useState } from "react";
import { Nav, Form, Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../contexts/TodoContext";
import { format } from "date-fns";

export default function Dashboard() {
    const { todos, setTodos } = useContext(TodoContext);
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredTodos = activeFilter === "All"
        ? todos
        : todos.filter((todo) => todo.category === activeFilter);

    // Function to determine goal status and corresponding badge color
    const handleGoalStatus = (outcomes) => {
        if (outcomes.every(outcome => outcome.completed)) {
            return { status: "Completed Goal", color: "#8C9DE2" };
        } else if (outcomes.every(outcome => !outcome.completed)) {
            return { status: "Goal to start", color: "#e4e4e4" };
        } else {
            return { status: "Goal Progressing", color: "#D1DCFF" };
        }
    };

    return (
        <Container style={{ marginBottom: "50px" }}>
            <h1 className='my-3 text-center'>My List of PhD Things to Do</h1>

            {/* Filter Category */}
            <div className="d-flex justify-content-center my-3">
                <Nav variant="underline" defaultActiveKey="/home">
                    <Nav.Item><Nav.Link onClick={() => setActiveFilter("All")}>All</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link onClick={() => setActiveFilter("Course")}>Courses</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link onClick={() => setActiveFilter("Meeting")}>Meetings</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link onClick={() => setActiveFilter("Publication")}>Publications</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link onClick={() => setActiveFilter("Proposal Defense")}>Proposal Defense</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link onClick={() => setActiveFilter("Thesis Defense")}>Thesis Defense</Nav.Link></Nav.Item>
                </Nav>
            </div>

            <Row>
                <CardGroup todos={filteredTodos} setTodos={setTodos} handleGoalStatus={handleGoalStatus} />
            </Row>
        </Container>
    );
}

function CardGroup({ todos, setTodos, handleGoalStatus }) {
    const navigate = useNavigate();

    const handleOutcomeToggle = (todoId, outcomeIndex) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                const updatedOutcomes = todo.outcomes.map((outcome, index) => {
                    if (index === outcomeIndex) {
                        return { ...outcome, completed: !outcome.completed };
                    }
                    return outcome;
                });
                return { ...todo, outcomes: updatedOutcomes };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return todos.map((todo) => {
        // Extract status and color based on the outcomes
        const { status, color } = handleGoalStatus(todo.outcomes);

        // Format the start and end dates
        const formattedStartDate = todo.startDate ? format(new Date(todo.startDate), "dd MMM yyyy") : "N/A";
        const formattedEndDate = todo.endDate ? format(new Date(todo.endDate), "dd MMM yyyy") : "N/A";

        // Navigate to EditTodo page with the todo's ID
        const handleEditClick = () => {
            navigate(`/edit/${todo.id}`);
        };

        // Handle the delete action
        const handleDeleteClick = () => {
            const updatedTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(updatedTodos);
        };

        return (
            <Col md={4} key={todo.id}>
                <Card className="my-3">

                    {/* Card Header */}
                    <Card.Header
                        className="d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: color }}
                    >
                        <span style={{ fontSize: "1rem" }}>{status}</span>
                        <div>
                            <Button variant="outline-primary" className="me-2" onClick={handleEditClick}>
                                <i className="bi bi-pencil-square"></i>
                            </Button>
                            <Button variant="outline-danger" onClick={handleDeleteClick}>
                                <i className="bi bi-trash3-fill"></i>
                            </Button>
                        </div>
                    </Card.Header>

                    {/* Card Body */}
                    <Card.Body>
                        <Card.Text>{todo.category}</Card.Text>
                        <Card.Title>Goal: {todo.title}</Card.Title>
                        <Card.Text>
                            <em>{formattedStartDate} - {formattedEndDate}</em>
                        </Card.Text>
                        <br />
                        <Card.Text>
                            Outcome:
                            {todo.outcomes.map((outcome, index) => (
                                <div key={index} className="d-flex align-items-center">
                                    <Form.Check
                                        type="checkbox"
                                        checked={outcome.completed}
                                        onChange={() => handleOutcomeToggle(todo.id, index)} // Toggle checkbox state
                                        className="me-2"
                                    />
                                    {outcome.description}
                                </div>
                            ))}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        );
    });
}
