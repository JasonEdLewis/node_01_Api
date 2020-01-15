const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cors = require('cors');
// const the = require('./Database.js')
const saltRounds = 10

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [
        {
            id: "012",
            name: 'pete',
            email: 'pete@rock.com',
            password: 'cl-smooth',
            entries: 0,
            joined: new Date()
        },
        {
            id: '123',
            name: 'rob',
            email: 'rob@O.com',
            password: 'rob-o',
            entries: 0,
            joined: new Date()
        },
        {
            id: '678',
            name: 'ben',
            email: 'ben@simmons.com',
            password: 'philly25',
            entries: 0,
            joined: new Date()
        }
    ]
}

// GET 
app.get('/', (req, res) => {
    res.json(database.users)

})


// REGISTER POST
app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    for (ele of database.users) {
        if (ele.email === email && ele.password === password) {
            res.json(`You already have an account ${name}`)
            return ele
        }
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, saltRounds, function (err, hash) {
            });
        });
        newUser = { id: uuid(), ...req.body, entries: 0, joined: new Date() }
        database.users.push(newUser);
        return res.json(newUser)
    }

})

// SIGN IN POST
app.post('/signin', (req, res) => {
    const { password, email } = req.body
    for (ele of database.users) {
        if (ele.email === email && ele.password === password) {
            res.json(`Welcome back ${ele.name}`)

            return ele
        }
    }
    res.status(404).json("Your account can not be found")
})

// PROFILE

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    database.users.forEach(user => {
        if (user.id === id) {
            return res.json(user.name)
        }
    })
    res.status(400).json("No such user")

})


/* LISTENING.... */
app.listen(3001, () => {
    // console.log("app is running on port 3001")
})

/* API Framework
/ -- > res = this is working
/signin --> POST = sucsess / fail
/register --> POST = user
/profile/ :userId --> GET = user
/image --> PUT --> user


Bcrypt = https://www.npmjs.com/package/bcrypt

TO HASH:

PUT THIS IN GLOBAL SCOPE/UP TOP:
const bcrypt = require('bcrypt');
const saltRounds = 10;

someRegisterInFunction {.....

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
    ........

});

}


DECODE:

someSignInFunction { .......

bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
});

.......
}


*/