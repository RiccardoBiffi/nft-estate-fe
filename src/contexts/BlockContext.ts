import { createContext } from 'react';
import { Block } from 'alchemy-sdk';


export const BlockContext = createContext(new Map<number, Block>());