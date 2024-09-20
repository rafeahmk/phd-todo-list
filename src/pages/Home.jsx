import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export default function Home() {
    const navigate = useNavigate();

    function handleNavigate() {
        navigate("/dashboard");
    }

    return (
        <Container className="d-flex justify-content-center" style={{ marginTop: "50px", marginBottom: "50px" }}>
            <div className="text-center">
                <img
                    src="https://img.freepik.com/premium-vector/quote-about-pain-is-temporary-phd-degree-is-forever_858431-122.jpg"
                    alt="Quote about PhD"
                    style={{ maxWidth: "100%", height: "auto" }}
                />
                <br />
                <br />
                <Button variant="primary" onClick={handleNavigate} className="w-75">
                    Lets start your PhD journey!
                </Button>
            </div>
        </Container>
    );
}
