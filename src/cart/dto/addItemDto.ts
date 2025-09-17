import { IsInt, IsNotEmpty, IsOptional, Min } from "class-validator";

export class AddItemDto {
    @IsNotEmpty()
    @IsInt()
    productId: number

    @IsOptional()
    @IsInt()
    @Min(1)
    quantity?: number
}