import { ApiProperty } from '@nestjs/swagger';
import InfoResponse from './info.response';
import ArticleResponse from './article.response';

/**
 * ユーザ取得APIのレスポンス
 */
export default class ArticleListApiResponse {
  @ApiProperty({ description: 'リクエスト情報' })
  readonly info: InfoResponse;

  @ApiProperty({ type: [ArticleResponse], description: '記事' })
  readonly articles: ArticleResponse[];

  /**
   * コンストラクタ
   *
   * @param {InfoResponse} info リクエスト情報
   * @param {ArticleResponse[]} vaccination 記事
   */
  constructor(info: InfoResponse, vaccination: ArticleResponse[]) {
    this.info = info;
    this.articles = vaccination;
  }
}
