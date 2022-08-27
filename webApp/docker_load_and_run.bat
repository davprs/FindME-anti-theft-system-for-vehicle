mkdir .\ASW

tar -xvzf .\server\ASW_saved.tgz

docker load -i .\ASW\mongosave.tar
docker load -i .\ASW\nodesave.tar

docker compose up -d
