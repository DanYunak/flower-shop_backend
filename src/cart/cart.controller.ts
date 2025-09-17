import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/addItemDto';
import { UpdateItemDto } from './dto/updateItemDto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getCart(@User('id') userId: number) {
        return this.cartService.getCart(userId)
    }

    @Post('add')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async addItem(@User('id') userId: number, @Body() addItemDto: AddItemDto) {
        return this.cartService.addItem(userId, addItemDto.productId, addItemDto.quantity ?? 1)
    }

    @Delete('remove/:productId')
    @UseGuards(AuthGuard)
    async removeItem(@User('id') userId: number, @Param('productId', ParseIntPipe) productId: number) {
        return this.cartService.removeItem(userId, productId)
    }

    @Patch('update')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateItem(@User('id') userId: number, @Body() updateItemDto: UpdateItemDto) {
        return this.cartService.updateItem(userId, updateItemDto.productId, updateItemDto.quantity)
    }
}
