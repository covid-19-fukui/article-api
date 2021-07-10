import FireStoreConfig from '../../../src/config/firestore.config';
import { ArticleFireStoreRepositoryImpl } from '../../../src/infrastructure/db/repositoryimpl/article.repositoryimpl';
import ArticleService from '../../../src/application/service/article.service';
import Article from '../../../src/domain/model/article.domain.model';
import Count from '../../../src/domain/model/count.domain.model';

describe('ArticleService', () => {
  let articleService: ArticleService;
  let articleFireStoreRepository: ArticleFireStoreRepositoryImpl;

  beforeEach(async () => {
    const fireStoreConfig = new (FireStoreConfig as jest.Mock)();

    articleFireStoreRepository = new ArticleFireStoreRepositoryImpl(
      fireStoreConfig,
    );
    articleService = new ArticleService(articleFireStoreRepository);
  });

  describe('findArticles', () => {
    it('正常系 - レスポンスあり', async () => {
      jest
        .spyOn(articleFireStoreRepository, 'getArticles')
        .mockImplementation(async (count: Count) => {
          return [
            new Article('title1', 'link1', 1638316800),
            new Article('title2', 'link2', 1638403200),
          ];
        });

      expect(await articleService.findArticles(new Count(2))).toStrictEqual([
        new Article('title1', 'link1', 1638316800),
        new Article('title2', 'link2', 1638403200),
      ]);
    });
  });

  describe('findArticles', () => {
    it('正常系 - レスポンス空', async () => {
      jest
        .spyOn(articleFireStoreRepository, 'getArticles')
        .mockImplementation(async (count: Count) => {
          return [];
        });

      expect(await articleService.findArticles(new Count(1))).toStrictEqual([]);
    });
  });
});
