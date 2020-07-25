#!/bin/node

const CondorcetRandomized = require('./index.js')

const c = new CondorcetRandomized()

const candidateA = c.addCandidate('A')
const candidateB = c.addCandidate('B')
const candidateC = c.addCandidate('C')

c.addVote([candidateA, candidateB, candidateC])
c.addVote([candidateB, candidateC, candidateA])
c.addVote([candidateC, candidateA, candidateB])

c.generateLottery()
