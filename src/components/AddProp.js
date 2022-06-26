import React, { useState } from 'react'
import {
  Container,
  Title,
  Chips,
  Chip,
  Stack,
  TextInput,
  Button,
  Table,
  Text,
} from '@mantine/core'
import { governanceAddress } from '../constants'
import governanceAbi from '../constants/abi/Governance.json'
import { useContractWrite } from 'wagmi'
import { utils } from 'ethers'

const AddProp = () => {
  const [address, setAddress] = useState('')
  const [action, setAction] = useState(0)
  const [propName, setPropName] = useState('')
  const [table, setTable] = useState([])
  const [actionArr, setActionArr] = useState([])
  const [loading, setLoading] = useState(false)

  const list = [
    'Install Module',
    'Upgrade Module',
    'Approve Policy',
    'Terminate Policy',
    'Change Executor',
  ]

  const submitProposalWrite = useContractWrite(
    {
      addressOrName: governanceAddress,
      contractInterface: governanceAbi,
    },
    'submitProposal',
    {
      onSettled(data) {
        if (data) {
          data.wait().then(() => {
            setLoading(false)
          })
        }
        setLoading(false)
      },
    },
  )

  const addProp = () => {
    const arr = [...table]
    const param = [...actionArr]
    arr.push(
      <tr key={arr.length}>
        <td>{list[action]}</td>
        <td>
          <Text size="xs">{address}</Text>
        </td>
      </tr>,
    )
    param.push([action, address])
    setActionArr(param)
    setTable(arr)
    setAddress('')
  }

  const submitProposal = (e) => {
    e.preventDefault()
    if (!propName || actionArr.length === 0) {
      return
    }
    setLoading(true)

    submitProposalWrite.write({
      args: [actionArr, utils.formatBytes32String(propName)],
    })
  }
  return (
    <Container>
      <Stack justify="center" align="center">
        <Title>Add a new Proposal</Title>
        <TextInput
          label="Name"
          description="Name of the Proposal"
          required
          value={propName}
          onChange={(e) => setPropName(e.currentTarget.value)}
        />
        <Chips value={action} onChange={setAction}>
          <Chip value={0}>Install Module</Chip>
          <Chip value={1}>Upgrade Module</Chip>
          <Chip value={2}>Approve Policy</Chip>
          <Chip value={3}>Terminate Policy</Chip>
          <Chip value={4}>Change Executor</Chip>
        </Chips>
        <TextInput
          label="Target"
          description="Address where the action is deployed"
          required
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
        />
        <Button onClick={(e) => addProp()}>Add Action</Button>
        <Table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </Table>
        <Button onClick={(e) => submitProposal(e)} loading={loading}>
          Submit Proposal
        </Button>
      </Stack>
    </Container>
  )
}

export default AddProp
