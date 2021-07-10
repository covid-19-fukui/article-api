import ArticleResponse from '../../../src/presentation/dto/article.response';
import ArticleController from '../../../src/presentation/controller/article.controller';
import ArticleListApiResponse from '../../../src/presentation/dto/article.list.api.response';
import ArticleQuery from '../../../src/presentation/dto/article.query';
import InfoResponse from '../../../src/presentation/dto/info.response';
import { ArticleFireStoreRepositoryImpl } from '../../../src/infrastructure/db/repositoryimpl/article.repositoryimpl';
import ArticleService from '../../../src/application/service/article.service';
import Count from '../../../src/domain/model/count.domain.model';
import Article from '../../../src/domain/model/article.domain.model';
import MockDate from 'mockdate';
import UnixTimeStamp from '../../../src/domain/type/unixtimestamp.domain.type';

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(async () => {
    const articleFireStoreRepository = new (ArticleFireStoreRepositoryImpl as jest.Mock)();

    articleService = new ArticleService(articleFireStoreRepository);
    articleController = new ArticleController(articleService);
    MockDate.set('2021-12-01 09:00:00+09:00');
  });

  it('findArticles', async () => {
    jest
      .spyOn(articleService, 'findArticles')
      .mockImplementation(async (count: Count) => {
        return [new Article('title', 'link', new UnixTimeStamp(1624440300))];
      });
    expect(
      await articleController.getArticles(new ArticleQuery(20)),
    ).toStrictEqual(
      new ArticleListApiResponse(
        new InfoResponse('2021-12-01T09:00:00+09:00'),
        [new ArticleResponse('title', 'link', 1624440300)],
      ),
    );
  });
});
