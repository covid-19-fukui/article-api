import Article from '../../../src/domain/model/article.domain.model';

describe('Article', () => {
  it('ファクトリメソッド', async () => {
    expect(Article.of('title', 'detail', 1638316800)).toStrictEqual(
      new Article('title', 'detail', 1638316800),
    );
  });
});
