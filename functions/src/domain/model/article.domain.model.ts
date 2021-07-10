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
    readonly publishedAt: number,
  ) {}

  /**
   * ファクトリメソッド
   *
   * @param title {string}
   * @param link {string}
   * @param publishedAt {number}
   * @return 記事 {Article}
   */
  static of(title: string, link: string, publishedAt: number): Article {
    return new Article(title, link, publishedAt);
  }
}
