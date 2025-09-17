import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateOrderItemDto } from '../../order-item/dto/createOrderItem.dto';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsEmail()
    userEmail: string
    @IsNotEmpty()
    userPhone: string
    @IsNotEmpty()
    deliveryAddress: string
}