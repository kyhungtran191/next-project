import * as React from 'react'
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { Collapse, IconButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import List from '@mui/material/List'
import { ListItemButton } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/layout'

type TProps = {}

const RecursiveListItem = ({ items, level }: { items: any; level: number }) => {
  const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>({})
  const handleClick = (title: string) => {
    setOpenItems(prev => ({ ...prev, [title]: !prev[title] }))
  }
  return (
    <>
      {items?.map((item: any, index: number) => (
        <React.Fragment key={item.title}>
          <ListItemButton
            sx={{ paddingLeft: `${level * 20}px` }}
            onClick={() => {
              if (item.children) {
                handleClick(item.title)
              }
            }}
          >
            <ListItemIcon>
              <IconifyIcon icon={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
          {item.children && item.children.length > 0 && (
            <>
              <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit key={index}>
                <RecursiveListItem items={item.children} level={level + 1}></RecursiveListItem>
              </Collapse>
            </>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default function ListVerticalLayout(props: TProps) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItem items={VerticalItems} level={1}></RecursiveListItem>
    </List>
  )
}
