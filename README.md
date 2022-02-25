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

Teste os endpoints pelo Swagger em `http://localhost:3000/api/docs`

## Notas

A autenticação é feita por cookies JWT http-only.
Por limitações do browser o swagger não funciona bem com cookies, recomendo utilizar insomnia ou postman, importando pelo json em `http://localhost:3000/api/docs-json`

Autenticação por cookies http-only mitiga ataques XSS mas abre a possibilidade de CSRF, para contornar isso, a rota root (`http://localhost:3000/`) simula um render da página e retorna o token csrf para ser utilizado no header `CSRF-Token`.
