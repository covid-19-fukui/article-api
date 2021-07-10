import * as admin from 'firebase-admin';
import Article from '../../../domain/model/article.domain.model';
import UnixTimeStamp from '../../../domain/type/unixtimestamp.domain.type';

export default class ArticleEntity {
  /**
   * コンストラクタ
   *
   * @param {string} id
   * @param {string} title
   * @param {string} link
   * @param {admin.firestore.Timestamp} datetime
   */
  constructor(
    readonly id: string,
    readonly title: string,
    readonly link: string,
    readonly datetime: admin.firestore.Timestamp,
  ) {}

  static of(
    id: string,
    title: string,
    link: string,
    datetime: admin.firestore.Timestamp,
  ): ArticleEntity {
    return new ArticleEntity(id, title, link, datetime);
  }

  convertToArticle(): Article {
    return Article.of(this.title, this.link, UnixTimeStamp.from(this.datetime));
  }
}
