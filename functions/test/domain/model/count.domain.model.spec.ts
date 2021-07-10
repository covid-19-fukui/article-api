import Count from '../../../src/domain/model/count.domain.model';
import { BadRequestException } from '@nestjs/common';

describe('Count', () => {
  it('ファクトリメソッド', async () => {
    expect(Count.of(1)).toStrictEqual(new Count(1));
  });

  it('ファクトリメソッド - 例外', async () => {
    expect(() => Count.of(-1)).toThrowError(
      new BadRequestException('数値が負数です。'),
    );
  });
});
