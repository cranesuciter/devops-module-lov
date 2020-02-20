# DevOps-Examples

## Projects presentation

### [Front](MyProj-Frontend):

Local Run => `yarn start`

React project, it display all the users you have stored in the Backend with a poll request made with apollo-hooks</br>
you can start a local version with `yarn start`</br>
[App.js](MyProj-Frontend/src/App.js) is where the main logic is stored and the only file you should have to change to extend the project

### [Back](MyProj-Backend):

Local Run => `docker-compose -f docker-compose.yml -f docker-compose.local.yml up`

Node prisma Project that setup a Graphql API</br>
We can create new users and query them with this api</br>
[schema.graphql](MyProj-Backend/schema.graphql) is the file that represent your graphql types and architecture
[mutation.js](MyProj-Backend/src/mutation.js) and [query.js](MyProj-Backend/src/query.js) define the resolvers for your graphql API

## Continuous deployment and integration

### Front

We build an image build for each branch we want a dockerfile

[dev.Dockerfile](MyProj-Frontend/dev.Dockerfile) we use `npm run-scripts start` to have live reload and dev environement
The file are localy binded with docker so we can modify them directly

[master.Dockerfile](MyProj-Frontend/master.Dockerfile) copy the project builded version inside the image and serve the site with nginx

[docker-compose.yml](MyProj-Frontend/docker-compose.yml) we use `${}` to escape env variables CI_COMMIT_REF_NAME is provided by github an represent the branch name and CI_HOST that we use to define the host for our service
We provide env **PORT** to for `npm run-script start` to be on port 80
and **REACT_APP_HOST_GRAPHQL** for the uri of our ApolloClient in [index.js](MyProj-Frontend/src/index.js)

### Back

Same as front we build an image build for each branch we want a dockerfile

[dev.Dockerfile](MyProj-Backend/dev.Dockerfile) We setup prisma and generate the files that we need and start the server from nodaemon a live-reload for node
The file are localy binded with docker so we can modify them directly

[master.Dockerfile](MyProj-Backend/master.Dockerfile)
We copy the project file to the image and setup and generate the prisma files that we need and start the server from node

[docker-compose.yml](MyProj-Backend/docker-compose.yml) we use `${}` to escape env variables CI_HOST that we use to define the host for our service
we also extend this docker-compose with [docker-compose.local.yml](MyProj-Backend/docker-compose.local.yml) and [docker-compose.prod.yml](MyProj-Backend/docker-compose.prod.yml) they give aditional arguments to our deployements.</br>
`.prod` adds the labels to our service so it can be deployed with swarm and is registered by traefik
`.local` build localy the image and adds the ports of prisma admin making debug easier

### [.gitlab-ci.yml](.gitlab-ci.yml)

4 deployements: 1 dev 1 prod for backend and frontend

we use gitlab-runner setuped as shell executor, being more flexible and easier to setup for swarm and other environements

# [Pdf de bonnes pratiques](bonnes_pratiques_dev_prod.pdf)

Présentation donné a PoC par @Geographer Lucas Santoni [Blog](blog.geographer.fr)

