const token = localStorage.getItem('jwtToken');
let userRole = null;

// decode the token to check for the user role
if (token) {
    const decodedToken = jwt_decode(token);
    userRole = decodedToken.role;
}

// display all eras
axios.get('http://localhost:3000/eras')
    .then(function (response) {
        var erasData = response.data;

        let eraHTML = erasData.map(era => {
            return `
        <div class="col-md-4 col-sm-6 col-xs-12 p-3">
            <div class="card" style="display: flex; flex-direction: column; height: 100%;">
                <div class="card-body">
                <h5 class="card-title">${era.Name}</h5>
                <p class="card-text">
                Description: ${era.Description}
                 </p>
            </div>
        </div>
     </div>
    `;
        });
        getErasContainer.innerHTML = eraHTML.join('');
    })
    .catch(function (error) {
        console.error(error);
        // Handle errors, show error message to the user
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
})

// if the login user is the admin, the admin would nto be able to see the taskprogress tab on the nav bar
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('jwtToken');
    let userRole = null;

    if (token) {
        const decodedToken = jwt_decode(token);
        userRole = decodedToken.role;

        if (userRole === 1) {
            // User is an admin, hide the "TaskProgress" link
            const taskProgressLink = document.querySelector('a[href="../taskprogress.html"]');
            if (taskProgressLink) {
                taskProgressLink.style.display = "none";
            }
        }
    }
});