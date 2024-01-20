const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ijatinyadav:Gag0cYxkjHs2LrjE@cluster0.ndb9da0.mongodb.net/course-selling-webpage"
).then = () => {
  console.log("connected to the database");
};
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  image: { type: String, required: false },
});

const Admin = mongoose.model("Admin", "adminSchema");

const User = mongoose.model("User", "userSchema");

const Courses = mongoose.model("Courses", "courseSchema");

module.exports = { Admin, User, Courses };
