#!/usr/bin/env node

let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

// This is the function you want to test.
function unitUnderTest() {
    return "actual value";
}

// Each unit test is a property of the `tests` object.
const tests = {
    exampleTest: () => {
        const actualValue = unitUnderTest();

        assertEqual("expected value", actualValue, tests.exampleTest.name);
    }
};

function assertEqual(expected, actual, testName) {
    testsRun++;
    const comparableExpected = JSON.stringify(expected);
    const comparableActual = JSON.stringify(actual);

    if (comparableExpected !== comparableActual) {
        testsFailed++;
        log();
        logRed(`${testName} failed`);
        logRed(`expected: ${comparableExpected}`);
        logRed(`actual: ${comparableActual}`);
    } else {
        testsPassed++;
        logGreen(`${testName} passed`);
    }
}

colours = {
    red: "\u001B[31m",
    green: "\u001B[32m",
    reset: "\u001B[0m"
};

function log(msg) {
    if (msg !== undefined) {
        console.log(msg);
    } else {
        console.log();
    }
}

function logColour(msg, colour) {
    process.stdout.write(`${colour}`);
    log(msg);
    process.stdout.write(`${colours.reset}`);
}

function logGreen(msg) {
    logColour(msg, colours.green);
}

function logRed(msg) {
    logColour(msg, colours.red);
}

function summary() {
    log();
    if (testsRun !== 0) { log(`${testsRun} tests run`); } else { log("No tests found"); }
    if (testsPassed > 0) { logGreen(`${testsPassed} tests passed`); }
    if (testsFailed > 0) { logRed(`${testsFailed} tests failed`); process.exit(1); }
}

// run the tests!
Object.getOwnPropertyNames(tests).forEach(test => tests[test]());
summary();

