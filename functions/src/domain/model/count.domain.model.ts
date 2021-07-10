import { BadRequestException } from '@nestjs/common';

export default class Count {
  /**
   * コンストラクタ
   *
   * @param {number} value 値
   */
  constructor(readonly value: number) {}

  /**
   * ファクトリメソッド
   *
   * @param {number} value 値
   * @return {Count} 型クラス
   */
  static of(value: number): Count {
    if (value >= 0) {
      return new Count(value);
    } else {
      throw new BadRequestException('数値が負数です。');
    }
  }
}
