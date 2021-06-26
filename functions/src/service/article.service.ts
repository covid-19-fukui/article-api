import { Injectable } from '@nestjs/common';
import InfoResponse from '../controller/dto/info.response';
import ArticleResponse from '../controller/dto/article.response';
import ArticleEntity from '../repository/dto/article.entity';
import ArticleListApiResponse from '../controller/dto/article.list.api.response';
import { ArticleFireStoreRepository } from '../repository/article.repository';
import * as moment from 'moment-timezone';
import ArticleQuery from '../controller/dto/article.query';

/**
 * 記事情報を取得するサービス層
 */
@Injectable()
export default class ArticleService {
  /**
   * コンストラクタ
   *
   * @param {ArticleFireStoreRepository} articleFireStoreRepository 記事を取得するfirestoreのリポジトリ
   */
  constructor(
    private readonly articleFireStoreRepository: ArticleFireStoreRepository,
  ) {}

  /**
   * 記事の一覧取得
   *
   * @param {ArticleQuery} articleQuery クエリパラメータ
   * @returns {Promise<ArticleListApiResponse>} 記事
   */
  async findArticles(
    articleQuery: ArticleQuery,
  ): Promise<ArticleListApiResponse> {
    const now = moment().tz('Asia/Tokyo').format();

    const articleEntity: ArticleEntity[] = await this.articleFireStoreRepository.getArticles(
      articleQuery.count,
    );

    const vaccineResponse: ArticleResponse[] = articleEntity.map(
      (entity) =>
        new ArticleResponse(
          entity.title,
          entity.link,
          entity.datetime.toDate().getTime() / 1000,
        ),
    );

    return new ArticleListApiResponse(new InfoResponse(now), vaccineResponse);
  }
}
