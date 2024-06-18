const pool = require("../services/db");


const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully");
    }
    process.exit();
}

bcrypt.hash('123', saltRounds, (error, hash) => {
    if (error) {
        console.error("Error hashing password:", error);
    } else {
        console.log("Hashed password:", hash);
        const SQLSTATEMENT = `
        DROP TABLE IF EXISTS CompletedTasks;
        DROP TABLE IF EXISTS TaskProgress;
        DROP TABLE IF EXISTS UserChallenges;
        DROP TABLE IF EXISTS Messages;
        DROP TABLE IF EXISTS User;
        DROP TABLE IF EXISTS Task;
        DROP TABLE IF EXISTS TimeMachines;
        DROP TABLE IF EXISTS Eras;
        DROP TABLE IF EXISTS Challenges;
        DROP TABLE IF EXISTS Users;

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
                ('admin','admin@example.com','${hash}',1,0),
                ('yong','yong@example.com','${hash}',2,0),
                ('rachel','rachel@example.com','${hash}',2,0);


                INSERT INTO Messages (message_text, userid) VALUES
                ("Hello world!", 1),
                ("Yummy!", 2),  
                ("I am the one", 3);
                ;


                `;


        pool.query(SQLSTATEMENT, callback);
    }
});