import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
    private items: Item[]= [];
    private idCounter = 1;

    findAll() {
        return this.items;
    }
    findOne(id: number) {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            throw new NotFoundException('Id Not Found During the Search');
        }
        return item;
    }
    create(item: Omit<Item, 'id'>) {
        const newItem = { ...item, id: this.idCounter++ };
        this.items.push(newItem);
        return newItem;
    }
    update(id: number, updateItem: Partial<Item>) {
        const item = this.findOne(id);
        Object.assign(item, updateItem);
        return item;
    }
    delete(id: number) {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) {
            throw new NotFoundException('Id Not Found During the Search');
        }
        this.items.splice(index, 1);
    }
}
