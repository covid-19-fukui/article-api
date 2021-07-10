import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import ArticleErrorResponse from '../dto/article.error.response';

/**
 * エラーハンドリング
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 例外を全て受け付けるハンドラー
   *
   * @param {HttpException} exception 例外
   * @param {ArgumentsHost} host host
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    response
      .header('Content-Type', 'application/problem+json')
      .status(status)
      .json({
        title: HttpExceptionFilter.getTitle(status),
        detail: exception.message,
      } as ArticleErrorResponse);
  }

  /**
   * エラーレスポンスのタイトルを取得する
   *
   * @param {number} status ステータス
   * @returns {string} タイトル
   */
  private static getTitle(status: number): string {
    switch (status) {
      case 404:
        return 'Not Found';
      case 400:
        return 'Bad Request';
      default:
        return 'UndefinedError';
    }
  }
}
