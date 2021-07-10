import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import FirestoreCollectionConfig from './firestore.collection.config';

/**
 * FireStoreの設定
 */
@Injectable()
export default class FireStoreConfig {
  /**
   * コンストラクタ
   * @param {admin.firestore.Firestore} firestore
   * @param {FirestoreCollectionConfig} firestoreCollectionsConfig
   */
  constructor(
    @Inject('FIRESTORE')
    private readonly firestore: admin.firestore.Firestore,
    @Inject('FIRESTORE_COLLECTIONS_CONFIG')
    private readonly firestoreCollectionsConfig: FirestoreCollectionConfig,
  ) {}

  /**
   * FireStoreの取得
   *
   * @return {admin.firestore.CollectionReference<admin.firestore.DocumentData>} コレクション
   */
  getArticle(): admin.firestore.CollectionReference<admin.firestore.DocumentData> {
    const collectionName = this.firestoreCollectionsConfig.article;
    return this.firestore.collection(collectionName);
  }
}
