<template>
    <vue-metamask @onComplete="onMetamaskComplete" ref="metamask" :initConnect="true"></vue-metamask>
    <slot :action="mint" name="mintButton">
        <button @click="mint">Mint</button>
    </slot>
</template>

<script>
function poll(fn, timeout, interval = 100) {
    const endTime = Number(new Date()) + (timeout);

    const checkCondition = async function (resolve, reject) {
        const { result, status } = await fn();
        if (status) {
            resolve(result);
        } else if (Number(new Date()) < endTime) {
            setTimeout(checkCondition, interval, resolve, reject);
        } else {
            reject(new Error("timed out for ".concat(fn)));
        }
    };

    return new Promise(checkCondition);
}

const hexContractResultArrayOfInts = (hex) =>
    hex === null ? [null] : hex.match(/.{1,64}/g).map((str) => parseInt(str, 16));

const GetTransactionInfoById = async (txid, TronWeb) =>
    poll(
        async () => {
            const result = await TronWeb.trx.getUnconfirmedTransactionInfo(txid);
            return {
                result,
                status: Object.keys(result).length > 0,
            };
        },
        100000,
        1000
    )
        .then((r) => (r.receipt.result === "SUCCESS" ? r.contractResult[0] : null))
        .catch(() => null);

const networkNames = {
    'BEP20': 'Binance Smart Chain', 
};

import VueMetamask from 'vue-metamask';
export default {
    props: {
        /**
         * 'TRC20' | 'ERC20' | 'BEP20'
         */
        network: String,
    },
    data() {
        return {
            web3: null,
            metaMaskAddress: null,
        }
    },
    computed: {
        networkName() {
            return networkNames[this.network];
        }
    },
    components: {
        VueMetamask,
    },
    methods: {
        onMetamaskComplete({ web3, metaMaskAddress }) {
            this.web3 = web3;
            this.metaMaskAddress = metaMaskAddress;
        },
        async mint() {
            switch (this.network) {
                case 'ERC20':
                case 'BEP20':
                    return await this.mintMetamask();
                case 'TRC20':
                    return await this.mintTronWeb();
            }
        },
        async mintTronWeb() {
            const tronWeb = window.tronWeb;

            if (!tronWeb) {
                throw new Error('No tronweb instance');
            }

            if (!tronWeb.ready || !tronWeb.contract) {
                throw new Error('Not connected');
            }

            const contract = require("./abi/TokenERC721.json");

            const nftContract = await tronWeb.contract(contract.abi, this.CONTRACTS[this.network])

            const mintingPrice = await nftContract.mintingPrice().call();

            const txid = await nftContract.mint().send({
                callValue: mintingPrice,
                shouldPollResponse: false
            });

            let tokenId = null;

            [tokenId] = hexContractResultArrayOfInts(
                await GetTransactionInfoById(txid, tronWeb)
            );

            if (!tokenId) {
                console.error({ mintResult });
                throw new Error('mintResult status is not true')
            }

            return {
                tokenId,
                contractAddress: this.CONTRACTS[this.network],
            }
        },
        async mintMetamask() {
            await this.$refs.metamask.init();

            const contract = require("./abi/TokenERC721.json");
            let mintingPrice = 0;
            let nftContract = null;
            try {
                nftContract = new this.web3.eth.Contract(contract.abi, this.CONTRACTS[this.network]);
                mintingPrice = await nftContract.methods.mintingPrice().call();
            } catch (ex) {
                this.$toast.error('Please make sure you\'ve Signed in Metamask. And the NETWORK is "' + this.networkName + '"');
                return;
            }

            try {
                const mintResult = await nftContract.methods.mint().send({
                    value: mintingPrice,
                    from: this.metaMaskAddress,
                });

                if (mintResult.status !== true) {
                    console.error({ mintResult });
                    throw new Error('mintResult status is not true')
                }
            } catch (ex) {
                console.error(ex);
                this.$toast.error('Transaction was failed. Network: "' + this.networkName + '"');
                return;
            }

            const tokenId = mintResult.events.Mint.returnValues[0];

            return {
                tokenId,
                contractAddress: this.CONTRACTS[this.network],
            }
        }
    }
}
</script>