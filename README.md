# Flui-BackEnd
Este projeto consiste em uma API RESTful com o objetivo de solucionar um problema comum em praças de alimentação: a necessidade dos clientes se deslocarem constantemente para verificar se seus pedidos estão prontos.

A API centraliza o status dos pedidos de múltiplos restaurantes, permitindo que os clientes acompanhem o andamento em tempo real através de uma interface (frontend) que consumirá estes endpoints. Além disso, oferece funcionalidades como cálculo de tempo médio de espera e um sistema de notificação para quando um pedido fica pronto.

As rotas críticas para a gestão dos restaurantes e pedidos são protegidas, exigindo autenticação via JWT (JSON Web Token).

## Tecnologias Utilizadas
* Backend: Node.js, Express.js
* Banco de Dados: PostgreSQL
* ORM: Sequelize
* Autenticação: JWT (JSON Web Token), bcryptjs
* Containerização: Docker, Docker Compose

## Pré-requisitos
Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
* Docker
* Git (para clonar o repositório)

##  Como Rodar o Projeto
Siga os passos abaixo para executar a aplicação em seu ambiente local.

**1. Clone o Repositório**
```
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DA_PASTA_DO_PROJETO>
```

**2. Configure as Variáveis de Ambiente** 

Crie um arquivo chamado .env na raiz do projeto, copiando o conteúdo do arquivo .env.example:
```
cp .env.example .env
```

Edite o arquivo .env com seus valores:
```
# Configurações do Banco de Dados
DB_HOST=db
DB_USER=seu_usuario
DB_PASSWORD=sua_senha_segura
DB_NAME=flui_db
DB_PORT=5472
DB_DIALECT=postgres

# Chave secreta para assinatura do JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui

# Configurações do Swagger (para desenvolvimento)
SWAGGER_USER=admin
SWAGGER_PASSWORD=senha_swagger

# Ambiente de execução
NODE_ENV=development
```

**Atenção:** 
- Os valores de `DB_USER`, `DB_PASSWORD` e `DB_NAME` devem ser os mesmos utilizados no seu docker-compose.yml.
- O `DB_PORT` deve corresponder à porta interna do PostgreSQL (5472 neste projeto).
- Gere uma chave `JWT_SECRET` forte e única para seu ambiente.

**3. Suba os Contêineres com Docker Compose**

Este comando irá construir a imagem da sua aplicação Node.js e iniciar o contêiner do backend e do banco de dados PostgreSQL.
```
docker-compose up --build -d
```

* A flag --build garante que a imagem seja construída a partir do Dockerfile.
* A flag -d executa os contêineres em modo "detached" (em segundo plano).

Para verificar se os contêineres estão rodando, use o comando:
```
docker-compose ps
```

**4. Execute as Migrations do Banco de Dados**

Com os contêineres em execução, o próximo passo é criar as tabelas no banco de dados. O comando abaixo executa o Sequelize CLI dentro do contêiner da aplicação.

```
docker-compose exec app npx sequelize-cli db:migrate
```

Você verá uma mensagem de sucesso para cada arquivo de migration executado.

**5. Pronto para Usar!**

A sua API já está rodando! Você pode acessá-la em ``http://localhost:3072`` (ou a porta que você configurou no docker-compose.yml).

**Comandos Úteis**
* Para ver os logs da aplicação em tempo real:
```
docker-compose logs -f app
```
* Para parar os contêineres:
```
docker-compose down
```


