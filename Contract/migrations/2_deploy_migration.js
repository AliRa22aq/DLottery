const Lottery = artifacts.require("Lottery.sol");
const TestCoin = artifacts.require("TestCoin.sol");


module.exports = function (deployer) {
  deployer.deploy(Lottery);  
  deployer.deploy(TestCoin);  
};
