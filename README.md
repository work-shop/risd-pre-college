# RISD Pre-College Wordpress Development

## Getting Started

1. Install [Docker](https://docs.docker.com/engine/installation/)

2. Clone this repository locally.

3. Run `npm install` to get the dependencies for this project.

4. Rename the `.sample.env` file to `.env`, and fill in the missing fields `DROPLET_IP` with the target live droplet for this project (if relevant, otherwise delete the field), and the `ACF_PRO_KEY` field.

5. run `docker-compose up -d` to provision a new virtual environment and database running wordpress.

6. run `npm run watch` to start the development environment. The docker container will watch for changes as you make them, and reload the page at `http://localhost:8080`.

7. When you're done working, run `docker-compose down` to safely close the development environment.
