import { Form } from "react-bootstrap";

export default function PhDCategory({ category, setCategory }) {
    return (
        <Form.Group className="mb-3" controlId="category">
            <Form.Label>PhD Category:</Form.Label>
            <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Choose a Category</option>
                <option value="Course">Course</option>
                <option value="Meeting">Meeting</option>
                <option value="Publication">Publication</option>
                <option value="Proposal Defense">Proposal Defense</option>
                <option value="Thesis Defense">Thesis Defense</option>
            </Form.Select>
        </Form.Group>
    );
}