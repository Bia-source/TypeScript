import { v4 as uuidv4 } from 'uuid';
import { Entity,Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity("categories")
class Category{

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        // inicializando objeto category
       if(!this.id){
         this.id = uuidv4();
       }
    }

}

export { Category };