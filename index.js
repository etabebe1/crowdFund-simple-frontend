import { ethers } from "./ethers-6.7.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const withdrawButton = document.getElementById("withdrawButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const responseMessage = document.getElementById("responseMessage")
const ethAmountInput = document.getElementById("ethAmount")

connectButton.onclick = connect
withdrawButton.onclick = withdraw
fundButton.onclick = fund
balanceButton.onclick = getBalance

// Display response message
function displayMessage(message, type = "info") {
  responseMessage.style.color = type === "error" ? "red" : "green"
  responseMessage.textContent = message
}

// Connect to MetaMask
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
      connectButton.innerHTML = "Connected"
      displayMessage("Wallet connected successfully!")
    } catch (error) {
      console.error(error)
      displayMessage("Failed to connect wallet", "error")
    }
  } else {
    connectButton.innerHTML = "Please install MetaMask"
    displayMessage("MetaMask is not installed", "error")
  }
}

// Withdraw function
async function withdraw() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      displayMessage("Processing withdrawal...")
      const transactionResponse = await contract.withdraw()
      await transactionResponse.wait(1)
      displayMessage("Withdrawal successful!")
    } catch (error) {
      console.error(error)
      displayMessage("Error during withdrawal", "error")
    }
  } else {
    displayMessage("MetaMask is not installed", "error")
  }
}

// Fund function
async function fund() {
  const ethAmount = ethAmountInput.value
  if (typeof window.ethereum !== "undefined" && ethAmount > 0) {
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      displayMessage(`Funding with ${ethAmount} ETH...`)
      const transactionResponse = await contract.fund({
        value: ethers.parseEther(ethAmount),
      })
      await transactionResponse.wait(1)
      displayMessage(`Successfully funded with ${ethAmount} ETH!`)
    } catch (error) {
      console.error(error)
      displayMessage("Error during funding", "error")
    }
  } else {
    displayMessage("Invalid ETH amount or MetaMask not connected", "error")
  }
}

// Get balance function
async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum)

    try {
      const balance = await provider.getBalance(contractAddress)
      const formattedBalance = ethers.formatEther(balance)
      displayMessage(`Contract Balance: ${formattedBalance} ETH`)
      console.log(formattedBalance)
    } catch (error) {
      console.error(error)
      displayMessage("Error fetching balance", "error")
    }
  } else {
    displayMessage("MetaMask is not installed", "error")
  }
}
