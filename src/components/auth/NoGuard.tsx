// ** React Imports
import { ReactElement, ReactNode } from 'react'
import { useAuth } from 'src/hooks/useAuth'

interface NoGuard {
  children: ReactNode
  fallback: ReactElement | null
}

const NoGuard = (props: NoGuard) => {
  // ** Props
  const { children, fallback } = props

  const auth = useAuth()
  if (auth.loading) {
    return fallback
  }
  return <>{children}</>
}
export default NoGuard
