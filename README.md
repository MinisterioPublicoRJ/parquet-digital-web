# Parquet Digital

O Parquet Digital é uma ferramenta para auxiliar o promotor nas suas tarefas diárias, juntando informações de diversos sistemas e disponibilizando de forma agradável para o consumo do cliente, com alertas, gráficos, etc.

## Requerimentos

Node 14 ou mais recente, e npm compatível

## Como instalar

```
git clone https://github.com/MinisterioPublicoRJ/parquet-digital-web.git
cd parquet-digital-web
npm i
```

Note que é importante também ter um arquivo .env com o endereço de onde os dados serão requeridos (API) no formato REACT_APP_BASE_URL=exemplo.com

Por fim rode o comando npm start para acessar localmente

### `npm start`

## Build e deploy

O build é feito com o comando padrão do React (`npm run build`). E usa o [Serve](https://github.com/vercel/serve) para servir os arquivos estáticos, na porta 8080. Nosso OpenShift está configurado para rodar `npm run deploy` no pós-build de produção e `npm run develop` no ambiente de desenvolvimento.

### Para simular localmente o resultado de um build de produção feito no OpenShift

- Primeiro: você precisa garantir que o Serve está instalado globalmente na sua máquina (`npm i -g serve`). Uma vez que esteja instalado:
```
npm run build
serve -s build -l 8080
```
Isso vai servir o projeto em [http://localhost:8080](http://localhost:8080)
