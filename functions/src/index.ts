import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ArticleModule } from './article.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

/**
 * express
 */
const server = express();

/**
 * サーバ作成
 *
 * @param expressInstance expressのインスタンス
 * @returns nestのapp
 */
export const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    ArticleModule,
    new ExpressAdapter(expressInstance),
  );

  // ここにセキュリティについての設定を追加する
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  console.log('the server is starting @ firebase');
  return app.init();
};

/**
 * サーバ起動
 */
createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

/**
 * Cloud Functionsの登録
 */
export const rssApi = functions.https.onRequest(server);
