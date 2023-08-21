import { IsDateString, IsNotEmpty } from 'class-validator';

export class TodoDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    @IsDateString()
    date: Date;
}
