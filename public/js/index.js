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