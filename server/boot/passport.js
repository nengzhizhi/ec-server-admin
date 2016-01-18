module.exports = function(app){
  var bodyParser = require('body-parser');
  var loopback = require('loopback');
  var flash = require('express-flash');

  // to support JSON-encoded bodies
  app.use(bodyParser.json());
  // to support URL-encoded bodies
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  //// The access token is only available after boot
  app.use(app.loopback.token({
    model: app.models.accessToken
  }));

  app.use(loopback.cookieParser(app.get('cookieSecret')));
  app.use(loopback.session({
    secret: app.get('cookieSecret'),
    saveUninitialized: true,
    resave: true
  }));

  var config = false;
  try {
    config = require('../../providers.json');
  } catch (err) {
    console.error(
      'Please configure your passport strategy in `providers.json`.');
    console.error(
      'Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.'
    );
  }


	var loopbackPassport = require('loopback-component-passport');
	var PassportConfigurator = loopbackPassport.PassportConfigurator;
	var passportConfigurator = new PassportConfigurator(app);  

	// Initialize passport
	passportConfigurator.init();

	// We need flash messages to see passport errors
	app.use(flash());

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

	app.get('/local', function(req, res, next){
		res.end('1234!');
	});

	app.get('/auth/account', ensureLoggedIn('/local'), function (req, res, next) {
		console.log('Logged in', req.user);
	})
}