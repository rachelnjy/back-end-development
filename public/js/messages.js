document.addEventListener('DOMContentLoaded', function () {
    let currentEditMessageId = null; 
    // decode jwt to get the user_id
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.user_id;

    window.userId = userId; // make userId globally accessible
    // function to fetch and display messages
    function fetchMessages() {
        axios.get('http://localhost:3000/readallmessages')
            .then(function (response) {
                const messages = response.data;
                console.log(messages)
                let messagesHtml = messages.map(msg => {
                    let buttons = '';
                    // if the userId logged in is the same as the user of the specifc message then they can edit/delete the message
                    if (userId === msg.user_id) {

                        buttons = `<button class="btn btn-primary" onclick="openEditModal(${msg.id}, '${msg.message_text}')">Edit</button>
                                   <button class="btn btn-danger" onclick="deleteMessage(${msg.id})">Delete</button>`;
                    }
                    // console.log(msg.id)
                    return `<p>${msg.username}: ${msg.message_text} ${buttons}</p>`;
                }).join('');
                document.getElementById('messagesContainer').innerHTML = messagesHtml;
            })
            .catch(function (error) {
                console.error('Error fetching messages:', error);
            });
    }

    //fetch and display messages
    fetchMessages();


    // access edit modal
    window.openEditModal = function (messageId, messageText) {
        currentEditMessageId = messageId;
        console.log(messageText)
        document.getElementById('editMessageText').value = messageText;
        var editModal = new bootstrap.Modal(document.getElementById('editMessageModal'));
        editModal.show();
    }

    // save the edited message
    window.saveEditedMessage = function () {
        var updateMessage = document.getElementById('editMessageText').value;
        axios.put(`http://localhost:3000/updatemessage/${currentEditMessageId}/${userId}`, {
            message_text: updateMessage
        })

            .then(function (response) {
                fetchMessages(); // Refresh the message
                var editModal = bootstrap.Modal.getInstance(document.getElementById('editMessageModal'));
                editModal.hide();
            })
            .catch(function (error) {
                console.error('Error updating message:', error);
                console.log()
            });
    }

    // delete a message
    // window helps u declare globally
    window.deleteMessage = function (messageId) {
        axios.delete(`http://localhost:3000/deletemessage/${messageId}/${userId}`)
            .then(function (response) {
                fetchMessages(); // Refresh the message list
            })
            .catch(function (error) {
                console.error('Error deleting message:', error);
            });
    };

    // save edited message
    document.getElementById('saveEdit').addEventListener('click', saveEditedMessage);

    // allow user to post a new message
    document.getElementById('messageForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            document.getElementById('responseContainer').innerText = 'User is not logged in.';
            return;
        }

        var messageText = document.getElementById('messageText').value;

        axios.post('http://localhost:3000/createMessage', {
            userid: userId,
            message_text: messageText
        })
            .then(function (response) {
                document.getElementById('responseContainer').innerText = 'Message sent successfully';
                fetchMessages(); // Refresh message list
            })
            .catch(function (error) {
                document.getElementById('responseContainer').innerText = 'Error sending message: ' + error;
            });
    });
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