import { Button, Form } from "react-bootstrap";

export default function OutcomeTodo({ outcome, onOutcomeChange, onDelete, isDeletable }) {
    return (
        <Form.Group className="d-flex align-items-center mb-3" key={outcome.id}>
            {/* Completed Checkbox */}
            <Form.Check
                type="checkbox"
                checked={outcome.completed}
                onChange={(e) => onOutcomeChange(outcome.id, "completed", e.target.checked)}
                className="me-3"
            />
            {/* Outcome Description Input */}
            <Form.Control
                value={outcome.description}
                onChange={(e) => onOutcomeChange(outcome.id, "description", e.target.value)}
                type="text"
                placeholder="Describe the outcome"
                required
                className="flex-grow-1"
            />
            {/* Delete Button (hidden if only one outcome) */}
            {isDeletable && (
                <Button variant="outline-danger" className="ms-3" onClick={() => onDelete(outcome.id)}>
                    <i className="bi bi-trash3-fill"></i>
                </Button>
            )}
        </Form.Group>
    );
}
