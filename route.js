const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/user');

const Countries = require('./models/countries');
const Role = require('./models/role');
const Page = require('./models/page.js');


//GET
router.get('/users', function (req, res, next) {
    User.find(function (err, users) {
        res.json(users);
    })
});

//POST
router.post('/users', function (req, res, next) {

    newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({ message: "Failed" });
        }else{
            res.json({ message: "Success" });
        }

    })
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;

        if(!user){
            return res.json({ success: false, message: "User " + username + " does not exist." });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch){
                const token = jwt.sign(user.toJSON(), 'testwid', {
                    expiresIn: 604800
                });
            
            res.json({
                success: true,
                message: "Welcome, " + username + "!",
                token: 'JWT '+token,
                user:{
                    name: user.firstname
                }
            })
            } else{
                res.json({ success: false, message: "Wrong Password" });
             }
        })
    })
})

//PUT
router.put('/users/:id', function (req, res, next) {

    User.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                role: req.body.role,
                country: req.body.country,
                state: req.body.state,
                city: req.body.city
            }
        },
        function (err, result) {
            if (err) {
                res.json({ message: "Failed" });
            }
            else {
                res.json({ message: "Success" });
            }
        });
});

//DELETE
router.delete('/users/:id', function (req, res, next) {
    User.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});


//GET all data
router.get('/countries', function (req, res, next) {
    Countries.find(function (err, countries) {
        res.json(countries);
    })
});

//GET Country Names
router.get('/countries/all', function (req, res, next) {
    Countries.find({}, { "CountryName": 1, _id: 0 }, function (err, country) {
        res.json(country);
    })
});

//GET States
router.get('/countries/:cName', function (req, res, next) {
    Countries.aggregate([
        { $unwind: "$States" },
        { $match: { "CountryName": req.params.cName } },
        { $project: { "StateName": "$States.StateName", "_id": 0 } }
    ], function (err, states) {
        res.json(states);
    })
});

//GET Cities
router.get('/countries/:cName/:sName', function (req, res, next) {
    Countries.aggregate([
        { $unwind: "$States" },
        { $match: { "CountryName": req.params.cName, "States.StateName": req.params.sName } },
        { $project: { "Cities": "$States.Cities", "_id": 0 } },
        { $unwind: "$Cities" }
    ], function (err, states) {
        res.json(states);
    })
});


//GET Roles
router.get('/roles', function (req, res, next) {
    Role.find(function (err, roles) {
        res.json(roles);
    })
});

//POST Role
router.post('/roles', function (req, res, next) {

    newRole = new Role({
        RoleName: req.body.rolename,
        Description: req.body.description,
        Pages: req.body.pages
    });

    newRole.save(function (err, user) {
        if (err) {
            res.json({ message: "Failed" });
        }
        else {
            res.json({ message: "Success" });
        }
    });
});

//DELETE Role
router.delete('/roles/:id', function (req, res, next) {
    Role.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//GET Pages
router.get('/pages', function (req, res, next) {
    Page.find(function (err, pages) {
        res.json(pages);
    })
});

router.get('/profile', passport.authenticate('jwt', {session : false}), (req, res, next) => {
    res.json({user: req.user});
})

module.exports = router;