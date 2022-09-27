const path = require('path');

module.exports = function(env) { 
    return {
        mode: 'none',
        entry: path.resolve(`src/index.js`),
        output: {
            path: path.resolve('../backend/src/main/resources'),
            filename: 'assets/js/main.js',
            assetModuleFilename:'assets/images/[hash][ext]'
        },
        module:{
            rules:[{
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('config/babel.config.json')
                }
            }, {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options: {
                            modules: false
                        }
                    },
                    'sass-loader']
            }, {
                test: /\.(png|gif|jpe?g|svg|ico|tiff?|bmp)$/i,
                type: 'asset/resource'
            }]
        },
        devtool: "eval-source-map",
        devServer: {
            host: '0.0.0.0',
            port: 9090,
            proxy: {
              '/api': {target: 'http://34.64.235.225:8080'},
              '/assets': {target: 'http://34.64.235.225:8080'},
              '/html': {target: 'http://34.64.235.225:8080'}
          },
            liveReload: true,
            hot: false,
            compress: true,
            historyApiFallback: true
        }
    }
}