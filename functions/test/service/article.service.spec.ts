import ArticleEntity from '../../src/repository/dto/article.entity';
import FireStoreConfig from '../../src/config/firestore.config';
import { ArticleFireStoreRepository } from '../../src/repository/article.repository';
import ArticleService from '../../src/service/article.service';
import * as admin from 'firebase-admin';
import ArticleQuery from '../../src/controller/dto/article.query';
import ArticleListApiResponse from '../../src/controller/dto/article.list.api.response';
import InfoResponse from '../../src/controller/dto/info.response';
import ArticleResponse from '../../src/controller/dto/article.response';
import MockDate from 'mockdate';

describe('ArticleService', () => {
  let articleService: ArticleService;
  let articleFireStoreRepository: ArticleFireStoreRepository;

  beforeEach(async () => {
    const fireStoreConfig = new (FireStoreConfig as jest.Mock)();

    articleFireStoreRepository = new ArticleFireStoreRepository(
      fireStoreConfig,
    );
    articleService = new ArticleService(articleFireStoreRepository);
    MockDate.set('2021-12-01 09:00:00+09:00');
  });

  describe('findArticles', () => {
    it('正常系 - レスポンスあり', async () => {
      jest
        .spyOn(articleFireStoreRepository, 'getArticles')
        .mockImplementation(async (count: number) => {
          return [
            new ArticleEntity(
              'key1',
              'title1',
              'link1',
              admin.firestore.Timestamp.fromDate(
                new Date('2021-12-01 09:00:00+09:00'),
              ),
            ),
            new ArticleEntity(
              'key2',
              'title2',
              'link2',
              admin.firestore.Timestamp.fromDate(
                new Date('2021-12-02 09:00:00+09:00'),
              ),
            ),
          ];
        });

      expect(
        await articleService.findArticles(new ArticleQuery(1)),
      ).toStrictEqual(
        new ArticleListApiResponse(
          new InfoResponse('2021-12-01T09:00:00+09:00'),
          [
            new ArticleResponse('title1', 'link1', 1638316800),
            new ArticleResponse('title2', 'link2', 1638403200),
          ],
        ),
      );
    });
  });

  describe('findArticles', () => {
    it('正常系 - レスポンス空', async () => {
      jest
        .spyOn(articleFireStoreRepository, 'getArticles')
        .mockImplementation(async (count: number) => {
          return [];
        });

      expect(
        await articleService.findArticles(new ArticleQuery(1)),
      ).toStrictEqual(
        new ArticleListApiResponse(
          new InfoResponse('2021-12-01T09:00:00+09:00'),
          [],
        ),
      );
    });
  });
});
