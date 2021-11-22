import { Category } from "../../entities/category.model";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../interfaces/ICategoriesRepository";
import { v4 as uuid } from "uuid";


interface IUserTeste{
    nome_completo: string;
    cpf: string;
    rg: string;
}
class CategoriesRepositoryInMemory implements ICategoriesRepository{
    
    // Esse nao dá acesso as Informações nome_completo e etc
    usuario = {};
    // Esse dá
    usuario1: IUserTeste;
    
    
    usuario2 = {
        nome_completo: null,
        cpf: null,
        rg: null,
    }

    categories: Category[] = [];
    
    async dataBD(data: IUserTeste): Promise<IUserTeste>{
        // Nesse caso como é só um log nao necessita de await, mas 
        // como é uma funcao Assíncrona é sempre bom colocar rsrs
        await console.log(data.nome_completo);
        console.log(data.cpf);
        console.log(data.rg);
        return data;
    }

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