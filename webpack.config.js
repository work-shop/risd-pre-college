const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');

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
                    importLoaders: 1,
                    minimize: true
                }
            },
            { loader: "resolve-url-loader" },
            {
                loader: "postcss-loader",
                options: {
                    plugins: function() {
                        return [
                            require('precss'),
                            require('autoprefixer')
                        ];
                    },
                    sourceMap: true
                }
            },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                    includePaths: [ require("bourbon").includePaths, require("bourbon-neat").includePaths ]
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
        { loader: "image-webpack-loader" }
    ]
};

const plugins = [
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
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Popper: ['popper.js', 'default'],
    }),
    new BrowserSyncPlugin({
        proxy: "localhost:8080",
        port: 3000,
        ui: {
            port: 3001
        }
    }),
    new FaviconsPlugin({
        logo: "./aperture.png",
        prefix: 'icons/',
        emitStates: false,
        inject: false,
        icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: true,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: false
        }
    }),
    new MinifyPlugin({}, {})
];

const config = {
    entry: {
        "scripts/bundle.js": "./scripts/main.js",
        "styles/bundle.css": "./styles/main.scss",
        "styles/wufoo.css": "./styles/wufoo/main.scss"
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
    plugins: plugins,
    resolve: {
        alias: {
            "masonry": "masonry-layout",
            "isotope": "isotope-layout"
        }
    }
};

module.exports = config;
