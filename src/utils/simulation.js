import combinations from 'combinations-js';

const getBinomialDistribution = (prob, trial, success) => {
  return combinations(trial, success) * Math.pow(prob, success) * Math.pow((1 - prob), trial - success);
}

export const getRankedWinProbability = (winRate, numWins) => {
  if (numWins < 7) {
    return getBinomialDistribution(winRate, numWins + 2, numWins) * (1 - winRate);  
  }
  if (numWins === 7) {
    return Math.pow(winRate, 7)
      + ((7 * Math.pow(winRate, 6)) * winRate * (1 - winRate))
      + ((28 * Math.pow(winRate, 6)) * winRate * Math.pow((1 - winRate), 2));
  }
  return undefined;
}

export const getTraditionalWinProbability = (winRate, numWins) => {
  if (numWins < 5) {
    return Math.pow(winRate, numWins) * Math.pow(1 - winRate, 2) * (numWins + 1);
  }
  if (numWins === 5) {
    return Math.pow(winRate, 5)
      + ((5 * Math.pow(winRate, 5)) * (1 - winRate));
  }
  return undefined;
}

export const getTraditionalDraftWinProbability = (winRate, numWins) => {
  return getBinomialDistribution(winRate, 3, numWins);
}

export const simulateRankedEvent = (winRate) => {
  const randomNumber = Math.round(Math.random() * 1000);
  const noWinCutoff = getRankedWinProbability(winRate, 0) * 1000;
  const oneWinCutoff = noWinCutoff + (getRankedWinProbability(winRate, 1) * 1000);
  const twoWinCutoff = oneWinCutoff + (getRankedWinProbability(winRate, 2) * 1000);
  const threeWinCutoff = twoWinCutoff + (getRankedWinProbability(winRate, 3) * 1000);
  const fourWinCutoff = threeWinCutoff + (getRankedWinProbability(winRate, 4) * 1000);
  const fiveWinCutoff = fourWinCutoff + (getRankedWinProbability(winRate, 5) * 1000);
  const sixWinCutoff = fiveWinCutoff + (getRankedWinProbability(winRate, 6) * 1000);
  if (noWinCutoff === 0) {
    return 7;
  }
  if (randomNumber <= noWinCutoff) return 0;
  if (randomNumber <= oneWinCutoff) return 1;
  if (randomNumber <= twoWinCutoff) return 2;
  if (randomNumber <= threeWinCutoff) return 3;
  if (randomNumber <= fourWinCutoff) return 4;
  if (randomNumber <= fiveWinCutoff) return 5;
  if (randomNumber <= sixWinCutoff) return 6;
  return 7;
}

export const simulateTraditionalEvent = (winRate) => {
  const randomNumber = Math.round(Math.random() * 1000);
  const noWinCutoff = getTraditionalWinProbability(winRate, 0) * 1000;
  const oneWinCutoff = noWinCutoff + (getTraditionalWinProbability(winRate, 1) * 1000);
  const twoWinCutoff = oneWinCutoff + (getTraditionalWinProbability(winRate, 2) * 1000);
  const threeWinCutoff = twoWinCutoff + (getTraditionalWinProbability(winRate, 3) * 1000);
  const fourWinCutoff = threeWinCutoff + (getTraditionalWinProbability(winRate, 4) * 1000);
  if (noWinCutoff === 0) {
    return 5;
  }
  if (randomNumber <= noWinCutoff) return 0;
  if (randomNumber <= oneWinCutoff) return 1;
  if (randomNumber <= twoWinCutoff) return 2;
  if (randomNumber <= threeWinCutoff) return 3;
  if (randomNumber <= fourWinCutoff) return 4;
  return 5;
}

export const simulateTraditionalDraft = (winRate) => {
  const randomNumber = Math.round(Math.random() * 1000);
  const noWinCutoff = getTraditionalDraftWinProbability(winRate, 0) * 1000;
  const oneWinCutoff = noWinCutoff + (getTraditionalDraftWinProbability(winRate, 1) * 1000);
  const twoWinCutoff = oneWinCutoff + (getTraditionalDraftWinProbability(winRate, 2) * 1000);
  if (noWinCutoff === 0) {
    return 3;
  }
  if (randomNumber <= noWinCutoff) return 0;
  if (randomNumber <= oneWinCutoff) return 1;
  if (randomNumber <= twoWinCutoff) return 2;
  return 3;
}

const estimatePayout = (winRate, payoutMap, probabilityFunction) => {
  return payoutMap.map((payoutEntry, wins) => {
    let newPayout = {};
    for(let key in payoutEntry) {
      newPayout[key] = payoutEntry[key] * probabilityFunction(winRate, wins);
    }
    return newPayout;
  }).reduce((accumulator, currentPayout) => {
    let newPayout = accumulator;
    for(let key in accumulator) {
      newPayout[key] = accumulator[key] + currentPayout[key];
    }
    return newPayout;
  });
}

export const estimateRankedPayout = (winRate, payoutMap) => {
  return estimatePayout(winRate, payoutMap, getRankedWinProbability);
}

export const estimateTraditionalPayout = (winRate, payoutMap) => {
  return estimatePayout(winRate, payoutMap, getTraditionalWinProbability);
}

export const estimateTraditionalDraftPayout = (winRate, payoutMap) => {
  return estimatePayout(winRate, payoutMap, getTraditionalDraftWinProbability);
}

export const initializeRareCollection = () => {
  let rareCollection = [];
  for (let i = 0; i < 68; i++) {
    rareCollection.push(0);
  }
  return rareCollection;
}

export const getDraftRaresIntoCollection = (collection, raresPicked = 3) => {
  let newCollection = collection;
  for (let i = 0; i < raresPicked; i++) {
    const randomRareIndex = Math.round(Math.random() * 67);
    if (newCollection[randomRareIndex] < 4) {
      newCollection[randomRareIndex] = newCollection[randomRareIndex] + 1;
    }
  }
  return newCollection;
}

export const countRares = collection => collection.reduce((acc, curr) => curr + acc);
