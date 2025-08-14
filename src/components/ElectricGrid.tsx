'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  active: boolean
  intensity: number
}

interface ElectricGridProps {
  className?: string
}

export default function ElectricGrid({ className = '' }: ElectricGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Generate grid nodes
    const generateNodes = () => {
      const nodes: Node[] = []
      const spacing = 50
      const isMobile = window.innerWidth < 768
      const nodeSpacing = isMobile ? 80 : spacing
      
      for (let x = 0; x < canvas.width; x += nodeSpacing) {
        for (let y = 0; y < canvas.height; y += nodeSpacing) {
          nodes.push({
            x,
            y,
            active: false,
            intensity: 0
          })
        }
      }
      return nodes
    }

    nodesRef.current = generateNodes()

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
      
      // Update nodes based on mouse position
      nodesRef.current.forEach(node => {
        const distance = Math.hypot(node.x - mouseRef.current.x, node.y - mouseRef.current.y)
        const maxDistance = 150
        node.intensity = Math.max(0, 1 - distance / maxDistance)
        node.active = distance < 100
      })
    }

    // Draw connections between active nodes
    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)'
      ctx.lineWidth = 1
      
      const activeNodes = nodesRef.current.filter(node => node.active)
      
      activeNodes.forEach(node1 => {
        activeNodes.forEach(node2 => {
          if (node1 !== node2) {
            const distance = Math.hypot(node1.x - node2.x, node1.y - node2.y)
            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(node1.x, node1.y)
              ctx.lineTo(node2.x, node2.y)
              ctx.stroke()
            }
          }
        })
      })
    }

    // Draw nodes
    const drawNodes = () => {
      nodesRef.current.forEach(node => {
        if (node.intensity > 0) {
          const radius = 2 + node.intensity * 3
          const alpha = node.intensity * 0.8
          
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`
          ctx.beginPath()
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
          ctx.fill()
          
          // Add glow effect
          if (node.active) {
            ctx.shadowBlur = 10
            ctx.shadowColor = 'rgba(0, 212, 255, 0.5)'
            ctx.beginPath()
            ctx.arc(node.x, node.y, radius * 1.5, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Only draw if user prefers motion
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        drawConnections()
        drawNodes()
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resizeCanvas)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  )
}