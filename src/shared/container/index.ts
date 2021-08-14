import { container } from 'tsyringe';
import { IUserRepositories } from '../../modules/accounts/interfaces/IUsersRepositories';
import { UserRepository } from '../../modules/accounts/repositories/UserRepository';
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

container.registerSingleton<IUserRepositories>(
    "UserRepository",
    UserRepository
);