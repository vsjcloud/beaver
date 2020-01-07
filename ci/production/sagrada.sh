#!/bin/sh
cd /opt/sagrada || exit 1
exec /sbin/setuser beaver npm run start
