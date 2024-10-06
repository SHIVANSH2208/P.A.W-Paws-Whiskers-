const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'; // Replace with your deployed contract address
const contractABI = [
    // Replace with your contract ABI from Remix
];

// Function to Connect Wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            document.getElementById('walletStatus').innerText = `Connected: ${accounts[0]}`;
            console.log('MetaMask is connected!');
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        alert('Please install MetaMask!');
    }
}

// Function to Reward Users
async function rewardUser(amount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.rewardUser(await signer.getAddress(), ethers.utils.parseUnits(amount.toString(), 18));
        await tx.wait();
        console.log('User rewarded successfully!');
        alert('User rewarded successfully!');
    } catch (error) {
        console.error('Error rewarding user:', error);
    }
}

// Event Listeners
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
document.getElementById('rewardButton').addEventListener('click', function() {
    rewardUser(10);  // Reward 10 PetCoins
});
