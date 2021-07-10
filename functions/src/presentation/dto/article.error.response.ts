import { ApiProperty } from '@nestjs/swagger';

export default class ArticleErrorResponse {
  @ApiProperty({ description: 'エラーのタイトル', example: 'エラーのタイトル' })
  readonly title: string;

  @ApiProperty({ description: 'エラー詳細', example: 'エラー詳細' })
  readonly detail: string;

  /**
   * コンストラクタ
   *
   * @param {title} title
   * @param {detail} detail
   */
  constructor(title: string, detail: string) {
    this.title = title;
    this.detail = detail;
  }
}
