"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { Globe, Search, Menu, X } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Project = {
  id: number
  name: string
  description: string
  categories: string[]
  status: string
  website: string
  tags: string[]
  logo: string
  tvl?: string
}

const projects: Project[] = [
  {
    id: 313,
    name: "Hyperliquid Core",
    description:
      "The blockchain to house all finance. Trade, build apps, and launch tokens on the same hyper-performant chain. X by Hyper Foundation",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.hyperliquid.xyz/join/0XLCRGS",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/2001260078352285697/f5cl2Syx_400x400.jpg",
  },
  {
    id: 1,
    name: "HyperLend",
    description:
      "HyperLend is a high-performance lending protocol on Hyperliquid EVM, offering real-time leverage, dynamic rates, and deep liquidity.",
    categories: ["Lending", "Yield", "1st Tier Airdrop"],
    status: "Live",
    website: "https://app.hyperlend.finance/?ref=0XLCRGS",
    tags: ["Lending", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/2003457356873539584/ItzG0Krp_400x400.jpg",
  },
  {
    id: 2,
    name: "Felix",
    description:
      "Felix offers secure, easy on-chain borrowing and lending on Hyperliquid L1, helping users unlock liquidity or earn yield seamlessly.",
    categories: ["Lending", "Stablecoin", "1st Tier Airdrop"],
    status: "Live",
    website: "https://usefelix.xyz?ref=18935567",
    tags: ["Lending", "Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1845076293735297024/mx8MTMca_400x400.jpg",
  },
  {
    id: 3,
    name: "tread.fi",
    description: "Crypto trading terminal. Institutional grade OEMS.",
    categories: ["Bot", "Front End"],
    status: "Live",
    website: "https://app.tread.fi/referral/34CQIRWV",
    tags: ["Bot", "Front End"],
    logo: "https://pbs.twimg.com/profile_images/2000493331365920770/AWOwvKqn_400x400.jpg",
  },
  {
    id: 4,
    name: "Project X",
    description:
      "Project X is built on the belief that tech is becoming increasingly commoditized and the next era of DeFi will be won by innovating on distribution, incentive design and UX.",
    categories: ["DEX", "1st Tier Airdrop"],
    status: "Live",
    website: "https://www.prjx.com/@0xLcrgs",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1922089219737911296/1miGhDTB_400x400.jpg",
  },
  {
    id: 5,
    name: "Liminal",
    description:
      "Liminal is a protocol that enables users to earn real and sustainable yield on their stablecoins through delta-neutral strategies",
    categories: ["Yield", "Delta-neutral", "1st Tier Airdrop"],
    status: "Live",
    website: "https://liminal.money/join/XLCRGS",
    tags: ["Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1934561280637222912/sgMp90I7_400x400.jpg",
  },
  {
    id: 6,
    name: "Nest Exchange",
    description: "The trading and liquidity engine for Hyperliquid",
    categories: ["DEX"],
    status: "Coming Soon",
    website: "https://www.usenest.xyz/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1979502682537611264/8tf3gNFS_400x400.jpg",
  },
  {
    id: 7,
    name: "Based",
    description:
      "Spend Crypto like Fiat with BasedApp Visa Card. Live in SG, opening up to more countries in April 2025. Backed by Delphi, Hashed and Spartan. | C15SAMN1",
    categories: ["Mobile Wallet", "Front End", "2nd Tier Airdrop"],
    status: "Live",
    website: "https://basedapp.io/register?ref=XLCRGS",
    tags: ["Mobile Wallet", "Front End"],
    logo: "https://pbs.twimg.com/profile_images/2002771365037019136/r5KMEUkg_400x400.jpg",
  },
  {
    id: 284,
    name: "Bullpen",
    description: "Bullpen is the easiest way to trade crypto perps on mobile—period.",
    categories: ["Mobile Wallet", "Front End", "2nd Tier Airdrop"],
    status: "Live",
    website: "https://bullpen.fi/@grg_ouz",
    tags: ["Mobile Wallet", "Front End"],
    logo: "https://pbs.twimg.com/profile_images/1956038689152184336/UDbECykj_400x400.jpg",
  },
  {
    id: 8,
    name: "Hyperwagyu",
    description: "A Trustless Hyperliquid <> Monero Bridge",
    categories: ["Bridge"],
    status: "Live",
    website: "https://www.hyperwagyu.xyz/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1997372011538984960/y_QEwcaI_400x400.jpg",
  },
  {
    id: 9,
    name: "Dexari",
    description:
      "Dexari is a user-friendly DeFi platform, aiming to give everyone control of digital assets with centralized platform ease.",
    categories: ["Mobile Wallet", "2nd Tier Airdrop"],
    status: "Live",
    website: "https://dexari.com/join/xlcrgs",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1928147422313848832/GxjMV0TQ_400x400.jpg",
  },
  {
    id: 10,
    name: "trade.xyz",
    description: "Trade anything, anytime.",
    categories: ["Front End", "1st Tier Airdrop"],
    status: "Beta",
    website: "https://trade.xyz/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1971989421844000768/MNOCmF3z_400x400.jpg",
  },
  {
    id: 11,
    name: "Liquid",
    description: "Liquid is the fastest way to trade Bitcoin, ETH, and 200+ other coins with up to 40x multipliers.",
    categories: ["Mobile Wallet"],
    status: "Live",
    website: "https://referral.tryliquid.xyz/pa9N6Yf5QVb",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1980705287322357760/HhxSRvbc_400x400.jpg",
  },
  {
    id: 12,
    name: "HyperFlow",
    description: "Flow seamlessly into Hyperliquid with Hyperflow! DEX & bridge Aggregator for fast swaps & transfers.",
    categories: ["Bridge", "DEX", "3rd Tier Airdrop"],
    status: "Live",
    website: "https://hyperflow.fun?ref=2HfzW",
    tags: ["Bridge", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1914981578272595968/tMZbWPkT_400x400.jpg",
  },
  {
    id: 13,
    name: "Ventuals",
    description: "Long or short pre-IPO companies with leverage, on Hyperliquid",
    categories: ["Front End", "1st Tier Airdrop"],
    status: "Live",
    website: "https://app.ventuals.com/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1931109324480229376/EB_PojFW_400x400.png",
  },
  {
    id: 14,
    name: "HyperBloom",
    description:
      "Hyperbloom is a DEX aggregator and yield optimizer on HyperEVM, offering best swap rates and autocompounding yields across Hyperliquid",
    categories: ["DEX", "3rd Tier Airdrop"],
    status: "Live",
    website: "https://app.hyperbloom.xyz/?ref=6430f279-b",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1974003014659723264/5pzYHG6A_400x400.jpg",
  },
  {
    id: 15,
    name: "Hyperdrive",
    description:
      "The premier stablecoin money market on Hyperliquid and the foundational layer for making everything on HyperCore liquid.",
    categories: ["Lending", "Yield", "2nd Tier Airdrop"],
    status: "Live",
    website: "https://app.hyperdrive.fi?ref=133A9FEB",
    tags: ["Lending", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1903009623214526464/KLFqDb6j_400x400.jpg",
  },
  {
    id: 16,
    name: "Markets",
    description: "By Kinetiq",
    categories: ["Front End"],
    status: "Coming Soon",
    website: "https://x.com/markets_xyz",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/2000613313902780418/m6MlsRpl_400x400.jpg",
  },
  {
    id: 17,
    name: "hx_finance",
    description: "The future of private DeFi on HyperEVM. Efficient swaps now, zero-knowledge privacy on the horizon.",
    categories: ["DEX", "3rd Tier Airdrop"],
    status: "Live",
    website: "https://app.hx.finance?ref=xlcrgs",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1968928687023067136/K4KvjUa0_400x400.jpg",
  },
  {
    id: 18,
    name: "Gliquid",
    description: "Next-Gen V4 AMM unlocking hyper-efficient liquidity on Hyperliquid Powered by Crypto Algebra",
    categories: ["DEX", "3rd Tier Airdrop"],
    status: "Live",
    website: "https://www.gliquid.xyz?referral=g5JIsrfD",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1979237805386604544/Hdr0z-D7_400x400.jpg",
  },
  {
    id: 19,
    name: "HyperBrick",
    description:
      "DLMM DEX powering precision trading, dynamic liquidity, and yield-optimized pools for next-gen tokens on Hyperliquid",
    categories: ["DEX", "3rd Tier Airdrop"],
    status: "Live",
    website: "https://hyperbrick.xyz/point?ref=XLCRGS",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1945444770773336064/ZAUJfdBF_400x400.jpg",
  },
  {
    id: 20,
    name: "Splash",
    description:
      "Splash Wallet is a non-custodial crypto wallet that integrates DeFi protocols directly into the user interface.",
    categories: ["Mobile Wallet"],
    status: "Beta",
    website: "https://splashwallet.xyz/",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1938085622725701632/n09KtLmW_400x400.jpg",
  },
  {
    id: 21,
    name: "Unit",
    description:
      "Unit is Hyperliquid's native asset tokenization layer that brings spot assets directly into the exchange and ecosystem.",
    categories: ["Bridge", "1st Tier Airdrop"],
    status: "Live",
    website: "https://app.hyperunit.xyz/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1937271299338035200/sEKHkXkc_400x400.jpg",
  },
  {
    id: 22,
    name: "Kinetiq",
    description: "Powering Liquid Staking on Hyperliquid.",
    categories: ["LST", "1st Tier Airdrop"],
    status: "Live",
    website: "https://kinetiq.xyz/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1979238128289300480/92H90ZSs_400x400.jpg",
  },
  {
    id: 23,
    name: "HypurrFi",
    description: "HypurrFi is a leveraged lending marketplace for clean leverage loops on Hyperliquid.",
    categories: ["Lending", "Stablecoin", "2nd Tier Airdrop"],
    status: "Live",
    website: "https://app.hypurr.fi/buddies/0XLCRGS",
    tags: ["Lending", "Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1991902971676758017/Dl4dF7Ay_400x400.jpg",
  },
  {
    id: 24,
    name: "Dextrabot",
    description:
      "Discover profitable traders, analyze their performance, and automatically copy their strategies with customizable risk settings",
    categories: ["Bot", "Front End"],
    status: "Live",
    website: "https://app.dextrabot.com/referral/0XLCRGS",
    tags: ["Bot", "Tracker", "Front End"],
    logo: "https://pbs.twimg.com/profile_images/1858644852365275136/EpQL8Nkb_400x400.jpg",
  },
  {
    id: 25,
    name: "SuperX",
    description:
      "SuperX is a Telegram copy trading bot for Hyperliquid, letting users discover and copy top traders across perps, and soon, spot",
    categories: ["Bot"],
    status: "Live",
    website: "https://trysuper.co/ref/0xlcrgs",
    tags: ["Bot", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1913916356874952704/RrNrTN0H_400x400.jpg",
  },
  {
    id: 26,
    name: "Hyperbeat",
    description:
      "Hyperbeat is a native protocol on Hyperliquid, designed to scale HyperliquidX, HyperEVM, and the broader ecosystem",
    categories: ["Yield", "Delta-neutral", "1st Tier Airdrop"],
    status: "Live",
    website: "https://app.hyperbeat.org/earn?referral=FA86003B",
    tags: ["Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1879158343194796032/ftN7FT3s_400x400.jpg",
  },
  {
    id: 27,
    name: "Ultrasolid",
    description: "Core-aligned veDEX on Hyperliquid.",
    categories: ["DEX", "1st Tier Airdrop"],
    status: "Live",
    website: "https://app.ultrasolid.xyz/@xlcrgs",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1952299861392662528/lSUI8LR4_400x400.jpg",
  },
  {
    id: 28,
    name: "pvp.trade",
    description:
      "pvp.trade is a Telegram bot for trading groups, letting members track, copy, or countertrade each other's positions in real time",
    categories: ["Bot"],
    status: "Live",
    website: "https://pvp.trade/join/tb3b3s",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1811823687273754624/Qf6hsnsI_400x400.jpg",
  },
  {
    id: 29,
    name: "LiquidScan",
    description: "Advanced analytics and trading tools for the HyperEVM ecosystem.",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/LiquidScanTrading_Bot?start=ref_HYPERLCRGS",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1920773638317326336/5hCikU5b_400x400.jpg",
  },
  {
    id: 30,
    name: "Blueberry",
    description: "Tokenized Yield strategies and curated DeFi ecosystem on Hyperliquid EVM",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.blueberry.garden/?referrer=xlcrgs",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1624077952601423878/GjmtH148_400x400.jpg",
  },
  {
    id: 31,
    name: "HYPE Engine",
    description: "The $HYPE accumulation machine.",
    categories: ["Yield"],
    status: "Coming Soon",
    website: "https://x.com/TheHypeEngine",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1979502579827482624/xFqCy9VQ_400x400.jpg",
  },
  {
    id: 32,
    name: "ApStation",
    description:
      "ApStation is a next-gen DEX aggregator and liquidity router on HyperEVM, offering 0% protocol fees and optimal swaps for the Hyperliquid ecosystem.",
    categories: ["DEX"],
    status: "Live",
    website: "https://apstation.io/swap?referer=K51KWZEJ",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1932105712408145920/19Zzxd3Y_400x400.jpg",
  },
  {
    id: 33,
    name: "Hyperwave",
    description:
      "Hyperwave DAO aims to build a DeFi SuperApp on Hyperliquid, starting with hwHLP, to create asset markets and real-world use for users.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.hyperwavefi.xyz/hyperfren/XLCRGS",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1935137488886185984/aH_2XS_M_400x400.png",
  },
  {
    id: 34,
    name: "Harmonix Finance",
    description:
      "Harmonix Finance offers automated vaults with hedge fund strategies, making advanced investment optimization easy and accessible for users.",
    categories: ["Yield", "Delta-neutral"],
    status: "Live",
    website: "https://app.harmonix.fi/?ref=Bv2S47vd",
    tags: ["Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1795360456686837760/dAl7G6dh_400x400.png",
  },
  {
    id: 35,
    name: "Valantis",
    description:
      "A stHYPE-focused AMM for LSTs, never depegs, natively integrates staking, and assets keep earning extra yield via Hyperlend integration",
    categories: ["LST", "DEX"],
    status: "Live",
    website: "https://www.valantis.xyz/",
    tags: ["LST", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1995684070496362497/RKAuYxox_400x400.jpg",
  },
  {
    id: 36,
    name: "Looped Hype",
    description:
      "Looped Hype (LHYPE) lets users deposit HYPE to get LHYPE, using automated looping to maximize yield on staked HYPE and yield tokens",
    categories: ["LST", "Yield"],
    status: "Live",
    website: "https://loopedhype.com/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1943661057123205120/yNmFkXza_400x400.jpg",
  },
  {
    id: 37,
    name: "LiquidLabs",
    description:
      "Create tokens and agents effortlessly, trade for profits seamlessly, all without writing a single line of code!",
    categories: ["Launchpad", "DEX"],
    status: "Live",
    website: "https://liqd.ag/",
    tags: ["Launchpad", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1981094134669533184/VNwnq46t_400x400.jpg",
  },
  {
    id: 38,
    name: "HyperSwap",
    description: "First HyperEVM native AMM DEX and Liquidity Hub",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.hyperswap.exchange/#/swap?referral=0xLcrgs",
    tags: ["DEX", "AMM"],
    logo: "https://pbs.twimg.com/profile_images/1818300103825719296/mE6pjX1x_400x400.jpg",
  },
  {
    id: 39,
    name: "KittenSwap",
    description: "Kittenswap is a community owned DEX on HyperEVM with ve(3,3) mechanics!",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.kittenswap.finance/swap",
    tags: ["DEX", "ve(3,3)"],
    logo: "https://pbs.twimg.com/profile_images/1951351497754632192/aLjGUNxI_400x400.jpg",
  },
  {
    id: 40,
    name: "Morpho",
    description: "Open infrastructure for onchain loans",
    categories: ["Lending", "Yield"],
    status: "Live",
    website: "https://morpho.org/",
    tags: ["Lending", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1930600293915410432/dgTU7UNU_400x400.jpg",
  },
  {
    id: 41,
    name: "Pendle",
    description: "Liberating Yield || The world's largest crypto yield trading platform",
    categories: ["Yield"],
    status: "Live",
    website: "https://www.pendle.finance/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1621033017337843713/loDsYCJr_400x400.jpg",
  },
  {
    id: 42,
    name: "Spectra",
    description:
      "Permissionless yield protocol | Create pools, fix rates, trade yield, govern & earn | Formerly APWine",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.spectra.finance/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1678456403080486927/la7vcn7-_400x400.jpg",
  },
  {
    id: 43,
    name: "Upshift",
    description:
      "Upshift is the first institutional DeFi yield platform. Access capital-efficient yield strategies used by DeFi funds.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.upshift.finance/r/dEc4C8A42A98",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1853600042952663040/AwOMmTi1_400x400.jpg",
  },
  {
    id: 44,
    name: "USDhl",
    description:
      "USDhl is a treasury-backed stablecoin for both HyperCore and HyperEVM, tradable against USDC and usable across integrated DeFi apps",
    categories: ["Stablecoin"],
    status: "Live",
    website: "https://usdhl.xyz/",
    tags: ["Stablecoin"],
    logo: "https://usefelix.gitbook.io/usdhl/~gitbook/image?url=https%3A%2F%2F3235872099-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Forganizations%252Fn5iCQOMvurUghop1f7qS%252Fsites%252Fsite_2lLPE%252Ficon%252Fqz1M9JPCnbQYgkpVsHKw%252FrkFUzZ4Z_400x400.jpg%3Falt%3Dmedia%26token%3D96630b3d-560e-4d9c-a493-9975e2cdd076&width=32&dpr=4&quality=100&sign=1d5f7368&sv=2",
  },
  {
    id: 45,
    name: "Delpho",
    description:
      "Delpho uses new tech to eliminate sequencing gaps and trust issues, letting stablecoins achieve both safety and earnings.",
    categories: ["Stablecoin"],
    status: "Coming Soon",
    website: "https://www.delpho.xyz/",
    tags: ["Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1942486893637128192/5L46DcQo_400x400.jpg",
  },
  {
    id: 46,
    name: "Fullstack.Trade",
    description: "Multi Asset Margin for Hyperliquid. The only front end you'll ever need.",
    categories: ["Front End"],
    status: "Coming Soon",
    website: "https://x.com/fullstack_trade",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1972875587976073216/VbPfyThC_400x400.jpg",
  },
  {
    id: 47,
    name: "Based",
    description: "#1 Degen Trading Bot",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/based_eth_bot?start=r_xLcrgs",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1867165795752562689/gknOnrpW_400x400.jpg",
  },
  {
    id: 48,
    name: "Insilico Terminal",
    description:
      "First professional-grade order and execution management terminal on HyperLiquid, free to use, with advanced features for all traders.",
    categories: ["Front End"],
    status: "Live",
    website: "https://insilicoterminal.com/#/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1961017208127021056/J93iHkBn_400x400.jpg",
  },
  {
    id: 49,
    name: "Theo",
    description:
      "Theo is decentralized trading infrastructure connecting onchain capital with global markets and institutions.",
    categories: ["Yield", "Stablecoin", "Delta-neutral"],
    status: "Live",
    website: "https://app.theo.xyz/invite?invite=8ab991be-7e8a-40a5-9b93-c3b2518a6a95",
    tags: ["Yield", "Stablecoin", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1928132409783963648/LizAN275_400x400.png",
  },
  {
    id: 50,
    name: "USDT0",
    description: "USDT0 brings the largest stablecoin in the world to the most widely adopted blockchains.",
    categories: ["Stablecoin", "Bridge"],
    status: "Coming Soon",
    website: "https://usdt0.to/",
    tags: ["Stablecoin", "Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1879546764971188224/SQISVYwX_400x400.jpg",
  },
  {
    id: 51,
    name: "Stargate",
    description:
      "Stargate enables seamless cross-chain asset transfers and provides technical docs on architecture, primitives, and developer integration.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://stargate.finance/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1928147506699145217/n7-KQGNJ_400x400.png",
  },
  {
    id: 52,
    name: "Relay",
    description:
      "Instant, low-cost swapping, bridging and cross-chain execution on 80+ chains & counting. Built by Reservoir",
    categories: ["Bridge", "On-Ramp"],
    status: "Live",
    website: "https://relay.link/bridge",
    tags: ["Bridge", "On-Ramp"],
    logo: "https://pbs.twimg.com/profile_images/1960334543052816384/ejODKCzq_400x400.jpg",
  },
  {
    id: 53,
    name: "Garden",
    description: "Trustless peer-to-peer bitcoin bridge",
    categories: ["Bridge"],
    status: "Live",
    website: "https://garden.finance/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1955253205832699904/83uUswbn_400x400.jpg",
  },
  {
    id: 54,
    name: "Jumper Exchange",
    description: "Crypto's Everything Exchange",
    categories: ["Bridge", "DEX"],
    status: "Live",
    website: "https://jumper.exchange/",
    tags: ["Bridge", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1995446284627632128/UEEe3Id8_400x400.jpg",
  },
  {
    id: 55,
    name: "Bungee",
    description: "Bungee is a liquidity marketplace built on SOCKET that lets you trade any token on any chain.",
    categories: ["Bridge", "DEX"],
    status: "Live",
    website: "https://www.bungee.exchange/",
    tags: ["Bridge", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1938126602774450177/qEmo_mDl_400x400.png",
  },
  {
    id: 56,
    name: "Veda",
    description: "The DeFi Engine for Financial Apps // $4B+ in deposits",
    categories: ["Yield"],
    status: "Live",
    website: "https://veda.tech/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1937083372246798336/3ELNfUvR_400x400.jpg",
  },
  {
    id: 57,
    name: "D2 Finance",
    description:
      "D2 Finance is tokenizing real risk-adjusted returns / derivatives trades with a proven track record on-chain.",
    categories: ["Yield", "Delta-neutral"],
    status: "Live",
    website: "https://d2.finance/",
    tags: ["Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1765931135308115968/f_4LkxDr_400x400.jpg",
  },
  {
    id: 58,
    name: "Turtle.Club",
    description:
      "Turtle Club links LPs to top incentives across assets and chains, simplifying due diligence by operating without smart contracts.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.turtle.xyz/leaderboard?earnRef=0XLCRGS",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1830925816802451456/OUDzqTkE_400x400.png",
  },
  {
    id: 59,
    name: "HyperStrategy",
    description:
      "HyperStrategy is the first fully onchain protocol on HyperEVM designed to mirror the strategy of MicroStrategy",
    categories: ["Yield"],
    status: "Beta",
    website: "https://www.hyperstrategy.com/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1931801104070651904/Q8v7xcFd_400x400.jpg",
  },
  {
    id: 60,
    name: "Silhouette",
    description:
      "Silhouette is a decentralized trading platform for Hyperliquid, using privacy tech and a hidden matching engine for optimized trade execution.",
    categories: ["DEX"],
    status: "Coming Soon",
    website: "https://silhouette.exchange/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1868973700516601857/jktAc9SE_400x400.jpg",
  },
  {
    id: 61,
    name: "Perpflow",
    description:
      "Perpflow automates and tracks delta-neutral perp positions, earning yield from funding rates no matter which way the market moves.",
    categories: ["Yield", "Delta-neutral"],
    status: "Live",
    website: "https://perpflow.xyz/",
    tags: ["Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1873732821753249792/tJbXJ3fz_400x400.jpg",
  },
  {
    id: 62,
    name: "Arkis",
    description:
      "Arkis is a digital asset prime brokerage offering undercollateralized lending and leverage for capital providers and asset managers",
    categories: ["Yield"],
    status: "Live",
    website: "https://arkis.xyz/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1915081501563076609/E_iRuoQD_400x400.jpg",
  },
  {
    id: 63,
    name: "Rysk Finance",
    description:
      "Rysk V12 brings high, sustainable yield on ETH, BTC, and volatile DeFi assets by reimagining covered calls for scalable returns",
    categories: ["Options"],
    status: "Beta",
    website: "https://app.rysk.finance/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1556700928748781569/bLjEj9yu_400x400.jpg",
  },
  {
    id: 64,
    name: "SLTP",
    description: "The only perp terminal built for the long run, powered by Hyperliquid",
    categories: ["Mobile Wallet", "Front End"],
    status: "Beta",
    website: "https://sltp.trade?referral=jimyq4",
    tags: ["Mobile Wallet", "Front End"],
    logo: "https://pbs.twimg.com/profile_images/1966012676099993600/7sqCfZ33_400x400.png",
  },
  {
    id: 65,
    name: "CCTP.to",
    description:
      "Fee-free USDC transfers across chains. Built as a public good using Circle's CCTP. No markups, no hidden costs.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://www.cctp.to/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1968089645184331776/ZXi8xGwD_400x400.jpg",
  },
  {
    id: 66,
    name: "Ooga Booga",
    description: "Liquidity aggregator.",
    categories: ["DEX"],
    status: "Live",
    website: "https://hyperliquid.oogabooga.io/",
    tags: ["DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1946339928033370113/rd5FlNAl_400x400.png",
  },
  {
    id: 67,
    name: "SpinUp",
    description: "Spin memes into perpetual market fire.",
    categories: ["Launchpad", "LST"],
    status: "Live",
    website: "https://www.spinup.zone/stake?ref=0xE48c64Ec6cf456a28F91e5B2bdA3A626DEDCC8E5",
    tags: ["Launchpad", "LST"],
    logo: "https://pbs.twimg.com/profile_images/1976174812717289472/RMuWA5Sh_400x400.jpg",
  },
  {
    id: 68,
    name: "HyperSignals",
    description:
      "Delivering trading edge via hyperliquid orderbook patterns, smart money moves & offchain sentiment analysis.",
    categories: ["Bot", "Tools"],
    status: "Beta",
    website: "https://hypersignals.ai/",
    tags: ["Bot", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1924849892314255361/a_SduLa2_400x400.png",
  },
  {
    id: 69,
    name: "Coinpilot",
    description: "Save 10% off fees with code: 82246a | Copy winning traders on Hyperliquid today.",
    categories: ["Bot"],
    status: "Beta",
    website: "https://apps.apple.com/hk/app/coinpilot/id6747697788",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1930155502790721536/obB_vr3H_400x400.jpg",
  },
  {
    id: 70,
    name: "Gigabrain",
    description:
      "Gigabrain.gg is an AI-powered crypto market platform, offering traders institutional-grade insights and early trading signals on 3,000+ projects.",
    categories: ["Tools"],
    status: "Live",
    website: "https://gigabrain.gg/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1946086777724235776/Z5wcLdaV_400x400.jpg",
  },
  {
    id: 71,
    name: "HyBridge",
    description: "Your Hyperliquid Bridge. Fast, Seamless, and Ready to Connect Across EVM & SOL Chains.",
    categories: ["Bridge", "DEX", "On-Ramp"],
    status: "Live",
    website: "https://hybridge.xyz/?refUser=26daeda2",
    tags: ["Bridge", "DEX Aggregator", "On-Ramp"],
    logo: "https://pbs.twimg.com/profile_images/1945131271996272640/_EjA_EV2_400x400.jpg",
  },
  {
    id: 72,
    name: "Laminar",
    description:
      "Laminar is a liquidity engine and aggregator on HyperEVM and HyperCore, connecting liquidity to offer simple, optimally priced swaps",
    categories: ["DEX"],
    status: "Live",
    website: "https://laminar.xyz/swap?referral=0xlcrgs",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1881501408022892544/RJdoM0TD_400x400.jpg",
  },
  {
    id: 73,
    name: "HyperCat",
    description:
      "HyperCat is a DEX on Algebra Integral's modular V4 AMM, enabling flexible trading and liquidity via plugins and custom on-chain hooks",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.hypercat.exchange/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1935052838494945282/E46pS0A7_400x400.png",
  },
  {
    id: 74,
    name: "Dreamcash",
    description: "Code: xrlyfy | Trading so good it feels like a dream. On Hyperliquid.",
    categories: ["Mobile Wallet"],
    status: "Beta",
    website: "https://dreamcash.xyz",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1950639556446900224/sUXo-sDJ_400x400.jpg",
  },
  {
    id: 75,
    name: "Hyperstable",
    description:
      "Hyperstable is a crypto-backed, over-collateralized and decentralized stablecoin that's designed to trade at one US Dollar.",
    categories: ["Lending", "Stablecoin"],
    status: "Live",
    website: "https://app.hyperstable.xyz/r/0xLcrgs",
    tags: ["Lending", "Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1911431404476362753/WdVhBKDh_400x400.png",
  },
  {
    id: 76,
    name: "Neko.hl",
    description:
      "Neko is the first DeFAI Swarm on Hyperliquid, using AI to automate DeFi trading, token launches, and yield strategies for users",
    categories: ["Bot", "Tools"],
    status: "Coming Soon",
    website: "https://www.neko.fun/",
    tags: ["Bot", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1880643122683916288/xtRa6Q64_400x400.png",
  },
  {
    id: 77,
    name: "HyperFlash",
    description:
      "HyperFlash is a next-gen staking protocol on HyperEVM, combining liquid staking with MEV strategies to maximize HYPE yields for users",
    categories: ["LST"],
    status: "Beta",
    website: "https://hyperflash.xyz/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1892277863430168576/TIbtpNHW_400x400.jpg",
  },
  {
    id: 78,
    name: "RubiFi",
    description:
      "The world's first democratized market making platform. Powered by $RUB, the most scarce and expensive asset in crypto",
    categories: ["Other"],
    status: "Live",
    website: "https://www.rub.finance/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1949681143214931969/VqiidYkV_400x400.jpg",
  },
  {
    id: 79,
    name: "SEKAI",
    description: "Sekai is building a platform to let anyone launch Liquid Staking Tokens on Hyperliquid. ",
    categories: ["Launchpad"],
    status: "Coming Soon",
    website: "https://sekai.fi/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1952637430697222144/HcDyXa6S_400x400.jpg",
  },
  {
    id: 80,
    name: "HypurrQuant",
    description:
      "HypurrQuant strives to provide a better automated trading experience, passive income opportunities, asset management, and DeFi services.",
    categories: ["Bot", "Yield", "Delta-neutral"],
    status: "Live",
    website: "https://t.me/hypurrQuant_bot",
    tags: ["Bot", "Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1912707637424320514/cvLVUN6g_400x400.jpg",
  },
  {
    id: 81,
    name: "Noble",
    description: "Purpose-built for stablecoin issuance Optimizing for UX",
    categories: ["Stablecoin"],
    status: "Coming Soon",
    website: "https://www.noble.xyz/",
    tags: ["Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1760713184493670400/SAXSaUTN_400x400.jpg",
  },
  {
    id: 82,
    name: "HyperWarp",
    description:
      "HyperWarp is a marketplace to unlock liquidity for vote-escrowed NFTs (veNFTs). Starting with veKitten",
    categories: ["NFT"],
    status: "Live",
    website: "https://www.hyperwarp.fi/",
    tags: ["NFT", "veNFT"],
    logo: "https://pbs.twimg.com/profile_images/1912684430440755200/tA0LNV_E_400x400.jpg",
  },
  {
    id: 83,
    name: "Keiko Finance",
    description:
      "Keiko is a permissionless borrowing protocol with dynamic interest rates and liquidation ratios on Hyperliquid",
    categories: ["Lending", "Stablecoin"],
    status: "Live",
    website: "https://app.keikofinance.com/#",
    tags: ["Lending", "Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1991540857766354967/SNLji12a_400x400.jpg",
  },
  {
    id: 84,
    name: "HyperYield",
    description: "Lend, Borrow, Earn at Hyper Speed on HyperLiquid L1",
    categories: ["Lending"],
    status: "Live",
    website: "https://app.hyperyield.com/?invite=UlTQLGpKXhcq",
    tags: ["Lending"],
    logo: "https://pbs.twimg.com/profile_images/1878399390240411648/cp1BIbd6_400x400.jpg",
  },
  {
    id: 85,
    name: "Bunni",
    description:
      "The Shapeshifting Exchange - DEX that maximizes liquidity provider profits in all market conditions. Built on Uniswap v4",
    categories: ["Yield"],
    status: "Live",
    website: "https://bunni.xyz/explore/pools?ref=0xE48c64Ec6cf456a28F91e5B2bdA3A626DEDCC8E5",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1884669497677647872/t_i4-ppl_400x400.jpg",
  },
  {
    id: 86,
    name: "Supercexy",
    description: "You're still early",
    categories: ["Mobile Wallet"],
    status: "Live",
    website: "https://supercexy.com/@0xlcrgs",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1953782840157749248/3nEXVDCi_400x400.jpg",
  },
  {
    id: 87,
    name: "Wallet V",
    description:
      "Code: 16606 | We've built Wallet V to help you find, seize, and manage the best opportunities in the decentralized ecosystem.",
    categories: ["Mobile Wallet"],
    status: "Live",
    website: "https://walletv.io/",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1988016788416626688/8Ua_z3VW_400x400.jpg",
  },
  {
    id: 88,
    name: "Liquid Terminal",
    description: "The terminal to house all Hyperliquid",
    categories: ["Front End"],
    status: "Beta",
    website: "https://liquidterminal.xyz/?ref=HyperLcrgs",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1879551929799364608/io3_oOVD_400x400.jpg",
  },
  {
    id: 89,
    name: "GemsGun",
    description: "All-in-one HyperEVM trading platform. Data-driven, trader-focused, always ahead.",
    categories: ["Front End"],
    status: "Live",
    website: "https://gemsgun.com/hyper/discover?inviteCode=CrFqBpar",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1921830295944507392/ojy-o2AT_400x400.jpg",
  },
  {
    id: 90,
    name: "Haiku",
    description: "Haiku is the AI-powered trading hub of Berachain, built on a simple belief: trading should be easy.",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.haiku.trade/trade",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1961481058077077504/4JzRDWYX_400x400.jpg",
  },
  {
    id: 91,
    name: "Matcha",
    description: "The powerful onchain DEX aggregator built by 0x",
    categories: ["DEX"],
    status: "Live",
    website: "https://meta.matcha.xyz/?chainId=999&sellToken=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1936106079877844992/t_kZCRae_400x400.jpg",
  },
  {
    id: 92,
    name: "Kyber Network",
    description: "Swap crypto at the best rates with KyberSwap, the Multichain Aggregator available on 16 chains",
    categories: ["DEX"],
    status: "Live",
    website: "https://kyberswap.com/",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1641706567014940672/UFuWgdxn_400x400.jpg",
  },
  {
    id: 93,
    name: "Balancer",
    description:
      "The ultimate platform for custom liquidity solutions. Balancer v3 perfectly balances simplicity and flexibility to reshape the future of AMMs.",
    categories: ["DEX"],
    status: "Live",
    website: "https://balancer.fi/",
    tags: ["DEX", "CLAMM"],
    logo: "https://pbs.twimg.com/profile_images/1948110735919206400/k0A_9Gix_400x400.jpg",
  },
  {
    id: 94,
    name: "OpenOcean",
    description: "Swap and bridge any token directly in Hyperfolio, powered by OpenOcean",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.openocean.finance/",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/2001840454112022528/MtPC4455_400x400.jpg",
  },
  {
    id: 95,
    name: "RAMSES",
    description:
      "Ramses: Arbitrum's AMM hub with Uniswap v3 security, custom incentives, vote-lock governance, and user-friendly experience.",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.ramses.xyz/trade",
    tags: ["DEX", "ve(3,3)"],
    logo: "https://pbs.twimg.com/profile_images/1975421034028281856/MGE7BvAj_400x400.jpg",
  },
  {
    id: 96,
    name: "Houdini Swap",
    description: "The most trusted swap in crypto for any chain. Transparent where it counts. Private when it matters.",
    categories: ["Bridge", "DEX"],
    status: "Live",
    website: "https://houdiniswap.com/",
    tags: ["Bridge", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1747364391110979584/GJxP5GVU_400x400.jpg",
  },
  {
    id: 97,
    name: "hyperG8",
    description:
      "hyperG8 is a fast trading platform for hyperEVM tokens, streaming new pairs, transactions, and prices in real time for safe, smart trading",
    categories: ["DEX"],
    status: "Live",
    website: "https://hyper.g8.xyz/?ref=0XLCRGS",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1927392038397341696/snDMJDN1_400x400.jpg",
  },
  {
    id: 98,
    name: "Bebop",
    description:
      "Bebop is a DEX offering best execution, guaranteed pricing, top security, and robust APIs/SDKs for seamless, slippage-free DeFi trading",
    categories: ["DEX"],
    status: "Live",
    website: "https://bebop.xyz/trade?network=hyperevm",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/2000900041997967360/ncb99tto_400x400.jpg",
  },
  {
    id: 99,
    name: "GlueX Protocol",
    description:
      "GlueX is HyperEVM's first native swap router, unifying swaps, lending, and liquidity in one interface—no MEV losses or upfront fees",
    categories: ["DEX"],
    status: "Live",
    website: "https://dapp.gluex.xyz/",
    tags: ["DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1906594758635483136/qEPWWGkA_400x400.jpg",
  },
  {
    id: 100,
    name: "RocketX",
    description: "Crypto's Everything Exchange",
    categories: ["Bridge", "DEX"],
    status: "Live",
    website: "https://app.rocketx.exchange/swap",
    tags: ["Bridge", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1856371495850901504/s7htSrnS_400x400.jpg",
  },
  {
    id: 101,
    name: "Mayan",
    description:
      "Mayan is a cross-chain swap auction protocol delivering optimal rates via transparent bidding, live on Solana, EVM, and Sui-Move",
    categories: ["Bridge"],
    status: "Live",
    website: "https://swap.mayan.finance/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1995516018748219392/4Q4w7xBt_400x400.png",
  },
  {
    id: 102,
    name: "DeBridge",
    description: "Multichain bridge",
    categories: ["Bridge"],
    status: "Live",
    website: "https://app.debridge.finance/r/31599",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1894665537466040320/5vQrjq6M_400x400.jpg",
  },
  {
    id: 103,
    name: "Symbiosis",
    description: "A cross-chain engine and liquidity protocol.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://app.symbiosis.finance/swap?chainIn=Ethereum&tokenIn=ETH",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1882650528951541760/zdaKCf4K_400x400.jpg",
  },
  {
    id: 104,
    name: "Skate",
    description: "Connecting all VMs. Interact with applications from any VM while staying on your favorite chain.",
    categories: ["DEX"],
    status: "Live",
    website: "https://amm.skatechain.org/swap",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1873921084871106563/NEW0LSI6_400x400.jpg",
  },
  {
    id: 105,
    name: "Curve Finance",
    description: "Creating deep on-chain liquidity using advanced bonding curves",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.curve.finance/dex/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1220560374346461185/W1sQNVWo_400x400.jpg",
  },
  {
    id: 106,
    name: "Hyena",
    description: "loading...",
    categories: ["Front End"],
    status: "Coming Soon",
    website: "https://www.hyena.trade/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1994070254411038720/aYWh2ESb_400x400.jpg",
  },
  {
    id: 107,
    name: "Across Protocol",
    description:
      "Across is a live cross-chain intents protocol, offering the fastest, lowest-cost value transfers without security tradeoffs",
    categories: ["Bridge"],
    status: "Live",
    website: "https://app.across.to/bridge",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1983984117092859904/0LvQEcB__400x400.jpg",
  },
  {
    id: 108,
    name: "alright botty",
    description: "Telegram bot by Alright buddy",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/alrightbottyhome_bot?start=ref_HTC4PZ4B",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1900497908559908864/JxOGs8pi_400x400.jpg",
  },
  {
    id: 109,
    name: "Apexliquid",
    description: " Trade & Copy Trade on Hyperliquid. Get 1,000+ Smart Wallets For Free. ",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/Apexliquid_Bot?start=ref_J47G6V26",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1927626311360765952/Z1aHCoTc_400x400.jpg",
  },
  {
    id: 110,
    name: "HLbot",
    description: "The first group trading bot | Built on Hyperliquid",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/hyperliquid_hlbot?start=CEB5EF",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1962822507658125318/VX4M0Q81_400x400.png",
  },
  {
    id: 111,
    name: "simpfor.fun",
    description: "Smart copy trading, grow your wealth on autopilot! powered by SOON.",
    categories: ["Bot"],
    status: "Live",
    website: "https://simpfor.fun/login?referralCode=GT3SH4",
    tags: ["Bot", "Tracker"],
    logo: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*SLk3tpy_iNrP02qf0OggPA.png",
  },
  {
    id: 112,
    name: "HyperZap",
    description:
      "Discover new & trending launches, buy HyperEVM tokens, and execute trades on Hyperliquid through our simple Telegram bot.",
    categories: ["Bot"],
    status: "Live",
    website: "https://www.hyperzap.io/",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1948012631404564481/SsVTB08L_400x400.jpg",
  },
  {
    id: 113,
    name: "Bloom",
    description: "Most advanced cross-chain trading automation SOL | BSC | BASE | HYPEREVM",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/BloomHyperLiquid_bot?start=ref_E67VP3BK8D",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1853964541261983748/oSitKQIe_400x400.jpg",
  },
  {
    id: 114,
    name: "Aura",
    description:
      "Trade perps Hyperliquid, every token on EVM + Solana, & yield with friends | Supports Apple + Google Pay",
    categories: ["Mobile Wallet"],
    status: "Coming Soon",
    website: "https://aura.money/",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1954851882142216192/UWTKuaO4_400x400.jpg",
  },
  {
    id: 115,
    name: "Hyperclash",
    description: "Assemble the sharpest Hyperliquid trader team and profit from their performance",
    categories: ["NFT"],
    status: "Live",
    website: "https://hyperclash.xyz/marketplace",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1940063303297867776/z6I4woDF_400x400.jpg",
  },
  {
    id: 116,
    name: "trade.fun",
    description:
      "Trade.fun is the fastest and fully on-chain trading platform where you can trade memecoins, perps with up to 40x leverage, farm yield, or dabble in prediction markets",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://trade.fun/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1923646981613744128/0jgndIU9_400x400.jpg",
  },
  {
    id: 117,
    name: "Allium",
    description: "Allium supports analytics, accounting, auditing, trading apps, degen use cases.",
    categories: ["Analytics"],
    status: "Live",
    website: "https://hyperliquid.allium.so/",
    tags: ["Analytics", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1778926940407132160/UEwR3lHt_400x400.jpg",
  },
  {
    id: 118,
    name: "Resolv Labs",
    description: "Trustless stablecoin and low-risk crypto investments backed by the True-Delta Neutral Architecture.",
    categories: ["Stablecoin"],
    status: "Live",
    website: "https://resolv.xyz/",
    tags: ["Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1990833426514268160/vxkdhlu-_400x400.png",
  },
  {
    id: 119,
    name: "Relend Network",
    description:
      "rUSDC lets users mint and bridge USDC wrappers from Ethereum to other chains, enabling cross-chain lending and ecosystem incentives.",
    categories: ["Lending", "Stablecoin"],
    status: "Live",
    website: "https://relend.network/",
    tags: ["Lending", "Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1838501262121209856/PrOhS3Kt_400x400.jpg",
  },
  {
    id: 120,
    name: "Rabby Wallet",
    description: "The game-changing wallet for Ethereum and all EVM chains.",
    categories: ["Mobile Wallet", "Extension Wallet"],
    status: "Live",
    website: "https://rabby.io/points?code=0XLCRGS",
    tags: ["Mobile Wallet", "Extension Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1958728511725907968/U2hr8sJ6_400x400.jpg",
  },
  {
    id: 121,
    name: "Phantom",
    description:
      "Phantom is a friendly crypto wallet built for DeFi & NFTs on Solana, Bitcoin, Ethereum, Base, and Hyperliquid",
    categories: ["Mobile Wallet", "Extension Wallet"],
    status: "Live",
    website: "https://phantom.com",
    tags: ["Mobile Wallet", "Extension Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1973036509449121792/ePaMAzyA_400x400.jpg",
  },
  {
    id: 122,
    name: "Zerion",
    description: "Trade any token on EVM & Solana | Zerion API is powering the best apps in crypto",
    categories: ["Mobile Wallet", "Extension Wallet"],
    status: "Live",
    website: "https://link.zerion.io/referral?code=5ZJ0IK44Y",
    tags: ["Mobile Wallet", "Extension Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1943619977342263296/cvmzbMP2_400x400.png",
  },
  {
    id: 123,
    name: "Brahma",
    description: "Brahma is the programmable execution layer for onchain and real-world capital.",
    categories: ["Bot", "Tools"],
    status: "Live",
    website: "https://console.brahma.fi/onboarding?code=60B56EDE",
    tags: ["Bot", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1732456585652240384/u1-fAC6J_400x400.jpg",
  },
  {
    id: 124,
    name: "Bitget Wallet",
    description: "Making Crypto for Everyone. Trade, earn, pay and discover Web3 with 80M users ",
    categories: ["Mobile Wallet", "Extension Wallet"],
    status: "Live",
    website: "https://web3.bitget.com/en",
    tags: ["Mobile Wallet", "Extension Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1985900137202532373/chOqlzmP_400x400.jpg",
  },
  {
    id: 125,
    name: "Yei Finance",
    description:
      "Building Clovis: cross-chain liquidity layer with Yield Stacking. YeiBridge, YeiLend, and YeiSwap on Sei.",
    categories: ["Yield"],
    status: "Live",
    website: "https://vault.clovis.network/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1959153542423617537/aPIUGIBX_400x400.jpg",
  },
  {
    id: 126,
    name: "Parallel Protocol",
    description:
      "Capital-efficient, over-collateralized & decentralized stablecoins. Backed by yield-generating correlated assets",
    categories: ["Yield", "Stablecoin"],
    status: "Live",
    website: "https://app.parallel.best/",
    tags: ["Yield", "Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1917852593323204609/GWO6ReJs_400x400.jpg",
  },
  {
    id: 127,
    name: "NOXA",
    description: "Degen DEX always first on new blockchains.",
    categories: ["DEX"],
    status: "Live",
    website: "https://dex.noxa.fi/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1869917127064350720/aZ2QkH0B_400x400.jpg",
  },
  {
    id: 128,
    name: "Solv Protocol",
    description: "The Operating Layer Of Bitcoin for more efficient capital flow.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.solv.finance/points/8C9FQR",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1971489442235092992/njLUqgMN_400x400.jpg",
  },
  {
    id: 129,
    name: "Hyperlauncher",
    description: "Your Agentic Copilot, launching ideas into products in minutes",
    categories: ["Launchpad"],
    status: "Beta",
    website: "https://hyperlauncher.ai/",
    tags: ["Launchpad", "AI"],
    logo: "https://pbs.twimg.com/profile_images/1938421334926823424/Q-S4MweH_400x400.jpg",
  },
  {
    id: 130,
    name: "HypuffLiquid",
    description: "Community-Driven HyperEVM Launchpad",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://hypuff.fun/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1934981354581831680/85ynWjEa_400x400.jpg",
  },
  {
    id: 131,
    name: "HyperDash",
    description:
      "Hyperdash empowers traders with real-time analytics and insights by tracking the most successful derivatives traders on Hyperliquid.",
    categories: ["Tools"],
    status: "Live",
    website: "https://hyperdash.com/join/xlcrgs",
    tags: ["Tools", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1990872908109934592/9oyEGJsg_400x400.jpg",
  },
  {
    id: 132,
    name: "Defi App",
    description: "Combining the magic of CeFi and DeFi in the world's first decentralized Superapp ",
    categories: ["Front End", "DEX"],
    status: "Live",
    website: "https://app.defi.app/join/8fYUku",
    tags: ["Front End", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1807464255249334272/CKuGD7ZW_400x400.jpg",
  },
  {
    id: 133,
    name: "Axiom",
    description: "The ONLY Trading Platform You'll Ever Need. Memes, Perps, Yield, All-In-One.",
    categories: ["Front End", "DEX"],
    status: "Live",
    website: "https://axiom.trade/@0xlcrgs",
    tags: ["Front End", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1884809179174760448/Zn1mS8ip_400x400.jpg",
  },
  {
    id: 134,
    name: "Glider",
    description:
      "Glider is a non-custodial SaaS platform for building, testing, and automating crypto trading portfolios across multiple blockchains",
    categories: ["Bot", "Tools"],
    status: "Beta",
    website: "https://glider.fi/?invite=qspnqxsx",
    tags: ["Bot", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1907062271366647808/B5WCwf_W_400x400.jpg",
  },
  {
    id: 135,
    name: "Pear Protocol",
    description:
      "Pear Protocol streamlines leveraged crypto pair trading in one on-chain transaction, improving efficiency and risk management.",
    categories: ["Front End"],
    status: "Live",
    website: "https://pear.garden/trade?referral=0xLcrgs",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1615784760328192001/kFS3qLV5_400x400.jpg",
  },
  {
    id: 136,
    name: "Maple",
    description: "Asset management, onchain.",
    categories: ["Lending", "Yield"],
    status: "Live",
    website: "https://maple.finance/",
    tags: ["Lending", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1925123677982523392/QN6KuMnz_400x400.jpg",
  },
  {
    id: 137,
    name: "WhyNotHigher",
    description: "Probably a DEX aggregator like Odos Protocol",
    categories: ["DEX"],
    status: "Coming Soon",
    website: "https://x.com/whynothigher",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1937491508577419264/qKeBq97t_400x400.jpg",
  },
  {
    id: 138,
    name: "TokenPocket",
    description:
      "Easy and safe to buy, store, send, swap tokens and collect NFTs. Trusted by 30+ millions users from 200+ countries and regions.",
    categories: ["Mobile Wallet", "Extension Wallet"],
    status: "Live",
    website: "https://www.tp.xyz/",
    tags: ["Mobile Wallet", "Extension Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1883802310834585600/HoVIdb5I_400x400.jpg",
  },
  {
    id: 139,
    name: "pvp.duel",
    description:
      "Guide to HyperEVM gaming: duel, survive, join the DAO, and play via Telegram—your gateway to the Hyperliquid gaming world.",
    categories: ["Other", "Gaming"],
    status: "Beta",
    website: "https://pvp-frontend.vercel.app/",
    tags: ["Other", "Gaming"],
    logo: "https://pbs.twimg.com/profile_images/1923474018738298880/zWldEq5d_400x400.jpg",
  },
  {
    id: 140,
    name: "HyperFly",
    description: "HyperFly is the home of DeFAI on Hyperliquid",
    categories: ["Other"],
    status: "Live",
    website: "https://hyperfly.sh/",
    tags: ["Other", "AI"],
    logo: "https://pbs.twimg.com/profile_images/1881002725946650624/5jRUF5t8_400x400.jpg",
  },
  {
    id: 141,
    name: "Sentiment.xyz",
    description:
      "Sentiment is a decentralized protocol for lending and borrowing digital assets on Ethereum and Layer 2 networks",
    categories: ["Lending"],
    status: "Live",
    website: "https://app.sentiment.xyz?refCode=dcb722ec69",
    tags: ["Lending"],
    logo: "https://pbs.twimg.com/profile_images/1777846348735537152/7-y3mdE0_400x400.jpg",
  },
  {
    id: 142,
    name: "Pocket Pro",
    description:
      "Pocket Pro is the first cross-platform Hyperliquid trading app, letting users trade perps on X, earn 20% from referrals, and enable one-click copy trading with friends.",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/pocketprotectorbot?start=r-xLcrgs",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1910382854195789824/G-dAUWhC_400x400.jpg",
  },
  {
    id: 143,
    name: "thefarm.fun",
    description:
      "The first GenAI AI Agent game on Hyperliquid: create, battle, and simulate on-chain creatures—think Cryptokitties meets Stardew Valley.",
    categories: ["Launchpad", "Gaming"],
    status: "Live",
    website: "https://www.thefarm.fun/",
    tags: ["Launchpad", "Gaming"],
    logo: "https://pbs.twimg.com/profile_images/1864910599198773250/HWsMlIpH_400x400.png",
  },
  {
    id: 144,
    name: "Rumpel Labs",
    description:
      "Rumpel is a protocol that tokenizes offchain loyalty points, enabling trading, liquidity, and price discovery for point holders and traders",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.rumpel.xyz/?ref=Q6CZBF",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1841832534742626305/HPcCzKlb_400x400.jpg",
  },
  {
    id: 145,
    name: "LiquidLoot",
    description: "Marketplace for NFTs on HyperliquidX I Launchpad coming soon I Lend&borrow coming soon",
    categories: ["NFT", "Launchpad"],
    status: "Live",
    website: "https://www.liquidloot.io/",
    tags: ["NFT", "Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1894164622602539008/IovQ374W_400x400.jpg",
  },
  {
    id: 146,
    name: "Net Protocol",
    description:
      "Net protocol is an onchain messaging protocol designed to simplify the process of writing and reading messages stored on the blockchain",
    categories: ["NFT"],
    status: "Live",
    website: "https://www.netprotocol.app/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1896484614895460352/eJrYoAU5_400x400.jpg",
  },
  {
    id: 147,
    name: "TopDog",
    description:
      "Code: XLCRG | TopDog is a Telegram native mini-app, built to empower ultimate Social Trading experience on Hyperliquid",
    categories: ["Bot"],
    status: "Live",
    website: "https://topdog.gg/referrals",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1908001097299668994/UFJRO94o_400x400.jpg",
  },
  {
    id: 148,
    name: "Reactor",
    description: "Full crypto trading stack. Unmatched control and speed on-chain. Built for those who move fast.",
    categories: ["Front End"],
    status: "Live",
    website: "https://app.reactor.trade/dashboard?ref=OM56BHEN",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1926951271736459264/BQOdQmqr_400x400.jpg",
  },
  {
    id: 149,
    name: "Cypher",
    description: "Cypher Wallet is a Multi-Chain, Non-Custodial Crypto Wallet supporting 12+ EVM + Cosmos chains .",
    categories: ["Mobile Wallet", "Extension Wallet"],
    status: "Live",
    website: "https://cypherhq.io/card/?ref=0XLCRGS",
    tags: ["Mobile Wallet", "Extension Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1975234913638223873/J3fd5DZs_400x400.jpg",
  },
  {
    id: 150,
    name: "Overdraft",
    description: "The Fiat DEX. Swap fiat - crypto in seconds. No custody. No fees. No fund freeze.",
    categories: ["On-Ramp"],
    status: "Live",
    website: "https://overdraft.com/",
    tags: ["On-Ramp"],
    logo: "https://pbs.twimg.com/profile_images/1939703991849369600/7efZ_yCa_400x400.jpg",
  },
  {
    id: 151,
    name: "Fan App",
    description: "Fan App is an exclusive content platform where creators can monetize access dynamically",
    categories: ["SocialFi"],
    status: "Live",
    website: "https://fan.fun/",
    tags: ["SocialFi"],
    logo: "https://pbs.twimg.com/profile_images/1884115595081433088/K918mGuG_400x400.png",
  },
  {
    id: 152,
    name: "HyperEVM Sniper",
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
    name: "PurrSwap",
    description:
      "AMM for HyperEVM: supports volatile/stable pools, built on Abracadabra stableswap tech, crafted for DeFi dominance.",
    categories: ["DEX"],
    status: "Coming Soon",
    website: "https://purrswap.finance/",
    tags: ["DEX", "AMM"],
    logo: "https://pbs.twimg.com/profile_images/1927398301176942592/J8mEOR0W_400x400.jpg",
  },
  {
    id: 154,
    name: "HyperTracker",
    description: "Real-time analysis of Hyperliquid wallets by Perp Equity",
    categories: ["Tools"],
    status: "Live",
    website: "https://app.coinmarketman.com/hypertracker",
    tags: ["Analytics", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1921840039191076864/MQL-3EMg_400x400.jpg",
  },
  {
    id: 155,
    name: "Massdrop",
    description: "A comprehensive tool suite for managing your web3 assets",
    categories: ["Tools"],
    status: "Live",
    website: "https://massdrop-v2.vercel.app/",
    tags: ["Tools"],
    logo: "https://massdrop-v2.vercel.app/_next/image?url=%2Fmassdrop.png&w=32&q=75",
  },
  {
    id: 156,
    name: "Hype Sphere",
    description: "Sphere map visualization platform for meme token analysis on HyperEVM",
    categories: ["Tools"],
    status: "Live",
    website: "https://hypesphere.xyz/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1926590568039079936/SkL9NtDB_400x400.jpg",
  },
  {
    id: 157,
    name: "Biconomy",
    description:
      "Effortlessly execute transactions and intents which access users, assets and liquidity across all blockchains and rollups.",
    categories: ["Tools"],
    status: "Live",
    website: "https://www.biconomy.io/",
    tags: ["Tools", "Developer"],
    logo: "https://pbs.twimg.com/profile_images/1950555090592358400/CgSHj6y1_400x400.jpg",
  },
  {
    id: 158,
    name: "ASXN",
    description: "ASXN master list of Hyperliquid Dashboards",
    categories: ["Analytics"],
    status: "Live",
    website: "https://data.asxn.xyz/",
    tags: ["Analytics"],
    logo: "https://pbs.twimg.com/profile_images/1669029465362505756/CXGvN0w0_400x400.jpg",
  },
  {
    id: 159,
    name: "PrimeFi",
    description:
      "Omnichain decentralized lending and borrowing protocol built on LayerZero to bring liquidity to Hyperliquid and other EVMs.",
    categories: ["Lending"],
    status: "Coming Soon",
    website: "https://primenumbers.xyz/",
    tags: ["Lending"],
    logo: "https://pbs.twimg.com/profile_images/1849722059154239488/TU9dzmb__400x400.jpg",
  },
  {
    id: 160,
    name: "Cathena",
    description: "Cathena aims to be the Ethena of Hyperliquid, generating delta neutral yield on USDC.",
    categories: ["Yield", "Delta-neutral"],
    status: "Live",
    website: "https://cathena.rndm.io/",
    tags: ["Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1937454986360729600/rInrXb37_400x400.jpg",
  },
  {
    id: 161,
    name: "Anchorage Digital",
    description: "The trusted crypto platform for innovators and investors.",
    categories: ["Front End"],
    status: "Live",
    website: "https://www.anchorage.com/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1597615022133354499/jJsLNXTH_400x400.png",
  },
  {
    id: 162,
    name: "ddot",
    description: "24/7 decentralized derivatives on everything that matters | built on Hyperliquid",
    categories: ["Front End"],
    status: "Coming Soon",
    website: "https://hypermercantile.gitbook.io/docs",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1939028964900528129/GreaVdZG_400x400.jpg",
  },
  {
    id: 163,
    name: "HyperVision",
    description: "Building the future of privacy on Hyperliquid. VisionAnon — the multichain anonymous bridge & swap.",
    categories: ["DEX", "Bridge"],
    status: "Beta",
    website: "https://www.visionanon.com/",
    tags: ["DEX", "Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1945782538749816832/4GCfwKAJ_400x400.jpg",
  },
  {
    id: 164,
    name: "Hedgewater",
    description: "Hedgewater is an on-chain AI investment fund focused on Hyperliquid ecosystem.",
    categories: ["Yield"],
    status: "Live",
    website: "https://www.hedgewater.xyz/",
    tags: ["Yield", "AI"],
    logo: "https://pbs.twimg.com/profile_images/1940083311486947328/zjMz6ajf_400x400.jpg",
  },
  {
    id: 165,
    name: "Neutral Trade",
    description:
      "Neutral Trade is an on-chain hedge fund using multi-strategy trading, built by ex-Goldman Sachs and Top 3 global hedge fund quants.",
    categories: ["Yield", "Delta-neutral"],
    status: "Live",
    website: "https://www.app.neutral.trade/",
    tags: ["Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1960430750185992192/sKepj4Dp_400x400.jpg",
  },
  {
    id: 166,
    name: "Nunchi",
    description: "Long or Short Any Yield. Perpetuals for Yield.",
    categories: ["Options"],
    status: "Coming Soon",
    website: "https://nunchi.trade/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1954935759359619072/toqXGJ0O_400x400.jpg",
  },
  {
    id: 167,
    name: "Okto",
    description: "Hyperliquid Core and HyperEVM integrated mobile wallet",
    categories: ["Mobile Wallet"],
    status: "Live",
    website: "https://okto.go.link/defi_home?referral_code=AmVbM2&adj_t=13c5o7y4",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1978012771645345792/cRD3Pb_3_400x400.jpg",
  },
  {
    id: 168,
    name: "Purrsec",
    description: "Parsec's HyperEVM exclusive Block Explorer",
    categories: ["Tools"],
    status: "Live",
    website: "https://purrsec.com/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1407856708261646338/ODpD974X_400x400.jpg",
  },
  {
    id: 169,
    name: "HypurrScan",
    description: "Explorer for Hyperliquid Core",
    categories: ["Tools"],
    status: "Live",
    website: "https://hypurrscan.io/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1859964342466207744/lPYHxw87_400x400.jpg",
  },
  {
    id: 170,
    name: "HyperData",
    description:
      "Explore new Hyperliquid heatmaps for spot and perps to track daily changes, volumes, and market caps—now with a smoother user experience!",
    categories: ["Analytics"],
    status: "Live",
    website: "https://hyperscan.fun/",
    tags: ["Analytics"],
    logo: "https://pbs.twimg.com/profile_images/1874780836358193152/KW07UhJi_400x400.jpg",
  },
  {
    id: 171,
    name: "HyperScan",
    description: "Explorer for HyperEVM",
    categories: ["Tools"],
    status: "Live",
    website: "https://www.hyperscan.com/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1563254263161032704/1RBJKVcR_400x400.jpg",
  },
  {
    id: 172,
    name: "HypurrFun",
    description:
      "Launch and trade memecoins on Hyperliquid via Telegram. Snipe launches, join whale chats, and compete with other cabals easily!",
    categories: ["Bot", "Launchpad"],
    status: "Live",
    website: "https://t.me/HypurrFunBot?start=ref_2ac3a876",
    tags: ["Bot", "Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1787461676607934464/VrwQ_1q1_400x400.jpg",
  },
  {
    id: 173,
    name: "HypeFun",
    description: "Community owned AI Launchpad coming soon on HyperEVM",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://hypefun.ai/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1947261638857404416/gGdX9-OU_400x400.jpg",
  },
  {
    id: 174,
    name: "HYPE Burn",
    description: "HYPE is hyper sound money. Max supply is fixed and transaction fees are automatically burned.",
    categories: ["Analytics"],
    status: "Live",
    website: "https://www.hypeburn.fun/",
    tags: ["Analytics"],
    logo: "https://www.hypeburn.fun/images/fire.svg",
  },
  {
    id: 175,
    name: "HyperEvmScan",
    description: "EtherScans HyperEVM dedicated block explorer",
    categories: ["Tools"],
    status: "Live",
    website: "https://hyperevmscan.io/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1947952831568482304/GkEPdf-r_400x400.jpg",
  },
  {
    id: 176,
    name: "HyperScan",
    description:
      "Fork of Blockscout. With custom indexing, components, widgets, and APIs built specifically for the HyperLiquid ecosystem.",
    categories: ["Tools"],
    status: "Live",
    website: "https://beta.hyperscan.com/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1646991609416806408/vKLEZxhh_400x400.png",
  },
  {
    id: 177,
    name: "DeBank",
    description: "The Real User Based Web3 Community.",
    categories: ["Tools"],
    status: "Live",
    website: "https://debank.com/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1414880725921267716/YzVitob7_400x400.jpg",
  },
  {
    id: 178,
    name: "Nansen",
    description: "Nansen is the leading onchain analytics platform trusted by the top crypto teams and investors.",
    categories: ["Analytics"],
    status: "Live",
    website: "https://app.nansen.ai/ref?GeahssNV0Zd",
    tags: ["Analytics", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1971109656698433536/jwmPANed_400x400.jpg",
  },
  {
    id: 179,
    name: "Awaken",
    description: "Crypto taxes for crypto natives",
    categories: ["Tools"],
    status: "Live",
    website: "https://awaken.tax?ref=wiidqu-i",
    tags: ["Tools", "Taxes"],
    logo: "https://pbs.twimg.com/profile_images/1981076064878157824/VEllsdAH_400x400.jpg",
  },
  {
    id: 180,
    name: "Lighthouse.one",
    description: "All your crypto and fiat assets in one, private portfolio manager.",
    categories: ["Front End", "Tools"],
    status: "Live",
    website: "https://lighthouse.one/",
    tags: ["Front End", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1850925548471480320/L-vU3YZs_400x400.png",
  },
  {
    id: 181,
    name: "Cerebro",
    description: "Manage all your crypto assets and leverage AI to unlock better performance",
    categories: ["Bot", "Tools"],
    status: "Live",
    website: "https://cerebro.xyz/sign-up?code=038BEFD1",
    tags: ["Bot", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1841005653630050304/LfpjTTJy_400x400.jpg",
  },
  {
    id: 182,
    name: "KittyPunch",
    description:
      "KittyPunch is a DeFi project built for consumer blockchains. Trade digital assets, earn yield, and even collect your own Kitties with KittyPunch.",
    categories: ["Yield"],
    status: "Coming Soon",
    website: "https://www.kittypunch.xyz/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1701266852192866304/LyPRKoUS_400x400.jpg",
  },
  {
    id: 183,
    name: "Definitive",
    description:
      "Definitive is a non-custodial, multi-chain trading platform offering CeFi-like execution, gasless trades, and advanced order types on DeFi rails",
    categories: ["Front End"],
    status: "Live",
    website: "https://app.definitive.fi/r/UJSTNJ7Q",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1848873373511917568/p0-qFbVa_400x400.jpg",
  },
  {
    id: 184,
    name: "Cielo",
    description:
      "Track and trade wallets across Solana, Ethereum, Base, Hyperliquid, Sui, Tron, and Bitcoin with a TG bot and onchain analysis.",
    categories: ["Bot", "Tools"],
    status: "Live",
    website: "https://app.cielo.finance/",
    tags: ["Bot", "Tracker", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1879619205730906112/aeXN1N9a_400x400.jpg",
  },
  {
    id: 185,
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
    id: 186,
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
    id: 187,
    name: "Octis",
    description:
      "Octis Divers is Hyperliquid's first revenue-sharing NFT. Holders earn 808FLIP game revenue, which charges a 4% fee per game played.",
    categories: ["NFT", "Gaming"],
    status: "Live",
    website: "https://octis.ai/flip?r=000002HM",
    tags: ["NFT", "Gaming"],
    logo: "https://pbs.twimg.com/profile_images/1880178279199698946/m3cs6Ds3_400x400.jpg",
  },
  {
    id: 188,
    name: "HypeFlows",
    description: "HypeFlows is the best place to track Hyperliquid's trading stats against Centralized Exchanges.",
    categories: ["Analytics"],
    status: "Live",
    website: "https://hypeflows.com/",
    tags: ["Analytics"],
    logo: "https://pbs.twimg.com/profile_images/1901381580310081536/RxTaKf3v_400x400.jpg",
  },
  {
    id: 189,
    name: "Supurr",
    description: "Trade supurr short-dated options",
    categories: ["Options"],
    status: "Live",
    website: "https://trade.supurr.app/#/ref/0xlcrgs/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1884280601793929218/mcI9hEhQ_400x400.jpg",
  },
  {
    id: 190,
    name: "dotHYPE",
    description: "Building the identity layer for HyperEVM. Your name. Your presence. Your signal across the chain.",
    categories: ["Other"],
    status: "Live",
    website: "https://www.dothype.io/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1930144205541912579/trTH-qij_400x400.jpg",
  },
  {
    id: 191,
    name: "Farcaster",
    description:
      "Farcaster is a decentralized social network on Ethereum and Optimism, where users fully own their data, identity, and connections",
    categories: ["SocialFi"],
    status: "Live",
    website: "https://farcaster.xyz/",
    tags: ["SocialFi"],
    logo: "https://pbs.twimg.com/profile_images/1980310281558409216/DWoYcKR7_400x400.jpg",
  },
  {
    id: 192,
    name: "SuperHype",
    description: "HyperEVM token launchpad and AMM DEX",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://www.superhype.app/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1892409289467138048/PrC-uVqt_400x400.jpg",
  },
  {
    id: 193,
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
    id: 194,
    name: "Hypersurface",
    description: "Options on HyperEVM",
    categories: ["Options"],
    status: "Coming Soon",
    website: "https://hypersurface.io/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1956034564020953093/syzdswCd_400x400.jpg",
  },
  {
    id: 195,
    name: "Nitro",
    description: "Bridge from over 35 chains in a single step, including non-EVM chains like Sui and Solana.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://routernitro.com/swap",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1881323127872839680/f7AkYiQe_400x400.jpg",
  },
  {
    id: 196,
    name: "daos.world",
    description:
      "daos.world is a decentralized launchpad that empowers DAO managers and contributors to participate in on-chain fund management",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://daos.world/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1875045606294683648/WnEGoXn3_400x400.jpg",
  },
  {
    id: 197,
    name: "Lit",
    description:
      "Lit aims to reimagine and perfect trading for tokenized assets and perpetuals, while making them accessible to the masses through frictionless onboarding & a permissionless HyperLiquid backbone.",
    categories: ["Front End"],
    status: "Live",
    website: "https://www.lit.trade/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1935211746077130752/L6rIVkC0_400x400.jpg",
  },
  {
    id: 198,
    name: "Alchemy",
    description: "Your complete developer platform to build rollups, apps & everything in between.",
    categories: ["Tools"],
    status: "Live",
    website: "https://www.alchemy.com/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1979190252448133120/xAMqZF7__400x400.jpg",
  },
  {
    id: 199,
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
    id: 200,
    name: "Mintify",
    description:
      "Mintify lets you trade any asset on any network directly onchain, offering real-time, intuitive access to digital markets and economies",
    categories: ["Front End", "DEX", "Launchpad"],
    status: "Live",
    website: "https://mintify.xyz/",
    tags: ["Front End", "DEX", "Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1925172682145816576/GzyVvnUw_400x400.jpg",
  },
  {
    id: 201,
    name: "Derps",
    description:
      "Derps is a fun, easy-to-use mobile app for on-chain perpetuals (no KYC, zero gas fees) powered by HyperLiquid, MoonPay & dexorgexchange",
    categories: ["Front End"],
    status: "Coming Soon",
    website: "https://dex.org/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1921876531015471104/_4trkTZO_400x400.jpg",
  },
  {
    id: 202,
    name: "HeadtoHead.hl",
    description: "Head to Head is a social wagering platform where people can put their money where their mouth is",
    categories: ["GambleFi"],
    status: "Live",
    website: "https://www.headtohead.app/",
    tags: ["GambleFi"],
    logo: "https://pbs.twimg.com/profile_images/1892511802451226624/LquxgBd__400x400.jpg",
  },
  {
    id: 203,
    name: "Hyperliquid Names",
    description: "Your digital identity in the fast lane of DeFi.",
    categories: ["Other"],
    status: "Live",
    website: "https://hlnames.xyz/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1928952183304892416/4etP6OnZ_400x400.jpg",
  },
  {
    id: 204,
    name: "Thunderhead",
    description: "The premiere liquid-staking solution for the Hyperliquid network.",
    categories: ["LST"],
    status: "Live",
    website: "https://thunderhead.xyz/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1520908569482309633/5VebUnTk_400x400.jpg",
  },
  {
    id: 205,
    name: "Rage Trade",
    description:
      "Rage Trade is a multi-chain perp aggregator blending CEX convenience with DeFi transparency for on-chain trading.",
    categories: ["Front End"],
    status: "Live",
    website: "https://www.app.rage.trade/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1518891395636944897/gLh94IR3_400x400.png",
  },
  {
    id: 206,
    name: "IVX",
    description: "Trade the most liquid 0dte markets in all of crypto on $ETH and $BTC",
    categories: ["Options"],
    status: "Live",
    website: "https://diem.ivx.fi/referrals/0xLcrgs",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1807772188327436289/ByxYDJsm_400x400.jpg",
  },
  {
    id: 207,
    name: "Vooi",
    description:
      "VOOI, backed by Binance Labs, is a derivatives marketplace using chain abstraction to offer CEX-like trading across multiple perp DEXs",
    categories: ["Front End"],
    status: "Live",
    website: "https://app.vooi.io/r/3DW6DRN",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1938271243876155393/fXAC9P_h_400x400.jpg",
  },
  {
    id: 208,
    name: "Polaris",
    description: "Trade all tokens, across all chains — with Polaris, the Token Portal. Now live in beta.",
    categories: ["DEX", "Bridge"],
    status: "Live",
    website: "https://polaris.app/",
    tags: ["DEX", "Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1909962811804946432/gW76pWsD_400x400.jpg",
  },
  {
    id: 209,
    name: "FORDEFI",
    description:
      "One MPC Wallet for Treasury Management | Trading Operations | Tokenization | RWAs | Stablecoins | Payments | WaaS | Embedded Wallets | BCP",
    categories: ["Tools"],
    status: "Live",
    website: "https://fordefi.com/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1938301949440315392/g91FlC2h_400x400.jpg",
  },
  {
    id: 210,
    name: "Shogun",
    description: "Trade any token on any chain from one bot",
    categories: ["DEX", "Bridge"],
    status: "Live",
    website: "https://www.gun.fun/",
    tags: ["DEX", "Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1947345653862174720/XQdkjfd5_400x400.jpg",
  },
  {
    id: 211,
    name: "EzPairs",
    description: "A pair trading platform that allows users to trade custom weighted pairs with x3 leverage.",
    categories: ["Front End"],
    status: "Live",
    website: "https://www.ezpairs.xyz/trade",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1890102511245168640/7ocIdtLE_400x400.jpg",
  },
  {
    id: 212,
    name: "Vortx HL",
    description:
      "Trade spot, perps & prediction markets on Discord, Twitter & more with AI agents. Built on Hyperliquid. Zero fees during beta.",
    categories: ["Options"],
    status: "Live",
    website: "https://www.vortx.gg/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1957881861994119169/mX8N1kEI_400x400.jpg",
  },
  {
    id: 213,
    name: "Mass",
    description:
      "Mass is your gateway to interacting with multiple networks and financial services built atop the blockchain, also known as DeFi",
    categories: ["Front End"],
    status: "Live",
    website: "https://download.mass.money/ref/SBQqlVQ2NdiV2nJfEkwnEYegIdy",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1811432607550259200/0pn5qbde_400x400.jpg",
  },
  {
    id: 214,
    name: "Napier",
    description:
      "A modular yield tokenization protocol that enables you to own, manage, create any yield products without permissions.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.napier.finance/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1665336093611290625/uUmS2hoy_400x400.jpg",
  },
  {
    id: 215,
    name: "Gasyard",
    description:
      "Gasyard is a cross-VM bridge designed to make asset transfers fast and simple connecting EVM, Solana, Aptos, Sui, Bitcoin, and Hyperliquid in under 10 seconds.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://hyperliquid.gasyard.fi/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1933752437984444416/-hLn0Api_400x400.jpg",
  },
  {
    id: 216,
    name: "Defined",
    description: "The fastest and safest multi-chain trading terminal & Screener.",
    categories: ["Front End"],
    status: "Live",
    website: "https://www.defined.fi/tokens/discover?network=hyperevm",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1395427369662390272/JiHWxi6M_400x400.png",
  },
  {
    id: 217,
    name: "Copin",
    description: "The leading on-chain data & signal platform for perpetual trading.",
    categories: ["Bot"],
    status: "Live",
    website: "https://copin.io/",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1721363454655893504/Sw4ZJHSl_400x400.jpg",
  },
  {
    id: 218,
    name: "Avy",
    description:
      "Avy is a swipe-to-trade app for perps — built for everyone, powered by Hyperliquid, and optimized for the mobile-native generation.",
    categories: ["Mobile Wallet"],
    status: "Beta",
    website: "https://www.avy.xyz/",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1919063597541359616/IUDHSV1I_400x400.jpg",
  },
  {
    id: 219,
    name: "Hypersig",
    description: "The Hypercore-based multisig platform for power users",
    categories: ["Tools"],
    status: "Coming Soon",
    website: "https://hypersig.xyz/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1942219775276470272/csct9XRa_400x400.jpg",
  },
  {
    id: 220,
    name: "Tholos",
    description:
      "Tholos is an institutional-grade digital asset custody solution enabling organizations to securely hold crypto and transact across 25+ blockchains.",
    categories: ["Tools"],
    status: "Live",
    website: "https://www.tholos.app/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1566801279497666560/5yMpOg_s_400x400.jpg",
  },
  {
    id: 221,
    name: "Drops",
    description: "Check any crypto wallet for unclaimed airdrops, get Telegram alerts on eligibility!",
    categories: ["Tools"],
    status: "Live",
    website: "https://drops.bot/?r=35gnSMWb60",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1946435701286817792/ztlFUyHI_400x400.jpg",
  },
  {
    id: 222,
    name: "Outcome",
    description: "The first prediction market on Hyperliquid.",
    categories: ["Options"],
    status: "Live",
    website: "https://outcome.market/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1867277511584841728/d2ojRVxU_400x400.jpg",
  },
  {
    id: 223,
    name: "XTrade",
    description:
      "XTrade is a decentralized trading platform on the Solana network, offering spot and perpetual trading on Hyperliquid.",
    categories: ["Front End"],
    status: "Live",
    website: "https://xtrade.gg/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1934996277844115456/cgCzC4wx_400x400.jpg",
  },
  {
    id: 224,
    name: "Kinto",
    description: "The Modular Exchange. Powered by Arbitrum",
    categories: ["Front End"],
    status: "Live",
    website: "https://engen.kinto.xyz/onboarding?ref=d9738",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1658109577081044992/ZBpLvGSb_400x400.jpg",
  },
  {
    id: 225,
    name: "HyperChonk",
    description: "Stablecoin-oriented DEX built for HyperEVM. Let's make these yields CHONKY",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.hyperchonk.com/pools",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1940450784610496512/f-qgdLvl_400x400.jpg",
  },
  {
    id: 226,
    name: "Vision",
    description:
      "Everything you need to access, explore, and thrive in the decentralised internet. Powered by Vision (VSN)",
    categories: ["Other"],
    status: "Live",
    website: "https://vision.now/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1933082068742782976/4QmsV-R4_400x400.jpg",
  },
  {
    id: 227,
    name: "Hana Network",
    description:
      "Hana is a hyper-casual, mobile crypto exchange on Hyperliquid, offering no-KYC on/off ramps, casual trading, and farming for all users",
    categories: ["Bridge", "On-Ramp"],
    status: "Beta",
    website: "https://gateway.hana.network/",
    tags: ["Bridge", "On-Ramp"],
    logo: "https://pbs.twimg.com/profile_images/1826923623556562944/LhUmaR37_400x400.jpg",
  },
  {
    id: 228,
    name: "HyperPNL",
    description:
      "Decentralized prop trading on HyperEVM solves trust and transparency issues of centralized trading firms.",
    categories: ["Front End"],
    status: "Coming Soon",
    website: "https://hyperpnl.com/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1986117532940431360/OhGiNmGp_400x400.png",
  },
  {
    id: 229,
    name: "ZKP2P",
    description:
      "Building a fast, trust minimized and composable P2P on/offramp protocol. Onramp to Base, Arbitrum, Solana, Hyperliquid and Ethereum in 60 seconds",
    categories: ["On-Ramp"],
    status: "Live",
    website: "https://www.zkp2p.xyz/",
    tags: ["On-Ramp"],
    logo: "https://pbs.twimg.com/profile_images/1723908407823065088/492zLAxh_400x400.png",
  },
  {
    id: 230,
    name: "Hyperterminal",
    description:
      "Your all-in-one analytics powerhouse designed to revolutionize your Hyperliquid trading with real-time market insights.",
    categories: ["Tools"],
    status: "Beta",
    website: "https://hyperterminal.xyz/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1856449296540762112/RWZ62v7c_400x400.jpg",
  },
  {
    id: 231,
    name: "Hyperdelta",
    description: "A next-generation options exchange, launching 2025 on Hyperliquid.",
    categories: ["Options"],
    status: "Coming Soon",
    website: "https://hyperdelta.com/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1923426269376450560/9YGLDDAY_400x400.jpg",
  },
  {
    id: 232,
    name: "Hyperhyper",
    description: "The hyper-speculation application",
    categories: ["Other"],
    status: "Coming Soon",
    website: "https://hyperhyper.fi/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1895494249648377856/xHC87ple_400x400.jpg",
  },
  {
    id: 233,
    name: "Kryptos",
    description:
      "Kryptos is a Web3 data protocol linking 5000+ blockchains, CEXs, and DeFi for analytics, tax, and portfolio tools via APIs",
    categories: ["Tools"],
    status: "Live",
    website: "https://kryptos.io?via=niteip1995",
    tags: ["Tools", "Taxes"],
    logo: "https://pbs.twimg.com/profile_images/1986785298064211968/HMDzyo8l_400x400.jpg",
  },
  {
    id: 234,
    name: "Racks",
    description: "Ultra-gamified, fast-paced, high volatility trading on Hyperliquid",
    categories: ["Options"],
    status: "Live",
    website: "https://racks.win/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1969947403835830272/OcvIGMor_400x400.jpg",
  },
  {
    id: 235,
    name: "Vapor",
    description:
      "Vapor lets users create and manage no-code AI agents, built on Eliza. Soon, deploy ERC20 tokens to agents on Hyperliquid EVM.",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://www.vaporware.fun/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1867073156072046592/dQQ6ZsRj_400x400.jpg",
  },
  {
    id: 236,
    name: "HL Fund",
    description:
      "Decentralized hub accelerating Hyperliquid's growth with reputation, education, DAOs, directories, collabs, and investments.",
    categories: ["Other"],
    status: "Live",
    website: "https://hl.fund/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1880969975482961921/GAC7jyiw_400x400.jpg",
  },
  {
    id: 237,
    name: "Nest wallet",
    description:
      "Sophisticated mobile trading app for professional traders. Now supports HL perps, and live sentiment & whale tracking.",
    categories: ["Extension Wallet"],
    status: "Live",
    website: "https://nestwallet.xyz/",
    tags: ["Extension Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1917627579902599168/9_VsxZ89_400x400.jpg",
  },
  {
    id: 238,
    name: "Vegas HL",
    description: "The next-gen crypto poker experience. Built on HyperEVM to revolutionize on-chain gambling.",
    categories: ["GambleFi"],
    status: "Live",
    website: "https://vegas.fun?r=0XLCRGS",
    tags: ["GambleFi"],
    logo: "https://pbs.twimg.com/profile_images/1899561765383614464/sFrQsTXk_400x400.jpg",
  },
  {
    id: 239,
    name: "HyperMoon.Fun",
    description: "Meme. Mint. Moon. Hyperliquid's Token Launch Platform for memecoins",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://hypermoon.fun/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1931777052270604289/ju1nkE_R_400x400.png",
  },
  {
    id: 240,
    name: "manadotwin",
    description: "Hyperliquid-native launch + trading platform that neutralizes snipers, bundlers, bots and rugs.",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://mana.win/app/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1931078179285831680/J2f1_AFD_400x400.jpg",
  },
  {
    id: 241,
    name: "Beefy",
    description:
      "Beefy is a decentralized, multichain yield optimizer that auto-compounds interest on crypto, maximizing APY safely and efficiently",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.beefy.com/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1985675769293549568/2n4Wbwx4_400x400.jpg",
  },
  {
    id: 242,
    name: "Mizu",
    description:
      "Mizu Labs is a unified liquidity layer that reduces infrastructure efforts for builders and focuses on consumer-based dApps.",
    categories: ["Yield"],
    status: "Live",
    website: "https://mizulabs.xyz/dapp/vault",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1854237810686828547/ZhV6sDwY_400x400.jpg",
  },
  {
    id: 243,
    name: "Brotocol",
    description:
      "Bringing DeFi to Bitcoin via enabling Swaps, Bridge and Payment directly on the $BTC network—20+ chains + Best rate guaranteed!",
    categories: ["Bridge"],
    status: "Live",
    website: "https://brotocol.xyz/bitcoin/swap",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1913248373445922817/L7TSfOwY_400x400.jpg",
  },
  {
    id: 244,
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
    id: 245,
    name: "EISEN",
    description: "Eisen is a DEX aggregator with a fast Ce-DeFi engine for safer, profitable trading.",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.eisenfinance.com/",
    tags: ["DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1861248882824593408/h5CrU_s__400x400.jpg",
  },
  {
    id: 246,
    name: "Katoshi",
    description:
      "Katōshi lets traders build and deploy secure, advanced trading bots on Hyperliquid, with TradingView integration and pro-grade API.",
    categories: ["Front End", "Bot"],
    status: "Live",
    website: "https://katoshi.ai/",
    tags: ["Front End", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1985583559902474241/1jtYnSGD_400x400.jpg",
  },
  {
    id: 247,
    name: "Hippo1000",
    description:
      "Hippo1000 - real time tracking top 1% whales on Hyperliquid. Ape instantly with a 1-click Telegram bot. ",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/Hippo1000bot?start=Hxj3vkk",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1895318430187954176/9c65u3fd_400x400.jpg",
  },
  {
    id: 248,
    name: "Looter",
    description: "Your multichain memecoin solution",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/looter_ai_bot?start=use_1Qna2U",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1856480092848844800/MC8pTvat_400x400.jpg",
  },
  {
    id: 249,
    name: "Gem Wallet",
    description:
      "Gem Wallet is a user-friendly crypto wallet that offers convenience and top-notch security for beginners like you",
    categories: ["Mobile Wallet"],
    status: "Live",
    website: "https://gemwallet.com/",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1983265250569842688/3NCDIWGt_400x400.jpg",
  },
  {
    id: 250,
    name: "FUNDAMENTAL",
    description: "Something different.",
    categories: ["Tools"],
    status: "Live",
    website: "https://fundamental.lol/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1905212032053567488/JIc-KE0A_400x400.jpg",
  },
  {
    id: 251,
    name: "Hytrade",
    description:
      "Hytrade offers fast, feature-rich crypto trading on HyperEVM, enabling one-click buy/sell across launchpads and DEXs for a competitive edge.",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://www.hytrade.fun/trade",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1931405316798758913/mCxPAyTX_400x400.jpg",
  },
  {
    id: 252,
    name: "Lambda Finance",
    description:
      "Lambda introduces btcUSD, a permissionless and efficient BTC-backed stablecoin, unlocking Bitcoin liquidity for DeFi applications.",
    categories: ["Lending", "Stablecoin"],
    status: "Coming Soon",
    website: "https://lambda.finance/",
    tags: ["Lending", "Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1709109269604511744/vXoBoSl1_400x400.jpg",
  },
  {
    id: 253,
    name: "Chainpro",
    description: "Advanced onchain trading terminal across multiple ecosystems",
    categories: ["Front End"],
    status: "Live",
    website: "https://chainpro.xyz/#0xlcrgs",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1973459056871256064/inXYAjdR_400x400.jpg",
  },
  {
    id: 254,
    name: "Fractrade",
    description:
      "Fractrade lets you create AI trading agents for Hyperliquid, offering risk management, copy trading, and automated strategies",
    categories: ["Front End", "Bot"],
    status: "Live",
    website: "http://alpha.fractrade.xyz/accounts/signup?invite_code=UI58BY",
    tags: ["Front End", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1879105001366196224/QhBDglZB_400x400.jpg",
  },
  {
    id: 255,
    name: "Altitude",
    description: "The next-gen trading experience is here. Get access to our full range blockchain infrastructure.",
    categories: ["Front End"],
    status: "Beta",
    website: "https://www.reachaltitude.xyz/waitlist?ref=JAZZ2H7VV4",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1916798556809437184/CBPWnZgk_400x400.jpg",
  },
  {
    id: 256,
    name: "Hypervisor",
    description: "Hyperliquid focused data analytics/trading platform with fully customizable dashboards",
    categories: ["Bot", "Tools"],
    status: "Beta",
    website: "https://hypervisor.gg/",
    tags: ["Tools", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1832829990951383040/oNYLW-Og_400x400.jpg",
  },
  {
    id: 257,
    name: "HyperScanner",
    description: "Supercharge your Hyperliquid trading with advanced analytics and data insights",
    categories: ["Tools"],
    status: "Live",
    website: "https://www.hyperscanner.app/",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1825505561657380864/qtMwmkIj_400x400.jpg",
  },
  {
    id: 258,
    name: "Hyperstats.hl",
    description: "An independent source of Hyperliquid trading statistics",
    categories: ["Analytics"],
    status: "Live",
    website: "https://hyperstats.xyz/",
    tags: ["Analytics"],
    logo: "https://pbs.twimg.com/profile_images/1853646017620844544/yKjedEz2_400x400.jpg",
  },
  {
    id: 259,
    name: "USDHL-M Bridge",
    description: "Trade all tokens, across all chains — with Polaris, the Token Portal. Now live in beta.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://usdhl-bridge.vercel.app/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1912499168616071168/YwutsRBu_400x400.jpg",
  },
  {
    id: 260,
    name: "Quick Intel",
    description:
      "Quick Intel scans crypto contracts in real time, alerting users to scams and malicious code for safer, smarter trading decisions",
    categories: ["Tools"],
    status: "Live",
    website: "https://quickintel.io/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1882651870201520128/_6yWXw-N_400x400.jpg",
  },
  {
    id: 261,
    name: "Transak",
    description: "The Payments Infra for Stablecoin & Crypto",
    categories: ["On-Ramp"],
    status: "Live",
    website: "https://transak.com/",
    tags: ["On-Ramp"],
    logo: "https://pbs.twimg.com/profile_images/1711650788479520768/z_DG8Nwa_400x400.jpg",
  },
  {
    id: 262,
    name: "Kiyotaka",
    description: "Crypto market intelligence platform. Currently in beta.",
    categories: ["Tools"],
    status: "Beta",
    website: "https://kiyotaka.ai/ref=teMkFvcksW",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1968642880861519872/xBDOBa-Z_400x400.png",
  },
  {
    id: 263,
    name: "Octav",
    description:
      "Octav is a free, editable analytics platform that simplifies pre-tax data for traders, tax pros, and asset managers.",
    categories: ["Tools"],
    status: "Live",
    website: "https://pro.octav.fi/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1740414989767163904/BvL1p3kK_400x400.jpg",
  },
  {
    id: 264,
    name: "Tator the Trader",
    description:
      "Manage digital assets and transfers - all through simple chat messages. No complicated wallets or technical knowledge needed!",
    categories: ["Bot"],
    status: "Live",
    website: "https://tatortrader.quickintel.io/",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1959469247870197760/BG-zZ7qR_400x400.jpg",
  },
  {
    id: 265,
    name: "Enso",
    description: "Enso is blockchain shortcuts. Your fastest way to build and launch onchain. ",
    categories: ["Other"],
    status: "Live",
    website: "https://www.enso.build/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1795443155015184384/EeDEvFuQ_400x400.jpg",
  },
  {
    id: 266,
    name: "Nifty Island",
    description: "Nifty Island is a community-driven gaming platform where players can build and play games together",
    categories: ["Gaming"],
    status: "Live",
    website: "https://www.niftyisland.com/",
    tags: ["Gaming"],
    logo: "https://pbs.twimg.com/profile_images/1825635593633624064/xUrZ9-yJ_400x400.jpg",
  },
  {
    id: 267,
    name: "Proof of Play",
    description:
      "Onchain game studio & technology company, building Pirate Nation and the composable infrastructure it runs on.",
    categories: ["Gaming"],
    status: "Live",
    website: "https://proofofplay.com/",
    tags: ["Gaming"],
    logo: "https://pbs.twimg.com/profile_images/1954952845108621312/NkoaOYew_400x400.jpg",
  },
  {
    id: 268,
    name: "Evoq Finance",
    description: "A P2P-based lending optimizer",
    categories: ["Lending", "Yield"],
    status: "Coming Soon",
    website: "https://app.evoq.finance/?referralCode=2Dn0SQra",
    tags: ["Lending", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1870006305014067200/RUidb_w7_400x400.jpg",
  },
  {
    id: 269,
    name: "circle",
    description: "socialFi on hyperliquid",
    categories: ["SocialFi"],
    status: "Coming Soon",
    website: "https://docs.hypercircle.app/",
    tags: ["SocialFi"],
    logo: "https://pbs.twimg.com/profile_images/1946639933688451073/cVRsBwh9_400x400.jpg",
  },
  {
    id: 270,
    name: "Jigsaw",
    description: "The missing piece of DeFi ",
    categories: ["Yield"],
    status: "Live",
    website: "https://jigsaw.finance/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1766154707083640832/S6Hu9K57_400x400.jpg",
  },
  {
    id: 271,
    name: "Metrix Finance",
    description:
      "Find profitable pools, backtest results, calculate APR, and track performance, all with accurate data across top DEXs.",
    categories: ["Yield", "Tools"],
    status: "Coming Soon",
    website: "https://metrix.finance/",
    tags: ["Yield", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1947423779816083457/TELlRRhz_400x400.jpg",
  },
  {
    id: 272,
    name: "Drip.Trade",
    description: "Leading native NFT exchange on HyperLiquid.",
    categories: ["NFT"],
    status: "Live",
    website: "https://drip.trade/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1925250244477952000/4Ju6lXOA_400x400.jpg",
  },
  {
    id: 273,
    name: "Bedrock",
    description: "A liquid restaking pioneer built on Babylon, Eigenlayer & DePin",
    categories: ["LST"],
    status: "Coming Soon",
    website: "https://www.bedrock.technology/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1874748314287255552/vfl-Cjat_400x400.jpg",
  },
  {
    id: 274,
    name: "rePRICE",
    description: "an operating system built on the performant HyperEVM — with AI Integration",
    categories: ["Tools"],
    status: "Coming Soon",
    website: "https://re-price.xyz/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1945505033958678528/v1fT9mjE_400x400.jpg",
  },
  {
    id: 275,
    name: "OmniX",
    description: "Try your luck and win big on HyperEVM",
    categories: ["NFT"],
    status: "Coming Soon",
    website: "https://gacha.omni-x.io/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1639169328594444289/7s4pPLu5_400x400.png",
  },
  {
    id: 276,
    name: "Catapult",
    description:
      "Hyper-Intelligent Launch Engine. Dual Mode: On-chain and RNG Unified Flywheel. Built on Hyperliquid and LayerZero",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://catapult.trade/invite/2TB7ZO7Z",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1984253228561657856/XPMP4cKA_400x400.jpg",
  },
  {
    id: 277,
    name: "Squid",
    description:
      "Seamlessly connecting chains, tokens, and wallets. Swap, send, and manage your crypto across. EVM Cosmos Solana Bitcoin XRPL",
    categories: ["Bridge"],
    status: "Live",
    website: "https://www.squidrouter.com/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1938625911743524864/ppNPPF84_400x400.jpg",
  },
  {
    id: 278,
    name: "LAGOON",
    description: "Build yield products that scale, and bring the best of DeFi to your users.",
    categories: ["Yield"],
    status: "Live",
    website: "https://lagoon.finance/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1851946166524461056/PVBmjpnL_400x400.png",
  },
  {
    id: 279,
    name: "Infinex",
    description: "Building the crypto everything app.",
    categories: ["Front End"],
    status: "Live",
    website: "https://infinex.xyz/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1978267585633525760/PavGc5KA_400x400.png",
  },
  {
    id: 280,
    name: "Cashmere",
    description: "Middleware infrastructure for zero-slippage one-click native omnichain transfers.",
    categories: ["DEX"],
    status: "Live",
    website: "https://cashmere.exchange/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1551945866793164802/KmcIMByo_400x400.jpg",
  },
  {
    id: 281,
    name: "Equilibria",
    description: "First yield booster on top of Pendle",
    categories: ["Yield"],
    status: "Live",
    website: "https://equilibria.fi/home",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1741669269199597568/ruIAkZfU_400x400.jpg",
  },
  {
    id: 282,
    name: "Funnel",
    description: "The Hyperliquid Asset Engine",
    categories: ["Front End"],
    status: "Live",
    website: "https://www.funnel.markets/rewards?referral_code=042b066b",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1948006273569742848/1NM_bCyA_400x400.jpg",
  },
  {
    id: 283,
    name: "Ranger",
    description: "DeFi's command center.",
    categories: ["Front End"],
    status: "Live",
    website: "https://www.app.ranger.finance?ref_code=769181c3036541ec8d939d3ec721628c",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1958600297263022080/SNO-rxyu_400x400.jpg",
  },
  {
    id: 285,
    name: "Euler",
    description: "The lending super app.",
    categories: ["Lending", "Yield"],
    status: "Live",
    website: "https://app.euler.finance/",
    tags: ["Lending", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1947602115557527553/15Jr7cIa_400x400.jpg",
  },
  {
    id: 286,
    name: "Nimbus Trade",
    description: "Automate your trades on Hyperliquid",
    categories: ["Bot", "Tools"],
    status: "Coming Soon",
    website: "https://nimbus.trade/",
    tags: ["Bot", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1957412897279143936/ukM18KPh_400x400.jpg",
  },
  {
    id: 287,
    name: "USD.AI",
    description: "The yield-bearing synthetic dollar protocol backed by real-world infrastructure assets",
    categories: ["Stablecoin"],
    status: "Beta",
    website: "https://usd.ai/",
    tags: ["Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1951320192929210368/TNqvIAxs_400x400.jpg",
  },
  {
    id: 288,
    name: "IceCreamSwap",
    description: "AI powered DEX aggregator finding you the best swaps",
    categories: ["DEX"],
    status: "Live",
    website: "https://icecreamswap.com/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1532715330782605312/S3PvFlua_400x400.png",
  },
  {
    id: 289,
    name: "Skewga's Island",
    description:
      "This is a curated project to help traders cut through noise and focus on signals that matter. Explore liquidity, positioning, macro regimes, and market moving data—all in one place.",
    categories: ["Analytics"],
    status: "Live",
    website: "https://www.skewga.com/",
    tags: ["Analytics"],
    logo: "https://www.skewga.com/_next/image?url=%2Ficons%2Fdragonite.png&w=128&q=75",
  },
  {
    id: 290,
    name: "Peri Pair Bot",
    description: "First Pair trading telegram bot with Rust-based execution exclusively on Hyperliquid",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/peripairbot?start=curvy-regret-7164",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1960978431845281792/ypgwXKwD_400x400.jpg",
  },
  {
    id: 291,
    name: "Hypervol",
    description: "Native Options Market for HyperEVM, Built on Hyperliquid",
    categories: ["Options"],
    status: "Coming Soon",
    website: "https://www.hypervol.xyz/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1867561440548093953/tLO5Fx_L_400x400.jpg",
  },
  {
    id: 292,
    name: "HyperSpartan",
    description: "Hyperliquid Telegram Bot",
    categories: ["Bot"],
    status: "Live",
    website: "https://www.hyperspartan.xyz/",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1891738991382163456/PUKVVK-M_400x400.jpg",
  },
  {
    id: 293,
    name: "HiveFi",
    description: "Trading strategy hub on Hyperliquid",
    categories: ["Bot"],
    status: "Coming Soon",
    website: "https://hivefi.xyz/",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1922683916919382016/8i3oDdcH_400x400.jpg",
  },
  {
    id: 294,
    name: "kibl",
    description: "Borrow, lend, and leverage.",
    categories: ["Lending", "Yield"],
    status: "Coming Soon",
    website: "https://kibl.fi/",
    tags: ["Lending", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1868186942766297088/w1eFzQq7_400x400.jpg",
  },
  {
    id: 295,
    name: "RNDM",
    description: "Disrupt DeFi with AI agents! Generate liquidity, solve with agents!",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://www.rndm.io/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1818442590775119872/XjPg0i4P_400x400.jpg",
  },
  {
    id: 296,
    name: "HYYY",
    description:
      "Developing $USDhy, a next-generation stablecoin on HyperEVM, utilizing delta-neutral strategies and AI-optimized position management on HyperLiquid",
    categories: ["Stablecoin"],
    status: "Coming Soon",
    website: "https://hyyy.app/",
    tags: ["Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1893890782190501888/EwZkdjXM_400x400.jpg",
  },
  {
    id: 297,
    name: "Liquid Start",
    description:
      "Experiment with the aim of improving the DeFi landscape we currently use. Covering Hyperliquid ecosystem",
    categories: ["Front End"],
    status: "Coming Soon",
    website: "https://x.com/Liquid_Start",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1815663701854171136/saIusHTg_400x400.png",
  },
  {
    id: 298,
    name: "Flowscan",
    description: "Hyperliquid Data Layer.",
    categories: ["Analytics"],
    status: "Live",
    website: "https://www.flowscan.xyz/",
    tags: ["Analytics"],
    logo: "https://pbs.twimg.com/profile_images/1945479570544525312/eRDWK5ws_400x400.jpg",
  },
  {
    id: 299,
    name: "HypeScreener",
    description: "Hyperliquid + HyperEVM dashboard for degens and farmers",
    categories: ["Analytics"],
    status: "Live",
    website: "https://www.hypescreener.xyz/",
    tags: ["Analytics"],
    logo: "https://pbs.twimg.com/profile_images/1927802443921866752/-NDiORL8_400x400.jpg",
  },
  {
    id: 300,
    name: "Hyper DeFAI",
    description: "The only DeFAI on Hyperliquid",
    categories: ["Bot"],
    status: "Coming Soon",
    website: "https://www.hyperai.org/",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1869036926444904448/uuSKfWEH_400x400.jpg",
  },
  {
    id: 301,
    name: "Avail Nexus",
    description:
      "Avail Nexus streamlines asset deposits into Hyperliquid by enabling transfers from 9 different blockchains",
    categories: ["Tools"],
    status: "Live",
    website: "https://chromewebstore.google.com/detail/avail-nexus-sdk-injector/pckfgdpbgkdehabcapdbhlphaoajdlea",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1981315109080219648/roJu5dHT_400x400.jpg",
  },
  {
    id: 302,
    name: "Rainbow",
    description: "The wallet that rewards you for having fun onchain.",
    categories: ["Mobile Wallet", "Extension Wallet"],
    status: "Live",
    website: "https://rainbow.me/",
    tags: ["Mobile Wallet", "Extension Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1557391177665708032/FSuv7Zpo_400x400.png",
  },
  {
    id: 303,
    name: "Rarible",
    description: "More than a marketplace.",
    categories: ["NFT"],
    status: "Live",
    website: "https://rarible.com/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1981189339980693504/1iOTxPAt_400x400.jpg",
  },
  {
    id: 304,
    name: "Deploy.Finance",
    description: "Earn supercharged yields on Hyperliquid",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.deploy.finance/dashboard",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1951345586604564480/vqqFH1qZ_400x400.jpg",
  },
  {
    id: 305,
    name: "Kintsu",
    description: "Creators of sHYPE and sMON - A new paradigm in decentralized Liquid Staking on Hyperliquid and Monad",
    categories: ["LST"],
    status: "Coming Soon",
    website: "https://kintsu.xyz/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1984001421960704000/UpI70-s4_400x400.jpg",
  },
  {
    id: 306,
    name: "OpenSea",
    description: "The best place to discover, own, and trade onchain.",
    categories: ["NFT"],
    status: "Live",
    website: "https://opensea.io/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1988303062847647744/aN36pB1h_400x400.jpg",
  },
  {
    id: 307,
    name: "Wormhole",
    description:
      "Wormhole is the leading interoperability platform connecting traditional finance and the internet economy.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://portalbridge.com/?targetChain=hyperevm",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1952696710108442624/lx9p8q90_400x400.jpg",
  },
  {
    id: 308,
    name: "StraddleFi",
    description: "Decentralized Crypto Options DEX on HyperLiquid | Trade, Hedge & Build Strategies On-Chain ",
    categories: ["Yield"],
    status: "Coming Soon",
    website: "https://www.straddlefi.xyz/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1968421456468955136/Y_QmbelA_400x400.jpg",
  },
  {
    id: 309,
    name: "Rosetta",
    description:
      "Rosetta is a block-level yield router for Hyperliquid — auto-allocating capital across HyperEVM and HyperCore to maximize stablecoin returns in real time.",
    categories: ["Yield"],
    status: "Live",
    website: "https://www.rosetta.sh/vaults",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1963241774467424256/uW7ky41Y_400x400.jpg",
  },
  {
    id: 310,
    name: "Zyper",
    description: "Launch free pools on PRJX & HyperSwap with locked LP + virtual liquidity. Earn trading fees forever.",
    categories: ["Yield"],
    status: "Live",
    website: "https://zyper.fun/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1931761027265253376/uwzWs9JV_400x400.jpg",
  },
  {
    id: 311,
    name: "HyperScope",
    description: "Scanning the stars of HyperEVM. One dashboard for every pool, every dex, every apr ",
    categories: ["Yield"],
    status: "Coming Soon",
    website: "https://x.com/hyperscope_hl",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1959055887940681728/vC21RM_l_400x400.jpg",
  },
  {
    id: 312,
    name: "LiquidFi",
    description: "NFT Aggregated Marketplace of Hyperliquid",
    categories: ["NFT"],
    status: "Live",
    website: "https://www.liquidfi.app/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1897688545688424448/AOUTW5iS_400x400.jpg",
  },
  {
    id: 313,
    name: "Hyperliquid Core",
    description:
      "The blockchain to house all finance. Trade, build apps, and launch tokens on the same hyper-performant chain. X by Hyper Foundation",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.hyperliquid.xyz/join/0XLCRGS",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/2001260078352285697/f5cl2Syx_400x400.jpg",
  },
  {
    id: 314,
    name: "Liquid Estate",
    description: "Tokenized real estate, anywhere, anytime. HyperEVM.",
    categories: ["RWA"],
    status: "Coming Soon",
    website: "https://liquidestate.xyz/",
    tags: ["RWA"],
    logo: "https://pbs.twimg.com/profile_images/1944725372517359617/YIFGVff7_400x400.png",
  },
  {
    id: 315,
    name: "Neura Vaults",
    description: "Self-Evolving Liquidity Vaults on HyperEVM",
    categories: ["Options"],
    status: "Coming Soon",
    website: "https://x.com/Neuravaults",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1982952833709162496/KF_SzVrM_400x400.jpg",
  },
  {
    id: 316,
    name: "Trenches",
    description:
      "Trenches is a real-time, multiplayer PvP trading game where players go H2H to win pooled buy-ins. It turns speculation into a competitive sport. Coming soon.",
    categories: ["Launchpad"],
    status: "Coming Soon",
    website: "https://www.trenches.online/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1951103584533356544/2A98WCvD_400x400.jpg",
  },
  {
    id: 317,
    name: "Kops",
    description: "The Only Agentic Automation Protocol on Hype. Powered by Hyperliquid",
    categories: ["Yield"],
    status: "Coming Soon",
    website: "https://kops.ai/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1944740666266841089/mJokSskJ_400x400.jpg",
  },
  {
    id: 318,
    name: "Nested",
    description: "Swap your coins with uniswap and 1inch directly on discord with the best rates.",
    categories: ["Bot"],
    status: "Coming Soon",
    website: "https://nestedwallet.com/",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1883122885515964416/Sv7a9JUt_400x400.jpg",
  },
  {
    id: 319,
    name: "Zup Protocol",
    description: "Find & Deposit into the best liquidity pool in a minute.",
    categories: ["Yield"],
    status: "Coming Soon",
    website: "https://app.zupprotocol.xyz/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1962526802254938112/bUYs8Ff5_400x400.jpg",
  },
  {
    id: 320,
    name: "Yape Club",
    description:
      "AI co-yapping platform for smart apes only. Create high-quality content. Grow your influence. Earn rewards.",
    categories: ["InfoFi"],
    status: "Coming Soon",
    website: "https://liquidestate.xyz/",
    tags: ["InfoFi"],
    logo: "https://pbs.twimg.com/profile_images/1942948430613012480/c6U06JsQ_400x400.png",
  },
  {
    id: 321,
    name: "Hypertrade",
    description:
      "The only DEX aggregator on HyperEVM with HyperCore support. Intelligent routing with the fastest & most efficient swaps.",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.ht.xyz/?referral=TCIEIODMUCGBTJLQ",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1959150262297231360/yIv3GdeG_400x400.jpg",
  },
  {
    id: 322,
    name: "BrownFi",
    description:
      "Innovative oracle-based AMM, high capital efficiency (~UniV3), NO out-of-range & simple LP management for average users to mitigate IL & maximize LP gains",
    categories: ["DEX"],
    status: "Live",
    website: "https://brownfi.io/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1746843422454087680/Q58dTyR7_400x400.jpg",
  },
  {
    id: 323,
    name: "Perpalert",
    description: "We notify you about your Hyperliquid trades over a call.",
    categories: ["Tools"],
    status: "Live",
    website: "https://www.perpalert.app/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1942249195835994112/Bi0LWPtd_400x400.jpg",
  },
  {
    id: 324,
    name: "HyperBill",
    description: "AI-driven yield engine for stablecoins. Launching soon on Hyperliquid",
    categories: ["Yield"],
    status: "Coming Soon",
    website: "https://hyperbill.io/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1955619871141801984/1-Yz1j8E_400x400.jpg",
  },
  {
    id: 325,
    name: "GUESS",
    description: "Predictions Market on Hyperliquid",
    categories: ["Options"],
    status: "Coming Soon",
    website: "https://www.guess.gs/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1963672474580668416/tSuCzi1x_400x400.jpg",
  },
  {
    id: 326,
    name: "Fibrous",
    description: "One place for best execution across chains, now live on HyperEVM",
    categories: ["DEX"],
    status: "Live",
    website: "https://fibrous.finance/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1910332320067747840/SGkFXgaC_400x400.jpg",
  },
  {
    id: 327,
    name: "Tangem",
    description: "A cold wallet built for you. Wear it, use it, hide it. Your crypto, your custody.",
    categories: ["Mobile Wallet"],
    status: "Live",
    website: "https://tangem.com/en/",
    tags: ["Mobile Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1813600365394141184/L4woOdd6_400x400.jpg",
  },
  {
    id: 328,
    name: "HyperETH",
    description:
      "Win on every trade → The highest-paid affiliate rewards (up to 90%) + 10% automatic cashback on builder fees",
    categories: ["Front End"],
    status: "Live",
    website: "https://hypereth.io/register?ref=HYPE",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1960231576291422208/DIc0qy5G_400x400.jpg",
  },
  {
    id: 329,
    name: "Alura",
    description: "The Discipline Engine for Hyperliquid Perps.",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/aluraHperliquid_bot?start=5736577098",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1879379527224446976/FLX4LDFL_400x400.jpg",
  },
  {
    id: 330,
    name: "FLIPgo",
    description: "FLIPgo is Hyperliquid's native streaming platform",
    categories: ["SocialFi"],
    status: "Beta",
    website: "https://flipgo.xyz/",
    tags: ["SocialFi"],
    logo: "https://pbs.twimg.com/profile_images/1977184535205892096/9dn7s864_400x400.jpg",
  },
  {
    id: 331,
    name: "Backpack",
    description: "All-in-one crypto wallet and exchange.",
    categories: ["Mobile Wallet", "Extension Wallet"],
    status: "Live",
    website: "https://backpack.app/",
    tags: ["Mobile Wallet", "Extension Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1957829985143791616/sA2YoWNq_400x400.jpg",
  },
  {
    id: 332,
    name: "Native Markets",
    description: "Building a better dollar for Hyperliquid",
    categories: ["Stablecoin"],
    status: "Live",
    website: "https://x.com/nativemarkets",
    tags: ["Stablecoin"],
    logo: "https://pbs.twimg.com/profile_images/1973434072392200192/lHZFBKVV_400x400.jpg",
  },
  {
    id: 333,
    name: "ChipSwap",
    description: "We're always seeking for new chains for you.",
    categories: ["DEX"],
    status: "Live",
    website: "https://chipswap.org/#/swap",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1886833243087163392/c1VJNgwf_400x400.jpg",
  },
  {
    id: 334,
    name: "Moralis",
    description:
      "The crypto data layer. Fetch blockchain data with our Data APIs, monitor crypto data with Streams, and export massive blockchain datasets with Datashare.",
    categories: ["Tools", "Analytics"],
    status: "Live",
    website: "https://moralis.com/",
    tags: ["Tools", "Analytics"],
    logo: "https://pbs.twimg.com/profile_images/1970408541505683456/0Ga2dHiU_400x400.jpg",
  },
  {
    id: 335,
    name: "Ring Protocol",
    description: "A new era in decentralized exchange revolutionizing asset utilization. One ring to rule them all.",
    categories: ["DEX"],
    status: "Live",
    website: "https://ring.exchange/",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1763217496901869568/fyqZ5UP9_400x400.jpg",
  },
  {
    id: 336,
    name: "Whales Market",
    description: "The Leading Pre-market DEX for OTC Token Deals.",
    categories: ["Options"],
    status: "Live",
    website: "https://pro.whales.market/?r=046949",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1970832036119433217/pm_Xem0V_400x400.jpg",
  },
  {
    id: 338,
    name: "Polymarket",
    description: "The world's largest prediction market.",
    categories: ["Options"],
    status: "Live",
    website: "https://polymarket.com/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1965851729825546240/fLHeW0Ji_400x400.jpg",
  },
  {
    id: 339,
    name: "SIR",
    description: "Leverage with a onetime fee, keep the rest for yourself",
    categories: ["Front End"],
    status: "Live",
    website: "https://app.sir.trading/",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1945486033337913344/NG0Axq9d_400x400.jpg",
  },
  {
    id: 340,
    name: "GONDI",
    description: "Premier NFT Liquidity Marketplace. Collect. Sell. Borrow. Lend.",
    categories: ["NFT"],
    status: "Live",
    website: "https://www.gondi.xyz/",
    tags: ["NFT", "veNFT"],
    logo: "https://pbs.twimg.com/profile_images/1976314337363951616/7K2hoVot_400x400.png",
  },
  {
    id: 341,
    name: "Bitfrost",
    description:
      "Bitfrost is accelerating growth across the Hyperliquid ecosystem by launching the next wave of Spot markets.",
    categories: ["Bridge"],
    status: "Coming Soon",
    website: "https://bitfrost.xyz/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1853499656711368704/q1uv1RzI_400x400.jpg",
  },
  {
    id: 342,
    name: "Upheaval",
    description: "Defi on Hyperliquid",
    categories: ["DEX"],
    status: "Live",
    website: "https://upheaval.fi/portfolio?ref=OXLCRGS",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1943206624879087617/U01ngr77_400x400.jpg",
  },
  {
    id: 343,
    name: "Otomato",
    description: "Building the HyperEVM assistant",
    categories: ["Bot"],
    status: "Live",
    website: "https://app.otomato.xyz/access-code?ref=CGRCM5",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1924474808793772032/We-q1hsM_400x400.jpg",
  },
  {
    id: 344,
    name: "Zigg",
    description: "Emerging performant markets",
    categories: ["Front End"],
    status: "Coming Soon",
    website: "https://x.com/ZiggsOnChain",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1679611494109937664/iBuz9THB_400x400.jpg",
  },
  {
    id: 345,
    name: "Global Compute Index",
    description: "Commodifying Compute",
    categories: ["Front End"],
    status: "Coming Soon",
    website: "https://globalcomputeindex.com/#pitch",
    tags: ["Front End"],
    logo: "https://pbs.twimg.com/profile_images/1980169121191862272/ToVL-sfm_400x400.jpg",
  },
  {
    id: 346,
    name: "HyperOdd",
    description: "Trade any event, anywhere with leverage on Hyperliquid",
    categories: ["Options"],
    status: "Coming Soon",
    website: "https://hyperodd.com/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1980341315419136000/KRlG8f5t_400x400.jpg",
  },
  {
    id: 347,
    name: "Jones",
    description: "Exotic DeFi strategies and v3 ALMs.",
    categories: ["Yield"],
    status: "Live",
    website: "https://www.jonesdao.io/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1972653329470910464/5ZLON14p_400x400.jpg",
  },
  {
    id: 348,
    name: "Wellspring",
    description: "High Yield Savings powered by Stablecoins & DeFi. Earn up to 12% APY on your cash deposits today!",
    categories: ["Yield"],
    status: "Live",
    website: "https://wellspring.money/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1948500291948617728/sVyotcqO_400x400.jpg",
  },
  {
    id: 349,
    name: "GlueX Terminal",
    description: "The only institutional grade portfolio manager for decentralized finance.",
    categories: ["Yield"],
    status: "Coming Soon",
    website: "https://x.com/GluexTerminal",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1984068308229107712/wSgCUKPG_400x400.jpg",
  },
  {
    id: 350,
    name: "Hyperscreener by ASXN",
    description: "All-in-one dashboard for everything Hyperliquid",
    categories: ["Analytics"],
    status: "Live",
    website: "https://hyperscreener.asxn.xyz/home",
    tags: ["Analytics"],
    logo: "https://pbs.twimg.com/profile_images/1669029465362505756/CXGvN0w0_400x400.jpg",
  },
  {
    id: 351,
    name: "Hybra Finance",
    description: "Public liquidity layer on Hyperliquid. Upgraded ve(3,3) flywheel. CL & intent-based gasless trades",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.hybra.finance?code=MBKOYM",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1960708894415839238/a_t1x1aO_400x400.jpg",
  },
  {
    id: 352,
    name: "Derive.xyz",
    description: "Derive (prev. Lyra) | The Leading Decentralized Options Platform on BTC & ETH.",
    categories: ["Options"],
    status: "Live",
    website: "https://app.derive.xyz/trade/options?symbol=HYPE",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1828234675325976576/UVYEVWhP_400x400.jpg",
  },
]

const defiLlamaSlugs: { [key: string]: string } = {
  "Hyperliquid Core": "hyperliquid",
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
  Gliquid: "gliquid",
  Hyperdrive: "hyperdrive-hl",
  Skate: "skate-amm",
  HyperCat: "hypercat",
  optfun: "optfun",
  "Rumpel Labs": "rumpel-labs",
  Hyperwave: "hyperwave",
  manadotwin: "manaswap",
  "Project X": "project-x",
  Kinetiq: "kinetiq",
  HyperBrick: "hyperbrick",
  Liminal: "liminal",
  HyperBloom: "hyperbloom",
  hx_finance: "hx-finance",
  Upheaval: "upheaval-finance",
  Hypervault: "hypervault",
  Blueberry: "blueberry",
  BrownFi: "brownfi",
  Veda: "veda",
  "Rysk Finance": "rysk-finance",
  Ultrasolid: "ultrasolid",
}

const categories = [
  "All",
  "DEX",
  "Bridge",
  "Lending",
  "Yield",
  "Delta-neutral",
  "Stablecoin",
  "LST",
  "1st Tier Airdrop",
  "2nd Tier Airdrop",
  "3rd Tier Airdrop",
  "Launchpad",
  "Extension Wallet",
  "Mobile Wallet",
  "NFT",
  "RWA",
  "Tools",
  "Analytics",
  "Front End",
  "Bot",
  "Options",
  "SocialFi",
  "InfoFi",
  "GambleFi",
  "Gaming",
  "On-Ramp",
  "Other",
]

type ProjectStatus = "Live" | "Beta" | "Coming Soon" | string

type Category =
  | "All"
  | "DEX"
  | "Bridge"
  | "Lending"
  | "Yield"
  | "Delta-neutral"
  | "Stablecoin"
  | "LST"
  | "1st Tier Airdrop"
  | "2nd Tier Airdrop"
  | "3rd Tier Airdrop"
  | "Launchpad"
  | "Extension Wallet"
  | "Mobile Wallet"
  | "NFT"
  | "RWA"
  | "Tools"
  | "Analytics"
  | "Front End"
  | "Bot"
  | "Options"
  | "SocialFi"
  | "InfoFi"
  | "GambleFi"
  | "Gaming"
  | "On-Ramp"
  | "Other"

const getStatusColor = (status: ProjectStatus) => {
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

const StatusBadge = ({ status }: { status: ProjectStatus }) => (
  <Badge className={`${getStatusColor(status)} text-xs flex-shrink-0 ml-2`}>{status}</Badge>
)

const TagBadges = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-1 sm:gap-2">
    {tags.slice(0, 3).map((tag) => (
      <Badge key={tag} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
        {tag}
      </Badge>
    ))}
    {tags.length > 3 && (
      <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
        +{tags.length - 3}
      </Badge>
    )}
  </div>
)

const ProjectCard = ({ project }: { project: Project }) => (
  <Card
    key={project.id}
    className="bg-gray-900/80 border-gray-700 hover:border-gray-600 transition-colors flex flex-col h-full"
  >
    <CardHeader className="flex-1 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex-shrink-0"
            style={{
              backgroundImage: `url(${project.logo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-white text-base sm:text-lg lg:text-xl truncate">{project.name}</CardTitle>
          </div>
        </div>
      </div>
      <CardDescription className="text-gray-400 text-sm line-clamp-3 sm:line-clamp-4">
        {project.description}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 mt-auto p-4 sm:p-6 pt-0">
      <div className="text-sm">
        <div>
          <span className="text-gray-400">TVL:</span>
          <span className="text-white ml-2 font-medium">{project.tvl}</span>
        </div>
      </div>
      <StatusBadge status={project.status} />
      <TagBadges tags={project.tags} />
      <div className="flex items-center pt-2">
        <Button
          size="sm"
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-800 w-full text-xs sm:text-sm bg-transparent"
          asChild
        >
          <Link href={project.website} target="_blank" rel="noopener noreferrer">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Website
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default function EcosystemPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [projectData, setProjectData] = useState<Project[]>(projects)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const allCategories = useMemo(() => {
    const categories = new Set<string>()
    projects.forEach((project) => {
      project.categories.forEach((category) => categories.add(category))
    })
    return Array.from(categories).sort()
  }, [])

  const filteredProjects = useMemo(() => {
    let filtered = projectData

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((project) =>
        selectedCategories.some((category) => project.categories.includes(category)),
      )
    }

    if (searchQuery) {
      filtered = filtered.filter((project) => {
        const matchesSearch =
          (project.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (project.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (project.tags || []).some((tag) => (tag || "").toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesSearch
      })
    }

    return Array.from(new Map(filtered.map((project) => [project.id, project])).values())
  }, [projectData, selectedCategories, searchQuery])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
  }

  useEffect(() => {
    const urlSearch = searchParams.get("search")
    if (urlSearch) setSearchQuery(urlSearch)
  }, [searchParams])

  const updateURL = (newSearch: string) => {
    const params = new URLSearchParams()
    if (newSearch) params.set("search", newSearch)
    const queryString = params.toString()
    const newURL = queryString ? `/?${queryString}` : "/"
    router.push(newURL, { scroll: false })
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    updateURL(value)
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Video */}
      {/* CHANGE: Updated video source to use provided blob URL */}
      <video
        preload="auto"
        loop
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RwGeVOvQtNVZBORO-KARqSqFmGhvTMT2zwlHromODnQUfKF.mp4"
        autoPlay
        muted
        playsInline
      ></video>
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 px-4 sm:px-6 py-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 sm:w-12 sm:h-12 bg-green-950 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundImage: "url(https://hyperfoundation.org/landing/blob_green.gif)",
                    backgroundSize: "95%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <span className="text-lg sm:text-xl font-semibold whitespace-nowrap">HyperEVM Portal</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button className="bg-gray-200 hover:bg-gray-300 text-black">
                <Link href="https://megaeth-portal.vercel.app/">MegaETH Portal</Link>
              </Button>
              <Button className="bg-green-800 hover:bg-green-900 text-white">
                <Link href="https://plasma-portal.vercel.app//">Plasma Portal</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="https://x.com/intent/follow?screen_name=HyperLcrgs">Follow X</Link>
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Link href="https://give-me-a-tip.vercel.app/">
                  <span>☕</span> Buy me a coffee
                </Link>
              </Button>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3 pt-4">
                <Button className="bg-gray-200 hover:bg-gray-300 text-black">
                  <Link href="https://megaeth-portal.vercel.app/">MegaETH Portal</Link>
                </Button>
                <Button className="bg-green-800 hover:bg-green-900 text-white">
                  <Link href="https://plasma-portal.vercel.app//">Plasma Portal</Link>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="https://x.com/intent/follow?screen_name=HyperLcrgs">Follow X</Link>
                </Button>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Link href="https://give-me-a-tip.vercel.app/">
                    <span>☕</span> Buy me a coffee
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </header>
        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
          {/* Hero Section */}
          <div className="mb-8 sm:mb-12 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Ultimate HyperEVM Dashboard</h1>
            <p className="text-base sm:text-lg max-w-3xl mx-auto sm:mx-0">
              Explore the growing ecosystem of projects building on HyperEVM. Learn about each project, their features,
              and how to get involved.
            </p>
          </div>
          {/* Search Bar */}
          <div className="mb-6 sm:mb-8 flex justify-left">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 w-full"
              />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">Categories</h2>
              {selectedCategories.length > 0 && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="text-white border-white/20 hover:bg-white/10 bg-transparent"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters ({selectedCategories.length})
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedCategories.includes(category)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-white border-white/30 hover:bg-white/10 hover:border-white/50"
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">Loading TVL data...</div>
            </div>
          )}
          {/* Projects Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
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
