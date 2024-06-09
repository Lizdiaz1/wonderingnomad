'use strict';

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        comment: 'This place is amazing! The chalet is luxurious and the views are breathtaking.',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        userId: 2,
        comment: 'The perfect getaway! Highly recommend staying here.',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 3,
        comment: 'An incredible experience! The Wardrobe is truly magical.',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 1,
        comment: 'A charming and historic place to stay. Loved the lighthouse views.',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        userId: 2,
        comment: 'Renting the entire Disney Land park was a dream come true!',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 3,
        comment: 'Very peaceful and relaxing stay. Highly recommend.',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
