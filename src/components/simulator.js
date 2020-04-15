import React, { useState } from 'react';
import styled from '@emotion/styled'
import {
  initializeRareCollection,
  countRares
} from '../utils/simulation';

const Grid = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
});
const Card = styled.div({
  flexBasis: '300px',
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
});
const MenuItem = styled.div({
  flexBasis: '300px',
  flexGrow: 1,
  margin: '10px 10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
  padding: '20px',
  height: '100px',
  borderRadius: '10px',
  color: '#FEFEFC',
  flexShrink: 0,
  backgroundColor: '#324666'
});
const SubmitButton = styled.button({
  backgroundColor: 'darkorange',
  color: "#FEFEFC",
  borderRadius: '5px',
  padding: '8px',
  border: 'none'
});
const ResetButton = styled.button({
  backgroundColor: '#6493de',
  color: "#FEFEFC",
  borderRadius: '5px',
  padding: '8px',
  border: 'none'
});


const Simulator = () => {
  const [gold, setGold] = useState(100000);
  const [gems, setGems] = useState(0);
  const [packs, setPacks] = useState(0);
  const [wildcards, setWildcards] = useState(0);
  const [rares, setRares] = useState(initializeRareCollection());
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
          <div>Wildcards</div>
          <div>{wildcards}</div>
        </Card>
        <Card>
          <div>Wildcard Counter</div>
          <div>{wcCounter}/6</div>
        </Card>
        <Card>
          <div>Packs</div>
          <div>{packs}</div>
        </Card>
        <Card>
          <div>Rares</div>
          <div>{countRares(rares)}</div>
        </Card>
      </Grid>
      <Grid>
        <MenuItem>
          <SubmitButton>Buy Pack</SubmitButton>
        </MenuItem>
        <MenuItem>
          <SubmitButton>Open Pack</SubmitButton>
        </MenuItem>
        <MenuItem>
          <SubmitButton>Draft</SubmitButton>
        </MenuItem>
        <MenuItem>
          <ResetButton>Reset</ResetButton>
        </MenuItem>
      </Grid>
    </Wrapper>
  );
}

export default Simulator;
