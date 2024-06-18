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
            // store JWT in local storage
            localStorage.setItem('jwtToken', response.data.token);

            // notify user about successful login
            alert('You have successfully logged in!');

            // handle success, redirect or show a success message
            window.location.href = "./index.html"; 
        })
        .catch(function (error) {
            console.log(error);
            // handle errors, show error message to user
        });
});