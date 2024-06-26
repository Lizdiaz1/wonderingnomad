'use strict';

const { Image } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('Images', [
        {
          spotId: 1,
          type: 'Spot',
          preview: true,
          url: "https://tjbprivatetravel.com/wp-content/uploads/2022/05/chalet-evening-lit-up-looking-towards-tasch-1-scaled.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 1,
          type: 'Spot',
          preview: false,
          url: "https://ariajourneys.com/wp-content/uploads/2017/01/luxury_ski_holidays_Zermatt_120.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 1,
          type: 'Spot',
          preview: false,
          url: "https://www.chaletzermattpeak.com/media/45257/1-welcome-drinks-winter.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 1,
          type: 'Spot',
          preview: false,
          url: "https://i.insider.com/4eb822ed6bb3f76e0300000a?width=750&format=jpeg&auto=webp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 2,
          type: 'Spot',
          preview: true,
          url: "https://static.wikia.nocookie.net/narnia/images/6/6e/Wardrobe.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          type: 'Spot',
          preview: true,
          url: "https://a0.muscache.com/im/pictures/9f6f2463-2b25-492c-b9aa-f2ee4a508c6a.jpg?im_w=720",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 4,
          type: 'Spot',
          preview: true,
          url: "https://ktla.com/wp-content/uploads/sites/4/2023/01/Disney-100-castle.jpg?strip=1",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
      console.log('Image seeding successful');
    } catch (error) {
      console.error('Error seeding Images:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
