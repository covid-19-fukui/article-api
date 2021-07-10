import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export default class ArticleQuery {
  @ApiProperty({
    example: 20,
    description: '取得記事数 (1~20)',
    default: 20,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Max(20)
  @IsOptional()
  @Type(() => Number)
  readonly count: number = 20;

  /**
   * コンストラクタ
   *
   * @param {number} count count
   */
  constructor(count: number) {
    if (count) {
      this.count = count;
    }
  }
}
