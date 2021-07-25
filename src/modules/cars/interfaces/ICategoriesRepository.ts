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
   saveImport(importFile:Express.Multer.File):void;
}

export { ICategoriesRepository, ICreateCategoryDTO };