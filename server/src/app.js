import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'

import config from './config/config'
import createRoutes from './routes'
import * as middlewares from './middlewares'

// variables port, used by server
const SERVER_PORT = config.server.port

// the app object is created by calling express() function exported by the Express module
const app = express()

app
  .use(helmet())
  .use(compression())
  // parse body params and attach them to req.body
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // parses cookies attached to the client request object
  .use(cookieParser())
  // enable CORS - Cross Origin Resource Sharing
  .use(cors())

app.get('/', (req, res) =>
  res.send(`
                              <div style="display: flex;
                                          align-items: center;
                                          justify-content: center;
                                          width: calc(100vw - 16px);
                                          height: calc(100vh - 16px);
                                          background-color: rgb(245, 246, 250);
                                          border: 1px solid rgba(0, 0, 0, .5);
                                          box-shadow: inset 0 0 16px rgba(0, 0, 0, .8);
                                          box-sizing: border-box;"
                              >
                                  <h1 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; 
                                            font-weight: 700;"
                                  >
                                      Welcome to <span style="color: rgba(81, 203, 238, 1);">Express.js</span> world!
                                  </h1>
                              </div>
                              `)
)

// mount routes
createRoutes(app)

app
  // error-handling route
  .use(middlewares.pageNotFound())
  // mount error-handling middle-ware last
  .use(middlewares.errorHandler())

app.listen(SERVER_PORT, err => {
  if (err) throw err
  console.log(`Server is up on port: ${SERVER_PORT}`)
})
