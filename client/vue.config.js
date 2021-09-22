module.exports = {
    devServer: {
        proxy: 'http://localhost:5000',
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "./src/styles/index.scss";`,
            },
        },
    },
};
