const path = require('path');

module.exports = {
    entry: './Portfolio/public/reference.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for compiled files
    filename: 'bundle.js', // Output filename
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Optional: Enable importing files without specifying the file extensions
  },
};
