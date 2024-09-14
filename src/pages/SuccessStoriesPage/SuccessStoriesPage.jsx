// SuccessStoriesPage.jsx
import "./SuccessStoriesPage.css";
import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import successStoriesService from "../../services/successStories.service"; // Make sure this service is implemented
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure this is imported

function SuccessStoriesPage() {
  const [successStories, setSuccessStories] = useState([]);

  useEffect(() => {
    successStoriesService
      .getAll()
      .then((response) => {
        setSuccessStories(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the success stories!",
          error
        );
      });
  }, []);

  return (
    <div className="success-stories-page">
      <h1 className="page-heading">Success Stories</h1>

      <Row className="justify-content-center">
        {successStories.map((story) => (
          <Col xs={12} md={6} lg={4} className="mb-4" key={story._id}>
            <Card className="custom-card">
              {story.userId.picture && (
                <Card.Img
                  variant="top"
                  src={story.userId.picture}
                  alt={story.userId.name}
                  className="user-picture"
                />
              )}
              <Card.Body>
                <Card.Title className="story-title">{story.title}</Card.Title>
                <Card.Text className="story-description">
                  {story.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SuccessStoriesPage;
