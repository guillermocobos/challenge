import { Type } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetSiteDto {
    @IsString()
    @IsNotEmpty({message: "Parameter site is required"})
    @Type(() => String)
    site: string;

  }