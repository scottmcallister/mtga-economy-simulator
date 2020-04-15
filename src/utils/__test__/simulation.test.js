import {
  getRankedWinProbability,
  getTraditionalWinProbability,
  getTraditionalDraftWinProbability,
  simulateRankedEvent,
  simulateTraditionalEvent,
  estimateRankedPayout,
  estimateTraditionalPayout,
  initializeRareCollection,
  countRares,
  getDraftRaresIntoCollection
} from '../simulation';
import {
  rankedDraftPayouts,
  traditionalDraftPayouts,
  rankedConstructedPayouts,
  traditionalConstructedPayouts,
  premierDraftPayouts
} from '../constants';


test('gets ranked win probability', () => {
  const winRate = 0.5;
  const wins = [
    getRankedWinProbability(winRate, 0),
    getRankedWinProbability(winRate, 1),
    getRankedWinProbability(winRate, 2),
    getRankedWinProbability(winRate, 3),
    getRankedWinProbability(winRate, 4),
    getRankedWinProbability(winRate, 5),
    getRankedWinProbability(winRate, 6),
    getRankedWinProbability(winRate, 7)
  ];
  const expectedWins = [
    0.125,
    0.1875,
    0.1875,
    0.15625,
    0.1171875,
    0.08203125,
    0.0546875,
    0.08984375
  ];
  expect(wins).toEqual(expectedWins);
});

test('gets traditional constructed win probability', () => {
  const winRate = 0.5;
  const wins = [
    getTraditionalWinProbability(winRate, 0),
    getTraditionalWinProbability(winRate, 1),
    getTraditionalWinProbability(winRate, 2),
    getTraditionalWinProbability(winRate, 3),
    getTraditionalWinProbability(winRate, 4),
    getTraditionalWinProbability(winRate, 5)
  ];
  const expectedWins = [
    0.25,
    0.25,
    0.1875,
    0.125,
    0.078125,
    0.109375
  ];
  expect(wins).toEqual(expectedWins);
});

test('gets traditional draft win probability', () => {
  const winRate = 0.5;
  const wins = [
    getTraditionalDraftWinProbability(winRate, 0),
    getTraditionalDraftWinProbability(winRate, 1),
    getTraditionalDraftWinProbability(winRate, 2),
    getTraditionalDraftWinProbability(winRate, 3)
  ];
  const expectedWins = [ 0.125, 0.375, 0.375, 0.125 ];
  expect(wins).toEqual(expectedWins);
});

test('simulates ranked event', () => {
  const winRate = 0.5;
  const simulatedWins = simulateRankedEvent(winRate);
  expect(simulatedWins).toBeLessThan(8);
});

test('simulates ranked event always winning', () => {
  const champWinRate = 1;
  const champWins = simulateRankedEvent(champWinRate);
  expect(champWins).toEqual(7);
});

test('simulates ranked event always losing', () => {
  const scrubWinRate = 0;
  const scrubWins = simulateRankedEvent(scrubWinRate);
  expect(scrubWins).toEqual(0);
});

test('simulates traditional event', () => {
  const winRate = 0.5;
  const simulatedWins = simulateTraditionalEvent(winRate);
  expect(simulatedWins).toBeLessThan(6);
});

test('simulates traditional event always winning', () => {
  const champWinRate = 1;
  const champWins = simulateTraditionalEvent(champWinRate);
  expect(champWins).toEqual(5);
});

test('simulates traditional event always losing', () => {
  const scrubWinRate = 0;
  const scrubWins = simulateTraditionalEvent(scrubWinRate);
  expect(scrubWins).toEqual(0);
});

test('estimate ranked draft payout', () => {
  const rankedDraftPayout = estimateRankedPayout(0.5, rankedDraftPayouts);
  expect(Math.round(rankedDraftPayout.packs)).toEqual(1);
  expect(Math.round(rankedDraftPayout.gems)).toEqual(347);
});

test('estimate traditional draft payout', () => {
  const traditionalDraftPayout = estimateTraditionalPayout(0.5, traditionalDraftPayouts);
  expect(Math.round(traditionalDraftPayout.packs)).toEqual(2);
  expect(Math.round(traditionalDraftPayout.gems)).toEqual(563);
});

test('estimate ranked constructed payout', () => {
  const rankedConstructedPayout = estimateRankedPayout(0.5, rankedConstructedPayouts);
  expect(Math.round(rankedConstructedPayout.gold)).toEqual(410);
  expect(Math.round(rankedConstructedPayout.rares)).toEqual(0);
});

test('estimate traditional constructed payout', () => {
  const traditionalConstructedPayout = estimateTraditionalPayout(0.5, traditionalConstructedPayouts);
  expect(Math.round(traditionalConstructedPayout.gold)).toEqual(863);
  expect(Math.round(traditionalConstructedPayout.rares)).toEqual(0);
});

test('estimate premier draft bo1 payout', () => {
  const premierDraftPayout = estimateRankedPayout(0.5, premierDraftPayouts);
  expect(Math.round(premierDraftPayout.packs)).toEqual(2);
  expect(Math.round(premierDraftPayout.gems)).toEqual(820);
});

test('add rares to collection', () => {
  const rareCollection = initializeRareCollection();
  const startingRareCount = countRares(rareCollection);
  expect(startingRareCount).toEqual(0);
  expect(rareCollection.length).toEqual(68)
  const newRareCollection = getDraftRaresIntoCollection(rareCollection, 4);
  const newRareCount = countRares(newRareCollection);
  expect(newRareCount).toEqual(4);
  const draftOnlyCollection = getDraftRaresIntoCollection(rareCollection, 268);
  const draftOnlyCount = countRares(draftOnlyCollection);
  expect(draftOnlyCount <= 268).toEqual(true);
});
