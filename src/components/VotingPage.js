import React from 'react'
import { Stack, Container, Group, Text, Tabs } from '@mantine/core'
import VoteBox from './VoteBox'
import { useContractRead, useAccount } from 'wagmi'
import { tokenAddress, governanceAddress, instrAddress } from '../constants'
import tokenAbi from '../constants/abi/Token.json'
import governanceAbi from '../constants/abi/Governance.json'
import EmptyVoteBox from './EmptyVoteBox'
import { clampUseMovePosition } from '@mantine/hooks'

const VotingPage = () => {
  const account = useAccount()

  const totalSupply = useContractRead(
    {
      addressOrName: tokenAddress,
      contractInterface: tokenAbi,
    },
    'totalSupply',
    {
      watch: true,
    },
  )

  const userBalance = useContractRead(
    {
      addressOrName: tokenAddress,
      contractInterface: tokenAbi,
    },
    'balanceOf',
    {
      enabled: account?.data?.address ? true : false,
      args: account?.data?.address,
    },
  )

  const activeProposal = useContractRead(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'getActiveProposal',
    {
      onError(error) {
        console.log(error)
      },
    },
  )

  return (
    <Stack>
      <Container fluid style={{ minWidth: '100%' }}>
        <Group position="apart">
          <Container
            p="lg"
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[0],
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            })}
          >
            <Text color="dimmed">Total VOTE Supply</Text>
            <Text>{totalSupply?.data?.toString()}</Text>
          </Container>
          <Container
            p="lg"
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[0],
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            })}
          >
            <Text color="dimmed">Your VOTE</Text>
            <Text>{userBalance?.data?.toString()}</Text>
          </Container>
        </Group>
      </Container>
      <Container fluid style={{ minWidth: '100%' }}>
        <Text weight="bold">Active Proposal Voting</Text>
        {activeProposal?.data?.instructionsId?.gt(0) ? (
          <VoteBox
            instructionsId={activeProposal.data.instructionsId}
            totalSupply={totalSupply?.data}
            userBalance={userBalance?.data}
          />
        ) : (
          <EmptyVoteBox />
        )}
      </Container>
      <Container fluid>
        <Tabs variant="pills">
          <Tabs.Tab label="Upcoming Proposals"></Tabs.Tab>
          <Tabs.Tab label="Archived Proposals"></Tabs.Tab>
          <Tabs.Tab label="Expired Proposals"></Tabs.Tab>
        </Tabs>
      </Container>
    </Stack>
  )
}

export default VotingPage
