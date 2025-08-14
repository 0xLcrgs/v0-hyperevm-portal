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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    id: 1,
    name: "HyperLend",
    description:
      "HyperLend is a high-performance lending protocol on Hyperliquid EVM, offering real-time leverage, dynamic rates, and deep liquidity.",
    categories: ["Lending", "Yield"],
    status: "Live",
    website: "https://app.hyperlend.finance/?ref=0XLCRGS",
    tags: ["Lending", "Borrowing", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1808617090602901504/VsTtyaqZ_400x400.jpg",
  },
  {
    id: 2,
    name: "Felix",
    description:
      "Felix offers secure, easy on-chain borrowing and lending on Hyperliquid L1, helping users unlock liquidity or earn yield seamlessly.",
    categories: ["Lending", "CDP"],
    status: "Live",
    website: "https://usefelix.xyz?ref=18935567",
    tags: ["Lending", "Borrowing", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1845076293735297024/mx8MTMca_400x400.jpg",
  },
  {
    id: 3,
    name: "Hyperbeat",
    description:
      "Hyperbeat is a native protocol on Hyperliquid, designed to scale HyperliquidX, HyperEVM, and the broader ecosystem",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.hyperbeat.org/earn?referral=FA86003B",
    tags: ["Yield", "Vaults"],
    logo: "https://pbs.twimg.com/profile_images/1879158343194796032/ftN7FT3s_400x400.jpg",
  },
  {
    id: 4,
    name: "HyperBrick",
    description: "DLMM DEX powering precision trading, dynamic liquidity, and yield-optimized pools for next-gen tokens on Hyperliquid",
    categories: ["DEX"],
    status: "Live",
    website: "https://hyperbrick.xyz/point?ref=XLCRGS",
    tags: ["DEX", "DLMM"],
    logo: "https://pbs.twimg.com/profile_images/1945444770773336064/ZAUJfdBF_400x400.jpg",
  },
  {
    id: 5,
    name: "Project X",
    description:
      "Project X is built on the belief that tech is becoming increasingly commoditized and the next era of DeFi will be won by innovating on distribution, incentive design and UX.",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.prjx.com/@0xLcrgs",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1922089219737911296/1miGhDTB_400x400.jpg",
  },
  {
    id: 6,
    name: "Liminal",
    description:
      "Liminal is a protocol that enables users to earn real and sustainable yield on their stablecoins through delta-neutral strategies",
    categories: ["Yield", "Delta-neutral"],
    status: "Live",
    website: "https://liminal.money/join/XLCRGS",
    tags: ["Yield", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1934561280637222912/sgMp90I7_400x400.jpg",
  },
  {
    id: 7,
    name: "Mercury",
    description:
      "Mercury is a mobile app for iOS and Android, making Hyperliquid's DeFi platform simple and accessible for all users",
    categories: ["Wallet"],
    status: "Beta",
    website: "https://www.mercurytrade.org/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1929998534218055681/Pxe0NjGb_400x400.jpg",
  },
  {
    id: 8,
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
    id: 9,
    name: "Dexari",
    description:
      "Dexari is a user-friendly DeFi platform, aiming to give everyone control of digital assets with centralized platform ease.",
    categories: ["Wallet"],
    status: "Live",
    website: "https://dexari.com/join/xlcrgs",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1928147422313848832/GxjMV0TQ_400x400.jpg",
  },
  {
    id: 10,
    name: "Supercexy",
    description: "You're still early",
    categories: ["Wallet", "Trading Interface"],
    status: "Live",
    website: "https://supercexy.com/@0xlcrgs",
    tags: ["Wallet", "Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1953782840157749248/3nEXVDCi_400x400.jpg",
  },
  {
    id: 11,
    name: "Liquid.xyz",
    description: "Not a lot of info yet but it's seams to be a non-custodial wallet with UI resembling a CEX",
    categories: ["Wallet", "Trading Interface"],
    status: "Live",
    website: "https://referral.tryliquid.xyz/wFDZZ3qDAVb",
    tags: ["Trading Interface", "Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1929902747706372096/ahC8Vpla_400x400.jpg",
  },
  {
    id: 12,
    name: "HyperFlow",
    description: "Flow seamlessly into Hyperliquid with Hyperflow! DEX & bridge Aggregator for fast swaps & transfers.",
    categories: ["Bridge", "DEX"],
    status: "Live",
    website: "https://hyperflow.fun?ref=2HfzW",
    tags: ["Bridge", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1914981578272595968/tMZbWPkT_400x400.jpg",
  },
  {
    id: 13,
    name: "BasedApp",
    description:
      "Spend Crypto like Fiat with BasedApp Visa Card. Live in SG, opening up to more countries in April 2025. Backed by Delphi, Hashed and Spartan.",
    categories: ["Wallet"],
    status: "Live",
    website: "https://basedapp.io/register?ref=XLCRGS",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1945707037322575872/clYVc-L2_400x400.jpg",
  },
  {
    id: 14,
    name: "HyperBloom",
    description:
      "Hyperbloom is a DEX aggregator and yield optimizer on HyperEVM, offering best swap rates and autocompounding yields across Hyperliquid",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.hyperbloom.xyz/?ref=6430f279-b",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1932366410082033664/TYBk0ryj_400x400.jpg",
  },
  {
    id: 15,
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
    id: 16,
    name: "Hybra Finance",
    description: "Public liquidity layer on Hyperliquid. Upgraded ve(3,3) flywheel. CL & intent-based gasless trades",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.hybra.finance?code=MBKOYM",
    tags: ["DEX", "ve(3,3)"],
    logo: "https://pbs.twimg.com/profile_images/1945766945481175041/7oOm2WzZ_400x400.jpg",
  },
  {
    id: 17,
    name: "hx_finance",
    description:
      "The future of private DeFi on HyperEVM. Efficient swaps now, zero-knowledge privacy on the horizon.",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.hx.finance?ref=xlcrgs",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1942932382593560576/YBBNLaEF_400x400.jpg",
  },
  {
    id: 18,
    name: "Gliquid",
    description: "Next-Gen V4 AMM unlocking hyper-efficient liquidity on Hyperliquid Powered by Crypto Algebra",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.gliquid.xyz?referral=g5JIsrfD",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1928414866554974208/FpTxpjHe_400x400.jpg",
  },
  {
    id: 19,
    name: "Dreamcash",
    description:
      "Code: xrlyfy | Trading so good it feels like a dream. On Hyperliquid.",
    categories: ["Wallet"],
    status: "Beta",
    website: "https://dreamcash.xyz",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1950639556446900224/sUXo-sDJ_400x400.jpg",
  },
  {
    id: 20,
    name: "Splash",
    description:
      "Splash Wallet is a non-custodial crypto wallet that integrates DeFi protocols directly into the user interface.",
    categories: ["Wallet"],
    status: "Beta",
    website: "https://splashwallet.xyz/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1938085622725701632/n09KtLmW_400x400.jpg",
  },
  {
    id: 21,
    name: "Unit",
    description: "Unit is the asset tokenization layer on Hyperliquid, enabling seamless deposits and withdrawals.",
    categories: ["Bridge"],
    status: "Live",
    website: "https://app.hyperunit.xyz/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1937271299338035200/sEKHkXkc_400x400.jpg",
  },
  {
    id: 22,
    name: "Kinetiq",
    description: "Powering Liquid Staking on Hyperliquid.",
    categories: ["LST"],
    status: "Live",
    website: "https://kinetiq.xyz/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1880410606093647872/qazlkvcq_400x400.jpg",
  },
  {
    id: 23,
    name: "HypurrFi",
    description: "HypurrFi is a leveraged lending marketplace for clean leverage loops on Hyperliquid.",
    categories: ["Lending", "CDP"],
    status: "Live",
    website: "https://app.hypurr.fi/buddies/0XLCRGS",
    tags: ["Lending", "Borrowing", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1882841326347005953/vewoJ4Vl_400x400.png",
  },
  {
    id: 24,
    name: "Dextrabot",
    description:
      "Discover profitable traders, analyze their performance, and automatically copy their strategies with customizable risk settings",
    categories: ["Bot"],
    status: "Live",
    website: "https://app.dextrabot.com/referral/0XLCRGS",
    tags: ["Bot", "Tracker"],
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
    name: "Bullpen",
    description: "Bullpen is the easiest way to trade crypto perps on mobile—period.",
    categories: ["Bot", "Wallet", "Trading Interface"],
    status: "Live",
    website: "https://bullpen.fi/@grg_ouz",
    tags: ["Bot", "Wallet", "Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1885043356885000192/2YeI1RLF_400x400.png",
  },
  {
    id: 27,
    name: "nest",
    description:
      "The trading and liquidity engine for Hyperliquid",
    categories: ["DEX"],
    status: "Coming Soon",
    website: "https://x.com/NestExchange",
    tags: ["DEX"],
    logo: "https://pbs.twimg.com/profile_images/1936441608909512704/gCwY16PF_400x400.jpg",
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
    description:
      "Tokenized Yield strategies and curated DeFi ecosystem on Hyperliquid EVM",
    categories: ["Yield"],
    status: "Live",
    website: "https://www.blueberry.garden/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1624077952601423878/GjmtH148_400x400.jpg",
  },
  {
    id: 31,
    name: "HYPE Engine",
    description:
      "The $HYPE accumulation machine.",
    categories: ["Yield"],
    status: "Coming Soon",
    website: "https://x.com/TheHypeEngine",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1954998568319606785/sxWE6Y_9_400x400.jpg",
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
    name: "Ventuals",
    description:
      "Long or short pre-IPO companies with leverage, on Hyperliquid",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://app.ventuals.com/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1931109324480229376/EB_PojFW_400x400.png",
  },
  {
    id: 34,
    name: "Harmonix Finance",
    description:
      "Harmonix Finance offers automated vaults with hedge fund strategies, making advanced investment optimization easy and accessible for users.",
    categories: ["Yield", "Delta-neutral"],
    status: "Live",
    website: "https://app.harmonix.fi/?ref=Bv2S47vd",
    tags: ["Yield", "Vaults", "Delta-neutral"],
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
    logo: "https://pbs.twimg.com/profile_images/1752754182572924928/I7hOaBLU_400x400.jpg",
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
    name: "LiquidSwap",
    description:
      "Create tokens and agents effortlessly, trade for profits seamlessly, all without writing a single line of code!",
    categories: ["Launchpad", "DEX"],
    status: "Live",
    website: "https://liqd.ag/",
    tags: ["Launchpad", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1930956754810032128/WAE3Cju-_400x400.jpg",
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
    website: "https://app.kittenswap.finance/points?referrer=0xE48c64Ec6cf456a28F91e5B2bdA3A626DEDCC8E5",
    tags: ["DEX", "ve(3,3)"],
    logo: "https://pbs.twimg.com/profile_images/1951351497754632192/aLjGUNxI_400x400.jpg",
  },
  {
    id: 40,
    name: "Morpho",
    description:
      "Open infrastructure for onchain loans",
    categories: ["Lending", "Yield"],
    status: "Live",
    website: "https://morpho.org/",
    tags: ["Lending", "Borrowing", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1930600293915410432/dgTU7UNU_400x400.jpg",
  },
  {
    id: 41,
    name: "Pendle",
    description:
      "Liberating Yield || The world's largest crypto yield trading platform",
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
    tags: ["Yield", "Vaults"],
    logo: "https://pbs.twimg.com/profile_images/1853600042952663040/AwOMmTi1_400x400.jpg",
  },
  {
    id: 44,
    name: "USDhl",
    description:
      "USDhl is a treasury-backed stablecoin for both HyperCore and HyperEVM, tradable against USDC and usable across integrated DeFi apps",
    categories: ["CDP"],
    status: "Live",
    website: "https://usdhl.xyz/",
    tags: ["CDP"],
    logo: "https://pbs.twimg.com/profile_images/1928111403551911936/rkFUzZ4Z_400x400.jpg",
  },
  {
    id: 45,
    name: "Delpho",
    description:
      "Delpho uses new tech to eliminate sequencing gaps and trust issues, letting stablecoins achieve both safety and earnings.",
    categories: ["CDP"],
    status: "Coming Soon",
    website: "https://www.delpho.xyz/",
    tags: ["CDP"],
    logo: "https://pbs.twimg.com/profile_images/1942486893637128192/5L46DcQo_400x400.jpg",
  },
  {
    id: 46,
    name: "fullstack",
    description:
      "fullstack",
    categories: ["Trading Interface"],
    status: "Coming Soon",
    website: "https://x.com/fullstack_trade",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1896299355184734208/hcCPfvW9_400x400.jpg",
  },
  {
    id: 47,
    name: "Euler",
    description: "The lending super app.",
    categories: ["Lending", "Yield"],
    status: "Live",
    website: "https://app.euler.finance/",
    tags: ["Lending", "Borrowing", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1947602115557527553/15Jr7cIa_400x400.jpg",
  },
  {
    id: 48,
    name: "Insilico Terminal",
    description:
      "First professional-grade order and execution management terminal on HyperLiquid, free to use, with advanced features for all traders.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://insilicoterminal.com/#/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1798271540565315584/esokUp7H_400x400.jpg",
  },
  {
    id: 49,
    name: "Theo",
    description:
      "Theo is decentralized trading infrastructure connecting onchain capital with global markets and institutions.",
    categories: ["Yield", "CDP", "Delta-neutral"],
    status: "Live",
    website: "https://app.theo.xyz/invite?invite=8ab991be-7e8a-40a5-9b93-c3b2518a6a95",
    tags: ["Yield", "CDP", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1928132409783963648/LizAN275_400x400.png",
  },
  {
    id: 50,
    name: "The Hyperliquid Bridge",
    description:
      "The Hyperliquid Bridge lets you transfer assets into HyperEVM and HyperCore from 120+ blockchains quickly, securely, and with low fees",
    categories: ["Bridge"],
    status: "Live",
    website: "https://www.thehyperliquidbridge.xyz/transfer",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1779646801605242880/FrFssPAQ_400x400.jpg",
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
    logo: "https://pbs.twimg.com/profile_images/1945144527498485760/QxoWQgE0_400x400.jpg",
  },
  {
    id: 53,
    name: "Garden",
    description: "Trustless peer-to-peer bitcoin bridge",
    categories: ["Bridge"],
    status: "Live",
    website: "https://garden.finance/",
    tags: ["Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1943520835119054848/_BXz4rcc_400x400.jpg",
  },
  {
    id: 54,
    name: "Jumper Exchange",
    description: "Crypto's Everything Exchange",
    categories: ["Bridge", "DEX"],
    status: "Live",
    website: "https://jumper.exchange/",
    tags: ["Bridge", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1947935575635333120/gJknQM9m_400x400.jpg",
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
    description:
      "The DeFi Engine for Financial Apps // $4B+ in deposits",
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
    tags: ["Yield", "Vaults", "Delta-neutral"],
    logo: "https://pbs.twimg.com/profile_images/1765931135308115968/f_4LkxDr_400x400.jpg",
  },
  {
    id: 58,
    name: "Turtle.Club",
    description:
      "Turtle Club links LPs to top incentives across assets and chains, simplifying due diligence by operating without smart contracts.",
    categories: ["Yield"],
    status: "Live",
    website: "https://app.turtle.club/deals?ref=0XLCRGS",
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
    tags: ["Yield", "Vaults"],
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
    tags: ["Yield", "Vaults"],
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
    name: "HyperPath",
    description:
      "Hyperpath is an easy on-ramp for Hyperliquid, converting fiat to any on-chain asset via stable-hop routing for seamless access.",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.hyperpath.finance/swap",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1928723564510711808/Dp-TbSSP_400x400.jpg",
  },
  {
    id: 65,
    name: "Roar Finance",
    description:
      "Roar Finance is a decentralized yield farming protocol built on the Hyperliquid EVM Chain",
    categories: ["Yield"],
    status: "Coming Soon",
    website: "https://roar-finance.gitbook.io/roar-finance",
    tags: ["Yield", "Vaults"],
    logo: "https://pbs.twimg.com/profile_images/1933086000017715200/f0ooM9g9_400x400.jpg",
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
    id: 68,
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
    id: 69,
    name: "Coinpilot",
    description: "Copy winning traders on Hyperliquid today.",
    categories: ["Bot", "Trading Interface"],
    status: "Beta",
    website: "https://getwaitlist.com/waitlist/26825?ref_id=MKXCWG5PB",
    tags: ["Bot", "Trading Interface"],
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
    name: "Hypertrade",
    description:
      "The only DEX aggregator on HyperEVM with HyperCore support. Intelligent routing with the fastest & most efficient swaps.",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.ht.xyz/?referral=TCIEIODMUCGBTJLQ",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1934537763086364672/L8qfksmW_400x400.jpg",
  },
  {
    id: 75,
    name: "Hyperstable",
    description:
      "Hyperstable is a crypto-backed, over-collateralized and decentralized stablecoin that's designed to trade at one US Dollar.",
    categories: ["Lending", "CDP"],
    status: "Live",
    website: "https://app.hyperstable.xyz/r/0xLcrgs",
    tags: ["Lending", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1911431404476362753/WdVhBKDh_400x400.png",
  },
  {
    id: 76,
    name: "Neko.hl",
    description:
      "Neko is the first DeFAI Swarm on Hyperliquid, using AI to automate DeFi trading, token launches, and yield strategies for users",
    categories: ["Trading Interface", "Bot", "Tools"],
    status: "Coming Soon",
    website: "https://www.neko.fun/",
    tags: ["Trading Interface", "Bot", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1880643122683916288/xtRa6Q64_400x400.png",
  },
  {
    id: 77,
    name: "HyperFlash",
    description:
      "HyperFlash is a next-gen staking protocol on HyperEVM, combining liquid staking with MEV strategies to maximize HYPE yields for users",
    categories: ["LST"],
    status: "Coming Soon",
    website: "https://hyperflash.xyz/",
    tags: ["LST"],
    logo: "https://pbs.twimg.com/profile_images/1892277863430168576/TIbtpNHW_400x400.jpg",
  },
  {
    id: 78,
    name: "RubiFi",
    description: "The world's first democratized market making platform. Powered by $RUB, the most scarce and expensive asset in crypto",
    categories: ["Other"],
    status: "Live",
    website: "https://www.rub.finance/",
    tags: ["Other"],
    logo: "https://pbs.twimg.com/profile_images/1949681143214931969/VqiidYkV_400x400.jpg",
  },
  {
    id: 79,
    name: "Axal",
    description:
      "Earn more. Stablecoin savings accounts backed by a16zcrypto & CMT Digital.",
    categories: ["Yield"],
    status: "Live",
    website: "https://getaxal.com/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1952380370516901889/8LoFkKCm_400x400.jpg",
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
    description:
      "Purpose-built for stablecoin issuance Optimizing for UX",
    categories: ["CDP"],
    status: "Coming Soon",
    website: "https://www.noble.xyz/",
    tags: ["CDP"],
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
    categories: ["Lending", "CDP"],
    status: "Live",
    website: "https://app.keikofinance.com/#",
    tags: ["Lending", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1857058088391454720/NtVLHJ1C_400x400.jpg",
  },
  {
    id: 84,
    name: "HyperYield",
    description: "Lend, Borrow, Earn at Hyper Speed on HyperLiquid L1",
    categories: ["Lending"],
    status: "Live",
    website: "https://app.hyperyield.com/?invite=UlTQLGpKXhcq",
    tags: ["Lending", "Borrowing"],
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
    name: "Lootbase",
    description: "A mobile Hyperliquid client to trade perps and spot tokens.",
    categories: ["Wallet"],
    status: "Live",
    website: "https://share.lootbase.com/0xLcrgs",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1889744234451795968/zW1CoCnq_400x400.jpg",
  },
  {
    id: 87,
    name: "Wallet V",
    description: "Code: 16606 | We've built Wallet V to help you find, seize, and manage the best opportunities in the decentralized ecosystem.",
    categories: ["Wallet"],
    status: "Live",
    website: "https://walletv.io/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1918317063925342208/boA5iJjD_400x400.jpg",
  },
  {
    id: 88,
    name: "Liquid Terminal",
    description:
      "The terminal to house all Hyperliquid",
    categories: ["Trading Interface"],
    status: "Beta",
    website: "https://liquidterminal.xyz/?ref=HyperLcrgs",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1879551929799364608/io3_oOVD_400x400.jpg",
  },
  {
    id: 89,
    name: "GemsGun",
    description:
      "All-in-one HyperEVM trading platform. Data-driven, trader-focused, always ahead.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://gemsgun.com/hyper/discover?inviteCode=CrFqBpar",
    tags: ["Trading Interface"],
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
    logo: "https://pbs.twimg.com/profile_images/1936032053738283008/uqx8VCjX_400x400.jpg",
  },
  {
    id: 91,
    name: "Matcha",
    description:
      "The powerful onchain DEX aggregator built by 0x",
    categories: ["DEX"],
    status: "Live",
    website: "https://meta.matcha.xyz/?chainId=999&sellToken=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1936106079877844992/t_kZCRae_400x400.jpg",
  },
  {
    id: 92,
    name: "Kyber Network",
    description:
      "Swap crypto at the best rates with KyberSwap, the Multichain Aggregator available on 16 chains",
    categories: ["DEX"],
    status: "Live",
    website: "https://kyberswap.com/",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1641706567014940672/UFuWgdxn_400x400.jpg",
  },
  {
    id: 93,
    name: "Balancer",
    description: "The ultimate platform for custom liquidity solutions. Balancer v3 perfectly balances simplicity and flexibility to reshape the future of AMMs.",
    categories: ["DEX"],
    status: "Live",
    website: "https://balancer.fi/",
    tags: ["DEX", "CLAMM"],
    logo: "https://pbs.twimg.com/profile_images/1948110735919206400/k0A_9Gix_400x400.jpg",
  },
  {
    id: 94,
    name: "OpenOcean",
    description:
      "Swap and bridge any token directly in Hyperfolio, powered by OpenOcean",
    categories: ["DEX"],
    status: "Live",
    website: "https://app.hyperbeat.org/earn?referral=FA86003B",
    tags: ["DEX", "DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1875019671944196096/8JZgQUb0_400x400.jpg",
  },
  {
    id: 95,
    name: "RAMSES",
    description: "Ramses: Arbitrum's AMM hub with Uniswap v3 security, custom incentives, vote-lock governance, and user-friendly experience.",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.ramses.xyz/trade",
    tags: ["DEX", "ve(3,3)"],
    logo: "https://pbs.twimg.com/profile_images/1943503811496034304/mfgD8aKJ_400x400.jpg",
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
    logo: "https://pbs.twimg.com/profile_images/1888879617886531584/EqdazUob_400x400.jpg",
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
    logo: "https://pbs.twimg.com/profile_images/1891499635597856769/5BMo_JQJ_400x400.jpg",
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
    name: "WhiskerSwap",
    description:
      "WhiskerSwap DEX | Multi-route aggregation on EVM",
    categories: ["DEX"],
    status: "Live",
    website: "https://www.whiskerswap.xyz?ref=OEIMGE",
    tags: ["DEX Aggregator"],
    logo: "https://pbs.twimg.com/profile_images/1944320095502680064/kH6YXXrg_400x400.jpg",
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
    logo: "https://pbs.twimg.com/profile_images/1886903904874512384/wnRMhfef_400x400.jpg",
  },
  {
    id: 108,
    name: "alright botty",
    description:
      "Telegram bot by Alright buddy",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/alrightbottyhome_bot?start=ref_HTC4PZ4B",
    tags: ["Bot"],
    logo: "https://pbs.twimg.com/profile_images/1900497908559908864/JxOGs8pi_400x400.jpg",
  },
  {
    id: 109,
    name: "Apexliquid",
    description:
      " Trade & Copy Trade on Hyperliquid. Get 1,000+ Smart Wallets For Free. ",
    categories: ["Bot"],
    status: "Live",
    website: "https://t.me/Apexliquid_Bot?start=ref_J47G6V26",
    tags: ["Bot", "Tracker"],
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
    logo: "https://pbs.twimg.com/profile_images/1869558294702145536/-2u314ta_400x400.png",
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
    status: "Beta",
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
    categories: ["Wallet"],
    status: "Coming Soon",
    website: "https://aura.money/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1925571068175011841/NHhqyxMU_400x400.jpg",
  },
  {
    id: 115,
    name: "Hyperclash",
    description:
      "Assemble the sharpest Hyperliquid trader team and profit from their performance",
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
    categories: ["Trading Interface", "DEX", "Launchpad"],
    status: "Live",
    website: "https://trade.fun/",
    tags: ["Trading Interface", "DEX", "Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1923646981613744128/0jgndIU9_400x400.jpg",
  },
  {
    id: 117,
    name: "Allium",
    description: "Allium supports analytics, accounting, auditing, trading apps, degen use cases.",
    categories: ["Tools"],
    status: "Live",
    website: "https://hyperliquid.allium.so/",
    tags: ["Tools", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1778926940407132160/UEwR3lHt_400x400.jpg",
  },
  {
    id: 118,
    name: "Resolv Labs",
    description: "Trustless stablecoin and low-risk crypto investments backed by the True-Delta Neutral Architecture.",
    categories: ["CDP"],
    status: "Live",
    website: "https://resolv.xyz/",
    tags: ["CDP"],
    logo: "https://pbs.twimg.com/profile_images/1726501525843841024/1gDrgTdA_400x400.jpg",
  },
  {
    id: 119,
    name: "Relend Network",
    description:
      "rUSDC lets users mint and bridge USDC wrappers from Ethereum to other chains, enabling cross-chain lending and ecosystem incentives.",
    categories: ["Lending", "CDP"],
    status: "Live",
    website: "https://relend.network/",
    tags: ["Lending", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1838501262121209856/PrOhS3Kt_400x400.jpg",
  },
  {
    id: 120,
    name: "Rabby Wallet",
    description: "The game-changing wallet for Ethereum and all EVM chains.",
    categories: ["Wallet"],
    status: "Live",
    website: "https://rabby.io/points?code=0XLCRGS",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1414514212915748873/Grz0B2t2_400x400.jpg",
  },
  {
    id: 121,
    name: "Phantom",
    description: "Phantom is a friendly crypto wallet built for DeFi & NFTs on Solana, Bitcoin, Ethereum, Base, and Hyperliquid",
    categories: ["Wallet"],
    status: "Live",
    website: "https://phantom.com",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1675202638026252291/4StTDIF4_400x400.jpg",
  },
  {
    id: 122,
    name: "Zerion",
    description: "Trade any token on EVM & Solana | Zerion API is powering the best apps in crypto",
    categories: ["Wallet"],
    status: "Live",
    website: "https://link.zerion.io/referral?code=5ZJ0IK44Y",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1943619977342263296/cvmzbMP2_400x400.png",
  },
  {
    id: 123,
    name: "Brahma",
    description: "Brahma is the programmable execution layer for onchain and real-world capital.",
    categories: ["Trading Interface", "Wallet", "Tools"],
    status: "Live",
    website: "https://console.brahma.fi/onboarding?code=60B56EDE",
    tags: ["Trading Interface", "Wallet", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1732456585652240384/u1-fAC6J_400x400.jpg",
  },
  {
    id: 124,
    name: "Bitget Wallet",
    description: "Making Crypto for Everyone. Trade, earn, pay and discover Web3 with 80M users ",
    categories: ["Wallet"],
    status: "Live",
    website: "https://web3.bitget.com/en",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1925128816948883456/YTkbP_HA_400x400.jpg",
  },
  {
    id: 125,
    name: "ILLIQUID",
    description:
      "First liquid NFTs on Hyperliquid",
    categories: ["NFT"],
    status: "Live",
    website: "https://www.illiquidnft.io/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1915843266307616768/WuB9gv4Z_400x400.jpg",
  },
  {
    id: 126,
    name: "Hypio",
    description:
      "Wealthy Hypio Babies is a Remiliasphere-born NFT brand in Hyperliquid, aiming to educate and unite HL members into a strong community.",
    categories: ["NFT"],
    status: "Live",
    website: "https://drip.trade/collections/hypio",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1876004126938537984/qpRkjcAX_400x400.jpg",
  },
  {
    id: 127,
    name: "PiP",
    description:
      "PiP is a community celebrating creativity, resilience, and connection, proving that even the tiniest droplet can create waves of positive change.",
    categories: ["NFT"],
    status: "Live",
    website: "https://piponhl.xyz/",
    tags: ["NFT"],
    logo: "https://pbs.twimg.com/profile_images/1855964438337077248/IbcL6SH7_400x400.jpg",
  },
  {
    id: 128,
    name: "HLP0",
    description:
      "Deposited USDC goes into the Hyperliquidity Provider vault; users get HLP0 tokens, usable for lending or farming to earn extra yield",
    categories: ["Yield"],
    status: "Live",
    website: "https://www.hlp0.to/",
    tags: ["Yield"],
    logo: "https://pbs.twimg.com/profile_images/1935447291256782850/4h6gF51x_400x400.jpg",
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
    website: "https://hyperdash.info/",
    tags: ["Tools", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1856411250848088064/mG5ufCD6_400x400.jpg",
  },
  {
    id: 132,
    name: "Defi App",
    description: "Combining the magic of CeFi and DeFi in the world's first decentralized Superapp ",
    categories: ["Trading Interface", "DEX"],
    status: "Live",
    website: "https://app.defi.app/join/8fYUku",
    tags: ["Trading Interface", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1807464255249334272/CKuGD7ZW_400x400.jpg",
  },
  {
    id: 133,
    name: "Axiom",
    description: "The ONLY Trading Platform You'll Ever Need. Memes, Perps, Yield, All-In-One.",
    categories: ["Trading Interface", "DEX"],
    status: "Live",
    website: "https://axiom.trade/@0xlcrgs",
    tags: ["Trading Interface", "DEX"],
    logo: "https://pbs.twimg.com/profile_images/1884809179174760448/Zn1mS8ip_400x400.jpg",
  },
  {
    id: 134,
    name: "Glider",
    description:
      "Glider is a non-custodial SaaS platform for building, testing, and automating crypto trading portfolios across multiple blockchains / 9l7wb5",
    categories: ["Trading Interface", "Tools"],
    status: "Beta",
    website: "https://glider.fi/?invite=qspnqxsx",
    tags: ["Trading Interface", "Bot", "Wallet", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1907062271366647808/B5WCwf_W_400x400.jpg",
  },
  {
    id: 135,
    name: "Pear Protocol",
    description:
      "Pear Protocol streamlines leveraged crypto pair trading in one on-chain transaction, improving efficiency and risk management.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://pear.garden/trade?referral=0xLcrgs",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1615784760328192001/kFS3qLV5_400x400.jpg",
  },
  {
    id: 136,
    name: "Maple",
    description:
      "Asset management, onchain.",
    categories: ["Lending", "Yield"],
    status: "Live",
    website: "https://maple.finance/",
    tags: ["Lending", "Borrowing", "Yield"],
    logo: "https://pbs.twimg.com/profile_images/1925123677982523392/QN6KuMnz_400x400.jpg",
  },
  {
    id: 137,
    name: "WhyNotHigher",
    description:
      "Probably a DEX aggregator like Odos Protocol",
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
    categories: ["Wallet"],
    status: "Live",
    website: "https://www.tp.xyz/",
    tags: ["Wallet"],
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
    categories: ["Wallet"],
    status: "Live",
    website: "https://t.me/pocketprotectorbot?start=r-xLcrgs",
    tags: ["Wallet"],
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
    categories: ["Tools"],
    status: "Live",
    website: "https://app.rumpel.xyz/?ref=Q6CZBF",
    tags: ["Tools"],
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
    categories: ["Trading Interface", "Bot"],
    status: "Live",
    website: "https://topdog.gg/referrals",
    tags: ["Trading Interface", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1908001097299668994/UFJRO94o_400x400.jpg",
  },
  {
    id: 148,
    name: "Reactor",
    description:
      "Full crypto trading stack. Unmatched control and speed on-chain. Built for those who move fast.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://app.reactor.trade/dashboard?ref=OM56BHEN",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1926951271736459264/BQOdQmqr_400x400.jpg",
  },
  {
    id: 149,
    name: "Cypher",
    description: "Cypher Wallet is a Multi-Chain, Non-Custodial Crypto Wallet supporting 12+ EVM + Cosmos chains .",
    categories: ["Wallet"],
    status: "Live",
    website: "https://cypherhq.io/card/?ref=0XLCRGS",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1931280880187924480/4qk4HevF_400x400.jpg",
  },
  {
    id: 150,
    name: "Overdraft",
    description:
      "The Fiat DEX. Swap fiat - crypto in seconds. No custody. No fees. No fund freeze.",
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
    tags: ["Tools", "Tracker"],
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
    categories: ["Tools"],
    status: "Live",
    website: "https://data.asxn.xyz/",
    tags: ["Tools"],
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
    tags: ["Lending", "Borrowing"],
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
    description:
      "The trusted crypto platform for innovators and investors.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://www.anchorage.com/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1597615022133354499/jJsLNXTH_400x400.png",
  },
  {
    id: 162,
    name: "ddot",
    description:
      "24/7 decentralized derivatives on everything that matters | built on Hyperliquid",
    categories: ["Trading Interface"],
    status: "Coming Soon",
    website: "https://hypermercantile.gitbook.io/docs",
    tags: ["Trading Interface"],
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
    logo: "https://pbs.twimg.com/profile_images/1896595609739554817/SWGQKBSK_400x400.png",
  },
  {
    id: 166,
    name: "Nunchi",
    description: "Long or Short Any Yield. Perpetuals for Yield.",
    categories: ["Options"],
    status: "Coming Soon",
    website: "https://nunchi.trade/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1917606843867631616/KuF5WlVE_400x400.png",
  },
  {
    id: 167,
    name: "Okto",
    description: "Hyperliquid Core and HyperEVM integrated mobile wallet",
    categories: ["Wallet"],
    status: "Live",
    website: "https://okto.go.link/defi_home?referral_code=ZkJLD5&adj_t=13c5o7y4",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1930522800776683520/5ScNp0VE_400x400.png",
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
    categories: ["Tools"],
    status: "Live",
    website: "https://hyperscan.fun/",
    tags: ["Tools"],
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
    description:
      "Community owned AI Launchpad coming soon on HyperEVM",
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
    categories: ["Tools"],
    status: "Live",
    website: "https://www.hypeburn.fun/",
    tags: ["Tools"],
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
    description: "Fork of Blockscout. With custom indexing, components, widgets, and APIs built specifically for the HyperLiquid ecosystem.",
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
    categories: ["Tools"],
    status: "Live",
    website: "https://app.nansen.ai/ref?GeahssNV0Zd",
    tags: ["Tools", "Block Explorer", "Tracker"],
    logo: "https://pbs.twimg.com/profile_images/1944565431345274880/H0RnzeKM_400x400.jpg",
  },
  {
    id: 179,
    name: "Awaken",
    description: "Crypto taxes for crypto natives",
    categories: ["Tools"],
    status: "Live",
    website: "https://awaken.tax?ref=wiidqu-i",
    tags: ["Tools", "Taxes"],
    logo: "https://pbs.twimg.com/profile_images/1943878626153250816/eSbgoWBp_400x400.jpg",
  },
  {
    id: 180,
    name: "Lighthouse.one",
    description: "All your crypto and fiat assets in one, private portfolio manager.",
    categories: ["Trading Interface", "Tools"],
    status: "Live",
    website: "https://lighthouse.one/",
    tags: ["Trading Interface", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1850925548471480320/L-vU3YZs_400x400.png",
  },
  {
    id: 181,
    name: "Cerebro",
    description: "Manage all your crypto assets and leverage AI to unlock better performance",
    categories: ["Trading Interface", "Wallet", "Tools"],
    status: "Live",
    website: "https://cerebro.xyz/sign-up?code=038BEFD1",
    tags: ["Trading Interface", "Wallet", "Tools"],
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
    categories: ["Trading Interface", "Tools"],
    status: "Live",
    website: "https://app.definitive.fi/r/UJSTNJ7Q",
    tags: ["Trading Interface", "Bot", "Wallet", "Tools"],
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
    categories: ["Tools"],
    status: "Live",
    website: "https://hypeflows.com/",
    tags: ["Tools"],
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
    logo: "https://pbs.twimg.com/profile_images/1546487688601096192/QoG0ZVgH_400x400.jpg",
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
    logo: "https://pbs.twimg.com/profile_images/1935108055253045249/oURn2S-f_400x400.jpg",
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
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://www.lit.trade/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1935211746077130752/L6rIVkC0_400x400.jpg",
  },
  {
    id: 198,
    name: "Alchemy",
    description:
      "Your complete developer platform to build rollups, apps & everything in between.",
    categories: ["Tools"],
    status: "Live",
    website: "https://www.alchemy.com/",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1947425842738384896/eDE44AUv_400x400.jpg",
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
    categories: ["Trading Interface", "DEX", "Launchpad"],
    status: "Live",
    website: "https://mintify.xyz/",
    tags: ["Trading Interface", "DEX", "Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1925172682145816576/GzyVvnUw_400x400.jpg",
  },
  {
    id: 201,
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
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://www.app.rage.trade/",
    tags: ["Trading Interface"],
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
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://app.vooi.io/r/3DW6DRN",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1938271243876155393/fXAC9P_h_400x400.jpg",
  },
  {
    id: 208,
    name: "Polaris",
    description: "Trade all tokens, across all chains — with Polaris, the Token Portal. Now live in beta.",
    categories: ["Trading Interface", "DEX", "Bridge"],
    status: "Live",
    website: "https://polaris.app/",
    tags: ["Trading Interface", "DEX", "Bridge"],
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
    categories: ["Trading Interface", "DEX", "Bridge"],
    status: "Live",
    website: "https://www.gun.fun/",
    tags: ["Trading Interface", "DEX", "Bridge"],
    logo: "https://pbs.twimg.com/profile_images/1947345653862174720/XQdkjfd5_400x400.jpg",
  },
  {
    id: 211,
    name: "EzPairs",
    description: "A pair trading platform that allows users to trade custom weighted pairs with x3 leverage.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://www.ezpairs.xyz/trade",
    tags: ["Trading Interface"],
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
    logo: "https://pbs.twimg.com/profile_images/1889417046401708032/34ziuAPb_400x400.jpg",
  },
  {
    id: 213,
    name: "Mass",
    description: "Mass is your gateway to interacting with multiple networks and financial services built atop the blockchain, also known as DeFi",
    categories: ["Trading Interface", "Wallet"],
    status: "Live",
    website: "https://download.mass.money/ref/SBQqlVQ2NdiV2nJfEkwnEYegIdy",
    tags: ["Trading Interface", "Wallet"],
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
    tags: ["Yield", "Vaults"],
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
    description:
      "The fastest and safest multi-chain trading terminal & Screener.",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://www.defined.fi/tokens/discover?network=hyperevm",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1395427369662390272/JiHWxi6M_400x400.png",
  },
  {
    id: 217,
    name: "Copin",
    description:
      "The leading on-chain data & signal platform for perpetual trading.",
    categories: ["Trading Interface", "Bot"],
    status: "Live",
    website: "https://copin.io/",
    tags: ["Trading Interface", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1721363454655893504/Sw4ZJHSl_400x400.jpg",
  },
  {
    id: 218,
    name: "Avy",
    description:
      "Avy is a swipe-to-trade app for perps — built for everyone, powered by Hyperliquid, and optimized for the mobile-native generation.",
    categories: ["Wallet"],
    status: "Beta",
    website: "https://www.avy.xyz/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1919063597541359616/IUDHSV1I_400x400.jpg",
  },
  {
    id: 219,
    name: "Hypersig",
    description:
      "The Hypercore-based multisig platform for power users",
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
    description:
      "Check any crypto wallet for unclaimed airdrops, get Telegram alerts on eligibility!",
    categories: ["Tools"],
    status: "Live",
    website: "https://drops.bot/?r=35gnSMWb60",
    tags: ["Tools"],
    logo: "https://pbs.twimg.com/profile_images/1946435701286817792/ztlFUyHI_400x400.jpg",
  },
  {
    id: 222,
    name: "Outcome",
    description:
      "The first prediction market on Hyperliquid.",
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
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://xtrade.gg/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1934996277844115456/cgCzC4wx_400x400.jpg",
  },
  {
    id: 224,
    name: "Kinto",
    description: "The Modular Exchange. Powered by Arbitrum",
    categories: ["Trading Interface", "Wallet"],
    status: "Live",
    website: "https://engen.kinto.xyz/onboarding?ref=d9738",
    tags: ["Trading Interface", "Wallet"],
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
    description: "Everything you need to access, explore, and thrive in the decentralised internet. Powered by Vision (VSN)",
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
    categories: ["Tools", "Bridge", "On-Ramp"],
    status: "Beta",
    website: "https://gateway.hana.network/",
    tags: ["Tools", "Bridge", "On-Ramp"],
    logo: "https://pbs.twimg.com/profile_images/1826923623556562944/LhUmaR37_400x400.jpg",
  },
  {
    id: 228,
    name: "HyperPNL",
    description:
      "Decentralized prop trading on HyperEVM solves trust and transparency issues of centralized trading firms.",
    categories: ["Trading Interface"],
    status: "Coming Soon",
    website: "https://hyperpnl.com/",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1903102046204841984/aF3OnjeP_400x400.jpg",
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
    categories: ["Trading Interface", "Tools"],
    status: "Beta",
    website: "https://hyperterminal.xyz/",
    tags: ["Trading Interface", "Tools", "Bot"],
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
    logo: "https://pbs.twimg.com/profile_images/1897644409237512192/yJQptpdA_400x400.jpg",
  },
  {
    id: 234,
    name: "optfun",
    description:
      "opt.fun is 1 minute expiry options platform on Hyperliquid offering fast and fun high volatility trading.",
    categories: ["Options"],
    status: "Live",
    website: "https://opt.fun/",
    tags: ["Options"],
    logo: "https://pbs.twimg.com/profile_images/1927855901966487555/06SWyR9P_400x400.png",
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
    description:
      "Meme. Mint. Moon. Hyperliquid's Token Launch Platform for memecoins",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://hypermoon.fun/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1931777052270604289/ju1nkE_R_400x400.png",
  },
  {
    id: 240,
    name: "manadotwin",
    description:
      "Hyperliquid-native launch + trading platform that neutralizes snipers, bundlers, bots and rugs.",
    categories: ["Launchpad", "Trading Interface"],
    status: "Live",
    website: "https://mana.win/app/",
    tags: ["Launchpad", "Trading Interface"],
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
    logo: "https://pbs.twimg.com/profile_images/1910288827312222208/9lDmAhjF_400x400.jpg",
  },
  {
    id: 242,
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
    id: 243,
    name: "Brotocol",
    description: "Bringing DeFi to Bitcoin via enabling Swaps, Bridge and Payment directly on the $BTC network—20+ chains + Best rate guaranteed!",
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
    name: "Katōshi",
    description:
      "Katōshi lets traders build and deploy secure, advanced trading bots on Hyperliquid, with TradingView integration and pro-grade API.",
    categories: ["Trading Interface", "Bot"],
    status: "Live",
    website: "https://katoshi.ai/",
    tags: ["Trading Interface", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1864361726663122944/fm-qO0Nl_400x400.jpg",
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
    description:
      "Your multichain memecoin solution",
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
    categories: ["Wallet"],
    status: "Live",
    website: "https://gemwallet.com/",
    tags: ["Wallet"],
    logo: "https://pbs.twimg.com/profile_images/1943936806472339456/5qUKXerv_400x400.jpg",
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
    categories: ["Lending"],
    status: "Coming Soon",
    website: "https://lambda.finance/",
    tags: ["Lending", "CDP"],
    logo: "https://pbs.twimg.com/profile_images/1709109269604511744/vXoBoSl1_400x400.jpg",
  },
  {
    id: 253,
    name: "Chainpro",
    description: "Advanced onchain trading terminal across multiple ecosystems",
    categories: ["Trading Interface"],
    status: "Live",
    website: "https://chainpro.xyz/#0xlcrgs",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1937986278164680704/Pwmo6Yrn_400x400.jpg",
  },
  {
    id: 254,
    name: "Fractrade",
    description:
      "Fractrade lets you create AI trading agents for Hyperliquid, offering risk management, copy trading, and automated strategies",
    categories: ["Trading Interface", "Bot"],
    status: "Live",
    website: "http://alpha.fractrade.xyz/accounts/signup?invite_code=UI58BY",
    tags: ["Trading Interface", "Bot"],
    logo: "https://pbs.twimg.com/profile_images/1879105001366196224/QhBDglZB_400x400.jpg",
  },
  {
    id: 255,
    name: "Altitude",
    description: "The next-gen trading experience is here. Get access to our full range blockchain infrastructure.",
    categories: ["Trading Interface"],
    status: "Beta",
    website: "https://www.reachaltitude.xyz/waitlist?ref=JAZZ2H7VV4",
    tags: ["Trading Interface"],
    logo: "https://pbs.twimg.com/profile_images/1916798556809437184/CBPWnZgk_400x400.jpg",
  },
  {
    id: 256,
    name: "Hypervisor",
    description: "Hyperliquid focused data analytics/trading platform with fully customizable dashboards",
    categories: ["Trading Interface", "Tools"],
    status: "Beta",
    website: "https://hypervisor.gg/",
    tags: ["Trading Interface", "Tools", "Bot"],
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
    categories: ["Tools"],
    status: "Live",
    website: "https://hyperstats.xyz/",
    tags: ["Tools", "Tracker"],
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
    logo: "https://pbs.twimg.com/profile_images/1900171367594811392/wjjyhLF1_400x400.jpg",
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
    tags: ["Bot", "AI"],
    logo: "https://pbs.twimg.com/profile_images/1905002465117843456/yQmiCqaT_400x400.jpg",
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
    description: "Onchain game studio & technology company, building Pirate Nation and the composable infrastructure it runs on.",
    categories: ["Gaming"],
    status: "Live",
    website: "https://proofofplay.com/",
    tags: ["Gaming"],
    logo: "https://pbs.twimg.com/profile_images/1672340678310006784/9mkrtmGp_400x400.png",
  },
  {
    id: 268,
    name: "Evoq Finance",
    description:
      "A P2P-based lending optimizer",
    categories: ["Lending", "Yield", "Tools"],
    status: "Coming Soon",
    website: "https://app.evoq.finance/?referralCode=2Dn0SQra",
    tags: ["Lending", "Yield", "Tools"],
    logo: "https://pbs.twimg.com/profile_images/1870006305014067200/RUidb_w7_400x400.jpg",
  },
  {
    id: 269,
    name: "circle",
    description:
      "socialFi on hyperliquid",
    categories: ["SocialFi"],
    status: "Coming Soon",
    website: "https://docs.hypercircle.app/",
    tags: ["SocialFi"],
    logo: "https://pbs.twimg.com/profile_images/1946639933688451073/cVRsBwh9_400x400.jpg",
  },
  {
    id: 270,
    name: "Jigsaw",
    description:
      "The missing piece of DeFi ",
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
    description: "Hyper-Intelligent Launch Engine. Dual Mode: On-chain and RNG Unified Flywheel. Built on Hyperliquid and LayerZero",
    categories: ["Launchpad"],
    status: "Live",
    website: "https://mindshare.catapult.trade/",
    tags: ["Launchpad"],
    logo: "https://pbs.twimg.com/profile_images/1937804921388015616/TIfDZ8Sv_400x400.jpg",
  },
]

const defiLlamaSlugs: { [key: string]: string } = {
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
}

const categories = [
  "All",
  "DEX",
  "Bridge",
  "Lending",
  "Yield",
  "Delta-neutral",
  "CDP",
  "LST",
  "Launchpad",
  "Wallet",
  "NFT",
  "Tools",
  "Trading Interface",
  "Bot",
  "Options",
  "SocialFi",
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
  | "CDP"
  | "LST"
  | "Launchpad"
  | "Wallet"
  | "NFT"
  | "Tools"
  | "Trading Interface"
  | "Bot"
  | "Options"
  | "SocialFi"
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
            <CardTitle className="text-white text-base sm:text-lg lg:text-xl truncate">
              {project.name}
            </CardTitle>
          </div>
        </div>
        <StatusBadge status={project.status} />
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

  const [selectedCategory, setSelectedCategory] = useState<Category>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [projectData, setProjectData] = useState<Project[]>(projects)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const urlSearch = searchParams.get("search")
    const urlCategory = searchParams.get("category") as Category | null
    if (urlSearch) setSearchQuery(urlSearch)
    if (urlCategory && categories.includes(urlCategory)) setSelectedCategory(urlCategory)
  }, [searchParams])

  const updateURL = (newSearch: string, newCategory: Category) => {
    const params = new URLSearchParams()
    if (newSearch) params.set("search", newSearch)
    if (newCategory && newCategory !== "All") params.set("category", newCategory)
    const queryString = params.toString()
    const newURL = queryString ? `/?${queryString}` : "/"
    router.push(newURL, { scroll: false })
  }

  const handleChange = (type: "search" | "category", value: string) => {
    if (type === "search") {
      setSearchQuery(value)
      updateURL(value, selectedCategory)
    } else {
      setSelectedCategory(value as Category)
      updateURL(searchQuery, value as Category)
      setMobileMenuOpen(false)
    }
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
        })
      )
      setProjectData(updatedProjects)
      setLoading(false)
    }
    fetchTVL()
  }, [])

  const filteredProjects = Array.from(
    new Map(
      projectData
        .filter((project) => {
          const matchesCategory = selectedCategory === "All" || project.categories.includes(selectedCategory)
          const matchesSearch =
            (project.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.tags || []).some((tag) => (tag || "").toLowerCase().includes(searchQuery.toLowerCase()))
          return matchesCategory && matchesSearch
        })
        .map((project) => [project.id, project])
    ).values()
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Video */}
      <video
        preload="auto"
        loop
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="https://video.twimg.com/amplify_video/1927005004382023680/vid/avc1/1280x720/nSPI-O-2ZZ69rCqB.mp4?tag=14"
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
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-2">
                <Link href="https://farming-portal.vercel.app/">Non-Hyperliquid Farms</Link>
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2">
                <Link href="https://app.hyperliquid.xyz/join/0XLCRGS">Join Hyperliquid</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2">
                <Link href="https://x.com/intent/follow?screen_name=HyperLcrgs">Follow X</Link>
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Link href="https://give-me-a-tip.vercel.app/"><span>☕</span> Buy me a coffee</Link>
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
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm w-full">
                  <Link href="https://farming-portal.vercel.app/">Non-Hyperliquid Farms</Link>
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white text-sm w-full">
                  <Link href="https://app.hyperliquid.xyz/join/0XLCRGS">Join Hyperliquid</Link>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm w-full">
                  <Link href="https://x.com/intent/follow?screen_name=HyperLcrgs">Follow X</Link>
                </Button>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Link href="https://give-me-a-tip.vercel.app/"><span>☕</span> Buy me a coffee</Link>
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
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto sm:mx-0">
              Explore the growing ecosystem of projects building on HyperEVM. Learn about each project, their features,
              and how to get involved.
            </p>
          </div>
          {/* Search and Filters */}
          <div className="mb-6 sm:mb-8 space-y-4 flex flex-col items-center">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => handleChange("search", e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 w-full"
              />
            </div>
            {/* Category Tabs */}
            <div className="w-full overflow-x-auto">
              <Tabs value={selectedCategory} onValueChange={(v) => handleChange("category", v)}>
                <TabsList className="bg-gray-900 border-gray-700 flex-nowrap min-w-max mx-auto">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="data-[state=active]:bg-white data-[state=active]:text-black whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3"
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
