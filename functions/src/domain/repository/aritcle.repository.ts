import Article from '../model/article.domain.model';
import Count from '../model/count.domain.model';

export default interface ArticleFireStoreRepository {
  /**
   * 記事を取得する
   *
   * @param {number} count 取得する件数
   * @return {Promise<Article[]>} 記事リストのPromise
   */
  getArticles(count: Count): Promise<Article[]>;
}
