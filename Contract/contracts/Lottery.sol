// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./Ownable.sol";
import "./EnumerableSet.sol";
import "./SafeMath.sol";
// import "./chainLink/VRFConsumerBase.sol";
// import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/VRFConsumerBase.sol";
// import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";


/* Important */
// VRFConsumerBase

contract Lottery is Ownable {

    bytes32 internal keyHash;
    uint256 internal fee;
    
    uint256 public randomResult;
    

    address public caller1;
    address public caller2;

    // constructor() VRFConsumerBase(
    //         0xa555fC018435bef5A13C6c6870a9d4C11DEC329C, // VRF Coordinator
    //         0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06   // LINK Token
    //     )
    // {
    //     keyHash = 0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186;
    //     fee = 0.1 * 10 ** 18; // 0.1 LINK (Varies by network)
    // }


    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.UintSet;

    using SafeMath for uint;

    EnumerableSet.AddressSet private activeUsers;
    EnumerableSet.UintSet private activeLotteries;

    uint public lotteriesCount;    
    uint public minTokenRequire = 10_000;
    uint public maxTicketLimit = 10;
    address public OURAddress;

    mapping(address => uint) userActiveLotteryID;
    mapping(address => uint[]) userLotteriesIDList;
    mapping(bytes32 => address) lotteryRandomenessID;

    mapping(uint => LotteryInfo) public lotteryInfo;
    mapping(uint => mapping(address =>  UserContributions)) public userContributions;


    enum Status {STARTED, ENDED}
    
    struct UserContributions {
        uint tickets;
        uint contribution;
    }

    struct LotteryInfo {
        Status staus;
        address owner;
        uint priceOfTicket;
        uint startingtime;
        uint endingtime;
        address[] partipants;
        uint countOfParticipants;
        uint countOfTickets;
        uint accumulatedFunds;
        address winner;
        uint winnerIndex;
        uint prize;
        uint ownerCommision;
    }

    // Modifiers
    modifier HoldRequiredTokens() {
        require(IERC20(OURAddress).balanceOf(_msgSender()) >= minTokenRequire, "Not enough TOKENS, Please buy more");
        _;
    }

    modifier userNotExists() {
        require( !(EnumerableSet.contains(activeUsers, _msgSender())), "User already running a lottery" );
        _;
    }

    modifier isLotteryActive(uint _id) {
        require( block.timestamp < lotteryInfo[_id].endingtime , "Lottery has been expired. Try next time" );
        _;
    }

    // Internal functions to be used by other functions.
    function addActiveUser() internal returns (bool) {
        return EnumerableSet.add(activeUsers, _msgSender());
    }

    function removeActiveUser() internal returns (bool) {
        return EnumerableSet.remove(activeUsers, _msgSender());
    }

    function listOfActiveUsers() public view returns (address[] memory) {
        return EnumerableSet.values(activeUsers);
    }

    function addActiveLottery(uint _id) internal returns (bool) {
        return EnumerableSet.add(activeLotteries, _id);
    }

    function removeLottery(uint _id) internal returns (bool) {
        return EnumerableSet.remove(activeLotteries, _id);
    }

    // Public functions to interact with lottery
    function startALottery(uint _priceOfTicket, uint _endingtime) public userNotExists HoldRequiredTokens {
        
        require(
            _endingtime >= block.timestamp + 6 hours &&
            _endingtime <= block.timestamp + 120 days,          
            "Ending time should be more than 6 hours and less then 120 days"
            );

        lotteriesCount++;
        addActiveUser();
        addActiveLottery(lotteriesCount);
        userActiveLotteryID[_msgSender()] = lotteriesCount;
        userLotteriesIDList[_msgSender()].push(lotteriesCount);
    
        lotteryInfo[lotteriesCount].staus = Status.STARTED;
        lotteryInfo[lotteriesCount].owner= _msgSender();
        lotteryInfo[lotteriesCount].priceOfTicket= _priceOfTicket;
        lotteryInfo[lotteriesCount].startingtime= block.timestamp;
        lotteryInfo[lotteriesCount].endingtime= _endingtime;

    }

    function buyATicket(uint _id, uint tickets) public isLotteryActive(_id){
        require(tickets > 0 && tickets <= maxTicketLimit, "Cannt by more than Max limit in one trasaction");
        
        require(
            IERC20(OURAddress).transferFrom(_msgSender(), address(this), tickets*lotteryInfo[_id].priceOfTicket), 
            "Insufficient Balance"
            );

        lotteryInfo[_id].accumulatedFunds += tickets*lotteryInfo[_id].priceOfTicket;
        userContributions[_id][_msgSender()].contribution += tickets*lotteryInfo[_id].priceOfTicket;


        if(userContributions[_id][_msgSender()].tickets == 0 ){
            lotteryInfo[_id].countOfParticipants++;
        }

        for(uint i = 1; i <= tickets; i++ ){
            lotteryInfo[_id].partipants.push(_msgSender()) ;
            userContributions[_id][_msgSender()].tickets++ ;
            lotteryInfo[_id].countOfTickets++ ;
        }

    }

    function endALottery() public {
        uint _id = userActiveLotteryID[_msgSender()];
        
        require( _id != 0 , "No lottery to end");
        require(block.timestamp > lotteryInfo[_id].endingtime, "lottery still in progress");
        
        if(lotteryInfo[_id].accumulatedFunds > 0){
            getRandomNumber(_id);
            
            /* Important */
            // require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
            // bytes32 requestId = requestRandomness(keyHash, fee);
            // lotteryRandomenessID[requestId] = msg.sender;
        }
        else {
            lotteryInfo[_id].staus = Status.ENDED;
            removeActiveUser();
            removeLottery(userActiveLotteryID[_msgSender()]);
            delete userActiveLotteryID[_msgSender()];     
        }

    }


    // function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {

    //     randomResult = randomness;

    //     uint _id = userActiveLotteryID[lotteryRandomenessID[requestId]];
    //     uint winnerIndex = randomness.mod(lotteryInfo[_id].partipants.length);
    //     lotteryInfo[_id].winnerIndex = winnerIndex;

    //     address winnerAddr = lotteryInfo[_id].partipants[winnerIndex];
    //     lotteryInfo[_id].winner = winnerAddr;


    //     uint prize = lotteryInfo[_id].accumulatedFunds.mul(92).div(100);
    //     uint ownerCommision = lotteryInfo[_id].accumulatedFunds.mul(4).div(100);

    //     bool withdrawPrize = IERC20(OURAddress).transfer(winnerAddr, prize);
    //     require(withdrawPrize, "withdrawPrize is unseccessfull");

    //     bool sendOnerCommision = IERC20(OURAddress).transfer(_msgSender(), ownerCommision);
    //     require(sendOnerCommision, "sendOnerCommision is unseccessfull");

    //     lotteryInfo[_id].prize = prize;
    //     lotteryInfo[_id].ownerCommision = ownerCommision;
    //     lotteryInfo[_id].staus = Status.ENDED;

    //     removeActiveUser();
    //     removeLottery(userActiveLotteryID[_msgSender()]);
    //     delete userActiveLotteryID[_msgSender()];   

    // }

    function getRandomNumber(uint _id) internal {
        uint randomNumber = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, _id)));

        uint winnerIndex = randomNumber.mod(lotteryInfo[_id].partipants.length);
        lotteryInfo[_id].winnerIndex = winnerIndex;

        address winnerAddr = lotteryInfo[_id].partipants[winnerIndex];
        lotteryInfo[_id].winner = winnerAddr;


        uint prize = lotteryInfo[_id].accumulatedFunds.mul(92).div(100);
        uint ownerCommision = lotteryInfo[_id].accumulatedFunds.mul(4).div(100);

        bool withdrawPrize = IERC20(OURAddress).transfer(winnerAddr, prize);
        require(withdrawPrize, "withdrawPrize is unseccessfull");

        bool sendOnerCommision = IERC20(OURAddress).transfer(_msgSender(), ownerCommision);
        require(sendOnerCommision, "sendOnerCommision is unseccessfull");

        lotteryInfo[_id].prize = prize;
        lotteryInfo[_id].ownerCommision = ownerCommision;
        lotteryInfo[_id].staus = Status.ENDED;

        removeActiveUser();
        removeLottery(userActiveLotteryID[_msgSender()]);
        delete userActiveLotteryID[_msgSender()];        
    }



    function myActiveLotteryID() public view returns (uint){
        return userActiveLotteryID[_msgSender()];
    }

    function myLotteriesIDList() public view returns (uint[] memory){
        return userLotteriesIDList[_msgSender()];
    }

    function listOfActiveLotteriesID() public view returns (uint256[] memory) {
        return EnumerableSet.values(activeLotteries);
    }

    function activeLotteriesCount() public view returns (uint256) {
        return EnumerableSet.length(activeLotteries);
    }

    // Functions for owner privilege
    function updateCriteriaToken(address _address) public onlyOwner {
        OURAddress = _address;
    }

    function updateMaxTicketLimit(uint _maxTicketLimit) public onlyOwner {
        maxTicketLimit = _maxTicketLimit;
    }
    
    function updateMinTokenRequire(uint _minToken) public onlyOwner {
        minTokenRequire = _minToken;
    }

    function withdrawFunds() public onlyOwner {
        uint balance = IERC20(OURAddress).balanceOf(address(this));
        require(balance > 0, "Nothing to withdraw");

        bool withdrawed = IERC20(OURAddress).transfer(_msgSender(), balance);
        require(withdrawed, "Withdrwa is unseccessfull");

    }

    // function withdrawLink() external onlyOwner{
    //     uint balance = LINK.balanceOf(address(this));
    //     require(balance > 0, "Nothing to withdraw");

    //     bool withdrawed = LINK.transfer(_msgSender(), balance);
    //     require(withdrawed, "Withdrwa is unseccessfull");
    // } 

    // function linkBalance() external view returns(uint) {
    //     uint balance = LINK.balanceOf(address(this));
    //     return balance;

    // }

}



// 3. Anonymous Model (Requires 10000 OUR tokens, condition kept to reduce the spamming).
// Anyone can launch a lottery if he has a holding of 10000 OUR tokens using “NO HOUSE” advantage of the Token’s unique protocol.
// Example: A person in the ecosystem wants to launch a lottery he can sell tickets with a pre-defined price in OUR tokens and time left for the draw.
// Any others who wants to participate in this lottery will purchases the ticket within the cut-off time. After the draw is over and the winner is selected 90% of pooled amount will be transferred to the winner’s wallet and the person who launched a lottery will receive a commission of 3% of the pooled amount. And 4% from the balance will be transferred to the “Lifetime lottery Model”. Balance 3% will be used for the administration purpose.


// 92% winner 4% commision 4% admin

