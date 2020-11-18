function getStatHp(base, inv, lv, nature) {
  // nature is only passed for interface reasons
  if (base == 1) { return 1; }
  return Math.floor(((2 * base + inv) * lv) / 100) + lv + 10;
}

function getStatOther(base, inv, lv, nature) {
  return Math.floor((Math.floor(((2 * base + inv) * lv) / 100) + 5) * nature);
}

function getStat(isHP, base, inv, lv, nature) {
  return isHP ? getStatHp(base, inv, lv, nature) : getStatOther(base, inv, lv, nature);
}

function getInvestment(inv) {
  if (inv <= 31) { return {'iv': inv, 'ev': 0}; }
  return {'iv': 31, 'ev': (inv - 31) * 4 };
}

function getPossibleSet(isHP, stat, base, lv, nature) {
  console.log(isHP, stat, base, lv, nature);
  if (stat < getStat(isHP, base, 0, lv, nature)) {
    return;
  }
  if (stat > getStat(isHP, base, 94, lv, nature)) {
    return;
  }

  /* start with 0 */ {
    let currentStat = getStat(isHP, base, 0, lv, nature);
    if (currentStat == stat) {
      console.log(currentStat, 0);
      return getInvestment(0);
    }
  }
  for (let i = 31; i >= 1; i--) {
    let currentStat = getStat(isHP, base, i, lv, nature);
    if (currentStat == stat) {
      console.log(currentStat, i);
      return getInvestment(i);
    }
  }
  // magic number explainer: (31 + (252/4)) = 94
  for (let i = 32; i <= 94; i++) {
    let currentStat = getStat(isHP, base, i, lv, nature);
    if (currentStat == stat) {
      console.log(currentStat, i);
      return getInvestment(i);
    }
  }
}

export { getPossibleSet };

