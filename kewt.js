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

function logGreen(msg) {
    process.stdout.write(`${colours.green}`);
    log(msg);
    process.stdout.write(`${colours.reset}`);
}

function logRed(msg) {
    process.stdout.write(`${colours.red}`);
    log(msg);
    process.stdout.write(`${colours.reset}`);
}

function reportFinal() {
    log();
    if (testsRun !== 0) { log(`${testsRun} tests run`); } else { log("No tests found"); }
    if (testsPassed > 0) { logGreen(`${testsPassed} tests passed`); }
    if (testsFailed > 0) { logRed(`${testsFailed} tests failed`); }
}

// run the tests!
Object.getOwnPropertyNames(tests).forEach(test => tests[test]());
reportFinal();

