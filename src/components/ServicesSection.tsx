'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

const services = [
  {
    title: 'Custom Automation Systems',
    description: 'Tailored automation solutions designed for your specific industrial requirements',
    icon: '⚙️',
    features: ['PLC Programming', 'HMI Development', 'System Integration', 'Performance Optimization'],
    navigateAddress: '/services/custom-automation-systems'
  },
  {
    title: 'Control Panel Manufacturing',
    description: 'Professional control panels built to industrial standards with premium components',
    icon: '🔧',
    features: ['UL Listed Panels', 'Custom Enclosures', 'Wire Management', 'Quality Testing'],
    navigateAddress: '/services/control-panel-manufacturing'
  },
  {
    title: 'SCADA Development',
    description: 'Advanced supervisory control and data acquisition systems for real-time monitoring',
    icon: '📊',
    features: ['Real-time Monitoring', 'Data Analytics', 'Alarm Management', 'Historical Reporting'],
    navigateAddress: '/services/scada-development'
  },
  {
    title: 'System Integration',
    description: 'Seamless integration of automation systems with existing infrastructure',
    icon: '🔗',
    features: ['Protocol Conversion', 'Network Design', 'Legacy System Updates', 'Compatibility Testing'],
    navigateAddress: '/services/system-integration'
  },
  {
    title: 'Digital Twin Modeling',
    description: 'Virtual replicas of physical systems for testing and optimization',
    icon: '🎯',
    features: ['3D Modeling', 'Simulation Testing', 'Performance Analysis', 'Predictive Maintenance'],
    navigateAddress: '/services/digital-twin'
  },
  {
    title: '24/7 Support & Maintenance',
    description: 'Round-the-clock technical support and preventive maintenance services',
    icon: '🛠️',
    features: ['Emergency Response', 'Preventive Maintenance', 'Remote Diagnostics', 'Training Programs'],
    navigateAddress: '/services/support-maintenance'
  }
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Get all cards
    const cards = grid.querySelectorAll('.service-card')

    // Enhanced hover animations for each card
    cards.forEach((card, index) => {
      const icon = card.querySelector('.service-icon')
      const title = card.querySelector('.service-title')
      const description = card.querySelector('.service-description')
      const features = card.querySelectorAll('.service-feature')
      const learnMore = card.querySelector('.learn-more-section')
      const arrow = card.querySelector('.learn-more-arrow')

      // Create hover timeline for each card
      const hoverTl = gsap.timeline({ paused: true })

      // Build the hover animation sequence
      hoverTl
        // Card itself - lift and glow effect
        .to(card, {
          y: -8,
          scale: 1.03,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          duration: 0.3,
          ease: 'power2.out'
        })
        // Icon - rotate and scale with bounce
        .to(icon, {
          rotation: 360,
          scale: 1.3,
          duration: 0.6,
          ease: 'back.out(2)'
        }, 0)
        // Title - slight scale and color
        .to(title, {
          scale: 1.05,
          color: '#0ea5e9', // electric-500
          duration: 0.3
        }, 0)
        // Description - subtle fade
        .to(description, {
          opacity: 0.9,
          duration: 0.3
        }, 0)
        // Features - stagger in from left
        .fromTo(features, {
          x: -10,
          opacity: 0.5
        }, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05
        }, 0.1)
        // Learn more section - highlight
        .to(learnMore, {
          borderTopColor: '#0ea5e9',
          duration: 0.3
        }, 0)
        // Arrow - slide and pulse
        .to(arrow, {
          x: 8,
          scale: 1.2,
          duration: 0.3,
          ease: 'power2.out'
        }, 0)

      // Add mouse enter/leave listeners
      card.addEventListener('mouseenter', () => {
        // Add a slight delay for smoother UX
        gsap.delayedCall(0.05, () => hoverTl.play())
      })

      card.addEventListener('mouseleave', () => {
        hoverTl.reverse()
      })

      // Add initial subtle animation on load (stagger cards slightly)
      gsap.fromTo(card, {
        opacity: 0.8,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
      })
    })

    // Cleanup
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', () => {})
        card.removeEventListener('mouseleave', () => {})
      })
      gsap.killTweensOf(cards)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy-900 text-center mb-16">
          Enterprise Automation Services
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link href={service.navigateAddress} key={index}>
              <div className="service-card group bg-white rounded-xl p-8 shadow-lg cursor-pointer">
                <div className="service-icon text-4xl mb-6 inline-block">
                  {service.icon}
                </div>

                <h3 className="service-title text-xl font-heading font-semibold text-navy-900 mb-4 transition-colors">
                  {service.title}
                </h3>

                <p className="service-description text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="service-feature flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-electric-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="learn-more-section mt-6 pt-4 border-t border-gray-100 transition-colors">
                  <button className="text-electric-500 font-medium hover:text-electric-600 transition-colors flex items-center gap-2">
                    Learn More
                    <svg className="learn-more-arrow w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>          
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}