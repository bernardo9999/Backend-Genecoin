#!/bin/sh

# devemos usar o nvm 8.13.0
. ~/.nvm/nvm.sh
nvm use 8.13.0
sleep 2

echo "############ Matando processos API ###########"
npx lerna run stop --scope server.org1 --stream &
npx lerna run stop --scope server.org2 --stream &
ps -ef | pkill -f 'npx lerna run start --scope server.org1 --stream'
ps -ef | pkill -f 'npx lerna run start --scope server.org2 --stream'

echo "############ Limpando o ambiente ###########"

# npm run env:clean

# npx lerna clean --yes

# echo "######## gerando o rest server ############"
# IMPORTANTE: antes de executar o generate api do convector: atualizar o package.json de todos os componentes para:
#    "ts-node": "^9.0.0",
#    "typescript": "^3.6.3"
# Para o rest server, devemos adicionar o Trasient

echo "######## Reiniciando o Hyperledger ############"

npm run env:restart

sleep 5
echo "######## Copiando profile de Genecoin ############"

# Copiamos o profile ja que as transaçoes da private collection de org1 nao inclui org1 pelo que o profile nao deve conter org2

cp $(pwd)/helper/hyperledger-fabric-network/network-profiles/org1.network-profile.genecoin.yaml /root/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml

echo "############ Bootstrapping #############"

# npx lerna bootstrap

# sleep 3

echo "############ Empacotando Chaincodes #############"

# npm run cc:package -- notas org1

# sleep 3

echo "############ Instalando Chaincodes #############"

npm run cc:start:debug -- notas org1 &

sleep 5

echo "############## Levantando REST Servers ################"

npx lerna run start --scope server.org1 --stream &
sleep 3

npx lerna run start --scope server.org2 --stream &
sleep 3   
