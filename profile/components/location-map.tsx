"use client"

import { useEffect, useRef, useState } from "react"

interface EntryPoint {
  x: number
  y: number
  count: number
  name: string
  active: boolean
}

export function LocationMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [entryPoints, setEntryPoints] = useState<EntryPoint[]>([
    { x: 100, y: 80, count: 25, name: "North Sector", active: true },
    { x: 280, y: 120, count: 42, name: "East Sector", active: true },
    { x: 180, y: 180, count: 18, name: "South Sector", active: true },
    { x: 70, y: 150, count: 31, name: "West Sector", active: true },
    { x: 320, y: 70, count: 15, name: "Northeast Sector", active: true },
  ])
  const [hoveredPoint, setHoveredPoint] = useState<EntryPoint | null>(null)
  const [animationFrame, setAnimationFrame] = useState(0)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEntryPoints((prev) =>
        prev.map((point) => ({
          ...point,
          count: Math.max(5, point.count + Math.floor(Math.random() * 5) - 2),
          active: Math.random() > 0.1, // 90% chance to be active
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Animation frame for pulsing effect
    const frame = animationFrame

    // Draw the map
    const drawMap = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "hsla(var(--muted)/0.3)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "hsla(var(--muted-foreground)/0.1)"
      ctx.lineWidth = 1

      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw some random regions
      ctx.strokeStyle = "hsla(var(--muted-foreground)/0.5)"
      ctx.lineWidth = 1.5

      // Region 1
      ctx.beginPath()
      ctx.moveTo(50, 50)
      ctx.lineTo(150, 80)
      ctx.lineTo(200, 150)
      ctx.lineTo(100, 200)
      ctx.lineTo(50, 50)
      ctx.stroke()

      // Add subtle glow to region 1
      ctx.save()
      ctx.shadowColor = "hsla(var(--primary)/0.5)"
      ctx.shadowBlur = 10
      ctx.strokeStyle = "hsla(var(--primary)/0.3)"
      ctx.stroke()
      ctx.restore()

      // Region 2
      ctx.beginPath()
      ctx.moveTo(220, 50)
      ctx.lineTo(320, 80)
      ctx.lineTo(350, 150)
      ctx.lineTo(250, 200)
      ctx.lineTo(220, 50)
      ctx.stroke()

      // Add subtle glow to region 2
      ctx.save()
      ctx.shadowColor = "hsla(var(--chart-2)/0.5)"
      ctx.shadowBlur = 10
      ctx.strokeStyle = "hsla(var(--chart-2)/0.3)"
      ctx.stroke()
      ctx.restore()

      // Draw entry points with pulsing effect
      entryPoints.forEach((point) => {
        // Calculate pulse effect (0-1)
        const pulse = 0.8 + Math.sin(frame / 10 + point.x) * 0.2

        // Size based on count and pulse
        const size = Math.min(Math.max(point.count / 5, 5), 15) * pulse

        // Draw point with glow
        ctx.save()

        if (point === hoveredPoint) {
          // Enhanced glow for hovered point
          ctx.shadowColor = "hsla(var(--primary)/0.8)"
          ctx.shadowBlur = 15
          ctx.beginPath()
          ctx.arc(point.x, point.y, size + 5, 0, Math.PI * 2)
          ctx.fillStyle = "hsla(var(--primary)/0.2)"
          ctx.fill()
        }

        // Regular glow
        ctx.shadowColor = point.active ? "hsla(var(--primary)/0.5)" : "hsla(var(--muted-foreground)/0.5)"
        ctx.shadowBlur = 10

        // Draw circle
        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle = point.active ? "hsla(var(--primary)/0.7)" : "hsla(var(--muted-foreground)/0.5)"
        ctx.fill()
        ctx.restore()

        // Draw count
        ctx.font = "10px sans-serif"
        ctx.fillStyle = "hsl(var(--primary-foreground))"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(point.count.toString(), point.x, point.y)

        // Draw name for hovered point
        if (point === hoveredPoint) {
          ctx.font = "12px sans-serif"
          ctx.fillStyle = "hsl(var(--primary))"
          ctx.fillText(point.name, point.x, point.y - 20)
        }
      })

      // Connection lines between points (network visualization)
      ctx.strokeStyle = "hsla(var(--primary)/0.2)"
      ctx.lineWidth = 1

      for (let i = 0; i < entryPoints.length; i++) {
        for (let j = i + 1; j < entryPoints.length; j++) {
          const p1 = entryPoints[i]
          const p2 = entryPoints[j]

          // Only connect active points
          if (p1.active && p2.active) {
            // Calculate distance
            const dx = p2.x - p1.x
            const dy = p2.y - p1.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Only connect if within reasonable distance
            if (distance < 200) {
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)

              // Animate the line with dashes
              ctx.setLineDash([5, 5])
              ctx.lineDashOffset = -frame % 10
              ctx.stroke()
              ctx.setLineDash([])
            }
          }
        }
      }
    }

    drawMap()

    // Update animation frame
    const animationId = requestAnimationFrame(() => {
      setAnimationFrame((prev) => prev + 1)
    })

    // Handle mouse movement for hover effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if mouse is over any entry point
      let hovered = null
      for (const point of entryPoints) {
        const dx = point.x - x
        const dy = point.y - y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 15) {
          hovered = point
          break
        }
      }

      setHoveredPoint(hovered)
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [entryPoints, animationFrame, hoveredPoint])

  return (
    <div className="w-full h-[250px] relative">
      <canvas ref={canvasRef} className="w-full h-full rounded-md" />
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
        <div className="flex items-center">
          <div className="status-indicator status-active mr-1.5"></div>
          Live Entry Point Data
        </div>
      </div>
    </div>
  )
}
