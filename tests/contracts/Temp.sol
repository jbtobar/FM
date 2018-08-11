pragma solidity ^0.4.21;

contract Temp {
  address owner;
  modifier ownerOnly() {
    if (owner == msg.sender) _;
  }
  struct data {
    uint a;
    uint b;
    uint[] arr;
  }

  data d1;
  uint[] arr;
  data[] darr;

  constructor() public {
    owner = msg.sender;
    d1.a = 255;
    d1.b = 8191;
    d1.arr.length = 12;
    for (uint32 i = 0; i < 12; i++) d1.arr[i] = i;
    arr.length = 10;
    for (i = 0; i < 10; i++) arr[i] = i;
    darr.length = 5;
    for (i = 0; i < 5; i++) {
      darr[i].arr.length = 10;
      for (uint32 j = 0; j < 10; j++) darr[i].arr[j] = j;
    }
  }

  function GetA() public view returns (uint) {
    return d1.a;
  }
  function GetB() public view returns (uint) {
    return d1.b;
  }
  function SetA(uint a) ownerOnly() public {
    d1.a = a;
  }
  function SetB(uint b) ownerOnly() public {
    d1.b = b;
  }

  function Getd1() public view returns (uint, uint) {
    return (d1.a, d1.b);
  }

  function SetArr(uint ind, uint val) ownerOnly() public {
    arr[ind] = val;
  }
  function GetArr(uint ind) public view returns (uint) {
    return arr[ind];
  }

  function SetD1Arr(uint ind, uint val) ownerOnly() public {
    d1.arr[ind] = val;
  }
  function GetD1Arr(uint ind) public view returns (uint d1arrind) {
    d1arrind = d1.arr[ind];
  }

  function SetDarr (uint ind, uint a, uint b, uint arrind, uint arrval) ownerOnly() public {
    darr[ind].a = a;
    darr[ind].b = b;
    darr[ind].arr[arrind] = arrval;
  }

  function GetDarr (uint ind, uint arrind) public view returns (uint, uint, uint) {
    return (darr[ind].a, darr[ind].b, darr[ind].arr[arrind]);
  }
}

