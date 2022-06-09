import { Transform } from "class-transformer";

import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class GetIdsDto {

    @IsString()
    @IsNotEmpty({message: "Parameter site is required"})
    site: string;


    @IsNotEmpty()
    @Transform((item): string [] => {
    if (typeof item.value ===  'string') {
        return (item.obj.ids = item.value.split(","));
    }
      return item.obj.ids;
    })
    ids: string[];
  }