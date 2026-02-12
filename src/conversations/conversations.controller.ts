import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ConversationEntity } from './entities/conversation.entity';
import { ApiResponse } from '@nestjs/swagger';
import { GetConversationsDTO } from './dto/get-conversations.dto';
import { BasicRequestParamsDTO } from 'src/dto/default-request-params.dto';
import { PaginatedConversationsResponseDTO } from './dto/paginated-conversations.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The conversations',
    type: PaginatedConversationsResponseDTO,
  })
  async getConversations(
    @Query() query: BasicRequestParamsDTO & GetConversationsDTO,
  ): Promise<{
    conversations: ConversationEntity[];
    total: number;
    page: number;
    limit: number;
    offset: number;
  }> {
    const res = await firstValueFrom(
      this.httpService
        .get(`${process.env.API_BASE_URL}/conversations`, {
          params: { ...query },
        })
        .pipe(
          catchError((error) => {
            console.error(error);
            throw 'Error fetching conversations';
          }),
        ),
    );
    return res.data;
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The conversation',
    type: ConversationEntity,
  })
  async getConversation(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ConversationEntity> {
    const res = await firstValueFrom(
      this.httpService
        .get(`${process.env.API_BASE_URL}/conversations/${id}`)
        .pipe(
          catchError((error) => {
            console.error(error);
            throw 'Error fetching conversation';
          }),
        ),
    );

    return res.data;
  }
}
