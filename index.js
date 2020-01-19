function getStatHp(base, inv, lv, nature) {
  // nature is only passed for interface reasons
  if (base == 1) { return 1; }
  return Math.floor(((2 * base + inv) * lv) / 100) + lv + 10;
}

function getStatOther(base, inv, lv, nature) {
  return Math.floor((Math.floor(((2 * base + inv) * lv) / 100) + 5) * nature);
}

function getInv(inv) {
  if (inv <= 31) { return {'iv': inv, 'ev': 0}; }
  return {'iv': 31, 'ev': (inv - 31) * 4 };
}

function getPossibleSet(type, stat, base, lv, nature) {
  let getStat = getStatOther;
  if (type == 'hp') {
    getStat = getStatHp;
  }

  if (stat < getStat(base, 0, lv, nature)) {
    console.log('smol', getStat(base, 0, lv, nature));
    return;
  }
  if (stat > getStat(base, 94, lv, nature)) {
    console.log('big', getStat(base, 94, lv, nature));
    return;
  }

  for (i = 31; i >= 0; i--) {
    let currentStat = getStat(base, i, lv, nature);
    if (currentStat == stat) {
      return getInv(i);
    }
  }
  // magic number explainer: (31 + (252/4)) = 94
  for (i = 32; i <= 94; i++) {
    let currentStat = getStat(base, i, lv, nature);
    if (currentStat == stat) {
      return getInv(i);
    }
  }
}

function setBase() {
  let statline = document.getElementById('pokemon').value.split('/');
  document.querySelector('#hp .base').value = statline[0];
  document.querySelector('#atk .base').value = statline[1];
  document.querySelector('#def .base').value = statline[2];
  document.querySelector('#spa .base').value = statline[3];
  document.querySelector('#spd .base').value = statline[4];
  document.querySelector('#spe .base').value = statline[5];
}

function calc() {
  let stats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
  let level = document.getElementById('level').value;
  stats.forEach(statname => {
    row = document.getElementById(statname);
    let stat = row.querySelector('.statnum').value;
    let base = row.querySelector('.base').value;
    let nature = row.querySelector('.nature').value;
    let result = getPossibleSet(statname, Number(stat), Number(base), Number(level), Number(nature));
    console.log(row.querySelector('.result'));
    row.querySelector('.result').textContent = result['iv'] + ' IVs';
    if (result['ev'] > 0) {
      row.querySelector('.result').textContent += ' / ' + result['ev'] + ' EVs';
    }
  });
}

function voidNature() {
  let stats = ['atk', 'def', 'spa', 'spd', 'spe'];
  stats.forEach(statname => {
    let nature = document.getElementById(statname).querySelector('.nature');
    nature.value = "1.0";
  });
}

function setNature() {
  let nature = document.getElementById('nature').value.split('/');
  let inc = nature[0];
  let dec = nature[1];
  voidNature();

  if (inc === dec) {
    return;
  }

  document.getElementById(inc).querySelector('.nature').value = "1.1"
  document.getElementById(dec).querySelector('.nature').value = "0.9"
}

document.getElementById('pokemon').addEventListener('change', setBase);
document.getElementById('calculate').addEventListener('click', calc);
document.getElementById('nature').addEventListener('change', setNature);

