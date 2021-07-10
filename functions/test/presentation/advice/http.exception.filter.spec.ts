import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {
  INestApplication,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleModule } from '../../../src/article.module';
import ArticleService from '../../../src/application/service/article.service';
import Count from '../../../src/domain/model/count.domain.model';
import MockDate from 'mockdate';

jest.mock('firebase-functions', () => {
  return {
    config: jest.fn(() => {
      return {
        twitter: { token: { key: 'key', secret: 'secret' } },
        firestore: { collections: { users: 'stg-users' } },
      };
    }),
  };
});

describe('HttpExceptionFilter', () => {
  let app: INestApplication;
  let articleService = {
    findArticles: (count: Count) => [],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ArticleModule],
    })
      .overrideProvider(ArticleService)
      .useValue(articleService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    MockDate.set('2021-12-01 09:00:00+09:00');
  });

  it('記事取得API - 正常系', () => {
    return request(app.getHttpServer())
      .get('/api/v1/article/search')
      .expect(200)
      .expect({
        info: { datetime: '2021-12-01T09:00:00+09:00' },
        articles: [],
      });
  });

  test.each`
    count
    ${0}
    ${21}
  `(
    '記事取得API - countが $count の場合、バリデーションエラー',
    (count: number) => {
      return request(app.getHttpServer())
        .get(`/api/v1/article/search?count=${count}`)
        .expect(400)
        .expect({
          title: 'Bad Request',
          detail: 'Bad Request Exception',
        });
    },
  );

  it('記事取得API - 存在しないパス', () => {
    return request(app.getHttpServer())
      .get('/api/v1/article/hoge')
      .expect(404)
      .expect({
        title: 'Not Found',
        detail: 'Cannot GET /api/v1/article/hoge',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('HttpExceptionFilter - 例外', () => {
  let app: INestApplication;

  let articleService = {
    findArticles: (count: Count) => {
      throw new InternalServerErrorException();
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ArticleModule],
    })
      .overrideProvider(ArticleService)
      .useValue(articleService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    MockDate.set('2021-12-01 09:00:00+09:00');
  });

  it('記事取得API - 内部エラー', () => {
    return request(app.getHttpServer())
      .get('/api/v1/article/search?count=1')
      .expect(500)
      .expect({ title: 'UndefinedError', detail: 'Internal Server Error' });
  });

  afterAll(async () => {
    await app.close();
  });
});
