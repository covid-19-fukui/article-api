import { ApiProperty } from '@nestjs/swagger';
import Article from '../../domain/model/article.domain.model';

export default class ArticleResponse {
  @ApiProperty({
    example: '神奈川県で2人死亡、201人コロナ感染　6月23日発表',
    description: '記事タイトル',
  })
  readonly title: string;

  @ApiProperty({
    example: 'https://www.fukuishimbun.co.jp/articles/-/1343487',
    description: '記事へのリンク',
  })
  readonly link: string;

  @ApiProperty({ example: 1624440300, description: '記事の掲載日時' })
  readonly publishedAt: number;

  /**
   * コンストラクタ
   *
   * @param {string} title
   * @param {string} link
   * @param {number} publishedAt
   */
  constructor(title: string, link: string, publishedAt: number) {
    this.title = title;
    this.link = link;
    this.publishedAt = publishedAt;
  }

  /**
   * ファクトリメソッド
   *
   * @param article
   * @return 記事情報のAPIレスポンス ArticleResponse
   */
  static of(article: Article): ArticleResponse {
    return new ArticleResponse(
      article.title,
      article.link,
      article.publishedAt.value,
    );
  }
}
