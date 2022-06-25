import { JsonRpcProvider } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'
import { getContentFromKVAsset } from 'hono/utils/cloudflare'
import { DustBoyNFT, DustBoyNFT__factory } from '../typechain'
import { providers } from './utils'
const app = new Hono()

app.use('*', poweredBy())
app.use('*', prettyJSON())
app.use('*', cors())

const network = 4

app.get('/hello', async (c) => {
  const buffer = await getContentFromKVAsset(`hello.txt`)
  const content = new TextDecoder().decode(buffer)
  return c.json({ yay: content })
})

app.get('/', async (c) => {
  const provider = new JsonRpcProvider({
    url: providers[network],
    skipFetchSetup: true,
  })
  const contract: DustBoyNFT = DustBoyNFT__factory.connect('0xCc9260CA4f41D04db0cfd9529a406607E9988EC5', provider)
  console.log(await contract.MAX_SUPPLY())
  return c.json({ hello: 'world' })!
})

app.get('/balance/jfin/:id', async (c) => {
  const provider = new JsonRpcProvider({
    url: providers[3501],
    skipFetchSetup: true,
  })

  const balance:BigNumber = await provider.getBalance(c.req.param('id'))
  const out = utils.formatEther(balance)
  const outFloat = parseFloat(out)

  return c.text(outFloat.toFixed(2))
})

app.fire()
