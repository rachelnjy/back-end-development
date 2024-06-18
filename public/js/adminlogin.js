 // addEventListener: constanly waiting for update, looking for submit
 document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // retrieve values user enters
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    axios.post('http://localhost:3000/users/loginuser', {
        username: username,
        password: password
    })
        .then(function (response) {
            localStorage.setItem('jwtToken', response.data.token);

            // Use jwt-decode to decode the token
            var decodedToken = jwt_decode(response.data.token);
            if (decodedToken.role === 1) {
                // If user is an admin, redirect to home page
                window.location.href = "./index.html";
            } else {
                // if user is not an admin
                alert("You do not have admin access.");
            }
        })
        .catch(function (error) {
            console.log(error);
            // Handle errors, show error message
        });
});
