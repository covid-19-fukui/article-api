import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './http.exception.filter';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import ArticleListApiResponse from './dto/article.list.api.response';
import ArticleService from '../service/article.service';
import ArticleQuery from './dto/article.query';

/**
 * コントローラ
 */
@Controller('api/v1/article')
@ApiTags('api/v1/article')
@UseFilters(HttpExceptionFilter)
export class ArticleController {
  /**
   * コンストラクタ
   *
   * @param {ArticleService} vaccineService サービス
   */
  constructor(private readonly vaccineService: ArticleService) {}

  /**
   * 記事の検索
   *
   * @param {ArticleQuery} query パラメータ
   * @returns {Promise<ArticleListApiResponse>} 記事のレスポンス
   */
  @Get('search')
  @ApiOkResponse({
    status: 200,
    description: '記事の取得が成功した場合、レスポンスとして返す',
    type: ArticleListApiResponse,
  })
  async getVaccines(
    @Query() query: ArticleQuery,
  ): Promise<ArticleListApiResponse> {
    return this.vaccineService.findVaccines(query);
  }
}
