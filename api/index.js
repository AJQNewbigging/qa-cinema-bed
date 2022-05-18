const express = require('express');
const mongoose = require('mongoose');
// Need to have Morgan watching over us
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/qa-cinema"

// Require routers
const viewingRouter = require('./route/viewing-router.js')

// Create server instance
const app = express();

// Apply environment configurations and/or middleware
if (process.env.NODE_ENV === "prod") {
    console.log("=== PRODUCTION ===");
    app.use(morgan('combined'));
} else {
    console.log("=== DEVELOPMENT ===");
    app.use(morgan('dev'));
}

// JSON decoder
app.use(express.json());
// URL form decoder
app.use(express.urlencoded({ extended: true }));

// TODO: Add routers
app.use("/viewing", viewingRouter);

app.use((error, request, response, next) => {
    // TODO: add error handling middleware
});

async function main() {
    await mongoose.connect(DB_URI, { useNewUrlParser: true }).then(() => {
        console.log(`DB Connection establised through: ${DB_URI}`);
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error connecting to DB'));
    db.on('connection', console.log.bind(console, 'DB connection established'));

    // Start the server
    const server = app.listen(PORT, function() {
        console.log(`Server up on ${PORT}`);
    });
}

main();