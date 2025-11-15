

// // server/src/controllers/urlController.js
// import { nanoid } from 'nanoid';
// import Url from '../models/Url.js';
// import config from '../config/index.js';

// const BASE_URL = process.env.BASE_URL || config.baseUrl;

// // @desc    Shorten a URL
// // @route   POST /api/shorten
// // @access  Public (or Private if auth is required)
// const shortenUrl = async (req, res) => {
//   const { longUrl, customCode } = req.body;
//   const userId = req.user?._id; // Optional user ID if authenticated

//   if (!longUrl) return res.status(400).json({ message: 'URL is required' });
//   if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://'))
//     return res.status(400).json({ message: 'URL must start with http:// or https://' });

//   try {
//     let shortCode;
//     if (customCode) {
//       if (!/^[a-zA-Z0-9_-]{4,15}$/.test(customCode))
//         return res.status(400).json({ message: 'Custom code must be 4-15 alphanumeric characters, hyphens, or underscores.' });

//       const existingCustom = await Url.findOne({ shortCode: customCode });
//       if (existingCustom) return res.status(409).json({ message: 'Custom code already in use.' });
//       shortCode = customCode;
//     } else {
//       let unique = false;
//       while (!unique) {
//         const generatedCode = nanoid(8);
//         const existing = await Url.findOne({ shortCode: generatedCode });
//         if (!existing) {
//           shortCode = generatedCode;
//           unique = true;
//         }
//       }
//     }

//     const newUrl = new Url({ longUrl, shortCode, user: userId });
//     await newUrl.save();

//     res.status(201).json({
//       originalUrl: longUrl,
//       shortCode,
//       shortUrl: `${BASE_URL}/${shortCode}`,
//     });
//   } catch (error) {
//     console.error(`Error shortening URL: ${error.message}`);
//     res.status(500).json({ message: 'Server error during URL shortening' });
//   }
// };

// // @desc    Redirect to original URL and track clicks
// // @route   GET /:shortCode
// const redirectToOriginalUrl = async (req, res) => {
//   const { shortCode } = req.params;
//   try {
//     const urlEntry = await Url.findOne({ shortCode });
//     if (!urlEntry) return res.status(404).json({ message: 'Short URL not found' });

//     urlEntry.clicks++;
//     await urlEntry.save();

//     return res.redirect(urlEntry.longUrl);
//   } catch (error) {
//     console.error(`Error redirecting URL: ${error.message}`);
//     res.status(500).json({ message: 'Server error during redirection' });
//   }
// };

// // @desc    Get analytics for a short URL
// // @route   GET /api/analytics/:shortCode
// const getUrlAnalytics = async (req, res) => {
//   const { shortCode } = req.params;

//   try {
//     const urlEntry = await Url.findOne({ shortCode });
//     if (!urlEntry) return res.status(404).json({ message: 'Short URL not found' });

//     res.json({
//       longUrl: urlEntry.longUrl,
//       shortCode: urlEntry.shortCode,
//       totalClicks: urlEntry.clicks,
//       createdAt: urlEntry.createdAt,
//       dailyClicks: [
//         { date: '2025-01-01', count: 45 },
//         { date: '2025-01-02', count: 62 },
//         { date: '2025-01-03', count: 31 },
//       ],
//       topCountries: [
//         { country: 'US', clicks: 100 },
//         { country: 'IN', clicks: 70 },
//       ],
//       topReferrers: [
//         { referrer: 'google.com', clicks: 50 },
//         { referrer: 'facebook.com', clicks: 20 },
//       ],
//     });
//   } catch (error) {
//     console.error(`Error fetching analytics: ${error.message}`);
//     res.status(500).json({ message: 'Server error fetching analytics' });
//   }
// };

// // @desc    Get all URLs for authenticated user
// // @route   GET /api/user/links
// // @access  Private
// const getUserUrls = async (req, res) => {
//   const userId = req.user._id;
//   try {
//     const userUrls = await Url.find({ user: userId }).sort({ createdAt: -1 });
//     res.json(userUrls);
//   } catch (error) {
//     console.error(`Error fetching user URLs: ${error.message}`);
//     res.status(500).json({ message: 'Server error fetching user URLs' });
//   }
// };

// export { shortenUrl, redirectToOriginalUrl, getUrlAnalytics, getUserUrls };











// import { nanoid } from 'nanoid';
// import QRCode from 'qrcode';
// import Url from '../models/Url.js';
// import config from '../config/index.js';

// const BASE_URL = process.env.BASE_URL || config.baseUrl;

// // 🟢 1. Shorten URL + QR Code + Expiration + Custom Alias
// export const shortenUrl = async (req, res) => {
//   try {
//     const { longUrl, customAlias, expiresAt } = req.body;
//     const userId = req.user?._id;

//     if (!longUrl)
//       return res.status(400).json({ message: 'URL is required' });
//     if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://'))
//       return res.status(400).json({ message: 'URL must start with http:// or https://' });

//     let shortCode;

//     // 🧩 Check custom alias availability
//     if (customAlias) {
//       const existingAlias = await Url.findOne({ shortCode: customAlias });
//       if (existingAlias)
//         return res.status(409).json({ message: 'Custom alias already in use' });
//       shortCode = customAlias;
//     } else {
//       // Auto generate random short code
//       let unique = false;
//       while (!unique) {
//         const generatedCode = nanoid(8);
//         const existing = await Url.findOne({ shortCode: generatedCode });
//         if (!existing) {
//           shortCode = generatedCode;
//           unique = true;
//         }
//       }
//     }

//     const shortUrl = `${BASE_URL}/${shortCode}`;

//     // 🧾 Generate QR Code (base64 format)
//     const qrCode = await QRCode.toDataURL(shortUrl);

//     // ⏰ Set expiry date if provided
//     const expiryDate = expiresAt ? new Date(expiresAt) : null;

//     const newUrl = new Url({
//       longUrl,
//       shortCode,
//       shortUrl,
//       qrCode,
//       user: userId || null,
//       expiresAt: expiryDate,
//       createdAt: new Date(),
//     });

//     await newUrl.save();

//     return res.status(201).json({
//       message: 'URL shortened successfully',
//       originalUrl: longUrl,
//       shortUrl,
//       qrCode,
//       expiresAt: expiryDate,
//     });
//   } catch (error) {
//     console.error('Error shortening URL:', error.message);
//     res.status(500).json({ message: 'Server error during URL shortening' });
//   }
// };

// // 🟢 2. Redirect to original URL + record analytics
// export const redirectToOriginalUrl = async (req, res) => {
//   try {
//     const { shortCode } = req.params;
//     const urlEntry = await Url.findOne({ shortCode });

//     if (!urlEntry)
//       return res.status(404).json({ message: 'Short URL not found' });

//     // Check if expired
//     if (urlEntry.expiresAt && new Date() > urlEntry.expiresAt)
//       return res.status(410).json({ message: 'This link has expired.' });

//     // Track analytics info
//     urlEntry.clicks += 1;
//     urlEntry.analytics.push({
//       timestamp: new Date(),
//       ipAddress: req.ip,
//       userAgent: req.headers['user-agent'],
//       referer: req.headers['referer'] || 'Direct',
//     });

//     await urlEntry.save();

//     return res.redirect(urlEntry.longUrl);
//   } catch (error) {
//     console.error('Error redirecting URL:', error.message);
//     res.status(500).json({ message: 'Server error during redirection' });
//   }
// };

// // 🟢 3. Get analytics for a short URL
// export const getUrlAnalytics = async (req, res) => {
//   try {
//     const { shortCode } = req.params;
//     const urlEntry = await Url.findOne({ shortCode });

//     if (!urlEntry)
//       return res.status(404).json({ message: 'Short URL not found' });

//     const dailyClicks = {};
//     urlEntry.analytics.forEach((entry) => {
//       const day = new Date(entry.timestamp).toISOString().split('T')[0];
//       dailyClicks[day] = (dailyClicks[day] || 0) + 1;
//     });

//     res.json({
//       longUrl: urlEntry.longUrl,
//       shortUrl: urlEntry.shortUrl,
//       totalClicks: urlEntry.clicks,
//       createdAt: urlEntry.createdAt,
//       expiresAt: urlEntry.expiresAt,
//       dailyClicks,
//       recentActivity: urlEntry.analytics.slice(-5).reverse(),
//     });
//   } catch (error) {
//     console.error('Error fetching analytics:', error.message);
//     res.status(500).json({ message: 'Server error fetching analytics' });
//   }
// };

// // 🟢 4. Get all URLs for authenticated user
// export const getUserUrls = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const userUrls = await Url.find({ user: userId }).sort({ createdAt: -1 });
//     res.json(userUrls);
//   } catch (error) {
//     console.error('Error fetching user URLs:', error.message);
//     res.status(500).json({ message: 'Server error fetching user URLs' });
//   }
// };

// import { nanoid } from 'nanoid';
// import QRCode from 'qrcode';
// import Url from '../models/Url.js';
// import config from '../config/index.js';

// const BASE_URL = process.env.BASE_URL || config.baseUrl;

// // 🟢 1. Shorten URL + QR Code + Expiration + Custom Alias
// export const shortenUrl = async (req, res) => {
//   try {
//     const { longUrl, customAlias, expiresAt } = req.body;
//     const userId = req.user?._id;

//     if (!longUrl)
//       return res.status(400).json({ message: 'URL is required' });

//     // ✅ Ensure protocol (http/https)
//     if (!/^https?:\/\//i.test(longUrl))
//       return res.status(400).json({ message: 'URL must start with http:// or https://' });

//     let shortCode;

//     // ✅ Custom Alias Check
//     if (customAlias) {
//       const existingAlias = await Url.findOne({ shortCode: customAlias });
//       if (existingAlias)
//         return res.status(409).json({ message: 'Custom alias already in use' });
//       shortCode = customAlias;
//     } else {
//       // ✅ Generate unique short code
//       let isUnique = false;
//       while (!isUnique) {
//         const generatedCode = nanoid(8);
//         const existing = await Url.findOne({ shortCode: generatedCode });
//         if (!existing) {
//           shortCode = generatedCode;
//           isUnique = true;
//         }
//       }
//     }

//     const shortUrl = `${BASE_URL}/${shortCode}`;
//     const qrCode = await QRCode.toDataURL(shortUrl);
//     const expiryDate = expiresAt ? new Date(expiresAt) : null;

//     // ✅ Save new URL
//     const newUrl = new Url({
//       longUrl,
//       shortCode,
//       shortUrl,
//       qrCode,
//       user: userId || null,
//       expiresAt: expiryDate,
//       createdAt: new Date(),
//     });

//     await newUrl.save();

//     return res.status(201).json({
//       message: 'URL shortened successfully',
//       originalUrl: longUrl,
//       shortUrl,
//       qrCode,
//       expiresAt: expiryDate,
//     });
//   } catch (error) {
//     console.error('❌ Error shortening URL:', error.message);
//     res.status(500).json({ message: 'Server error during URL shortening' });
//   }
// };

// // 🟢 2. Redirect + Record Analytics
// export const redirectToOriginalUrl = async (req, res) => {
//   try {
//     const { shortCode } = req.params;
//     const urlEntry = await Url.findOne({ shortCode });

//     if (!urlEntry)
//       return res.status(404).json({ message: 'Short URL not found' });

//     // ✅ Expiry Check
//     if (urlEntry.expiresAt && new Date() > urlEntry.expiresAt)
//       return res.status(410).json({ message: 'This link has expired.' });

//     // ✅ Analytics tracking
//     urlEntry.clicks += 1;
//     urlEntry.analytics.push({
//       timestamp: new Date(),
//       ipAddress: req.ip,
//       userAgent: req.headers['user-agent'],
//       referer: req.headers['referer'] || 'Direct',
//     });

//     await urlEntry.save();

//     // ✅ Redirect
//     return res.redirect(urlEntry.longUrl);
//   } catch (error) {
//     console.error('❌ Error redirecting URL:', error.message);
//     res.status(500).json({ message: 'Server error during redirection' });
//   }
// };

// // 🟢 3. Get Analytics Data
// export const getUrlAnalytics = async (req, res) => {
//   try {
//     const { shortCode } = req.params;
//     const urlEntry = await Url.findOne({ shortCode });

//     if (!urlEntry)
//       return res.status(404).json({ message: 'Short URL not found' });

//     // ✅ Compute daily clicks
//     const dailyClicks = {};
//     urlEntry.analytics.forEach((entry) => {
//       const day = new Date(entry.timestamp).toISOString().split('T')[0];
//       dailyClicks[day] = (dailyClicks[day] || 0) + 1;
//     });

//     res.json({
//       longUrl: urlEntry.longUrl,
//       shortUrl: urlEntry.shortUrl,
//       totalClicks: urlEntry.clicks,
//       createdAt: urlEntry.createdAt,
//       expiresAt: urlEntry.expiresAt,
//       dailyClicks,
//       recentActivity: urlEntry.analytics.slice(-5).reverse(),
//     });
//   } catch (error) {
//     console.error('❌ Error fetching analytics:', error.message);
//     res.status(500).json({ message: 'Server error fetching analytics' });
//   }
// };

// // 🟢 4. Get User URLs
// export const getUserUrls = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const userUrls = await Url.find({ user: userId }).sort({ createdAt: -1 });
//     res.json(userUrls);
//   } catch (error) {
//     console.error('❌ Error fetching user URLs:', error.message);
//     res.status(500).json({ message: 'Server error fetching user URLs' });
//   }
// };



















import { nanoid } from "nanoid";
import QRCode from "qrcode";
import geoip from "geoip-lite";
import Url from "../models/Url.js";
import config from "../config/index.js";

const BASE_URL = process.env.BASE_URL || config.baseUrl;

/* -------------------------------------------------------------------------- */
/* 🟢 1. SHORTEN URL + QR CODE + EXPIRATION + CUSTOM ALIAS                    */
/* -------------------------------------------------------------------------- */
export const shortenUrl = async (req, res) => {
  try {
    const { longUrl, customAlias, expiresAt } = req.body;
    const userId = req.user?._id;

    if (!longUrl)
      return res.status(400).json({ message: "URL is required" });

    // ✅ Ensure valid protocol
    if (!/^https?:\/\//i.test(longUrl))
      return res
        .status(400)
        .json({ message: "URL must start with http:// or https://" });

    let shortCode;

    // ✅ Handle custom alias
    if (customAlias) {
      const existingAlias = await Url.findOne({ shortCode: customAlias });
      if (existingAlias)
        return res
          .status(409)
          .json({ message: "Custom alias already in use" });
      shortCode = customAlias;
    } else {
      // ✅ Generate unique short code
      let isUnique = false;
      while (!isUnique) {
        const generatedCode = nanoid(8);
        const exists = await Url.findOne({ shortCode: generatedCode });
        if (!exists) {
          shortCode = generatedCode;
          isUnique = true;
        }
      }
    }

    const shortUrl = `${BASE_URL}/${shortCode}`;
    const qrCode = await QRCode.toDataURL(shortUrl);
    const expiryDate = expiresAt ? new Date(expiresAt) : null;

    const newUrl = new Url({
      longUrl,
      shortCode,
      shortUrl,
      qrCode,
      user: userId || null,
      expiresAt: expiryDate,
      createdAt: new Date(),
    });

    await newUrl.save();

    return res.status(201).json({
      message: "URL shortened successfully",
      originalUrl: longUrl,
      shortUrl,
      qrCode,
      expiresAt: expiryDate,
    });
  } catch (error) {
    console.error("❌ Error shortening URL:", error.message);
    res.status(500).json({ message: "Server error during URL shortening" });
  }
};

// /* -------------------------------------------------------------------------- */
// /* 🟢 2. REDIRECT + RECORD ANALYTICS                                          */
// /* -------------------------------------------------------------------------- */
// export const redirectToOriginalUrl = async (req, res) => {
//   try {
//     const { shortCode } = req.params;
//     const urlEntry = await Url.findOne({ shortCode });

//     if (!urlEntry)
//       return res.status(404).json({ message: "Short URL not found" });

//     // ✅ Check for expiration
//     if (urlEntry.expiresAt && new Date() > urlEntry.expiresAt)
//       return res.status(410).json({ message: "This link has expired." });

//     // ✅ GeoIP Lookup
//     const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
//     const geo = geoip.lookup(ip);

//     // ✅ Record analytics
//     urlEntry.clicks += 1;
//     urlEntry.analytics.push({
//       timestamp: new Date(),
//       ipAddress: ip,
//       country: geo?.country || "Unknown",
//       userAgent: req.headers["user-agent"],
//       referer: req.headers["referer"] || "Direct",
//     });

//     await urlEntry.save();

//     // ✅ Redirect to the original URL
//     return res.redirect(urlEntry.longUrl);
//   } catch (error) {
//     console.error("❌ Error redirecting URL:", error.message);
//     res.status(500).json({ message: "Server error during redirection" });
//   }
// };


/* -------------------------------------------------------------------------- */
/* 🟢 REDIRECT + SMART ANALYTICS (with fallback GeoIP)                        */
/* -------------------------------------------------------------------------- */
export const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const urlEntry = await Url.findOne({ shortCode });

    if (!urlEntry)
      return res.status(404).json({ message: "Short URL not found" });

    // ✅ Check for expiration
    if (urlEntry.expiresAt && new Date() > urlEntry.expiresAt)
      return res.status(410).json({ message: "This link has expired." });

    // ✅ Trust proxy for real client IP
    // (Set app.set("trust proxy", true) in your server.js)
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress ||
      req.ip;

    // ✅ Primary geo lookup (geoip-lite)
    let geo = geoip.lookup(ip);
    let country = geo?.country || "Unknown";

    // 🌍 Fallback: if geoip-lite fails, use ipapi.co
    if (country === "Unknown" && !ip.includes("127.0.0.1") && !ip.includes("::1")) {
      try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        if (data?.country_name) {
          country = data.country_name;
        }
      } catch (err) {
        console.warn("⚠️ Fallback geo lookup failed:", err.message);
      }
    }

    // ✅ Record analytics
    urlEntry.clicks += 1;
    urlEntry.analytics.push({
      timestamp: new Date(),
      ipAddress: ip,
      country,
      userAgent: req.headers["user-agent"],
      referer: req.headers["referer"] || "Direct",
    });

    await urlEntry.save();

    // ✅ Redirect to original URL
    return res.redirect(urlEntry.longUrl);
  } catch (error) {
    console.error("❌ Error redirecting URL:", error.message);
    res.status(500).json({ message: "Server error during redirection" });
  }
};









/* -------------------------------------------------------------------------- */
/* 🟢 3. GET URL ANALYTICS                                                    */
/* -------------------------------------------------------------------------- */
export const getUrlAnalytics = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // ✅ Handle expired links
    if (urlDoc.expiresAt && new Date() > urlDoc.expiresAt) {
      return res.status(410).json({ message: "This link has expired" });
    }

    const totalClicks = urlDoc.clicks || 0;
    const { createdAt, expiresAt, analytics = [] } = urlDoc;

    // ✅ Group clicks by date
    const dailyClicks = analytics.reduce((acc, a) => {
      const date = new Date(a.timestamp).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const dailyClicksArray = Object.entries(dailyClicks).map(([date, count]) => ({
      date,
      count,
    }));

    // ✅ Top countries
    const countryCount = analytics.reduce((acc, a) => {
      const country = a.country || "Unknown";
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});

    const topCountries = Object.entries(countryCount)
      .map(([country, clicks]) => ({ country, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);

    // ✅ Top referrers
    const referrerCount = analytics.reduce((acc, a) => {
      const ref = a.referer || "Direct";
      acc[ref] = (acc[ref] || 0) + 1;
      return acc;
    }, {});

    const topReferrers = Object.entries(referrerCount)
      .map(([referrer, clicks]) => ({ referrer, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);

    // ✅ Response
    res.json({
      longUrl: urlDoc.longUrl,
      shortUrl: urlDoc.shortUrl,
      totalClicks,
      createdAt,
      expiresAt,
      dailyClicks: dailyClicksArray,
      topCountries,
      topReferrers,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};


/* -------------------------------------------------------------------------- */
/* 🟢 4. GET USER URL LIST                                                    */
/* -------------------------------------------------------------------------- */
export const getUserUrls = async (req, res) => {
  try {
    const userId = req.user._id;
    const userUrls = await Url.find({ user: userId }).sort({ createdAt: -1 });
    res.json(userUrls);
  } catch (error) {
    console.error("❌ Error fetching user URLs:", error.message);
    res.status(500).json({ message: "Server error fetching user URLs" });
  }
};
