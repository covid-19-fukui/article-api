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
    .setDescription(
      '新型コロナワクチンの接種状況の統計データを福井県を軸に集計したデータを提供',
    )
    .setVersion('1.0.0')
    .addServer('https://dev.fooqoo56.com/', '本番環境')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(5001);
}

// eslint-disable-next-line no-void
void bootstrap();
