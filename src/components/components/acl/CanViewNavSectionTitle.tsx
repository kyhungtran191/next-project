// ** React Imports
import { ReactNode, useContext } from 'react'
import { AbilityContext } from 'src/components/components/acl/Can'
import { NavSectionTitle } from 'src/types/layouts'
// ** Component Imports

// ** Types

interface Props {
  children: ReactNode
  navTitle?: NavSectionTitle
}

const CanViewNavSectionTitle = (props: Props) => {
  // ** Props
  const { children, navTitle } = props

  // ** Hook
  const ability = useContext(AbilityContext)

  if (navTitle && navTitle.auth === false) {
    return <>{children}</>
  } else {
    return ability && ability.can(navTitle?.action, navTitle?.subject) ? <>{children}</> : null
  }
}

export default CanViewNavSectionTitle
