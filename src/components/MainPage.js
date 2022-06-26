import React from 'react'
import {Grid, Text, Container, Title} from '@mantine/core'




const MainPage = ()=>{



    return (
        <Grid align='center' justify='center'>
            <Grid.Col span={3}
            sx={(theme) => ({
                backgroundColor: theme.colors.gray[0],
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
              })}
            >
                {
                    //Total PROX Supply
                    
                }
                <Text color ='dimmed'>Total PROX Supply</Text>
                <Text>1,000,000</Text>
            </Grid.Col>
            <Grid.Col span={3} m='xl' sx={(theme) => ({
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                backgroundColor: theme.colors.gray[0],
              })}>
                {
                    //Curent Proposal Jackpot
                }
                <Text color ='dimmed'>Current Proposal Jackpot</Text>
                <Text>1,000,000</Text>
            </Grid.Col>
            <Grid.Col span={6} sx={(theme) => ({
              })}>
                {
                    //Active Proposal Voting
                }
                <Text >
                    Active Proposal Voting
                </Text>
                <Container fluid sx={(theme) => ({
                backgroundColor: theme.colors.gray[0],
              })}>
                <Title>Name of Proposal</Title>
                <Text color='blue' size='small'>View proposal details in snapshot</Text>
                </Container>
            </Grid.Col>
            <Grid.Col>
                {
                    //Upcoming/Archived Proposals
                }
            </Grid.Col>
        </Grid>
    )
}



export default MainPage