# Parquet Digital

O Parquet Digital (apelidado carinhosamente pelos desenvolvedores de promotron) é uma ferramenta para auxiliar o promotor nas suas tarefas diárias, juntando informações de diversos sistemas e disponibilizando de forma agradável para o consumo do cliente, com alertas, gráficos, etc.

## Como instalar

Instalar é simples. Basta ter acesso às ferramentas node.js e o npm. O git também é altamente recomendável.
Tendo o git basta clonar o repositório atual:

### `git clone https://github.com/MinisterioPublicoRJ/promotron-web.git`

E depois rodar npm install na pasta com o código

### `npm install`

Note que é importante também ter um arquivo .env com o endereço de onde os dados serão requeridos (API) no formato 

REACT_APP_BASE_URL=exemplo.com

Por fim rode o comando npm start para acessar localmente

### `npm start`