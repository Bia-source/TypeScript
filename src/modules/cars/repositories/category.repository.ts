import { Category } from "../model/category.model";
import { ICategoriesRepository, ICreateCategoryDTO } from "../interfaces/ICategoriesRepository";

//DTO => Data transfer object 
class CategoryRepositories {
   private categories: Category[] = [];

   constructor(){
     this.categories = [];
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
      const res = JSON.stringify(this.categories);
      console.log(res);
      return category;
   }
}

export { CategoryRepositories };