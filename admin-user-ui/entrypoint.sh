#!/bin/sh
set -e

if [ -z "${MM_API_URL}" ] || [ -z "${MM_ADMIN_TOKEN}" ]; then
  echo "MM_API_URL and MM_ADMIN_TOKEN must be set." >&2
  exit 1
fi

envsubst '${MM_API_URL} ${MM_ADMIN_TOKEN}' < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js

exec nginx -g 'daemon off;'
