import { Category } from "../model/category.model";


interface ICreateCategoryDTO{
    name: string;
    description: string;
}

interface ICategoriesRepository{
   findByName(name: string): Category;
   list(): Category[];
   create({ name, description}: ICreateCategoryDTO): void;
   findById(id:string): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO };