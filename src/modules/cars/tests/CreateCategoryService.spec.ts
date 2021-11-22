import { AppError } from "../../../shared/Error/AppError";
import { CategoriesRepositoryInMemory } from "../repositories/in-memory/CategoriesRepositoryInMemory";
import { CategoryService } from "../services/category.service";

let createCategoryService: CategoryService; 
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
    
describe("Create a category", () => {
    
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryService = new CategoryService(categoriesRepositoryInMemory);
    })
    it("Deve ser possivel criar uma nova categoria", async () => {
        const category = {
            name: "Category teste",
            description: "testando a criacao de categorias"
        }
        const result = await createCategoryService.execute(category);
        expect(result).toHaveProperty('id');
    });

    it("Não deve ser possivel criar uma nova categoria com nome já existente", async () => {
        
        expect(async () => {
            const category = {
                name: "Category teste",
                description: "testando a criacao de categorias"
            }
            await createCategoryService.execute(category);
            await createCategoryService.execute(category);
        }).rejects.toBeInstanceOf(AppError);
    });
});
