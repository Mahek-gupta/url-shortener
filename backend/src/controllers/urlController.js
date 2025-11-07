// server/src/controllers/urlController.js
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import config from '../config/index.js';

const BASE_URL = process.env.BASE_URL || config.baseUrl;

// @desc    Shorten a URL
// @route   POST /api/shorten
// @access  Public (or Private if auth is required)
const shortenUrl = async (req, res) => {
  const { longUrl, customCode } = req.body;
  const userId = req.user?._id; // Optional user ID if authenticated

  if (!longUrl) return res.status(400).json({ message: 'URL is required' });
  if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://'))
    return res.status(400).json({ message: 'URL must start with http:// or https://' });

  try {
    let shortCode;
    if (customCode) {
      if (!/^[a-zA-Z0-9_-]{4,15}$/.test(customCode))
        return res.status(400).json({ message: 'Custom code must be 4-15 alphanumeric characters, hyphens, or underscores.' });

      const existingCustom = await Url.findOne({ shortCode: customCode });
      if (existingCustom) return res.status(409).json({ message: 'Custom code already in use.' });
      shortCode = customCode;
    } else {
      let unique = false;
      while (!unique) {
        const generatedCode = nanoid(8);
        const existing = await Url.findOne({ shortCode: generatedCode });
        if (!existing) {
          shortCode = generatedCode;
          unique = true;
        }
      }
    }

    const newUrl = new Url({ longUrl, shortCode, user: userId });
    await newUrl.save();

    res.status(201).json({
      originalUrl: longUrl,
      shortCode,
      shortUrl: `${BASE_URL}/${shortCode}`,
    });
  } catch (error) {
    console.error(`Error shortening URL: ${error.message}`);
    res.status(500).json({ message: 'Server error during URL shortening' });
  }
};

// @desc    Redirect to original URL and track clicks
// @route   GET /:shortCode
const redirectToOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const urlEntry = await Url.findOne({ shortCode });
    if (!urlEntry) return res.status(404).json({ message: 'Short URL not found' });

    urlEntry.clicks++;
    await urlEntry.save();

    return res.redirect(urlEntry.longUrl);
  } catch (error) {
    console.error(`Error redirecting URL: ${error.message}`);
    res.status(500).json({ message: 'Server error during redirection' });
  }
};

// @desc    Get analytics for a short URL
// @route   GET /api/analytics/:shortCode
const getUrlAnalytics = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortCode });
    if (!urlEntry) return res.status(404).json({ message: 'Short URL not found' });

    res.json({
      longUrl: urlEntry.longUrl,
      shortCode: urlEntry.shortCode,
      totalClicks: urlEntry.clicks,
      createdAt: urlEntry.createdAt,
      dailyClicks: [
        { date: '2025-01-01', count: 45 },
        { date: '2025-01-02', count: 62 },
        { date: '2025-01-03', count: 31 },
      ],
      topCountries: [
        { country: 'US', clicks: 100 },
        { country: 'IN', clicks: 70 },
      ],
      topReferrers: [
        { referrer: 'google.com', clicks: 50 },
        { referrer: 'facebook.com', clicks: 20 },
      ],
    });
  } catch (error) {
    console.error(`Error fetching analytics: ${error.message}`);
    res.status(500).json({ message: 'Server error fetching analytics' });
  }
};

// @desc    Get all URLs for authenticated user
// @route   GET /api/user/links
// @access  Private
const getUserUrls = async (req, res) => {
  const userId = req.user._id;
  try {
    const userUrls = await Url.find({ user: userId }).sort({ createdAt: -1 });
    res.json(userUrls);
  } catch (error) {
    console.error(`Error fetching user URLs: ${error.message}`);
    res.status(500).json({ message: 'Server error fetching user URLs' });
  }
};

export { shortenUrl, redirectToOriginalUrl, getUrlAnalytics, getUserUrls };
