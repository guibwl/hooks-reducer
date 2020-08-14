

module.exports = {
    entry: './main.js',
    optimization: {minimize: false},
    devtool: 'inline-cheap-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-react-jsx']
                    }
                }
            }
        ]
    },
    devServer: {
        compress: true,
        port: 9000,
        index: 'index.html',
        hot: true
    }
}