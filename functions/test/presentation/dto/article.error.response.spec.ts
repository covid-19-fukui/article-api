import ArticleErrorResponse from '../../../src/presentation/dto/article.error.response';

describe('ArticleErrorResponse', () => {
  let articleErrorResponse: ArticleErrorResponse;
  beforeEach(async () => {
    articleErrorResponse = new ArticleErrorResponse('title', 'detail');
  });

  it('内部パラメータ確認', async () => {
    expect(articleErrorResponse.title).toBe('title');
    expect(articleErrorResponse.detail).toBe('detail');
  });
});
