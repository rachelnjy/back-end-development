 //  get the decoded user token
 const token = localStorage.getItem('jwtToken');
 let userId = null;

 if (token) {
     const decodedToken = jwt_decode(token);
     userId = decodedToken.user_id;
     fetchCompletedTasks(); //call the function
 } else {
     console.error("No token found");
     // Handle no token case, e.g., redirect to login
 }

//  get complete task
 async function fetchCompletedTasks() {
     try {
         const response = await axios.get(`http://localhost:3000/tasks/${userId}/completed`);
         const completedTasks = response.data;
        //  refresh completed task
         showCompletedTasks(completedTasks);
     } catch (error) {
         console.error("Error fetching completed tasks:", error);
     }
 }

 function showCompletedTasks(tasks) {
     const container = document.getElementById('completedTasksContainer');
     container.innerHTML = '';
     tasks.forEach(task => {
         const taskElement = document.createElement('div');
         taskElement.classList.add('task');
         taskElement.innerHTML = `
         <h3>${task.title}</h3>
         <p>${task.description}</p>
         <div id="progressNotes_${task.task_id}"></div>
     `;
         container.appendChild(taskElement);
         fetchTaskProgress(userId, task.task_id);
     });
 }

 async function fetchTaskProgress(userId, taskId) {
     try {
         const response = await axios.get(`http://localhost:3000/task_progress/progress/${userId}/${taskId}`);
         // access the first element
         const progress = response.data[0];
         console.log(progress);
         

         const progressContainer = document.getElementById(`progressNotes_${taskId}`);
         if (progress && progress.notes) {
             progressContainer.innerHTML = `<p><strong>Notes:</strong> ${progress.notes}</p>`;
         } else {
             progressContainer.innerHTML = `<p>No progress notes available.</p>`;
         }
     } catch (error) {
         console.error("Error fetching task progress:", error);
         console.log(progress);

     }
 }

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