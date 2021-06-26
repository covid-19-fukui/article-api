import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import ArticleController from './controller/article.controller';
import { HttpExceptionFilter } from './controller/http.exception.filter';
import { ArticleFireStoreRepository } from './repository/article.repository';
import FireStoreConfig from './config/firestore.config';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import FirestoreCollectionConfig from './config/firestore.collection.config';
import ArticleService from './service/article.service';

admin.initializeApp();
const firestore = admin.firestore();
const firestoreCollectionConfig: FirestoreCollectionConfig = functions.config()
  .firestore.collections;

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [
    { provide: 'FIRESTORE', useValue: firestore },
    ArticleService,
    ArticleFireStoreRepository,
    FireStoreConfig,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    {
      provide: 'FIRESTORE_COLLECTIONS_CONFIG',
      useValue: firestoreCollectionConfig,
    },
  ],
})
export class ArticleModule {}
