/**
 * Express configuration
 */

'use strict';

const express = require('express');
const compress= require('compression');
// const shrinkRay = require('shrink-ray');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const lusca = require('lusca');
const config = require('./environment');
const passport = require('passport');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');
const MongoStore = connectMongo(session);
const md5 = require('md5');
module.exports = function(app) {
  const env = app.get('env');

  // if(env === 'development' || env === 'test') {
  //   app.use(express.static(path.join(config.root, '.tmp')));
  // }

  // if(env === 'production') {
    // app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  // }
  // app.use(express.static(path.join(config.root, 'public')));
  app.use(morgan('dev'));

  app.use(compress());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());


  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'transition-helper-server'
    })
  }));

  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  if(env !== 'test') {
    app.use(lusca({
      // csrf: {
      //   header: 'X-XSRF-TOKEN',
      //   cookie: 'XSRF-TOKEN'
      // },
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 31536000, //1 year, in seconds
        includeSubDomains: true,
        preload: true
      },
      xssProtection: true
    }));
  }

  if(env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
  const User = require('../api/user/user.model');
  const agents = require('./environment/seed');
  const Comment = require('../api/comment');
  if(env === 'development') {
    // console.log("DEVELOPMENT!!!");
    // agents.forEach(agent => {
      // User.findOne({email: agent.email}).exec()
      //   .then(user => {
      //     if(!user) {
            // agent.photoURL = `https://gravatar.com/avatar/${md5(agent.email)}?s=200&d=retro`
            // agent.languages = JSON.parse(agent.languages);
            // (new User(agent)).save();
          // }
        // });
    // });
    // const comment = new Comment({
    //   text: "This is comment " + (i+1),
    //   rate: Math.floor((Math.random() * 4)) + 1,
    //   author: {
    //     _id: "5957cefb34852a0efc3cc5ec",
    //     name: "Hyungwu Pae"
    //   }
    // })
    
  }

}

