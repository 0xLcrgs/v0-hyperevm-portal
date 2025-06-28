'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, ExternalLink, Github, Globe, Star, Users, TrendingUp, Filter, X, Menu, ChevronDown } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

// Enhanced project data with more comprehensive information
const projects = [
  {
    id: 1,
    name: 'HyperSwap',
    description: 'Advanced decentralized exchange with automated market making and cross-chain capabilities',
    category: 'DeFi',
    tags: ['DEX', 'AMM', 'Cross-chain', 'Liquidity'],
    website: 'https://hyperswap.example.com',
    github: 'https://github.com/hyperswap',
    tvl: '$2.5M',
    users: '15.2K',
    growth: '+45%',
    status: 'Live',
    featured: true,
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'HyperLend',
    description: 'Decentralized lending protocol with dynamic interest rates and collateral management',
    category: 'DeFi',
    tags: ['Lending', 'Borrowing', 'Yield', 'Collateral'],
    website: 'https://hyperlend.example.com',
    github: 'https://github.com/hyperlend',
    tvl: '$1.8M',
    users: '8.7K',
    growth: '+32%',
    status: 'Live',
    featured: true,
    image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'HyperNFT',
    description: 'Next-generation NFT marketplace with advanced trading features and creator tools',
    category: 'NFT',
    tags: ['Marketplace', 'Trading', 'Creator Tools', 'Royalties'],
    website: 'https://hypernft.example.com',
    github: 'https://github.com/hypernft',
    tvl: '$950K',
    users: '12.3K',
    growth: '+67%',
    status: 'Live',
    featured: false,
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'HyperBridge',
    description: 'Secure cross-chain bridge enabling seamless asset transfers between networks',
    category: 'Infrastructure',
    tags: ['Bridge', 'Cross-chain', 'Security', 'Interoperability'],
    website: 'https://hyperbridge.example.com',
    github: 'https://github.com/hyperbridge',
    tvl: '$3.2M',
    users: '6.1K',
    growth: '+28%',
    status: 'Live',
    featured: true,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'HyperDAO',
    description: 'Decentralized governance platform with advanced voting mechanisms and proposal management',
    category: 'Governance',
    tags: ['DAO', 'Voting', 'Governance', 'Proposals'],
    website: 'https://hyperdao.example.com',
    github: 'https://github.com/hyperdao',
    tvl: '$1.1M',
    users: '4.8K',
    growth: '+19%',
    status: 'Beta',
    featured: false,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'HyperAnalytics',
    description: 'Comprehensive blockchain analytics and data visualization platform for DeFi protocols',
    category: 'Analytics',
    tags: ['Analytics', 'Data', 'Visualization', 'DeFi'],
    website: 'https://hyperanalytics.example.com',
    github: 'https://github.com/hyperanalytics',
    tvl: '$650K',
    users: '9.2K',
    growth: '+54%',
    status: 'Live',
    featured: false,
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  }
]

const categories = ['All', 'DeFi', 'NFT', 'Infrastructure', 'Governance', 'Analytics']
const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'tvl', label: 'TVL' },
  { value: 'users', label: 'Users' },
  { value: 'growth', label: 'Growth' }
]

export default function EcosystemPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Memoized filtered and sorted projects for performance
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'tvl':
          return parseFloat(b.tvl.replace(/[$MK]/g, '')) - parseFloat(a.tvl.replace(/[$MK]/g, ''))
        case 'users':
          return parseFloat(b.users.replace(/[K]/g, '')) - parseFloat(a.users.replace(/[K]/g, ''))
        case 'growth':
          return parseFloat(b.growth.replace(/[+%]/g, '')) - parseFloat(a.growth.replace(/[+%]/g, ''))
        default:
          return a.name.localeCompare(b.name)
      }
    })
  }, [searchTerm, selectedCategory, sortBy])

  const featuredProjects = projects.filter(project => project.featured)

  const ProjectCard = ({ project, featured = false }) => (
    <Card className={`group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${featured ? 'border-green-200 bg-gradient-to-br from-green-50 to-white' : ''}`}>
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant={project.status === 'Live' ? 'default' : 'secondary'} className="text-xs">
            {project.status}
          </Badge>
          {featured && <Badge className="bg-green-500 text-white text-xs">Featured</Badge>}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg sm:text-xl font-bold line-clamp-1">{project.name}</CardTitle>
          <Badge variant="outline" className="text-xs whitespace-nowrap">{project.category}</Badge>
        </div>
        <CardDescription className="text-sm line-clamp-2 sm:line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">TVL</div>
            <div className="font-semibold text-sm">{project.tvl}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Users</div>
            <div className="font-semibold text-sm">{project.users}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Growth</div>
            <div className="font-semibold text-sm text-green-600">{project.growth}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1" asChild>
            <a href={project.website} target="_blank" rel="noopener noreferrer">
              <Globe className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Visit</span>
              <span className="sm:hidden">Site</span>
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-3 h-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const FilterSection = () => (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search projects, tags, or descriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(searchTerm || selectedCategory !== 'All') && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('All')
            }}
            className="w-full sm:w-auto"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://hyperfoundation.org/landing/blob_green.gif" 
                alt="HyperEVM" 
                className="w-8 h-8 sm:w-10 sm:h-10"
                loading="eager"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  HyperEVM Portal
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Discover the growing ecosystem
                </p>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            {isMobile && (
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-1" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-auto">
                  <div className="py-4">
                    <h3 className="text-lg font-semibold mb-4">Filters & Search</h3>
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Desktop Filters */}
        {!isMobile && (
          <div className="mb-8">
            <FilterSection />
          </div>
        )}

        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="featured" className="text-sm">Featured</TabsTrigger>
            <TabsTrigger value="all" className="text-sm">All Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the most innovative and successful projects in the HyperEVM ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">All Projects</h2>
                <p className="text-muted-foreground">
                  {filteredAndSortedProjects.length} project{filteredAndSortedProjects.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            {filteredAndSortedProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredAndSortedProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Stats Section */}
        <section className="mt-12 sm:mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Ecosystem Stats</h2>
            <p className="text-muted-foreground">Real-time metrics from the HyperEVM ecosystem</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="text-center p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                {projects.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </Card>
            
            <Card className="text-center p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                $10.2M
              </div>
              <div className="text-sm text-muted-foreground">Total TVL</div>
            </Card>
            
            <Card className="text-center p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
                56.3K
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </Card>
            
            <Card className="text-center p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">
                +41%
              </div>
              <div className="text-sm text-muted-foreground">Avg Growth</div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16 sm:mt-20">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img 
                  src="https://hyperfoundation.org/landing/blob_green.gif" 
                  alt="HyperEVM" 
                  className="w-6 h-6"
                />
                <span className="font-bold">HyperEVM Portal</span>
              </div>
              <p className="text-sm text-slate-300">
                Discover and explore the growing ecosystem of projects building on HyperEVM.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Resources</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Developer Guide</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">API Reference</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Community</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Discord</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Bug Reports</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-400">
            <p>&copy; 2024 HyperEVM Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}