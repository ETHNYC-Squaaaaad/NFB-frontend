import React from 'react'
import { Container, Text, Stack, Title, Progress, Button } from '@mantine/core'
import { useContractRead } from 'wagmi'
import { governanceAddress } from '../constants'
import governanceAbi from '../constants/abi/Governance.json'
import { utils } from 'ethers'

const VoteBox = ({ instructionsId }) => {
  const activeMetaData = useContractRead(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'getMetaData',
    {
      args: instructionsId,
    },
  )
  if (
    activeMetaData.fetchStatus !== 'fetched' ||
    activeMetaData.isError === true
  ) {
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
      <Text color="blue" size="smal">
        Proposed by
      </Text>
      <Stack>
        <Text size="small">Current Net Votes</Text>
        <Title>+ 240,141</Title>
        <Progress
          size="xl"
          radius="xl"
          sections={[
            { value: 50, color: 'green', label: '255,367 YES' },
            { value: 50, color: 'red', label: '15,156 NO' },
          ]}
        />
        <Container
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[3],
          })}
        >
          Execution Threshold: 548,303 PROX
        </Container>
        <Text>Your available votes: 15,200 PROX</Text>
        <Container>
          <Button color="green" m="xl">
            Yes
          </Button>
          <Button color="red" m="xl">
            No
          </Button>
        </Container>
      </Stack>
    </Container>
  )
}

export default VoteBox
