const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    const stream = fs.createReadStream(path.join(__dirname, '../data/users.csv'))
      .pipe(csv())
      .on('data', (row) => users.push(row))
      .on('end', () => {
        queryInterface.bulkInsert('users', users);
      });
    return new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
