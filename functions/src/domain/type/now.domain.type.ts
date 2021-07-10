import * as moment from 'moment-timezone';

export default class Now {
  private static readonly TIMEZONE = 'Asia/Tokyo';
  /**
   * コンストラクタ
   *
   * @param {string} value
   */
  private constructor(readonly value: string) {}

  /**
   * ファクトリメソッド
   *
   * @return {Now} Nowドメイン
   */
  static new(): Now {
    return new Now(moment().tz(this.TIMEZONE).format());
  }
}
