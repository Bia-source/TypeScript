import { Category } from '../entities/category.model';
import fs from "fs";
import csvParse from "csv-parse";
import { CategoryRepositories } from '../repositories/category.repository';
import { ICategoriesRepository } from '../interfaces/ICategoriesRepository';
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
}

interface IImportCategory{
    name: string;
    description: string;
}
@injectable()
class CategoryService {
    constructor(
        @inject("CategoryRepositories")
        private categoriesRepository: ICategoriesRepository) { 
    
  }
   
  
    async execute({ name, description }: IRequest) { 
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
    if(categoryAlreadyExists){
       throw new Error("Category already exist!");
     }
      const newCategory = await this.categoriesRepository.create({ name, description });
      return newCategory;
  }

    async findByName(name: string): Promise<Category>{
     const category = await this.categoriesRepository.findByName(name); 
    return category;
  }

    async list(): Promise<Category[]>{ 
     const category = await this.categoriesRepository.list();
    return category;
  }

    async findById(id: string): Promise<Category>{
     const category = await this.categoriesRepository.findById(id);
    return category;
 }

 //IMPORT CATEGORIES
 executeImport(file: Express.Multer.File):void{
     // recebendo o arquivo, criando uma stream de leitura, passando 
     // o caminho(path) do arquivo para a pasta ./temp
     // pegando todos os dados que foram lidos e repassando por pipe
     // pipe delimitador default delimita uma linha por virgula
    const stream = fs.createReadStream(file.path);
    const parseFile = csvParse();
    stream.pipe(parseFile);
    parseFile.on("data", async (res)=>{
      console.log(res);
    }); 
    //Apagando arquivo criado 
    // if(deleteImport){
    //     let fileName = "./temp/"+file.filename;
    //     fs.unlink(fileName, (err) => {
    //         if (err) throw err;
    //         console.log(`successfully deleted ${fileName}`);
    //       });
    // }
 }

   // Function responsavel apenas por fazer a leitura das categorias
   loadingCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
    return new Promise((resolve, reject)=>{
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[]=[];
      const parseFile = csvParse();
      stream.pipe(parseFile);
      parseFile.on("data", async (res)=>{
      const [name, description] = res;
      categories.push({
          name,
          description
      });
     }).on("end", ()=>{
         fs.promises.unlink(file.path);
         resolve(categories);
     }).on("error", (err)=>{
         reject(err);
     })
    })
   }


   // TODO parar de replicar categoria que já existe 
    async executeImportCategory(file: Express.Multer.File): Promise<void>{
       const categoriesRepository = new CategoryRepositories();
       const categories = await this.loadingCategories(file);
       categories.map(async category =>{
           const { name, description} = category;
           const categoryAlreadyExists = categoriesRepository.findByName(name);
           if(categoryAlreadyExists){
             throw new Error("Category already exist!");
           } 
           return categoriesRepository.create({name,description});
       }) 
   }
}

export { CategoryService };