import { IsOptional } from "class-validator"
export class CreateSkillDto {
    skill_name: string

    @IsOptional()
    certification: string

    @IsOptional()
    cert_link: string

    workerId: number
    
}
