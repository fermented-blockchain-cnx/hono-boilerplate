import { JsonRpcProvider } from '@ethersproject/providers'
import { DustBoyNFT, DustBoyNFT__factory } from '../typechain'
import { providers } from './utils'

async function main() {
  const network = 4
  const provider = new JsonRpcProvider({ url: providers[network] })
  const contract: DustBoyNFT = DustBoyNFT__factory.connect('0xCc9260CA4f41D04db0cfd9529a406607E9988EC5', provider)
  console.log('max supply')
  console.log(await (await contract.MAX_SUPPLY()).toNumber())
}

main()
