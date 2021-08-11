import { Category } from "../entities/category.model";


interface ICreateCategoryDTO{
    name: string;
    description: string;
}

interface ICategoriesRepository{
   findByName(name: string): Promise<Category>;
   list(): Promise<Category[]>;
   create({ name, description}: ICreateCategoryDTO): Promise<void>;
   findById(id:string): Promise<Category>;
   saveImport(importFile:Express.Multer.File): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };