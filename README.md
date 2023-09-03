# Requisitos funcionais
- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um um usuário logado.
- [ ] Deve ser possível obter o numero de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias mais próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar o check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

# Regras de negocio

- [ ] O usuário nao deve se cadastrar com um email duplicado
- [ ] O usuário nao deve fazer dois check-ins no mesmo dia
- [ ] O usuário nao pode fazer check-in se nao tiver perto de 100m da academia
- [ ] O check-in so pode ser validado ate 20min apos criado
- [ ] O check-in so pode ser validado por administradores
- [ ] A academia so pode ser cadastrada por administradores 


# Requisitos nao-funcionais

- [ ] A senha do usuário precisa ser criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por paginas
- [ ] O usuário deve ser identificado por um JWT