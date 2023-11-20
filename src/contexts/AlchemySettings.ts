import { createContext } from 'react';
import { Network } from 'alchemy-sdk';

// security The api key is in cleartext, never do this in production
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_ARBITRUM_SEPOLIA_API_KEY,
    network: Network.ARB_SEPOLIA,
  }

export const AlchemySDKSettings = createContext(settings);