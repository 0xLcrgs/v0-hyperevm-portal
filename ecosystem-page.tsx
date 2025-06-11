"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { Globe, Search } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const projects = [
  {
    id: 1,
    name: "HyperSwap",
    description: "First HyperEVM native AMM DEX and Liquidity Hub",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.hyperswap.exchange/#/swap?referral=0xLcrgs",
    tags: ["DEX", "AMM"],
    logo: "https://pbs.twimg.com/profile_images/1818300103825719296/mE6pjX1x_400x400.jpg",
  },
  {
    id: 2,
    name: "KittenSwap",
    description: "Kittenswap is a community owned DEX on HyperEVM with ve(3,3) mechanics!",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.kittenswap.finance/points?referrer=0xE48c64Ec6cf456a28F91e5B2bdA3A626DEDCC8E5",
    tags: ["DEX", "ve(3,3)"],
    logo: "https://pbs.twimg.com/profile_images/1896932742190821376/xaZ_TDuY_400x400.jpg",
  },
  {
    id: 3,
    name: "Felix",
    description:
      "Felix is a suite of on-chain borrowing and lending products running on Hyperliquid L1. Our goal is to let anyone unlock liquidity or earn yield in a secure, risk-adjusted, and friction-free way.",
    categories: ["Lending", "CDP"],
    status: "Live",
    website: "https://usefelix.xyz?ref=18935567",
    tags: ["Lending", "Borrowing", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1845076293735297024/mx8MTMca_400x400.jpg",
  },
  {
    id: 7,
    name: "HyperLend",
    description:
      "HyperLend is a high-performance lending protocol on Hyperliquid EVM, built for capital efficiency. It offers real-time leverage, dynamic rates, and deep liquidity",
    categories: ["Lending"],
    status: "Live",
    website: "https://app.hyperlend.finance/?ref=0XLCRGS",
    tags: ["Lending", "Borrowing"],
    logo: "https://pbs.twimg.com/profile_images/1808617090602901504/VsTtyaqZ_400x400.jpg",
  },
  {
    id: 9,
    name: "HypurrFi",
    description: "HypurrFi is a leveraged lending marketplace for clean leverage loops on Hyperliquid.",
    categories: ["Lending", "CDP"],
    status: "Live",
    website: "https://app.hypurr.fi/buddies/0XLCRGS",
    tags: ["Lending", "Borrowing", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1882841326347005953/vewoJ4Vl_400x400.png",
  },
  {
    id: 4,
    name: "Harmonix Finance",
    description:
      "Harmonix Finance is a DeFi platform that transforms sophisticated hedge fund strategies into accessible and easy-to-use automated vaults, allowing users to optimize returns through various curated investment strategies.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.harmonix.fi/?ref=Bv2S47vd",
    tags: ["Yield", "Vaults", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1795360456686837760/dAl7G6dh_400x400.png",
  },
  {
    id: 5,
    name: "Hyperbeat",
    description:
      "Hyperbeat is a Hyperliquid native protocol that exists to scale HyperliquidX, HyperEVM (the people's L1) and the broader Hyperliquid Ecosystem.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.hyperbeat.org/earn?referral=FA86003B",
    tags: ["Yield", "Vaults"],
    logo: "https://pbs.twimg.com/profile_images/1879158343194796032/ftN7FT3s_400x400.jpg",
  },
  {
    id: 6,
    name: "Upshift",
    description:
      "Upshift is the first institutional DeFi yield platform. Access capital-efficient yield strategies used by DeFi funds.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.upshift.finance/r/dEc4C8A42A98",
    tags: ["Yield", "Vaults"],
    logo: "https://pbs.twimg.com/profile_images/1853600042952663040/AwOMmTi1_400x400.jpg",
  },
  {
    id: 15,
    name: "Looped Hype",
    description:
      "Looped Hype (LHYPE) is an automated looping protocol that maximizes yield on staked HYPE and other yield bearing tokens. Users simply deposit HYPE to get LHYPE, then behind the scenes the protocol uses an automated looping strategy to generate additional yield, on top of any network rewards earned from staking",
    categories: ["LST", "Yield"],
    status: "Live",
    website: "https://loopedhype.com/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1882460229184471040/eIGqevUG_400x400.jpg",
  },
  {
    id: 8,
    name: "Hyperpie",
    description:
      "Hyperpie is an integrated DeFi ecosystem built on Hypercore, composed of a Liquid Staking platform, a meme launchpad, and a meme DEX.",
    categories: ["LST"],
    status: "Live",
    website: "https://www.hyperliquid.magpiexyz.io/stake?ref=0xE48c64Ec6cf456a28F91e5B2bdA3A626DEDCC8E5",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1896957468963450884/5pbFwUx8_400x400.jpg",
  },
  {
    id: 16,
    name: "LiquidLaunch",
    description:
      "Create tokens and agents effortlessly, trade for profits seamlessly, all without writing a single line of code!",
    categories: ["Launchpad", "DEX"],
    status: "Live",
    website: "https://liquidlaunch.app/",
    tags: ["Launchpad", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1930956754810032128/WAE3Cju-_400x400.jpg",
  },
  {
    id: 10,
    name: "Laminar",
    description:
      "Laminar is a liquidity engine and aggregator connecting disparate liquidity on both HyperEVM and HyperCore to provide simple, optimally priced swaps.",
    categories: ["DEX"],
    status: "Live",
    website: "https://laminar.xyz/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1881501408022892544/RJdoM0TD_400x400.jpg",
  },
  {
    id: 11,
    name: "Hyperstable",
    description:
      "Hyperstable is a crypto-backed, over-collateralized and decentralized stablecoin that's designed to trade at one US Dollar. Built on HyperEVM.",
    categories: ["Lending", "CDP"],
    status: "Live",
    website: "https://app.hyperstable.xyz/r/0xLcrgs",
    tags: ["Lending", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1911431404476362753/WdVhBKDh_400x400.png",
  },
  {
    id: 13,
    name: "Keiko Finance",
    description:
      "Keiko is a permissionless borrowing protocol with dynamic interest rates and liquidation ratios on Hyperliquid",
    categories: ["Lending", "CDP"],
    status: "Live",
    website: "https://app.keikofinance.com/#",
    tags: ["Lending", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1857058088391454720/NtVLHJ1C_400x400.jpg",
  },
  {
    id: 12,
    name: "HyperYield",
    description: "Lend, Borrow, Earn at Hyper Speed on HyperLiquid L1",
    categories: ["Lending"],
    status: "Live",
    website: "https://app.hyperyield.com/?invite=UlTQLGpKXhcq",
    tags: ["Lending", "Borrowing"],
    logo: "https://pbs.twimg.com/profile_images/1878399390240411648/cp1BIbd6_400x400.jpg",
  },
  {
    id: 95,
    name: "Hypio",
    description:
      "Wealthy Hypio Babies are a cultural virus born from the Remiliasphere aiming to be one of the most recognizable and distinctive NFT project brands and community in the Hyperliquid eco. We aim to educate our holders about the HL eco and convert many current members of the HL to be a part of our hivemind.",
    categories: ["NFT"],
    status: "Live",
    website: "https://drip.trade/collections/hypio",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1876004126938537984/qpRkjcAX_400x400.jpg",
  },
  {
    id: 149,
    name: "PiP",
    description:
      "In a world where small things often go unnoticed, PiP reminds us that even the tiniest droplet can create waves of change. A community that values creativity, resilience, and the power of connection.",
    categories: ["NFT"],
    status: "Live",
    website: "https://piponhl.xyz/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1855964438337077248/IbcL6SH7_400x400.jpg",
  },
  {
    id: 19,
    name: "DeBridge",
    description: "Multichain bridge",
    categories: ["Bridge"],
    status: "Live",
    website: "https://app.debridge.finance/r/31599",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1894665537466040320/5vQrjq6M_400x400.jpg",
  },
  {
    id: 130,
    name: "Symbiosis",
    description: "A cross-chain engine and liquidity protocol.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://app.symbiosis.finance/swap?chainIn=Ethereum&tokenIn=ETH",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1882650528951541760/zdaKCf4K_400x400.jpg",
  },
  {
    id: 20,
    name: "HyBridge",
    description: "Your Hyperliquid Bridge. Fast, Seamless, and Ready to Connect Across EVM & SOL Chains.",
    categories: ["Bridge", "DEX"],
    status: "Live",
    website: "https://hybridge.xyz/?refUser=26daeda2",
    tags: ["Bridge", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1825570908666269703/-mT8SBx__400x400.jpg",
  },
  {
    id: 131,
    name: "Hypers",
    description: "Hypers by Drip.Trade, only on Hyperliquid",
    categories: ["NFT"],
    status: "Live",
    website: "https://drip.trade/collections/hypers",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1887077871975559168/ZTykoTWW_400x400.jpg",
  },
  {
    id: 119,
    name: "Garden",
    description: "Trustless peer-to-peer bitcoin bridge",
    categories: ["Bridge"],
    status: "Live",
    website: "https://garden.finance/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1884485129906839554/4CaD8YXg_400x400.jpg",
  },
  {
    id: 21,
    name: "Drip.Trade",
    description: "Leading native NFT exchange on HyperLiquid.",
    categories: ["NFT"],
    status: "Live",
    website: "https://drip.trade/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1925250244477952000/4Ju6lXOA_400x400.jpg",
  },
  {
    id: 22,
    name: "Unit",
    description: "Unit is the asset tokenization layer on Hyperliquid, enabling seamless deposits and withdrawals.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://app.hyperunit.xyz/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1890184998445047808/qgsh4B97_400x400.jpg",
  },
  {
    id: 72,
    name: "HyperWarp",
    description:
      "HyperWarp is a marketplace to unlock liquidity for vote-escrowed NFTs (veNFTs). Starting with veKitten",
    categories: ["NFT"],
    status: "Coming Soon",
    website: "https://www.hyperwarp.fi/",
    tags: ["NFT", "veNFT"],
    logo: "https://pbs.twimg.com/profile_images/1912684430440755200/tA0LNV_E_400x400.jpg",
  },
  {
    id: 146,
    name: "Resolv Labs",
    description:
      "Trustless stablecoin and low-risk crypto investments backed by the True-Delta Neutral Architecture.",
    categories: ["CDP"],
    status: "Live",
    website: "https://resolv.xyz/",
    tags: ["CDP"],
    logo: "https://pbs.twimg.com/profile_images/1726501525843841024/1gDrgTdA_400x400.jpg",
  },
  {
    id: 147,
    name: "USDhl",
    description:
      "USDhl is a treasury-backed stablecoin that will be available on both HyperCore and the HyperEVM. Accordingly, users will be able to trade it against USDC on a spot order book as well as use it across integrated DeFi applications.",
    categories: ["CDP"],
    status: "Live",
    website: "https://x.com/usd_hl",
    tags: ["CDP"],
    logo: "https://pbs.twimg.com/profile_images/1928111403551911936/rkFUzZ4Z_400x400.jpg",
  },
  {
    id: 32,
    name: "Jumper Exchange",
    description: "Crypto's Everything Exchange",
    categories: ["Bridge", "DEX"],
    status: "Live",
    website: "https://jumper.exchange/",
    tags: ["Bridge", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1889316674383282176/ulV41xZ7_400x400.jpg",
  },
  {
    id: 33,
    name: "The Hyperliquid Bridge",
    description:
      "The Hyperliquid Bridge is a dedicated bridge frontend for transferring your assets into HyperEVM and HyperCore from 120+ other blockchains",
    categories: ["Bridge"],
    status: "Live",
    website: "https://www.thehyperliquidbridge.xyz/transfer",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1779646801605242880/FrFssPAQ_400x400.jpg",
  },
  {
    id: 113,
    name: "Stargate",
    description:
      "Stargate is a composable cross-chain liquidity transport protocol enabling seamless asset transfers between blockchains. This documentation details its technical architecture, core primitives and integration guidelines for developers.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://stargate.finance/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1928147506699145217/n7-KQGNJ_400x400.png",
  },
  {
    id: 141,
    name: "Mayan",
    description:
      "Mayan is a cross-chain swap auction protocol designed to deliver optimal swap rates via a transparent, competitive bidding mechanism. To date, the Mayan team has implemented the protocol on SVM (Solana), EVM and Sui-Move, with additional implementations rolling out soon.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://swap.mayan.finance/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1891499635597856769/5BMo_JQJ_400x400.jpg",
  },
  {
    id: 140,
    name: "Catbal",
    description:
      "Catbal's premiere soulbound NFT collection is a love letter to Catbal contributors, a curated list of power users and/or bozos, a nostalgic snapshot of a specific time in the history of Hyperliquid.",
    categories: ["NFT"],
    status: "Live",
    website: "https://pawtrait.catbal.io/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1850834359114215425/DVGw_xNc_400x400.jpg",
  },
  {
    id: 142,
    name: "Purrtardio",
    description:
      "Purrtardio is a meme-driven, community-fueled experiment. We're not liable for your financial moves, your cat's sass, or blockchain chaos. Dive in with a grin and zero expectations. This applies to the whole whitepaper—welcome to the purrty!",
    categories: ["NFT"],
    status: "Live",
    website: "https://drip.trade/collections/purrtardio",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1902406438070448129/HiiYKhfx_400x400.jpg",
  },
  {
    id: 70,
    name: "Relay",
    description:
      "Instant, low-cost swapping, bridging and cross-chain execution on 80+ chains & counting. Built by Reservoir",
    categories: ["Bridge"],
    status: "Live",
    website: "https://relay.link/bridge",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1753515078316355584/uT6CssGo_400x400.jpg",
  },
  {
    id: 34,
    name: "Dextrabot",
    description:
      "Discover profitable traders, analyze their performance, and automatically copy their strategies with customizable risk settings.",
    categories: ["Bot"],
    status: "Live",
    website: "https://app.dextrabot.com/referral/0XLCRGS",
    tags: ["Bot", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1858644852365275136/EpQL8Nkb_400x400.jpg",
  },
  {
    id: 35,
    name: "D2 Finance",
    description:
      "D2 Finance is tokenizing real risk-adjusted returns / derivatives trades with a proven track record on-chain.",
    categories: ["Yield"],
    status: "Live",
    website: "https://d2.finance/",
    tags: ["Yield", "Vaults"],
    logo: "https://pbs.twimg.com/profile_images/1765931135308115968/f_4LkxDr_400x400.jpg",
  },
  {
    id: 36,
    name: "Hyperdrive",
    description:
      "The premier stablecoin money market on Hyperliquid and the foundational layer for making everything on HyperCore liquid.",
    categories: ["Lending", "Yield"],
    status: "Live",
    website: "https://app.hyperdrive.fi?ref=133A9FEB",
    tags: ["Lending", "Borrowing", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1903009623214526464/KLFqDb6j_400x400.jpg",
  },
  {
    id: 37,
    name: "Kinetiq",
    description: "Powering Liquid Staking on Hyperliquid.",
    categories: ["LST"],
    status: "Coming Soon",
    website: "https://kinetiq.xyz/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1880410606093647872/qazlkvcq_400x400.jpg",
  },
  {
    id: 38,
    name: "Liminal",
    description:
      "Liminal is a protocol that enables users to earn real and sustainable yield on their stablecoins through delta-neutral strategies",
    categories: ["Yield"],
    status: "Beta",
    website: "https://liminal.money/",
    tags: ["Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1894761111565533184/M0eLKU1u_400x400.jpg",
  },
  {
    id: 39,
    name: "Valantis",
    description:
      "An AMM designed specifically for LSTs, built around stHYPE. Never depegs, integrated natively with staking contracts, and assets earn extra yield on Hyperlend.",
    categories: ["LST", "DEX"],
    status: "Live",
    website: "https://www.valantis.xyz/",
    tags: ["LST", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1752754182572924928/I7hOaBLU_400x400.jpg",
  },
  {
    id: 110,
    name: "simpfor.fun",
    description: "Smart copy trading, grow your wealth on autopilot! powered by SOON.",
    categories: ["Bot"],
    status: "Live",
    website: "https://simpfor.fun/login?referralCode=GT3SH4",
    tags: ["Bot", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1824061692843802624/ypS4GORQ_400x400.png",
  },
  {
    id: 96,
    name: "Neko.hl",
    description:
      "Neko is the first DeFAI Swarm on Hyperliquid, an AI-driven network optimizing DeFi strategies. Users can trade, launch tokens, and access AI-powered yield strategies through a seamless interface, automating complex on-chain processes for efficiency and accessibility. By integrating with HyperEVM and Hyperliquid, Neko enhances liquidity, boosts capital efficiency, and drives on-chain adoption through AI automation and social integration.",
    categories: ["Trading Interface", "Bot", "Wallet", "Tools"],
    status: "Coming Soon",
    website: "https://www.neko.fun/",
    tags: ["Trading Interface", "Bot", "Wallet", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1880643122683916288/xtRa6Q64_400x400.png",
  },
  {
    id: 117,
    name: "HyperZap",
    description:
      "Discover new & trending launches, buy HyperEVM tokens, and execute trades on Hyperliquid through our simple Telegram bot.",
    categories: ["Bot"],
    status: "Beta",
    website: "https://www.hyperzap.io/",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1914165629155721216/yFV5Fp4V_400x400.jpg",
  },
  {
    id: 108,
    name: "Curve Finance",
    description: "Creating deep on-chain liquidity using advanced bonding curves",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.curve.finance/dex/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1220560374346461185/W1sQNVWo_400x400.jpg",
  },
  {
    id: 148,
    name: "Relend Network",
    description:
      "rUSDC is a collection of USDC wrappers that enables lending market risk curators to relend Ethereum mainnet TVL to other chains. Users can mint rUSDC on Ethereum by supplying USDC, bridge it to partner chains, and access ecosystem incentives.",
    categories: ["Lending", "CDP"],
    status: "Coming Soon",
    website: "https://relend.network/",
    tags: ["Lending", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1838501262121209856/PrOhS3Kt_400x400.jpg",
  },
  {
    id: 112,
    name: "Bloom",
    description: "Most advanced cross-chain trading automation SOL | BSC | BASE | HYPEREVM",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/BloomHyperLiquid_bot?start=ref_E67VP3BK8D",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1853964541261983748/oSitKQIe_400x400.jpg",
  },
  {
    id: 40,
    name: "Across Protocol",
    description:
      "Across is an interoperability protocol powered by intents. It is the only cross-chain intents protocol in production today, enabling the fastest and lowest-cost way to transfer value without security tradeoffs vs. traditional bridges.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://app.across.to/bridge",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1886903904874512384/wnRMhfef_400x400.jpg",
  },
  {
    id: 77,
    name: "HeadtoHead.hl",
    description: "Head to Head is a social wagering platform where people can put their money where their mouth is",
    categories: ["Other"],
    status: "Live",
    website: "https://www.headtohead.app/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1892511802451226624/LquxgBd__400x400.jpg",
  },
  {
    id: 23,
    name: "Hyperliquid Names",
    description: "Your digital identity in the fast lane of DeFi.",
    categories: ["Other"],
    status: "Live",
    website: "https://hlnames.xyz/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1892708513534689280/CuTc0feF_400x400.jpg",
  },
  {
    id: 24,
    name: "Thunderhead",
    description: "The premiere liquid-staking solution for the Hyperliquid network.",
    categories: ["LST"],
    status: "Live",
    website: "https://thunderhead.xyz/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1520908569482309633/5VebUnTk_400x400.jpg",
  },
  {
    id: 25,
    name: "HyperFlash",
    description:
      "HyperFlash is a next-generation staking protocol on HyperEVM that combines Liquid Staking Tokens (LSTs) with Maximum Extractable Value (MEV) strategies",
    categories: ["LST"],
    status: "Coming Soon",
    website: "https://hyperflash.xyz/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1892277863430168576/TIbtpNHW_400x400.jpg",
  },
  {
    id: 89,
    name: "Rabby Wallet",
    description: "The game-changing wallet for Ethereum and all EVM chains.",
    categories: ["Wallet"],
    status: "Live",
    website: "https://rabby.io/points?code=0XLCRGS",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1414514212915748873/Grz0B2t2_400x400.jpg",
  },
  {
    id: 111,
    name: "DeBank",
    description: "The Real User Based Web3 Community.",
    categories: ["Tools"],
    status: "Live",
    website: "https://debank.com/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1414880725921267716/YzVitob7_400x400.jpg",
  },
  {
    id: 26,
    name: "Napier",
    description:
      "A modular yield tokenization protocol that enables you to own, manage, create any yield products without permissions.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.napier.finance/",
    tags: ["Yield", "Vaults"],
    logo: "https://pbs.twimg.com/profile_images/1665336093611290625/uUmS2hoy_400x400.jpg",
  },
  {
    id: 14,
    name: "Timeswap",
    description:
      "Timeswap is the first oracleless lending/borrowing protocol. Timeswap enables the creation of money markets for ANY ERC-20 tokens",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.timeswap.io/markets",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1879076220106678272/ZkkhrcyV_400x400.jpg",
  },
  {
    id: 18,
    name: "Okto",
    description: "Hyperliquid Core and HyperEVM integrated mobile wallet",
    categories: ["Wallet"],
    status: "Live",
    website: "https://okto.go.link/defi_home?referral_code=ZkJLD5&adj_t=13c5o7y4",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1914306838683590656/6MT7IDg8_400x400.jpg",
  },
  {
    id: 78,
    name: "Hedgewater Associates",
    description: "Hedgewater is an on-chain AI investment fund focused on Hyperliquid ecosystem.",
    categories: ["Yield"],
    status: "Live",
    website: "https://www.hedgewater.xyz/",
    tags: ["Yield", "AI"],
    logo: "https://pbs.twimg.com/profile_images/1878484437786054657/uZz41GWQ_400x400.jpg",
  },
  {
    id: 53,
    name: "Purrsec",
    description: "Parsec's HyperEVM exclusive Block Explorer",
    categories: ["Tools"],
    status: "Live",
    website: "https://purrsec.com/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1407856708261646338/ODpD974X_400x400.jpg",
  },
  {
    id: 54,
    name: "HypurrScan",
    description: "Explorer for Hyperliquid Core",
    categories: ["Tools"],
    status: "Live",
    website: "https://hypurrscan.io/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1859964342466207744/lPYHxw87_400x400.jpg",
  },
  {
    id: 49,
    name: "pvp.trade",
    description:
      "pvp.trade is a Telegram bot you can add to your trading groups. Once added, you and your group members can track each others' positions and place trades in real-time. Share alpha, copy, or countertrade your friends, all in the comfort of your existing Telegram group.",
    categories: ["Bot"],
    status: "Live",
    website: "https://pvp.trade/join/tb3b3s",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1811823687273754624/Qf6hsnsI_400x400.jpg",
  },
  {
    id: 50,
    name: "HypurrFun",
    description:
      "Launch and trade memecoins on Hyperliquid with a few clicks, directly from Telegram. Snipe new launches, access whale chats, and compete with other cabals.",
    categories: ["Bot", "Launchpad"],
    status: "Live",
    website: "https://t.me/HypurrFunBot?start=ref_2ac3a876",
    tags: ["Bot", "Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1787461676607934464/VrwQ_1q1_400x400.jpg",
  },
  {
    id: 97,
    name: "Lighthouse.one",
    description: "All your crypto and fiat assets in one, private portfolio manager.",
    categories: ["Trading Interface", "Wallet", "Tools"],
    status: "Live",
    website: "https://lighthouse.one/",
    tags: ["Trading Interface", "Bot", "Wallet", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1850925548471480320/L-vU3YZs_400x400.png",
  },
  {
    id: 116,
    name: "Definitive",
    description:
      "Definitive is the future of onchain trade execution. We deliver a CeFi-like experience on DeFi rails via a fully non-custodial platform & API that is live across Solana, Base and other major EVM chains. With Definitive, anyone - from a retail user, to a whale, to a liquid fund, or even an AI agent - can trade any asset on any chain with the same institutional-grade execution found in CeFi. Some features include:",
    categories: ["Trading Interface", "Tools"],
    status: "Live",
    website: "https://app.definitive.fi/r/UJSTNJ7Q",
    tags: ["Trading Interface", "Bot", "Wallet", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1848873373511917568/p0-qFbVa_400x400.jpg",
  },
  {
    id: 100,
    name: "Cielo",
    description:
      "Wallet Tracking and Discovery App, TG Bot + Onchain Analysis for Solana, Ethereum, Base, Hyperliquid, Sui, Tron + Bitcoin. Track. Trade. Rinse. Repeat.",
    categories: ["Bot", "Tools"],
    status: "Live",
    website: "https://app.cielo.finance/",
    tags: ["Bot", "Tracker", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1879619205730906112/aeXN1N9a_400x400.jpg",
  },
  {
    id: 99,
    name: "Maestro",
    description:
      "The leading DeFi Telegram trading suite.Trade easier on Solana, Ethereum, BSC, Base, Sonic, Tron, Avalanche, Arbitrum and TON",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/maestro?start=r-xlcrgs",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1897708570919010304/6i1yPLMe_400x400.jpg",
  },
  {
    id: 98,
    name: "Vfat.io",
    description:
      "Vfat is a multichain yield aggregator - Compare thousands of yield products across DeFi, open positions 1 click and automate them.",
    categories: ["Yield", "Tools"],
    status: "Live",
    website: "https://vfat.io/",
    tags: ["Yield", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1584556833729122304/xwCTl7FM_400x400.jpg",
  },
  {
    id: 17,
    name: "Octis",
    description:
      "Octis Divers is the first revenue-sharing NFT on Hyperliquid. Holders earn a share of revenue from the on-chain game 808FLIP, which charges a 4% fee per game.",
    categories: ["NFT"],
    status: "Live",
    website: "https://octis.ai/flip?r=000002HM",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1880178279199698946/m3cs6Ds3_400x400.jpg",
  },
  {
    id: 79,
    name: "HypeFlows",
    description: "HypeFlows is the best place to track Hyperliquid's trading stats against Centralized Exchanges.",
    categories: ["Tools"],
    status: "Live",
    website: "https://hypeflows.com/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1901381580310081536/RxTaKf3v_400x400.jpg",
  },
  {
    id: 27,
    name: "Silhouette",
    description:
      "Silhouette is a decentralised trading platform that offers alternative trading types to the Hyperliquid ecosystem. Using the latest privacy technology, we provide a hidden matching engine to optimize trade executions.",
    categories: ["DEX"],
    status: "Coming Soon",
    website: "https://silhouette.exchange/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1868973700516601857/jktAc9SE_400x400.jpg",
  },
  {
    id: 80,
    name: "HyperFly",
    description: "HyperFly is the home of DeFAI on Hyperliquid",
    categories: ["Other"],
    status: "Live",
    website: "https://hyperfly.sh/",
    tags: ["Other", "AI"],
    logo: "https://pbs.twimg.com/profile_images/1881002725946650624/5jRUF5t8_400x400.jpg",
  },
  {
    id: 28,
    name: "Sentiment.xyz",
    description:
      "Sentiment is a decentralized onchain lending protocol, that enables users to programmatically lend and borrow digital assets on Ethereum and L2s.",
    categories: ["Lending"],
    status: "Live",
    website: "https://app.sentiment.xyz?refCode=dcb722ec69",
    tags: ["Lending"],
    logo: "https://pbs.twimg.com/profile_images/1777846348735537152/7-y3mdE0_400x400.jpg",
  },
  {
    id: 44,
    name: "Mercury",
    description:
      "Mercury is an upcoming mobile application for both iOS and Android, created to make Hyperliquid's platform accessible and user-friendly for everyone.",
    categories: ["Wallet"],
    status: "Coming Soon",
    website: "https://www.mercurytrade.org/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1917593522011623424/5gvgOGN5_400x400.jpg",
  },
  {
    id: 45,
    name: "Dexari",
    description:
      "Dexari is a next-generation crypto platform designed to make decentralized finance (DeFi) accessible and intuitive. Our goal is to empower everyone with full control over their digital assets while delivering the ease of use typically associated with centralized platforms.",
    categories: ["Wallet"],
    status: "Beta",
    website: "https://www.dexari.com/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1886811418269188097/G-Ax7k-Q_400x400.png",
  },
  {
    id: 87,
    name: "Lootbase",
    description: "A mobile Hyperliquid client to trade perps and spot tokens.",
    categories: ["Wallet"],
    status: "Live",
    website: "https://share.lootbase.com/0xLcrgs",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1889744234451795968/zW1CoCnq_400x400.jpg",
  },
  {
    id: 81,
    name: "Hyperlauncher",
    description: "Your Agentic Copilot, launching ideas into products in minutes",
    categories: ["Launchpad"],
    status: "Beta",
    website: "https://hyperlauncher.ai/",
    tags: ["Launchpad", "AI"],
    logo: "https://pbs.twimg.com/profile_images/1867118056343842819/pRt9hqp4_400x400.jpg",
  },
  {
    id: 46,
    name: "HyperDash",
    description:
      "Hyperdash empowers traders with real-time analytics and insights by tracking the most successful derivatives traders on Hyperliquid.",
    categories: ["Tools"],
    status: "Live",
    website: "https://hyperdash.info/",
    tags: ["Tools", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1856411250848088064/mG5ufCD6_400x400.jpg",
  },
  {
    id: 47,
    name: "HyperFolio",
    description: "HyperFolio is a dashboard that helps users track their HyperEVM assets and DeFi positions.",
    categories: ["Tools"],
    status: "Live",
    website: "https://www.hyperfolio.xyz/",
    tags: ["Tools", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1845820890321448962/_UP3jBsi_400x400.jpg",
  },
  {
    id: 120,
    name: "Defi App",
    description: "Combining the magic of CeFi and DeFi in the world's first decentralized Superapp ",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://app.defi.app/join/8fYUku",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1807464255249334272/CKuGD7ZW_400x400.jpg",
  },
  {
    id: 121,
    name: "Axiom",
    description: "The ONLY Trading Platform You'll Ever Need. Memes, Perps, Yield, All-In-One.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://axiom.trade/@0xlcrgs",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1884809179174760448/Zn1mS8ip_400x400.jpg",
  },
  {
    id: 71,
    name: "Glider",
    description:
      "Glider is a software-as-a-service platform that enables users to build, test, and execute non-custodial trading portfolios on-chain. Our platform is designed to empower traders with advanced tools and capabilities for cryptocurrency trading.",
    categories: ["Trading Interface", "Tools"],
    status: "Beta",
    website: "https://glider.fi/",
    tags: ["Trading Interface", "Bot", "Wallet", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1907062271366647808/B5WCwf_W_400x400.jpg",
  },
  {
    id: 122,
    name: "TokenPocket",
    description:
      "Easy and safe to buy, store, send, swap tokens and collect NFTs. Trusted by 30+ millions users from 200+ countries and regions.",
    categories: ["Wallet"],
    status: "Live",
    website: "https://www.tp.xyz/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1883802310834585600/HoVIdb5I_400x400.jpg",
  },
  {
    id: 123,
    name: "Coinpilot",
    description: "Copy winning traders on Hyperliquid today.",
    categories: ["Bot", "Trading Interface"],
    status: "Beta",
    website: "https://www.trycoinpilot.com/",
    tags: ["Bot", "Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1927673259719585792/VNwfwvw4_400x400.jpg",
  },
  {
    id: 124,
    name: "Liquid",
    description: "Not a lot of info yet but it's seams to be a non-custodial wallet with UI resembling a CEX",
    categories: ["Wallet", "Trading Interface"],
    status: "Coming Soon",
    website: "https://tryliquid.xyz?ref_id=3E4RTJC9P",
    tags: ["Trading Interface", "Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1914394533242028033/f-745FsF_400x400.jpg",
  },
  {
    id: 115,
    name: "HyperSignals",
    description:
      "Delivering trading edge via hyperliquid orderbook patterns, smart money moves & offchain sentiment analysis.",
    categories: ["Trading Interface", "Tools"],
    status: "Beta",
    website: "https://hypersignals.ai/",
    tags: ["Trading Interface", "Bot", "Wallet", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1924849892314255361/a_SduLa2_400x400.png",
  },
  {
    id: 114,
    name: "Hybra Finance",
    description: "Public liquidity layer on Hyperliquid. Upgraded ve(3,3) flywheel. CL & intent-based gasless trades",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.hybra.finance/",
    tags: ["DEX", "ve(3,3)"],
    logo: "https://pbs.twimg.com/profile_images/1921875803111120896/YWsOYaL7_400x400.jpg",
  },
  {
    id: 86,
    name: "Kryptos",
    description:
      "Kryptos is pioneering the future of Web3 finance by establishing a standardised financial data protocol layer that seamlessly connects diverse blockchain platforms. As the definitive Open Banking standard for Web3, Kryptos equips developers, businesses, and end-users with the tools necessary to share and utilise data effortlessly. Supporting over 5000 platforms, including major CEXs, DeFi protocols, and blockchain networks, Kryptos enhances interoperability, compliance, and accessibility in Web3 with its APIs and products such as real-time financial analytics, compliance-ready tax reporting, and personalised portfolio management.",
    categories: ["Tools"],
    status: "Live",
    website: "https://kryptos.io?via=niteip1995",
    tags: ["Tools", "Taxes"],
    logo: "https://pbs.twimg.com/profile_images/1897644409237512192/yJQptpdA_400x400.jpg",
  },
  {
    id: 94,
    name: "Vapor",
    description:
      "Vapor makes it easy to create, launch, and manage AI agents. Users are able to create agents without ever needing to write a line of code. Vapor is built on Eliza the opensource agent tooling created by ai16zDAO. When the Hyperliquid EVM launches, users will be able to deploy ERC20 tokens to attach to their agents as well.",
    categories: ["Launchpad", "DEX"],
    status: "Live",
    website: "https://www.vaporware.fun/",
    tags: ["Launchpad", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1867073156072046592/dQQ6ZsRj_400x400.jpg",
  },
  {
    id: 74,
    name: "HL Fund",
    description:
      "Decentralized hub designed to accelerate the growth of the Hyperliquid ecosystem. Reputation, Education, Decentralized Directories, DAOs, Collabs. Investments",
    categories: ["Other"],
    status: "Live",
    website: "https://hl.fund/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1880969975482961921/GAC7jyiw_400x400.jpg",
  },
  {
    id: 88,
    name: "Nest",
    description:
      "Sophisticated mobile trading app for professional traders. Now supports HL perps, and live sentiment & whale tracking.",
    categories: ["Wallet"],
    status: "Live",
    website: "https://nestwallet.xyz/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1917627579902599168/9_VsxZ89_400x400.jpg",
  },
  {
    id: 73,
    name: "Vegas HL",
    description: "The next-gen crypto poker experience. Built on HyperEVM to revolutionize on-chain gambling.",
    categories: ["Other"],
    status: "Live",
    website: "https://vegas.fun?r=0XLCRGS",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1899561765383614464/sFrQsTXk_400x400.jpg",
  },
  {
    id: 145,
    name: "Beefy",
    description:
      "Beefy is a Decentralized, Multichain Yield Optimizer that allows its users to earn compound interest on their crypto holdings. Beefy earns you the highest APYs with safety and efficiency in mind.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.beefy.com/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1910288827312222208/9lDmAhjF_400x400.jpg",
  },
  {
    id: 134,
    name: "Mizu",
    description:
      "Mizu Labs is a unified liquidity layer that reduces infrastructure efforts for builders and focuses on consumer-based dApps.",
    categories: ["Yield"],
    status: "Live",
    website: "https://mizulabs.xyz/dapp/vault",
    tags: ["Yield", "Vaults"],
    logo: "https://pbs.twimg.com/profile_images/1854237810686828547/ZhV6sDwY_400x400.jpg",
  },
  {
    id: 135,
    name: "Theo",
    description:
      "Theo is decentralized trading infrastructure connecting onchain capital with global markets and institutions.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.theo.xyz/referrals/0xLcrgs",
    tags: ["Yield", "Vaults", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1928132409783963648/LizAN275_400x400.png",
  },
  {
    id: 75,
    name: "Project X",
    description:
      "Project build by @Lamboland_ and @BOBBYBIGYIELD. Not much is known yet about it (pay attention on this one)",
    categories: ["Other"],
    status: "Coming Soon",
    website: "https://x.com/prjx_hl",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1922089219737911296/1miGhDTB_400x400.jpg",
  },
  {
    id: 76,
    name: "HyperPath",
    description: "Not much is known yet about it (i'll update a soon as possible)",
    categories: ["Other"],
    status: "Coming Soon",
    website: "https://x.com/hyper_path",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1925648003777298432/5Vl2A71i_400x400.jpg",
  },
  {
    id: 29,
    name: "Supurr",
    description: "Trade supurr short-dated options",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://trade.supurr.app/#/ref/0xlcrgs/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1884280601793929218/mcI9hEhQ_400x400.jpg",
  },
  {
    id: 138,
    name: "dotHYPE",
    description: "Building the identity layer for HyperEVM. Your name. Your presence. Your signal across the chain.",
    categories: ["Other"],
    status: "Coming Soon",
    website: "https://x.com/d0tHYPE",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1930144205541912579/trTH-qij_400x400.jpg",
  },
  {
    id: 139,
    name: "Farcaster",
    description:
      "Farcaster is a sufficiently decentralized social network built on Ethereum.It is a public social network similar to X and Reddit. Users can create profiles, post casts and follow others. They own their accounts and relationships with other users and are free to move between different apps.",
    categories: ["Other"],
    status: "Live",
    website: "https://farcaster.xyz/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1546487688601096192/QoG0ZVgH_400x400.jpg",
  },
  {
    id: 30,
    name: "SuperHype",
    description: "HyperEVM token launchpad and AMM DEX",
    categories: ["Launchpad", "DEX"],
    status: "Live",
    website: "https://www.superhype.app/",
    tags: ["Launchpad", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1892409289467138048/PrC-uVqt_400x400.jpg",
  },
  {
    id: 31,
    name: "Sunder Finance",
    description:
      "Sunder Finance is a groundbreaking decentralized finance (DeFi) platform designed to redefine what's possible on the Hyperliquid.",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.sunder.finance/swap",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1879801454795575296/xM9D_mFK_400x400.jpg",
  },
  {
    id: 101,
    name: "Rysk Finance",
    description:
      "Rysk V12 introduces a new way to earn high, sustainable yield on ETH, BTC, and any volatile asset in DeFi. DeFi's biggest gap has been obvious: scalable, efficient returns on its core assets. These assets are held by everyone, yet their yields remain low and unsustainable. Rysk fixes this by reimagining covered calls, a proven strategy from traditional finance, and making it work for DeFi.",
    categories: ["Trading Interface"],
    status: "Coming Soon",
    website: "https://app.rysk.finance/",
    tags: ["Trading Interface", "Options"],
    logo: "https://pbs.twimg.com/profile_images/1556700928748781569/bLjEj9yu_400x400.jpg",
  },
  {
    id: 41,
    name: "Nitro",
    description: "Bridge from over 35 chains in a single step, including non-EVM chains like Sui and Solana.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://routernitro.com/swap",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1881323127872839680/f7AkYiQe_400x400.jpg",
  },
  {
    id: 57,
    name: "Gigabrain",
    description:
      'Gigabrain.gg is an AI-powered market intelligence platform designed for cryptocurrency traders seeking institutional-grade insights. Operating as "The BlackRock of Crypto," Gigabrain processes vast amounts of data from over 3,000 projects to identify high-probability trading opportunities before major market movements.',
    categories: ["Tools"],
    status: "Live",
    website: "https://gigabrain.gg/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1923460432636887040/r2TW45xA_400x400.jpg",
  },
  {
    id: 58,
    name: "GlueX Protocol",
    description:
      "GlueX is the first and only native swap router on HyperEVM, designed to simplify DeFi by unifying swaps, lending, and liquidity provisioning into a single, seamless interface. No MEV losses. No upfront fees. Just a smooth, rewarding experience every single time.",
    categories: ["DEX"],
    status: "Live",
    website: "https://dapp.gluex.xyz/",
    tags: ["DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1906594758635483136/qEPWWGkA_400x400.jpg",
  },
  {
    id: 133,
    name: "EISEN",
    description: "Eisen is a DEX aggregator with a fast Ce-DeFi engine for safer, profitable trading.",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.eisenfinance.com/",
    tags: ["DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1861248882824593408/h5CrU_s__400x400.jpg",
  },
  {
    id: 42,
    name: "Slate Wallet Tracker",
    description:
      "Slate's Hyperliquid Wallet Tracker is a Telegram-based tool that delivers real-time updates on any Hyperliquid wallet's activity",
    categories: ["Bot", "Tools"],
    status: "Live",
    website: "https://link3.to/W0DF72YJ",
    tags: ["Bot", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1874690032839147520/diW788eQ_400x400.png",
  },
  {
    id: 43,
    name: "HypeRPC",
    description:
      "HypeRPC provides optimized RPC infrastructure for Hyperliquid. It is the first dedicated RPC provider built for speed, scale, and reliability.",
    categories: ["Tools"],
    status: "Live",
    website: "https://hyperpc.app/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1907624650961461248/wyBCK8fK_400x400.jpg",
  },
  {
    id: 102,
    name: "Derps",
    description:
      "Derps is a fun, easy-to-use mobile app for on-chain perpetuals (no KYC, zero gas fees) powered by HyperLiquid, MoonPay & dexorgexchange",
    categories: ["Wallet"],
    status: "Live",
    website: "https://dex.org/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1921876531015471104/_4trkTZO_400x400.jpg",
  },
  {
    id: 103,
    name: "BasedApp",
    description:
      "Spend Crypto like Fiat with BasedApp Visa Card. Live in SG, opening up to more countries in April 2025. Backed by Delphi, Hashed and Spartan.",
    categories: ["Wallet"],
    status: "Live",
    website: "https://app.basedapp.io?access=UCLV9HOL",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1656905347813232640/DqkrVg1t_400x400.jpg",
  },
  {
    id: 104,
    name: "Pocket Pro",
    description:
      "Pocket Pro is the first cross-platform Hyperliquid trading product that helps people trade more profitably with friends. Trade on X: open perps trades directly on X to get followers and copy traders. Referrals: get 20% of the fees of anyone who joins from your trades on X or through your ref link. One Click Copy Trade: share your ref link or trade on X to get copy (or counter) traders - they pay you 20% of their PNL",
    categories: ["Wallet"],
    status: "Coming Soon",
    website: "https://www.pocketprotector.xyz/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1910382854195789824/G-dAUWhC_400x400.jpg",
  },
  {
    id: 105,
    name: "thefarm.fun",
    description:
      "The 1st GenAI AI Agent game built on Hyperliquid. Think on-chain creature generation, powered by our GenAI model (Cryptokitties 2.0) + Stardew Valley (simulation game) + Pokemon Go (battle/esports), all by human via AI.",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://www.thefarm.fun/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1864910599198773250/HWsMlIpH_400x400.png",
  },
  {
    id: 106,
    name: "LiquidLoot",
    description: "Marketplace for NFTs on HyperliquidX I Launchpad coming soon I Lend&borrow coming soon",
    categories: ["NFT", "Launchpad"],
    status: "Coming Soon",
    website: "https://x.com/LootLiquid",
    tags: ["NFT", "Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1894164622602539008/IovQ374W_400x400.jpg",
  },
  {
    id: 156,
    name: "Liquina",
    description: "Liquina is more than a character; she is a 'Story' and an 'IP' born of the community. The goal of the 'LQnians' community is clear: to turn Liquina, an IP we fully own, into the greatest legend of all time. Let us write history, together.",
    categories: ["NFT"],
    status: "Live",
    website: "https://liquina.ai/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1865646244150005760/zLuVTIRD_400x400.jpg",
  },
  {
    id: 157,
    name: "GLO",
    description: "just glo it.",
    categories: ["NFT"],
    status: "Live",
    website: "https://www.glohl.com/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1930865280206475264/1DW5GUeJ_400x400.jpg",
  },
  {
    id: 107,
    name: "Harbor Finance",
    description:
      "Harbor Finance is a high-performance, gamified DeFi ecosystem that seamlessly merges NFT-based asset structures, sustainable passive income strategies, and immersive financial gameplay. Our mission: to make automated earning not just simple, but genuinely enjoyable. Engineer intricate Yield Items. Harvest $FISH. Collect ongoing incentives. Rise through the ranks as a master-class Fishercat.",
    categories: ["NFT"],
    status: "Live",
    website: "https://harborfinance.app/?ref=48f2-ua5xd",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1905963590282260480/eHil_7qj_400x400.jpg",
  },
  {
    id: 109,
    name: "Fan App",
    description: "Fan App is an exclusive content platform where creators can monetize access dynamically",
    categories: ["Other"],
    status: "Live",
    website: "https://fan.fun/",
    tags: ["Other", "SocialFi"],
    logo: "https://pbs.twimg.com/profile_images/1884115595081433088/K918mGuG_400x400.png",
  },
  {
    id: 151,
    name: "Hyap",
    description: "Every yap matters, built on Hyperliquid. Powered by KaitoAI",
    categories: ["Other"],
    status: "Coming Soon",
    website: "https://x.com/hyaplabs",
    tags: ["Other", "SocialFi"],
    logo: "https://pbs.twimg.com/profile_images/1932509033165950977/ZgPVC9AA_400x400.jpg",
  },
  {
    id: 48,
    name: "HyperEVM Sniper Bot by SuperSonic",
    description:
      "Trade tokens on HyperEVM with the fastest trading bot. HyperSwap DEX V2/V3 & LiquidLaunch are supported.",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/HyperEVMSniperBot?start=6E3A77",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/media/Gru7DOrXsAAWdGu?format=jpg&name=small",
  },
  {
    id: 153,
    name: "LiquidScan",
    description:
      "Advanced analytics and trading tools for the HyperEVM ecosystem.",
    categories: ["Bot"],
    status: "Live",
    website: "https://liquidscan.fun/trading-bot",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1920773638317326336/5hCikU5b_400x400.jpg",
  },
  {
    id: 150,
    name: "PurrSwap",
    description: "Your ultimate AMM solution, serving volatile and stable pools, fueling the HyperEVM revolution. Born from Abracadabra Money stableswap technology, crafted for DeFi dominance.",
    categories: ["DEX"],
    status: "Coming Soon",
    website: "https://purrswap.finance/",
    tags: ["DEX", "AMM"],
    logo: "https://pbs.twimg.com/profile_images/1927398301176942592/J8mEOR0W_400x400.jpg",
  },
  {
    id: 51,
    name: "HyperTracker",
    description: "Real-time analysis of Hyperliquid wallets by Perp Equity",
    categories: ["Tools"],
    status: "Live",
    website: "https://app.coinmarketman.com/hypertracker",
    tags: ["Tools", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1921840039191076864/MQL-3EMg_400x400.jpg",
  },
  {
    id: 154,
    name: "Hype Sphere",
    description: "Sphere map visualization platform for meme token analysis on HyperEVM",
    categories: ["Tools"],
    status: "Live",
    website: "https://hypesphere.xyz/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1926590568039079936/SkL9NtDB_400x400.jpg",
  },
  {
    id: 155,
    name: "Biconomy",
    description: "Effortlessly execute transactions and intents which access users, assets and liquidity across all blockchains and rollups.",
    categories: ["Tools"],
    status: "Live",
    website: "https://www.biconomy.io/",
    tags: ["Tools", "Developer"],
    logo: "https://pbs.twimg.com/profile_images/1760639001587863553/jkMcM52V_400x400.jpg",
  },
  {
    id: 52,
    name: "ASXN",
    description: "ASXN master list of Hyperliquid Dashboards",
    categories: ["Tools"],
    status: "Live",
    website: "https://data.asxn.xyz/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1669029465362505756/CXGvN0w0_400x400.jpg",
  },
  {
    id: 118,
    name: "PrimeFi",
    description:
      "Omnichain decentralized lending and borrowing protocol built on LayerZero to bring liquidity to Hyperliquid and other EVMs.",
    categories: ["Lending"],
    status: "Coming Soon",
    website: "https://primenumbers.xyz/",
    tags: ["Lending", "Borrowing"],
    logo: "https://pbs.twimg.com/profile_images/1849722059154239488/TU9dzmb__400x400.jpg",
  },
  {
    id: 55,
    name: "Cathena",
    description: "Cathena aims to be the Ethena of Hyperliquid, generating delta neutral yield on USDC.",
    categories: ["Yield"],
    status: "Live",
    website: "https://cathena.rndm.io/",
    tags: ["Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1887119185219620864/1GHem2Q9_400x400.jpg",
  },
  {
    id: 152,
    name: "pvp.duel",
    description: "Duel, survive, and thrive in the world of HyperEVM gaming. This guide will walk you through how to play, what we're building, and how you can get involved with our DAO. Telegram has always been a quintessential part of the Hyperliquid ecosystem, and our team views Telegram as an incredibly powerful interface to integrate casual gaming.",
    categories: ["Other"],
    status: "Beta",
    website: "https://pvp-frontend.vercel.app/",
    tags: ["Other", "Game"],
    logo: "https://pbs.twimg.com/profile_images/1923474018738298880/zWldEq5d_400x400.jpg",
  },
  {
    id: 91,
    name: "Rage Trade",
    description:
      "Rage Trade is a multi-chain perp aggregator that transforms on-chain trading by combining the convenience of centralized exchanges with the transparency of decentralized platforms.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://www.app.rage.trade/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1518891395636944897/gLh94IR3_400x400.png",
  },
  {
    id: 90,
    name: "Pear Protocol",
    description:
      "Pear Protocol is an array of engineering solutions aimed to address the inherent inefficiencies and complexities when pair-trading cryptocurrencies. By enabling leveraged long and short positions within a single on-chain transaction, the protocol significantly improves the process of pair-trading execution, with a superior front-end for risk management.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://pear.garden/trade?referral=0xLcrgs",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1615784760328192001/kFS3qLV5_400x400.jpg",
  },
  {
    id: 92,
    name: "Vooi",
    description:
      "Backed by Binance Labs, VOOI is an emerging Derivatives Marketplace powered by Chain Abstraction that provides CEX-like trading experience for professional and retail traders",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://app.vooi.io/r/3DW6DRN",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1897274648959610880/WzzIafIX_400x400.png",
  },
  {
    id: 144,
    name: "Polaris",
    description: "Trade all tokens, across all chains — with Polaris, the Token Portal. Now live in beta.",
    categories: ["Trading Interface", "DEX"],
    status: "Live",
    website: "https://polaris.app/",
    tags: ["Trading Interface", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1909962811804946432/gW76pWsD_400x400.jpg",
  },
  {
    id: 143,
    name: "Perpflow",
    description:
      "Perpflow is a management dashboard that helps you create and monitor delta-neutral positions to earn yield through perpetual futures funding rates. It automates the creation of balanced positions that can generate returns regardless of market direction.",
    categories: ["Yield"],
    status: "Live",
    website: "https://perpflow.xyz/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1873732821753249792/tJbXJ3fz_400x400.jpg",
  },
  {
    id: 56,
    name: "EzPairs",
    description: "A pair trading platform that allows users to trade custom weighted pairs with x3 leverage.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://www.ezpairs.xyz/trade",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1890102511245168640/7ocIdtLE_400x400.jpg",
  },
  {
    id: 93,
    name: "Vortx HL",
    description:
      "Trade spot, perps & prediction markets on Discord, Twitter & more with AI agents. Built on Hyperliquid. Zero fees during beta.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://www.vortx.gg/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1889417046401708032/34ziuAPb_400x400.jpg",
  },
  {
    id: 59,
    name: "Hana Network",
    description:
      "Hana is Hyper-casual Binance powered by Hyperliquid, providing mobile exchange including no-kyc on/off ramp, casual trading& farming. Mobile Onboarding + Hyperliquid = Onchain-Binance",
    categories: ["Tools", "DEX", "Bridge"],
    status: "Beta",
    website: "https://gateway.hana.network/",
    tags: ["Tools", "DEX", "Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1826923623556562944/LhUmaR37_400x400.jpg",
  },
  {
    id: 60,
    name: "HyperPNL",
    description:
      "Fully decentralized prop trading platform on top of HyperEVM designed to address the limitations and trust issues associated with centralized proprietary trading firms.",
    categories: ["Trading Interface"],
    status: "Coming Soon",
    website: "https://hyperpnl.com/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1903102046204841984/aF3OnjeP_400x400.jpg",
  },
  {
    id: 84,
    name: "Hyperterminal",
    description:
      "Your all-in-one analytics powerhouse designed to revolutionize your Hyperliquid trading with real-time market insights.",
    categories: ["Trading Interface", "Tools"],
    status: "Beta",
    website: "https://hyperterminal.xyz/",
    tags: ["Trading Interface", "Tools", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1856449296540762112/RWZ62v7c_400x400.jpg",
  },
  {
    id: 61,
    name: "Hyperdelta",
    description: "A next-generation options exchange, launching 2025 on Hyperliquid.",
    categories: ["Trading Interface"],
    status: "Coming Soon",
    website: "https://hyperdelta.com/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1923426269376450560/9YGLDDAY_400x400.jpg",
  },
  {
    id: 136,
    name: "HyperBloom",
    description:
      "Hyperbloom is a Decentralized Exchange (DEX) Aggregator and Yield Optimizer built on HyperEVM that helps users finding the best rates for swaps across Hyperliquid ecosystem together with boosting yield from liquidity pools through autocompounding.",
    categories: ["DEX"],
    status: "Live",
    website: "https://hyperbloom.xyz/referral/6430f279-b",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1928058397363945472/30SHmK1e_400x400.jpg",
  },
  {
    id: 137,
    name: "Gliquid",
    description: "Next-Gen V4 AMM unlocking hyper-efficient liquidity on Hyperliquid Powered by Crypto Algebra",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.gliquid.xyz/swap",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1928414866554974208/FpTxpjHe_400x400.jpg",
  },
  {
    id: 62,
    name: "Hyperhyper",
    description: "The hyper-speculation application",
    categories: ["Other"],
    status: "Coming Soon",
    website: "https://hyperhyper.fi/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1895494249648377856/xHC87ple_400x400.jpg",
  },
  {
    id: 132,
    name: "Arkis",
    description:
      "Arkis is a digital asset prime brokerage, offering a leverage protocol that enables undercollateralized lending for capital providers and asset managers.",
    categories: ["Yield"],
    status: "Live",
    website: "https://arkis.xyz/",
    tags: ["Yield", "Vaults"],
    logo: "https://pbs.twimg.com/profile_images/1915081501563076609/E_iRuoQD_400x400.jpg",
  },
  {
    id: 63,
    name: "Insilico Terminal",
    description:
      "Trader-friendly professional grade order, position and execution management system. Advanced capabilities for all. First Terminal on HyperLiquid. Free to use.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://insilicoterminal.com/#/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1798271540565315584/esokUp7H_400x400.jpg",
  },
  {
    id: 64,
    name: "Katōshi",
    description:
      "Katōshi is a robust automated trading platform that empowers traders to create and deploy sophisticated trading bots on Hyperliquid.  Through seamless integrations with TradingView and a professional-grade API, Katoshi will become the go-to destination for users wanting to quickly and efficiently deploy their automated trading strategies on Hyperliquid.  The platform combines enterprise-level security features with an intuitive interface, making algorithmic trading accessible to both retail and institutional traders on Hyperliquid.",
    categories: ["Trading Interface", "Bot"],
    status: "Live",
    website: "https://katoshi.ai/",
    tags: ["Trading Interface", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1864361726663122944/fm-qO0Nl_400x400.jpg",
  },
  {
    id: 129,
    name: "Gem Wallet",
    description:
      "Gem Wallet is a user-friendly crypto wallet that offers convenience and top-notch security for beginners like you",
    categories: ["Wallet"],
    status: "Live",
    website: "https://gemwallet.com/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1659483462758178823/KN0WzQl6_400x400.jpg",
  },
  {
    id: 128,
    name: "TopDog",
    description:
      "TopDog is a Telegram native mini-app, built to empower ultimate Social Trading experience on Hyperliquid",
    categories: ["Bot"],
    status: "Beta",
    website: "https://topdog.gg/",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1908001097299668994/UFJRO94o_400x400.jpg",
  },
  {
    id: 125,
    name: "Hytrade",
    description: "Hytrade is the fastest and most feature-rich hybrid web trading experience, designed to elevate your crypto journey on HyperEVM withhigh-speed execution across all the launchpads and DEXs you love. Our intuitive platform enables you to buy and sell in one click, giving you the competitive edge needed in fast-paced markets.",
    categories: ["Launchpad", "DEX"],
    status: "Live",
    website: "https://www.hytrade.fun/trade",
    tags: ["Launchpad", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1931405316798758913/mCxPAyTX_400x400.jpg",
  },
  {
    id: 65,
    name: "Lambda Finance",
    description:
      "Lambda introduces btcUSD, a permissionless and efficient BTC-backed stablecoin, unlocking Bitcoin liquidity for DeFi applications.",
    categories: ["Lending"],
    status: "Coming Soon",
    website: "https://lambda.finance/",
    tags: ["Lending", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1709109269604511744/vXoBoSl1_400x400.jpg",
  },
  {
    id: 66,
    name: "Chainpro",
    description: "Advanced onchain trading terminal across multiple ecosystems",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://chainpro.xyz/#0xlcrgs",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1894915308495704064/JKryzZve_400x400.jpg",
  },
  {
    id: 67,
    name: "Fractrade",
    description:
      "Fractrade is a platform for creating and managing AI trading agents to enhance your trading on Hyperliquid. Our agents offer features like risk management, copy trading, sniping, whale monitoring, backtesting, and more. You can connect your Hyperliquid account and use individual agents for tasks like improving risk management while trading manually, or combine multiple agents to build fully automated strategies—such as detecting chart patterns and executing trades. Agents run via the Hyperliquid API on your own account or within Hyperliquid vaults, allowing you to earn a share of the profits.",
    categories: ["Trading Interface", "Bot"],
    status: "Live",
    website: "http://alpha.fractrade.xyz/accounts/signup?invite_code=UI58BY",
    tags: ["Trading Interface", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1879105001366196224/QhBDglZB_400x400.jpg",
  },
  {
    id: 68,
    name: "Altitude",
    description: "The next-gen trading experience is here. Get access to our full range blockchain infrastructure.",
    categories: ["Trading Interface"],
    status: "Coming Soon",
    website: "https://www.reachaltitude.xyz/waitlist?ref=JAZZ2H7VV4",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1916798556809437184/CBPWnZgk_400x400.jpg",
  },
  {
    id: 85,
    name: "Hypervisor",
    description: "Hyperliquid focused data analytics/trading platform with fully customizable dashboards",
    categories: ["Trading Interface", "Tools"],
    status: "Beta",
    website: "https://hypervisor.gg/",
    tags: ["Trading Interface", "Tools", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1832829990951383040/oNYLW-Og_400x400.jpg",
  },
  {
    id: 82,
    name: "HyperScanner",
    description: "Supercharge your Hyperliquid trading with advanced analytics and data insights",
    categories: ["Tools"],
    status: "Live",
    website: "https://www.hyperscanner.app/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1825505561657380864/qtMwmkIj_400x400.jpg",
  },
  {
    id: 83,
    name: "Hyperstats.hl",
    description: "An independent source of Hyperliquid trading statistics",
    categories: ["Tools"],
    status: "Live",
    website: "https://hyperstats.xyz/",
    tags: ["Tools", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1853646017620844544/yKjedEz2_400x400.jpg",
  },
  {
    id: 126,
    name: "Quick Intel",
    description:
      "Quick Intel is a suite of cryptocurrency security tools designed to provide real-time assessment of project contracts and provide users with immediate feedback on potential malicious code within a token's contract.",
    categories: ["Tools"],
    status: "Live",
    website: "https://quickintel.io/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1882651870201520128/_6yWXw-N_400x400.jpg",
  },
  {
    id: 69,
    name: "SuperX",
    description:
      "SuperX is a Telegram copy trading bot built specifically for Hyperliquid. It enables anyone to discover and copy top traders across perps, and soon, spot.",
    categories: ["Bot"],
    status: "Live",
    website: "https://trysuper.co/",
    tags: ["Bot", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1913916356874952704/RrNrTN0H_400x400.jpg",
  },
  {
    id: 127,
    name: "Tator the Trader",
    description:
      "Manage digital assets and transfers - all through simple chat messages. No complicated wallets or technical knowledge needed!",
    categories: ["Bot"],
    status: "Live",
    website: "https://tatortrader.quickintel.io/",
    tags: ["Bot", "AI"],
    logo: "https://pbs.twimg.com/profile_images/1905002465117843456/yQmiCqaT_400x400.jpg",
  },
]

// DeFiLlama slugs (update with actual slugs from DeFiLlama)
const defiLlamaSlugs = {
  HyperSwap: "hyperswap",
  KittenSwap: "kittenswap-finance",
  Felix: "felix",
  HyperLend: "hyperlend",
  HypurrFi: "hypurrfi",
  Upshift: "upshift",
  Hyperbeat: "hyperbeat",
  Valantis: "valantis",
  "Looped Hype": "looped-hype",
  "Sentiment.xyz": "sentiment",
  Hyperpie: "hyperpie",
  "Keiko Finance": "keiko-finance",
  Laminar: "laminar",
  Hyperstable: "hyperstable",
  HyperYield: "hyperyield",
  Timeswap: "timeswap",
  "D2 Finance": "d2-finance",
  "Harmonix Finance": "harmonix-finance",
  Unit: "unit",
  DeBridge: "debridge",
  Theo: "theo-network",
  "Curve Finance": "curve-finance",
  "Hybra Finance": "hybra",
  Symbiosis: "symbiosis",
  Garden: "garden",
  Stargate: "stargate-finance",
  "Across Protocol": "across",
  Napier: "napier",
  "Vfat.io": "vfat.io",
  Arkis: "arkis",
  "Fan App": "fan.fun",
  Gliquid: "gliquid"
}

const categories = [
  "All",
  "DEX",
  "Bridge",
  "Lending",
  "Yield",
  "CDP",
  "LST",
  "Launchpad",
  "Wallet",
  "NFT",
  "Tools",
  "Trading Interface",
  "Bot",
  "Other",
]

export default function EcosystemPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [projectData, setProjectData] = useState(projects)
  const [loading, setLoading] = useState(true)

  // Initialize state from URL params
  useEffect(() => {
    const urlSearch = searchParams.get("search")
    const urlCategory = searchParams.get("category")

    if (urlSearch) {
      setSearchQuery(urlSearch)
    }
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory)
    }
  }, [searchParams])

  // Update URL when search or category changes
  const updateURL = (newSearch: string, newCategory: string) => {
    const params = new URLSearchParams()

    if (newSearch) {
      params.set("search", newSearch)
    }
    if (newCategory && newCategory !== "All") {
      params.set("category", newCategory)
    }

    const queryString = params.toString()
    const newURL = queryString ? `/?${queryString}` : "/"

    router.push(newURL, { scroll: false })
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    updateURL(value, selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateURL(searchQuery, category)
  }

  useEffect(() => {
    const fetchTVL = async () => {
      setLoading(true)
      const updatedProjects = await Promise.all(
        projects.map(async (project) => {
          const slug = defiLlamaSlugs[project.name]
          if (!slug) return { ...project, tvl: "-" }
          try {
            const response = await axios.get(`https://api.llama.fi/tvl/${slug}`)
            return {
              ...project,
              tvl: response.data ? `$${Number(response.data).toLocaleString()}` : "-",
            }
          } catch {
            return { ...project, tvl: "-" }
          }
        }),
      )
      setProjectData(updatedProjects)
      setLoading(false)
    }
    fetchTVL()
  }, [])

  const filteredProjects = projectData.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.categories.includes(selectedCategory)
    const matchesSearch =
      (project.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tags || []).some((tag) => (tag || "").toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Beta":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Coming Soon":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <video
        preload="auto"
        loop
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="https://video.twimg.com/amplify_video/1927005004382023680/vid/avc1/1280x720/nSPI-O-2ZZ69rCqB.mp4?tag=14"
        autoPlay
        muted
      ></video>
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 px-6 py-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div
                  className="w-12 h-12 bg-green-950 rounded-full flex items-center justify-center"
                  style={{
                    backgroundImage: "url(https://hyperfoundation.org/landing/blob_green.gif)",
                    backgroundSize: "95%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <span className="text-xl font-semibold">HyperEVM Portal</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="https://app.hyperliquid.xyz/join/0XLCRGS">Join Hyperliquid</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="https://x.com/intent/follow?screen_name=HyperLcrgs">Follow X</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-6 py-12">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Ultimate HyperEVM Dashboard</h1>
            <p className="text-gray-400 text-lg max-w-3xl">
              Explore the growing ecosystem of projects building on HyperEVM. Learn about each project, their features,
              and how to get involved.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4 flex flex-col items-center">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
              <TabsList className="bg-gray-900 border-gray-700">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-white data-[state=active]:text-black"
                  >
                    {category} (
                    {category === "All"
                      ? projectData.length
                      : projectData.filter((p) => p.categories.includes(category)).length}
                    )
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">Loading TVL data...</div>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-gray-900/80 border-gray-700 hover:border-gray-600 transition-colors flex flex-col"
                >
                  <CardHeader className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div
                          className="w-10 h-10 rounded-full bg-gray-800 flex-shrink-0"
                          style={{
                            backgroundImage: `url(${project.logo})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                        <div>
                          <CardTitle className="text-white text-xl">{project.name}</CardTitle>
                          <CardDescription className="text-gray-400 mt-2">{project.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 mt-auto">
                    {/* Stats */}
                    <div className="text-sm">
                      <div>
                        <span className="text-gray-400">TVL:</span>
                        <span className="text-white ml-2 font-medium">{project.tvl}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center space-x-3 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-black-300 hover:bg-gray-800"
                        asChild
                      >
                        <Link href={project.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Website
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No projects found</div>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
