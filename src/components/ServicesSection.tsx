'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Custom Automation Systems',
    description: 'Tailored automation solutions designed for your specific industrial requirements',
    icon: '⚙️',
    features: ['PLC Programming', 'HMI Development', 'System Integration', 'Performance Optimization']
  },
  {
    title: 'Control Panel Manufacturing',
    description: 'Professional control panels built to industrial standards with premium components',
    icon: '🔧',
    features: ['UL Listed Panels', 'Custom Enclosures', 'Wire Management', 'Quality Testing']
  },
  {
    title: 'SCADA Development',
    description: 'Advanced supervisory control and data acquisition systems for real-time monitoring',
    icon: '📊',
    features: ['Real-time Monitoring', 'Data Analytics', 'Alarm Management', 'Historical Reporting']
  },
  {
    title: 'System Integration',
    description: 'Seamless integration of automation systems with existing infrastructure',
    icon: '🔗',
    features: ['Protocol Conversion', 'Network Design', 'Legacy System Updates', 'Compatibility Testing']
  },
  {
    title: 'Digital Twin Modeling',
    description: 'Virtual replicas of physical systems for testing and optimization',
    icon: '🎯',
    features: ['3D Modeling', 'Simulation Testing', 'Performance Analysis', 'Predictive Maintenance']
  },
  {
    title: '24/7 Support & Maintenance',
    description: 'Round-the-clock technical support and preventive maintenance services',
    icon: '🛠️',
    features: ['Emergency Response', 'Preventive Maintenance', 'Remote Diagnostics', 'Training Programs']
  }
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Show static content immediately
      gsap.set([titleRef.current, gridRef.current], {
        opacity: 1,
        y: 0
      })
      return
    }

    // Animate title
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power2.out'
        })
      }
    })

    // Animate service cards
    ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const cards = gridRef.current?.querySelectorAll('.service-card')
        if (cards) {
          gsap.from(cards, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
          })
        }
      }
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-heading font-bold text-navy-900 text-center mb-16"
        >
          Enterprise Automation Services
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white rounded-xl p-8 enterprise-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-heading font-semibold text-navy-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-electric-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="text-electric-500 font-medium hover:text-electric-600 transition-colors flex items-center gap-2">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}