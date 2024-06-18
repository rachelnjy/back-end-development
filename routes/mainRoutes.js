// routes: contains route files responsible for defining the API routes
// file contains the main routes that don't belong to any specific entity

// routes follow the tables in the database
// if we have 3 tables: user, task, taskprogress
// then we have userRoutes, taskRoutes, taskprogressRoutes


const express = require('express');
const router = express.Router(); // are using router

const userRoutes = require('./userRoutes.js');
router.use("/users", userRoutes);

const taskRoutes = require('./taskRoutes.js');
router.use("/tasks", taskRoutes);

const taskprogressRoutes = require('./taskprogressRoutes.js');
router.use("/task_progress", taskprogressRoutes);

// section B
const usersRoutesSectionB = require('../routes/sectionB/usersRoutes.js');
router.use("/", usersRoutesSectionB);

const erasRoutesSectionB = require('../routes/sectionB/erasRoutes.js');
router.use("/", erasRoutesSectionB);

const timemachinesRoutesSectionB = require('../routes/sectionB/timemachinesRoutes.js');
router.use("/", timemachinesRoutesSectionB);

const challengesRoutesSectionB = require('../routes/sectionB/challengesRoutes.js');
router.use("/", challengesRoutesSectionB);

const messageRoutes = require('../routes/message/messageRoutes');
router.use("/", messageRoutes);

module.exports = router;
