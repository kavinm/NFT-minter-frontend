import React, { useState, useEffect } from "react";
import MintingForm from "./MintingForm";
import { Button, message } from "antd";
import MintOneNFT from "./MintOneNFT";

const MintPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      message.error("Make sure you have metamask", 3);
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      message.info(`Connected to ${account}`, 3);

      setCurrentAccount(account);
    } else {
      message.error("No authorized account found", 3);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        message.error("Get MetaMask!", 3);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      message.success(`Connected ${accounts[0]}`);

      //check if user is connected to rinkeby
      const rinkebyChainId = "0x4";
      let chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Test Network!");
        return;
      }

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const renderNotConnectedContainer = (
    <div>
      <Button onClick={connectWallet} style={{ flex: "0 0 120px" }}>
        Connect to Metamask
      </Button>
    </div>
  );

  return (
    <>{currentAccount === "" ? renderNotConnectedContainer : <MintingForm address={currentAccount} />}</>
  );
};

export default MintPage;
