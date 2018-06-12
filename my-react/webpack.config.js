module.exports={
	entry:'./index1.js',
	output:{
		path:__dirname,
		filename:'bundle1.js'
	},
	devtool:'source-map',
	module:{
		rules:[
            {test: /\.css$/,loader:'style!css'},
            {test: /\.js$/,loader:'react-hot-loader!babel-loader',exclude: /node_modules/}
		]
	}
}