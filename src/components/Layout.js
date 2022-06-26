import React from 'react'
import { AppShell, Grid } from '@mantine/core'
import VotingPage from './VotingPage'
import Header from './Header'

const Layout = () => {
  return (
    <AppShell fixed header={<Header />}>
      <Grid align="center" justify="center">
        <Grid.Col span={6}>
          <VotingPage />
        </Grid.Col>
      </Grid>
    </AppShell>
  )
}

export default Layout
