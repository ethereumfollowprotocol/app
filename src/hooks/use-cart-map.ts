import type { CartItem } from '#/contexts/cart-context'
import { useState, useRef, useCallback } from 'react'

export const useCartMap = (initialData = []) => {
  const mapRef = useRef(new Map<string, CartItem>(initialData))
  const [, setTick] = useState(0) // Dummy state to force re-render

  const set = useCallback((key: string, value: CartItem) => {
    mapRef.current.set(key, value)
  }, [])

  const setBulk = useCallback((items: CartItem[]) => {
    items.forEach(item => {
      mapRef.current.set(item.listOp.data.toString('hex'), item)
    })
  }, [])

  const get = useCallback((key: string) => {
    return mapRef.current.get(key)
  }, [])

  const has = useCallback((key: string) => {
    return mapRef.current.has(key)
  }, [])

  const deleteKey = useCallback((key: string) => {
    mapRef.current.delete(key)
  }, [])

  const entries = useCallback(() => {
    return mapRef.current.entries()
  }, [])

  const values = useCallback(() => {
    return Array.from(mapRef.current.values())
  }, [])

  const forceUpdate = useCallback(() => {
    setTick(tick => tick + 1)
  }, [])

  return {
    set,
    get,
    has,
    delete: deleteKey,
    entries,
    forceUpdate,
    setBulk,
    values
  }
}
