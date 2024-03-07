const colors = require('colors');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const validator = require('validator');

let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config', 'settings.json'), 'utf8'));

mongoose
  .connect(config['databaseConnectionString'], {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log(colors.cyan(`Database connection ${config['databaseConnectionString']} successful`));
  })
  .catch((err) => {
    return(err);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  password: { 
    type: String, 
    required: true 
  },
});

module.exports = mongoose.model('user', userSchema);