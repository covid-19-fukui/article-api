import Article from '../../../src/domain/model/article.domain.model';
import UnixTimeStamp from '../../../src/domain/type/unixtimestamp.domain.type';

describe('Article', () => {
  it('ファクトリメソッド', async () => {
    expect(
      Article.of('title', 'detail', new UnixTimeStamp(1638316800)),
    ).toStrictEqual(
      new Article('title', 'detail', new UnixTimeStamp(1638316800)),
    );
  });
});
