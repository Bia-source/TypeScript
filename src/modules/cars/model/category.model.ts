import  { v4 as uuidv4 }   from 'uuid';
import { Document, model, Schema } from 'mongoose'

interface CategorySchema extends Document{
    id?: string;
    name: string;
    description: string;
    created_at: Date;
}
class Category{
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor(){
        // inicializando objeto category
       if(!this.id){
         this.id = uuidv4();
         this.hsh();
       }
    }

     hsh(): any{
        const CategorySchemas = new Schema({
            id: {
                type: String,
                required: false
            },
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                required: true
            }
        });
      model<CategorySchema>('CategorySchema', CategorySchemas);
    }
    
     
}

export { Category };