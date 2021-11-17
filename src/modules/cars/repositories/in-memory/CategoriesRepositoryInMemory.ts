import { Category } from "../../entities/category.model";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../interfaces/ICategoriesRepository";
import { v4 as uuid } from "uuid";

class CategoriesRepositoryInMemory implements ICategoriesRepository{
    
    categories: Category[] = [];
    
    async findByName(name: string): Promise<Category> {
        return await this.categories.find(category => category.name === name);
    }
    async list(): Promise<Category[]> {
        return await this.categories;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category: Category = {
            id: uuid(),
            name,
            description,
            created_at: new Date()
        }
        await this.categories.push(category);
        return category
    }
    async findById(id: string): Promise<Category> {
        return await this.categories.find(category => category.id === id);
    }
    async saveImport(importFile: Express.Multer.File): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async updateCategory(name: string, description: string, id: string): Promise<Category> {
        const category = this.categories.find(category => category.id === id);
        Object.assign(category, {
            description: description,
            name: name
        });
        return category;
    }

}

export { CategoriesRepositoryInMemory }