'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, ExternalLink, Github, Globe, Menu, X } from 'lucide-react'
import Image from 'next/image'

// Enhanced project data with more comprehensive information
const projects = [
  {
    id: 1,
    name: "HyperSwap",
    description: "Advanced decentralized exchange protocol with automated market making and cross-chain capabilities for seamless token swapping.",
    category: "DeFi",
    status: "Live",
    tvl: "$2.5M",
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400",
    website: "https://hyperswap.example.com",
    github: "https://github.com/hyperswap",
    tags: ["AMM", "Cross-chain", "Yield Farming"]
  },
  {
    id: 2,
    name: "HyperLend",
    description: "Innovative lending and borrowing platform with dynamic interest rates and collateral optimization for maximum capital efficiency.",
    category: "DeFi",
    status: "Beta",
    tvl: "$1.8M",
    image: "https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=400",
    website: "https://hyperlend.example.com",
    github: "https://github.com/hyperlend",
    tags: ["Lending", "Borrowing", "Yield"]
  },
  {
    id: 3,
    name: "HyperNFT",
    description: "Next-generation NFT marketplace with advanced trading features, royalty management, and creator monetization tools.",
    category: "NFT",
    status: "Live",
    tvl: "$950K",
    image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400",
    website: "https://hypernft.example.com",
    github: "https://github.com/hypernft",
    tags: ["Marketplace", "Royalties", "Creator Tools"]
  },
  {
    id: 4,
    name: "HyperBridge",
    description: "Secure and efficient cross-chain bridge enabling seamless asset transfers between multiple blockchain networks.",
    category: "Infrastructure",
    status: "Live",
    tvl: "$3.2M",
    image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400",
    website: "https://hyperbridge.example.com",
    github: "https://github.com/hyperbridge",
    tags: ["Bridge", "Cross-chain", "Security"]
  },
  {
    id: 5,
    name: "HyperDAO",
    description: "Comprehensive governance platform with advanced voting mechanisms, proposal management, and community engagement tools.",
    category: "Governance",
    status: "Beta",
    tvl: "$1.1M",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    website: "https://hyperdao.example.com",
    github: "https://github.com/hyperdao",
    tags: ["Governance", "Voting", "Community"]
  },
  {
    id: 6,
    name: "HyperStake",
    description: "Advanced staking protocol with flexible lock periods, compound rewards, and validator delegation for optimal returns.",
    category: "DeFi",
    status: "Live",
    tvl: "$4.7M",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400",
    website: "https://hyperstake.example.com",
    github: "https://github.com/hyperstake",
    tags: ["Staking", "Rewards", "Validators"]
  },
  {
    id: 7,
    name: "HyperAnalytics",
    description: "Real-time blockchain analytics and data visualization platform providing insights into network activity and trends.",
    category: "Analytics",
    status: "Live",
    tvl: "N/A",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
    website: "https://hyperanalytics.example.com",
    github: "https://github.com/hyperanalytics",
    tags: ["Analytics", "Data", "Visualization"]
  },
  {
    id: 8,
    name: "HyperWallet",
    description: "Multi-chain wallet with enhanced security features, DApp integration, and seamless user experience across devices.",
    category: "Wallet",
    status: "Beta",
    tvl: "N/A",
    image: "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=400",
    website: "https://hyperwallet.example.com",
    github: "https://github.com/hyperwallet",
    tags: ["Wallet", "Multi-chain", "Security"]
  }
]

const categories = ["All", "DeFi", "NFT", "Infrastructure", "Governance", "Analytics", "Wallet"]
const statuses = ["All", "Live", "Beta", "Coming Soon"]

export default function EcosystemPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Memoized filtered and sorted projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
      const matchesStatus = selectedStatus === "All" || project.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, selectedCategory, selectedStatus])

  const handleClearFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSelectedStatus("All")
  }, [])

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "Live": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Beta": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Coming Soon": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }, [])

  const FilterControls = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search projects, descriptions, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-10 sm:h-11"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-10 sm:h-11">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Status</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="h-10 sm:h-11">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {(searchTerm || selectedCategory !== "All" || selectedStatus !== "All") && (
        <Button 
          variant="outline" 
          onClick={handleClearFilters}
          className="w-full h-10 sm:h-11"
        >
          Clear Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <Image
                  src="https://hyperfoundation.org/landing/blob_green.gif"
                  alt="HyperEVM Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg"
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HyperEVM Portal
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Explore the growing ecosystem
                </p>
              </div>
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Open filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <SheetHeader>
                  <SheetTitle>Filter Projects</SheetTitle>
                  <SheetDescription>
                    Find projects by category, status, or search terms
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterControls />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h2>
                <FilterControls />
              </div>
              
              {/* Stats Card */}
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Ecosystem Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Projects</span>
                    <span className="font-semibold">{projects.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Live Projects</span>
                    <span className="font-semibold">{projects.filter(p => p.status === "Live").length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total TVL</span>
                    <span className="font-semibold">$14.3M</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3">
                Discover Projects
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                Explore the innovative projects building on HyperEVM. From DeFi protocols to NFT marketplaces, 
                discover the future of decentralized applications.
              </p>
            </div>

            {/* Results Summary */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
              {filteredProjects.length === 0 && (
                <Button variant="outline" onClick={handleClearFilters} size="sm">
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border/50 hover:border-border overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={400}
                        height={200}
                        className="w-full h-40 sm:h-44 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <CardHeader className="p-4 sm:p-5 lg:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg sm:text-xl font-bold text-foreground line-clamp-1">
                            {project.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs font-medium">
                              {project.category}
                            </Badge>
                            <Badge className={`text-xs font-medium ${getStatusColor(project.status)}`}>
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <CardDescription className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {project.description}
                      </CardDescription>
                      
                      {project.tvl !== "N/A" && (
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                          <span className="text-xs text-muted-foreground">Total Value Locked</span>
                          <span className="text-sm font-semibold text-foreground">{project.tvl}</span>
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent className="p-4 sm:p-5 lg:p-6 pt-0">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="text-xs px-2 py-1 bg-muted/50 hover:bg-muted transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 h-9 text-xs font-medium"
                            asChild
                          >
                            <a href={project.website} target="_blank" rel="noopener noreferrer">
                              <Globe className="w-3.5 h-3.5 mr-1.5" />
                              Visit
                            </a>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-9 px-3"
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3.5 h-3.5" />
                              <span className="sr-only">GitHub</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16 lg:py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-muted rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    No projects found
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}