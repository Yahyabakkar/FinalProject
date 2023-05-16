import mongoose from 'mongoose';

const jobPostSchema = new mongoose.Schema({
  dateTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
  },
  schedule: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const JobPost = mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost;
