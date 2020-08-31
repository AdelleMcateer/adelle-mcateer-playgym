"use strict";

const assessmentStore = require("../models/assessment-store.js");
const userStore = require("../models/user-store.js");
const accounts = require("../controllers/accounts.js");

const bmiCalculator= {
  BMICalculation(id) {
    const user = userStore.getUserById(id);    
    const assessments = assessmentStore.getUserAssessments(id);
    if(assessments.length===0) {
      return (Math.floor (user.weight / (user.height**2))/100);
    }
    else{
      let bmiNumber = assessments[assessments.length-1].weight / (user.height** 2);
      return bmiNumber.toFixed(2)
    }
  },
  
  getBMICategory(id) {
    const user = userStore.getUserById(id);
    const assessments = assessmentStore.getUserAssessments(id);
    const bmi = this.BMICalculation(id);
    if (bmi < 15.0) {
      return 'VERY SEVERELY UNDERWEIGHT';
    } else if (bmi >= 15 && bmi < 16) {
      return 'SEVERELY UNDERWEIGHT';
    } else if (bmi >= 16 && bmi < 18.5) {
      return 'UNDERWEIGHT';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'NORMAL';
    } else if (bmi >= 25 && bmi < 30) {
      return 'OVERWEIGHT';
    } else if (bmi >= 30 && bmi < 35) {
      return 'MODERATELY OBESE';
    } else if (bmi >= 35 && bmi < 40) {
      return 'SEVERELY OBESE';
    } else if (bmi >= 40) {
      return 'VERY SEVERELY OBESE';
    }

    return 'Error in BMI Calculation';
  },  
  
  idealBodyWeight(user){
    let genderWeight = 0;
    
    let heightInInches = this.convertHeightMetresToInches(user.height);
    if(heightInInches < 60){
      heightInInches = 60;
    }
    
    if(user.gender === "Male"){
      genderWeight = 50;
    } else {
      genderWeight = 45.5;
    }
    
    const idealBodyWeight = genderWeight + ((heightInInches - 60) * 2.3);
    return idealBodyWeight;
  },

  isIdealBodyWeight(user) {
    const weight = user.weight;

    const idealBodyWeight = this.idealBodyWeight(user);

    if (weight >= (idealBodyWeight - 2) && weight <= (idealBodyWeight + 2)) {
      return 'green';
    } else if (weight >= (idealBodyWeight - 5) && weight <= (idealBodyWeight + 5)) {
      return 'yellow';
    } else if (weight >= (idealBodyWeight - 8) && weight <= (idealBodyWeight + 8)) {
      return 'orange';
    } else {
      return 'red';
    }
  },

  convertHeightMetresToInches(height) {
    const heightInInches = (height * 39.37).toFixed(2);
    return heightInInches;
  },

}

module.exports = bmiCalculator;