#!/bin/bash

#npm run build

source ./.env

SED_REPLACE="s_//localhost:3000_//precollege.wsri.host_g ; s_//localhost:3001_//precollege.wsri.host_g ; s_//localhost:8080_//precollege.wsri.host_g"

docker cp $DOCKER_WORDPRESS_CONTAINER:/var/www/html/wp-content/uploads ./dist/wp-content
docker exec $DOCKER_DATABASE_CONTAINER mysqldump -u$WORDPRESS_DB_USER -p$WORDPRESS_DB_PASSWORD $WORDPRESS_DB_NAME | sed -e "$SED_REPLACE" > ./dist/migration.sql

scp -r ./dist/wp-content/themes/custom root@$DROPLET_IP:/var/www/html/wp-content/themes
scp -r ./dist/wp-content/plugins root@$DROPLET_IP:/var/www/html/wp-content/
scp -r ./dist/wp-content/uploads root@$DROPLET_IP:/var/www/html/wp-content/
scp ./dist/migration.sql root@$DROPLET_IP:/root

rm -rf ./dist/uploads
rm ./dist/migration.sql

# TODO: Add a hook to migrate and string-replace the database.
