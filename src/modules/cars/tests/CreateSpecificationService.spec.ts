import { AppError } from "../../../shared/Error/AppError";
import { Specification } from "../entities/specification.model";
import { SpecificationRepositoryInMemory } from "../repositories/in-memory/SpecificationRepositoryInMemory"
import { CreateSpecificationService } from "../services/createSpecification.service";

let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let createSpecificationService: CreateSpecificationService;

describe("Create a specification", () => {

    beforeEach(() => {
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createSpecificationService = new CreateSpecificationService(specificationRepositoryInMemory);
    });

    it("Deve ser possivel criar uma nova especificação", async () => {
        const specification = new Specification();
        Object.assign(specification, {
            name: "Specification teste",
            description: "Testando a criação de especificações"
        });
        const result = await createSpecificationService.execute(specification);
        expect(result).toHaveProperty('id');
    });

    it("Não deve ser possivel criar uma nova especificação com nome já existente", async () => {
       
        expect(async () => {
            const specification = new Specification();
             Object.assign(specification, {
                name: "Specification teste",
                description: "Testando a criação de especificações"
            });
            await createSpecificationService.execute(specification);
            await createSpecificationService.execute(specification);
        }).rejects.toBeInstanceOf(AppError);
    });

})