const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  winner: {
    type: Sequelize.STRING,
  },
  board: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.TEXT))
  },
  turn: {
    type: Sequelize.STRING
  },
  valid_subgames: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

module.exports = Game
