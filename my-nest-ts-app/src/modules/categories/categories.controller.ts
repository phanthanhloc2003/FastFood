import { Controller, Post } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enum/role.enum";

@Controller('categories')
export class CategoriesControllers{
    @Post()
    @Roles(Role.Admin)
    createCategories(){
        
    }
}