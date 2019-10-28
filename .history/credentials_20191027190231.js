module.exports = {
    mongo: {
        development: {
            connectionString: 'mongodb+srv://efridge:g14Lw2ymMSAqvDz2@p2-cluster-ye5fc.mongodb.net/test?retryWrites=true&w=majority'
        },
        production: {
            connectionString: 'mongodb+srv://efridge:g14Lw2ymMSAqvDz2@p2-cluster-ye5fc.mongodb.net/test?retryWrites=true&w=majority'
        }
    },
    session: {
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // This needs to be true if in prod under https
    }
}
