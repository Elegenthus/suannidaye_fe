var path = require('path')

module.exports = {
    template: "swig", // whatever template engine you like
    mock: "/mock/mock.json", // dir for mock data
    webpack: true, // flag for using webpack or not
    webpackConfigPath: path.join(__dirname, "./build/webpack.dev.conf.js"),
    proxy: {
        route: "/",
        origin: "http://120.24.4.254:5686/"
    },
    staticDir: "/static",
    templateDir: "/template",
}