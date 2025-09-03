'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

// Custom Automation Systems Service Page
export default function CustomAutomationSystemsPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initialize page animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    // Initialize GSAP animations using established patterns
    const initializeAnimations = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        // Show static content immediately
        gsap.set('.animate-on-scroll', { opacity: 1, y: 0 })
        return
      }

      // Section reveal animations using established patterns
      ScrollTrigger.batch('.animate-on-scroll', {
        onEnter: (elements) => {
          gsap.from(elements, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out'
          })
        }
      })

      // Service card animations with enterprise polish
      gsap.from('.service-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%'
        }
      })

      // Stats counter animations
      const counters = document.querySelectorAll('.stat-counter')
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0')
        const obj = { value: 0 }

        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.round(obj.value).toString()
          },
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%'
          }
        })
      })
    }

    initializeAnimations()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isLoaded])

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* Service Hero Section */}
      <ServiceHero />
      
      {/* Interactive Capabilities Matrix */}
      <CapabilitiesMatrix />
      
      {/* Technical Process Workflow */}
      <TechnicalProcess />
      
      {/* Industry Applications Grid */}
      <IndustryApplications />
      
      {/* Technical Specifications */}
      <TechnicalSpecifications />
      
      {/* Success Metrics Dashboard */}
      <SuccessMetrics />
      
      {/* Contact Integration */}
      <ContactSection />
    </div>
  )
}

// Service Hero Component
function ServiceHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background particles - subtle, non-scrolling */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-success-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-navy-900 mb-6">
            Custom Automation Systems
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Enterprise-Grade Control Solutions
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Engineered for Fortune 500 Operations
          </p>
        </div>

        {/* Floating equipment image with existing animation */}
        <div className="animate-on-scroll">
          <div className="relative w-full max-w-md h-96 mx-auto mb-8">
            <div className="absolute inset-0 rounded-2xl ">
              <div className="absolute inset-4 rounded-xl">
                <Image
                  src="/images/SSAC_Logo_Large_transparent.png"
                  alt="SSAC Custom Automation Equipment"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Service badges */}
        <div className="flex flex-wrap justify-center gap-4 animate-on-scroll">
          <span className="px-6 py-3 bg-navy-900 text-white rounded-lg font-semibold">PLC Programming</span>
          <span className="px-6 py-3 bg-electric-500 text-white rounded-lg font-semibold">SCADA Development</span>
          <span className="px-6 py-3 bg-success-500 text-white rounded-lg font-semibold">HMI Design</span>
        </div>
      </div>
    </section>
  )
}

// Interactive Capabilities Matrix Component
function CapabilitiesMatrix() {
  const [activeTab, setActiveTab] = useState(0)
  const tabContentRef = useRef<HTMLDivElement>(null)

  const capabilities = [
    {
      title: 'PLC Programming',
      icon: '⚡',
      description: 'Advanced programmable logic controller solutions',
      features: ['Ladder Logic Development', 'Function Block Programming', 'Structured Text', 'Safety Systems']
    },
    {
      title: 'SCADA Systems',
      icon: '🖥️',
      description: 'Supervisory control and data acquisition platforms',
      features: ['Real-time Monitoring', 'Historical Data', 'Alarm Management', 'Remote Access']
    },
    {
      title: 'HMI Development',
      icon: '📱',
      description: 'Human-machine interface design and implementation',
      features: ['Touch Screen Interfaces', 'Custom Graphics', 'Multi-language Support', 'Responsive Design']
    }
  ]

  const handleTabChange = useCallback((index: number) => {
    if (activeTab === index) return

    // Animate content change using established patterns
    gsap.timeline()
      .to(tabContentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.out'
      })
      .call(() => setActiveTab(index))
      .to(tabContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
  }, [activeTab])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy-900 mb-6">
            Interactive Capabilities Matrix
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive automation solutions through interactive demonstrations
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll">
          {capabilities.map((capability, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`group px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === index
                  ? 'bg-navy-900 text-white electric-glow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">{capability.icon}</span>
                {capability.title}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div ref={tabContentRef} className="animate-on-scroll">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 enterprise-shadow">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-heading font-bold text-navy-900 mb-6">
                  {capabilities[activeTab].title}
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  {capabilities[activeTab].description}
                </p>
                <div className="space-y-4">
                  {capabilities[activeTab].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-electric-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Visual demonstration area */}
              <div className="relative h-80 bg-navy-900 rounded-xl overflow-hidden">
                <div className="absolute inset-4 border-2 border-electric-500 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 p-4 h-full">
                    <div className="bg-electric-500 bg-opacity-30 rounded animate-pulse"></div>
                    <div className="bg-success-500 bg-opacity-30 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="bg-accent-500 bg-opacity-30 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="bg-primary-500 bg-opacity-30 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center text-electric-500 font-mono text-sm">
                  {capabilities[activeTab].title} Demo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Technical Process Workflow Component
function TechnicalProcess() {
  const steps = [
    {
      title: 'Requirements Analysis',
      description: 'Comprehensive system assessment and specification development',
      icon: '📋'
    },
    {
      title: 'System Design',
      description: 'Custom architecture planning and component selection',
      icon: '🔧'
    },
    {
      title: 'Implementation',
      description: 'Professional installation and configuration',
      icon: '⚙️'
    },
    {
      title: 'Testing & Validation',
      description: 'Rigorous quality assurance and performance verification',
      icon: '✅'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy-900 mb-6">
            Technical Process Workflow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our systematic approach ensures project success from concept to completion
          </p>
        </div>

        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="animate-on-scroll service-card">
              <div className="bg-white p-8 rounded-xl enterprise-shadow hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="w-12 h-12 bg-electric-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-navy-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Industry Applications Grid Component
function IndustryApplications() {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const applications = [
    {
      title: 'Manufacturing',
      category: 'industrial',
      description: 'Production line automation and quality control systems',
      image: '🏭'
    },
    {
      title: 'Energy',
      category: 'utilities',
      description: 'Power generation and distribution control systems',
      image: '⚡'
    },
    {
      title: 'Water Treatment',
      category: 'utilities',
      description: 'Municipal and industrial water processing automation',
      image: '💧'
    },
    {
      title: 'Automotive',
      category: 'industrial',
      description: 'Assembly line robotics and quality assurance',
      image: '🚗'
    },
    {
      title: 'Food & Beverage',
      category: 'process',
      description: 'Batch processing and packaging automation',
      image: '🍾'
    },
    {
      title: 'Pharmaceuticals',
      category: 'process',
      description: 'Clean room automation and compliance systems',
      image: '💊'
    }
  ]

  const filters = [
    { id: 'all', label: 'All Industries' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'utilities', label: 'Utilities' },
    { id: 'process', label: 'Process' }
  ]

  const filteredApplications = activeFilter === 'all' 
    ? applications 
    : applications.filter(app => app.category === activeFilter)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy-900 mb-6">
            Industry Applications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our automation solutions transform operations across diverse industries
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-navy-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Applications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 services-grid">
          {filteredApplications.map((application, index) => (
            <div key={index} className="service-card">
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl enterprise-shadow hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                <div className="text-center">
                  <div className="text-5xl mb-6">{application.image}</div>
                  <h3 className="text-2xl font-heading font-bold text-navy-900 mb-4">
                    {application.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {application.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Technical Specifications Accordion Component
function TechnicalSpecifications() {
  const [openSection, setOpenSection] = useState<number | null>(0)

  const specifications = [
    {
      title: 'Hardware Platforms',
      content: [
        'Siemens S7-1500 and S7-1200 Series PLCs',
        'Allen-Bradley ControlLogix and CompactLogix',
        'Schneider Electric Modicon M580',
        'Industrial Ethernet and Fieldbus Networks'
      ]
    },
    {
      title: 'Software Solutions',
      content: [
        'TIA Portal for Siemens Programming',
        'Studio 5000 for Rockwell Automation',
        'WinCC and FactoryTalk for SCADA',
        'Custom HMI Development'
      ]
    },
    {
      title: 'Performance Standards',
      content: [
        '99.9% System Uptime Guarantee',
        'Sub-millisecond Response Times',
        'Scalable from 10 to 10,000+ I/O Points',
        '24/7 Remote Monitoring Capability'
      ]
    },
    {
      title: 'Compliance & Standards',
      content: [
        'IEC 61131-3 Programming Standards',
        'ISA Security Standards (ISA-62443)',
        'FDA 21 CFR Part 11 for Pharmaceutical',
        'UL 508A Panel Shop Certification'
      ]
    }
  ]

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy-900 mb-6">
            Technical Specifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technical capabilities and performance standards
          </p>
        </div>

        <div className="space-y-4 animate-on-scroll">
          {specifications.map((spec, index) => (
            <div key={index} className="bg-white rounded-xl enterprise-shadow overflow-hidden">
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-xl font-heading font-bold text-navy-900">
                  {spec.title}
                </h3>
                <div className={`transform transition-transform duration-300 ${
                  openSection === index ? 'rotate-180' : ''
                }`}>
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openSection === index && (
                <div className="px-8 pb-6">
                  <div className="space-y-3">
                    {spec.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-electric-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Success Metrics Dashboard Component
function SuccessMetrics() {
  const metrics = [
    { label: 'Years of Experience', value: 15, suffix: '+' },
    { label: 'Completed Projects', value: 500, suffix: '+' },
    { label: 'System Uptime', value: 99.9, suffix: '%' },
    { label: 'Client Satisfaction', value: 100, suffix: '%' }
  ]

  const testimonials = [
    {
      quote: "SSAC delivered a flawless automation solution that exceeded our production targets by 30%.",
      author: "Engineering Manager, Fortune 500 Manufacturing"
    },
    {
      quote: "Their technical expertise and attention to detail made our complex integration seamless.",
      author: "Plant Operations Director, Energy Sector"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy-900 mb-6">
            Success Metrics Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proven track record of delivering exceptional automation solutions
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center animate-on-scroll">
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl enterprise-shadow">
                <div className="text-5xl font-heading font-bold text-navy-900 mb-2">
                  <span className="stat-counter" data-target={metric.value}>0</span>
                  <span className="text-electric-500">{metric.suffix}</span>
                </div>
                <div className="text-gray-600 font-medium">{metric.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-on-scroll">
              <div className="bg-gradient-to-br from-navy-50 to-electric-50 p-8 rounded-xl enterprise-shadow h-full">
                <div className="text-navy-900 text-lg mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </div>
                <div className="text-gray-600 font-medium">
                  — {testimonial.author}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
function ContactSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Schedule a consultation with our automation experts to discuss your custom system requirements
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-8 py-4 bg-electric-500 text-navy-900 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-electric-400 hover:scale-105 enterprise-shadow">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Schedule Engineering Consultation
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            
            <button className="group px-8 py-4 border-2 border-electric-500 text-electric-500 font-semibold rounded-lg transition-all duration-300 hover:bg-electric-500 hover:text-navy-900 hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                Download Technical Brochure
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}