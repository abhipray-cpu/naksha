const express = require('express')
const router = express.Router()
const sports = require('../controller/sports')
const isAuth = require('./isAuth')
router.get('/badminton', isAuth, sports.badminton);
router.get('/baseball', isAuth, sports.baseball);
router.get('/basketball', isAuth, sports.basketball)
router.get('/bowling', isAuth, sports.bowling)
router.get('/boxing', isAuth, sports.boxing)
router.get('/cricket', isAuth, sports.cricket)
router.get('/cycling', isAuth, sports.cycling)
router.get('/football', isAuth, sports.football)
router.get('/golf', isAuth, sports.golf)
router.get('/hockey', isAuth, sports.hockey)
router.get('/karate', isAuth, sports.karate)
router.get('/kick_boxing', isAuth, sports.kickBoxing)
router.get('/rugby', isAuth, sports.rugby)
router.get('/skating', isAuth, sports.skating)
router.get('/snooker', isAuth, sports.snooker)
router.get('/squash', isAuth, sports.squash)
router.get('/swimming', isAuth, sports.swimming)
router.get('/volleyball', isAuth, sports.volleyball)
router.get('/tennis', isAuth, sports.tennis)
router.get('/archery', isAuth, sports.archery)
router.get('/table_tennis', isAuth, sports.table_tennis)
module.exports = router