import { ApiProperty } from '@nestjs/swagger';
import { IsIdsFilter } from 'src/common/is-ids-filter';

export class BulkDeleteDto {
  @IsIdsFilter()
  //@ApiProperty là một decorator trong NestJS, được sử dụng để mô tả các thuộc tính của đối tượng trong các DTO 
  ids: number[];
}
