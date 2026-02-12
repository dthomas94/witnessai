import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { GetPromptsDTO } from './dto/get-prompts.dto';
import { PromptEntity } from './entities/prompt.entity';
import { BasicRequestParamsDTO } from 'src/dto/default-request-params.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PaginatedPromptsResponseDTO } from './dto/paginated-prompts.dto';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Paginated list of prompts',
    type: PaginatedPromptsResponseDTO,
  })
  async getPrompts(
    @Query() query: BasicRequestParamsDTO & GetPromptsDTO,
  ): Promise<{
    prompts: PromptEntity[];
    total: number;
    page: number;
    limit: number;
    offset: number;
  }> {
    const res = await firstValueFrom(
      this.httpService
        .get(`${process.env.API_BASE_URL}/prompts`, {
          params: { ...query },
        })
        .pipe(
          catchError((error) => {
            console.error(error);
            throw 'Error fetching prompts';
          }),
        ),
    );
    return res.data;
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The prompt',
    type: PromptEntity,
  })
  async getPrompt(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('include') include?: GetPromptsDTO['include'], // todo validate include is only llm_responses
  ): Promise<PromptEntity> {
    const res = await firstValueFrom(
      this.httpService
        .get(`${process.env.API_BASE_URL}/prompts/${id}`, {
          params: { include },
        })
        .pipe(
          catchError((error) => {
            console.error(error);
            throw 'Error fetching prompt';
          }),
        ),
    );
    return res.data;
  }
}
