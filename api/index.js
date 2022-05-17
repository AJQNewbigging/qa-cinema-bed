const express = require('express');
const PORT = process.env.PORT || 3000;
// Need to have Morgan watching over us
const morgan = require('morgan');

// Require routers
const exampleRouter = require('./route/example-router.js')

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
app.use("/", exampleRouter);

app.use((error, request, response, next) => {
    // TODO: add error handling middleware
});

async function main() {
    // TODO: add mongoDB connection 

    // Start the server
    const server = app.listen(PORT, function() {
        console.log(`Server up on ${PORT}`);
    });
}

main();