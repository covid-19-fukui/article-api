import { Injectable } from '@nestjs/common';
import FireStoreConfig from '../../../config/firestore.config';
import ArticleEntity from '../dto/article.entity';
import * as admin from 'firebase-admin';
import Article from '../../../domain/model/article.domain.model';
import ArticleFireStoreRepository from '../../../domain/repository/aritcle.repository';
import Count from '../../../domain/model/count.domain.model';

/**
 * ユーザを取得するサービス層
 */
@Injectable()
export class ArticleFireStoreRepositoryImpl
  implements ArticleFireStoreRepository {
  /**
   * ユーザクラスへの変換
   */
  private readonly ARTICLE_CONVERTER = {
    /**
     * Firestoreのデータ形式への変換
     *
     * @param {ArticleEntity} articleEntity
     * @return {admin.firestore.DocumentData} ドキュメントデータ
     */
    toFirestore(articleEntity: ArticleEntity): admin.firestore.DocumentData {
      return {
        id: articleEntity.id,
        title: articleEntity.title,
        link: articleEntity.link,
        datetime: articleEntity.datetime,
      };
    },
    /**
     * Firestoreのデータ形式からレスポンスクラスへの変換
     *
     * @param {admin.firestore.QueryDocumentSnapshot} snapshot
     * @return {ArticleEntity} 記事レスポンスクラス
     */
    fromFirestore(
      snapshot: admin.firestore.QueryDocumentSnapshot,
    ): ArticleEntity {
      const data = snapshot.data();
      return ArticleEntity.of(
        data.id,
        data['title'],
        data['link'],
        data['datetime'],
      );
    },
  };

  /**
   * コンストラクタ
   *
   * @param {FireStoreConfig} fireStoreConfig FireStoreの設定
   */
  constructor(private readonly fireStoreConfig: FireStoreConfig) {}

  /**
   * 記事の一覧取得
   *
   * @param {Count} count 取得件数
   * @returns {Promise<ArticleEntity[]>} firestoreのレスポンス
   */
  async getArticles(count: Count): Promise<Article[]> {
    return (
      await this.fireStoreConfig
        .getArticle()
        .withConverter(this.ARTICLE_CONVERTER)
        .orderBy('datetime', 'desc')
        .limit(count.value)
        .get()
    ).docs
      .map((doc) => doc.data())
      .map((entity) => entity.convertToArticle());
  }
}
