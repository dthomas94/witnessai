import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { BasicRequestParamsDTO } from 'src/dto/default-request-params.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { PolicyEntity } from './entities/policy.entity';
import { ApiResponse } from '@nestjs/swagger';
import { PaginatedPoliciesResponseDto } from './dto/paginated-policies-response.dto';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Paginated list of policies',
    type: PaginatedPoliciesResponseDto,
  })
  async getPolicies(@Query() query: BasicRequestParamsDTO): Promise<{
    policies: PolicyEntity[];
    total: number;
    page: number;
    limit: number;
    offset: number;
  }> {
    const res = await firstValueFrom(
      this.httpService
        .get(`${process.env.API_BASE_URL}/policies`, {
          params: { ...query },
        })
        .pipe(
          catchError((error) => {
            console.error(error);
            throw 'Error fetching policies';
          }),
        ),
    );
    return res.data;
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The policy',
    type: PolicyEntity,
  })
  async getPolicy(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<PolicyEntity> {
    const res = await firstValueFrom(
      this.httpService.get(`${process.env.API_BASE_URL}/policies/${id}`).pipe(
        catchError((error) => {
          console.error(error);
          throw 'Error fetching policy';
        }),
      ),
    );
    return res.data;
  }
}
