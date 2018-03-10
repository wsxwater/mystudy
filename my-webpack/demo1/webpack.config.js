var htmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    /*entry:'./hello.js',*///入口文件
    /*entry:['./hello.js','./world.js'],*///入口文件
	entry:{
        hello:'./hello.js',
        b:'./b.js',
        1:'./1.js',
        2:'./2.js',
        3:'./3.js',
    },//入口文件
	output:{
        path:__dirname +'/dist1',
        //filename:'hello.bundle.js', //出口
        //filename:'[name]-[hash].js', 
        filename:'js/[name]-[chunkhash].js', 
        /*publicPath:'http://cdn.com/',*///占位符 
	},
    plugins:[
        new htmlWebpackPlugin({
            filename:'test-script放置不同位置.html',
            template:'test-script放置不同位置.html',
            inject:false,//head、body、false
            title:'webpack is good!!!',
            date:new Date(),
            minify:{
                removeComments:true,//删除注释
                collapseWhitespace:true,//删除空格
            },
            //chunks:['hello','b'],
            //excludeChunks:['world'],//排除
        }),
        new htmlWebpackPlugin({
            filename:'test引用.html',
            template:'test引用.html',
            inject:'body',
            title:'this is test引用.html',
            date:new Date(),
            excludeChunks:['1','2','3']
        }),
        new htmlWebpackPlugin({
            filename:'test.html',
            template:'test.html',
            inject:'head',
            title:'this is 1.html',
            date:new Date(),
            excludeChunks:['1','2','3']
        }),
        new htmlWebpackPlugin({
            filename:'1.html',
            template:'test1.html',
            inject:false,
            title:'hello,webpack!!!',
            date:new Date(),
            chunks:['1','b'],
        }),
        new htmlWebpackPlugin({
            filename:'2.html',
            template:'test1.html',
            inject:false,
            title:'this is 2.html',
            date:new Date(),
            chunks:['2','b'],
        }), 
        new htmlWebpackPlugin({
            filename:'3.html',
            template:'test1.html',
            inject:false,
            title:'this is 3.html',
            date:new Date(),
            chunks:['3','b'],
        })  
    ],
	devtool:'source-map',//直接生成source.map
    module:{
    	loaders:[
    	    {test:/\.css$/,loader:'style-loader!css-loader'},
            {test:/\.js$/,loader:'babel-loader',exclude:/node_modules/ /*排除哪些目录*/},
    	]
    }
}