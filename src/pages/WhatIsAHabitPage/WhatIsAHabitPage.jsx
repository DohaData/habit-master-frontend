import { Container, Row, Col, Card } from "react-bootstrap";
import "./WhatIsAHabitPage.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer.jsx';

function WhatIsAHabitPage() {
    return (
        <div>
            <Navbar />
            <Container className="habit-page">
                <Row className="habit-header">
                    <Col>
                        <h1 className="text-center">What is a Habit?</h1>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <Card className="p-3">
                            <Card.Body>
                                <Card.Title>Definition</Card.Title>
                                <Card.Text>
                                    According to James Clear, in his book "Atomic Habits", a habit is
                                    a routine or behavior that is performed regularly—and, in many
                                    cases, automatically. It’s a loop of actions that has been
                                    ingrained over time through repetition.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <Card className="p-3">
                            <Card.Body>
                                <Card.Title>Benefits of Building Good Habits</Card.Title>
                                <ul>
                                    <li>Increases productivity and efficiency</li>
                                    <li>Helps build consistency in daily routines</li>
                                    <li>Leads to long-term behavioral changes</li>
                                    <li>Enhances self-discipline and focus</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <Card className="p-3">
                            <Card.Body>
                                <Card.Title>How is a Habit Composed?</Card.Title>
                                <Card.Text>
                                    A habit consists of four stages, as explained by James Clear:
                                </Card.Text>
                                <ul>
                                    <li><strong>Cue:</strong> A trigger that initiates the habit</li>
                                    <li><strong>Craving:</strong> The desire or motivation behind the habit</li>
                                    <li><strong>Response:</strong> The action or behavior that follows</li>
                                    <li><strong>Reward:</strong> The benefit or positive outcome from the habit</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <Card className="p-3">
                            <Card.Body>
                                <Card.Title>How a Habit Builds Your Identity</Card.Title>
                                <Card.Text>
                                    Habits don’t just change your actions; they also influence how
                                    you view yourself. As James Clear explains, each small habit you
                                    perform is a vote towards the person you want to become.
                                    Over time, as you consistently perform positive habits, you begin to see yourself as the type of person who embodies those actions.
                                </Card.Text>
                                <Card.Text>
                                    For example, consistently going for a run helps you see yourself
                                    as an athlete, or reading every day shapes your identity as a
                                    reader. Building your identity through habits is an ongoing process.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default WhatIsAHabitPage;
