<?php
// Establish database connection
$servername = 'localhost';
$username = 'dipenroot';
$password = 'dipen1508';
$database = 'dipen';

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the action parameter is set
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'add') {
            // Add a new task
            if (isset($_POST['task'])) {
                $task = $_POST['task'];

                $sql = "INSERT INTO tasks (task, status) VALUES ('$task', 'remaining')";
                if ($conn->query($sql) === TRUE) {
                    echo "Task added successfully.";
                } else {
                    echo "Error adding task: " . $conn->error;
                }
            }
        } elseif ($_POST['action'] === 'delete') {
            // Delete a task
            if (isset($_POST['id'])) {
                $taskId = $_POST['id'];

                $sql = "DELETE FROM tasks WHERE id = '$taskId'";
                if ($conn->query($sql) === TRUE) {
                    echo "Task deleted successfully.";
                } else {
                    echo "Error deleting task: " . $conn->error;
                }
            }
        } elseif ($_POST['action'] === 'finish') {
            // Mark a task as finished
            if (isset($_POST['id'])) {
                $taskId = $_POST['id'];

                $sql = "UPDATE tasks SET status = 'finished' WHERE id = '$taskId'";
                if ($conn->query($sql) === TRUE) {
                    echo "Task marked as finished.";
                } else {
                    echo "Error marking task as finished: " . $conn->error;
                }
            }
        } elseif ($_POST['action'] === 'deleteFinished') {
            // Delete a task from the finished task list
            if (isset($_POST['id'])) {
                $taskId = $_POST['id'];

                $sql = "DELETE FROM tasks WHERE id = '$taskId' AND status = 'finished'";
                if ($conn->query($sql) === TRUE) {
                    echo "Task deleted from finished list successfully.";
                } else {
                    echo "Error deleting task from finished list: " . $conn->error;
                }
            }
        }
    }
}

// Check if the action parameter is set to 'get'
if (isset($_GET['action']) && $_GET['action'] === 'get') {
    $sql = "SELECT * FROM tasks";
    $result = $conn->query($sql);

    $tasks = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $task = array(
                'id' => $row['id'],
                'task' => $row['task'],
                'status' => $row['status']
            );
            $tasks[] = $task;
        }
    }

    // Send the JSON response
    echo json_encode($tasks);
}

$conn->close();
?>
