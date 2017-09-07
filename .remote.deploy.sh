#!/bin/bash

source .digitalocean_password

mysql -uroot -p$root_mysql_pass wordpress < migration.sql

mkdir -p /var/www/backups/migrations
mv migration.sql "/var/www/backups/migrations/migration-$(date +'%s').sql"
