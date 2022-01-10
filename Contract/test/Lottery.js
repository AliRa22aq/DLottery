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

  const startALottery = async () => {
    const latestTime = Number((await time.latest()));
    const OneDayDuration = Number(await time.duration.days(1));

    await lottery.updateCriteriaToken(testCoinAddress);

    await testCoin._mint(user1, 10_000, { from: user1 });
    await lottery.startALottery(100, latestTime + OneDayDuration, {from: user1});

    const lotteryID = await lottery.lotteriesCount();
    
    return lotteryID;
  }

  const startALotteryWith5Participants = async () => {

    const latestTime = Number((await time.latest()));
    const OneDayDuration = Number(await time.duration.days(1));

    await lottery.updateCriteriaToken(testCoinAddress);

    await testCoin._mint(user1, 10_000, { from: user1 });
    await lottery.startALottery(100, latestTime + OneDayDuration, {from: user1});

    const lotteryID = await lottery.lotteriesCount();

    await testCoin._mint(user2, 1000);
    await testCoin.approve(lotteryAddress, 1000, { from: user2 });
    await lottery.buyATicket(lotteryID, 10, {from: user2});

    await testCoin._mint(user3, 1000);
    await testCoin.approve(lotteryAddress, 1000, { from: user3 });
    await lottery.buyATicket(lotteryID, 10, {from: user3});

    await testCoin._mint(user4, 1000);
    await testCoin.approve(lotteryAddress, 1000, { from: user4 });
    await lottery.buyATicket(lotteryID, 10, {from: user4});

    // await testCoin._mint(user5, 1000);
    // await testCoin.approve(lotteryAddress, 1000, { from: user5 });
    // await lottery.buyATicket(lotteryID, 10, {from: user5});

    // await testCoin._mint(user6, 1000);
    // await testCoin.approve(lotteryAddress, 1000, { from: user6 });
    // await lottery.buyATicket(lotteryID, 10, {from: user6});
    
    return lotteryID;

  }

  // const startALotteryWith5Participants = async () => {
    
  //   const lotteryID = await startALottery();

  //   await testCoin._mint(user2, 1000);
  //   await testCoin.approve(lotteryAddress, 1000, { from: user2 });
  //   await lottery.buyATicket(lotteryID, 10, {from: user2});

  //   await testCoin._mint(user3, 1000);
  //   await testCoin.approve(lotteryAddress, 1000, { from: user3 });
  //   await lottery.buyATicket(lotteryID, 10, {from: user3});

  //   await testCoin._mint(user4, 1000);
  //   await testCoin.approve(lotteryAddress, 1000, { from: user4 });
  //   await lottery.buyATicket(lotteryID, 10, {from: user4});

  //   await testCoin._mint(user5, 1000);
  //   await testCoin.approve(lotteryAddress, 1000, { from: user5 });
  //   await lottery.buyATicket(lotteryID, 10, {from: user5});

  //   await testCoin._mint(user6, 1000);
  //   await testCoin.approve(lotteryAddress, 1000, { from: user6 });
  //   await lottery.buyATicket(lotteryID, 10, {from: user6});

  //   // await time.increase(time.duration.days(1));

    
  //   // await lottery.endALottery({from: user1});
    

  //   // console.log("======== Players ========");

  //   // console.log(user2);
  //   // console.log(user3);
  //   // console.log(user4);
  //   // console.log(user5);
  //   // console.log(user6);

  //   // console.log("======== lotteryInfo ========");

  //   // const lotteryInfo = await lottery.lotteryInfo(lotteryID);
  //   // console.log(String(lotteryInfo.staus))
  //   // console.log(String(lotteryInfo.countOfParticipants))
  //   // console.log(String(lotteryInfo.countOfTickets))
  //   // console.log(String(lotteryInfo.accumulatedFunds))
  //   // console.log(String(lotteryInfo.winner))
  //   // console.log(String(lotteryInfo.prize))
  //   // console.log(String(lotteryInfo.ownerCommision))

  //   // console.log("******* Rewards *******");
  //   // const ownerBalance = await testCoin.balanceOf(user1);
  //   // console.log(String(ownerBalance))

  //   // const winnerBalance = await testCoin.balanceOf(lotteryInfo.winner);
  //   // console.log(String(winnerBalance))




  // }

  beforeEach(async () => {
    testCoin = await TestCoin.new();
    testCoinAddress = await testCoin.address;

    lottery = await lotteryContract.new();
    lotteryAddress = await lottery.address;


  });

  describe("Deployment =>", () => {

      it("deploys successfully", async () => {
   
        assert.notEqual(lotteryAddress, 0x0);
        assert.notEqual(lotteryAddress, "");
         
        assert.notEqual(testCoinAddress, 0x0);
        assert.notEqual(testCoinAddress, "");
          
      });
              
  });

  describe("Owner =>", () => {

    it("can update mintokenRequired", async () => {
 
      let minTokenRequire;

      minTokenRequire = await lottery.minTokenRequire();
      assert.equal(String(minTokenRequire), "10000");

      await lottery.updateMinTokenRequire(15000);

      minTokenRequire = await lottery.minTokenRequire();
      assert.equal(String(minTokenRequire), "15000");

    });

    it("can update maxTicketLimit", async () => {
 
      let maxTicketLimit;
      
      maxTicketLimit = await lottery.maxTicketLimit();
      assert.equal(String(maxTicketLimit), "10");
        
      await lottery.updateMaxTicketLimit(20);

      maxTicketLimit = await lottery.maxTicketLimit();
      assert.equal(String(maxTicketLimit), "20");


    });

    it("can update criteriaToken", async () => {
 
      let criteriaToken;
        
      await lottery.updateCriteriaToken(testCoinAddress);

      criteriaToken  = await lottery.OURAddress();
      assert.equal(String(criteriaToken), testCoinAddress);


    });
    
    it("can withdraw total earnings from contract", async () => {

      let contractBalance;
      let masterBalance;

      await startALotteryWith5Participants();

      await time.increase(time.duration.days(1));

      await lottery.endALottery({from: user1});

      masterBalance = await testCoin.balanceOf(owner);
      // console.log("Before widthdrawing, owner", String(masterBalance));

      contractBalance = await testCoin.balanceOf(lotteryAddress);
      // console.log("Before widthdrawing, contract", String(contractBalance));

      await lottery.withdrawFunds();

      
      masterBalance = await testCoin.balanceOf(owner);
      // console.log("After widthdrawing, owner", String(masterBalance));
      
      contractBalance = await testCoin.balanceOf(lotteryAddress);
      // console.log("After widthdrawing, contract", String(contractBalance));

    })

  });
  
  describe("Owner of the lottery =>", () => {

    it("cannot start a lottery with expiry time less than 6 hours", async () => {
      const latestTime = Number((await time.latest()));
      const fiveHoursDuration = Number(await time.duration.hours(5));
  
      await lottery.updateCriteriaToken(testCoinAddress);

      await testCoin._mint(user1, 10_000, { from: user1 });

      let err = false;

      try {
        await lottery.startALottery(100, latestTime + fiveHoursDuration, {from: user1});
      }
      catch(e){
        // console.log(e.reason)
        err = true
      }
      assert.equal( err, true);

    })

    it("cannot start a lottery with expiry time more than 120 days", async () => {
      const latestTime = Number((await time.latest()));
      const oneTwentyoneDaysDuration = Number(await time.duration.days(121));
  
      await lottery.updateCriteriaToken(testCoinAddress);

      await testCoin._mint(user1, 10_000, { from: user1 });

      let err = false;

      try {
        await lottery.startALottery(100, latestTime + oneTwentyoneDaysDuration, {from: user1});
      }
      catch(e){
        // console.log(e.reason)
        err = true
      }
      assert.equal( err, true);
    
    })

    it("cannot start a lottery if doesn't hold required tokens", async () => {
      const latestTime = Number((await time.latest()));
      const OneDayDuration = Number(await time.duration.days(1));
  
      await lottery.updateCriteriaToken(testCoinAddress);
  
      let err = false;

      try {
        await lottery.startALottery(100, latestTime + OneDayDuration, {from: user1});
      }
      catch(e){
        // console.log(e.reason)
        err = true
      }
      assert.equal( err, true);


  
    })

    it("can start a lottery if he hold required tokens", async () => {
      const latestTime = Number((await time.latest()));
      const OneDayDuration = Number(await time.duration.days(1));
  
      await lottery.updateCriteriaToken(testCoinAddress);

      await testCoin._mint(user1, 10_000, { from: user1 });
      await lottery.startALottery(100, latestTime + OneDayDuration, {from: user1});

      const lotteryID = await lottery.lotteriesCount();
      // console.log(Number(lotteryID))
      assert.equal(Number(lotteryID), 1);
  
    })

    it("cannot start more than one lottery at the same time", async () => {
      const latestTime = Number((await time.latest()));
      const OneDayDuration = Number(await time.duration.days(1));
  
      await lottery.updateCriteriaToken(testCoinAddress);

      await testCoin._mint(user1, 10_000, { from: user1 });
      await lottery.startALottery(100, latestTime + OneDayDuration, {from: user1});

      const lotteryID = await lottery.lotteriesCount();
      // console.log(Number(lotteryID))
      assert.equal(Number(lotteryID), 1);

      let err = false;
      try {
        await lottery.startALottery(100, latestTime + OneDayDuration, {from: user1});
      }
      catch(e){
        // console.log(e.reason)
        err = true
      }
      assert.equal( err, true);

  
    })

    it("Can start another lottery after ending the previous one", async () => {

      let lotteryID;
      let lotteryInfo;

      lotteryID = await startALotteryWith5Participants();

      lotteryInfo = await lottery.lotteryInfo(lotteryID);
      assert.equal(Number(lotteryInfo.staus), 0 );

      await time.increase(time.duration.days(1));

      await lottery.endALottery({from: user1});

      lotteryInfo = await lottery.lotteryInfo(lotteryID);
      assert.equal(Number(lotteryInfo.staus), 1 );

      lotteryID = await startALotteryWith5Participants();
      lotteryInfo = await lottery.lotteryInfo(lotteryID);
      // console.log(Number(lotteryID));
      assert.equal(Number(lotteryInfo.staus), 0 );
 
    })

    it("cannot end the lottery before the expiry time reach", async () => {
   
      await startALotteryWith5Participants();

      let err = false;

      try {
        await lottery.endALottery({from: user1});
      }
      catch(e){
        // console.log(e.reason)
        err = true
      }
      assert.equal( err, true);
  
    });

    it("can end the lottery once the expiry time reach", async () => {
   
      let lotteryInfo;

      const lotteryID = await startALotteryWith5Participants();

      lotteryInfo = await lottery.lotteryInfo(lotteryID);
      assert.equal(Number(lotteryInfo.staus), 0 );

      await time.increase(time.duration.days(1));

      await lottery.endALottery({from: user1});

      lotteryInfo = await lottery.lotteryInfo(lotteryID);
      assert.equal(Number(lotteryInfo.staus), 1 );
  
    });

    it("After ending the lottery, get his 4% share as expected", async () => {
      
      let ownerBalance;
      let lotteryInfo;

      const lotteryID = await startALotteryWith5Participants();

      await time.increase(time.duration.days(1));

      ownerBalance = await testCoin.balanceOf(user1);

      
      assert.equal(Number(ownerBalance), 10000 );
      
      await lottery.endALottery({from: user1});
      
      lotteryInfo = await lottery.lotteryInfo(lotteryID);
      // console.log(String(lotteryInfo.staus))
      // console.log(String(lotteryInfo.countOfParticipants))
      // console.log(String(lotteryInfo.countOfTickets))
      // console.log(String(lotteryInfo.accumulatedFunds))
      // console.log(String(lotteryInfo.winner))
      // console.log(String(lotteryInfo.prize))
      // console.log(String(lotteryInfo.ownerCommision));

      ownerBalance = await testCoin.balanceOf(user1);
      assert.equal(Number(ownerBalance), 10000 + Number(lotteryInfo.accumulatedFunds)*4/100 );
      // console.log("Owner balance after ending lottery", Number(ownerBalance))

  
    });

  })

  describe("Participant =>", () => {

    it("cannot buy tickets without paying anything", async () => {
      let lotteryID = await startALottery();

    // await testCoin._mint(user3, 1000);
    // await testCoin.approve(lotteryAddress, 1000, { from: user3 });


      let err = false;

      try {
        await lottery.buyATicket(lotteryID, 10, {from: user3});
      }
      catch(e){
        // console.log(e.reason)
        err = true
      }
      assert.equal( err, true);


    })

    it("cannot buy tickets without paying in enough tokens", async () => {

      let lotteryID = await startALottery();

      await testCoin._mint(user3, 999);
      await testCoin.approve(lotteryAddress, 999, { from: user3 });


      let err = false;

      try {
        await lottery.buyATicket(lotteryID, 10, {from: user3});
      }
      catch(e){
        // console.log(e.reason)
        err = true
      }
      assert.equal( err, true);

    })

    it("cannot buy tickets more than maxTicketsPerTransaction", async () => {

      let lotteryID = await startALottery();

      await testCoin._mint(user3, 1100);
      await testCoin.approve(lotteryAddress, 1100, { from: user3 });


      let err = false;

      try {
        await lottery.buyATicket(lotteryID, 11, {from: user3});
      }
      catch(e){
        // console.log(e.reason)
        err = true
      }
      assert.equal( err, true);

    })

    it("can buy tickets less or equal to maxTicketsPerTransaction", async () => {

      let lotteryID = await startALottery();

      await testCoin._mint(user3, 1500);
      await testCoin.approve(lotteryAddress, 1500, { from: user3 });

      await lottery.buyATicket(lotteryID, 5, {from: user3});
      await lottery.buyATicket(lotteryID, 10, {from: user3});

      const userContribution = await lottery.userContributions(lotteryID, user3);
      assert.equal(Number(userContribution.tickets), 15);
      assert.equal(Number(userContribution.contribution), 1500);

    })

    it("cannot buy tickets if the lottery is expired", async () => {

      lotteryID = await startALotteryWith5Participants();

      await time.increase(time.duration.days(1));
      
      let err = false;
      
      try {
        await testCoin._mint(user3, 500);
        await testCoin.approve(lotteryAddress, 500, { from: user3 });
        await lottery.buyATicket(lotteryID, 5, {from: user3});
      }
      catch(e){
        // console.log(e.reason)
        err = true
      }
      assert.equal( err, true);

    })

  })

  describe("Contract =>", () => {

    it("will reflect the lottery info as expected", async () => {

      let participantContribution;
      let lotteryID = await startALotteryWith5Participants();

      const lotteryInfo = await lottery.lotteryInfo(lotteryID);
      assert.equal(Number(lotteryInfo.staus), 0);
      assert.equal(Number(lotteryInfo.countOfParticipants), 3);
      assert.equal(Number(lotteryInfo.countOfTickets), 30)
      assert.equal(Number(lotteryInfo.accumulatedFunds), 3000)

      participantContribution = await lottery.userContributions(lotteryID, user2);
      assert.equal(Number(participantContribution.tickets), 10);
      assert.equal(Number(participantContribution.contribution), 1000);

      participantContribution = await lottery.userContributions(lotteryID, user3);
      assert.equal(Number(participantContribution.tickets), 10);
      assert.equal(Number(participantContribution.contribution), 1000);

      participantContribution = await lottery.userContributions(lotteryID, user4);
      assert.equal(Number(participantContribution.tickets), 10);
      assert.equal(Number(participantContribution.contribution), 1000);



    });

    it("will find the winner of the lottery as expected", async () => {

      let participantContribution;
      let lotteryID = await startALotteryWith5Participants();

      await time.increase(time.duration.days(1));

      await lottery.endALottery({from: user1});

      const usersList = [user2, user3, user4]

      const lotteryInfo = await lottery.lotteryInfo(lotteryID);
      assert.equal(Number(lotteryInfo.staus), 1);
      assert.notEqual(usersList.indexOf(lotteryInfo.winner), -1);

    });

    it("can show list of active lotteris and their owners", async () => {

      const latestTime = Number((await time.latest()));
      const OneDayDuration = Number(await time.duration.days(1));
  
      await lottery.updateCriteriaToken(testCoinAddress);
  
      await testCoin._mint(user1, 10_000, { from: user1 });
      await lottery.startALottery(100, latestTime + OneDayDuration, {from: user1});
      // const lotteryID1 = await lottery.lotteriesCount();
  
      await testCoin._mint(user2, 10_000, { from: user2 });
      await lottery.startALottery(100, latestTime + OneDayDuration, {from: user2});
      // const lotteryID2 = await lottery.lotteriesCount();

      await testCoin._mint(user3, 10_000, { from: user3 });
      await lottery.startALottery(100, latestTime + OneDayDuration, {from: user3});
      // const lotteryID3 = await lottery.lotteriesCount();

      const activeIDs = await lottery.listOfActiveLotteriesID();
      const activeUsers = await lottery.listOfActiveUsers();

      // console.log(String(activeIDs))
      // console.log(`1,2,3`)
      // console.log(String(activeUsers))
      // console.log(`${user1},${user2},${user3}`)

      assert.equal(String(activeIDs), `1,2,3`)
      assert.equal(String(activeUsers), `${user1},${user2},${user3}`)

    });

    it("can show id list of all lotteries that a user has ever run and active lottery ", async () => {

      let latestTime = Number((await time.latest()));
      const OneDayDuration = Number(await time.duration.days(1));
  
      await lottery.updateCriteriaToken(testCoinAddress);
  
      await testCoin._mint(user1, 10_000, { from: user1 });

      await lottery.startALottery(100, latestTime + OneDayDuration, {from: user1});
      await time.increase(time.duration.days(1));
      await lottery.endALottery({from: user1});

      latestTime = Number((await time.latest()));
      await lottery.startALottery(100, latestTime + OneDayDuration, {from: user1});
      await time.increase(time.duration.days(1));
      await lottery.endALottery({from: user1});

      latestTime = Number((await time.latest()));
      await lottery.startALottery(100, latestTime + OneDayDuration, {from: user1});


      const myActiveLotteryID = await lottery.myActiveLotteryID({from: user1});
      const myLotteriesIDList = await lottery.myLotteriesIDList({from: user1});

      // console.log(String(myActiveLotteryID))
      // console.log(`1,2,3`)
      // console.log(String(myLotteriesIDList))
      // console.log(`${user1},${user2},${user3}`)

      assert.equal(Number(myActiveLotteryID), 3)
      assert.equal(String(myLotteriesIDList), `1,2,3`)

    });

  });




})
