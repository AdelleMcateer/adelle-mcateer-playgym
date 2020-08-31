"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const userStore = require('../models/user-store');
const trainerStore = require('../models/trainer-store');
const assessmentStore = require("../models/assessment-store");
const bmiCalculator = require('../utils/bmiCalculator');
const goalStore = require("../models/goal-store");
const uuid = require("uuid");

const trainerdashboard = {
    index(request, response) {
    logger.info("trainer dashboard rendering");
    const loggedInUser = accounts.getCurrentTrainer(request);
    
    const viewData = {
      title: "PlayGym Trainer Dashboard",
      user: userStore.getAllUsers(loggedInUser.id),
      assessments: assessmentStore.getAllAssessments(loggedInUser.id),
      goals: goalStore.getUserGoals(loggedInUser.id),
      //bmi: bmiCalculator.BMICalculation(loggedInUser.id),
      //bmiCategory: bmiCalculator.getBMICategory(loggedInUser.id),
      //ibw: bmiCalculator.isIdealBodyWeight(loggedInUser.id),
    };
    logger.info("about to render", userStore.getAllUsers());
    response.render("trainerdashboard", viewData);
  },

    viewUser(request, response) {
    const userId = request.params.id;
    logger.debug('Viewing Member = ', userId);
    const viewData = {
      title: "Member Assessments",
      user: userStore.getUserById(userId),
      assessments: assessmentStore.getUserAssessments(userId),
    };
    response.render("trainerassessment", viewData);
  },

    deleteUser(request, response) {
    const userId = request.params.id;
    logger.debug(`Deleting User ${userId}`);
    userStore.removeUser(userId);
    response.redirect('/trainerdashboard');
  },
  
  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      goals: []
    };
    logger.debug("Creating a new Assessment", newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/trainerdashboard");
  },
  
    addComment(request, response) {
    const assessmentId = request.params.assessmentId;
    const loggedInUser = accounts.getCurrentUser(request);
    //const assessmentId = assessmentStore.getAssessment(request);
    const comment = request.body.comment;
    assessmentStore.addComment(loggedInUser, assessmentId, comment);  
    logger.info("Adding Comment"); 
    response.redirect("/trainerdashboard/");
  }
};

module.exports = trainerdashboard;
 