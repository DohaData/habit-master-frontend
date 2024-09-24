import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ProgressBar,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import trackerService from "../../services/tracker.service";
import "./YourHabitProgressPage.css";

const YourHabitProgessPage = () => {
  const [userHabitTasksTracker, setUserHabitTasksTracker] = useState({});
  const [comments, setComments] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { habitId } = useParams();

  useEffect(() => {
    trackerService
      .getAllForAHabit(habitId)
      .then((response) => {
        setUserHabitTasksTracker(response.data);
        setComments(
          Object.fromEntries(
            response.data.taskTrackerIds.map((taskTracker) => [
              taskTracker._id,
              taskTracker.comments,
            ])
          )
        );
      })
      .catch((error) =>
        setErrorMessage(`Failed to fetch user habits. ${error.message}`)
      );
  }, [habitId]);

  const changeTaskStatus = (taskTrackerId, isCompleted) => {
    trackerService
      .changeTaskStatus(taskTrackerId, isCompleted)
      .then(() => {
        // Update the task locally
        setUserHabitTasksTracker((prevTracker) => ({
          ...prevTracker,
          taskTrackerIds: prevTracker.taskTrackerIds.map((taskTracker) =>
            taskTracker._id === taskTrackerId
              ? { ...taskTracker, isCompleted: !taskTracker.isCompleted }
              : taskTracker
          ),
        }));
      })
      .catch(() => console.error("Failed to change task status."));
  };

  // Calculate progress: percentage of completed tasks
  const totalTasks = userHabitTasksTracker.taskTrackerIds
    ? userHabitTasksTracker.taskTrackerIds.length
    : 0;
  const completedTasks = userHabitTasksTracker.taskTrackerIds
    ? userHabitTasksTracker.taskTrackerIds.filter(
        (taskTracker) => taskTracker.isCompleted
      ).length
    : 0;
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Update comments in the state when the user types
  const handleCommentChange = (taskTrackerId, newComment) => {
    setComments({
      ...comments,
      [taskTrackerId]: newComment,
    });
  };

  // Trigger the database update whenever comments change
  useEffect(() => {
    const taskTrackerIds = Object.keys(comments);
    taskTrackerIds.forEach((taskTrackerId) => {
      trackerService.updateTaskComments(taskTrackerId, comments[taskTrackerId])
        .catch((error) => console.error("Failed to update comments:", error));
    });
  }, [comments]);

  return (
    <Container className="your-habits-page">
      <h1 className="text-center">
        {userHabitTasksTracker.habitId?.name || "Loading..."}
      </h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Progress Bar */}
      <ProgressBar
        now={progressPercentage}
        label={`${Math.round(progressPercentage)}%`}
        className="mb-4"
      />

      <Row className="mb-4">
        {userHabitTasksTracker.taskTrackerIds?.map((taskTacker) => (
          <Col xs={12} md={4} key={taskTacker._id} className="mb-3">
            <Card className="habit-card">
              <Card.Body>
                <Card.Title>{`${taskTacker.taskId.name} - ${formatDate(
                  taskTacker.date
                )}`}</Card.Title>
                <Card.Text>{taskTacker.taskId.description}</Card.Text>
                <Card.Text>
                  <strong>Status:</strong>{" "}
                  {taskTacker.isCompleted ? "Completed" : "Pending"}
                </Card.Text>

                <Form>
                  <Form.Group controlId="formLongText">
                    <Form.Label>Comments:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={comments[taskTacker._id] || ""}
                      onChange={(e) =>
                        handleCommentChange(taskTacker._id, e.target.value)
                      }
                    />
                  </Form.Group>
                </Form>

                <Button
                  variant= {taskTacker.isCompleted ? "danger" : "success"}
                  onClick={() =>
                    changeTaskStatus(taskTacker._id, taskTacker.isCompleted)
                  }
                  className="mb-2"
                >
                  {taskTacker.isCompleted ? "Undo" : "Complete"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default YourHabitProgessPage;
