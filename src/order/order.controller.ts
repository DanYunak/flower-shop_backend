import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe, ParseIntPipe, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderEntity } from './order.entity';
import { AuthGuard } from '../user/guards/auth.guard';
import { User } from 'src/user/decorators/user.decorator';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@User('id', ParseIntPipe) userId: number, @Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
        return await this.orderService.createOrder(userId, createOrderDto)
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(): Promise<OrderEntity[]> {
        return await this.orderService.getAllOrders()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<OrderEntity> {
        return await this.orderService.getOrderById(id)
    }
}
