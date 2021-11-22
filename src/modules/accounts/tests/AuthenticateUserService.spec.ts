
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { UserRepositoryInMemory } from "../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserService } from "../services/CreateUserService";
import { AuthenticateService } from "../authenticate/AuthenticateService";

let authenticateUserService: AuthenticateService;
let userRepositoryInMemory: UserRepositoryInMemory
let createUserService: CreateUserService;

// TODO Fazer funcionar teste de autenticação
// Esta criando o Usuário no banco in memory, mas não esta conseguindo
// acessar essa Informação
describe("Authenticate user in application", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserService = new AuthenticateService(userRepositoryInMemory); 
        createUserService = new CreateUserService(userRepositoryInMemory);
    });

    it("Deve ser possivel autenticar-se na aplicação", async () => {
        
        const user: ICreateUserDTO = new User();
            Object.assign(user, {
                name: "Teste",
                email: "teste@gmail.com",
                password: "teste123",
                driver_license: "123445",
                avatar_url: "uashduhauhdua"
            })
            await createUserService.execute(user);
            const result = await authenticateUserService.execute({
                email: "teste@gmail.com",
                password: "teste123"
            });
           
          expect(result).toHaveProperty('token');
    });
});