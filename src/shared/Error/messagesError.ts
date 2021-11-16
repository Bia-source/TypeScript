
export enum MESSAGE_ERROR{
    CREATE_USER = "Não foi possível criar um novo usuario, verifique as Informações.",
    // Erros de usuario
    VALIDATE_USER_NAME = "Esse nome de usuario já existe, tente outro!",
    VALIDATE_USER_EMAIL = "Esse email de usuario já existe, tente outro!",
    // Erros de categorias 
    VALIDATE_CATEGORY_NOT_FOUND = "Essa categoria não foi encontrada",
    VALIDATE_CATEGORY_EXISTS = "Já existe uma categoria com esse nome",
    // Erros de especificações
    VALIDATE_SPECIFICATION_NOT_FOUND = "Essa especificação não foi encontrada",
    VALIDATE_SPECIFICATION_EXISTS = "Já existe uma especificação com esse nome",
}