echo '\n\n requesting all heroes'
curl localhost:3000/heroes


echo '\n\n requesting with wrong body'
curl --silent -X POST \
     --data-binary '{"invalid": "data"}' \
     localhost:3000/heroes

echo '\n\n creating Chapolin'
CREATE=$(curl --silent -X POST \
     --data-binary '{"name": "Chapolin", "age": 100, "power": "Astucia"}' \
     localhost:3000/heroes)

ID=$(echo $CREATE | jq .id)     

sleep 0.1

echo '\n\n requesting Chapolin'
curl localhost:3000/heroes/$ID