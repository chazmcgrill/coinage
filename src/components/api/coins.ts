import config from "../../utils/config";
import fetcher from "../../utils/fetcher";

export interface Coin {
    id: number;
    price: {
        GBP: string,
        USD: string,
    };
    showing: boolean;
    code: string;
    name: string;
    imageURL: string;
}

export const fetchCoinData = () => fetcher('get', config.apiUrl, 'data/all/coinlist');

export const fetchCoinPrice = (coinCodes: string[]) => fetcher('get', config.apiUrl, `data/pricemulti?fsyms=${coinCodes.join(',')}&tsyms=USD,GBP`);