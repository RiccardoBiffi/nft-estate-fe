import { createContext } from 'react';
import { TransactionResponse } from 'alchemy-sdk';


export const TransactionContext = createContext(new Map<number, TransactionResponse[]>());