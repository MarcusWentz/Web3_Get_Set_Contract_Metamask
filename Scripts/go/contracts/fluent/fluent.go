// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package fluent

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// FluentMetaData contains all meta data concerning the Fluent contract.
var FluentMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"FluentRustAddress\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"fluentRust\",\"outputs\":[{\"internalType\":\"contractIFluentRust\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getRustAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getRustBool\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getRustBytes\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getRustBytes32\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getRustInt256\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"\",\"type\":\"int256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getRustString\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getRustUint256\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
	Bin: "0x608060405234801561000f575f5ffd5b50604051610e6c380380610e6c833981810160405281019061003191906100d4565b805f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506100ff565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100a38261007a565b9050919050565b6100b381610099565b81146100bd575f5ffd5b50565b5f815190506100ce816100aa565b92915050565b5f602082840312156100e9576100e8610076565b5b5f6100f6848285016100c0565b91505092915050565b610d608061010c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610086575f3560e01c806379d19bdc1161005957806379d19bdc14610102578063b932773c14610120578063dd37a7981461013e578063e55f0c4b1461015c57610086565b806302a5ab901461008a5780630a4243d1146100a857806349ed8198146100c65780636422e42f146100e4575b5f5ffd5b61009261017a565b60405161009f9190610667565b60405180910390f35b6100b061019e565b6040516100bd9190610698565b60405180910390f35b6100ce610236565b6040516100db9190610721565b60405180910390f35b6100ec6102d2565b6040516100f99190610761565b60405180910390f35b61010a61036a565b6040516101179190610792565b60405180910390f35b610128610402565b60405161013591906107fd565b60405180910390f35b6101466104bd565b6040516101539190610835565b60405180910390f35b610164610555565b6040516101719190610868565b60405180910390f35b5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166387f5d1e26040518163ffffffff1660e01b8152600401602060405180830381865afa158015610209573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061022d91906108bc565b90508091505090565b60605f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338c7b52e6040518163ffffffff1660e01b81526004015f60405180830381865afa1580156102a1573d5f5f3e3d5ffd5b505050506040513d5f823e3d601f19601f820116820180604052508101906102c99190610a05565b90508091505090565b5f5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f6dff7686040518163ffffffff1660e01b8152600401602060405180830381865afa15801561033d573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103619190610a76565b90508091505090565b5f5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b0898d5e6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103d5573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103f99190610acb565b90508091505090565b60605f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dadd02316040518163ffffffff1660e01b81526004015f60405180830381865afa15801561046d573d5f5f3e3d5ffd5b505050506040513d5f823e3d601f19601f820116820180604052508101906104959190610b94565b9050806040516020016104a89190610c5f565b60405160208183030381529060405291505090565b5f5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c1b45e996040518163ffffffff1660e01b8152600401602060405180830381865afa158015610528573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061054c9190610caa565b90508091505090565b5f5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166349fe1dd46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105c0573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906105e49190610cff565b90508091505090565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f819050919050565b5f61062f61062a610625846105ed565b61060c565b6105ed565b9050919050565b5f61064082610615565b9050919050565b5f61065182610636565b9050919050565b61066181610647565b82525050565b5f60208201905061067a5f830184610658565b92915050565b5f819050919050565b61069281610680565b82525050565b5f6020820190506106ab5f830184610689565b92915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6106f3826106b1565b6106fd81856106bb565b935061070d8185602086016106cb565b610716816106d9565b840191505092915050565b5f6020820190508181035f83015261073981846106e9565b905092915050565b5f61074b826105ed565b9050919050565b61075b81610741565b82525050565b5f6020820190506107745f830184610752565b92915050565b5f819050919050565b61078c8161077a565b82525050565b5f6020820190506107a55f830184610783565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f6107cf826107ab565b6107d981856107b5565b93506107e98185602086016106cb565b6107f2816106d9565b840191505092915050565b5f6020820190508181035f83015261081581846107c5565b905092915050565b5f819050919050565b61082f8161081d565b82525050565b5f6020820190506108485f830184610826565b92915050565b5f8115159050919050565b6108628161084e565b82525050565b5f60208201905061087b5f830184610859565b92915050565b5f604051905090565b5f5ffd5b5f5ffd5b61089b81610680565b81146108a5575f5ffd5b50565b5f815190506108b681610892565b92915050565b5f602082840312156108d1576108d061088a565b5b5f6108de848285016108a8565b91505092915050565b5f5ffd5b5f5ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610925826106d9565b810181811067ffffffffffffffff82111715610944576109436108ef565b5b80604052505050565b5f610956610881565b9050610962828261091c565b919050565b5f67ffffffffffffffff821115610981576109806108ef565b5b61098a826106d9565b9050602081019050919050565b5f6109a96109a484610967565b61094d565b9050828152602081018484840111156109c5576109c46108eb565b5b6109d08482856106cb565b509392505050565b5f82601f8301126109ec576109eb6108e7565b5b81516109fc848260208601610997565b91505092915050565b5f60208284031215610a1a57610a1961088a565b5b5f82015167ffffffffffffffff811115610a3757610a3661088e565b5b610a43848285016109d8565b91505092915050565b610a5581610741565b8114610a5f575f5ffd5b50565b5f81519050610a7081610a4c565b92915050565b5f60208284031215610a8b57610a8a61088a565b5b5f610a9884828501610a62565b91505092915050565b610aaa8161077a565b8114610ab4575f5ffd5b50565b5f81519050610ac581610aa1565b92915050565b5f60208284031215610ae057610adf61088a565b5b5f610aed84828501610ab7565b91505092915050565b5f67ffffffffffffffff821115610b1057610b0f6108ef565b5b610b19826106d9565b9050602081019050919050565b5f610b38610b3384610af6565b61094d565b905082815260208101848484011115610b5457610b536108eb565b5b610b5f8482856106cb565b509392505050565b5f82601f830112610b7b57610b7a6108e7565b5b8151610b8b848260208601610b26565b91505092915050565b5f60208284031215610ba957610ba861088a565b5b5f82015167ffffffffffffffff811115610bc657610bc561088e565b5b610bd284828501610b67565b91505092915050565b5f81905092915050565b5f610bef826107ab565b610bf98185610bdb565b9350610c098185602086016106cb565b80840191505092915050565b7f20576f726c6400000000000000000000000000000000000000000000000000005f82015250565b5f610c49600683610bdb565b9150610c5482610c15565b600682019050919050565b5f610c6a8284610be5565b9150610c7582610c3d565b915081905092915050565b610c898161081d565b8114610c93575f5ffd5b50565b5f81519050610ca481610c80565b92915050565b5f60208284031215610cbf57610cbe61088a565b5b5f610ccc84828501610c96565b91505092915050565b610cde8161084e565b8114610ce8575f5ffd5b50565b5f81519050610cf981610cd5565b92915050565b5f60208284031215610d1457610d1361088a565b5b5f610d2184828501610ceb565b9150509291505056fea2646970667358221220fcf3342562c738b6963b8da2b4de9c6b5479463cc71e49ba89115ef7ddb6fc7664736f6c634300081c00330000000000000000000000006025fe6b691f0d900a09368a501ceaadc8af4fd2",
}

// FluentABI is the input ABI used to generate the binding from.
// Deprecated: Use FluentMetaData.ABI instead.
var FluentABI = FluentMetaData.ABI

// FluentBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use FluentMetaData.Bin instead.
var FluentBin = FluentMetaData.Bin

// DeployFluent deploys a new Ethereum contract, binding an instance of Fluent to it.
func DeployFluent(auth *bind.TransactOpts, backend bind.ContractBackend, FluentRustAddress common.Address) (common.Address, *types.Transaction, *Fluent, error) {
	parsed, err := FluentMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(FluentBin), backend, FluentRustAddress)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Fluent{FluentCaller: FluentCaller{contract: contract}, FluentTransactor: FluentTransactor{contract: contract}, FluentFilterer: FluentFilterer{contract: contract}}, nil
}

// Fluent is an auto generated Go binding around an Ethereum contract.
type Fluent struct {
	FluentCaller     // Read-only binding to the contract
	FluentTransactor // Write-only binding to the contract
	FluentFilterer   // Log filterer for contract events
}

// FluentCaller is an auto generated read-only Go binding around an Ethereum contract.
type FluentCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// FluentTransactor is an auto generated write-only Go binding around an Ethereum contract.
type FluentTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// FluentFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type FluentFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// FluentSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type FluentSession struct {
	Contract     *Fluent           // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// FluentCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type FluentCallerSession struct {
	Contract *FluentCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// FluentTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type FluentTransactorSession struct {
	Contract     *FluentTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// FluentRaw is an auto generated low-level Go binding around an Ethereum contract.
type FluentRaw struct {
	Contract *Fluent // Generic contract binding to access the raw methods on
}

// FluentCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type FluentCallerRaw struct {
	Contract *FluentCaller // Generic read-only contract binding to access the raw methods on
}

// FluentTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type FluentTransactorRaw struct {
	Contract *FluentTransactor // Generic write-only contract binding to access the raw methods on
}

// NewFluent creates a new instance of Fluent, bound to a specific deployed contract.
func NewFluent(address common.Address, backend bind.ContractBackend) (*Fluent, error) {
	contract, err := bindFluent(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Fluent{FluentCaller: FluentCaller{contract: contract}, FluentTransactor: FluentTransactor{contract: contract}, FluentFilterer: FluentFilterer{contract: contract}}, nil
}

// NewFluentCaller creates a new read-only instance of Fluent, bound to a specific deployed contract.
func NewFluentCaller(address common.Address, caller bind.ContractCaller) (*FluentCaller, error) {
	contract, err := bindFluent(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &FluentCaller{contract: contract}, nil
}

// NewFluentTransactor creates a new write-only instance of Fluent, bound to a specific deployed contract.
func NewFluentTransactor(address common.Address, transactor bind.ContractTransactor) (*FluentTransactor, error) {
	contract, err := bindFluent(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &FluentTransactor{contract: contract}, nil
}

// NewFluentFilterer creates a new log filterer instance of Fluent, bound to a specific deployed contract.
func NewFluentFilterer(address common.Address, filterer bind.ContractFilterer) (*FluentFilterer, error) {
	contract, err := bindFluent(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &FluentFilterer{contract: contract}, nil
}

// bindFluent binds a generic wrapper to an already deployed contract.
func bindFluent(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := FluentMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Fluent *FluentRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Fluent.Contract.FluentCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Fluent *FluentRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Fluent.Contract.FluentTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Fluent *FluentRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Fluent.Contract.FluentTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Fluent *FluentCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Fluent.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Fluent *FluentTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Fluent.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Fluent *FluentTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Fluent.Contract.contract.Transact(opts, method, params...)
}

// FluentRust is a free data retrieval call binding the contract method 0x02a5ab90.
//
// Solidity: function fluentRust() view returns(address)
func (_Fluent *FluentCaller) FluentRust(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Fluent.contract.Call(opts, &out, "fluentRust")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// FluentRust is a free data retrieval call binding the contract method 0x02a5ab90.
//
// Solidity: function fluentRust() view returns(address)
func (_Fluent *FluentSession) FluentRust() (common.Address, error) {
	return _Fluent.Contract.FluentRust(&_Fluent.CallOpts)
}

// FluentRust is a free data retrieval call binding the contract method 0x02a5ab90.
//
// Solidity: function fluentRust() view returns(address)
func (_Fluent *FluentCallerSession) FluentRust() (common.Address, error) {
	return _Fluent.Contract.FluentRust(&_Fluent.CallOpts)
}

// GetRustAddress is a free data retrieval call binding the contract method 0x6422e42f.
//
// Solidity: function getRustAddress() view returns(address)
func (_Fluent *FluentCaller) GetRustAddress(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Fluent.contract.Call(opts, &out, "getRustAddress")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetRustAddress is a free data retrieval call binding the contract method 0x6422e42f.
//
// Solidity: function getRustAddress() view returns(address)
func (_Fluent *FluentSession) GetRustAddress() (common.Address, error) {
	return _Fluent.Contract.GetRustAddress(&_Fluent.CallOpts)
}

// GetRustAddress is a free data retrieval call binding the contract method 0x6422e42f.
//
// Solidity: function getRustAddress() view returns(address)
func (_Fluent *FluentCallerSession) GetRustAddress() (common.Address, error) {
	return _Fluent.Contract.GetRustAddress(&_Fluent.CallOpts)
}

// GetRustBool is a free data retrieval call binding the contract method 0xe55f0c4b.
//
// Solidity: function getRustBool() view returns(bool)
func (_Fluent *FluentCaller) GetRustBool(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _Fluent.contract.Call(opts, &out, "getRustBool")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// GetRustBool is a free data retrieval call binding the contract method 0xe55f0c4b.
//
// Solidity: function getRustBool() view returns(bool)
func (_Fluent *FluentSession) GetRustBool() (bool, error) {
	return _Fluent.Contract.GetRustBool(&_Fluent.CallOpts)
}

// GetRustBool is a free data retrieval call binding the contract method 0xe55f0c4b.
//
// Solidity: function getRustBool() view returns(bool)
func (_Fluent *FluentCallerSession) GetRustBool() (bool, error) {
	return _Fluent.Contract.GetRustBool(&_Fluent.CallOpts)
}

// GetRustBytes is a free data retrieval call binding the contract method 0x49ed8198.
//
// Solidity: function getRustBytes() view returns(bytes)
func (_Fluent *FluentCaller) GetRustBytes(opts *bind.CallOpts) ([]byte, error) {
	var out []interface{}
	err := _Fluent.contract.Call(opts, &out, "getRustBytes")

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// GetRustBytes is a free data retrieval call binding the contract method 0x49ed8198.
//
// Solidity: function getRustBytes() view returns(bytes)
func (_Fluent *FluentSession) GetRustBytes() ([]byte, error) {
	return _Fluent.Contract.GetRustBytes(&_Fluent.CallOpts)
}

// GetRustBytes is a free data retrieval call binding the contract method 0x49ed8198.
//
// Solidity: function getRustBytes() view returns(bytes)
func (_Fluent *FluentCallerSession) GetRustBytes() ([]byte, error) {
	return _Fluent.Contract.GetRustBytes(&_Fluent.CallOpts)
}

// GetRustBytes32 is a free data retrieval call binding the contract method 0x0a4243d1.
//
// Solidity: function getRustBytes32() view returns(bytes32)
func (_Fluent *FluentCaller) GetRustBytes32(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _Fluent.contract.Call(opts, &out, "getRustBytes32")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// GetRustBytes32 is a free data retrieval call binding the contract method 0x0a4243d1.
//
// Solidity: function getRustBytes32() view returns(bytes32)
func (_Fluent *FluentSession) GetRustBytes32() ([32]byte, error) {
	return _Fluent.Contract.GetRustBytes32(&_Fluent.CallOpts)
}

// GetRustBytes32 is a free data retrieval call binding the contract method 0x0a4243d1.
//
// Solidity: function getRustBytes32() view returns(bytes32)
func (_Fluent *FluentCallerSession) GetRustBytes32() ([32]byte, error) {
	return _Fluent.Contract.GetRustBytes32(&_Fluent.CallOpts)
}

// GetRustInt256 is a free data retrieval call binding the contract method 0x79d19bdc.
//
// Solidity: function getRustInt256() view returns(int256)
func (_Fluent *FluentCaller) GetRustInt256(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Fluent.contract.Call(opts, &out, "getRustInt256")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetRustInt256 is a free data retrieval call binding the contract method 0x79d19bdc.
//
// Solidity: function getRustInt256() view returns(int256)
func (_Fluent *FluentSession) GetRustInt256() (*big.Int, error) {
	return _Fluent.Contract.GetRustInt256(&_Fluent.CallOpts)
}

// GetRustInt256 is a free data retrieval call binding the contract method 0x79d19bdc.
//
// Solidity: function getRustInt256() view returns(int256)
func (_Fluent *FluentCallerSession) GetRustInt256() (*big.Int, error) {
	return _Fluent.Contract.GetRustInt256(&_Fluent.CallOpts)
}

// GetRustString is a free data retrieval call binding the contract method 0xb932773c.
//
// Solidity: function getRustString() view returns(string)
func (_Fluent *FluentCaller) GetRustString(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _Fluent.contract.Call(opts, &out, "getRustString")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetRustString is a free data retrieval call binding the contract method 0xb932773c.
//
// Solidity: function getRustString() view returns(string)
func (_Fluent *FluentSession) GetRustString() (string, error) {
	return _Fluent.Contract.GetRustString(&_Fluent.CallOpts)
}

// GetRustString is a free data retrieval call binding the contract method 0xb932773c.
//
// Solidity: function getRustString() view returns(string)
func (_Fluent *FluentCallerSession) GetRustString() (string, error) {
	return _Fluent.Contract.GetRustString(&_Fluent.CallOpts)
}

// GetRustUint256 is a free data retrieval call binding the contract method 0xdd37a798.
//
// Solidity: function getRustUint256() view returns(uint256)
func (_Fluent *FluentCaller) GetRustUint256(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Fluent.contract.Call(opts, &out, "getRustUint256")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetRustUint256 is a free data retrieval call binding the contract method 0xdd37a798.
//
// Solidity: function getRustUint256() view returns(uint256)
func (_Fluent *FluentSession) GetRustUint256() (*big.Int, error) {
	return _Fluent.Contract.GetRustUint256(&_Fluent.CallOpts)
}

// GetRustUint256 is a free data retrieval call binding the contract method 0xdd37a798.
//
// Solidity: function getRustUint256() view returns(uint256)
func (_Fluent *FluentCallerSession) GetRustUint256() (*big.Int, error) {
	return _Fluent.Contract.GetRustUint256(&_Fluent.CallOpts)
}
