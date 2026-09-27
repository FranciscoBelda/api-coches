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
import { CocheService } from './coche.service.js';
import { CocheDto } from './dto/coche.dto.js';
import { PaginationDto } from './dto/pagination.dto.js';

@Controller('api/v1/coches')
export class CocheController {
    constructor(private readonly cocheService: CocheService) {}

    @Get('')
    loadInfo() {
        return {
            endpoints: {
                GetAll: {
                    function: 'GET',
                    endpoint:
                        'https://api-vehiculos.vercel.app/api/v1/coches/get/all',
                },
                GetAllPaginated: {
                    function: 'GET',
                    endpoint:
                        'https://api-vehiculos.vercel.app/api/v1/coches/get/all-paginated?page=1&limit=10',
                },
                GetOne: {
                    function: 'GET',
                    endpoint:
                        'https://api-vehiculos.vercel.app/api/v1/coches/get/one-coche/id',
                },
                GetByTitle: {
                    function: 'GET',
                    endpoint:
                        'https://api-vehiculos.vercel.app/api/v1/coches/get/search?title=cocheTitle&page=1&limit=10',
                },
                Add: {
                    function: 'POST',
                    endpoint:
                        'https://api-vehiculos.vercel.app/api/v1/coches/add',
                },
                UpdatePut: {
                    function: 'PUT',
                    endpoint:
                        'https://api-vehiculos.vercel.app/api/v1/coches/update/put/id',
                },
                UpdatePatch: {
                    function: 'PATCH',
                    endpoint:
                        'https://api-vehiculos.vercel.app/api/v1/coches/update/patch/id',
                },
                Delete: {
                    function: 'DELETE',
                    endpoint:
                        'https://api-vehiculos.vercel.app/api/v1/coches/delete/id',
                },
                GetGenres: {
                    function: 'GET',
                    endpoint:
                        'https://api-vehiculos.vercel.app/api/v1/coches/get/genres',
                },
            },
        };
    }

    @Post('add')
    async addCoche(@Body() cocheDto: CocheDto) {
        try {
            await this.cocheService.addCoche(cocheDto);
            return {
                ok: true,
                message: 'Coche Successfully created',
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
    async getCoches() {
        try {
            const data = await this.cocheService.getCoches();
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
    async getCochesPaginated(@Query() paginationDto: PaginationDto) {
        try {
            const { page, limit } = paginationDto;
            const data = await this.cocheService.getCochesPaginated(page, limit);
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

    @Get('get/one-coche/:id')
    async getCoche(@Param('id') id: string) {
        try {
            const data = await this.cocheService.getCoche(id);
            if (data) {
                return {
                    ok: true,
                    data,
                };
            }
            throw new NotFoundException({
                ok: false,
                message: 'Coche not found',
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

    // URLParams = http://www.pepito.com/coches/valor/valor
    // URLQuery = http://www.pepito.com/coches?variable=valor&variable2=valor
    @Get('get/search')
    async getCocheByName(
        @Query('title') title: string,
        @Query() paginationDto: PaginationDto,
    ) {
        try {
            return await this.cocheService.getCochesByTitle(
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
    async updateCoche(@Param('id') id: string, @Body() cocheDto: CocheDto) {
        try {
            const updatedCoche = await this.cocheService.updateCoche(id, cocheDto);
            if (!updatedCoche) {
                throw new NotFoundException({
                    ok: false,
                    message: 'Coche not found',
                });
            }
            return {
                ok: true,
                message: 'Coche updated',
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
    async updatePatchCoche(
        @Param('id') id: string,
        @Body() cocheDto: Partial<CocheDto>,
    ) {
        try {
            const updatedCoche = await this.cocheService.updatePatchCoche(
                id,
                cocheDto,
            );
            if (!updatedCoche) {
                throw new NotFoundException({
                    ok: false,
                    message: 'Coche not found',
                });
            }
            return {
                ok: true,
                message: 'Coche updated',
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
    async deleteCoche(@Param('id') id: string) {
        try {
            const deletedCoche = await this.cocheService.deleteCoche(id);
            if (!deletedCoche) {
                throw new NotFoundException({
                    ok: false,
                    message: 'Coche not found',
                });
            }
            return {
                ok: true,
                message: 'Coche deleted',
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
