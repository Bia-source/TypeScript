import { Category } from "../model/category.model";
import { ICategoriesRepository, ICreateCategoryDTO } from "../interfaces/ICategoriesRepository";
import { categoriesRoutes } from "../../../routes/categoties.routes";

//DTO => Data transfer object 
class CategoryRepositories {
   private categories: Category[] = [];
   
   private static INSTANCE: CategoryRepositories;

   private constructor(){
     this.categories = [];
   }

   public static getIntance(): CategoryRepositories{
    if(!CategoryRepositories.INSTANCE){
        CategoryRepositories.INSTANCE = new CategoryRepositories();
    }
    return CategoryRepositories.INSTANCE;
  }

   create({ name, description}: ICreateCategoryDTO): void{
    const createdCategory: Category = new Category();
    //primeiro parametro o objeto e o segundo o que quero colocar dentro dele
    Object.assign(createdCategory, {
        name,
        description, 
        created_at: new Date()
    });
    // const category: Category = {
    //     
    // };

    // const data = { ...createdCategory, ...category}
    
    this.categories.push(createdCategory);
   }

   list(): Category[]{
      return this.categories;
   }

   findByName(name: string): Category{
      const category = this.categories.find(category => category.name === name);
      return category;
   }

   findById(id:string): Category{
       const category = this.categories.find(res => res.id === id);
       return category;
   }
}

export { CategoryRepositories };