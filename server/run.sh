#docker run -d -e MONGO_HOST=$(docker-machine ip default) -e MONGO_PORT=27017 -e MONGO_DB=demo-db -e ZK_HOSTS=$(docker-machine ip default):2181 -p 80:80 --link mongo:mongo --name=webserver danielfbm/web_service

# docker run -d -e MONGO_DB=demo-db -e ZK_HOSTS=$(docker-machine ip default):2181 -p 80:80 --link mongo:mongo --name=webservice danielfbm/webservice

docker run -d -e MONGO_DB=demo-db -e ZK_HOSTS=$(docker-machine ip default):2181 -p 80:80 -p 3212:3212 --link mongo:mongo --name=webservice danielfbm/webservice
