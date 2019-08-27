# Affogato subgraph

### Prerequisites

You need truffle,  ganache, graph clent and a graph node in order to run the project. 

```
npm install -g truffle ganache-cli
npm install -g @graphprotocol/graph-cli
```

In order to clone the subgraph
```
git clone https://github.com/jdestephen/sg_affogato.git
```


### Installing and Testing

#### Core
1. Run ganache application or the cli in order to start testing
2. Compile the core
3. Migrate the core

```
ganache-cli
truffle compile 
truffle migrate --network development --reset
```

### Run a local graph node

1. Clone graph-node
2. Enter the Graph Node's Docker directory 
3. Start a local graph node

```
git clone https://github.com/graphprotocol/graph-node/
cd graph-node/docker
docker-compose up
```

#### Subgraph
Add each contract address generated by the migration step to the subgraph (In the file called subgraph.yaml)
```
  ...
  - kind: ethereum/contract
    name: ActorFactory
    network: development
    source:
      address: 'ActorFactory CONTRACT ADDRESS' 
      abi: ActorFactory
  ...    
```
 
1. Install dependencies and generate the code.
2. Create the subgraph
3. Deploy the subgraph

```
  cd sg_affogato  
  yarn && yarn codegen
  yarn create-local
  yarn deploy-local  
```




