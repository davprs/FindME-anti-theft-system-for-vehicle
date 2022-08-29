#!/bin/bash
echo "########### Loading data to Mongo DB ###########"
mongoimport --db FindME --collection car_logos --type json --file /tmp/data/car_logos.json --jsonArray