import { ICategoriesRepository } from '../interfaces/ICategoriesRepository';
import { Category } from '../model/category.model';
import fs from "fs";
import csvParse from "csv-parse";


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
    const category = this.categoriesRepository.findByName(name);
    return category;
  }

  list(): Category[]{
    const category = this.categoriesRepository.list();
    return category;
 }

 findById(id:string): Category{
     const category = this.categoriesRepository.findById(id);
     return category;
 }

 //IMPORT CATEGORIES
 executeImport(file: Express.Multer.File): void{
     // recebendo o arquivo, criando uma stream de leitura, passando 
     // o caminho do arquivo para a pasta ./temp
     // pegando todos os dados que foram lidos e repassando por pipe
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
}

export { CategoryService };