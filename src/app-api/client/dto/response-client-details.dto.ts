import { ApiProperty } from '@nestjs/swagger'

export class ResponseClientDetailsDto {
  @ApiProperty()
  public id: number

  @ApiProperty()
  public companyName: string

  @ApiProperty()
  public clientType: string

  @ApiProperty()
  public city: string

  @ApiProperty()
  public contactMethod: string

  @ApiProperty()
  public notes: string
}
