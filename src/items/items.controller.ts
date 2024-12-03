import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService : ItemsService){}
    
    @Get()
    findAll(): Item[] {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Item {
        return this.itemsService.findOne(Number(id));
    }

    @Post()
    create(@Body() createItemDto: Omit<Item, 'id'>): Item {
        return this.itemsService.create(createItemDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateItem: Partial<Item>): Item {
        return this.itemsService.update(Number(id), updateItem);
    }

    @Delete(':id')
    delete(@Param('id') id: string):Item[] {
        this.itemsService.delete(Number(id));
        return this.itemsService.findAll();
    }
}
