// server/src/services/shortenerService.js
// This file would contain more complex logic related to URL shortening,
// such as:
// - Generating unique short codes with specific algorithms
// - Handling custom domains for short links
// - Managing link expiration
// - Interacting with external analytics APIs (if applicable)

import { nanoid } from 'nanoid';
import Url from '../models/Url.js';

class ShortenerService {
  /**
   * Generates a unique short code.
   * @param {number} length Length of the short code.
   * @returns {Promise<string>} A unique short code.
   */
  static async generateUniqueShortCode(length = 8) {
    let shortCode;
    let isUnique = false;
    while (!isUnique) {
      shortCode = nanoid(length);
      const existingUrl = await Url.findOne({ shortCode });
      if (!existingUrl) {
        isUnique = true;
      }
    }
    return shortCode;
  }

  /**
   * Processes a long URL to shorten it, optionally with a custom code.
   * @param {string} longUrl The original long URL.
   * @param {string} [customCode] Optional custom short code.
   * @param {string} [userId] Optional user ID if linked to a user.
   * @returns {Promise<{url: Url, isNew: boolean}>} The saved URL entry and a flag if it's new.
   */
  static async createShortUrl(longUrl, customCode = null, userId = null) {
    // Basic validation
    if (!longUrl || (!longUrl.startsWith('http://') && !longUrl.startsWith('https://'))) {
      throw new Error('Invalid URL provided.');
    }

    // Check if long URL was already shortened by this user (optional)
    // const existingUrlEntry = await Url.findOne({ longUrl, user: userId });
    // if (existingUrlEntry) {
    //   return { url: existingUrlEntry, isNew: false };
    // }

    let shortCode;
    if (customCode) {
      if (!/^[a-zA-Z0-9_-]{4,15}$/.test(customCode)) {
        throw new Error('Custom code must be 4-15 alphanumeric characters, hyphens, or underscores.');
      }
      const existingCustom = await Url.findOne({ shortCode: customCode });
      if (existingCustom) {
        throw new Error('Custom code already in use.');
      }
      shortCode = customCode;
    } else {
      shortCode = await this.generateUniqueShortCode();
    }

    const newUrl = new Url({
      longUrl,
      shortCode,
      user: userId,
    });

    await newUrl.save();
    return { url: newUrl, isNew: true };
  }

  // You could add other service methods here, e.g.,
  // static async getUrlDetails(shortCode) { ... }
  // static async updateUrl(shortCode, updates) { ... }
}

export default ShortenerService;