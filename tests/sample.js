#!/bin/node

const CondorcetRandomized = require('..')

const c = new CondorcetRandomized()

const candidateA = c.addCandidate('A')
const candidateB = c.addCandidate('B')
const candidateC = c.addCandidate('C')

c.addVote([candidateA, candidateB, candidateC])
c.addVote([candidateA, candidateC, candidateB])
c.addVote([candidateC, candidateA, candidateB])

console.log(c.generateLottery())
