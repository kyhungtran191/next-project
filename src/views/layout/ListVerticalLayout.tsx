import * as React from 'react'
import { Collapse, ListItemIcon, ListItemText, ListSubheader, useTheme } from '@mui/material'
import List from '@mui/material/List'
import { ListItemButton } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/layout'
import { useRouter } from 'next/router'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

type TProps = {
  open: boolean
}

const RecursiveListItem = ({
  items,
  level,
  disabled,
  openItems,
  setOpenItems,
  setActivePath,
  activePath
}: {
  items: any
  level: number
  disabled: boolean
  openItems: { [key: string]: boolean }
  setOpenItems: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >
  setActivePath: React.Dispatch<React.SetStateAction<string | null>>
  activePath: string | null
}) => {
  const theme = useTheme()
  const router = useRouter()

  const handleClick = (title: string) => {
    if (!disabled) {
      setOpenItems(prev => ({ ...prev, [title]: !prev[title] }))
    }
  }

  const handleSelectItem = (path: string) => {
    setActivePath(path)
    console.log(path)
    if (path) {
      router.push(path)
    }
  }

  return (
    <>
      {items?.map((item: any, index: number) => (
        <React.Fragment key={item.title}>
          <ListItemButton
            sx={{
              padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px`,
              margin: '1px 0',
              backgroundColor:
                (activePath && item.path === activePath) || !!openItems[item.title]
                  ? `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`
                  : theme.palette.background.paper
            }}
            onClick={() => {
              if (item.children) {
                handleClick(item.title)
              }
              if (item.path) {
                handleSelectItem(item.path)
              }
            }}
          >
            <ListItemIcon>
              <IconifyIcon icon={item.icon} />
            </ListItemIcon>
            {!disabled && <ListItemText primary={item?.title}></ListItemText>}
          </ListItemButton>
          {item.children && item.children.length > 0 && (
            <>
              <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit key={index}>
                <RecursiveListItem
                  disabled={disabled}
                  setOpenItems={setOpenItems}
                  activePath={activePath}
                  setActivePath={setActivePath}
                  openItems={openItems}
                  items={item.children}
                  level={level + 1}
                ></RecursiveListItem>
              </Collapse>
            </>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default function ListVerticalLayout({ open }: TProps) {
  const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>({})
  const [activePath, setActivePath] = React.useState<null | string>('')

  React.useEffect(() => {
    if (!open) {
      handleToggleAll()
    }
  }, [open])
  const handleToggleAll = () => {
    setOpenItems({})
  }
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItem
        setOpenItems={setOpenItems}
        activePath={activePath}
        setActivePath={setActivePath}
        openItems={openItems}
        disabled={!open}
        items={VerticalItems}
        level={1}
      ></RecursiveListItem>
    </List>
  )
}
