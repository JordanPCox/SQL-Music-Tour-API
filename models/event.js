'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate({ Stage, MeetGreet, SetTime }) {
      // stages
      Event.belongsToMany(Stage, {
        foreignKey: "event_id",
        as: "stages",
        through: Stage
      })
      
      // meet and greets 
      Event.hasMany(MeetGreet, {
        foreignKey: "event_id",
        as: "meet_greets"
      })

      // set times 
      Event.hasMany(SetTime, {
        foreignKey: "event_id",
        as: "set_times"
      })
    }
  }
  Event.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  })
  return Event
}