// // server/src/routes/urlRoutes.js
// import express from 'express';
// import { shortenUrl, redirectToOriginalUrl, getUrlAnalytics } from '../controllers/urlController.js';
// import { protect } from '../middlewares/auth.js'; // Protect analytics endpoint

// const router = express.Router();

// router.post('/shorten', shortenUrl); // Public for now, can add protect later
// router.get('/analytics/:shortCode', protect, getUrlAnalytics); // Protected route

// // This route should be at the very end to catch all undefined short codes
// router.get('/:shortCode', redirectToOriginalUrl);

// export default router;







// // server/src/routes/urlRoutes.js (add this route)
// import express from 'express';
// import { shortenUrl, redirectToOriginalUrl, getUrlAnalytics, getUserUrls } from '../controllers/urlController.js';
// import { protect } from '../middlewares/auth.js';

// const router = express.Router();

// // Public shortening. You might want to make this private later for registered users.
// router.post('/shorten', shortenUrl);
// // Get all links for the authenticated user
// router.get('/user/links', protect, getUserUrls);
// // Protected analytics endpoint
// router.get('/analytics/:shortCode', protect, getUrlAnalytics);

// // This route should be at the very end to catch all undefined short codes
// router.get('/:shortCode', redirectToOriginalUrl);

// export default router;

// server/src/routes/urlRoutes.js
import express from 'express';
import { shortenUrl, redirectToOriginalUrl, getUrlAnalytics, getUserUrls } from '../controllers/urlController.js';
import { protect } from '../middlewares/auth.js'; // Make sure protect is imported

const router = express.Router();

// Make the shorten route PROTECTED if you want links to always be associated with a user
router.post('/shorten', protect, shortenUrl); // <--- CHANGE HERE

router.get('/user/links', protect, getUserUrls);
router.get('/analytics/:shortCode', protect, getUrlAnalytics);
router.get('/:shortCode', redirectToOriginalUrl);

export default router;