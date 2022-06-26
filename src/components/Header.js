import React from 'react'
import { Header as MantineHeader, Text } from '@mantine/core'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  return (
    <MantineHeader
      height={60}
      style={{}}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <div></div>
      <div>
        <Text style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          Working Title
        </Text>
      </div>
      <div>
        <ConnectButton style={{ marginLeft: 'auto' }} />
      </div>
    </MantineHeader>
  )
}

export default Header
