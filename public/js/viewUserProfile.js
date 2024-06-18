let userId = null;

// Function to extract user ID from URL
function getUserIdFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('user_id');
}

// Fetch user ID from URL
userId = getUserIdFromUrl();

// Fetch user details and tasks on window load
window.onload = function () {
    if (!userId) {
        console.error('User ID not provided in the URL');
        return;
    }

    // Fetch user details
    axios.get('http://localhost:3000/users/' + userId)
        .then(function (response) {
            const user = response.data;
            console.log(response.data)
            document.getElementById('userDetailsContainer').innerHTML = `
                          <div class="card">
                              <div class="card-body">
                                  <h3 class="card-title">${user.username}</h3>
                                  <p class="card-text">Email: ${user.email}</p>
                                  <p class="card-text">TotalPoints: ${user.TotalPoints}</p>
                              </div>
                          </div>
                      `;
        })
        .catch(function (error) {
            console.error('Error fetching user details:', error);
        });

    // default shows the completed task
    filteredTasks(true);
};

// Function to filtered tasks based on completion status
async function filteredTasks(completed) {
    try {
        const token = localStorage.getItem('jwtToken');
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken.role; // Assuming the role is stored in 'role' key

        const response = await axios.get(`http://localhost:3000/tasks/${userId}/${completed ? 'completed' : 'uncompleted'}`);
        const tasks = response.data;
        const taskContainer = document.getElementById('taskContainer');
        taskContainer.innerHTML = '';

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task', 'mt-3');
            taskElement.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    `;

            // only when the task is completed and the user logged in is an admin
            if (completed && userRole === 1) { // Check for user role here
                const notesForm = document.createElement('form');
                notesForm.innerHTML = `
                            <input type="text" placeholder="Add notes" name="notes" required>
                            <button type="submit" class="btn btn-primary mt-2">Add Notes</button>
                        `;
                notesForm.onsubmit = (note) => {
                    note.preventDefault();
                    const notes = note.target.elements.notes.value;
                    addTaskProgress(task.task_id, notes);
                };
                taskElement.appendChild(notesForm);
            }

            taskContainer.appendChild(taskElement);
        });
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
    }
}

// Function to handle adding of note to completed task
function addTaskProgress(taskId, notes) {
    const completionDate = new Date().toISOString().split('T')[0]; // e.g., '2024-01-28'
    const data = {
        user_id: userId,
        task_id: taskId,
        completion_date: completionDate,
        notes: notes
    };

    axios.post('http://localhost:3000/task_progress', data)
        .then(response => {
            console.log('Task progress added:', response.data);
            // Show alert for successful addition
            alert('Notes successfully added!');
        })
        .catch(error => {
            console.error('Error adding task progress:', error);
        });
}

// delete user
document.getElementById('deleteUserBtn').addEventListener('click', async function () {
    // Retrieve the user ID from the URL
    const userId = getUserIdFromUrl();

    try {
        await axios.delete(`http://localhost:3000/users/${userId}`);
        alert("User deleted successfully.");
        window.location.href = "./user.html";
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("There was an error deleting the user.");
    }
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

// logout button
document.getElementById('logoutButton').addEventListener('click', function (event) {
    event.preventDefault();
    // clear JWT token from local storage
    localStorage.removeItem('jwtToken');
    alert("You have been successfully logged out!");
    // redirect to login page
    window.location.href = './login.html';
});

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

        if (userRole === 2) {
            const deleteUserButton = document.getElementById('deleteUserBtn');
            if (deleteUserButton) {
                deleteUserButton.style.display = 'none';
            }
        }
    }
});
