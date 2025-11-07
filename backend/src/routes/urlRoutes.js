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
