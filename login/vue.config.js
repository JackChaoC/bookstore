module.exports = {
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: "./", // 部署应⽤包时的基本 URL
    outputDir: "dist", // npm run build ⽣成的⽂件夹，默认是dist
    assetsDir: "static", // 在kaixin⽂件夹下⾯⽣成static⽬录存放js,img,css等静态资源
    indexPath: "index.html", // ⽣成的单⽂件的，⽂件名，
    // devServer: {
    //     host: "127.0.0.1", // 配置主机地址
    //     port: process.env.NODE_ENV == 'production' ? 3000 : 8888, // 配置运⾏的端⼝

    //     // proxy: "接⼝地址",  跨域代理！ 【重要！】
    //     proxy: { // 配置多个！
    //         '/api': {
    //             target: 'http://localhost:3030/api',
    //             ws: true, // 跨域地址是https协议！
    //             changeOrigin: true,
    //             pathWrite: {
    //                 "^/api": ""   // 将 '/api' 替换成 ''  
    //             }
    //         }
    //     },
    // }
    // devServer: {
    //     proxy: {
    //         '/api': {//代理标识，一般是每个接口前的相同部分
    //             target: 'http://localhost:8081', // 这里写的是访问接口的域名和端口号
    //             pathRewrite: { // 重写路径，替换请求地址中的指定路径
    //                 '^/api': ''
    //             },
    //             ws: true,
    //             changeOrigin: true, // 允许跨域请求
    //         },

    //     }
    // },

}
