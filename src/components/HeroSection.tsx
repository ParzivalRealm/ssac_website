'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

interface Scene {
  id: string
  progress: [number, number]
  content: {
    headline: string
    subheadline: string
    visual?: string
  }
}

const scenes: Scene[] = [
  {
    id: 'opening',
    progress: [0, 0.2],
    content: {
      headline: 'Enterprise Automation Solutions Since 2009',
      subheadline: 'Trusted by Fortune 500 Companies',
      visual: 'floating-equipment'
    }
  },
  {
    id: 'expertise',
    progress: [0.2, 0.4],
    content: {
      headline: 'Custom Control Systems',
      subheadline: 'Advanced SCADA Development',
      visual: 'technical-diagrams'
    }
  },
  {
    id: 'trust',
    progress: [0.4, 0.6],
    content: {
      headline: '15+ Years of Excellence',
      subheadline: '500+ Successful Projects',
      visual: 'stats-showcase'
    }
  },
  {
    id: 'innovation',
    progress: [0.6, 0.8],
    content: {
      headline: 'Cutting-Edge Technology',
      subheadline: 'Industry-Leading Solutions',
      visual: '3d-equipment'
    }
  },
  {
    id: 'cta',
    progress: [0.8, 1],
    content: {
      headline: 'Partner with SSAC Today',
      subheadline: 'Schedule Your Consultation',
      visual: 'call-to-action'
    }
  }
]

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundLayerRef = useRef<HTMLDivElement>(null)
  const midgroundLayerRef = useRef<HTMLDivElement>(null)
  const foregroundLayerRef = useRef<HTMLDivElement>(null)
  const [currentScene, setCurrentScene] = useState(0)
  const scrollProgressRef = useRef(0)

  const updateParallaxScenes = useCallback((progress: number) => {
    // Determine current scene based on scroll progress
    const sceneIndex = scenes.findIndex(scene => 
      progress >= scene.progress[0] && progress <= scene.progress[1]
    )
    
    if (sceneIndex !== -1 && sceneIndex !== currentScene) {
      setCurrentScene(sceneIndex)
    }
    
    scrollProgressRef.current = progress
    
    // Update parallax layers with different speeds
    if (backgroundLayerRef.current) {
      gsap.set(backgroundLayerRef.current, {
        y: progress * -50, // Slowest movement (0.3x)
        scale: 1 + progress * 0.1
      })
    }
    
    if (midgroundLayerRef.current) {
      gsap.set(midgroundLayerRef.current, {
        y: progress * -100, // Medium movement (0.6x)
        rotationY: progress * 15
      })
    }
    
    if (foregroundLayerRef.current) {
      gsap.set(foregroundLayerRef.current, {
        y: progress * -150 // Fastest movement (1.2x)
      })
    }
  }, [currentScene])

  const animateSceneTransition = useCallback(() => {
    // Kill any existing animations on these elements
    gsap.killTweensOf('.scene-headline')
    gsap.killTweensOf('.scene-subheadline')
    gsap.killTweensOf('.scene-visual')
    
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' }
    })
    
    // Reset and animate elements
    tl.set('.scene-headline', {
      opacity: 0,
      y: 50
    })
    .set('.scene-subheadline', {
      opacity: 0,
      y: 30
    })
    .set('.scene-visual', {
      opacity: 0,
      scale: 0.9
    })
    .to('.scene-headline', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.1
    })
    .to('.scene-subheadline', {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, '-=0.4')
    .to('.scene-visual', {
      opacity: 1,
      scale: 1,
      duration: 0.8
    }, '-=0.6')
    
    return tl
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const container = containerRef.current
    if (!hero || !container) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Show static content immediately
      gsap.set('.parallax-layer', { transform: 'none' })
      gsap.set('.scene-content', { opacity: 1, y: 0 })
      return
    }

    // Main ScrollTrigger for Apple-style parallax
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${window.innerHeight * 4}`, // 4x viewport height for smooth journey
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        updateParallaxScenes(self.progress)
      }
    })

    // Scene-specific animations
    scenes.forEach((scene) => {
      ScrollTrigger.create({
        trigger: container,
        start: `top+=${scene.progress[0] * window.innerHeight * 4} top`,
        end: `top+=${scene.progress[1] * window.innerHeight * 4} top`,
        onEnter: () => animateSceneTransition(),
        onEnterBack: () => animateSceneTransition()
      })
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [updateParallaxScenes, animateSceneTransition])

  useEffect(() => {
    // Animate scene content when current scene changes
    if (currentScene >= 0) {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' }
      })
      
      // Reset elements to initial state first
      tl.set('.scene-headline', {
        opacity: 0,
        y: 50
      })
      .set('.scene-subheadline', {
        opacity: 0,
        y: 30
      })
      .set('.scene-visual', {
        opacity: 0,
        scale: 0.9
      })
      
      // Then animate them in
      .to('.scene-headline', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1
      })
      .to('.scene-subheadline', {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.4')
      .to('.scene-visual', {
        opacity: 1,
        scale: 1,
        duration: 0.8
      }, '-=0.6')
    }
  }, [currentScene])

  const renderSceneVisual = (visual: string) => {
    switch (visual) {
      case 'floating-equipment':
        return (
          <div className="scene-visual relative w-full h-96 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl animate-float">
              <div className="absolute inset-4 bg-navy-900 rounded-xl">
                <Image
                  src="/images/SSAC_Logo_Large_transparent.png"
                  alt="SSAC LOGO"
                  fill
                  className="object-contain"
                />
                <div className="absolute top-4 left-4 w-6 h-6 bg-electric-500 rounded-full animate-electric-pulse"></div>
                <div className="absolute top-4 right-4 w-4 h-4 bg-success-500 rounded-full"></div>
                <div className="absolute bottom-4 left-4 right-4 h-6 bg-gradient-to-r from-electric-500 to-success-500 rounded opacity-70"></div>
              </div>
            </div>
          </div>
        )
      
      case 'technical-diagrams':
        return (
          <div className="scene-visual relative w-80 h-80 mx-auto mb-8">
            <div className="absolute inset-0 bg-gray-900 rounded-2xl shadow-2xl p-6">
              <div className="grid grid-cols-3 gap-4 h-full">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-electric-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-electric-500 rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      
      case 'stats-showcase':
        return (
          <div className="scene-visual grid grid-cols-2 gap-8 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="text-6xl font-heading font-bold text-electric-500">15+</div>
              <div className="text-gray-600 font-medium">Years</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-heading font-bold text-success-500">500+</div>
              <div className="text-gray-600 font-medium">Projects</div>
            </div>
          </div>
        )
      
      case '3d-equipment':
        return (
          <div className="scene-visual relative w-80 h-80 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-900 to-primary-500 rounded-2xl shadow-2xl transform -rotate-6">
              <div className="absolute inset-6 border-2 border-electric-500 rounded-lg">
                <div className="grid grid-cols-2 gap-2 p-4 h-full">
                  <div className="bg-electric-500 bg-opacity-30 rounded animate-pulse"></div>
                  <div className="bg-success-500 bg-opacity-30 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="bg-accent-500 bg-opacity-30 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="bg-primary-500 bg-opacity-30 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'call-to-action':
        return (
          <div className="scene-visual flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="group relative px-8 py-4 bg-navy-900 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-navy-800 hover:scale-105 enterprise-shadow">
              <span className="relative z-10">Schedule Engineering Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-electric-500 to-success-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            
            <button className="group px-8 py-4 border-2 border-navy-900 text-navy-900 font-semibold rounded-lg transition-all duration-300 hover:bg-navy-900 hover:text-white hover:scale-105">
              <span className="flex items-center gap-2">
                Download Capabilities
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </button>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <section ref={heroRef} className="relative">
      <div
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden"
      >
        {/* Background Parallax Layer */}
        <div
          ref={backgroundLayerRef}
          className="parallax-layer absolute inset-0 opacity-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-electric-500/10 to-success-500/10"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Mid-ground Parallax Layer */}
        <div
          ref={midgroundLayerRef}
          className="parallax-layer absolute inset-0 opacity-30"
        >
          
          {/* nice effects but i might delete them as they appear on top of the logo image 
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-electric-500/20 rounded-2xl"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-success-500/20 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-accent-500/20 rounded-lg"></div>*/}
        </div>

        {/* Foreground Content Layer */}
        <div
          ref={foregroundLayerRef}
          className="parallax-layer relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <div className="scene-content">
            {/* Current Scene Visual */}
            {currentScene >= 0 && renderSceneVisual(scenes[currentScene]?.content.visual || '')}
            
            {/* Scene Headline */}
            <h1 className="scene-headline text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-navy-900 mb-6 leading-tight">
              {currentScene >= 0 ? scenes[currentScene]?.content.headline : 'Enterprise Automation Solutions Since 2009'}
            </h1>

            {/* Scene Subheadline */}
            <p className="scene-subheadline text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {currentScene >= 0 ? scenes[currentScene]?.content.subheadline : 'Trusted by Fortune 500 Companies'}
            </p>
            
            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {scenes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentScene ? 'bg-electric-500 scale-125' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}