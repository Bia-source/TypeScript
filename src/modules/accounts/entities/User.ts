import { Column, Entity, PrimaryColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
class User{

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Column()
    created_at: Date;

    @Column()
    avatar_url: string;     

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { User }