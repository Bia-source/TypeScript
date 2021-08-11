import { Category } from "../entities/category.model";
import { ICreateCategoryDTO } from "../interfaces/ICategoriesRepository";
import { EntityRepository, getRepository, Repository } from "typeorm";

@EntityRepository()
class CategoryRepositories {
   private repository: Repository<Category>
   
   private static INSTANCE: CategoryRepositories;

   public constructor(){
       this.repository = getRepository(Category);
   }

   public static getIntance(): CategoryRepositories{
    if(!CategoryRepositories.INSTANCE){
        CategoryRepositories.INSTANCE = new CategoryRepositories();
    }
    return CategoryRepositories.INSTANCE;
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
}

export { CategoryRepositories };