// Send a POST request to the server to add a new task
function addTask(event) {
    event.preventDefault();

    const input = document.getElementById('todo-input');
    const task = input.value.trim();

    if (task !== '') {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'demo.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                input.value = '';
                loadTasks();
            }
        };
        xhr.send('action=add&task=' + encodeURIComponent(task));
    }
}

// Send a GET request to the server to load tasks and update the lists
function loadTasks() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'demo.php?action=get', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const tasks = JSON.parse(xhr.responseText);

            const todoList = document.getElementById('todo-list');
            const finishedList = document.getElementById('finished-list');

            todoList.innerHTML = '';
            finishedList.innerHTML = '';

            tasks.forEach(function (task) {
                const li = document.createElement('li');
                li.innerText = task.task;

                if (task.status === 'remaining') {
                    const deleteBtn = document.createElement('button');
                    deleteBtn.innerText = 'Delete';
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.addEventListener('click', function () {
                        deleteTask(task.id);
                    });

                    const finishBtn = document.createElement('button');
                    finishBtn.innerText = 'Finish';
                    finishBtn.addEventListener('click', function () {
                        finishTask(task.id);
                    });

                    li.appendChild(deleteBtn);
                    li.appendChild(finishBtn);

                    todoList.appendChild(li);
                } else if (task.status === 'finished') {
                    finishedList.appendChild(li);
                }
            });
        }
    };
    xhr.send();
}

// Send a POST request to the server to delete a task
function deleteTask(taskId) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'demo.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            loadTasks();
        }
    };
    xhr.send('action=delete&id=' + encodeURIComponent(taskId));
}

// Send a POST request to the server to mark a task as finished
function finishTask(taskId) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'demo.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            loadTasks();
        }
    };
    xhr.send('action=finish&id=' + encodeURIComponent(taskId));
}

// Attach event listener
document.getElementById('todo-form').addEventListener('submit', addTask);

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);
