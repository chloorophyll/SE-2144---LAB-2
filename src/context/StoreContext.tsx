import { useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { initialState, StoreContext, storeReducer } from './store'

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

