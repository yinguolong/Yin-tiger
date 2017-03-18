module.exports = {
  entry:"./src/index.js",
  output:{
    path:"/build/",
    filename:"bundle.js",
    publicPath:"/build/"
  },
  devServer :{
    port:3000,
    historyApiFallback:true
  },
  devtool:"eval",
  resolve:{
    extensions:[".js",".css",".jpg",".png","jif"]
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css/,use:["style-loader","css-loader"]},
      { test: /\.(jpe?g|png)$/,use:"file-loader"}
    ]
  }
}
