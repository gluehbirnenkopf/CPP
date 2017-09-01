//Import SHA256 Crypto Algorithm
const SHA256 = require('crypto-js/sha256');

//This class represents a block. Variables init in the constructor
class Block{
    constructor(timestamp,data,prevHash = ''){
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }
    
//Calculates Hash based on Block variables
    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

//This class represents the blockchain including fucntions to get the latest block and add a new block. The genesis block is the first block on the chain and needs to manually added
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    
    createGenesisBlock(){
        return new Block("01/09/2017","Genesis block", "0")
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.index = this.getLatestBlock().index + 1;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    
    isChainvalid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            
            if(currentBlock.prevHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}
let LeonCoin = new Blockchain();
LeonCoin.addBlock(new Block("01/09/2017",{amount: 7}))
LeonCoin.addBlock(new Block("02/09/2017",{amount: 2}))

console.log('is blockchain valid?' + LeonCoin.isChainvalid());
//console.log(JSON.stringify(LeonCoin, null,4));