// Decode the token to get the user ID
const token = localStorage.getItem('jwtToken');
if (!token) {
    console.error('JWT token not found.');
    // Redirect to login page if token is not found
    window.location.href = './login.html';
}
const decodedToken = jwt_decode(token);
const userId = decodedToken.user_id;

// fetch user details
window.onload = async function () {
    try {
        // Fetch user details
        const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
        const user = userResponse.data;
        console.log(userResponse);
        document.getElementById('userDetailsContainer').innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${user.username}</h3>
                    <p class="card-text">Email: ${user.email}</p>
                    <p class="card-text">TotalPoints: ${user.TotalPoints}</p>
                </div>
            </div>
        `;

    } catch (error) {
        console.error('Error fetching user details:', error);
    }
};

document.getElementById('updateUserForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    // retrieve what the users input
    const username = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;

    try {
        await axios.put(`http://localhost:3000/users/${userId}`, { username, email, password });
        console.log(userId);
        alert("User updated successfully.");
        window.location.href = "./user.html";
        bootstrap.Modal.getInstance(document.getElementById('updateUserModal')).hide();
    } catch (error) {
        // If an error occurs during the request, log the error and show an error message
        console.error("Error updating User:", error);
        alert("There was an error updating the user.");
    }
});


// Delete user button event listener
document.getElementById('deleteUserBtn').addEventListener('click', async function () {
    try {
        await axios.delete(`http://localhost:3000/users/${userId}`);
        localStorage.removeItem('jwtToken');
        alert("User deleted successfully.");
        window.location.href = "./login.html";
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

// Logout button event listener
document.getElementById('logoutButton').addEventListener('click', function (event) {
    event.preventDefault();
    // Clear JWT token from local storage
    localStorage.removeItem('jwtToken');
    alert("You have been successfully logged out!");
    // Redirect to login page
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
    }
});
