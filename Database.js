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

module.exports = { database : database }