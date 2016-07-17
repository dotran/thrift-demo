docker run -d -e ZK_HOSTS=$(docker-machine ip default):2181 --name=numberservice danielfbm/numberservice
