'use client'

import {motion, useMotionValue, useReducedMotion, useSpring} from 'framer-motion'
import Link, {type LinkProps} from 'next/link'
import {type AnchorHTMLAttributes, useEffect, useState} from 'react'

import {motionTokens} from '@/app/components/animations/motionTokens'

type MagneticLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    children: React.ReactNode
    className: string
    wrapperClassName?: string
    strength?: number
    cursorColor?: string
  }

export default function MagneticLink({
  href,
  children,
  className,
  wrapperClassName,
  strength = 0.18,
  cursorColor,
  ...anchorProps
}: MagneticLinkProps) {
  const prefersReducedMotion = useReducedMotion()
  const [supportsFinePointer, setSupportsFinePointer] = useState(false)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const springX = useSpring(pointerX, {
    stiffness: 260,
    damping: 26,
    mass: 0.24,
  })
  const springY = useSpring(pointerY, {
    stiffness: 260,
    damping: 26,
    mass: 0.24,
  })

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(pointer: fine)')
    const hoverQuery = window.matchMedia('(hover: hover)')

    const updateEnabled = () => {
      setSupportsFinePointer(finePointerQuery.matches && hoverQuery.matches)
    }

    const frame = window.requestAnimationFrame(updateEnabled)

    finePointerQuery.addEventListener('change', updateEnabled)
    hoverQuery.addEventListener('change', updateEnabled)

    return () => {
      window.cancelAnimationFrame(frame)
      finePointerQuery.removeEventListener('change', updateEnabled)
      hoverQuery.removeEventListener('change', updateEnabled)
    }
  }, [])

  const enabled = supportsFinePointer && !prefersReducedMotion

  return (
    <motion.div
      className={wrapperClassName || 'inline-flex'}
      style={enabled ? {x: springX, y: springY, willChange: 'transform'} : undefined}
      onPointerMove={
        enabled
          ? (event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              const dx = event.clientX - (rect.left + rect.width / 2)
              const dy = event.clientY - (rect.top + rect.height / 2)
              pointerX.set(dx * strength)
              pointerY.set(dy * strength)
            }
          : undefined
      }
      onPointerLeave={
        enabled
          ? () => {
              pointerX.set(0)
              pointerY.set(0)
            }
          : undefined
      }
      whileTap={enabled ? {scale: 0.98} : undefined}
      transition={{
        duration: motionTokens.durations.micro,
        ease: motionTokens.easing.standard,
      }}
    >
      <Link
        href={href}
        className={className}
        data-cursor-color={cursorColor}
        {...anchorProps}
      >
        {children}
      </Link>
    </motion.div>
  )
}
