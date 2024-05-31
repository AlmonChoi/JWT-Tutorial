const colors = require('colors');
const mongoose = require('mongoose');
const validator = require('validator');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.DB_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log(colors.cyan(`Database connection ${process.env.DB_STRING} successful`));
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