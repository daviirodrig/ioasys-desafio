# ioasys-desafio

## Como rodar

Clone o repositório:

```shell
git clone https://github.com/daviirodrig/ioasys-desafio.git
cd ioasys-desafio
```

Instale as dependências do projeto

```shell
yarn install
```

Crie um .env do .env-example

```shell
cp .env-example .env
```

Inicie o postgres com docker

```shell
docker-compose up -d --build db
```

Espere o postgres ficar pronto para conexões e inicie a API

```shell
docker-compose up -d --build api
```

Gere registros para o banco de dados

```shell
yarn generate
```

Teste os endpoints pelo Swagger em `localhost:3000/api/docs`
