import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const TOKEN_MINT = new PublicKey("MonotXHqte5ASpr3KS1TYRUjR3EWeXGLxFvupsKBkMG");
export const TOKEN_DECIMALS = 10 ** 9;
export const MIN_SOL_BALANCE = 0.01;
export const COIN_PRICE = 0.1;
export const INVENTORY = [
    {
        item_id: 1,
        amount: 45
    },
    {
        item_id: 2,
        amount: 10
    },
    {
        item_id: 3,
        amount: 24
    },
    {
        item_id: 4,
        amount: 6
    }
];
export const ITEMS =[
    {
        id: 1,
        token_name: 'TSF SEEDS',
        token_address: 'sEedsCkfvPzjnfPNWVJAeNkNZf8yWTwZF3jh42R4X25',
        logo: 'sEedsCkfvPzjnfPNWVJAeNkNZf8yWTwZF3jh42R4X25.jpg',
        decimals: 3,
        symbol: 'SEEDS',
        amount: 3
    },
    {
        id: 2,
        token_name: 'TSF SEEDS',
        token_address: 'sEedsCkfvPzjnfPNWVJAeNkNZf8yWTwZF3jh42R4X25',
        logo: 'sEedsCkfvPzjnfPNWVJAeNkNZf8yWTwZF3jh42R4X25.jpg',
        decimals: 3,
        symbol: 'SEEDS',
        amount: 5,
    },
    {
        id: 3,
        token_name: 'TSF SEEDS',
        token_address: 'sEedsCkfvPzjnfPNWVJAeNkNZf8yWTwZF3jh42R4X25',
        logo: 'sEedsCkfvPzjnfPNWVJAeNkNZf8yWTwZF3jh42R4X25.jpg',
        decimals: 3,
        symbol: 'SEEDS',
        amount: 20,
    },
    {
        id: 4,
        token_name: 'TSF SEEDS',
        token_address: 'sEedsCkfvPzjnfPNWVJAeNkNZf8yWTwZF3jh42R4X25',
        logo: 'sEedsCkfvPzjnfPNWVJAeNkNZf8yWTwZF3jh42R4X25.jpg',
        decimals: 3,
        symbol: 'SEEDS',
        amount: 50,
    }
];