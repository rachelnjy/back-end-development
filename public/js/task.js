// display all task
async function fetchAndDisplayTasks() {
    try {

        const response = await axios.get('http://localhost:3000/tasks/');
        const tasks = response.data;
        console.log(response)
        const taskContainer = document.getElementById('getTaskContainer');
        taskContainer.innerHTML = '';

        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('col-md-4', 'col-sm-6', 'col-xs-12', 'p-3');

            taskDiv.innerHTML = `
                <div class="card" style="display: flex; flex-direction: column; height: 100%;">
                    <div class="card-body">
                        <h5 class="card-title">${task.title}</h5>
                        <p class="card-text">${task.description}</p>
                        <p class="card-text">Points: ${task.points}</p>
                        <button class="btn btn-primary updateDelete" data-task-id="${task.id}">Update Delete</button>
                    </div>
                </div>
            `;
            taskContainer.appendChild(taskDiv);

            // view details for the specific selectedtask
            taskDiv.querySelector('.updateDelete').addEventListener('click', function () {
                document.getElementById('taskId').value = task.task_id;
                document.getElementById('taskTitle').value = task.title;
                document.getElementById('taskDescription').value = task.description;
                document.getElementById('taskPoints').value = task.points;

                const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
                taskModal.show();
            });
        });
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        alert("There was an error fetching tasks.");
    }
}

// post a new task
document.getElementById('postTaskForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const points = document.getElementById('points').value;

    try {
        await axios.post(`http://localhost:3000/tasks`, { title, description, points });
        fetchAndDisplayTasks(); // Refresh tasks
        bootstrap.Modal.getInstance(document.getElementById('postTaskModal')).hide();
    } catch (error) {
        console.error("Error posting task:", error);
        alert("There was an error posting the task.");
    }
});

// update task
document.getElementById('updateTaskForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const taskId = document.getElementById('taskId').value;
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const points = document.getElementById('taskPoints').value;

    try {
        await axios.put(`http://localhost:3000/tasks/${taskId}`, { title, description, points });
        fetchAndDisplayTasks(); // Refresh tasks
        bootstrap.Modal.getInstance(document.getElementById('taskModal')).hide();
    } catch (error) {
        console.error("Error updating task:", error);
        alert("There was an error updating the task.");
    }
});

// delete a task
document.getElementById('deleteTaskButton').addEventListener('click', async function () {
    const taskId = document.getElementById('taskId').value;

    try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        fetchAndDisplayTasks(); // Refresh tasks
        bootstrap.Modal.getInstance(document.getElementById('taskModal')).hide();
    } catch (error) {
        console.error("Error deleting task:", error);
        alert("There was an error deleting the task.");
    }
});


async function filteredTasks(completed) {
    if (!userId) {
        console.log("User ID not found!");
        return;
    }

    // if completed is true it will be assign to the completed status. 
    // If it is undefined it will be assign to the variable false
    const status = completed ? 'completed' : 'uncompleted';
    const endpoint = `http://localhost:3000/tasks/${userId}/${status}`;

    try {
        const response = await axios.get(endpoint);
        const tasks = response.data;

        const taskContainer = document.getElementById('taskContainer');
        taskContainer.innerHTML = '';

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');

            taskElement.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                `;
            
            // if task is not complete there will be a button under the uncomplete task to mark the task complete
            if (!completed) {
                const completeButton = document.createElement('button');
                completeButton.innerText = "Mark as Completed";
                completeButton.classList.add('btn', 'btn-warning', 'mb-3');

                completeButton.addEventListener('click', () => markTaskCompleted(task.task_id));

                taskElement.appendChild(completeButton);
            }

            taskContainer.appendChild(taskElement);
        });
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
        alert("There was an error fetching tasks.");
    }
}

// Implement markTaskCompleted if needed
async function markTaskCompleted(taskId) {
    try {
        const response = await axios.post(`http://localhost:3000/tasks/${userId}/complete/${taskId}`);

        console.log(response.data);
        // show the uncompleted task by default
        filteredTasks(false);
    } catch (error) {
        console.error("Failed to mark task as completed:", error);
        alert("There was an error marking the task as completed.");
    }
}

// retrieving the login in user role
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        window.location.href = './login.html';
        return;
    }

    // If we have a token, decode it to get the user's information
    const decodedToken = jwt_decode(token);
    const userRole = decodedToken.role;
    // Make sure userId is defined in a scope accessible to your functions
    const userId = decodedToken.user_id;

    window.userId = userId; // Make userId globally accessible

    // Role-based actions
    if (userRole === 1) {
        fetchAndDisplayTasks();
        // Since role 1 should not filter tasks, hide filter buttons if they exist
        const showUncompletedButton = document.getElementById('showUncompleted');
        const showCompletedButton = document.getElementById('showCompleted');
        if (showUncompletedButton) showUncompletedButton.style.display = 'none';
        if (showCompletedButton) showCompletedButton.style.display = 'none';


    } else if (userRole === 2) {
        // Only set event listeners for role 2
        const showUncompletedButton = document.getElementById('showUncompleted');
        const showCompletedButton = document.getElementById('showCompleted');
        if (showUncompletedButton) {
            showUncompletedButton.addEventListener('click', () => filteredTasks(false));
        }
        if (showCompletedButton) {
            showCompletedButton.addEventListener('click', () => filteredTasks(true));
        }
        document.getElementById('postTask').style.display = 'none';
        // Optionally display uncompleted tasks by default
        filteredTasks(false);
    }

    // Logout button event listener
    document.getElementById('logoutButton').addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('jwtToken');
        alert("You have been successfully logged out!");
        window.location.href = './login.html';
    });
});

// if user never log in there is nothing in the jwt token user is not able to access other pages directly only login page
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        // no token found, redirect to login page
        window.location.href = './login.html';
    }
    // if token found, continue with the page loading
})

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('jwtToken');
    let userRole = null;

    if (token) {
        const decodedToken = jwt_decode(token);
        userRole = decodedToken.role;

        if (userRole === 1) {
            // if user is an admin, hide the "TaskProgress" link
            const taskProgressLink = document.querySelector('a[href="../taskprogress.html"]');
            if (taskProgressLink) {
                taskProgressLink.style.display = "none";
            }
        }
    }
});