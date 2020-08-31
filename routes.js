~"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const trainerdashboard = require("./controllers/trainerdashboard.js");
const about = require("./controllers/about.js");
const settings = require('./controllers/settings.js');


router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

router.get("/dashboard", dashboard.index);
router.post("/dashboard/addAssessment", dashboard.addAssessment);
router.get("/dashboard/deleteAssessment/:id", dashboard.deleteAssessment);
router.post('/dashboard/addGoal', dashboard.addGoal);

router.get("/trainerdashboard", trainerdashboard.index);
router.get('/user/:id', trainerdashboard.viewUser);
router.get('/trainerdashboard/deleteuser/:id', trainerdashboard.deleteUser);

router.get("trainerdashboard/: id/addAssessment/:id", dashboard.addAssessment);
router.get("/trainerdashboard/deleteAssessment/:id", dashboard.deleteAssessment);
router.post("/trainerdashboard/addcomment", trainerdashboard.addComment)
//router.post("/trainerdashboard/addgoal", trainerdashboard.addGoal)

router.get("/settings", settings.index);
router.post('/settings', settings.updateSettings);


router.get("/about", about.index);

module.exports = router;
