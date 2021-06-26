import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ArticleModule } from './article.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // swaggerの設定を追加
  const options = new DocumentBuilder()
    .setTitle('記事取得API')
    .setDescription('福井新聞の記事情報を提供')
    .setVersion('1.0.0')
    .addServer('https://dev.fooqoo56.com/', '本番環境')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('rssApi', app, document);

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
