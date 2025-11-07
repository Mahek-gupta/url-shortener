// server/src/models/Url.js
import mongoose from 'mongoose';

const urlSchema = mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Reference to User model if authentication is implemented
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Not required if public shortening is allowed
  },
  // Add fields for advanced analytics like geo-location, referer, etc.
  // analytics: [{
  //   timestamp: { type: Date, default: Date.now },
  //   ipAddress: String,
  //   country: String,
  //   userAgent: String,
  //   referer: String,
  // }]
});

const Url = mongoose.model('Url', urlSchema);

export default Url;