module.exports = {
  testMatch: ["**/jest-tests/**/*.jest.[jt]s?(x)"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./jest-report",
        filename: "report.html",
        expand: true,
      },
    ],
  ],
};