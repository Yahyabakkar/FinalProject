import mongoose from 'mongoose';

const { Schema } = mongoose;

const experienceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const educationSchema = new Schema({
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  experience: {
    type: [experienceSchema],
    required: true,
  },
  education: {
    type: [educationSchema],
    required: true,
  },
  picture: {
    type: String,
  },
  userId:{
    type:Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
