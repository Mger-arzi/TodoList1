module.exports = {
	preset: "jest-puppeteer",
	testRegex: "./*.test.js$",
	setupFilesAfterEnv: ["./setupTests.js"],
    setTimeout: 999999
};
