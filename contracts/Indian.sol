pragma solidity >=0.4.24 <=0.5.6;

contract Indian {
    mapping (address => uint16) myGame;

    function buyGame() payable external {
        myGame[msg.sender]++;
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