import { IsNotEmpty } from "class-validator";

export class CreateEducationDto {
    @IsNotEmpty()
    institution: string;
    @IsNotEmpty()
    degree: string;
    @IsNotEmpty()
    major: string;
    @IsNotEmpty()
    gradDate: Date;
    @IsNotEmpty({message: 'userId is required'})
    userId: number;
}
