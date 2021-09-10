terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
  }
}

provider "docker" {}

//back end

resource "docker_image" "back_image" {
  name = "lov/nodeback"
  build {
    path = "MyProj-Backend/"
  }
  keep_locally = false
}

resource "docker_container" "back_container" {
  image = docker_image.back_image.latest
  name  = "backend"
  ports {
    internal = 8080
    external = 8080
  }
  volumes {
    container_path="./MyProj-Backend:/usr/app"
  }
  env = [
    "MONGO_USERNAME=api",
    "MONGO_PASSWORD=docker1234",
    "MONGO_HOST=mongo"
  ]
  networks_advanced {
    name = "server-net"
  }
}


//bdd

resource "docker_image" "mongo" {
  name         = "mongo"
  keep_locally = true
}

resource "docker_container" "mongo" {
  name  = "mongodb"
  image = docker_image.mongo.latest
  ports {
    internal = 27017
    external = 27017
  }
  volumes {
    container_path="./mongo/data:/data/db"
  }
  env = [
    "MONGO_INITDB_ROOT_USERNAME=api",
    "MONGO_INITDB_ROOT_PASSWORD=docker1234"
  ]
  networks_advanced {
    name = "server-net"
  }
}

//frontend

resource "docker_image" "front_image" {
  name = "lov/nodefront"
  build {    
    path = "MyProj-Frontend/"
  }
  keep_locally = false
}

resource "docker_container" "front_container" {
  image = docker_image.front_image.latest
  name  = "frontend"
  ports {
    internal = 3000
    external = 3000
  }
  volumes {
    container_path=".:/code"
  }
  networks_advanced {
    name = "server-net"
  }
}

resource "docker_network" "server-net" {
  name = "server-net"
  driver = "bridge"
}