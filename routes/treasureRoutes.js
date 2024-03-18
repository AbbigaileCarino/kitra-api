const express = require("express");
const {
  findTreasuresWithinDistance,
  filterTreasuresByValue,
} = require("../controllers/treasureController");
const router = express.Router();

// Helper functions for validation
const isValidDistance = (distance) => [1, 10].includes(parseInt(distance));
const isValidPrizeValue = (prizeValue) =>
  prizeValue >= 10 && prizeValue <= 30 && Number.isInteger(Number(prizeValue));

router.get("/find-treasures", async (req, res) => {
  try {
    // Extract query parameters
    const { latitude, longitude, distance, prizeValue } = req.query;
    // Validate input parameters
    if (!latitude || !longitude || !distance) {
      return res
        .status(400)
        .json({ error: "Latitude, longitude, and distance are required." });
    }
    if (!isValidDistance(distance)) {
      return res
        .status(400)
        .json({ error: "Invalid distance. Must be 1 or 10." });
    }
    if (prizeValue && !isValidPrizeValue(prizeValue)) {
      return res.status(400).json({
        error: "Invalid prizeValue. Must be a whole number between 10 and 30.",
      });
    }
    // Convert distance to number
    const searchDistance = parseInt(distance);
    let treasures = await findTreasuresWithinDistance(
      latitude,
      longitude,
      searchDistance
    );
    // If prizeValue is provided, filter treasures by minimum prize value
    const prizeValueInt = parseInt(prizeValue);
    treasures = await filterTreasuresByValue(treasures, prizeValueInt);
    if (treasures.length === 0) {
      return res.json({ message: "No treasures found." });
    }
    res.json({ message: "Congratulations! You found treasures.", treasures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
