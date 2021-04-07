const mongoose = require('mongoose');

// Connect to local database
mongoose.set('useCreateIndex', true);

const conn = mongoose.connect(
    process.env.DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => {
        console.log('Database connection successful');
    }
);

module.exports = conn;
