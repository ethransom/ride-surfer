"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("RateRides", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        personRatingId: {
          type: Sequelize.INTEGER
        },
        personRatedId: {
          type: Sequelize.INTEGER
        },
        rideId: {
          type: Sequelize.INTEGER
        },
        cleanliness: {
          type: Sequelize.INTEGER
        },
        timeliness: {
          type: Sequelize.INTEGER
        },
        safety: {
          type: Sequelize.INTEGER
        },
        overall: {
          type: Sequelize.INTEGER
        },
        comments: {
          type: Sequelize.TEXT
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        queryInterface.addConstraint("RateRides", ["personRatingId"], {
          type: "foreign key",
          name: "fk_userId_personRating",
          references: {
            table: "Users",
            field: "id"
          }
        });
      })
      .then(() => {
        queryInterface.addConstraint("RateRides", ["personRatedId"], {
          type: "foreign key",
          name: "fk_userId_personRated",
          references: {
            table: "Users",
            field: "id"
          },
          onDelete: "no action",
          onUpdate: "no action"
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("RateRides");
  }
};
