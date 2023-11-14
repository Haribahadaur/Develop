// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract SimpleStorage{

    uint public  num = 200;

    function setter(uint _num)public {
        num=_num;
    }

    function getter()public  view returns (uint){
        return num;
    }
}