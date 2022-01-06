// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./Ownable.sol";
import "./EnumerableSet.sol";

contract Lottery is Ownable {

    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.UintSet;

    EnumerableSet.AddressSet private activeUsers;
    EnumerableSet.UintSet private activeLotteries;

    uint public LotteriesCount;    
    address public OURAddress;
    uint public minTokenRequire = 10_000;
    uint public maxTicketLimit = 10;

    mapping(address => uint) userActiveLotteryID;
    mapping(address => uint[]) userLotteriesIDList;
    mapping(uint => LotteryInfo) public lotteryInfo;

    struct LotteryInfo {
        uint id;
        address owner;
        uint priceOfTicket;
        uint startingtime;
        uint endingtime;
        address[] partipants;
        uint countOfParticipants;
        mapping(address =>  uint) userTickets;
        uint countOfTickets;
        uint accumulatedFunds;
        address winner;
        uint prize;
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
        require( block.timestamp < lotteryInfo[_id].endingtime , "Lottery is not active" );
        _;
    }
    
    // Internal functions to be used by other functions.
    function addUser() internal returns (bool) {
        return EnumerableSet.add(activeUsers, _msgSender());
    }

    function removeUser() internal returns (bool) {
        return EnumerableSet.remove(activeUsers, _msgSender());
    }

    function listOfActiveUsers() public view returns (address[] memory) {
        return EnumerableSet.values(activeUsers);
    }

    function addLottery(uint _id) internal returns (bool) {
        return EnumerableSet.add(activeLotteries, _id);
    }

    function removeLottery(uint _id) internal returns (bool) {
        return EnumerableSet.remove(activeLotteries, _id);
    }

    // Public functions to interact with lottery
    function startALottery(uint _priceOfTicket, uint _endingtime) public userNotExists HoldRequiredTokens{
        LotteriesCount++;
        addUser();
        addLottery(LotteriesCount);
        userActiveLotteryID[_msgSender()] = LotteriesCount;
        userLotteriesIDList[_msgSender()].push(LotteriesCount);
    
        lotteryInfo[LotteriesCount].id = LotteriesCount;
        lotteryInfo[LotteriesCount].owner= _msgSender();
        lotteryInfo[LotteriesCount].priceOfTicket= _priceOfTicket;
        lotteryInfo[LotteriesCount].startingtime= block.timestamp;
        lotteryInfo[LotteriesCount].endingtime= _endingtime;

    }

    function buyATicket(uint _id, uint tickets) public isLotteryActive(_id){
        require(tickets <= maxTicketLimit, "Cannt by more than Max limit in one trasaction");
        
        require(
            IERC20(OURAddress).transferFrom(_msgSender(), address(this), tickets*lotteryInfo[_id].priceOfTicket), 
            "Insufficient Balance"
            );

        for(uint i = 1; i <= tickets; i++ ){
            lotteryInfo[_id].partipants.push(_msgSender());
            lotteryInfo[_id].userTickets[_msgSender()]++;
            lotteryInfo[_id].countOfTickets++;
        }
        
        lotteryInfo[_id].countOfParticipants++;
    
    }

    function EndALottery() public {
        require(userActiveLotteryID[_msgSender()] != 0 , "No lottery to end");

        // Find ransomeness

        // Choose winner

        // Distribute prize

        // Clear Data from active list

        removeUser();
        removeLottery(userActiveLotteryID[_msgSender()]);
        delete userActiveLotteryID[_msgSender()];
    }

    function MyActiveLotteryID() public view returns (uint){
        return userActiveLotteryID[_msgSender()];
    }

    function MyLotteriesIDList() public view returns (uint[] memory){
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

    function updateMmxTicketLimit(uint _maxTicketLimit) public onlyOwner {
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

}



// 3. Anonymous Model (Requires 10000 OUR tokens, condition kept to reduce the spamming).
// Anyone can launch a lottery if he has a holding of 10000 OUR tokens using “NO HOUSE” advantage of the Token’s unique protocol.
// Example: A person in the ecosystem wants to launch a lottery he can sell tickets with a pre-defined price in OUR tokens and time left for the draw.
// Any others who wants to participate in this lottery will purchases the ticket within the cut-off time. After the draw is over and the winner is selected 90% of pooled amount will be transferred to the winner’s wallet and the person who launched a lottery will receive a commission of 3% of the pooled amount. And 4% from the balance will be transferred to the “Lifetime lottery Model”. Balance 3% will be used for the administration purpose.


// 92% winner 4% commision 4% admin

