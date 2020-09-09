## Projects presentation

### [Front](MyProj-Frontend):

Local Run => `yarn start`

React project, it display all the cats you have stored in the Backend with a fetch on a setInterval</br>
you can start a local version with `yarn start`</br>
[App.js](MyProj-Frontend/src/App.js) is where the main logic is stored and the only file you should have to change to extend the project

### [Back](MyProj-Backend):

Local Run => `docker-compose -f docker-compose.yml -f docker-compose.local.yml up`

Node prisma Project that setup a REST API</br>
We can create new cats and query them with this api</br>
[database.ts](MyProj-Backend/src/database.ts) Is where the mongo connection and schemas are declared

## Continuous deployment and integration

### Front

We build an image build for each branch we want a dockerfile

[dev.Dockerfile](MyProj-Frontend/dev.Dockerfile) we use `yarn start` to have live reload and dev environement
The file are localy binded with docker so we can modify them directly

[master.Dockerfile](MyProj-Frontend/master.Dockerfile) copy the project builded version inside the image and serve the site with nginx

[docker-compose.yml](MyProj-Frontend/docker-compose.yml) we use `${}` to escape env variables CI_COMMIT_REF_NAME is provided by gitlab an represent the branch name and CI_HOST that we use to define the host for our service
We provide env **PORT** to for `yarn start` to be on port 80
and **REACT_APP_API_HOST** for the host the rest api is located at

### Back

Same as front we build an image build for each branch we want a dockerfile

[dev.Dockerfile](MyProj-Backend/dev.Dockerfile) We setup prisma and generate the files that we need and start the server from nodaemon a live-reload for node
The file are localy binded with docker so we can modify them directly

[master.Dockerfile](MyProj-Backend/master.Dockerfile)
We copy the project file to the image and setup and generate the prisma files that we need and start the server with node

[docker-compose.yml](MyProj-Backend/docker-compose.yml) we use `${}` to escape env variables CI_HOST that we use to define the host for our service
we also extend this docker-compose with [docker-compose.local.yml](MyProj-Backend/docker-compose.local.yml) and [docker-compose.prod.yml](MyProj-Backend/docker-compose.prod.yml) they give aditional arguments to our deployements.</br>
`.prod` adds the labels to our service so it can be deployed by a orchestrator and is registered by traefik
`.local` build localy the image and adds the ports of prisma admin making debug easier
