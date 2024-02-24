import * as React from 'react'
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { Collapse, IconButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import List from '@mui/material/List'
import { ListItemButton } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/layout'

type TProps = {
  open: boolean
}

const RecursiveListItem = ({
  items,
  level,
  disabled,
  openItems,
  setOpenItems
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
}) => {
  const handleClick = (title: string) => {
    if (!disabled) {
      setOpenItems(prev => ({ ...prev, [title]: !prev[title] }))
    }
  }

  return (
    <>
      {items?.map((item: any, index: number) => (
        <React.Fragment key={item.title}>
          <ListItemButton
            sx={{ padding: `${level * 20}px` }}
            onClick={() => {
              if (item.children) {
                handleClick(item.title)
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
        openItems={openItems}
        disabled={!open}
        items={VerticalItems}
        level={1}
      ></RecursiveListItem>
    </List>
  )
}