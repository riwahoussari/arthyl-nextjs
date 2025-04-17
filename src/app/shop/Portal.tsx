"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  children: React.ReactNode
  targetId?: string
}

export function Portal({ children, targetId = "portal-root" }: PortalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Create portal root if it doesn't exist
    if (!document.getElementById(targetId)) {
      const div = document.createElement("div")
      div.id = targetId
      document.body.appendChild(div)
    }

    return () => {
      // Optional cleanup if you want to remove the target element when no portals are using it
      const target = document.getElementById(targetId)
      if (target && target.childNodes.length === 0) {
        document.body.removeChild(target)
      }
    }
  }, [targetId])

  return mounted ? createPortal(children, document.getElementById(targetId) || document.body) : null
}
