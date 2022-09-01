# Backend-hantverkare.se

## How do I download the files?
If you're new to GitHub and just want to download the entire code, hit the `green button` saying `Code`, and then choose the `Download ZIP` option or copy the https string and paste it to a `git clone` command in your terminal.

## Open project in code editor
Use your `terminal` and `cd` into the folder holding your downloaded/cloned project. Then type `code .`, to start the project in your code editor.

## How to initialize the project
To get your dependencies up to date, you need to run `npm install` in your terminal.

## starting the backend server
To start the server run `npm start` or `nodemon server`. Use the later one if you want to use nodemon. Nodemon is a tool that helps you automatically restart your node application.

## How to use dockerize your backend-application

For this application we have created a cloudbased docker-repository.

 **Create account and download docker hub:** 

If you are new to docker, follow the link to make an account and download the docker desktop hub <https://www.docker.com/> 



 **Logging into docker** 

Login to docker using the terminal by typing: `docker login` and passing your credentials.


 **Pull an image from the repository:**

Using your terminal, type: `docker pull dkingbrandt/backend_hantverkare`.
This will pull an already created image from the repository.

 **Update image and create a container:**

To update the docker image with your code and create a docker container for it to run in, type in the terminal `docker-compose up`.
Your container will now be up and running.

 **Making changes to your image and push it to the repository :**

After making changes to your code, you can type `docker-compose up` to update your docker image and type ` docker push dkingbrandt/backend_hantverkare` to push the newly updated image to the shared repository.

 **List of images**

Type `docker images`.

 **List of containers**

Type `docker ps`(list of containers running).
Type `docker ps -a`(list of all containers).

 **Delete docker container and image**
To delete your docker container type `docker-compose down`.
To delete your image type `docker images rm "name of image"`
To delete all your images and containers type `docker system prune -a`







