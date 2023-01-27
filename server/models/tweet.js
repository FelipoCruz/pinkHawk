'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define('tweet', {
  user: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  tweet: {
    type: DataTypes.TEXT,
  },
 });
 