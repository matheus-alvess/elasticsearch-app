RUN DOCKER ELASTIC SEARCH

docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300  -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:6.7.2


RUN DOCKER KIBANA

docker run -d  --name kibana   -p 5601:5601   --link elasticsearch   -e "ELASTICSEARCH_URL=http://elasticsearch:9200"   docker.elastic.co/kibana/kibana:6.7.2

