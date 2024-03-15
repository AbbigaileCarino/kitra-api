const { Treasure, MoneyValue } = require("../models/model");
const haversineDistance = require("../utils");

// Controller function to find treasures within distance
const findTreasuresWithinDistance = async (latitude, longitude, distance) => {
  const treasures = await Treasure.findAll({});
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
const filterTreasuresByValue = async (treasures, minValue) => {
  const treasuresWithValuesPromises = treasures.map(async (treasure) => {
    const matchingMoneyValues = await MoneyValue.findAll({
      where: {
        treasure_id: treasure.id,
        amt: minValue,
      },
      raw: true,
    });
    // If there's at least one MoneyValue with the correct amt, return the treasure with its MoneyValue
    if (matchingMoneyValues.length > 0) {
      return {
        ...treasure.get({ plain: true }), // Spread the treasure data
        MoneyValue: matchingMoneyValues, // Include the matching MoneyValues
      };
    }
    return null;
  });

  const treasuresWithValues = (
    await Promise.all(treasuresWithValuesPromises)
  ).filter((treasure) => treasure !== null);

  return treasuresWithValues;
};

module.exports = { findTreasuresWithinDistance, filterTreasuresByValue };
