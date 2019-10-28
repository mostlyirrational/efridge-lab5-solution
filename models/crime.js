let mongoose = require("mongoose");

let crimeTypeSchema = mongoose.Schema({
  name: String,
  ucrCode: Number,
  ibrCode: Number
});

// Define the crime schema
let crimeSchema = mongoose.Schema({
    reportNumber: Number,
    reportDate: Date,
    occurDate: Date,
    occurTime: Number,
    address: String,
    crimeType: crimeTypeSchema,
    location: {
      type: { type: String },
      coordinates: [Number]
    }
});

// Register each model with Mongoose.
// There's no need to export here because mongoose is a singleton
mongoose.model('Crime', crimeSchema);
mongoose.model('CrimeType', crimeTypeSchema);
