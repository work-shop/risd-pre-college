const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const paths = {
    src: "./src",
    dest: "./dist/wp-content/themes/custom",
    public: "/wp-content/themes/custom"
};

const script = {
    test: /\.js$/i,
    exclude: /node_modules/,
    use: "babel-loader"
};

const libStyle = {
    test: /\.css$/i,
    include: [
        /node_modules/,
        /styles\/lib/
    ],
    use: [
        "style-loader",
        {
            loader: "css-loader",
            options: {
                importLoaders: 1
            }
        }
    ]
}

const style = {
    test: /\.scss$/i,
    exclude: [
        /node_modules/,
        /styles\/lib/
    ],
    use: ExtractTextPlugin.extract({
        fallback: {
            loader: "style-loader",
            options: {
                sourceMap: true,
            }
        },
        use: [
            {
                loader: "css-loader",
                options: {
                    sourceMap: true,
                    importLoaders: 1
                }
            },
            { loader: "resolve-url-loader" },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                    includePaths: [ require("bourbon").includePaths ]
                }
            }
        ]
    })
};

const font = {
    test: /\.(woff2?|otf|ttf|eot)$/i,
    exclude: /node_modules/,
    use: {
        loader: "file-loader",
        options: {
            name: "fonts/[hash].[ext]"
        }
    }
};

const image = {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [
        {
            loader: "file-loader",
            options: {
                hash: "sha512",
                digest: "hex",
                name: "images/[hash].[ext]"
            }
        },
        "image-webpack-loader"
    ]
};

const config = {
    entry: {
        "scripts/bundle.js": "./scripts/main.js",
        "styles/bundle.css": "./styles/main.scss"
    },
    output: {
        path: path.resolve(__dirname, paths.dest),
        filename: "[name]",
        publicPath: `${paths.public}/`
    },
    module: {
        rules:[
            script,
            libStyle,
            style,
            font,
            image
        ]
    },
    devtool: "source-map",
    context: path.resolve(__dirname, paths.src),
    externals: {
        jquery: "jQuery"
    },
    plugins: [
        new CleanWebpackPlugin( paths.dest ),
        new CopyWebpackPlugin([
            {
                from: "style.css"
            },
            {
                from: "**/*.{php,twig}"
            }
        ]),
        new ExtractTextPlugin("[name]"),
        new BrowserSyncPlugin({
            proxy: "localhost:8080",
            port: 3000,
            ui: {
                port: 3001
            }
        })
    ]
};

module.exports = config;
