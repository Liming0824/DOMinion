const path = require('path');
module.exports = {
  entry: "./lib/main.js",
  output: {
  	filename: "dominion.js",
    path: path.resolve(__dirname, 'lib')
  },
  devtool: 'source-map'
};
