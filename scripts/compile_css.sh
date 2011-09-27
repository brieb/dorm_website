#!/bin/bash

BASE_PATH="/Applications/MAMP/htdocs/dorm_website/"

if [ "$1" == "intern" ]; then
  BASE_PATH=${BASE_PATH}intern/;
fi

echo ${BASE_PATH};
cd ${BASE_PATH}assets;
compass watch -s compressed .;
