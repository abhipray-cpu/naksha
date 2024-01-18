const Types = require('../models/facility_type')
const Sports = require('../models/sports_type')
const Facility = require('../models/facility')
const landMark = require('../models/landmar')
const Review = require('../models/review');
const mongoose = require('mongoose');
const subscibeList = require('../models/emails.js')
const logger = require('../logs/logger')
var pagesBar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.bar = (req, res, next) => {
    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    let distance = parseInt(req.session.distance)
    const row = req.query.row
    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesBar.forEach(page => {
            newPage.push(page + 10)
        })
        pagesBar = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesBar.forEach(page => {
            newPage.push(page - 10)
        })
        pagesBar = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: distance * 1000

                }
            },
            property_type: 'Bar',
            rating: { $lte: req.session.rating }
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'bar',
                background_image: './images/Bar.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesBar,
                next: nextPage,
            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  bar facility handler ||${err}`} )
        })

}
var pagesClubs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.clubs = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesClubs.forEach(page => {
            newPage.push(page + 10)
        })
        pagesClubs = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {

        newPage = []
        pagesClubs.forEach(page => {
            newPage.push(page - 10)
        })
        pagesClubs = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000

                }
            },
            property_type: 'Club'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'clubs',
                background_image: './images/clubs.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesClubs,
                next: nextPage,
            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  club facility handler ||${err}`})
        })





}
var pagesGym = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.gym = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesGym.forEach(page => {
            newPage.push(page + 10)
        })
        pagesGym = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesGym.forEach(page => {
            newPage.push(page - 10)
        })
        pagesGym = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000

                }
            },
            property_type: 'Gym'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'gym',
                background_image: './images/gym.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesGym,
                next: nextPage,
            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  gym facility handler ||${err}`})
        })
}

exports.home = (req, res, next) => {
    Types.find({})
        .then(types => {
            res.render('home.ejs', {
                pageTitle: 'home',
                types: types
            })
        })
        .catch(err => logger.error(`404 ||  hom page handler ||${err}` ))

}
var pagesHospital = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.hospital = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesHospital.forEach(page => {
            newPage.push(page + 10)
        })
        pagesHospital = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesHospital.forEach(page => {
            newPage.push(page - 10)
        })
        pagesHospital = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000

                }
            },
            property_type: 'Hospital'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'hospital',
                background_image: './images/hospital.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesHospital,
                next: nextPage,
            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  hospital facility handler ||${err}`})
        })

}
var pagesHotel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.hotel = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {

        newPage = []
        pagesHotel.forEach(page => {
            newPage.push(page + 10)
        })
        pagesHotel = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        
        newPage = []
        pagesHotel.forEach(page => {
            newPage.push(page - 10)
        })
        pagesHotel = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Hotel'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'hotel',
                background_image: './images/hotel .jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesHotel,
                next: nextPage,
            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'info',message:`500 ||  hotel facility handler ||${err}`})
        })
}
var pagesMall = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.mall = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        
        newPage = []
        pagesMall.forEach(page => {
            newPage.push(page + 10)
        })
        pagesMall = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
       
        newPage = []
        pagesMall.forEach(page => {
            newPage.push(page - 10)
        })
        pagesMall = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Mall'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'mall',
                background_image: './images/mall.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesMall,
                next: nextPage,
            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  mall facility handler ||${err}`})
        })

}
var pagesMultilplex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.multiplex = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        
        newPage = []
        pagesMultilplex.forEach(page => {
            newPage.push(page + 10)
        })
        pagesMultilplex = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        
        newPage = []
        pagesMultilplex.forEach(page => {
            newPage.push(page - 10)
        })
        pagesMultilplex = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'multiplex'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'multiplex',
                background_image: './images/multiplex.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesMultilplex,
                next: nextPage,
            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  multiplex facility handler ||${err}`})
        })


}
var pagesPark = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.park = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesPark.forEach(page => {
            newPage.push(page + 10)
        })
        pagesPark = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesPark.forEach(page => {
            newPage.push(page - 10)
        })
        pagesPark = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Park'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'park',
                background_image: './images/park (2).jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesPark,
                next: nextPage,
            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  park facility handler ||${err}`})
        })

}
var pagesRestaurant = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.restaurants = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesRestaurant.forEach(page => {
            newPage.push(page + 10)
        })
        pagesRestaurant = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesRestaurant.forEach(page => {
            newPage.push(page - 10)
        })
        pagesRestaurant = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Restaurant'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'restaurants',
                background_image: './images/restaurants.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesRestaurant,
                next: nextPage,
            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({'level':'error','message':`500 ||  restaurant facility handler ||${err}`})
        })
}
var pagesSports = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.sports = (req, res, next) => {

    Sports.find()
        .then(sports => {

            res.render('sports.ejs', {
                pageTitle: 'sports',
                sports: sports
            })
        })
        .catch(err => { logger.log({level:'error',message:err}); })

}
var pagesStreetFood = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.street_food = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        
        newPage = []
        pagesStreetFood.forEach(page => {
            newPage.push(page + 10)
        })
        pagesStreetFood = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        
        newPage = []
        pagesStreetFood.forEach(page => {
            newPage.push(page - 10)
        })
        pagesStreetFood = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Street Food'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'restaurants',
                pageTitle: 'street_food',
                background_image: './images/street-food.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesStreetFood,
                next: nextPage,

            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({'level':'error',message:`500 ||  sports facility handler ||${err}`})
        })

}

var pagesYoga = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.yoga = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesYoga.forEach(page => {
            newPage.push(page + 10)
        })
        pagesYoga = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesYoga.forEach(page => {
            newPage.push(page - 10)
        })
        pagesYoga = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Yoga'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'yoga',
                background_image: './images/yoga (3).jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesYoga,
                next: nextPage,

            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  yoga facility handler ||${err}`})
        })
}
var pagesDance = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.dance = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
       
        newPage = []
        pagesDance.forEach(page => {
            newPage.push(page + 10)
        })
        pagesDance = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
       
        newPage = []
        pagesDance.forEach(page => {
            newPage.push(page - 10)
        })
        pagesDance = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Dance Club'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'dance',
                background_image: './images/dance.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesDance,
                next: nextPage,

            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  dance facility handler ||${err}`})
        })



}
var pagesGame = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.game = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        
        newPage = []
        pagesGame.forEach(page => {
            newPage.push(page + 10)
        })
        pagesGame = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        
        newPage = []
        pagesGame.forEach(page => {
            newPage.push(page - 10)
        })
        pagesGame = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Game'
        }).sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'game',
                background_image: './images/game_parlour.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesGame,
                next: nextPage,

            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  game facility handler ||${err}`})
        })


}
var pagesCooking = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.cooking = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesCooking.forEach(page => {
            newPage.push(page + 10)
        })
        pagesCooking = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesCooking.forEach(page => {
            newPage.push(page - 10)
        })
        pagesCooking = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Cooking Class'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'cooking',
                background_image: './images/cooking.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesCooking,
                next: nextPage,

            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  cooking facility handler ||${err}`})
        })

}
var pagesAmusement = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.amusement = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesAmusement.forEach(page => {
            newPage.push(page + 10)
        })
        pagesAmusement = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesAmusement.forEach(page => {
            newPage.push(page - 10)
        })
        pagesAmusement = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Amusement Park'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'cooking',
                pageTitle: 'amusement',
                background_image: './images/amusement.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesAmusement,
                next: nextPage,

            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  amusement facility handler ||${err}`})
        })


}
var pagesBanquet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.banquet = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesBanquet.forEach(page => {
            newPage.push(page + 10)
        })
        pagesBanquet = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesBanquet.forEach(page => {
            newPage.push(page - 10)
        })
        pagesBanquet = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Banquet Hall'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'banquet',
                background_image: './images/banquet.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesBanquet,
                next: nextPage,

            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  banquet facility handler ||${err}`})
        })



}
var pagesZoo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.zoo = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        
        newPage = []
        pagesZoo.forEach(page => {
            newPage.push(page + 10)
        })
        pagesZoo = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        
        newPage = []
        pagesZoo.forEach(page => {
            newPage.push(page - 10)
        })
        pagesZoo = newPage
    }
    Facility.find({
            location: {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [req.session.LMLong, req.session.LMLatd]
                    },
                    $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                }
            },
            property_type: 'Zoo'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'banquet',
                pageTitle: 'zoo',
                background_image: './images/zoo.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesZoo,
                next: nextPage,

            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 ||  zoo facility handler ||${err}`})
        })

}

exports.item = (req, res, next) => {

    res.render('facility_item.ejs', {
        pageTitle: 'item',
        background_image: './images/item.jpg'
    })
}

exports.details = (req, res, next) => {
    Facility.find({
            title: req.params.propName
        })
        .then(facility => {
            if (facility.length > 0) {
                const Mainfacility = facility[0];
                Facility.find({
                    location: {
                        $near: {
                            $geometry: {
                                type: "point",
                                coordinates: [req.session.LMLong, req.session.LMLatd]
                            },
                            $maxDistance: 100 * 1000 //since the distance should be in metres and we are searching for props within 100 km of the landmark

                        }
                    },
                    property_type: Mainfacility.property_type
                })

                .exec()
                    .then(facilities => {
                        fetchReviews(Mainfacility, facilities, res)
                    })
            } else {
                res.render('500.ejs');
                logger.log({level:'error',message:`500 ||  no details found for the facility : ${req.params.propName} ||${err}`})
            }
        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 || ${err} || details handler`})
        })

}

exports.addReview = (req, res, next) => {
    const key = Object.keys(req.body)[1];
    const rating = parseFloat(req.body[key]);
    Review.find({
            user: req.session.userId,
            facility: req.params.facility
        })
        .then(reviews => {
            if (reviews.length > 0) {
                updateReview(req.session.userId, req.params.facility, rating, req.body.content, res);

            } else {

                Facility.find({ title: req.params.facility })
                    .then(facility => {
                        facility = facility[0];
                        newRating(facility.title, rating);
                        const review = new Review({
                            content: req.body.content,
                            rating: rating,
                            user: mongoose.Types.ObjectId(req.session.userId),
                            facility: facility.title,

                        })
                        return review.save()
                    })
                    .then(result => {
                        //console.log(result);
                        res.redirect(`/details/${req.params.facility}`)
                    })
                    .catch(err => {
                    logger.log({level:'error',message:`500 || ${err} || add review handler`})
                    })
            }
        })


}

async function updateReview(userId, facility, rating, review, res) {
    try {

        const updateReview = await Review.findOneAndUpdate({ user: userId, facility: facility }, {
            rating: rating,
            content: review
        }, { new: true })
        await updateReview.save();
        const ratings = await Review.find({ facility: facility })
        const count = ratings.length;
        let sum = 0;
        ratings.forEach(rating => {
            sum += rating.rating;
        })

        const avg = (parseFloat(sum).toFixed(1) / parseFloat(count).toFixed(1)).toFixed(1);
        const result = await Facility.findOneAndUpdate({ title: facility }, { rating: avg }, { new: true });
        await result.save();
        res.redirect(`/details/${facility}`)
    } catch (err) {
        logger.log({level:'error','message':`500 || ${err} || update review handler`})
        res.render('500.ejs')
    }
}
//this funnction will be used to update the average rating of the user
async function newRating(facTitle, newRating) {
    const ratings = await Review.find({ facility: facTitle })
    const count = ratings.length;
    let sum = 0;
    ratings.forEach(rating => {
        sum += rating.rating;
    })
    sum += newRating;
    const avg = (parseFloat(sum).toFixed(1) / parseFloat(count + 1).toFixed(1)).toFixed(1);
    const result = await Facility.findOneAndUpdate({ title: facTitle }, { rating: avg }, { new: true });
    await result.save()
}

//this function will return a list of all the reviews related to the facility
function fetchReviews(mainFacility, facilities, res) {
    Review.find({ facility: mainFacility.title })
        .populate('user', { name: 1 })
        .then(reviews => {
            //console.log(reviews)
            facilities = facilities.filter(facility => {
                return facility.title != mainFacility.title
            })
            res.render('detail.ejs', {
                pageTitle: 'details', //modify this to prop title
                facility: mainFacility,
                facilities: facilities,
                reviews: reviews,
                address: mainFacility._doc.address,
                email: mainFacility._doc.email,
                contact: mainFacility._doc.contact
            })

        })
        .catch(err => {
            logger.log({level:'err',message:`500 || ${err} || fetch review handler`})
            res.render('500.ejs')

        })
}


exports.about = (req, res, next) => {
    res.render('about.ejs')
}
exports.userPolicy = (req, res, next) => {
    res.render('user-policy.ejs')
}
exports.terms = (req, res, next) => {
    res.render('terms.ejs')
}
exports.cache = (req, res, next) => {
    res.render('cache.ejs')
}

exports.settings = async(req, res, next) => {
    const landmarks = await landMark.find({}, { location: 1, city: 1, id: -1 })
    places = []
    landmarks.forEach(landMark => {
        places.push({ "location": landMark.location.coordinates, "city": landMark._doc.city })
    })
    res.render('settings.ejs', {
        landmarks: places
    })
}

exports.mapSettings = async(req, res, next) => {
    // setting up the session properties
    coordinates = req.body.city.split(',')
    req.session.LMLong = coordinates[0];
    req.session.LMLatd = coordinates[1];
    req.session.sort = req.body.sort
    req.session.distance = req.body.distance
    req.session.rating = req.body.rating
    res.redirect('/home')
}

exports.subscribe = async(req,res,next)=>{
    let mail = req.body.mail
    let exists = await subscibeList.find({email:mail})
   if (exists.length > 0){
    // trying this approach of a simple no response approach to stay on the same page
    res.status(204).send();
   }
   else{
    try{
        let stat = subscibeList.create({
            email:mail
        })
        res.status(204).send();
    }
    catch(err){
        logger.log({level:'error',message:`500 || ${err} || email list handler`})
        res.status(204).send();
    }
   }
} 

//this is the handler for search results

exports.search= async (req,res,next)=>{
    // build logic in here
    try{
        let search_val = req.body.val
    let results = await Facility.find({$text:{$search:search_val}}).limit(20)
    if(results.length>0){
         // in this case render page with all the facilities
             res.render('search_result.ejs', {
        title: "Review",
        facilities: results
    })
        }
    else{
        //in this case render no results page
        res.render(
            'no_results.ejs'
        )
    }
    }
    catch(err){
        logger.log({level:'error',message:`500 || ${err} || search handler`})
        // we will render the home page itself
        res.status(204).send();
    }
}