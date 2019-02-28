'use strict';
let util = require('util');
let db = require('../../services/db');

module.exports = {
  challenges: challenges,
  createChallenge:createChallenge
};

function challenges(req, res) {
  db.getChallenges().then((challenges) => res.json({challenges}));
}

function createChallenge(req,res) {
  let id = db.addChallenge(req.body);
  res.json({id});
}
