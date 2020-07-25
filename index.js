class CondorcetRandomized {
  candidates = [];
  votes = [];
  matrix = [];

  addCandidate(candidate) {
    if (typeof candidate !== 'string' || candidate.length === 0) {
      throw new Error('"candidate" must be a non empty string');
    }

    if (this.candidates.indexOf(candidate) !== -1) {
      throw new Error('"' + candidate + '" is allredy in candidates');
    }

    const total =  this.candidates.push(candidate);

    return total - 1;
  }

  addVote(vote) {
    if (!Array.isArray(vote)) {
      throw new Error('vote must be a non empty array');
    }

    if (vote.length > this.candidates.length) {
      throw new Error('vote is more large of candidates list');
    }

    if (new Set(vote).size !== vote.length) {
      throw new Error('vote have duplicates votes');
    }

    vote.forEach((candidate) => {
      if (typeof candidate !== 'number'
      || candidate < 0
      || candidate >= this.candidates.length) {
        throw new Error('vote item must be an candidate index');
      }
    });

    this.votes.push(vote);
  }

  resolveDuel(a, b) {
    const score = this.votes.reduce((accu, vote) => {
      const scoreA = vote.indexOf(a);
      const scoreB = vote.indexOf(b);

      if (scoreA === -1 || scoreB === -1) {
        return accu;
      }

      return accu + Math.sign(scoreB - scoreA);
    }, 0);

    const result = Math.sign(score);

    if (!Array.isArray(this.matrix[a])) {
      this.matrix[a] = [];
    }
    if (!Array.isArray(this.matrix[b])) {
      this.matrix[b] = [];
    }

    this.matrix[b][a] = -result;
    this.matrix[a][b] = result
  }

  generateLottery() {
    this.candidates.forEach((a, i) => {
      this.candidates.forEach((b, j) => {
        if (!this.matrix[i] || !this.matrix[i][j]) {
          this.resolveDuel(i, j);
        }
      });
    });
    console.log(this.matrix);
  }
};

module.exports = CondorcetRandomized;

