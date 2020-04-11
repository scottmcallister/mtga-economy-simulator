import React, { useState } from 'react';
import styled from '@emotion/styled'

const Grid = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  })
const Card = styled.div({
  flexBasis: '250px',
  flexGrow: 1,
  margin: '10px 10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px',
  height: '100px',
  borderRadius: '10px',
  color: '#FEFEFC',
  backgroundColor: '#4D4F4E'
})

function App() {
  const [gold, setGold] = useState(100000);
  const [gems, setGems] = useState(0);
  const [packs, setPacks] = useState(0);
  const [wildcards, setWildcards] = useState(0);
  const [wcCounter, setWcCounter] = useState(0);
  const [winRate, setWinrate] = useState(0.5);

  const Wrapper = styled.div({
    fontFamily: 'arial',
    backgroundColor: '#272C2F'
  })
  
  return (
    <Wrapper>
      <Grid>
        <Card>
          <div>Gold</div>
          <div>{gold}</div>
        </Card>
        <Card>
          <div>Gems</div>
          <div>{gems}</div>
        </Card>
        <Card>
          <div>Packs</div>
          <div>{packs}</div>
        </Card>
        <Card>
          <div>Wildcards</div>
          <div>{wildcards}</div>
        </Card>
      </Grid>
    </Wrapper>
  );
}

export default App;
