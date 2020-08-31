"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const userStore = require("../models/user-store");
const assessmentStore = require("../models/assessment-store");
const goalStore = require("../models/goal-store");
const bmiCalculator = require('../utils/bmiCalculator');
const uuid = require("uuid");


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    
    const viewData = {
      title: "PlayGym Dashboard",
      assessments: assessmentStore.getUserAssessments(loggedInUser.id),
      user: userStore.getUserById(loggedInUser.id),
      goals: goalStore.getUserGoals(loggedInUser.id),
      bmi: bmiCalculator.BMICalculation(loggedInUser.id),
      bmiCategory: bmiCalculator.getBMICategory(loggedInUser.id),
      ibw: bmiCalculator.isIdealBodyWeight(loggedInUser.id),
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
  },
  
  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      date: new Date().toUTCString(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    logger.debug("Creating a new Assessment", newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },
  
  deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.debug(`Deleting Assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/dashboard");
  },
  
   addGoal(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newGoal = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      date: new Date().toUTCString(),
      weight: request.body.weight,
      waist: request.body.waist,
      hips: request.body.hips,
      status: request.body.status,
    };
    logger.debug("Creating a new Goal", newGoal);
    goalStore.addGoal(newGoal);
    response.redirect("/dashboard");
  },
};


module.exports = dashboard;
