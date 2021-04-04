import { Category } from "../model/category.model";

//DTO => Data transfer object 
interface ICreateCategoryDTO{
    name: string;
    description: string;
}
class CategoryController {
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
    })
    // const category: Category = {
    //     
    // };

    // const data = { ...createdCategory, ...category}
    
    this.categories.push(createdCategory);
   }

   getList(): Category[]{
      return this.categories;
   }

   findByName(name: string): Category{
      const category = this.categories.find(category=> category.name === name);
      return category;
   }
}

export { CategoryController };