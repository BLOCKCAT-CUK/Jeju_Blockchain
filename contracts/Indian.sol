pragma solidity >=0.4.24 <=0.5.6;

contract Indian {
    mapping (address => uint16) myGame;
    address public owner;
    address public receiver;

    constructor() public {
        owner = msg.sender;
    }


    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function deposit() payable external {
        require(msg.sender == owner);
    }

    function buyGame() payable external {
        //require(getBalance() >= _gamePrice);
        //receiver = _receiver;
        //msg.sender.transfer(_gamePrice);
        myGame[msg.sender]++;
        //return true;
    }

    function getMyGame() view external returns(uint16) {
        return myGame[msg.sender];
    }

    function sellMyGame(uint _gamePrice) payable external {
        uint refund = (myGame[msg.sender] * _gamePrice);
        myGame[msg.sender] = 0;
        msg.sender.transfer(refund);
    }
    function investGame() payable external {
        myGame[msg.sender]++;
    }

}