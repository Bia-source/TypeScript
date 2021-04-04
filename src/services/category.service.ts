import { CategoryRepositories } from '../repositories/category.repository';

interface IRequest {
    name: string;
    description: string;
}

class CategoryService {
  constructor(private categoriesRepository: CategoryRepositories){ 
    
  }

  execute({ name, description}: IRequest){  
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if(categoryAlreadyExists){
        throw new Error("Category already exist!");
    }

    this.categoriesRepository.create({name, description});
  }
}

export { CategoryService };