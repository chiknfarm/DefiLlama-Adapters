const sdk = require("@defillama/sdk");
const abi = require("./abi.json");
const BigNumber = require("bignumber.js");

const EggContract = "0x7761E2338B35bCEB6BdA6ce477EF012bde7aE611";
const FeedContract = "0xab592d197ACc575D16C3346f4EB70C703F308D1E";


const avaxTvl = async (_, _ethBlock, chainBlocks) => {
    const stakedEggs = (
        await sdk.api.abi.call({
            abi: abi.TotalEggStaked,
            target: FeedContract,
            chain: "avax",
            block: chainBlocks["avax"],
        })
    ).output;
    let stakedAmt = new BigNumber(stakedEggs).toFixed(0);
    return {
        [EggContract]: stakedAmt
    };
};

module.exports = {
    avalanche: {
        methodology: "Tokens staked to gain Feed is counted as TVL",
        tvl: avaxTvl
    },
    tvl: avaxTvl
}