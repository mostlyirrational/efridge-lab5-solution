const csv = require("csv-parser");
const fs = require("fs");

let importedCrimes = [];

// Import mongoose and the models
const mongoose = require("mongoose");
const Crime = mongoose.model("Crime");
const CrimeType = mongoose.model("CrimeType");

let crimeService = {
  getDistinctCrimeTypes: () => {
    return Crime.distinct("crimeType.name");
  },

  getCrimesByType: (type, limit = 50) => {
    return Crime.find({ "crimeType.name": type })
      .limit(limit)
      .exec();
  },

  getCrimeById: id => {
    return Crime.find({ reportNumber: parseInt(id) }).exec();
  },

  loadCrimes: () => {
    return new Promise(function(resolve) {
      fs.createReadStream("data/COBRA-2019.csv") // Path is relative to the main process
        .pipe(csv())
        .on("data", crime => {
          console.log("Processing report: " + crime["Report Number"]);
          importedCrimes.push(
            new Crime({
              reportNumber: crime["Report Number"],
              reportDate: crime["Report Date"],
              occurDate: crime["Occur Date"],
              occurTime: parseInt(crime["Occur Time"]) || null,
              address: crime["Location"],
              crimeType: new CrimeType({
                name: crime["UCR Literal"],
                ucrCode: crime["UCR #"],
                ibrCode: crime["IBR Code"]
              }),
              location: {
                type: "Point",
                coordinates: [crime["Longitude"], crime["Latitude"]]
              }
            })
          );
        })
        .on("end", () => {
          // Bulk load the crimes into the database
          Crime.insertMany(importedCrimes)
            .then(() => {
              console.log("Crime file loaded");
              resolve("Crime file successfully processed");
            })
            .catch(err => {
              console.error(err);
              resolve("Crime file was not imported");
            });
        });
    });
  }
};

module.exports = crimeService;
