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
      <div style={{ width: '33%' }}></div>
      <div style={{ width: '33%', textAlign: 'center' }}>
        <Text style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          Working Title
        </Text>
      </div>
      <div style={{ width: '33%', display: 'flex', justifyContent: 'end' }}>
        <ConnectButton style={{ marginLeft: 'auto' }} />
      </div>
    </MantineHeader>
  )
}

export default Header
