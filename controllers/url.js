const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortID = shortid.generate(); // Corrected function usage

    try {
        await URL.create({
            shortid: shortID,
            redirectURL: url, // Fixed incorrect variable reference
            visitHistory: [],
            createdBy:req.user._id,
        });

        return res.render("home", {
            id: shortID, // Use renamed variable
        });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleGetAnalytics(req, res) {
    const { shortid } = req.params;

    try {
        const result = await URL.findOne({ shortid });
        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
};
