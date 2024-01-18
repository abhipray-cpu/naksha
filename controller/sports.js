const Facility = require('../models/facility')
var logger = require('../logs/logger')
var pagesCricket = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.cricket = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesCricket.forEach(page => {
            newPage.push(page + 10)
        })
        pagesCricket = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesCricket.forEach(page => {
            newPage.push(page - 10)
        })
        pagesCricket = newPage
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
            property_type: 'Cricket'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'cricket',
                background_image: './images/cricket.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesCricket,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || cricket handler`})
            res.render('500.ejs');
            
        })
}
var pagesBadminton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.badminton = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        
        newPage = []
        pagesBadminton.forEach(page => {
            newPage.push(page + 10)
        })
        pagesBadminton = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        c
        newPage = []
        pagesBadminton.forEach(page => {
            newPage.push(page - 10)
        })
        pagesBadminton = newPage
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
            property_type: 'Badminton'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'badminton',
                background_image: './images/badminton.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesBadminton,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || badminton handler`})
            res.render('500.ejs');
            
        })
}
var pagesBasketball = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.basketball = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
       
        newPage = []
        pagesBasketball.forEach(page => {
            newPage.push(page + 10)
        })
        pagesBasketball = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        
        newPage = []
        pagesBasketball.forEach(page => {
            newPage.push(page - 10)
        })
        pagesBasketball = newPage
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
            property_type: 'Basketball'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'basketball',
                background_image: './images/basketball.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesBasketball,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || basketball handler`})
            res.render('500.ejs');
          
        })

}
var pagesFootball = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.football = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
       
        newPage = []
        pagesFootball.forEach(page => {
            newPage.push(page + 10)
        })
        pagesFootball = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
     
        newPage = []
        pagesFootball.forEach(page => {
            newPage.push(page - 10)
        })
        pagesFootball = newPage
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
            property_type: 'Football'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'basketball',
                pageTitle: 'football',
                background_image: './images/footballjpg.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesFootball,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || football handler`})
            res.render('500.ejs');
            
        })


}
var pagesTennis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.tennis = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        
        newPage = []
        pagesTennis.forEach(page => {
            newPage.push(page + 10)
        })
        pagesTennis = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        
        newPage = []
        pagesTennis.forEach(page => {
            newPage.push(page - 10)
        })
        pagesTennis = newPage
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
            property_type: 'Tennis'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'tennis',
                background_image: './images/tennis.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesTennis,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || tennis handler`})
            res.render('500.ejs');
            
        })
}
var pagesBaseball = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.baseball = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        
        newPage = []
        pagesBaseball.forEach(page => {
            newPage.push(page + 10)
        })
        pagesBaseball = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        
        newPage = []
        pagesBaseball.forEach(page => {
            newPage.push(page - 10)
        })
        pagesBaseball = newPage
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
            property_type: 'Baseball'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'baseball',
                background_image: './images/baseball.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesBaseball,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || baseball handler`})
            res.render('500.ejs');
            
        })
}
var pagesBowling = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.bowling = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        
        newPage = []
        pagesBowling.forEach(page => {
            newPage.push(page + 10)
        })
        pagesBowling = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
       
        newPage = []
        pagesBowling.forEach(page => {
            newPage.push(page - 10)
        })
        pagesBowling = newPage
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
            property_type: 'Bowling'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'bowling',
                background_image: './images/bowling.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesBowling,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || bowling handler`})
            res.render('500.ejs');
            
        })
}
var pagesBoxing = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.boxing = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        newPage = []
        pagesBoxing.forEach(page => {
            newPage.push(page + 10)
        })
        pagesBoxing = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        
        newPage = []
        pagesBoxing.forEach(page => {
            newPage.push(page - 10)
        })
        pagesBoxing = newPage
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
            property_type: 'Boxing'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'boxing',
                background_image: './images/boxing.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesBoxing,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || boxing handler`})
            res.render('500.ejs');
            
        })
}
var pagesCycling = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.cycling = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
      
        newPage = []
        pagesCycling.forEach(page => {
            newPage.push(page + 10)
        })
        pagesCycling = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
      
        newPage = []
        pagesCycling.forEach(page => {
            newPage.push(page - 10)
        })
        pagesCycling = newPage
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
            property_type: 'Cycling'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'boxing',
                pageTitle: 'cycling',
                background_image: './images/cycling.jpeg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesCycling,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || cycling handler`})
            res.render('500.ejs');
            
        })
}
var pagesGolf = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.golf = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
       
        newPage = []
        pagesGolf.forEach(page => {
            newPage.push(page + 10)
        })
        pagesGolf = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        
        newPage = []
        pagesGolf.forEach(page => {
            newPage.push(page - 10)
        })
        pagesGolf = newPage
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
            property_type: 'Golf'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'golf',
                background_image: './images/golf.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesGolf,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || golf handler`})
            res.render('500.ejs');
            
        })
}
var pagesHockey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.hockey = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
      
        newPage = []
        pagesHockey.forEach(page => {
            newPage.push(page + 10)
        })
        pagesHockey = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
      
        newPage = []
        pagesHockey.forEach(page => {
            newPage.push(page - 10)
        })
        pagesHockey = newPage
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
            property_type: 'Hockey'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'hockey',
                background_image: './images/hockey.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesHockey,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || hockey handler`})
            res.render('500.ejs');
            
        })
}
var pagesKarate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.karate = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
      
        newPage = []
        pagesKarate.forEach(page => {
            newPage.push(page + 10)
        })
        pagesKarate = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
       
        newPage = []
        pagesKarate.forEach(page => {
            newPage.push(page - 10)
        })
        pagesKarate = newPage
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
            property_type: 'Karate'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'karate',
                background_image: './images/karate.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesKarate,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({leve:'error',message:`500 || ${err} || karate handler`})
            res.render('500.ejs');
           
        })


}
var pagesKickBoxing = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.kickBoxing = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
      
        newPage = []
        pagesKickBoxing.forEach(page => {
            newPage.push(page + 10)
        })
        pagesKickBoxing = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
    
        newPage = []
        pagesKickBoxing.forEach(page => {
            newPage.push(page - 10)
        })
        pagesKickBoxing = newPage
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
            property_type: 'Kick Boxing'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'kick_boxing',
                background_image: './images/kick_boxing.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesKickBoxing,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || kick boxing handler`})
            res.render('500.ejs');
           
        })
}
var pagesRugby = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.rugby = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
      
        newPage = []
        pagesRugby.forEach(page => {
            newPage.push(page + 10)
        })
        pagesRugby = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        newPage = []
        pagesRugby.forEach(page => {
            newPage.push(page - 10)
        })
        pagesRugby = newPage
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
            property_type: 'Rugby'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'rugby',
                background_image: './images/rugby.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesRugby,
                next: nextPage,
            })


        })
        .catch(err => {
            res.render('500.ejs');
            logger.log({level:'error',message:`500 || ${err} || rugby handler`})
        })
}
var pagesSkating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.skating = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
       
        newPage = []
        pagesSkating.forEach(page => {
            newPage.push(page + 10)
        })
        pagesSkating = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
     
        newPage = []
        pagesSkating.forEach(page => {
            newPage.push(page - 10)
        })
        pagesSkating = newPage
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
            property_type: 'Skating'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'skating',
                background_image: './images/skating.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesSkating,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || skating handler`})
            res.render('500.ejs')
           
        })
}
var pagesSnooker = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.snooker = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
      
        newPage = []
        pagesSnooker.forEach(page => {
            newPage.push(page + 10)
        })
        pagesSnooker = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
      
        newPage = []
        pagesSnooker.forEach(page => {
            newPage.push(page - 10)
        })
        pagesSnooker = newPage
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
            property_type: 'Snooker'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'snooker',
                background_image: './images/snooker.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesSnooker,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'error',message:`500 || ${err} || snooker handler`})
            res.render('500.ejs')
        })

}
var pagesSquash = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.squash = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
      
        newPage = []
        pagesSquash.forEach(page => {
            newPage.push(page + 10)
        })
        pagesSquash = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
       
        newPage = []
        pagesSquash.forEach(page => {
            newPage.push(page - 10)
        })
        pagesSquash = newPage
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
            property_type: 'Squash'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'squash',
                background_image: './images/squash.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesSquash,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'info',message:`500 || ${err} || squash handler`})
            res.render('500.ejs')
        })
}
var pagesSwimming = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.swimming = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
      
        newPage = []
        pagesSwimming.forEach(page => {
            newPage.push(page + 10)
        })
        pagesSwimming = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
       
        newPage = []
        pagesSwimming.forEach(page => {
            newPage.push(page - 10)
        })
        pagesSwimming = newPage
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
            property_type: 'Swimming'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'swimming',
                background_image: './images/swimming.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesSwimming,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'info',message:`500 || ${err} || swimming handler`})
            res.render('500.ejs')
        })

}
var pagesVolleyball = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.volleyball = (req, res, next) => {
    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
      
        newPage = []
        pagesVolleyball.forEach(page => {
            newPage.push(page + 10)
        })
        pagesVolleyball = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
      
        newPage = []
        pagesVolleyball.forEach(page => {
            newPage.push(page - 10)
        })
        pagesVolleyball = newPage
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
            property_type: 'Volleyball'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'volleyball',
                background_image: './images/volleyball.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesVolleyball,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'info',message:`500 || ${err} || vollyball handler`})
            res.render('500.ejs')
        })

}
var pagesTableTennis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.table_tennis = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
       
        newPage = []
        pagesTableTennis.forEach(page => {
            newPage.push(page + 10)
        })
        pagesTableTennis = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
       
        newPage = []
        pagesTableTennis.forEach(page => {
            newPage.push(page - 10)
        })
        pagesTableTennis = newPage
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
            property_type: 'Table Tennis'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'table_tennis',
                background_image: './images/tt.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesTableTennis,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'info',message:`500 || ${err} || table tennis handler`})
            res.render('500.ejs')
        })

}
var pagesArchery = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exports.archery = (req, res, next) => {

    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
    
        newPage = []
        pagesArchery.forEach(page => {
            newPage.push(page + 10)
        })
        pagesArchery = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
      
        newPage = []
        pagesArchery.forEach(page => {
            newPage.push(page - 10)
        })
        pagesArchery = newPage
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
            property_type: 'Archery'
        })
        .sort({ 'rating': req.session.sort })
        .skip((pageNumber - 1) * 18)
        .limit(18)
        .exec()
        .then(facilities => {
            res.render('facility.ejs', {
                pageTitle: 'archery',
                background_image: './images/archery.jpg',
                result: facilities,
                currPage: pageNumber,
                hasPrevious: pageNumber,
                hasNext: Math.ceil(facilities.length / 18),
                pages: pagesArchery,
                next: nextPage,
            })


        })
        .catch(err => {
            logger.log({level:'info',message:`500 || ${err} || archery handler`})
            res.render('500.ejs')

        })

}