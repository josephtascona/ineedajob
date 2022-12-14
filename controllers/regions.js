const express = require('express')
const router = express.Router()
// import Region model
const Region = require('../models/region')

const globals = require('./globalFunctions')

// GET: /regions => show list of regions
router.get('/', (req,res) => {
    // query the model to fetch & pass the region data to the view
    Region.find((err,regions) => {
        if (err) {
            console.log(err)
        } else {
            res.render('regions/index', { 
                title: 'Regions',
                regions: regions,
                user: req.user
            })
        }
    })
})

//  GET: /regions/create => show blank region from

router.get('/create', globals.isAuthenticated, (req,res) => {
    res.render('regions/create', { 
        title: 'Add Region',
        user: req.user
    })
})

// POST: /regions.create => form submission
router.post('/create', globals.isAuthenticated, (req, res) => {
    // create a new Region document from the fields in the form post
    Region.create(req.body, (err, newRegion) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/regions')
        }
    })
})

// make public
module.exports = router