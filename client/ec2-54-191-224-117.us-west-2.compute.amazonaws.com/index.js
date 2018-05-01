var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('reach line 7');
	var awsIot = require('aws-iot-device-sdk');
	var shadows = awsIot.thingShadow({
	   keyPath: '/Users/junli/express-locallibrary-tutorial/routes/7f225d67cf.private.pem.key',
	  certPath: '/Users/junli/express-locallibrary-tutorial/routes/7f225d67cf.certificate.pem.crt',
	    caPath: '/Users/junli/express-locallibrary-tutorial/routes/root-CA.crt',
	  clientId: '7f225d67cf',
	      host: 'a1db7pii5h06gt.iot.us-west-2.amazonaws.com',
	         debug: true
	});

	//
	// Update divs whenever we receive delta events from the shadows.
	//
	shadows.on('delta', function(name, stateObject) {
	   if (name === 'TemperatureStatus') {
	      console.log("reach line 23 ");
	   } else { // name === 'TemperatureControl'
	            console.log("reach line 25 ");
	   }
	});

	shadows.on('connect', function() {
	   setTimeout(function() {
	   shadows.register("test");
	   console.log("Shadow connected");
	   setTimeout(function() {
	     var clientTokenUpdate;
	     shadows.get("test",clientTokenUpdate );
	     if (clientTokenUpdate === null)
	      {
	         console.log('update shadow failed, operation still in progress');
	      } else {
	      	console.log(clientTokenUpdate);
	      }
	   }, 1000);
	 }, 1000);
	});

	// // Not sure why 'update' will not trigger this function?
	shadows.on('status',
	   function(mythingname, stat, clientToken, stateObject) {
	     console.log("shadow update received: "+ mythingname + " " + stat);
	      message_from_topic = JSON.parse(JSON.stringify(stateObject));
	      table_status = message_from_topic.state.reported.inUse;
	      table_availability = table_status===undefined ? "Available": table_status==="false" ? "Available":"Not Available";
	   });
	console.log("stateObject"+ stateObject);
    res.send(JSON.stringify({ a: new Date() }));
    // res.render('index', { title: 'Express' });
});

module.exports = router;
