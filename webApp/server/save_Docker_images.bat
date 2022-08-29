Xcopy ..\client\build\ .\build\ /E /H /C /I
mkdir .\ASW

docker compose down -v

docker compose up -d
docker save -o ASW\nodesave.tar server_node
docker save -o ASW\mongosave.tar mongo:5.0.5

tar -cvzf .\ASW_saved.tgz .\ASW

docker compose down -v