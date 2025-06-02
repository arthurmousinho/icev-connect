# iCEVConnect: Guia para Rodar o WEB (frontend)

Este guia descreve os passos necessários para clonar, configurar e executar localmente o frontend do projeto iCEVConnect.

## ✅ Pré-requisitos
Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [NPM](https://www.npmjs.com/) (geralmente incluído com Node.js)
- [Git](https://git-scm.com/downloads)

## 📥 1. Clone o repositório do projeto:
 ```bash
 git clone https://github.com/arthurmousinho/icev-connect.git
 ```

## 📁 2. Acesse o diretório do projeto WEB:
``` bash
cd icev-connect/web
```

## ⚙️ 3. Configure as variáveis de ambiente:

- 3.1 Crie um arquivo ***.env*** na raiz do diretório:
- 3.2 Adicione as seguinte variáveis dentro do arquivo criado:
```python
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

## 📦 4. Instale as dependências
```bash
npm install
```

## 🚀 5. Rode o projeto WEB localmente
```bash
npm run dev
```

> 🎉 Pronto: A projeto web estará disponível em: http://localhost:3000

## ❓ Dúvidas ou problemas?
Abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.