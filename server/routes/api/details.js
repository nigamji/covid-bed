const express = require('express')
const router = express.Router();
const User = require('../../Model/User')
const Details = require('../../Model/Details')
const auth = require('../../MiddleWare/auth');
const { check, validationResult } = require('express-validator')


// @route POST api/details/
// @desc  post details 
// @access private
router.post('/', [auth,
    check('location', 'Location is required!').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ err: errors.array() })
    }
    let user = await User.findById(req.user.id);
    const { location } = req.body;
    const detailsFields = {};
    detailsFields.user = req.user.id;
    detailsFields.location = location;
    detailsFields.name = user.name;
    try {
        let details = await Details.findOne({ user: req.user.id })
        //update
        if (details) {
            details = await Details.findOneAndUpdate(
                { user: req.user.id },
                { $set: detailsFields },
                { new: true })

            return (res.json(details))
        }
        //create
        details = new Details(detailsFields);
        await details.save();
        res.json(details);
    } catch (error) {
        res.status(500).send('Server Error');
    }
})

// @route PUT api/details/beds
// @desc  put bed details
// @access private
router.put('/beds', [auth,
    check("name", "Bed type is required").not().isEmpty(),
    check("available", "Availabe beds value is required").not().isEmpty(),
    check("filled", "Unavailable beds value is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ err: errors.array() })
    }
    try {
        const { name, available, filled } = req.body;
        const newBed = {
            title: name,
            available,
            filled
        }
        const details = await Details.findOne({ user: req.user.id })
        details.beds.push(newBed);
        await details.save();
        res.json(details)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error');
    }

})

// @route PUT api/details/beds/:id
// @desc  edit bed details by id
// @access private
router.put('/beds/:id', auth, async (req, res) => {
    try {
        const detail = await Details.findOne({ user: req.user.id });
        const bedIndex = detail.beds.map(bed => bed.id).indexOf(req.params.id)
        const { name, available, filled } = req.body;
        const updatedBed = {
            title: name,
            available,
            filled
        }
        detail.beds[bedIndex] = updatedBed;
        await detail.save();
        res.json(detail);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error');
    }
})

// @route DELETE api/details/beds/:id
// @desc  delete bed details by id
// @access private
router.delete('/beds/:id', auth, async (req, res) => {
    try {
        const detail = await Details.findOne({ user: req.user.id });
        const bedIndex = detail.beds.map(bed => bed.id).indexOf(req.params.id)
        detail.beds.splice(bedIndex, 1);
        await detail.save();
        res.json(detail)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})
// @route GET api/details/
// @desc  get all details
// @access public
router.get('/', async (req, res) => {
    try {
        const details = await Details.find();
        res.json(details);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

// @route GET api/details/avail-beds
// @desc  get available beds
// @access public
router.get('/avail-beds', async (req, res) => {
    try {
        const details = await Details.find();
        let available = 0;
        details.map(detail => detail.beds.map(bed => available = (available + bed.available)))
        res.json(available)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

// @route GET api/details/filled-beds
// @desc  get filled beds
// @access public
router.get('/filled-beds', async (req, res) => {
    try {
        const details = await Details.find();
        let filled = 0;
        details.map(detail => detail.beds.map(bed => filled = (filled + bed.filled)))
        res.json(filled)
    }
    catch (error) {
        res.status(500).send('Server Error')
    }
})
module.exports = router;