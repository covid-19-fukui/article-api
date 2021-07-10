import ArticleEntity from '../../../../src/infrastructure/db/dto/article.entity';
import * as admin from 'firebase-admin';
import Article from '../../../../src/domain/model/article.domain.model';

describe('ArticleEntity', () => {
  it('ファクトリメソッド', async () => {
    expect(
      ArticleEntity.of(
        'key',
        'title',
        'detail',
        admin.firestore.Timestamp.fromDate(
          new Date('2021-12-01 09:00:00+09:00'),
        ),
      ),
    ).toStrictEqual(
      new ArticleEntity(
        'key',
        'title',
        'detail',
        admin.firestore.Timestamp.fromDate(
          new Date('2021-12-01 09:00:00+09:00'),
        ),
      ),
    );
  });
  it('convertToArticle', async () => {
    const sut = new ArticleEntity(
      'key',
      'title',
      'detail',
      admin.firestore.Timestamp.fromDate(new Date('2021-12-01 09:00:00+09:00')),
    );
    expect(sut.convertToArticle()).toStrictEqual(
      new Article('title', 'detail', 1638316800),
    );
  });
});
