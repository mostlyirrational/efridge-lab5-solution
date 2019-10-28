module.exports = {
    mongo: {
        development: {
            connectionString: 'mongodb+srv://yourUsername:yourPassword@yourCluster.mongodb.net/test?retryWrites=true&w=majority'
        },
        production: {
            connectionString: 'mongodb+srv://yourUsername:yourpassword@yourCluster.mongodb.net/test?retryWrites=true&w=majority'
        }
    },
    session: {
        secret: 'some kind of secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // This needs to be true if in prod under https
    }
}
