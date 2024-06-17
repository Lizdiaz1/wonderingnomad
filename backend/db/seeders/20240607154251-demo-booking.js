'use strict';

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        totalCost: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 17)),
        totalCost: 1500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
        totalCost: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date(new Date().setDate(new Date().getDate() + 15)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 20)),
        totalCost: 2500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        userId: 2,
        startDate: new Date(new Date().setDate(new Date().getDate() + 25)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        totalCost: 3000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date(new Date().setDate(new Date().getDate() + 35)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 40)),
        totalCost: 3500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date(new Date().setDate(new Date().getDate() + 45)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 50)),
        totalCost: 4000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date(new Date().setDate(new Date().getDate() + 55)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 60)),
        totalCost: 4500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date(new Date().setDate(new Date().getDate() + 65)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 70)),
        totalCost: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date(new Date().setDate(new Date().getDate() + 75)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 80)),
        totalCost: 5500,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
