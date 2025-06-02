# iCEVConnect: Guia para Rodar a API

Este guia descreve os passos necessários para clonar, configurar e executar localmente a API do projeto iCEVConnect.


## ✅ Pré-requisitos
Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [NPM](https://www.npmjs.com/) (geralmente incluído com Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (versão 12+)
- [Git](https://git-scm.com/downloads)

## 📥 1. Clone o repositório do projeto:
 ```bash
 git clone https://github.com/arthurmousinho/icev-connect.git
 ```

## 📁 2. Acesse o diretório da API:
``` bash
cd icev-connect/api
```

## ⚙️ 3. Configure as variáveis de ambiente:

- 3.1 Crie um arquivo ***.env*** na raiz do diretório:
- 3.2 Adicione as seguinte variáveis dentro do arquivo criado:
```python
API_BASE_URL="http://localhost:8080"
PORT="8080"

DATABASE_URL="postgresql://icev_connect_user:icev_connect_password@localhost:5432/icev_connect_database"
FRONTEND_URL="http://localhost:3000"

JWT_SECRET="BagdaajdfbaihdbasoudhabvfhfBUY21gt30821g43uhVIH29846t2482764724628746"
JWT_EXPIRATION="7d"

ADMIN_EMAIL="admin@icevconnect.com"
ADMIN_NAME="Admin iCEVConnect"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CALLBACK_URL=""
```

## 🛠️ 4. Configure o banco de dados PostgreSQL
Crie um banco de dados com as seguintes credenciais:

- Usuário: ```icev_connect_user```
- Senha: ```icev_connect_password```
- Banco de dados: ```icev_connect_database```
- Host: ```localhost```
- Porta: ```5432```

> 💡 Dica: Você pode usar uma ferramenta como pgAdmin, TablePlus ou o terminal psql para criar o banco e o usuário.

## 📦 5. Instale as dependências
```bash
npm install
```

## 🚀 6. Rode a API localmente
```bash
npm run start:dev
```

> 🎉 Pronto: A API estará disponível em: http://localhost:8080

## ❓ Dúvidas ou problemas?
Abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.