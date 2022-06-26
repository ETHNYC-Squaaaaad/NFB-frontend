import Layout from './components/Layout'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

function App() {
  console.log(chain)
  const { chains, provider } = configureChains(
    [
      chain.mainnet,
      chain.hardhat,
      chain.optimism,
      chain.arbitrum,
      chain.polygon,
    ],
    [publicProvider()],
  )

  const { connectors } = getDefaultWallets({
    appName: 'True Governance',
    chains,
  })

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
