"use strict";

const userstore = require("../models/user-store");
const trainerstore = require("../models/trainer-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("PlayGym", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    user.assessments = [];
    user.goals = [];
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const userPassword = userstore.getUserByPassword(request.body.password);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    const trainerPassword = trainerstore.getTrainerByPassword(request.body.password);
    if (user && userPassword) {
      response.cookie("assessment", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } 
    else if
      (trainer && trainerPassword)
      {
      response.cookie("assessment", trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect("/trainerdashboard");
    } 
    else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.assessment;
    return userstore.getUserByEmail(userEmail);
  },
  
  getCurrentTrainer(request) {
    const trainerEmail = request.cookies.assessment;
    return trainerstore.getTrainerByEmail(trainerEmail);
  }
};

module.exports = accounts;
