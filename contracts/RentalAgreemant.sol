// SPDX-License-Identifier: MIT
pragma solidity >0.8.2 <0.9.0;

contract RentalAgreemant {
    address owner;
    constructor(){
        owner = msg.sender;
    }
    uint propertyId = 1;
    mapping (address => mapping (uint => Property)) propertyList;
    mapping (uint => Agreemant) agreemanList;
    mapping (uint => Complaint[] ) complaints;
    mapping (address => bool) penaltyList;

    struct Agreemant {
        address landlord;
        address tenant;
        uint propertyId;
        uint startDate;
        uint endDate;
        bool landlordEnd;
        bool tenantEnd;
    }
    struct Property {
        string propertyAdress;
        Type propertyType;
        bool isActive;
    }

    struct Complaint {
        uint propertyId;
        bool resolved;
        string details;
    }

    enum Type {
        HOUSE, OFFICE
    }

    function addProperty(string memory _address, Type _type) public {
        require(bytes(_address).length > 0, "Address cannot be empty!");
        require(!penaltyList[msg.sender], "You have penalty!");
        Property memory _theProperty = Property({propertyAdress: _address, propertyType: _type, isActive: false});
        propertyList[msg.sender][propertyId] = _theProperty;
        propertyId += 1;
    }

    function startAgreemant(address _tenant, uint _propertyId, uint _startDate, uint _endDate ) public   {

        require(bytes(propertyList[msg.sender][_propertyId].propertyAdress).length >0 , "You do not own such a property!");
        require(agreemanList[_propertyId].endDate < block.timestamp, "Property is already rented!" );
        require(msg.sender != _tenant, "You cannot rent your property yourself!");
        require(!penaltyList[_tenant] && ! penaltyList[msg.sender], "Tenant or Landlord has penalty!");
        require(_startDate >= block.timestamp, "Start date cannot be past time!");
        require(_endDate > _startDate, "End day must become after start date!");
        Agreemant memory theAgreemant = Agreemant({landlord:msg.sender, tenant: _tenant,
         propertyId: _propertyId, startDate:_startDate, endDate:_endDate, tenantEnd:false, landlordEnd: false});
        agreemanList[_propertyId] = theAgreemant;
        
    }
    
    function endAgreemant(uint _propertyId) public {
        require(agreemanList[_propertyId].propertyId > 0, "There is no such agreemant!");
        if (msg.sender == agreemanList[_propertyId].landlord) {
            if (agreemanList[_propertyId].tenantEnd) {
                agreemanList[_propertyId]= Agreemant({landlord: address(0), tenant: address(0), 
                startDate:0, endDate:0, propertyId:0, landlordEnd:false, tenantEnd: false});
                return;
            }
            else {
                agreemanList[_propertyId].landlordEnd = true;
                return;
            }
        }
        if (msg.sender == agreemanList[_propertyId].tenant) {
            if (agreemanList[_propertyId].endDate > block.timestamp - 15 days) {
                agreemanList[_propertyId]= Agreemant({landlord: address(0), tenant: address(0), 
                startDate:0, endDate:0, propertyId:0, landlordEnd:false, tenantEnd: false});
                return;
            }
            else if (agreemanList[_propertyId].landlordEnd) {
                agreemanList[_propertyId]= Agreemant({landlord: address(0), tenant: address(0), 
                startDate:0, endDate:0, propertyId:0, landlordEnd:false, tenantEnd: false});
                return;
            }
            else {
                agreemanList[_propertyId].tenantEnd = true;
                return;
            }
        }
        revert("You are nieghter landlord nor tenant!");
    }

    function fileCompliant(uint _propertyId,  string memory _complaint) public {
        require(msg.sender == agreemanList[_propertyId].landlord || msg.sender == agreemanList[_propertyId].tenant, 
        "You are nigther tenant nor landlord of this property!");
        Complaint memory theComplaint = Complaint({propertyId:_propertyId, details:_complaint, resolved: false});
        complaints[_propertyId].push(theComplaint);
    }

    function solveComplaint(uint _complaintIndexOfProperty, uint _propertyId) public{
        require(msg.sender == owner, "Only owner can solve compliants!");
        require(complaints[_propertyId][_complaintIndexOfProperty].resolved == false, 
        "The complaint is already resolved or there is no such complaint!");
        complaints[_propertyId][_complaintIndexOfProperty].resolved = true;
    }
    function givePenalty(address user) public{
        require(msg.sender == owner, "Only owner can give penalty!");
        penaltyList[user] = true;
    }
    function releasePenalty(address user) public{
        require(msg.sender == owner, "Only ownerl can release penalty!");
        penaltyList[user] = false;
    }

}