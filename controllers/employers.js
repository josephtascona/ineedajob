const express = require('express')
const router = express.Router()
// import Employer model
const Employer = require('../models/employer')

// GET: /employers => show list of employers
router.get('/', (req, res) => {
    // query the model to fetch & pass the employer data to the view
    Employer.find((err, employers) => {
        if (err) {
            console.log(err)
        } else {
            res.render('employers/index', {
                title: 'Employers',
                employers: employers
            })
        }
    })
})

//  GET: /employers/add => show blank employer from
router.get('/add', (req, res) => {
    res.render('employers/add', { title: 'Add Employer' })
})

// POST: /employers.create => form submission
router.post('/add', (req, res) => {
    // create a new Employer document from the fields in the form post
    Employer.create(req.body, (err, newEmployer) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/employers')
        }
    })
})

// make public
module.exports = router