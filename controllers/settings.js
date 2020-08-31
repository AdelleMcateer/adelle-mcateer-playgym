'use strict';

const accounts = require('./accounts.js');
const uuid = require('uuid');
const logger = require('../utils/logger');
const userStore = require('../models/user-store.js');

const settings = {
  index(request, response) {
    logger.info('settings rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Account Settings',
      user: userStore.getUserById(loggedInUser.id),
    };
    logger.info('about to render', loggedInUser);
    response.render('settings', viewData);
  },
  
updateSettings(request, response){
  const loggedInUser = accounts.getCurrentUser(request);
  const user = request.body;
  loggedInUser.name = user.name,
  loggedInUser.email = user.email,
  loggedInUser.password = user.password, 
  loggedInUser.address = user.address,  
  loggedInUser.gender = user.gender,
  loggedInUser.height = user.height, 
  loggedInUser.weight = user.weight, 
    
  userStore.store.save();
  logger.info(`updating ${user.name}`);
  response.redirect("/dashboard");
}  
};

module.exports = settings;