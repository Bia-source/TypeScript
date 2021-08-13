import { Category } from "../entities/category.model";


interface ICreateCategoryDTO{
    name?: string;
    description?: string;
}

interface ICategoriesRepository{
   findByName(name: string): Promise<Category>;
   list(): Promise<Category[]>;
   create({ name, description}: ICreateCategoryDTO): Promise<Category>;
   findById(id:string): Promise<Category>;
   saveImport(importFile:Express.Multer.File): Promise<void>;
   updateCategory({ name, description }: ICreateCategoryDTO, id:string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };