import { Container, Row, Col, Card } from 'react-bootstrap';
import './HowToBuildAHabitPage.css';

const HowToBuildAHabitPage = () => {
  return (
    <Container className="HowToBuildAHabitPage">
      <Row className="habit-header">
        <Col>
          <h1 className="text-center">How to Build a Habit</h1>
        </Col>
      </Row>

      {/* Section 1: The 4-Step Process to Build a Habit */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>The 4-Step Process to Build a Habit</Card.Title>
              <Card.Text>
                According to James Clear, habits are built through a four-step process:
              </Card.Text>
              <ul>
                <li><strong>Cue:</strong> A trigger that starts the habit.</li>
                <li><strong>Craving:</strong> The motivation or desire behind the habit.</li>
                <li><strong>Response:</strong> The actual habit or action you take.</li>
                <li><strong>Reward:</strong> The benefit you gain from performing the habit.</li>
              </ul>
              <Card.Text>
                To successfully build a habit, make sure each step is as simple and easy as possible, especially at the beginning.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Section 2: Start Small and Be Consistent */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>Start Small and Be Consistent</Card.Title>
              <Card.Text>
                One of the most effective strategies to build a habit is starting small. Instead of overwhelming yourself, aim to create habits that are so easy you can’t say no.
              </Card.Text>
              <Card.Text>
                For example, if you want to build a habit of exercising, start with just 5 minutes a day. Consistency is more important than the intensity at the beginning. Once the habit is formed, you can scale up the effort.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Section 3: Habit Stacking */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>Habit Stacking</Card.Title>
              <Card.Text>
                Habit stacking is a technique where you pair a new habit with an existing one. By doing this, the old habit acts as a cue for the new one, making it easier to form.
              </Card.Text>
              <Card.Text>
                For example, if you already have the habit of drinking coffee in the morning, you could stack the new habit of writing a to-do list right after you finish your coffee. This leverages your existing routine to build new habits.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Section 4: Tracking Your Progress */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>Tracking Your Progress</Card.Title>
              <Card.Text>
                Tracking your habit progress is an essential step to building habits that last. Use a habit tracker to mark off each day you successfully perform the habit. This not only provides a visual reminder but also gives you a sense of accomplishment.
              </Card.Text>
              <Card.Text>
                The more consistent you are with tracking, the more momentum you’ll build. Don’t break the chain of consecutive successes!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HowToBuildAHabitPage;
