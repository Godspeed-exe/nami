import { NODE } from './config';
// import secrets from 'secrets';
import { version } from '../../package.json';

const networkToProjectId = {
  local: "123",
};

export default {
  api: {
    ipfs: 'https://ipfs.blockfrost.dev/ipfs',
    base: (node = NODE.mainnet) => node,
    header: { ['dummy']: version },
    key: (network = 'mainnet') => ({
      project_id: networkToProjectId[network],
    }),
    price: (currency = 'usd') =>
      fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=${currency}`
      )
        .then((res) => res.json())
        .then((res) => res.cardano[currency]),
  },
};
