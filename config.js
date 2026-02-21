// ===== Social Media API Configuration =====
// Fill in your API keys to enable live data

const API_CONFIG = {
    // ===== YouTube Data API v3 =====
    // Get your API key at: https://console.cloud.google.com/apis/credentials
    // Enable "YouTube Data API v3" in the API library
    youtube: {
        apiKey: 'YOUR_YOUTUBE_API_KEY_HERE',
        channelHandle: 'golfcoastpilot', // Your YouTube @handle
        // You can also use channel ID instead:
        // channelId: 'UC...',
    },

    // ===== Instagram Basic Display API =====
    // Set up at: https://developers.facebook.com/apps/
    // Requires Facebook Developer account and app approval
    instagram: {
        accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN_HERE',
        userId: 'YOUR_INSTAGRAM_USER_ID',
    },

    // ===== Optional: Social Blade API =====
    // For more detailed analytics
    // Get key at: https://socialblade.com/api
    socialBlade: {
        apiKey: 'YOUR_SOCIALBLADE_KEY_HERE',
    }
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
