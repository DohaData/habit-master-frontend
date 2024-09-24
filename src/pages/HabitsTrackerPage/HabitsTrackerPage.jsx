import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import trackerService from "../../services/tracker.service";
import "./HabitsTrackerPage.css";

const HabitsTrackerPage = () => {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksForDay, setTasksForDay] = useState([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    trackerService
      .getAll()
      .then((response) => {
        setHabits(response.data); // Store fetched tasks
      })
      .catch((error) =>
        console.error("There was an error fetching the habits!", error)
      );
  }, []);

  // Update tasks for the selected date whenever habits or selectedDate changes
  useEffect(() => {
    const tasksOnSelectedDate = habits
      .flatMap((habit) =>
        habit.taskTrackerIds.filter((taskTracker) => {
          const taskDate = new Date(taskTracker.date);
          return (
            taskDate.getFullYear() === selectedDate.getFullYear() &&
            taskDate.getMonth() === selectedDate.getMonth() &&
            taskDate.getDate() === selectedDate.getDate()
          );
        })
      )
      .map((taskTracker) => {
        return {
          habitId: habits.find((habit) =>
            habit.taskTrackerIds.some((t) => t._id === taskTracker._id)
          ).habitId,
          taskTrackerId: taskTracker._id,
          taskId: taskTracker.taskId,
          isCompleted: taskTracker.isCompleted,
        };
      });

    setTasksForDay(tasksOnSelectedDate);
  }, [habits, selectedDate]);

  // Function to handle date change in the calendar
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const updateHabitLocally = (updatedTask) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => ({
        ...habit,
        taskTrackerIds: habit.taskTrackerIds.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        ),
      }))
    );
  };

  const changeTaskStatus = (taskTrackerId, isCompleted) => {
    trackerService
      .changeTaskStatus(taskTrackerId, isCompleted)
      .then((updatedTask) => {
        updateHabitLocally(updatedTask.data); // Update task locally
      })
      .catch(() => console.error("Failed to mark task as completed."));
  };

  return (
    <Container className="habits-page">
      <h1 className="text-center">Habits Tracker</h1>

      <Row>
        <Col md={6} className="calendar-col">
          <h3 className="text-center">Select a Date</h3>
          <Calendar onChange={onDateChange} value={selectedDate} />
        </Col>

        <Col md={6} className="tasks-col">
          <h3 className="text-center">
            Tasks for {selectedDate.toDateString()}
          </h3>
          {tasksForDay.length > 0 ? (
            tasksForDay.map((task) => (
              <Card key={task.taskTrackerId} className="mb-3">
                <Card.Body>
                  <Card.Title>{task.habitId.name}</Card.Title>
                  <Card.Text>{task.habitId.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      changeTaskStatus(task.taskTrackerId, task.isCompleted)
                    }
                  >
                    {task.isCompleted ? "Completed" : "Undo"}
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center">No tasks for this day.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HabitsTrackerPage;
