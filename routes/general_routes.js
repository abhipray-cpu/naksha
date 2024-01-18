const express = require('express');
const isAuth = require('./isAuth')
const general = require('../controller/general_routing')

const router = express.Router();

const user = require('../controller/user_routes')
router.get('/', user.login)
router.get('/bar', isAuth, general.bar)

router.get('/clubs', isAuth, general.clubs)


router.get('/gym', isAuth, general.gym)
router.get('/home', isAuth, general.home)
router.get('/home', isAuth, general.home)
router.get('/hospital', isAuth, general.hospital)
router.get('/hotel', isAuth, general.hotel)
router.get('/mall', isAuth, general.mall)
router.get('/multiplex', isAuth, general.multiplex)
router.get('/park', isAuth, general.park)
router.get('/restaurants', isAuth, general.restaurants)
router.get('/sports', isAuth, general.sports)
router.get('/street_food', isAuth, general.street_food)

router.get('/yoga', isAuth, general.yoga)
router.get('/game', isAuth, general.game);
router.get('/dance', isAuth, general.dance);
router.get('/cooking', isAuth, general.cooking)
router.get('/zoo', isAuth, general.zoo);
router.get('/amusement', isAuth, general.amusement);
router.get('/banquet', isAuth, general.banquet)
router.get('/item', isAuth, general.item)
router.get('/details/:propName', isAuth, general.details)
router.post('/addComment/:facility', isAuth, general.addReview);
router.post('/search', isAuth, general.search)
router.get('/about', general.about)
router.get('/user-policy', general.userPolicy)
router.get('/terms', general.terms)
router.get('/cache', general.cache)
router.get('/settings', isAuth, general.settings)
router.post('/setMap', isAuth, general.mapSettings)
router.post('/subscribe',isAuth,general.subscribe)

module.exports = router;
