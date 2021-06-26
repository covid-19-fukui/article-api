import ArticleResponse from '../../src/controller/dto/article.response';
import ArticleController from '../../src/controller/article.controller';
import ArticleListApiResponse from '../../src/controller/dto/article.list.api.response';
import ArticleQuery from '../../src/controller/dto/article.query';
import InfoResponse from '../../src/controller/dto/info.response';
import { ArticleFireStoreRepository } from '../../src/repository/article.repository';
import ArticleService from '../../src/service/article.service';

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(async () => {
    const articleFireStoreRepository = new (ArticleFireStoreRepository as jest.Mock)();

    articleService = new ArticleService(articleFireStoreRepository);
    articleController = new ArticleController(articleService);
  });

  it('findArticles', async () => {
    jest
      .spyOn(articleService, 'findArticles')
      .mockImplementation(async (query: ArticleQuery) => {
        return new ArticleListApiResponse(
          new InfoResponse('2021-06-25T12:54:44+09:00'),
          [new ArticleResponse('title', 'link', 1624440300)],
        );
      });
    expect(
      await articleController.getArticles(new ArticleQuery(20)),
    ).toStrictEqual(
      new ArticleListApiResponse(
        new InfoResponse('2021-06-25T12:54:44+09:00'),
        [new ArticleResponse('title', 'link', 1624440300)],
      ),
    );
  });
});
