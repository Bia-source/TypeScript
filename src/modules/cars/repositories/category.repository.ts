import { Category } from "../entities/category.model";
import { ICreateCategoryDTO } from "../interfaces/ICategoriesRepository";
import { EntityRepository, getRepository, Repository } from "typeorm";

@EntityRepository()
class CategoryRepositories {
   private repository: Repository<Category>

   public constructor(){
       this.repository = getRepository(Category);
   }

   async create({ name, description}: ICreateCategoryDTO):Promise<Category>{
    //primeiro parametro o objeto e o segundo o que quero colocar dentro dele
    const newCategory = await this.repository.create({
     name,
     description
    });
    await this.repository.save(newCategory);
    return newCategory;
   }

   async list(): Promise<Category[]>{
     const listCategories = await this.repository.find();
     return listCategories;
   }

   async findByName(name: string): Promise<Category>{
     const category = await this.repository.findOne({
           where: {
              name
          }
      });
      return category;
   }

  async findById(id:string): Promise<Category>{
       const category = await this.repository.findOne({
           where: {
               id
           }
       })
       return category;
   }

   async saveImport(importFile: Express.Multer.File):Promise<void>{
       //TODO
   }
    
    async updateCategory(name?: string, description?: string, id?:string): Promise<Category>{
        const category = await this.repository.findOne({ id });
        let newCategory = {
            name: name || category.name,
            description: description || category.description
        }
        await this.repository.update(id, newCategory);
        const changeCategory = this.repository.findOne({ id });
        return changeCategory;
   }
}

export { CategoryRepositories };