import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/interfaces/ICategoriesRepository';
import { CategoryRepositories } from '../../modules/cars/repositories/category.repository';


container.registerSingleton<any>(
    "CategoryRepositories",
    CategoryRepositories
)

