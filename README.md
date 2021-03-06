<br />
<p align="center">

  <h3 align="center">API REST MongoDB</h3>

  <p align="center">
    API REST para o sistema de agendamento
  </p>

</p>

<details open="open">
  <summary>Índice</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#construido-com">Construido com</a></li>
      </ul>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pre-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">instalação</a></li>
      </ul>
    </li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

## Sobre o projeto

Essa API foi elaborada para o projeto do [sistema de agendamento](https://github.com/william-james-pj/schedule) e é capaz de altera, criar, editar e deletar um usuários e clientes. Também possuindo um controle de acesso, onde só o usuário admin pode realizar algumas funções. Essa API valida os dados de cadastro e possui um sistema de redefinição de senha.

### Construído com

Na construção desse projeto foi utilizado:
* [Nodejs](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/3)

# Começando

Para obter uma cópia local desse repositório, siga estas etapas.

### Pré-requisitos

Para usar esse repositório, são necessários os seguintes softwares:

* MongoDb

    Baixe e instale a versão mais recente [MongoDB](https://www.mongodb.com/3).

* Node.js
  
  Baixe e instale a versão mais recente do Node.js do [site oficial do Node.js](https://nodejs.org/en/).

* yarn

  Baixe e instale a versão mais recente do [yarn](https://classic.yarnpkg.com/en/docs/install/).

  Instalar via npm
  ```sh
  npm install --global yarn
  ```
  
  Instalar via Chocolatey
  ```sh
  choco install yarn
  ```
### Instalação

1. Clone esse repositório:
   ```sh
   git clone https://github.com/william-james-pj/api-rest-myslq.git
   ```
2. Na raiz do projeto, instale todas as dependências definidas no package.json:
   ```sh
   yarn
   ```
2. Na raiz do projeto, crie um arquivo .env, com as seguintes informações:
   ```sh
    PORT=3000
    URL_DATABASE="mongodb://localhost:27017/nome_banco"
    SECRET="chave"
   ```
3. Execute esse comando, no diretório do projeto, para iniciar o servidor:
   ```sh
   yarn dev
   ```
4. Abra o código-fonte e comece a editar!

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para maiores informações.

## Contato

William James - william.james.pj@gmail.com

Link do projeto: [https://github.com/william-james-pj/api-rest-myslq](https://github.com/william-james-pj/api-rest-myslq)