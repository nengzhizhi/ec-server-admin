var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var app = module.exports = loopback();

// app.use(loopback.token({ model: app.models.accessToken }));

boot(app, __dirname);


// 设置angularJS静态路由
// var staticPath = null;

// // if (env !== 'prod') {
// //   staticPath = path.resolve(__dirname, '../client/app/');
// //   console.log("Running app in development mode");
// // } else {
//   staticPath = path.resolve(__dirname, '../dist/');
//   console.log("Running app in prodction mode");
// // }

// app.use(loopback.static(staticPath));

var path = require('path');
app.use(loopback.static(path.resolve(__dirname, '../client')));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
