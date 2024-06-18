# Starter Repository for Assignment

This repository contains a set of codes to verify the functionality of my BED CA2 Assignement

Section A contains codes with specifications made in the assignment.
Section B challenges and eras where users are able to view different challeges and eras. Once they mark their challenge complete they will receive points Reward
It contains admin and user functionality. Admin will be given the role 1 and User will be given the role 2.

## Prerequisites
Before running the tests, ensure that the following dependencies are installed:

Node.js
npm (Node Package Manager)

To start the file : npm run dev

## Folder Structure
- BED-CA2-rachelngjiaying
- node_module
- public
    - css
        - style.css
    - images
    - js
        - challenges.js
        - challengeCompleted.js
        - eras.js
        - user.js
        - adminlogin.js
        - index.js
        - login.js
        - messages.js
        - register.js
        - task.js
        - taskprogress.js
        - user.js
        - viewUserProfile.js
    - challenges.html
    - challengeCompleted.html
    - eras.html
    - adminlogin.html 
    - index.html
    - login.html
    - messages.html
    - profile.html
    - register.html
    - task.html
    - taskprogress.html
    - user.html
    - viewUserProfile.html
- src
    - configs
        - initTables.js
    - controllers
        - message
           - messageController.js
       - section B
            - challengesController.js
            - erasController.js
            - timemachinesController.js
            - usersController.js
    - taskController.js
    - taskProgressController.js
    - userController.js
    - middlewares
        - bcryptMiddleware.js
        - jwtMiddleware.js
    - models
        - message
           - messageModel.js
        - section B
            - challengesModels.js
            - erasModels.js
            - timemachinesModels.js
            - usersModels.js
    - taskModel.js
    - taskProgressModel.js
    - userModel.js
    - routes
        - message
            - messageRoutes.js
        - section B
            - challengesRoutes.js
            - erasRoutes.js
            - timemachinesRoutes.js
            - usersRoutes.js
    - taskRoutes.js
    - taskProgressRoutes.js
    - userRoutes.js
    - services
        - db.js
        - verifyMiddleware.js
    - app.js
- .env
- .gitignore
- gsm_db_sql
- index.js
- package-lock.json
- package.json
- README.md


## changed Message SQL syntax from BS
CREATE TABLE Messages (
    id int NOT NULL AUTO_INCREMENT,
    message_text text NOT NULL,
    userid int NOT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY messages_ibfk_1 (userid),
    CONSTRAINT messages_ibfk_1 FOREIGN KEY (userid) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

## updated User SQL syntax
CREATE TABLE User (
    user_id int NOT NULL AUTO_INCREMENT,
    username text,
    email text,
    password text NOT NULL,
    role int DEFAULT NULL,
    TotalPoints int DEFAULT '0',
    PRIMARY KEY (user_id),
   CONSTRAINT chk_role CHECK ((role in (1,2)))
);

## added completedTasks Table SQLsyntax
CREATE TABLE CompletedTasks (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    task_id int NOT NULL,
    completion_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY completedtasks_ibfk_2 (task_id),
    KEY completedtasks_ibfk_1 (user_id),
    CONSTRAINT completedtasks_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT completedtasks_ibfk_2 FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE ON UPDATE CASCADE
);

## ca2 sql syntax
CREATE TABLE Users (
    UserID int NOT NULL AUTO_INCREMENT,
    Username varchar(50) DEFAULT NULL,
    Email varchar(100) DEFAULT NULL,
    Password varchar(100) DEFAULT NULL,
    TotalPoints int DEFAULT '0',
    PRIMARY KEY (UserID)
);

CREATE TABLE Challenges (
    ChallengeID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) DEFAULT NULL,
    Description text,
    PointsReward int DEFAULT NULL,
    PRIMARY KEY (ChallengeID)
);

CREATE TABLE Eras (
    EraID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) DEFAULT NULL,
    Description text,
    PRIMARY KEY (EraID)
);

CREATE TABLE TimeMachines (
    MachineID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) DEFAULT NULL,
    Description text,
    EraID int DEFAULT NULL,
    PRIMARY KEY (MachineID),
    KEY EraID (EraID),
    CONSTRAINT timemachines_ibfk_1 FOREIGN KEY (EraID) REFERENCES eras (EraID)
);

CREATE TABLE Task (
    task_id int NOT NULL AUTO_INCREMENT,
    title text,
    description text,
    points int DEFAULT NULL,
    PRIMARY KEY (task_id)
);

CREATE TABLE User (
    user_id int NOT NULL AUTO_INCREMENT,
    username text,
    email text,
    password text NOT NULL,
    role int DEFAULT NULL,
    TotalPoints int DEFAULT '0',
     PRIMARY KEY (user_id),
    CONSTRAINT chk_role CHECK ((role in (1,2)))
);
                
CREATE TABLE Messages (
    id int NOT NULL AUTO_INCREMENT,
    message_text text NOT NULL,
    userid int NOT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY messages_ibfk_1 (userid),
    CONSTRAINT messages_ibfk_1 FOREIGN KEY (userid) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE UserChallenges (
    UserChallengeID int NOT NULL AUTO_INCREMENT,
    user_id int DEFAULT NULL,
    ChallengeID int DEFAULT NULL,
    EraID int DEFAULT NULL,
    Status varchar(50) DEFAULT NULL,
    PRIMARY KEY (UserChallengeID),
    KEY era_idx (EraID),
    KEY userchallenges_ibfk_1_idx (user_id),
    KEY userchallenges_ibfk_2 (ChallengeID),
    CONSTRAINT era FOREIGN KEY (EraID) REFERENCES eras (EraID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT user FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT userchallenges_ibfk_2 FOREIGN KEY (ChallengeID) REFERENCES challenges (ChallengeID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE CompletedTasks (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    task_id int NOT NULL,
    completion_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY completedtasks_ibfk_2 (task_id),
    KEY completedtasks_ibfk_1 (user_id),
    CONSTRAINT completedtasks_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT completedtasks_ibfk_2 FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE TaskProgress (
    progress_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    task_id int NOT NULL,
    completion_date timestamp NULL DEFAULT NULL,
    notes text,
    PRIMARY KEY (progress_id),
    KEY taskprogress_user_id_user_user_id_idx (user_id),
    KEY taskprogress_task_id_task_task_id_idx (task_id),
    CONSTRAINT taskprogress_task_id_task_task_id FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT taskprogress_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

             
INSERT INTO Users (UserID, Username, Email, Password, TotalPoints)
VALUES
(1, 'Jameson', 'jameson@example.com', '123', 0),
(2, 'Whiskey', 'whiskey@example.com', '123',0),
(3, 'Jack', 'jack@example.com', '123', 0),
(4, 'Notdaniels', 'notdaniels@example.com', '123', 0),
(5, 'John', 'john@example.com', '123', 0);

INSERT INTO Challenges (ChallengeID, Name, Description, PointsReward)
VALUES
(1, 'Pyramid Builder', 'Assist in constructing a grand pyramid.', 100),
(2, 'Royal Quest', 'Embark on a quest to save the kingdom.', 150),
(3, 'Artistic Invention', 'Create a masterpiece of renaissance art.', 120),
(4, 'Industrial Innovator', 'Invent a machine that changes the course of industry.', 200),
(5, 'Peacekeeper of Utopia', 'Solve a complex future society problem.', 250);

INSERT INTO Eras (EraID, Name, Description)
VALUES
(1, 'Ancient Egypt', 'The era of Pharaohs and pyramids.'),
(2, 'Medieval Europe', 'A time of knights, castles, and quests.'),
(3, 'Renaissance', 'The age of enlightenment and discovery.'),
(4, 'Industrial Revolution', 'The period of rapid industrial growth and innovation.'),
(5, 'Future Utopia', 'A vision of a technologically advanced and ideal society.');

INSERT INTO TimeMachines (MachineID, Name, Description, EraID)
VALUES
(1, 'The Egyptian Voyager', 'A time machine designed for ancient adventures.', 1),
(2, 'Knight’s Gateway', 'Transports you to the chivalrous world of medieval times.', 2),
(3, 'Da Vinci’s Wings', 'Experience the renaissance in artistic brilliance.', 3),
(4, 'Steam Time Glider', 'Navigate through the industrial revolution.', 4),
(5, 'Quantum Leap', 'A journey to a futuristic and utopian era.', 5);

                
INSERT INTO Task VALUES
(1,'Plant a Tree','Plant a tree in your neighbourhood or a designated green area.',50),
(2,'Use Public Transportation','Use public transportation or carpool instead of driving alone.',30),
(3,'Reduce Plastic Usage','Commit to using reusable bags and containers.',40),
(4,'Energy Conservation','Turn off lights and appliances when not in use.',25),
(5,'Composting','Start composting kitchen scraps to create natural fertilizer.',35);

INSERT INTO User (username, email, password, role, TotalPoints) VALUES 
('admin','admin@example.com','123',1,0),
('yong','yong@example.com','123',2,0),
('rachel','rachel@example.com','123',2,0);
                
INSERT INTO Messages (message_text, userid) VALUES
("Hello world!", 1),
("Yummy!", 2),  
("I am the one", 3);
;


## added new endpoint for taskController.js
Endpoint: GET/:user_id/uncompleted;
- Description: get the uncompleted task by user_id
    - Parameters:
        - user_id (URL parameter)
    - Response:
        - 500 Internal Server Error

Endpoint: GET/:user_id/completed
- Description: get the completed task by user_id
   - Parameters:
        - user_id (URL parameter)
    - Response:
        - 500 Internal Server Error

Endpoint: POST/:user_id/complete/:task_id
- Description: for user to mark a specific task completed
    - Parameters:
        - user_id (URL parameter)
        - task_id (URL parameter)
    - Response:
        - 500 Internal Server Error
        - 201 Mark Task Completed


## updated endpoints in challenges controller
Endpoint: POST/challenges/complete/:ChallengeID/:EraID/:user_id
- Description: when user selects a specifc challenge and eraId, the user's totalPoint in the User table will be updated with his respective points
    - Parameters:
        - ChallengeID (URL parameter)
        - EraID (URL parameter)
        - user_id (URL parameter)
    - Response:
        - 500 Internal Server Error
        - 200 points successfully updated

## added new endpoint for taskProgress Controller
Endpoint: GET/task_progress/progress/:user_id/:task_id
- Description: fetching the task progress to the task progress page
    - Parameters:
        - user_id (URL parameter)
        - task_id (URL parameter)
    - Response:
        - 500 Internal Server Error
        - 200 points successfully updated
        - 404 not found


## updated model for task model file, markTaskAsCompleted
- Description: after adding marking the task complete the user's points will be updated 
- module.exports.markTaskAsCompleted = (data, callback) => {
    - const insertStatement = `
        INSERT INTO CompletedTasks (user_id, task_id)
        VALUES (?, ?);
    `;
    
    - const updateStatement = `
        UPDATE User
        SET TotalPoints = TotalPoints + 
            (SELECT points 
            FROM Task 
            WHERE Task.task_id = ?)
        WHERE user_id = ?;
    `;
    
    - const insertValues = [data.user_id, data.task_id];
    - const updateValues = [data.task_id, data.user_id];

    - pool.query(insertStatement, insertValues, (error, results) => {
        if (error) {
            callback(error);
        } else {
            pool.query(updateStatement, updateValues, callback);
        }
    });
};

## admin and user functions in each page
adminlogin.html: 
user role: 1 (admin role)
- only admin can login through adminlogin.html
- if user logs in whose not an admin: alert saying "you do not have admin access"

login.html:
- any user can login through this page including admin

resgiter.html:
- input name, email and password to create a new account
- successfully creating a new account, user will be redirected to the login page to login again
- by default all user creating new account will be given a role 2 (normal user)

home.html
- give access to every page on the nav bar

messages.html
- user can post any messages
- only the logged in user can edit and delete their own message

task.html
user role: 1 (admin role)
- admin can post task
- admin can view all task and update/delete specific task
user role: 2 (user role)
- user can view completed or uncompleted task
- at uncompleted task they can mark it as completed
- when user marks completed, their points will be updated also reflected in the user and profile page

taskprogress.html
user role: 2 (user role)
- view task completed together with notes added from the admin side (viewUserDetails under completed task)

user.html
user role: 1 (admin role)
- view all users profile (username, email, totalpoints) with a button 'View Details' at the bottom of each user card
user role: 2 (user role)
- view all users profile (username, email, totalpoints) with a button 'View Details' at the bottom of each user card

viewUserProfile.html
user role: 1 (admin role)
- can view specific user's username, email, totalpoints
- 3 buttons at the bottom: completed task, uncompleted task, delete user
- completed task will show by default when entering the page
- under completed task only admin has the role of adding a notes to the task
- only admin has the function to delete any users in the game
user role: 2 (user role)
- can view specific user's username, email, totalpoints
- 2 buttons at the bottom: completed task, uncompleted task
- by default shows the completed task when entering the page

challengesCompleted.html
user role: 1 & 2 (admin and user)
- select a challenge through the challenge dropdown
- select an era through the era dropdown
- press on complete challenge it will update the users TotalPoints and will be reflected in the user and profile page 

eras.html
user role: 1 & 2 (admin and user)
- view all eras

profile.html
- view the logged in user profile where user can see their username, email and totalpoints
- user can also delete their own account
- user can also update their account (username, email and password)


## admin flow (role: 1)
1. admin logs in via admin login page
2. redirected to the home page
3. access the user page where the admin can view all the user (including their username, email and TotalPoints)
4. each user has a card with a button 'view details' upon clicking on it, admin will be redirected to that specific user details (username, email, totalPoints). Admin will also be able to view the uncompleted and completed task of the specific user. Admin can also delete that specific user. Under completed tasks, admin can add notes to the specific completed task. Upon adding the notes successfully, user (role: 2) can view the notes add under taskProgress page.
5. At the task page, admin can post a new task.
6. Admin can view all tasks available and can also update/delete that specific task
7. At the Messages Page, admin can post messages and view messages posted by other users. But admin can only edit or delete it's own message.
8. Challenges page: Admin can post a new challenge and view all challenges available
9. Eras: Admin can view all Eras
10. ChallengeComplete: admin can select a challenge and era, upon clicking complete challenge the admin points will be updated.
11. Profile: Admin can view his own profile (username, email, totalPoints). Admin can update his own profile including password and can delete his own profile.
12. Upon Admin logining out, it will redirect user to the login page

## user flow (role: 2)
1. user logs in via the login page. if user logs in who's not an admin: alert saying "you do not have admin access."
2. redirected to the home page 
3. access the user page where the admin can view all the user (including their username, email and TotalPoints)
4. each user has a card with a button 'view details' upon clicking on it, admin will be redirected to that specific user details(username, email, totalPoints). User will also be able to view the completed and completed task of the specific user. 
5. Task page: user can view completed or uncompleted task, at uncompleted task they can mark it as completed. when user marks completed, their points will be updated also
6. Task Progress: View completed Task and also notes added from the admin side
7. At the Messages Page, user can post messages and view messages posted by other users. But user can only edit or delete its own message.
8. Challenges page: User can view all challenges available
9. Eras: User can view all Eras
10. ChallengeComplete: user can select a challenge and era, upon clicking complete challenge the user points will be updated
11. Profile: user can view his own profile (username, email, totalPoints). user can update his own profile including password and can delete his own profile.
12. Upon the user logging out, it will redirect user to the login page



