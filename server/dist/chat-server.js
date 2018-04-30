"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var message = require("./model/messageWithAction.js");
var user = require("./model/user.js");
var AWS = require('aws-sdk');

var ChatServer = /** @class */ (function () {
    var thingName = 'test';
    var region = 'us-west-2';

    var iotdata = new AWS.IotData({
        endpoint: 'https://data.iot.us-west-2.amazonaws.com',
        region: region,
    });
    var awsIot = require('aws-iot-device-sdk');

    function ChatServer() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    ChatServer.prototype.createApp = function () {
        this.app = express();
    };
    ChatServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    ChatServer.prototype.config = function () {
        this.port = process.env.PORT || ChatServer.PORT;
    };
    ChatServer.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };

    function remove(array, element) {
        if(!array.includes(element))
            return;
        const index = array.indexOf(element);
        array.splice(index, 1);
    }

    function updateShadow(array, action) {
        var getThingShadowParam = {
            thingName: thingName
        };

        iotdata.getThingShadow(getThingShadowParam, function (err, data) {
            console.log('The thingShadow is '+JSON.stringify(data));
            var newData = JSON.parse(data.payload).state.desired.personName;
            console.log(newData);
            if(action==0) {
                if (!newData.includes(array))
                    newData.push(array);
            }
            else
                remove(newData, array);

            var json = {"state": { "desired": {"personName": newData}}};
            console.log('new json is' + json);
            var params = {
                payload: new Buffer(JSON.stringify(json)),
                thingName: thingName
            };
            iotdata.updateThingShadow(params, function(err, data) {
                if (err) console.log('linju get err'+err, err.stack); // an error occurred
                else     console.log('linju get delta'+data);           // successful response
            });
        });
    }

    ChatServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });

        var shadows = awsIot.thingShadow({
            keyPath: '/Users/junli/express-locallibrary-tutorial/routes/7f225d67cf.private.pem.key',
            certPath: '/Users/junli/express-locallibrary-tutorial/routes/7f225d67cf.certificate.pem.crt',
            caPath: '/Users/junli/express-locallibrary-tutorial/routes/root-CA.crt',
            clientId: '7f225d67cf',
            host: 'a1db7pii5h06gt.iot.us-west-2.amazonaws.com',
            debug: true
        });

        shadows.on('delta', function(name, stateObject) {
            console.log("reach line 25 " + name);
            console.log('stateObject'+ JSON.stringify(stateObject));
            var user = new Object();
            user.name = stateObject.state.personName;
            var a = new Object();
            a.from = user;
            a.action = 'UPDATE';
            console.log('message to be sent ' + JSON.stringify(a));
            _this.io.emit('message', a);
        });

        shadows.on('connect', function() {
            setTimeout(function() {
                shadows.register("test");
                // console.log("Shadow connected");
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

        this.io.on('connect', function (socket) {

            console.log('Connected client on port %s.', _this.port);
            socket.on('message', function (m) {
                console.log('[server](message): %s', JSON.stringify(m));
                console.log('action is ' + m.action);
                // new member join
                if(m.action == 0) {
                    console.log('add to list');
                    updateShadow(m.from.name, m.action);
                } else if(m.action == 1) {
                    console.log('remove from list');
                    updateShadow(m.from.name, m.action);
                }
                _this.io.emit('message', m);
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    ChatServer.prototype.getApp = function () {
        return this.app;
    };
    ChatServer.PORT = 8080;
    return ChatServer;
}());
exports.ChatServer = ChatServer;
