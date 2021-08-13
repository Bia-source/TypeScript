import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/interfaces/ICategoriesRepository';
import { ISpecificationRepository } from '../../modules/cars/interfaces/ISpecificationRepository';
import { CategoryRepositories } from '../../modules/cars/repositories/category.repository';
import { SpecificationRepository } from '../../modules/cars/repositories/SpecificationRepository';


container.registerSingleton<ICategoriesRepository>(
    "CategoryRepository",
    CategoryRepositories
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);
