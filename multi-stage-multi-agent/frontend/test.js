const { getMessage } = require('./app');

const result = getMessage();

if (result === "Frontend application is working") {
    console.log("Frontend Test Passed");
} else {
    console.error("Frontend Test Failed");
    process.exit(1);
}
