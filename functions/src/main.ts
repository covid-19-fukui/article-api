import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ArticleModule } from './article.module';

/**
 * swagger作成
 */
async function bootstrap() {
  const app = await NestFactory.create(ArticleModule);

  const options = new DocumentBuilder()
    .setTitle('記事取得API')
    .setDescription('福井新聞の記事情報を提供')
    .setVersion('1.0.0')
    .addServer('https://dev.fooqoo56.com/', '本番環境')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('rssApi', app, document);

  await app.listen(5001);
}

// eslint-disable-next-line no-void
void bootstrap();
