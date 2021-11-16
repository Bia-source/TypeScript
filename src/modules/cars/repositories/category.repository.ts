import { Category } from "../entities/category.model";
import { ICreateCategoryDTO } from "../interfaces/ICategoriesRepository";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { ValidateProps } from "../../../providers/validateProps";

@EntityRepository()
class CategoryRepositories {
   private repository: Repository<Category>

   public constructor(){
       this.repository = getRepository(Category);
   }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category>{
      this.validateCategory("Já existe uma categoria com esse nome", name, "create");
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
        this.validateCategory("Essa categoria não foi encontrada", name, "update");
        const category = await this.repository.findOne({ id });
        let newCategory = {
            name: name || category.name,
            description: description || category.description
        }
        await this.repository.update(id, newCategory);
        const changeCategory = this.repository.findOne({ id });
        return changeCategory;
    }
    
    private validateCategory(messageError: string, data: string, method: string) {
        const validate = new ValidateProps();
        let categoryAlreadyExists = validate.validateAlreadyExixtsCategory(data);
        if(method === 'create' && categoryAlreadyExists) {
            throw new Error(`${messageError}`);
        }
        if(method === 'update' && !categoryAlreadyExists) {
            throw new Error(`${messageError}`);
        }
    }
}

export { CategoryRepositories };