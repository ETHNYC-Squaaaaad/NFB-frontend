import React, { useState } from 'react'
import { TextInput } from '@mantine/core'
import { governanceAddress } from '../constants'
import governanceAbi from '../constants/abi/Governance.json'

const ProposalViewer = ({ totalSupply }) => {
  const [proposalId, setProposalId] = useState('')
  const [error, setError] = useState('')

  const proposalMetaData = useContractRead(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'getMetadata',
    {
      enabled: proposalId ? true : false,
      args: +proposalId,
    },
  )

  const submitForm = (e) => {
    e.preventDefault()
  }

  if (!proposalId) {
    return (
      <form onSubmit={(e) => submitForm(e)}>
        <TextInput
          label="Proposal Viewer"
          description="Type the proposal id below"
          error={error}
        />
      </form>
    )
  }

  if (proposalId) {
    return <div></div>
  }
}

export default ProposalViewer
