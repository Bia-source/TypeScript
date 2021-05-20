import { CategoryRepositories } from '../repositories/category.repository';
import { ICategoriesRepository } from '../interfaces/ICategoriesRepository';
import { Category } from '../model/category.model';

interface IRequest {
    name: string;
    description: string;
}

class CategoryService {
  constructor(private categoriesRepository: ICategoriesRepository){ 
    
  }

  execute({ name, description}: IRequest){  
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if(categoryAlreadyExists){
        throw new Error("Category already exist!");
    }

    this.categoriesRepository.create({name, description});
  }

  findByName(name:string): Category{
    const specification = this.categoriesRepository.findByName(name);
    return specification;
  }
}

export { CategoryService };