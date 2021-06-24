import * as admin from 'firebase-admin';

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
}
