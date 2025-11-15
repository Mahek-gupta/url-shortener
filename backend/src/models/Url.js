// // server/src/models/Url.js
// import mongoose from 'mongoose';

// const urlSchema = mongoose.Schema({
//   longUrl: {
//     type: String,
//     required: true,
//   },
//   shortCode: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   clicks: {
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   // Reference to User model if authentication is implemented
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: false, // Not required if public shortening is allowed
//   },
//   // Add fields for advanced analytics like geo-location, referer, etc.
//   // analytics: [{
//   //   timestamp: { type: Date, default: Date.now },
//   //   ipAddress: String,
//   //   country: String,
//   //   userAgent: String,
//   //   referer: String,
//   // }]
// });

// const Url = mongoose.model('Url', urlSchema);

// export default Url;








import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
  },
  qrCode: {
    type: String, // base64 or image URL of QR code
  },
  customAlias: {
    type: String, // user-defined short code (optional)
    unique: false,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  analytics: [
    {
      timestamp: { type: Date, default: Date.now },
      ipAddress: String,
      country: String,
      userAgent: String,
      referer: String,
    },
  ],
  expiresAt: {
    type: Date,
    default: null, // if null, link never expires
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // optional if public shortening is allowed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically delete expired links
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Url = mongoose.model('Url', urlSchema);

export default Url;
