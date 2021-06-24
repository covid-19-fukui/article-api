import { Injectable } from '@nestjs/common';
import FireStoreConfig from '../config/firestore.config';
import ArticleEntity from './dto/article.entity';
import * as admin from 'firebase-admin';

/**
 * ユーザを取得するサービス層
 */
@Injectable()
export class ArticleFireStoreRepository {
  /**
   * ユーザクラスへの変換
   */
  private readonly ARTICLE_CONVERTER = {
    toFirestore(articleEntity: ArticleEntity): admin.firestore.DocumentData {
      return {
        id: articleEntity.id,
        title: articleEntity.title,
        link: articleEntity.link,
        datetime: articleEntity.datetime,
      };
    },
    fromFirestore(
      snapshot: admin.firestore.QueryDocumentSnapshot,
    ): ArticleEntity {
      const data = snapshot.data();
      return new ArticleEntity(
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
   * @param {number} count 取得件数
   * @returns {Promise<ArticleEntity[]>} firestoreのレスポンス
   */
  async getArticles(count: number): Promise<ArticleEntity[]> {
    return (
      await this.fireStoreConfig
        .getArticle()
        .withConverter(this.ARTICLE_CONVERTER)
        .orderBy('datetime', 'desc')
        .limit(count)
        .get()
    ).docs.map((doc) => doc.data());
  }
}
