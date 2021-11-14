import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";


// Excluindo coluna já existente da tabela users
export class AlterUserDeleteUsername1636909566597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "username");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "username",
            type: "varchar",
        }))
    }

}
