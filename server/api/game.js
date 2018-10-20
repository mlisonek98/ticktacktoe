const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const {Game} = require('../db/models')

module.exports = router

let currentGame = {
    id: 1,
    winner: '',
    board: [
      ['', '', '', '', '', '', '', '', ''],['', '', '', '', '', '', '', '', ''],['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '']
    ],
    turn: 'X',
    valid_subgames: [0,1,2,3,4,5,6,7,8]
}


router.get('/', asyncHandler(async (req, res, next) => {

  res.json(currentGame)
}))

router.post('/', asyncHandler(async (req, res, next) => {
  const newGame = {
    id: currentGame.id + 1,
    winner: '',
    board: [
      ['', '', '', '', '', '', '', '', ''],['', '', '', '', '', '', '', '', ''],['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '']
    ],
    turn: 'X',
    valid_subgames: [0,1,2,3,4,5,6,7,8]
  }
  currentGame = newGame
  res.json(newGame)
}))

router.post('/move', asyncHandler(async (req, res,next) => {
  let nextTurn
  if(currentGame.turn === 'X') {
    nextTurn = 'O'
  } else {
    nextTurn = 'X'
  }

  let newBoard = currentGame.board
  newBoard[req.body.subgame][req.body.cell] = currentGame.turn
  let newValidSubgames = [req.body.cell]

  let editedgame = {
    id: currentGame.id,
    winner: '',
    board: newBoard,
    turn: nextTurn,
    valid_subgames: newValidSubgames
  }

  currentGame = editedGame

  res.json(editedGame)
}))
