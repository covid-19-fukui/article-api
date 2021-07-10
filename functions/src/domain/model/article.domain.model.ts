import UnixTimeStamp from '../type/unixtimestamp.domain.type';

export default class Article {
  /**
   * コンストラクタ
   *
   * @param {string} title
   * @param {string} link
   * @param {number} publishedAt
   */
  constructor(
    readonly title: string,
    readonly link: string,
    readonly publishedAt: UnixTimeStamp,
  ) {}

  /**
   * ファクトリメソッド
   *
   * @param {string} title
   * @param {string} link
   * @param {UnixTimeStamp} publishedAt
   * @return {Article} 記事
   */
  static of(title: string, link: string, publishedAt: UnixTimeStamp): Article {
    return new Article(title, link, publishedAt);
  }
}
