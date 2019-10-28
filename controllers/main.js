const crimeService = require('../services/crimeService');

const home = async function (req, res) {
  
  // Get the crime types 
  let crimeTypes = await crimeService.getDistinctCrimeTypes();

  // Start with empty crimes, then fill if we are searching
  let matchingCrimes = [];
  if(req.query.type && req.query.type != '') {
    matchingCrimes = await crimeService.getCrimesByType(req.query.type);
  }

  res.render('home',  {
    crimeTypes: crimeTypes,
    currentCrime: req.query.type, // Will be undefined if no crime selected
    matchingCrimes: matchingCrimes
  });

}

const detail = async function (req, res) {
  if(req.params.id) {
    let crime = await crimeService.getCrimeById(req.params.id);
    res.render('detail', {crime: crime[0] }); // Result is an array so just get first one
  } else {
    res.redirect('/');
  }
}

const load = async function (req, res) {
  let loadResult = await crimeService.loadCrimes();
  res.send(loadResult);
};

module.exports = {
  home,
  detail,
  load
};