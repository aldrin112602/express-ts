import { IsEmail,IsNotEmpty, IsNumber } from "class-validator"

export class ValidateClass {
    constructor({ id, email, password }: {
        id: number, email: string
        password: string
    }) {
        this.id = id
        this.email = email
        this.password = password
    }
    @IsNumber()
    id: number;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}