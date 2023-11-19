import { useContext, useEffect, useState } from 'react';
import { Alchemy, Block, Nft, NftMetadataBatchToken, OwnedToken, TransactionResponse } from 'alchemy-sdk';
import { AlchemySDKSettings } from './contexts/AlchemySettings';
import { BlockContext } from './contexts/BlockContext';
import { TransactionContext } from './contexts/TransactionContext';


export function useLatestBlock(isRefresh: boolean) : [number | null, () => void] {
    const {apiKey, network} = useContext(AlchemySDKSettings);
    const [lastBlockNumber, setLastBlockNumber] = useState<number | null>(null);
    const [refresh, setRefresh] = useState<boolean>(isRefresh);

    function handleRefresh() {
        setRefresh(!refresh);
    }

    useEffect(() => {   
        const alchemy = new Alchemy({apiKey, network});
        async function getBlock() {
            setLastBlockNumber(await alchemy.core.getBlockNumber());
        }
      
        getBlock();
    }, [apiKey, network, refresh]);

    return [lastBlockNumber, handleRefresh];
}

export function useBlock(blockNumber: number) : Block | null {
    const {apiKey, network} = useContext(AlchemySDKSettings);
    const blockMap = useContext(BlockContext);
    const transactionContext = useContext(TransactionContext);
    const [block, setBlock] = useState<Block | null>(null);

    useEffect(() => {
        const alchemy = new Alchemy({apiKey, network});
        async function getBlock() {
            if (blockNumber <= 0) return;
            if (blockMap.has(blockNumber))
                return setBlock(blockMap.get(blockNumber) as Block);

            const fetchedBlock = await alchemy.core.getBlock(blockNumber);
            blockMap.set(blockNumber, fetchedBlock);
            if(blockMap.size > 10) {
                const keyArray = Array.from(blockMap.keys());
                const keyToDelete = keyArray.sort((a, b) => a - b)[0];
                blockMap.delete(keyToDelete);
                transactionContext.delete(keyToDelete);
            }
            setBlock(fetchedBlock);
        }
      
        getBlock();
    }, [blockNumber, apiKey, network, blockMap, transactionContext]);

    return block;
}

export function useTransactions(blockNumber: number) : TransactionResponse[] | null {
    const {apiKey, network} = useContext(AlchemySDKSettings);
    const transactionContext = useContext(TransactionContext);
    const [transactions, setTransactions] = useState<TransactionResponse[] | null>(null);

    useEffect(() => {
        const alchemy = new Alchemy({apiKey, network});
        async function getTransactions() {
            if (blockNumber <= 0) return;
            if (transactionContext.has(blockNumber))
                return setTransactions(transactionContext.get(blockNumber) as TransactionResponse[]);
            
            const fetchedTransactions = (await alchemy.core.getBlockWithTransactions(blockNumber)).transactions;
            transactionContext.set(blockNumber, fetchedTransactions);
            setTransactions(fetchedTransactions);
        }
      
        getTransactions();
    }, [blockNumber, apiKey, network, transactionContext]);

    return transactions;
}

export function useTransaction(hash: string) : TransactionResponse | null {
    const {apiKey, network} = useContext(AlchemySDKSettings);
    const [transaction, setTransaction] = useState<TransactionResponse | null>(null);

    useEffect(() => {
        const alchemy = new Alchemy({apiKey, network});
        async function getTransaction() {
            if (!hash) return;
                        
            const fetchedTransaction = await alchemy.core.getTransaction(hash);
            setTransaction(fetchedTransaction);
        }
      
        getTransaction();
    }, [hash, apiKey, network]);

    return transaction;
}

interface AccountInfo {
    isContract: boolean;
    balance: BigInt;
    tokens: OwnedToken[];
    }

export function useAccountInfo(address: string) : AccountInfo | undefined {
    const {apiKey, network} = useContext(AlchemySDKSettings);
    const [accountInfo, setAccountInfo] = useState<AccountInfo | undefined>(undefined);

    useEffect(() => {
        const alchemy = new Alchemy({apiKey, network});
        async function getAccountBalance() {
            let result : AccountInfo = {isContract: false, balance: BigInt(0), tokens: []};

            result.isContract = await alchemy.core.isContractAddress(address);
            result.balance = (await alchemy.core.getBalance(address)).toBigInt();
            result.tokens = (await alchemy.core.getTokensForOwner(address)).tokens;

            setAccountInfo(result);
        }
      
        getAccountBalance();
    }, [address, apiKey, network]);

    return accountInfo;
}

export function useNFTs(address: string, type: string) : Nft[] | undefined {
    const {apiKey, network} = useContext(AlchemySDKSettings);
    const [nfts, setNfts] = useState<Nft[] | undefined>(undefined);

    useEffect(() => {
        const alchemy = new Alchemy({apiKey, network});

        async function getOwnerNFTs() {
            const ownedNFTs = (await alchemy.nft.getNftsForOwner(address)).ownedNfts;
            const ntfs  = await getNftMetadataBatch(ownedNFTs);
            setNfts(ntfs);
        }

        async function getCollectionNFTs() {
            const collectionNFTs = (await alchemy.nft.getNftsForContract(address)).nfts;
            const ntfs  = await getNftMetadataBatch(collectionNFTs);
            setNfts(ntfs);
        }
      
        async function getNftMetadataBatch(nfts: Nft[]) {
            if (nfts.length === 0) return [];

            const batch = nfts.map((nft) => {
                return {
                    contractAddress: nft.contract.address,
                    tokenId: nft.tokenId,
                    tokenType: nft.tokenType
                };
            }) as NftMetadataBatchToken[];
            
            return await alchemy.nft.getNftMetadataBatch(batch);
        }

        (type === "owner") ? getOwnerNFTs() : getCollectionNFTs();
    }, [address, type, apiKey, network]);

    return nfts;
}