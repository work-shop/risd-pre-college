#!/bin/bash

npm run build

source ./.env

scp -r ./dist/wp-content/themes/custom root@$DROPLET_IP:/var/www/html/wp-content/themes
scp -r ./dist/wp-content/plugins root@$DROPLET_IP:/var/www/html/wp-content/
scp -r ./dist/wp-content/uploads root@$DROPLET_IP:/var/www/html/wp-content/

# TODO: Add a hook to migrate and string-replace the database.
