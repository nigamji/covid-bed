const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const User = require('../../Model/User')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')
const config = require('config')
const auth = require('../../MiddleWare/auth')

// @route POST api/auth/user-register
// @desc User register
// @access public
router.post('/user-register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should be greater than 6 letters').isLength({ min: 7 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists!" }] })
        }
        user = new User({
            name,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }
        jwtToken.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.send({ token });
            }
        );

    }
    catch (error) {
        return res.status(500).send("Server error");
    }
});


// @route POST api/auth/
// @desc User Login
// @access public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should be greater than 6 letters').isLength({ min: 7 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials!" }] })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials!" }] })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwtToken.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.send({ token });
            }
        );

    }
    catch (error) {
        return res.status(500).send("Server error");
    }
});

// @route GET api/auth/
// @desc get user by token
// @access private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).send("Server error")
    }
})
module.exports = router;