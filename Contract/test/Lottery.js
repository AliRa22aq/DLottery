var lotteryContract = artifacts.require("Lottery.sol");
var TestCoin = artifacts.require("TestCoin.sol");
const { balance, time } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');

contract("LockerFactory", (accounts) => {
  
  let lottery;
  let testCoin;

  let lotteryAddress;
  let testCoinAddress;

  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const user3 = accounts[3];
  const user4 = accounts[4];
  const user5 = accounts[5];
  const user6 = accounts[6];
  const user7 = accounts[7];
  const devTeam = accounts[8];
  const dev = accounts[9];

//   const mintTokens = async (user) => {
//     await testCoin._mint(user, 20000000000000, { from: user });
//     await testCoin.approve(lockerFactoryAddress, 20000000000000, { from: user });
//     const userBalance = await testCoin.balanceOf(user);
//     return userBalance;
//   }

  beforeEach(async () => {
    lottery = await lotteryContract.new();
    lotteryAddress = await lottery.address;

    testCoin = await TestCoin.new();
    testCoinAddress = await testCoin.address;

  });

  describe("Deployment =>", () => {

      it("deploys successfully", async () => {
   
        assert.notEqual(lotteryAddress, 0x0);
        assert.notEqual(lotteryAddress, "");
         
        assert.notEqual(testCoinAddress, 0x0);
        assert.notEqual(testCoinAddress, "");
          
      });
              
  });

//   describe("Owner =>", () => {

//     it("can update the fees", async () => {
 
//       let lockFee;
//       let updateLokcerFee;

//       lockFee = await lockerFactory.lockFee();
//       assert.equal(String(lockFee), web3.utils.toWei('0.1', 'ether'));

//       updateLokcerFee = await lockerFactory.updateLokcerFee();
//       assert.equal(String(updateLokcerFee), web3.utils.toWei('0.05', 'ether'));
        
//       await lockerFactory.updateFees(web3.utils.toWei('0.2', 'ether'), web3.utils.toWei('0.1', 'ether'));

//       lockFee = await lockerFactory.lockFee();
//       assert.equal(String(lockFee), web3.utils.toWei('0.2', 'ether'));

//       updateLokcerFee = await lockerFactory.updateLokcerFee();
//       assert.equal(String(updateLokcerFee), web3.utils.toWei('0.1', 'ether'));


//     });
    
//     it("can withdraw all the funds", async () => {
 
//       const latestTime = Number((await time.latest()));
//       const OneYearsduration = Number(await time.duration.years(1));
//       let contractBalance;
//       let ownerBalance;


//       let testCoin1 = await TestCoin.new();
//       testCoinAddress1 = await testCoin1.address;

//       await testCoin1._mint(user1, 5000000000000, { from: user1 });
//       await testCoin1.approve(lockerFactoryAddress, 5000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress1, 5000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});


//       let testCoin2 = await TestCoin.new();
//       testCoinAddress2 = await testCoin2.address;

//       await testCoin2._mint(user1, 20000000000000, { from: user1 });
//       await testCoin2.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress2, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});

//       let testCoin3 = await TestCoin.new();
//       testCoinAddress3 = await testCoin3.address;

//       await testCoin3._mint(user1, 10000000000000, { from: user1 });
//       await testCoin3.approve(lockerFactoryAddress, 10000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress3, 10000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});
  
//       const info1 = await lockerFactory.loker(1);
//       const info2 = await lockerFactory.loker(2);
//       const info3 = await lockerFactory.loker(3);




//       const locker1_balance =  await testCoin1.balanceOf(info1.lockerAddress);
//       const locker2_balance =  await testCoin2.balanceOf(info2.lockerAddress);
//       const locker3_balance =  await testCoin3.balanceOf(info3.lockerAddress);


//       assert.equal(Number(locker1_balance), 5000000000000 );
//       assert.equal(Number(locker2_balance), 20000000000000 );
//       assert.equal(Number(locker3_balance), 10000000000000 );


//       const tracker = await balance.tracker(owner);


//       contractBalance = await web3.eth.getBalance(lockerFactoryAddress);
//       assert.equal(web3.utils.fromWei(contractBalance, 'ether'), "0.3");


//       let err = false;
//       try{
//           await lockerFactory.withdrawFunds({from: user2});
//       }
//       catch(e){
//         // console.log(e.reason);
//         err = true;
//       }
//       assert.equal(err, true);

//       await lockerFactory.withdrawFunds({from: owner});

//       contractBalance = await web3.eth.getBalance(lockerFactoryAddress);
//       assert.equal(web3.utils.fromWei(contractBalance, 'ether'), "0");

//       let { delta, fees } = await tracker.deltaWithFees();
//       const earning = String(Number(delta) + Number(fees))
//       assert.equal(web3.utils.fromWei(earning, 'ether'), "0.3");

//     });
//   });

//   describe("Contract =>", () => {

//     it("will hold all the tokens locked init", async () => {
 
//       const latestTime = Number((await time.latest()));
//       const OneYearsduration = Number(await time.duration.years(1));

//       let testCoin1 = await TestCoin.new();
//       testCoinAddress1 = await testCoin1.address;

//       await testCoin1._mint(user1, 5000000000000, { from: user1 });
//       await testCoin1.approve(lockerFactoryAddress, 5000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress1, 5000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});


//       let testCoin2 = await TestCoin.new();
//       testCoinAddress2 = await testCoin2.address;

//       await testCoin2._mint(user1, 20000000000000, { from: user1 });
//       await testCoin2.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress2, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});

//       let testCoin3 = await TestCoin.new();
//       testCoinAddress3 = await testCoin3.address;

//       await testCoin3._mint(user1, 10000000000000, { from: user1 });
//       await testCoin3.approve(lockerFactoryAddress, 10000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress3, 10000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});
  
//       const info1 = await lockerFactory.loker(1);
//       const info2 = await lockerFactory.loker(2);
//       const info3 = await lockerFactory.loker(3);

//       const locker1_balance =  await testCoin1.balanceOf(info1.lockerAddress);
//       const locker2_balance =  await testCoin2.balanceOf(info2.lockerAddress);
//       const locker3_balance =  await testCoin3.balanceOf(info3.lockerAddress);

//       assert.equal(Number(locker1_balance), 5000000000000 );
//       assert.equal(Number(locker2_balance), 20000000000000 );
//       assert.equal(Number(locker3_balance), 10000000000000 );
    

//     });

//     it("will hold all the fees from all locker creation and update", async () => {
 
//       const latestTime = Number((await time.latest()));
//       const OneYearsduration = Number(await time.duration.years(1));

//       let testCoin1 = await TestCoin.new();
//       testCoinAddress1 = await testCoin1.address;

//       await testCoin1._mint(user1, 10000000000000, { from: user1 });
//       await testCoin1.approve(lockerFactoryAddress, 10000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress1, 5000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});


//       let testCoin2 = await TestCoin.new();
//       testCoinAddress2 = await testCoin2.address;

//       await testCoin2._mint(user1, 40000000000000, { from: user1 });
//       await testCoin2.approve(lockerFactoryAddress, 40000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress2, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});

//       let testCoin3 = await TestCoin.new();
//       testCoinAddress3 = await testCoin3.address;

//       await testCoin3._mint(user1, 20000000000000, { from: user1 });
//       await testCoin3.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress3, 10000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});
  
//       await lockerFactory.addTokenstoALocker(1, 5000000000000, {from: user1, value: web3.utils.toWei('0.05', 'ether')}); 
//       await lockerFactory.addTokenstoALocker(2, 20000000000000, {from: user1, value: web3.utils.toWei('0.05', 'ether')}); 
//       await lockerFactory.addTokenstoALocker(3, 10000000000000, {from: user1, value: web3.utils.toWei('0.05', 'ether')}); 

//       const contractBalance = await web3.eth.getBalance(lockerFactoryAddress);
//       assert.equal(web3.utils.fromWei(contractBalance, 'ether'), "0.45");
    

//     });
            
//   });


//   describe("Locking =>", () => {

//     it("User can lock tokens", async () => {
//       const latestTime = Number((await time.latest()));
//       const OneYearsduration = Number(await time.duration.years(1));

//       await testCoin._mint(user1, 20000000000000, { from: user1 });
//       await testCoin.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});
    
//     });
      
//     it("after locking, anyone can see his locked token info", async () => {

//       const latestTime = Number((await time.latest()));
//       const OneYearsduration = Number(await time.duration.years(1));

      
//       await testCoin._mint(user1, 20000000000000, { from: user1 });
//       await testCoin.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});

//       const locksListbyUser =  await lockerFactory.getLockersListbyUser(user1);
//       assert.equal(Number(locksListbyUser), 1);

  
//       const locksListbyToken =  await lockerFactory.getLockersListbyToken(testCoinAddress, {from: user1});
//       assert.equal(Number(locksListbyToken), 1);

//       const lockerInfo =  await lockerFactory.loker(1);

//       const contractBalance = await testCoin.balanceOf(lockerInfo.lockerAddress);
//       assert.equal(Number(contractBalance), 20000000000000);
  
//       assert.equal(Number(lockerInfo.id), 1);
//       assert.equal(String(lockerInfo.owner), user1);
//       assert.equal(String(lockerInfo.tokenAddress), testCoinAddress);
//       assert.equal(Number(lockerInfo.numOfTokens), 20000000000000);
//       assert.equal(Number(lockerInfo.unlockTime) , latestTime + OneYearsduration);
//       assert.equal(Number(lockerInfo.status), 0);


//     })

//     it("after locking, user can add more tokens to the lock by paying update fee", async () => {
               
//       const latestTime = Number((await time.latest()));
//       const OneYearsduration = Number(await time.duration.years(1));

//       let lockerBalance;
//       let lockerInfo;

//       await testCoin._mint(user1, 20000000000000, { from: user1 });
//       await testCoin.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});

//       lockerInfo =  await lockerFactory.loker(1);

//       lockerBalance = await testCoin.balanceOf(lockerInfo.lockerAddress);
//       assert.equal(Number(lockerBalance), 20000000000000);
  
//       assert.equal(Number(lockerInfo.numOfTokens), 20000000000000);

//       await testCoin._mint(user1, 10000000000000, { from: user1 });
//       await testCoin.approve(lockerFactoryAddress, 10000000000000, { from: user1 });
//       await lockerFactory.addTokenstoALocker(1, 10000000000000, {from: user1, value: web3.utils.toWei('0.05', 'ether')}); 

//       lockerInfo =  await lockerFactory.loker(1);
      
//       lockerBalance = await testCoin.balanceOf(lockerInfo.lockerAddress);
//       assert.equal(Number(lockerBalance), 30000000000000);
  
//       assert.equal(Number(lockerInfo.numOfTokens), 30000000000000);

//     })

//     it("after locking, user can increase the locking period by paying update fee", async () => {
      
//       let lock1details;

//       const latestTime = Number((await time.latest()));
//       const OneYearsduration = Number(await time.duration.years(1));

//       await testCoin._mint(user1, 20000000000000, { from: user1 });
//       await testCoin.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});
  
//       await lockerFactory.increaseLocktime(1, OneYearsduration, {from: user1, value: web3.utils.toWei('0.05', 'ether')}); 
      
//       lock1details =  await lockerFactory.loker(1);
//       assert.equal(Number(lock1details.unlockTime), latestTime + 2*OneYearsduration);

//     })




//     it("User can create multiple lockers", async () => {
   
//         const latestTime = Number((await time.latest()));
//         const OneYearsduration = Number(await time.duration.years(1));

//         let testCoin1 = await TestCoin.new();
//         testCoinAddress1 = await testCoin1.address;
  
//         await testCoin1._mint(user1, 20000000000000, { from: user1 });
//         await testCoin1.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//         await lockerFactory.createLcoker( 0, testCoinAddress1, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});


//         let testCoin2 = await TestCoin.new();
//         testCoinAddress2 = await testCoin2.address;
  
//         await testCoin2._mint(user1, 20000000000000, { from: user1 });
//         await testCoin2.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//         await lockerFactory.createLcoker( 0, testCoinAddress2, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});

//         let testCoin3 = await TestCoin.new();
//         testCoinAddress3 = await testCoin3.address;
  
//         await testCoin3._mint(user1, 20000000000000, { from: user1 });
//         await testCoin3.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//         await lockerFactory.createLcoker( 0, testCoinAddress3, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});


//         const locksListbyUser =  await lockerFactory.getLockersListbyUser(user1);
//         assert.equal(String(locksListbyUser), "1,2,3");
    
//         const locksListbyToken1 =  await lockerFactory.getLockersListbyToken(testCoinAddress1, {from: user1});
//         const locksListbyToken2 =  await lockerFactory.getLockersListbyToken(testCoinAddress2, {from: user1});
//         const locksListbyToken3 =  await lockerFactory.getLockersListbyToken(testCoinAddress3, {from: user1});
//         assert.equal(Number(locksListbyToken1), 1 );
//         assert.equal(Number(locksListbyToken2), 2 );
//         assert.equal(Number(locksListbyToken3), 3 );
     
//         const lock1details1 =  await lockerFactory.loker(1);
//         assert.equal(String(lock1details1.owner), user1);
//         assert.equal(String(lock1details1.tokenAddress), testCoinAddress1);
  
//         const lock1details2 =  await lockerFactory.loker(2);
//         assert.equal(String(lock1details2.owner), user1);
//         assert.equal(String(lock1details2.tokenAddress), testCoinAddress2);

//         const lock1details3 =  await lockerFactory.loker(3);
//         assert.equal(String(lock1details3.owner), user1);
//         assert.equal(String(lock1details3.tokenAddress), testCoinAddress3);

//     });

//     it("anyone can query locker IDs by user address", async () => {
  
//       const latestTime = Number((await time.latest()));
//       const OneYearsduration = Number(await time.duration.years(1));

//       let testCoin1 = await TestCoin.new();
//       testCoinAddress1 = await testCoin1.address;

//       await testCoin1._mint(user1, 20000000000000, { from: user1 });
//       await testCoin1.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress1, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});


//       let testCoin2 = await TestCoin.new();
//       testCoinAddress2 = await testCoin2.address;

//       await testCoin2._mint(user1, 20000000000000, { from: user1 });
//       await testCoin2.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress2, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});

//       let testCoin3 = await TestCoin.new();
//       testCoinAddress3 = await testCoin3.address;

//       await testCoin3._mint(user1, 20000000000000, { from: user1 });
//       await testCoin3.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress3, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});


//       const locksListbyUser =  await lockerFactory.getLockersListbyUser(user1);
//       assert.equal(String(locksListbyUser), "1,2,3");

//     });

//     it("anyone can query locker IDs by token address", async () => {
  
//       const latestTime = Number((await time.latest()));
//       const OneYearsduration = Number(await time.duration.years(1));

//       let testCoin1 = await TestCoin.new();
//       testCoinAddress1 = await testCoin1.address;

//       await testCoin1._mint(user1, 20000000000000, { from: user1 });
//       await testCoin1.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress1, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});


//       let testCoin2 = await TestCoin.new();
//       testCoinAddress2 = await testCoin2.address;

//       await testCoin2._mint(user1, 20000000000000, { from: user1 });
//       await testCoin2.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress2, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});

//       let testCoin3 = await TestCoin.new();
//       testCoinAddress3 = await testCoin3.address;

//       await testCoin3._mint(user1, 20000000000000, { from: user1 });
//       await testCoin3.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress3, 20000000000000, latestTime + OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});
  
//       const locksListbyToken1 =  await lockerFactory.getLockersListbyToken(testCoinAddress1, {from: user1});
//       const locksListbyToken2 =  await lockerFactory.getLockersListbyToken(testCoinAddress2, {from: user1});
//       const locksListbyToken3 =  await lockerFactory.getLockersListbyToken(testCoinAddress3, {from: user1});
//       assert.equal(Number(locksListbyToken1), 1 );
//       assert.equal(Number(locksListbyToken2), 2 );
//       assert.equal(Number(locksListbyToken3), 3 );
    
//       const lock1details1 =  await lockerFactory.loker(1);
//       assert.equal(String(lock1details1.owner), user1);
//       assert.equal(String(lock1details1.tokenAddress), testCoinAddress1);

//       const lock1details2 =  await lockerFactory.loker(2);
//       assert.equal(String(lock1details2.owner), user1);
//       assert.equal(String(lock1details2.tokenAddress), testCoinAddress2);

//       const lock1details3 =  await lockerFactory.loker(3);
//       assert.equal(String(lock1details3.owner), user1);
//       assert.equal(String(lock1details3.tokenAddress), testCoinAddress3);

//     });

//     it("User can withdraw their tokens partially in many turns once the locking time is over ", async () => {

//       let userBalance;
//       let lockerBalance;
//       let latestTime;
//       let locker1Info;

//       latestTime = Number((await time.latest()));

//       const OneYearsduration = Number(await time.duration.years(1));

//       await testCoin._mint(user1, 20000000000000, { from: user1 });
//       await testCoin.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress, 20000000000000, latestTime + 2*OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});
    
//       locker1Info =  await lockerFactory.loker(1);
//       assert.equal(String(locker1Info.owner), user1);
//       assert.equal(String(locker1Info.tokenAddress), testCoinAddress);
//       assert.equal(String(locker1Info.unlockTime), latestTime + 2*OneYearsduration);
//       assert.equal(Number(locker1Info.numOfTokens), 20000000000000);

//       userBalance = await testCoin.balanceOf(user1);
//       lockerBalance = await testCoin.balanceOf(locker1Info.lockerAddress);
      
//       assert.equal(Number(userBalance), 0);
//       assert.equal(Number(lockerBalance), 20000000000000);

//       let err = false;

//       try {
//         await lockerFactory.uncreateLcoker( 0, 1, 10000000000000, {from: user1});
//       }
//       catch(e){
//         // console.log(e.reason)
//         err = true
//       }
//       assert.equal( err, true);

      
//       await time.increase(time.duration.years(1));
//       latestTime = Number((await time.latest()));

//       err = false;
//       try {
//         await lockerFactory.uncreateLcoker( 0, 1, 10000000000000, {from: user1});
//       }
//       catch(e){
//         // console.log(e.reason)
//         err = true
//       }
//       assert.equal( err, true);
      
//       await time.increase(time.duration.years(1));
//       latestTime = Number((await time.latest()));
//       // console.log("latestTime after 2 year", latestTime);

//       await lockerFactory.unlockTokens(1, 10000000000000, {from: user1});

//       locker1Info =  await lockerFactory.loker(1);
//       assert.equal(Number(locker1Info.numOfTokens), 10000000000000);

//       userBalance = await testCoin.balanceOf(user1);
//       lockerBalance = await testCoin.balanceOf(locker1Info.lockerAddress);
      
//       assert.equal(Number(userBalance), 10000000000000);
//       assert.equal(Number(lockerBalance), 10000000000000);

//       err = false;
//       try {
//         await lockerFactory.unlockTokens(1, 10000000000001, {from: user1});
//       }
//       catch(e){
//         // console.log(e.reason)
//         err = true
//       }
//       assert.equal( err, true);

//       await lockerFactory.unlockTokens( 1, 10000000000000, {from: user1});

//       locker1Info =  await lockerFactory.loker(1);
//       assert.equal(Number(locker1Info.numOfTokens), 0);

//       userBalance = await testCoin.balanceOf(user1);
//       lockerBalance = await testCoin.balanceOf(locker1Info.lockerAddress);
      
//       assert.equal(Number(userBalance), 20000000000000);
//       assert.equal(Number(lockerBalance), 0);


//       err = false;
//       try {
//         await lockerFactory.unlockTokens( 1, 100, {from: user1});
//       }
//       catch(e){
//         // console.log(e.reason)
//         err = true
//       }
//       assert.equal( err, true);

//     });

//     it("User can withdraw their tokens at once the locking time is over ", async () => {

//       let userBalance;
//       let lockerBalance;
//       let latestTime;
//       let lockerInfo;

//       latestTime = Number((await time.latest()));
//       // console.log("latestTime at start ", latestTime)

//       const OneYearsduration = Number(await time.duration.years(1));

//       await testCoin._mint(user1, 20000000000000, { from: user1 });
//       await testCoin.approve(lockerFactoryAddress, 20000000000000, { from: user1 });
//       await lockerFactory.createLcoker( 0, testCoinAddress, 20000000000000, latestTime + 2*OneYearsduration, {from: user1, value: web3.utils.toWei('0.1', 'ether')});
    
//       lockerInfo =  await lockerFactory.loker(1);
//       assert.equal(String(lockerInfo.owner), user1);
//       assert.equal(String(lockerInfo.tokenAddress), testCoinAddress);
//       assert.equal(String(lockerInfo.unlockTime), latestTime + 2*OneYearsduration);
//       assert.equal(Number(lockerInfo.numOfTokens), 20000000000000);

//       userBalance = await testCoin.balanceOf(user1);
//       lockerBalance = await testCoin.balanceOf(lockerInfo.lockerAddress);
      
//       assert.equal(Number(userBalance), 0);
//       assert.equal(Number(lockerBalance), 20000000000000);
      
//       await time.increase(time.duration.years(2));
//       latestTime = Number((await time.latest()));
//       // console.log("latestTime after 2 years", latestTime)

//       await lockerFactory.unlockTokens( 1, 20000000000000, {from: user1});
      

//       lockerInfo =  await lockerFactory.loker(1);
//       assert.equal(Number(lockerInfo.numOfTokens), 0);

//       userBalance = await testCoin.balanceOf(user1);
//       lockerBalance = await testCoin.balanceOf(lockerInfo.lockerAddress);
      
//       assert.equal(Number(userBalance), 20000000000000);
//       assert.equal(Number(lockerBalance), 0);


//     });

            
//   });



})
