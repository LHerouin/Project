pragma solidity 0.5.16;

contract admined{
    address public admin;

    constructor() public {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "NOT ADMIN");
        _;
    }

    function transferAdminship(address newAdmin) external onlyAdmin{
        admin = newAdmin;
    }
}

contract Project is admined{
    mapping(address => uint256) balanceOf;
    string public name;
    string public symbol;
    uint8 public decimal;
    uint256 public totalSupply;
    event Transfer(address _from, address _to, uint256 amount);
    event setToken(address admin, address _to, uint256 amount);

    constructor () public  {
        balanceOf[msg.sender] = 10000;
        totalSupply = 10000;
        symbol = "PT";
        name = "Project Token";
        decimal = 0;
    }

    function setBalance( address _to, uint256 amount) external onlyAdmin{
        balanceOf[admined.admin] += balanceOf[_to];
        balanceOf[_to] = amount;
        emit setToken(admined.admin,_to,amount);
    }
    
    
    function getBalance(address _from) external view returns (uint256){
        return balanceOf[_from];
    }
    
    function PTtoETH(uint256 _value) payable external  {
        require(balanceOf[msg.sender] >= _value, "Sender balance is not enough for a transfer !");
        require(balanceOf[admined.admin] + _value > balanceOf[admined.admin], "Receiver cannot receive negative or null value !! ");
        balanceOf[msg.sender] -= _value;
        balanceOf[admined.admin] += _value;
        emit Transfer(msg.sender,admined.admin, _value);
    }
    
    function VirementETH(uint256 _to, uint amount) payable external  {
        bool sent =address(uint160(_to)).send(amount);
        require(sent, "Failed to send Ether");
    }
    
    function VirementPT(address _to, uint256 _value) public  {
        require(balanceOf[msg.sender] >= _value, "Sender balance is not enough for a transfer !");
        require(balanceOf[_to] + _value > balanceOf[_to], "Receiver cannot receive negative or null value !! ");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
    
    
    
    function ETHtoPT(uint amount) public payable {
        bool sent =address(uint160(admined.admin)).send(amount);
        require(sent, "Failed to send Ether");
        balanceOf[msg.sender] += (amount/1000000000000000000)*2;
    }

}

