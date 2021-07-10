import { Injectable } from '@nestjs/common';
import { ArticleFireStoreRepositoryImpl } from '../../infrastructure/db/repositoryimpl/article.repositoryimpl';
import Article from '../../domain/model/article.domain.model';
import Count from '../../domain/model/count.domain.model';

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
    private readonly articleFireStoreRepository: ArticleFireStoreRepositoryImpl,
  ) {}

  /**
   * 記事の一覧取得
   *
   * @param {Count} count クエリパラメータ
   * @returns {Promise<ArticleListApiResponse>} 記事
   */
  async findArticles(count: Count): Promise<Article[]> {
    return await this.articleFireStoreRepository.getArticles(count);
  }
}
