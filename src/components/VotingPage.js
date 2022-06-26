import React, { useState } from 'react'
import {
  Stack,
  Container,
  Group,
  Text,
  Tabs,
  Modal,
  Button,
} from '@mantine/core'
import VoteBox from './VoteBox'
import { useContractRead, useAccount, useContractWrite } from 'wagmi'
import { tokenAddress, governanceAddress, faucetAddress } from '../constants'
import tokenAbi from '../constants/abi/Token.json'
import governanceAbi from '../constants/abi/Governance.json'
import faucetAbi from '../constants/abi/Faucet.json'
import EmptyVoteBox from './EmptyVoteBox'
import ProposalViewer from './ProposalViewer'
import AddProp from './AddProp'

const VotingPage = () => {
  const account = useAccount()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const mintVoteWrite = useContractWrite(
    {
      addressOrName: faucetAddress,
      contractInterface: faucetAbi,
    },
    'mintMeTokens',
    {
      args: 10,
      onSettled(data) {
        if (data) {
          data.wait().then(() => {
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      },
    },
  )

  const mintVote = (e) => {
    e.preventDefault()
    setLoading(true)
    mintVoteWrite.write()
  }

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
          {userBalance.isFetched && userBalance?.data?.eq(0) && (
            <Button size="xl" onClick={(e) => mintVote(e)} disabled={loading}>
              Mint VOTE
            </Button>
          )}
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
          <Tabs.Tab label="Upcoming Proposals">
            <Button onClick={() => setShowModal(!showModal)}>
              Submit Proposal
            </Button>
            <Modal
              opened={showModal}
              closeOnClickOutside
              closeOnEscape
              onClose={() => setShowModal(false)}
              size="xl"
            >
              <AddProp />
            </Modal>
            <ProposalViewer totalSupply={totalSupply} />
          </Tabs.Tab>
          <Tabs.Tab label="Archived Proposals"></Tabs.Tab>
        </Tabs>
      </Container>
    </Stack>
  )
}

export default VotingPage
