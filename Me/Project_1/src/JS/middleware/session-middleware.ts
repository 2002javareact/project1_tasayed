import * as session from "express-session"



var sessionConfig = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }

export const sessionMiddleware = session(sessionConfig)