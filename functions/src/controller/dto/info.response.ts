import { ApiProperty } from '@nestjs/swagger';

/**
 * info情報
 */
export default class InfoResponse {
  @ApiProperty({
    example: '2021-06-11T21:18:36+09:00',
    description: 'リクエスト日時',
  })
  readonly datetime: string;

  /**
   * コンストラクタ
   *
   * @param {string} datetime
   */
  constructor(datetime: string) {
    this.datetime = datetime;
  }
}
