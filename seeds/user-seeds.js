const sequelize = require("../config/connection");
const { User } = require("../models");

const userdata = [
  {
    username: "the_black_cat",
    email: "fakeemail1@gmail.com",
    password: "Password21!",
  },
  {
    username: "gilda_theflamingo",
    email: "fakeemail2@gmail.com",
    password: "Password21!",
  },
  {
    username: "zany_cow",
    email: "fakeemail3@gmail.com",
    password: "Password21!",
  },
  {
    username: "light_fury",
    email: "fakeemail4@gmail.com",
    password: "Password21!",
  },
  {
    username: "colorado_bear",
    email: "fakeemail5@gmail.com",
    password: "123456789",
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
