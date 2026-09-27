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
import { BarcoService } from './barco.service.js';
import { BarcoDto } from './dto/barco.dto.js';
import { PaginationDto } from './dto/pagination.dto.js';

@Controller('api/v1/barcos')
export class BarcoController {
    constructor(private readonly barcoService: BarcoService) {}

    @Get('')
    loadInfo() {
        return {
            endpoints: {
                GetAll: {
                    function: 'GET',
                    endpoint:
                        'https://api-barco-gamma-three.vercel.app/api/v1/barcos/get/all',
                },
                GetAllPaginated: {
                    function: 'GET',
                    endpoint:
                        'https://api-barco-gamma-three.vercel.app/api/v1/barcos/get/all-paginated?page=1&limit=10',
                },
                GetOne: {
                    function: 'GET',
                    endpoint:
                        'https://api-barco-gamma-three.vercel.app/api/v1/barcos/get/one-barco/id',
                },
                GetByTitle: {
                    function: 'GET',
                    endpoint:
                        'https://api-barco-gamma-three.vercel.app/api/v1/barcos/get/search?title=barcoTitle&page=1&limit=10',
                },
                Add: {
                    function: 'POST',
                    endpoint:
                        'https://api-barco-gamma-three.vercel.app/api/v1/barcos/add',
                },
                UpdatePut: {
                    function: 'PUT',
                    endpoint:
                        'https://api-barco-gamma-three.vercel.app/api/v1/barcos/update/put/id',
                },
                UpdatePatch: {
                    function: 'PATCH',
                    endpoint:
                        'https://api-barco-gamma-three.vercel.app/api/v1/barcos/update/patch/id',
                },
                Delete: {
                    function: 'DELETE',
                    endpoint:
                        'https://api-barco-gamma-three.vercel.app/api/v1/barcos/delete/id',
                },
                GetGenres: {
                    function: 'GET',
                    endpoint:
                        'https://api-barco-gamma-three.vercel.app/api/v1/barcos/get/genres',
                },
            },
        };
    }

    @Post('add')
    async addBarco(@Body() barcoDto: BarcoDto) {
        try {
            await this.barcoService.addBarco(barcoDto);
            return {
                ok: true,
                message: 'Barco Successfully created',
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
    async getBarcos() {
        try {
            const data = await this.barcoService.getBarcos();
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
    async getBarcosPaginated(@Query() paginationDto: PaginationDto) {
        try {
            const { page, limit } = paginationDto;
            const data = await this.barcoService.getBarcosPaginated(page, limit);
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

    @Get('get/one-barco/:id')
    async getBarco(@Param('id') id: string) {
        try {
            const data = await this.barcoService.getBarco(id);
            if (data) {
                return {
                    ok: true,
                    data,
                };
            }
            throw new NotFoundException({
                ok: false,
                message: 'Barco not found',
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


    // URLParams = http://www.pepito.com/barcos/valor/valor
    // URLQuery = http://www.pepito.com/barcos?variable=valor&variable2=valor
    @Get('get/search')
    async getBarcoByName(
        @Query('title') title: string,
        @Query() paginationDto: PaginationDto,
    ) {
        try {
            return await this.barcoService.getBarcosByTitle(
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
    async updateBarco(@Param('id') id: string, @Body() barcoDto: BarcoDto) {
        try {
            const updatedBarco = await this.barcoService.updateBarco(id, barcoDto);
            if (!updatedBarco) {
                throw new NotFoundException({
                    ok: false,
                    message: 'Barco not found',
                });
            }
            return {
                ok: true,
                message: 'Barco updated',
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
    async updatePatchBarco(
        @Param('id') id: string,
        @Body() barcoDto: Partial<BarcoDto>,
    ) {
        try {
            const updatedBarco = await this.barcoService.updatePatchBarco(
                id,
                barcoDto,
            );
            if (!updatedBarco) {
                throw new NotFoundException({
                    ok: false,
                    message: 'Barco not found',
                });
            }
            return {
                ok: true,
                message: 'Barco updated',
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
    async deleteBarco(@Param('id') id: string) {
        try {
            const deletedBarco = await this.barcoService.deleteBarco(id);
            if (!deletedBarco) {
                throw new NotFoundException({
                    ok: false,
                    message: 'Barco not found',
                });
            }
            return {
                ok: true,
                message: 'Barco deleted',
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
