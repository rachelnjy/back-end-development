 // addEventListener: constanly waiting for update, looking for submit
 document.getElementById('resgiterForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    axios.post('http://localhost:3000/users/register', {
        username: username,
        email: email,
        password: password
    })
        .then(function (response) {
            console.log(response);
            // response rediract u to the page
            // Handle success, redirect or show a success message
            window.location.href = "./login.html"; // Redirect on success
        })
        .catch(function (error) {
            console.log(error);
            // Handle errors, show error message to user
        });
});