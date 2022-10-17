# learning-node

Projeto de cunho acadêmico para adquirir conhecimento com node.js

Até o momento o projeto contém:

  - WebApi MVC em node.js com express e mongo;
  - Autenticação JWT;
  - Utilização de docker para instanciamento do rabbitmq:
     Na pasta do rabbit basta executar esse comando: docker-compose up -d
  - Exemplo de "workers" publisher/subscriber em conjunto com rabbitmq
     node .\publisher.js 
     node .\subscriber.js 
