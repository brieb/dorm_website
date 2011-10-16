#!/bin/bash

BASE_PATH="/Applications/MAMP/htdocs/dorm_website/intern/"

cd ${BASE_PATH}assets/js && node ~/src/r.js -o app.build.js;
cd ${BASE_PATH}intern/assets/js && node ~/src/r.js -o app.build.js;
