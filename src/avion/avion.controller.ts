import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { AvionService } from './avion.service.js';
import { AvionDto } from './dto/avion.dto.js';
import { PaginationDto } from './dto/pagination.dto.js';

@Controller('api/v1/aviones')
export class AvionController {
    constructor(private readonly avionService: AvionService) {}

    @Get('')
    loadInfo() {
        return {
            endpoints: {
                GetAll: {
                    function: 'GET',
                    endpoint:
                        'https://api-avion-gamma-three.vercel.app/api/v1/aviones/get/all',
                },
                GetAllPaginated: {
                    function: 'GET',
                    endpoint:
                        'https://api-avion-gamma-three.vercel.app/api/v1/aviones/get/all-paginated?page=1&limit=10',
                },
                GetOne: {
                    function: 'GET',
                    endpoint:
                        'https://api-avion-gamma-three.vercel.app/api/v1/aviones/get/one-avion/id',
                },
                GetByTitle: {
                    function: 'GET',
                    endpoint:
                        'https://api-avion-gamma-three.vercel.app/api/v1/aviones/get/search?title=avionTitle&page=1&limit=10',
                },
                Add: {
                    function: 'POST',
                    endpoint:
                        'https://api-avion-gamma-three.vercel.app/api/v1/aviones/add',
                },
                UpdatePut: {
                    function: 'PUT',
                    endpoint:
                        'https://api-avion-gamma-three.vercel.app/api/v1/aviones/update/put/id',
                },
                UpdatePatch: {
                    function: 'PATCH',
                    endpoint:
                        'https://api-avion-gamma-three.vercel.app/api/v1/aviones/update/patch/id',
                },
                Delete: {
                    function: 'DELETE',
                    endpoint:
                        'https://api-avion-gamma-three.vercel.app/api/v1/aviones/delete/id',
                },
                GetGenres: {
                    function: 'GET',
                    endpoint:
                        'https://api-avion-gamma-three.vercel.app/api/v1/aviones/get/genres',
                },
            },
        };
    }

    @Post('add')
    async addAvion(@Body() avionDto: AvionDto) {
        try {
            await this.avionService.addAvion(avionDto);
            return {
                ok: true,
                message: 'Avion Successfully created',
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw new BadRequestException({
                    ok: false,
                    message: e.message,
                });
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message,
            });
        }
    }

    @Get('get/all')
    async getAvions() {
        try {
            const data = await this.avionService.getAvions();
            return {
                ok: true,
                data,
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw new BadRequestException({
                    ok: false,
                    message: e.message,
                });
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message,
            });
        }
    }

    @Get('get/all-paginated')
    async getAvionsPaginated(@Query() paginationDto: PaginationDto) {
        try {
            const { page, limit } = paginationDto;
            const data = await this.avionService.getAvionsPaginated(page, limit);
            return {
                ok: true,
                ...data,
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw new BadRequestException({
                    ok: false,
                    message: e.message,
                });
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message,
            });
        }
    }

    @Get('get/one-avion/:id')
    async getAvion(@Param('id') id: string) {
        try {
            const data = await this.avionService.getAvion(id);
            if (data) {
                return {
                    ok: true,
                    data,
                };
            }
            throw new NotFoundException({
                ok: false,
                message: 'Avion not found',
            });
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException({
                    ok: false,
                    message: e.message,
                });
            }
            if (e instanceof BadRequestException) {
                throw new BadRequestException({
                    ok: false,
                    message: e.message,
                });
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message,
            });
        }
    }

    // URLParams = http://www.pepito.com/avions/valor/valor
    // URLQuery = http://www.pepito.com/avions?variable=valor&variable2=valor
    @Get('get/search')
    async getAvionByName(
        @Query('title') title: string,
        @Query() paginationDto: PaginationDto,
    ) {
        try {
            return await this.avionService.getAvionsByTitle(
                title,
                paginationDto.page,
                paginationDto.limit,
            );
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw new BadRequestException({
                    ok: false,
                    message: e.message,
                });
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message,
            });
        }
    }

    @Put('update/put/:id')
    async updateAvion(@Param('id') id: string, @Body() avionDto: AvionDto) {
        try {
            const updatedAvion = await this.avionService.updateAvion(id, avionDto);
            if (!updatedAvion) {
                throw new NotFoundException({
                    ok: false,
                    message: 'Avion not found',
                });
            }
            return {
                ok: true,
                message: 'Avion updated',
            };
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException({
                    ok: false,
                    message: e.message,
                });
            }
            if (e instanceof BadRequestException) {
                throw new BadRequestException({
                    ok: false,
                    message: e.message,
                });
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message,
            });
        }
    }

    @Patch('update/patch/:id')
    async updatePatchAvion(
        @Param('id') id: string,
        @Body() avionDto: Partial<AvionDto>,
    ) {
        try {
            const updatedAvion = await this.avionService.updatePatchAvion(
                id,
                avionDto,
            );
            if (!updatedAvion) {
                throw new NotFoundException({
                    ok: false,
                    message: 'Avion not found',
                });
            }
            return {
                ok: true,
                message: 'Avion updated',
            };
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException({
                    ok: false,
                    message: e.message,
                });
            }
            if (e instanceof BadRequestException) {
                throw new BadRequestException({
                    ok: false,
                    message: e.message,
                });
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message,
            });
        }
    }

    @Delete('/delete/:id')
    async deleteAvion(@Param('id') id: string) {
        try {
            const deletedAvion = await this.avionService.deleteAvion(id);
            if (!deletedAvion) {
                throw new NotFoundException({
                    ok: false,
                    message: 'Avion not found',
                });
            }
            return {
                ok: true,
                message: 'Avion deleted',
            };
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException({
                    ok: false,
                    message: e.message,
                });
            }
            if (e instanceof BadRequestException) {
                throw new BadRequestException({
                    ok: false,
                    message: e.message,
                });
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message,
            });
        }
    }
}
