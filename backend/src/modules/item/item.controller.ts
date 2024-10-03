import { Body, Controller, Get } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get()
    getListItem(@Body() body: any) {
        return this.itemService.getListItem(body);
    }
}
