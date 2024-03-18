const { Treasure, MoneyValue } = require("../models/model");
const haversineDistance = require("../utils");

// Controller function to find treasures within distance
const findTreasuresWithinDistance = async (latitude, longitude, distance) => {
  const treasures = await Treasure.findAll({
    include: [
      {
        model: MoneyValue,
        attributes: ["amt"],
      },
    ],
  });
  return treasures.filter((treasure) => {
    const distanceToTreasure = haversineDistance(
      latitude,
      longitude,
      treasure.latitude,
      treasure.longitude
    );
    return distanceToTreasure <= distance;
  });
};
// Controller function to find value of the treasures found
const filterTreasuresByValue = async (treasures, prizeValue) => {
  if (!prizeValue) {
    return treasures;
  }
  return treasures.filter((treasure) => {
    const moneyValues = treasure.moneyValues || [];
    const minPrizeValue = Math.min(...moneyValues.map((value) => value.amt));
    return minPrizeValue === prizeValue;
  });
};

module.exports = { findTreasuresWithinDistance, filterTreasuresByValue };
