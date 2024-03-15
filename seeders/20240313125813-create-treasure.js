'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const treasures = [];
    fs.createReadStream(path.resolve(__dirname, '../data/treasures.csv'))
      .pipe(csv())
      .on('data', (row) => {
        treasures.push({
          id: row.id,
          latitude: parseFloat(row.latitude),
          longitude: parseFloat(row.longitude),
          name: row.name
        });
      })
      .on('end', () => {
        return queryInterface.bulkInsert('Treasures', treasures, {});
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Treasures', null, {});
  }
};
