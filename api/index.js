const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Need to have Morgan watching over us
const morgan = require('morgan');
const HttpError = require('./error/http-error.js');
const NotFoundError = require('./error/not-found-error.js');

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/qa-cinema"

// Require routers
const viewingRouter = require('./route/viewing-router.js')
const movieRouter = require('./route/movie-router.js')
const bookingRouter = require('./route/booking-router.js')

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
// Allow cross-origin requests
app.use(cors());
// Add routers
app.use("/viewing", viewingRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);

app.use((error, request, response, next) => {
    console.error(error.message);

    if (!(error instanceof HttpError)) {
        if (error instanceof NotFoundError) {
            error = new HttpError(error, 404);
        } else if (error.name === "ValidationError") {
            error = new HttpError(error, 400);
        } else {
            // Unknown error
            error = new HttpError(new Error("Something went wrong..."), 500);
        }
    }
    // It must be a HTTP error to have reached here, whether that was passed to error, or created
    // above
    return response.status(error.statusCode).json({
        message: error.message,
        data: error.data 
    })
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