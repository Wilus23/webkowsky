'use client'

import {motion, useMotionValue, useReducedMotion, useSpring} from 'framer-motion'
import {useEffect, useRef, useState} from 'react'

import {motionTokens} from '@/app/components/animations/motionTokens'

const INTERACTIVE_SELECTOR =
  'a, button, label, summary, [role="button"], [data-cursor-color]'
const HIDE_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [contenteditable=""], [data-cursor-hide="true"]'
const DEFAULT_DOT_COLOR = 'rgb(53, 23, 251)'

type ParsedColor = {r: number; g: number; b: number; a: number}

function parseCssColor(value: string | null | undefined): ParsedColor | null {
  if (!value) return null
  const normalized = value.trim().toLowerCase()
  if (!normalized || normalized === 'transparent') return null

  const rgbMatch = normalized.match(/^rgba?\(([^)]+)\)$/)
  if (rgbMatch) {
    const parts = rgbMatch[1].split(',').map((part) => Number.parseFloat(part.trim()))
    if (parts.length < 3 || parts.slice(0, 3).some(Number.isNaN)) return null
    const [r, g, b] = parts
    const alpha = parts.length >= 4 && Number.isFinite(parts[3]) ? parts[3] : 1
    return {
      r: Math.max(0, Math.min(255, r)),
      g: Math.max(0, Math.min(255, g)),
      b: Math.max(0, Math.min(255, b)),
      a: Math.max(0, Math.min(1, alpha)),
    }
  }

  const hex = normalized.replace('#', '')
  if ([3, 4, 6, 8].includes(hex.length)) {
    const fullHex =
      hex.length === 3 || hex.length === 4
        ? hex
            .split('')
            .map((char) => char + char)
            .join('')
        : hex

    const r = Number.parseInt(fullHex.slice(0, 2), 16)
    const g = Number.parseInt(fullHex.slice(2, 4), 16)
    const b = Number.parseInt(fullHex.slice(4, 6), 16)
    const alphaHex = fullHex.length === 8 ? Number.parseInt(fullHex.slice(6, 8), 16) : 255

    if ([r, g, b, alphaHex].some(Number.isNaN)) return null

    return {
      r,
      g,
      b,
      a: alphaHex / 255,
    }
  }

  return null
}

function asRgbString(color: ParsedColor): string {
  return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`
}

function withAlpha(color: string, alpha: number): string {
  const parsed = parseCssColor(color)
  if (!parsed) return color
  return `rgba(${Math.round(parsed.r)}, ${Math.round(parsed.g)}, ${Math.round(parsed.b)}, ${alpha})`
}

function isVisibleColor(color: ParsedColor | null): color is ParsedColor {
  if (!color) return false
  return color.a > 0.12
}

function resolveInteractiveColor(element: HTMLElement): string {
  const customColor = element.dataset.cursorColor
  const parsedCustom = parseCssColor(customColor)
  if (isVisibleColor(parsedCustom)) {
    return asRgbString(parsedCustom)
  }

  const computedStyle = window.getComputedStyle(element)
  const cssVarColor = parseCssColor(computedStyle.getPropertyValue('--cursor-dot-color'))
  if (isVisibleColor(cssVarColor)) {
    return asRgbString(cssVarColor)
  }

  const candidates = [
    parseCssColor(computedStyle.backgroundColor),
    parseCssColor(computedStyle.borderTopColor),
    parseCssColor(computedStyle.color),
  ]

  for (const candidate of candidates) {
    if (isVisibleColor(candidate)) {
      return asRgbString(candidate)
    }
  }

  return DEFAULT_DOT_COLOR
}

export default function CursorDot() {
  const prefersReducedMotion = useReducedMotion()
  const [supportsFinePointer, setSupportsFinePointer] = useState(false)
  const [visible, setVisible] = useState(false)
  const [suppressed, setSuppressed] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const [dotColor, setDotColor] = useState(DEFAULT_DOT_COLOR)

  const visibleRef = useRef(false)
  const suppressedRef = useRef(false)
  const interactiveRef = useRef<HTMLElement | null>(null)
  const interactiveStateRef = useRef(false)
  const dotColorRef = useRef(DEFAULT_DOT_COLOR)

  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const springX = useSpring(pointerX, motionTokens.springs.cursor)
  const springY = useSpring(pointerY, motionTokens.springs.cursor)

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

  useEffect(() => {
    if (!enabled) {
      return
    }

    const applyInteractiveState = (nextInteractive: boolean) => {
      if (nextInteractive !== interactiveStateRef.current) {
        interactiveStateRef.current = nextInteractive
        setInteractive(nextInteractive)
      }
    }

    const applyDotColor = (nextColor: string) => {
      if (nextColor !== dotColorRef.current) {
        dotColorRef.current = nextColor
        setDotColor(nextColor)
      }
    }

    const resetInteractiveState = () => {
      interactiveRef.current = null
      applyInteractiveState(false)
      applyDotColor(DEFAULT_DOT_COLOR)
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX - 4)
      pointerY.set(event.clientY - 4)

      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }

      const target = event.target as Element | null
      const nextSuppressed = Boolean(target?.closest(HIDE_SELECTOR))
      if (nextSuppressed !== suppressedRef.current) {
        suppressedRef.current = nextSuppressed
        setSuppressed(nextSuppressed)
      }

      const interactiveElement = target?.closest(INTERACTIVE_SELECTOR) as HTMLElement | null
      if (interactiveElement !== interactiveRef.current) {
        interactiveRef.current = interactiveElement

        if (interactiveElement) {
          applyInteractiveState(true)
          applyDotColor(resolveInteractiveColor(interactiveElement))
        } else {
          resetInteractiveState()
        }
      }
    }

    const hideDot = () => {
      if (!visibleRef.current) return
      visibleRef.current = false
      setVisible(false)
    }

    const showDot = () => {
      if (visibleRef.current) return
      visibleRef.current = true
      setVisible(true)
    }

    const resetSuppression = () => {
      if (!suppressedRef.current) return
      suppressedRef.current = false
      setSuppressed(false)
    }

    const handleWindowBlur = () => {
      hideDot()
      resetInteractiveState()
    }

    window.addEventListener('pointermove', handlePointerMove, {passive: true})
    window.addEventListener('pointercancel', hideDot)
    window.addEventListener('blur', handleWindowBlur)
    window.addEventListener('focus', showDot)
    window.addEventListener('scroll', resetSuppression, {passive: true})
    document.addEventListener('mouseleave', hideDot)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointercancel', hideDot)
      window.removeEventListener('blur', handleWindowBlur)
      window.removeEventListener('focus', showDot)
      window.removeEventListener('scroll', resetSuppression)
      document.removeEventListener('mouseleave', hideDot)
    }
  }, [enabled, pointerX, pointerY])

  const shouldHide = !visible || suppressed
  const glowColor = withAlpha(dotColor, interactive ? 0.78 : 0.62)

  if (!enabled) {
    return null
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden size-2 rounded-full md:block"
      style={{x: springX, y: springY}}
      initial={false}
      animate={{
        opacity: shouldHide ? 0 : 1,
        scale: shouldHide ? 0.55 : interactive ? 1.18 : 1,
        backgroundColor: dotColor,
        boxShadow: shouldHide
          ? '0 0 0 rgba(0,0,0,0)'
          : `0 0 18px ${glowColor}`,
      }}
      transition={{
        duration: motionTokens.durations.micro,
        ease: motionTokens.easing.standard,
      }}
    />
  )
}
