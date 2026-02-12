import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsersFilterDTO } from './dto/users-filter.dto';
import { BasicRequestParamsDTO } from 'src/dto/default-request-params.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { ApiResponse } from '@nestjs/swagger';
import { PaginatedUsersResponseDTO } from './dto/paginated-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly httpService: HttpService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Paginated list of users',
    type: PaginatedUsersResponseDTO,
  })
  async getUsers(
    @Query() query: BasicRequestParamsDTO & UsersFilterDTO,
  ): Promise<{
    users: UserEntity[];
    total: number;
    page: number;
    limit: number;
    offset: number;
  }> {
    const res = await firstValueFrom(
      this.httpService
        .get(`${process.env.API_BASE_URL}/users`, {
          params: { ...query },
        })
        .pipe(
          catchError((error) => {
            console.error(error);
            throw 'Error fetching users';
          }),
        ),
    );
    return res.data;
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The user',
    type: UserEntity,
  })
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    const res = await firstValueFrom(
      this.httpService.get(`${process.env.API_BASE_URL}/users/${id}`).pipe(
        catchError((error) => {
          console.error(error);
          throw 'Error fetching user';
        }),
      ),
    );
    return res.data;
  }
}
