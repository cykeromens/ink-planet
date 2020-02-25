import {
  ConverterService,
  EndpointInfo,
  GlobalAcceptMimesMiddleware,
  IMiddleware,
  OverrideProvider,
  Res,
  ResponseData,
  SendResponseMiddleware,
  ServerLoader,
  ServerSettings,
  $log
} from '@tsed/common';
import { isBoolean, isNumber, isStream, isString } from '@tsed/core';
// import '@tsed/passport';
// import '@tsed/swagger';
import * as bodyParser from 'body-parser';
// import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import * as methodOverride from 'method-override';
import { User } from './domain/user/user';
import { createConnection, getConnection } from 'typeorm';

const rootDir = __dirname;

@ServerSettings({
  rootDir,
  httpPort: process.env.PORT || 8080,
  httpsPort: false,
  acceptMimes: ['application/json'],
  mount: {
    '/api': [
      `${rootDir}/controller/**/**.controller.{ts,js}`
    ]
  },
  componentsScan: [
    `${rootDir}/service/**/*.service{.ts,.js}`,
    `${rootDir}/repository/**/*.repository{.ts,.js}`,
    `${rootDir}/protocols/*{.ts,.js}`
  ],
  passport: {
    userInfoModel: User
  },
  swagger: {
    path: '/api-docs',
    spec: {
      securityDefinitions: {
        'auth:basic': {
          type: 'basic'
        }
      }
    }
  }
})

export class Server extends ServerLoader {
  $beforeInit() {
    // this.set('views', this.settings.get('viewsDir')); // le repertoire des vues
    // this.engine('html', cons.ejs);
    createConnection({
      name: 'default',
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'admin',
      database: process.env.POSTGRES_DB || 'ink-planet-dev',
      logging: false,
      synchronize: true,
      entities: [
        `${rootDir}/domain/**/*{.ts,.js}`
      ],
    }).then(async connection => {
      $log.debug('DB connected');
      // await getConnection().manager.save(new User());
    }).catch(error => console.log(error));
  }

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(cors())
      .use(cookieParser())
      // .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }))
      .use(session({
        secret: 'mysecretkey',
        resave: true,
        saveUninitialized: true,
        // maxAge: 36000,
        cookie: {
          path: '/',
          httpOnly: true,
          secure: false,
          maxAge: null
        }
      }));

    return null;
  }

  public $onReady() {
    console.log('Server started...');
  }

  public $onServerInitError(err) {
    console.error(err);
  }
}
