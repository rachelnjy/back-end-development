// Fetch all users
axios.get('http://localhost:3000/users/')
    .then(function (response) {
        var users = response.data;
        console.log(response.data)

        let userHTML = users.map(user => `
        <div class="col-md-4 col-sm-6 col-xs-12 p-3">
           <div class="card" style="display: flex; flex-direction: column; height: 100%;">
                <div class="card-body">
                    <h5 class="card-title">${user.username}</h5>
                    <p class="card-text">
                        Email: ${user.email}
                        TotalPoints: ${user.TotalPoints}
                    </p>
                    <a href="viewUserProfile.html?user_id=${user.user_id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
    `);
    
        document.getElementById('getUserContainer').innerHTML = userHTML.join('');
    })
    .catch(function (error) {
        console.log(error);
        // Handle errors, show error message to the user
    });

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        // no token found, redirect to login page
        window.location.href = './login.html';
    }
    // if token found, continue with the page loading
})

document.getElementById('logoutButton').addEventListener('click', function (event) {
    event.preventDefault();
    // clear JWT token from local storage
    localStorage.removeItem('jwtToken');
    alert("You have been successfully logged out!");
    // redirect to login page
    window.location.href = './login.html';
})

// if the login user is the admin, the admin would nto be able to see the taskprogress tab on the nav bar
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


