const express = require('express')
const router = express.Router()
// import Employer model
const Employer = require('../models/employer')
const Region = require('../models/region')
const passport = require('passport')
const globals = require('./globalFunctions')

// GET: /employers => show list of employers
router.get('/', (req, res) => {
    // query the model to fetch & pass the employer data to the view
    Employer.find((err, employers) => {
        if (err) {
            console.log(err)
        } else {
            res.render('employers/index', {
                title: 'Employers',
                employers: employers,
                user: req.user
            })
        }
    })
})

//  GET: /employers/add => show blank employer from
router.get('/add', globals.isAuthenticated, (req, res) => {
    Region.find((err, regions) => {
        if (err) {
            console.log(err)
        } else {
            res.render('employers/add', { 
                title: 'Add Employer',
                regions: regions,
                user: req.user
            })
        }
    }).sort('name')
})

// POST: /employers.create => form submission
router.post('/add', globals.isAuthenticated, (req, res) => {
    // create a new Employer document from the fields in the form post
    Employer.create(req.body, (err, newEmployer) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/employers')
        }
    })
})

router.get('/delete/:_id', globals.isAuthenticated, (req,res) => {
    Employer.remove({_id: req.params._id}, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/employers')
        }
    })
})

router.get('/edit/:_id', globals.isAuthenticated, (req, res) => {
    Region.find((err, regions) => {
        if (err) {
            console.log(err)
        } else {
            Employer.findById(req.params._id, (err, employer) => {
                if (err) {
                    console.log(err)
                } else {
                    res.render('employers/edit', {
                        title: 'Edit Employer',
                        regions: regions,
                        employer: employer,
                        user: req.user
                    })
                }
            })
        }
    }).sort('name')
})

// POST: /employers/edit/abc123 => update the db for the selected doc
router.post('/edit/:_id', globals.isAuthenticated, (req,res) => {
    Employer.findByIdAndUpdate({_id: req.params._id}, req.body, null, (err, employer) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/employers')
        }
    })
})

// make public
module.exports = router