module.exports = function(app){
  var loopback = require('loopback');
  var flash = require('express-flash');

  var loopbackPassport = require('loopback-component-passport');
	var PassportConfigurator = loopbackPassport.PassportConfigurator;
	var passportConfigurator = new PassportConfigurator(app);
  // // The access token is only available after boot
  // app.middleware('auth', loopback.token({
  //   model: app.models.accessToken
  // }));

  // app.middleware('session:before', loopback.cookieParser(app.get('cookieSecret')));
  // app.middleware('session', loopback.session({
  //   secret: 'kitty',
  //   saveUninitialized: true,
  //   resave: true
  // }));
  // 这样加载session中间件会导致错误
  // app.use(loopback.session({
  //   secret: 'kitty',
  //   saveUninitialized: true,
  //   resave: true
  // }));
  var passport = passportConfigurator.init();

  // We need flash messages to see passport errors
	app.use(flash());

  var config = false;
  try {
    config = require('../providers.json');
  } catch (err) {
    console.error(
      'Please configure your passport strategy in `providers.json`.');
    console.error(
      'Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.'
    );
  }

	// Set up related models
	passportConfigurator.setupModels({
	  userModel: app.models.user,
	  userIdentityModel: app.models.userIdentity,
	  userCredentialModel: app.models.userCredential
	});

	for (var s in config) {
		var c = config[s];
		c.session = c.session !== false;
		passportConfigurator.configureProvider(s, c);
	}
//-------------------------------------------------------------------------
	var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

  app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res){
    console.log(req.user);
    res.end();
  })

	app.get('/local', function(req, res, next){
    console.log(req.isAuthenticated());
		res.end('1234!');
	});

  app.get('/auth/account', ensureLoggedIn('/local'), function (req, res, next) {
    console.log(req.isAuthenticated());
    res.end();
  })
}
