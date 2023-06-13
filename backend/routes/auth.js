const express = require('express');
const User = require('../modals/User')
const router = express.Router();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Abhiisagoodb$oy';
//Route - 1:  creat a user using: Post "api/auth/creatauser". Doesn't require Auth

router.post('/creatauser', [
    body('name', "Enter a valid name").isLength({
        min: 3
    }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a strong pass").isLength({
        min: 5
    }),
], async (req, res) => {
    let success = false;
    //If there are errors, return Bad requrst and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success,errors: errors.array()
        });
    }

    try {
        //Check wether the user with this email exists already
        let user = await User.findOne({
            email: req.body.email
        });
        //console.log(user);
        if (user) {
            return res.status(400).json({
                success,error: "sorry a user with this email already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        let secreatPass = await bcrypt.hash(req.body.password, salt);
        //Creat New User
        user = await User.create({
            name: req.body.name,
            password: secreatPass,
            email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)

        //res.json(user})
        success = true;
        res.json({success,authToken})
        //Catch error
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route - 2:Authenticate a User using: Post "/api/auth/login". No Login required

router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password Can not be blank").exists()
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.arry()
        });
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (!user) {
            success = false
            return res.status(400).json({
                error: "Plese try to login with correct details"
            })
        }
        //Password check
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            success = false
            return res.status(400).json({
                success, error: "Plese try to login with correct details"
            })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({
            success, authtoken
        })
        //Catch Error
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})


//Route - 3: Get loggedin User Details using : post "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try{
     userId = req.user.id;
     const user = await User.findById(userId).select("-password");
     res.send(user)
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

});

module.exports = router