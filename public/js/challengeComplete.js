document.addEventListener('DOMContentLoaded', function () {
    const challengeDropdown = document.getElementById('challengeDropdown');
    const erasDropdown = document.getElementById('erasDropdown');
    const completeChallengeButton = document.getElementById('completeChallenge');

    // populate the dropdown eras data
    axios.get('http://localhost:3000/eras')
        .then(response => {
            const eras = response.data;
            eras.forEach(era => {
                const option = document.createElement('option');
                option.value = era.EraID;
                option.textContent = era.Name;
                erasDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching eras:', error));

    // populate the dropdown challenges data
    axios.get('http://localhost:3000/challenges')
        .then(response => {
            const challenges = response.data;
            challenges.forEach(challenge => {
                const option = document.createElement('option');
                option.value = challenge.ChallengeID;
                option.textContent = challenge.Name;
                challengeDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching challenges:', error));

    // complete challenge button
    completeChallengeButton.addEventListener('click', function () {
        const token = localStorage.getItem('jwtToken');
        // if no token is found redirect back to user page
        if (!token) {
            window.location.href = './user.html';
            return;
        }

        // decode token
        const decodedToken = jwt_decode(token);
        // extract the user_id from decoded token
        const userId = decodedToken.user_id;
        console.log(userId)
        const challengeId = challengeDropdown.value;
        const eraId = erasDropdown.value;

        axios.post(`http://localhost:3000/challenges/complete/${challengeId}/${eraId}/${userId}`)
            .then(response => {
                console.log('Challenge completed:', response);
                alert('Challenge completed successfully!');
            })
            .catch(error => {
                console.log('Error completing challenge:', error);
                alert('Error completing the challenge.');
            });
    });
});

// logout button
document.getElementById('logoutButton').addEventListener('click', function (event) {
    event.preventDefault();
    // clear JWT token from local storage
    localStorage.removeItem('jwtToken');
    alert("You have been successfully logged out!");
    // redirect to login page
    window.location.href = './login.html';
})

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
        
        // if user has the role 1 taskprogress link will not be display
        if (userRole === 1) {
            // if user is an admin, hide the "TaskProgress" link
            const taskProgressLink = document.querySelector('a[href="../taskprogress.html"]');
            if (taskProgressLink) {
                taskProgressLink.style.display = "none";
            }
        }
    }
});