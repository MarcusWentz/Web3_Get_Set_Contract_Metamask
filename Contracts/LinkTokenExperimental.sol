// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

// Modified from https://github.com/smartcontractkit/LinkToken/blob/master/contracts-flat/v0.7/LinkTokenChild.sol

abstract contract ERC20 {
    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    event Transfer(address indexed from, address indexed to, uint256 amount);

    event Approval(address indexed owner, address indexed spender, uint256 amount);

    /*//////////////////////////////////////////////////////////////
                            METADATA STORAGE
    //////////////////////////////////////////////////////////////*/

    string public name;

    string public symbol;

    uint8 public immutable decimals;

    /*//////////////////////////////////////////////////////////////
                              ERC20 STORAGE
    //////////////////////////////////////////////////////////////*/

    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    mapping(address => mapping(address => uint256)) public allowance;

    /*//////////////////////////////////////////////////////////////
                            EIP-2612 STORAGE
    //////////////////////////////////////////////////////////////*/

    // uint256 internal immutable INITIAL_CHAIN_ID;

    // bytes32 internal immutable INITIAL_DOMAIN_SEPARATOR;

    // mapping(address => uint256) public nonces;

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(string memory _name,string memory _symbol,uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;

        // INITIAL_CHAIN_ID = block.chainid;
        // INITIAL_DOMAIN_SEPARATOR = computeDomainSeparator();
    }

    /*//////////////////////////////////////////////////////////////
                               ERC20 LOGIC
    //////////////////////////////////////////////////////////////*/

    function approve(address spender, uint256 amount) public virtual returns (bool) {
        allowance[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);

        return true;
    }

    function transfer(address to, uint256 amount) public virtual returns (bool) {
        balanceOf[msg.sender] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function transferFrom(address from,address to,uint256 amount) public virtual returns (bool) {
        uint256 allowed = allowance[from][msg.sender]; // Saves gas for limited approvals.

        if (allowed != type(uint256).max) allowance[from][msg.sender] = allowed - amount;

        balanceOf[from] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(from, to, amount);

        return true;
    }

    function _mint(address to, uint256 amount) internal virtual {
        totalSupply += amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) internal virtual {
        balanceOf[from] -= amount;

        // Cannot underflow because a user's balance
        // will never be larger than the total supply.
        unchecked {
            totalSupply -= amount;
        }

        emit Transfer(from, address(0), amount);
    }
}

interface IERC677 {
    function transferAndCall(
      address to,
      uint value,
      bytes memory data
    )
      external
      returns (bool success);
  
    event Transfer(
      address indexed from,
      address indexed to,
      uint value,
      bytes data
    );
}

interface IERC677Receiver {
    function onTokenTransfer(
      address sender,
      uint value,
      bytes memory data
    )
      external;
}

abstract contract ERC677 is IERC677, ERC20 {
  /**
   * @dev transfer token to a contract address with additional data if the recipient is a contact.
   * @param to The address to transfer to.
   * @param value The amount to be transferred.
   * @param data The extra data to be passed to the receiving contract.
   */
  function transferAndCall(
    address to,
    uint value,
    bytes memory data
  )
    public
    override
    virtual
    returns (bool success)
  {
    super.transfer(to, value);
    emit Transfer(msg.sender, to, value, data);
    // if (isContract(to)) {
      contractFallback(to, value, data);
    // }
    return true;
  }


  // PRIVATE

  function contractFallback(
    address to,
    uint value,
    bytes memory data
  )
    private
  {
    IERC677Receiver receiver = IERC677Receiver(to);
    receiver.onTokenTransfer(msg.sender, value, data);
  }

//   function isContract(
//     address addr
//   )
//     private
//     view
//     returns (bool hasCode)
//   {
//     uint length;
//     assembly { length := extcodesize(addr) }
//     return length > 0;
//   }

}

contract LinkTokenExperimental is ERC20, ERC677 {

    uint private constant TOTAL_SUPPLY = 10**27;
    string private constant NAME = 'ChainLink Token';
    string private constant SYMBOL = 'LINK';
  
    constructor() ERC20(NAME, SYMBOL,18) {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
    
    function _transfer(
      address recipient,
      uint256 amount
    )
      internal
      virtual
      validAddress(recipient)
    {
      ERC20.transfer(recipient, amount);
    }
  
    function _approve(
      address spender,
      uint256 amount
    )
      internal
      virtual
      validAddress(spender)
    {
      ERC20.approve(spender, amount);
    }
  
    modifier validAddress(
      address recipient
    )
      virtual
    {
      require(recipient != address(this), "LinkToken: transfer/approve to this contract address");
      _;
    }
}
