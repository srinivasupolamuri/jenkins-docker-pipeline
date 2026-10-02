const { add } = require('./app');

const result = add(10, 20);

if (result === 30) {
    console.log('Test Passed: 10 + 20 = 30');
} else {
    console.error('Test Failed');
    process.exit(1);
}
