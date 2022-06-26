import React, { useState } from 'react'
import { Container, Text, Stack, Title, Progress, Button } from '@mantine/core'
import { useContractRead, useContractWrite } from 'wagmi'
import { governanceAddress } from '../constants'
import governanceAbi from '../constants/abi/Governance.json'
import { utils } from 'ethers'

const VoteBox = ({ instructionsId, totalSupply, userBalance }) => {
  const [txnLoading, setTxnLoading] = useState(false)
  const [error, setError] = useState('')

  const activeMetaData = useContractRead(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'getMetadata',
    {
      args: instructionsId,
    },
  )

  const totalEndorsments = useContractRead(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'totalEndorsementsForProposal',
    {
      args: instructionsId,
      watch: true,
    },
  )

  const yesVotes = useContractRead(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'yesVotesForProposal',
    {
      args: instructionsId,
      watch: true,
    },
  )

  const noVotes = useContractRead(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'noVotesForProposal',
    {
      args: instructionsId,
      watch: true,
    },
  )

  const writeVote = useContractWrite(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'vote',
    {
      onSettled(data) {
        if (data) {
          data.wait().then((data) => {
            setTxnLoading(false)
          })
        } else {
          setTxnLoading(false)
        }
      },
      onError(error) {
        setError('There was an error completing your vote')
        setTxnLoading(false)
      },
    },
  )

  const castVote = (e, vote) => {
    e.preventDefault()

    setTxnLoading(true)
    writeVote.write({ args: [vote] })
  }

  if (!activeMetaData.isFetched || activeMetaData.isError === true) {
    return <div>Loading....</div>
  }
  return (
    <Container
      fluid
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
      })}
    >
      <Text>{utils.parseBytes32String(activeMetaData.data.proposalName)}</Text>
      <Text size="small">Proposed by {activeMetaData?.data.proposer}</Text>
      <Stack>
        <Text size="small">Current Net Votes</Text>
        <Title>{noVotes?.data?.add(yesVotes?.data).toString()}</Title>
        <Progress
          size="xl"
          radius="xl"
          sections={[
            {
              value: 50,
              color: 'green',
              label: `${yesVotes?.data?.toString()} YES`,
            },
            {
              value: 50,
              color: 'red',
              label: `${noVotes?.data?.toString()} NO`,
            },
          ]}
        />
        <Container
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[3],
          })}
        >
          Execution Threshold: {totalSupply.div(3).toString()}
        </Container>
        <Text>Your available votes: {userBalance?.toString()} </Text>
        <Container>
          <Button
            color="green"
            m="xl"
            onClick={(e) => castVote(e, true)}
            loading={txnLoading}
          >
            Yes
          </Button>
          <Button
            color="red"
            m="xl"
            onClick={(e) => castVote(e, false)}
            loading={txnLoading}
          >
            No
          </Button>
        </Container>
      </Stack>
    </Container>
  )
}

export default VoteBox
