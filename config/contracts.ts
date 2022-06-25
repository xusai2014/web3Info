// @ts-nocheck
import {ChainId} from '@usedapp/core'
import {Contract} from '@ethersproject/contracts'
import NewsChampion_ABI from './abi/v0.0.1/NewsChampion.json'
import NiuToken_ABI from './abi/v0.0.1/NiuToken.json'
import NewsNFT_ABI from './abi/v0.0.1/NewsNFT.json'

export const CHAIN_ID = parseInt(process.env.APP_CHAIN_ID ?? '4') as ChainId
export const NewsNFTAddress =
    {
        [ChainId.Rinkeby]: process.env.ABI_NewsNFT,
    }[CHAIN_ID] ?? ''

export const NiuTokenAddress =
    {
        [ChainId.Rinkeby]: process.env.ABI_NiuToken,
    }[CHAIN_ID] ?? ''

export const NewsChampionAddress =
    {
        [ChainId.Rinkeby]: process.env.ABI_NewsChampion,
    }[CHAIN_ID] ?? ''


export const CONTRACTS = {
    NewsNFT: new Contract(NewsNFTAddress, NewsNFT_ABI),
    NiuToken: new Contract(NiuTokenAddress, NiuToken_ABI),
    NewsChampion: new Contract(NewsChampionAddress, NewsChampion_ABI),
}

