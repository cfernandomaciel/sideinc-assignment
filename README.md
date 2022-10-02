### Setup and Execute

* copy env.template to .env
* execute yarn install && yarn start
* import Postman json file from bin/sideInc.postman_collection.json folder

### Generate Bearer Token

* execute yarn generateToken
* copy generated token
* open Postman getPropertyByCity GQL and paste token to Authorization of Type Bearer Token
* choose city at Postman getPropertyByCity Body::GraphQL Variables. I.e.: Houston
* execute GQL Query

### Unit Tests

* execute yarn test

### General Approach

In some ways, I've tried to mimic something that would look more like a real deal 
API that would be third party API agnostic. 

It is not 100% possible to do that in a small project like that, not at least without overcomplicating
things. 

Having said that, I've distributed the project layers in the following fashion:

- controllers: simple controller interface methods are contained here. If we had more Entities to query, the more controllers we'd have. 

- graphql: resolvers, and typeDefs are contained in that folder. 

- services: this layer is the one that exists to 'represent' the generic approach of the microservice. The idea would be to create as many services as third party Realty APIs we'd
integrated in our Backend. Each would have their client, which would be encharged of their business specific rules of each respective API. 

- utils: contains the following: 
  - one generic HTTP access helper method, based in Axios;
  - one authentication module, containing one JWT encrypting method, and one decrypting method;

