const token = localStorage.getItem('jwtToken');
let userRole = null;

// decode the token to check for the user role
if (token) {
    const decodedToken = jwt_decode(token);
    userRole = decodedToken.role;
}

// fetch challenges 
function fetchAndDisplayChallenges() {
    axios.get(`http://localhost:3000/challenges`) 
        .then(function (response) { 
            var challengesData = response.data; 
            let challengeHTML = challengesData.map(challenge => { 
                return ` 
                    <div class="col-md-4 col-sm-6 col-xs-12 p-3"> 
                        <div class="card" style="display: flex; flex-direction: column; height: 100%;"> 
                            <div class="card-body"> 
                                <h5 class="card-title">Name: ${challenge.Name}</h5> 
                                <p class="card-text"> 
                                    Description: ${challenge.Description}<br> 
                                    PointsReward: ${challenge.PointsReward} 
                                </p> 
                            </div> 
                        </div> 
                    </div>`; 
            }); 
            getChallengesContainer.innerHTML = challengeHTML.join(''); 
        }) 
        .catch(function (error) { 
            console.error(error); 
        });
}

// post challenges
document.getElementById('postChallengesForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    // retrieve values user enters
    const Name = document.getElementById('name').value;
    const Description = document.getElementById('description').value;
    const PointsReward = document.getElementById('pointsReward').value;

    try {
        await axios.post(`http://localhost:3000/challenges`, { Name, Description, PointsReward });
        // refresh challenges
        fetchAndDisplayChallenges();
        bootstrap.Modal.getInstance(document.getElementById('postChallengesModal')).hide();
    } catch (error) {
        console.error("Error posting challenge:", error);
        alert("There was an error posting the challenge.");
    }
});

// if user never log in there is nothing in the jwt token user is not able to access other pages directly only login page
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        // no token found, redirect to login page
        window.location.href = './login.html';
    }
    fetchAndDisplayChallenges(); 
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

        // if user is not an admin hide the post task button
        if (userRole === 2) {
            const postChallengesButton = document.getElementById('postChallenges');
            if (postChallengesButton) {
                postChallengesButton.style.display = 'none';
            }
        }
    }
});