import React, { useState } from "react";
import { ethers } from "ethers";
import a from "./ERC20abi.json";

const ContractInteraction = () => {
  const contractAddress = "0x6F8DAD5eA3443004BC72466A81602010B6e0BF7A"; // Replace with your actual contract address
  const contractAbi = a; // Paste your ABI here

  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyType, setPropertyType] = useState(0);
  const [propertyId, setPropertyId] = useState(0);
  const [complaint, setComplaint] = useState("");
  const [tenantAddress, setTenantAddress] = useState("");
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [complaintIndex, setComplaintIndex] = useState("");

  const addProperty = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    try {
      await contract.addProperty(propertyAddress, propertyType);
      console.log("Property added successfully.");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const startagreemant = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    try {
      await contract.startAgreemant(
        tenantAddress,
        propertyId,
        startDate,
        endDate
      ); // Replace with actual tenant address
      console.log("agreemant started successfully.");
    } catch (error) {
      console.error("Error starting agreemant:", error);
    }
  };

  const endAgreemant = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    try {
      await contract.endAgreemant(propertyId);
      console.log("agreemant ended successfully.");
    } catch (error) {
      console.error("Error ending agreemant:", error);
    }
  };

  const fileCompliant = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    try {
      await contract.fileCompliant(propertyId, complaint);
      console.log("Complaint filed successfully.");
    } catch (error) {
      console.error("Error filing complaint:", error);
    }
  };
  const givePenalty = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    try {
      await contract.givePenalty(userAddress);
      console.log("Penalty given successfully.");
    } catch (error) {
      console.error("Error giving penalty:", error);
    }
  };

  const releasePenalty = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    try {
      await contract.releasePenalty(userAddress);
      console.log("Penalty released successfully.");
    } catch (error) {
      console.error("Error releasing penalty:", error);
    }
  };

  const solveComplaint = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    try {
      await contract.solveComplaint(complaintIndex, propertyId);
      console.log("Complaint solved successfully.");
    } catch (error) {
      console.error("Error solving complaint:", error);
    }
  };

  return (
    <div className="bg-black">
      <h2 className="text-2xl font-semibold text-gray-400 text-center mb-8">
        Smart Contract Interaction
      </h2>

      {/* Add Property Section */}
      <div className="mt-4 p-4">
        <h3 className="text-xl font-semibold text-gray-400 text-center">
          Add Property
        </h3>
        <form onSubmit={addProperty}>
          <div className="my-3">
            <label className="block text-gray-400">Property Address:</label>
            <input
              type="text"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <div className="my-3">
            <label className="block text-gray-400">Property Type:</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            >
              <option value="0">HOUSE</option>
              <option value="1">OFFICE</option>
            </select>
          </div>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Add Property
            </button>
          </footer>
        </form>
      </div>

      {/* Start agreemant Section */}
      <div className="mt-4 p-4">
        <h3 className="text-xl font-semibold text-gray-400 text-center">
          Start agreemant
        </h3>
        <form onSubmit={startagreemant}>
          <div className="my-3">
            <label className="block text-gray-400">Property ID:</label>
            <input
              type="number"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <div className="my-3">
            <label className="block text-gray-400">Tenant Address:</label>
            <input
              type="text"
              value={tenantAddress}
              onChange={(e) => setTenantAddress(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <div className="my-3">
            <label className="block text-gray-400">Start Date:</label>
            <input
              type="number"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <div className="my-3">
            <label className="block text-gray-400">End Date:</label>
            <input
              type="number"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Start agreemant
            </button>
          </footer>
        </form>
      </div>

      {/* End agreemant Section */}
      <div className="mt-4 p-4">
        <h3 className="text-xl font-semibold text-gray-400 text-center">
          End agreemant
        </h3>
        <form onSubmit={endAgreemant}>
          <div className="my-3">
            <label className="block text-gray-400">Property ID:</label>
            <input
              type="number"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              End Agreement
            </button>
          </footer>
        </form>
      </div>

      {/* File Complaint Section */}
      <div className="mt-4 p-4">
        <h3 className="text-xl font-semibold text-gray-400 text-center">
          File Complaint
        </h3>
        <form onSubmit={fileCompliant}>
          <div className="my-3">
            <label className="block text-gray-400">Property ID:</label>
            <input
              type="number"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <div className="my-3">
            <label className="block text-pruple-400">Complaint:</label>
            <input
              type="text"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              File Complaint
            </button>
          </footer>
        </form>
      </div>
      <div className="mt-4 p-4">
        <h3 className="text-xl font-semibold text-gray-400 text-center">
          Solve Complaint
        </h3>
        <form onSubmit={solveComplaint}>
          <div className="my-3">
            <label className="block text-gray-400">Complaint Index:</label>
            <input
              type="number"
              value={complaintIndex}
              onChange={(e) => setComplaintIndex(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <div className="my-3">
            <label className="block text-gray-400">PropertyId:</label>
            <input
              type="number"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Solve Complaint
            </button>
          </footer>
        </form>
      </div>
      <div className="mt-4 p-4">
        <h3 className="text-xl font-semibold text-gray-400 text-center">
          Give Penalty
        </h3>
        <form onSubmit={givePenalty}>
          <div className="my-3">
            <label className="block text-gray-400">User Address:</label>
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Give Penalty
            </button>
          </footer>
        </form>
      </div>

      {/* Release Penalty Section */}
      <div className="mt-4 p-4">
        <h3 className="text-xl font-semibold text-gray-400 text-center">
          Release Penalty
        </h3>
        <form onSubmit={releasePenalty}>
          <div className="my-3">
            <label className="block text-gray-400">User Address:</label>
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              className="input input-bordered w-full focus:ring focus:outline-none"
            />
          </div>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Release Penalty
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default ContractInteraction;
