import { IsNotEmpty } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty()
    readonly name: string

    @IsNotEmpty()
    readonly price: number

    readonly imageUrl: string

    @IsNotEmpty()
    readonly shopId: number
}