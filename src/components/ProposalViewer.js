import React, { useState } from 'react'
import { Stack } from '@mantine/core'
import { instrAddress } from '../constants'
import instrAbi from '../constants/abi/INSTR.json'
import Proposal from './Proposal'
import { useContractRead } from 'wagmi'

const ProposalViewer = ({ totalSupply }) => {
  const prop1 = useContractRead(
    {
      addressOrName: instrAddress,
      contractInterface: instrAbi,
    },
    'getInstructions',
    {
      args: 1,
    },
  )
  const prop2 = useContractRead(
    {
      addressOrName: instrAddress,
      contractInterface: instrAbi,
    },
    'getInstructions',
    {
      args: 2,
    },
  )
  const prop3 = useContractRead(
    {
      addressOrName: instrAddress,
      contractInterface: instrAbi,
    },
    'getInstructions',
    {
      args: 3,
    },
  )
  const prop4 = useContractRead(
    {
      addressOrName: instrAddress,
      contractInterface: instrAbi,
    },
    'getInstructions',
    {
      args: 4,
    },
  )
  const prop5 = useContractRead(
    {
      addressOrName: instrAddress,
      contractInterface: instrAbi,
    },
    'getInstructions',
    {
      args: 5,
    },
  )
  const prop6 = useContractRead(
    {
      addressOrName: instrAddress,
      contractInterface: instrAbi,
    },
    'getInstructions',
    {
      args: 6,
    },
  )
  const prop7 = useContractRead(
    {
      addressOrName: instrAddress,
      contractInterface: instrAbi,
    },
    'getInstructions',
    {
      args: 7,
    },
  )
  const prop8 = useContractRead(
    {
      addressOrName: instrAddress,
      contractInterface: instrAbi,
    },
    'getInstructions',
    {
      args: 8,
    },
  )

  return (
    <Stack>
      {prop1.data?.length > 0 && (
        <Proposal proposalId={1} totalSupply={totalSupply}></Proposal>
      )}
      {prop2.data?.length > 0 && (
        <Proposal proposalId={2} totalSupply={totalSupply}></Proposal>
      )}
      {prop3.data?.length > 0 && (
        <Proposal proposalId={3} totalSupply={totalSupply}></Proposal>
      )}
      {prop4.data?.length > 0 && (
        <Proposal proposalId={4} totalSupply={totalSupply}></Proposal>
      )}
      {prop5.data?.length > 0 && (
        <Proposal proposalId={5} totalSupply={totalSupply}></Proposal>
      )}
      {prop6.data?.length > 0 && (
        <Proposal proposalId={6} totalSupply={totalSupply}></Proposal>
      )}
      {prop7.data?.length > 0 && (
        <Proposal proposalId={7} totalSupply={totalSupply}></Proposal>
      )}
      {prop8.data?.length > 0 && (
        <Proposal proposalId={8} totalSupply={totalSupply}></Proposal>
      )}
    </Stack>
  )
}

export default ProposalViewer
