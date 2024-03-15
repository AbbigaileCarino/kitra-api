const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const moneyValues = [];
    const stream = fs.createReadStream(path.join(__dirname, '../data/moneyValues.csv'))
      .pipe(csv())
      .on('data', (row) => moneyValues.push(row))
      .on('end', () => {
        queryInterface.bulkInsert('moneyvalues', moneyValues);
      });
    return new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('moneyvalues', null, {});
  }
};