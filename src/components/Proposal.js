import React, { useState } from 'react'
import { Container, Grid, Stack, Progress, Button, Text } from '@mantine/core'
import { useContractRead, useContractWrite, useAccount } from 'wagmi'
import { utils } from 'ethers'
import { governanceAddress } from '../constants'
import governanceAbi from '../constants/abi/Governance.json'

const Proposal = ({ proposalId, totalSupply }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const account = useAccount()
  const proposalMetadata = useContractRead(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'getMetadata',
    {
      args: proposalId,
    },
  )

  const totalEndorsements = useContractRead(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'totalEndorsementsForProposal',
    {
      args: proposalId,
      watch: true,
    },
  )
  const userEndorsements = useContractRead(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'userEndorsementsForProposal',
    {
      enabled: account?.data?.address ? true : false,
      args: [proposalId, account?.data?.address],
      watch: true,
    },
  )

  const endorseProposalWrite = useContractWrite(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'endorseProposal',
    {
      args: proposalId,
      onSettled(data) {
        if (data) {
          data.wait().then((data) => {
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      },
      onError(error) {
        setError('There was an error completing your transactions')
        setLoading(false)
      },
    },
  )

  const endorseProposal = (e) => {
    e.preventDefault()
    endorseProposalWrite.write({ args: [proposalId] })
  }
  return (
    <Container>
      <Grid>
        <Grid.Col span={8}>
          <Stack>
            <Text size="lg" weight="bold">
              {proposalMetadata?.data?.proposalName &&
                utils.parseBytes32String(proposalMetadata?.data?.proposalName)}
            </Text>
            <Text size="xs">by {proposalMetadata?.data?.proposer}</Text>
            <Progress
              size="xl"
              radius="xl"
              sections={[
                {
                  value: totalEndorsements?.data
                    ?.div(totalSupply?.data.div(5))
                    .gt(1)
                    ? 100
                    : totalEndorsements?.data
                        ?.div(totalSupply?.data.div(5))
                        .mul(100),
                  color: 'green',
                  label: `${totalEndorsements?.data?.toString()} Endorsements / ${totalSupply?.data
                    .div(5)
                    .toString()} `,
                },
              ]}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <Text size="sm" color="dimmed">
              {' '}
              You Endorsed:
            </Text>
            <Text weight="bold">{userEndorsements?.data?.toString()}</Text>
            {userEndorsements?.data?.eq(0) && (
              <Button
                size="sm"
                onClick={(e) => endorseProposal(e)}
                color="green"
                loading={loading}
              >
                Endorse
              </Button>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Proposal
