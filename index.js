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
    return;
  }
  if (stat > getStat(base, 94, lv, nature)) {
    return;
  }

  /* start with 0 */ {
    let currentStat = getStat(base, 0, lv, nature);
    if (currentStat == stat) {
      return getInv(0);
    }
  }
  for (i = 31; i >= 1; i--) {
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

function idify(string) {
  return string.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

function setBase() {
  let idname = idify(document.getElementById('pokemon').value);
  document.querySelector('#hp .base').value = pokemonData[idname]['hp'];
  document.querySelector('#atk .base').value = pokemonData[idname]['atk'];
  document.querySelector('#def .base').value = pokemonData[idname]['def'];
  document.querySelector('#spa .base').value = pokemonData[idname]['spa'];
  document.querySelector('#spd .base').value = pokemonData[idname]['spd'];
  document.querySelector('#spe .base').value = pokemonData[idname]['spe'];
}

function calc() {
  let stats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
  let level = document.getElementById('level').value;
  if (!level) {
    return;
  }
  stats.forEach(statname => {
    row = document.getElementById(statname);
    let stat = row.querySelector('.statnum').value;
    let base = row.querySelector('.base').value;
    let nature = row.querySelector('.nature').value;
    if (!stat) {
      return;
    }
    let result = getPossibleSet(statname, Number(stat), Number(base), Number(level), Number(nature));
    if (result !== undefined) {
      if (result['iv'] === 31 && result['ev'] === 0) {
        row.querySelector('.result').textContent = 'Uninvested';
      }
      if (result['iv'] !== 31) {
        row.querySelector('.result').textContent = result['iv'] + ' IVs';
      }
      if (result['ev'] !== 0) {
        row.querySelector('.result').textContent = result['ev'] + ' EVs';
      }
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

pokemonData = {
  "bulbasaur": {
    "hp": 45,
    "atk": 49,
    "def": 49,
    "spa": 65,
    "spd": 65,
    "spe": 45
  },
  "ivysaur": {
    "hp": 60,
    "atk": 62,
    "def": 63,
    "spa": 80,
    "spd": 80,
    "spe": 60
  },
  "venusaur": {
    "hp": 80,
    "atk": 82,
    "def": 83,
    "spa": 100,
    "spd": 100,
    "spe": 80
  },
  "venusaurmega": {
    "hp": 80,
    "atk": 100,
    "def": 123,
    "spa": 122,
    "spd": 120,
    "spe": 80
  },
  "charmander": {
    "hp": 39,
    "atk": 52,
    "def": 43,
    "spa": 60,
    "spd": 50,
    "spe": 65
  },
  "charmeleon": {
    "hp": 58,
    "atk": 64,
    "def": 58,
    "spa": 80,
    "spd": 65,
    "spe": 80
  },
  "charizard": {
    "hp": 78,
    "atk": 84,
    "def": 78,
    "spa": 109,
    "spd": 85,
    "spe": 100
  },
  "charizardmegax": {
    "hp": 78,
    "atk": 130,
    "def": 111,
    "spa": 130,
    "spd": 85,
    "spe": 100
  },
  "charizardmegay": {
    "hp": 78,
    "atk": 104,
    "def": 78,
    "spa": 159,
    "spd": 115,
    "spe": 100
  },
  "charizardgmax": {
    "hp": 78,
    "atk": 84,
    "def": 78,
    "spa": 109,
    "spd": 85,
    "spe": 100
  },
  "squirtle": {
    "hp": 44,
    "atk": 48,
    "def": 65,
    "spa": 50,
    "spd": 64,
    "spe": 43
  },
  "wartortle": {
    "hp": 59,
    "atk": 63,
    "def": 80,
    "spa": 65,
    "spd": 80,
    "spe": 58
  },
  "blastoise": {
    "hp": 79,
    "atk": 83,
    "def": 100,
    "spa": 85,
    "spd": 105,
    "spe": 78
  },
  "blastoisemega": {
    "hp": 79,
    "atk": 103,
    "def": 120,
    "spa": 135,
    "spd": 115,
    "spe": 78
  },
  "caterpie": {
    "hp": 45,
    "atk": 30,
    "def": 35,
    "spa": 20,
    "spd": 20,
    "spe": 45
  },
  "metapod": {
    "hp": 50,
    "atk": 20,
    "def": 55,
    "spa": 25,
    "spd": 25,
    "spe": 30
  },
  "butterfree": {
    "hp": 60,
    "atk": 45,
    "def": 50,
    "spa": 90,
    "spd": 80,
    "spe": 70
  },
  "butterfreegmax": {
    "hp": 60,
    "atk": 45,
    "def": 50,
    "spa": 90,
    "spd": 80,
    "spe": 70
  },
  "weedle": {
    "hp": 40,
    "atk": 35,
    "def": 30,
    "spa": 20,
    "spd": 20,
    "spe": 50
  },
  "kakuna": {
    "hp": 45,
    "atk": 25,
    "def": 50,
    "spa": 25,
    "spd": 25,
    "spe": 35
  },
  "beedrill": {
    "hp": 65,
    "atk": 90,
    "def": 40,
    "spa": 45,
    "spd": 80,
    "spe": 75
  },
  "beedrillmega": {
    "hp": 65,
    "atk": 150,
    "def": 40,
    "spa": 15,
    "spd": 80,
    "spe": 145
  },
  "pidgey": {
    "hp": 40,
    "atk": 45,
    "def": 40,
    "spa": 35,
    "spd": 35,
    "spe": 56
  },
  "pidgeotto": {
    "hp": 63,
    "atk": 60,
    "def": 55,
    "spa": 50,
    "spd": 50,
    "spe": 71
  },
  "pidgeot": {
    "hp": 83,
    "atk": 80,
    "def": 75,
    "spa": 70,
    "spd": 70,
    "spe": 101
  },
  "pidgeotmega": {
    "hp": 83,
    "atk": 80,
    "def": 80,
    "spa": 135,
    "spd": 80,
    "spe": 121
  },
  "rattata": {
    "hp": 30,
    "atk": 56,
    "def": 35,
    "spa": 25,
    "spd": 35,
    "spe": 72
  },
  "rattataalola": {
    "hp": 30,
    "atk": 56,
    "def": 35,
    "spa": 25,
    "spd": 35,
    "spe": 72
  },
  "raticate": {
    "hp": 55,
    "atk": 81,
    "def": 60,
    "spa": 50,
    "spd": 70,
    "spe": 97
  },
  "raticatealola": {
    "hp": 75,
    "atk": 71,
    "def": 70,
    "spa": 40,
    "spd": 80,
    "spe": 77
  },
  "raticatealolatotem": {
    "hp": 75,
    "atk": 71,
    "def": 70,
    "spa": 40,
    "spd": 80,
    "spe": 77
  },
  "spearow": {
    "hp": 40,
    "atk": 60,
    "def": 30,
    "spa": 31,
    "spd": 31,
    "spe": 70
  },
  "fearow": {
    "hp": 65,
    "atk": 90,
    "def": 65,
    "spa": 61,
    "spd": 61,
    "spe": 100
  },
  "ekans": {
    "hp": 35,
    "atk": 60,
    "def": 44,
    "spa": 40,
    "spd": 54,
    "spe": 55
  },
  "arbok": {
    "hp": 60,
    "atk": 95,
    "def": 69,
    "spa": 65,
    "spd": 79,
    "spe": 80
  },
  "pikachu": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachucosplay": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachurockstar": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachubelle": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachupopstar": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachuphd": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachulibre": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachuoriginal": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachuhoenn": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachusinnoh": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachuunova": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachukalos": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachualola": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachupartner": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "pikachustarter": {
    "hp": 45,
    "atk": 80,
    "def": 50,
    "spa": 75,
    "spd": 60,
    "spe": 120
  },
  "pikachugmax": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "raichu": {
    "hp": 60,
    "atk": 90,
    "def": 55,
    "spa": 90,
    "spd": 80,
    "spe": 110
  },
  "raichualola": {
    "hp": 60,
    "atk": 85,
    "def": 50,
    "spa": 95,
    "spd": 85,
    "spe": 110
  },
  "sandshrew": {
    "hp": 50,
    "atk": 75,
    "def": 85,
    "spa": 20,
    "spd": 30,
    "spe": 40
  },
  "sandshrewalola": {
    "hp": 50,
    "atk": 75,
    "def": 90,
    "spa": 10,
    "spd": 35,
    "spe": 40
  },
  "sandslash": {
    "hp": 75,
    "atk": 100,
    "def": 110,
    "spa": 45,
    "spd": 55,
    "spe": 65
  },
  "sandslashalola": {
    "hp": 75,
    "atk": 100,
    "def": 120,
    "spa": 25,
    "spd": 65,
    "spe": 65
  },
  "nidoranf": {
    "hp": 55,
    "atk": 47,
    "def": 52,
    "spa": 40,
    "spd": 40,
    "spe": 41
  },
  "nidorina": {
    "hp": 70,
    "atk": 62,
    "def": 67,
    "spa": 55,
    "spd": 55,
    "spe": 56
  },
  "nidoqueen": {
    "hp": 90,
    "atk": 92,
    "def": 87,
    "spa": 75,
    "spd": 85,
    "spe": 76
  },
  "nidoranm": {
    "hp": 46,
    "atk": 57,
    "def": 40,
    "spa": 40,
    "spd": 40,
    "spe": 50
  },
  "nidorino": {
    "hp": 61,
    "atk": 72,
    "def": 57,
    "spa": 55,
    "spd": 55,
    "spe": 65
  },
  "nidoking": {
    "hp": 81,
    "atk": 102,
    "def": 77,
    "spa": 85,
    "spd": 75,
    "spe": 85
  },
  "clefairy": {
    "hp": 70,
    "atk": 45,
    "def": 48,
    "spa": 60,
    "spd": 65,
    "spe": 35
  },
  "clefable": {
    "hp": 95,
    "atk": 70,
    "def": 73,
    "spa": 95,
    "spd": 90,
    "spe": 60
  },
  "vulpix": {
    "hp": 38,
    "atk": 41,
    "def": 40,
    "spa": 50,
    "spd": 65,
    "spe": 65
  },
  "vulpixalola": {
    "hp": 38,
    "atk": 41,
    "def": 40,
    "spa": 50,
    "spd": 65,
    "spe": 65
  },
  "ninetales": {
    "hp": 73,
    "atk": 76,
    "def": 75,
    "spa": 81,
    "spd": 100,
    "spe": 100
  },
  "ninetalesalola": {
    "hp": 73,
    "atk": 67,
    "def": 75,
    "spa": 81,
    "spd": 100,
    "spe": 109
  },
  "jigglypuff": {
    "hp": 115,
    "atk": 45,
    "def": 20,
    "spa": 45,
    "spd": 25,
    "spe": 20
  },
  "wigglytuff": {
    "hp": 140,
    "atk": 70,
    "def": 45,
    "spa": 85,
    "spd": 50,
    "spe": 45
  },
  "zubat": {
    "hp": 40,
    "atk": 45,
    "def": 35,
    "spa": 30,
    "spd": 40,
    "spe": 55
  },
  "golbat": {
    "hp": 75,
    "atk": 80,
    "def": 70,
    "spa": 65,
    "spd": 75,
    "spe": 90
  },
  "oddish": {
    "hp": 45,
    "atk": 50,
    "def": 55,
    "spa": 75,
    "spd": 65,
    "spe": 30
  },
  "gloom": {
    "hp": 60,
    "atk": 65,
    "def": 70,
    "spa": 85,
    "spd": 75,
    "spe": 40
  },
  "vileplume": {
    "hp": 75,
    "atk": 80,
    "def": 85,
    "spa": 110,
    "spd": 90,
    "spe": 50
  },
  "paras": {
    "hp": 35,
    "atk": 70,
    "def": 55,
    "spa": 45,
    "spd": 55,
    "spe": 25
  },
  "parasect": {
    "hp": 60,
    "atk": 95,
    "def": 80,
    "spa": 60,
    "spd": 80,
    "spe": 30
  },
  "venonat": {
    "hp": 60,
    "atk": 55,
    "def": 50,
    "spa": 40,
    "spd": 55,
    "spe": 45
  },
  "venomoth": {
    "hp": 70,
    "atk": 65,
    "def": 60,
    "spa": 90,
    "spd": 75,
    "spe": 90
  },
  "diglett": {
    "hp": 10,
    "atk": 55,
    "def": 25,
    "spa": 35,
    "spd": 45,
    "spe": 95
  },
  "diglettalola": {
    "hp": 10,
    "atk": 55,
    "def": 30,
    "spa": 35,
    "spd": 45,
    "spe": 90
  },
  "dugtrio": {
    "hp": 35,
    "atk": 100,
    "def": 50,
    "spa": 50,
    "spd": 70,
    "spe": 120
  },
  "dugtrioalola": {
    "hp": 35,
    "atk": 100,
    "def": 60,
    "spa": 50,
    "spd": 70,
    "spe": 110
  },
  "meowth": {
    "hp": 40,
    "atk": 45,
    "def": 35,
    "spa": 40,
    "spd": 40,
    "spe": 90
  },
  "meowthalola": {
    "hp": 40,
    "atk": 35,
    "def": 35,
    "spa": 50,
    "spd": 40,
    "spe": 90
  },
  "meowthgalar": {
    "hp": 50,
    "atk": 65,
    "def": 55,
    "spa": 40,
    "spd": 40,
    "spe": 40
  },
  "meowthgmax": {
    "hp": 40,
    "atk": 45,
    "def": 35,
    "spa": 40,
    "spd": 40,
    "spe": 90
  },
  "persian": {
    "hp": 65,
    "atk": 70,
    "def": 60,
    "spa": 65,
    "spd": 65,
    "spe": 115
  },
  "persianalola": {
    "hp": 65,
    "atk": 60,
    "def": 60,
    "spa": 75,
    "spd": 65,
    "spe": 115
  },
  "psyduck": {
    "hp": 50,
    "atk": 52,
    "def": 48,
    "spa": 65,
    "spd": 50,
    "spe": 55
  },
  "golduck": {
    "hp": 80,
    "atk": 82,
    "def": 78,
    "spa": 95,
    "spd": 80,
    "spe": 85
  },
  "mankey": {
    "hp": 40,
    "atk": 80,
    "def": 35,
    "spa": 35,
    "spd": 45,
    "spe": 70
  },
  "primeape": {
    "hp": 65,
    "atk": 105,
    "def": 60,
    "spa": 60,
    "spd": 70,
    "spe": 95
  },
  "growlithe": {
    "hp": 55,
    "atk": 70,
    "def": 45,
    "spa": 70,
    "spd": 50,
    "spe": 60
  },
  "arcanine": {
    "hp": 90,
    "atk": 110,
    "def": 80,
    "spa": 100,
    "spd": 80,
    "spe": 95
  },
  "poliwag": {
    "hp": 40,
    "atk": 50,
    "def": 40,
    "spa": 40,
    "spd": 40,
    "spe": 90
  },
  "poliwhirl": {
    "hp": 65,
    "atk": 65,
    "def": 65,
    "spa": 50,
    "spd": 50,
    "spe": 90
  },
  "poliwrath": {
    "hp": 90,
    "atk": 95,
    "def": 95,
    "spa": 70,
    "spd": 90,
    "spe": 70
  },
  "abra": {
    "hp": 25,
    "atk": 20,
    "def": 15,
    "spa": 105,
    "spd": 55,
    "spe": 90
  },
  "kadabra": {
    "hp": 40,
    "atk": 35,
    "def": 30,
    "spa": 120,
    "spd": 70,
    "spe": 105
  },
  "alakazam": {
    "hp": 55,
    "atk": 50,
    "def": 45,
    "spa": 135,
    "spd": 95,
    "spe": 120
  },
  "alakazammega": {
    "hp": 55,
    "atk": 50,
    "def": 65,
    "spa": 175,
    "spd": 105,
    "spe": 150
  },
  "machop": {
    "hp": 70,
    "atk": 80,
    "def": 50,
    "spa": 35,
    "spd": 35,
    "spe": 35
  },
  "machoke": {
    "hp": 80,
    "atk": 100,
    "def": 70,
    "spa": 50,
    "spd": 60,
    "spe": 45
  },
  "machamp": {
    "hp": 90,
    "atk": 130,
    "def": 80,
    "spa": 65,
    "spd": 85,
    "spe": 55
  },
  "machampgmax": {
    "hp": 90,
    "atk": 130,
    "def": 80,
    "spa": 65,
    "spd": 85,
    "spe": 55
  },
  "bellsprout": {
    "hp": 50,
    "atk": 75,
    "def": 35,
    "spa": 70,
    "spd": 30,
    "spe": 40
  },
  "weepinbell": {
    "hp": 65,
    "atk": 90,
    "def": 50,
    "spa": 85,
    "spd": 45,
    "spe": 55
  },
  "victreebel": {
    "hp": 80,
    "atk": 105,
    "def": 65,
    "spa": 100,
    "spd": 70,
    "spe": 70
  },
  "tentacool": {
    "hp": 40,
    "atk": 40,
    "def": 35,
    "spa": 50,
    "spd": 100,
    "spe": 70
  },
  "tentacruel": {
    "hp": 80,
    "atk": 70,
    "def": 65,
    "spa": 80,
    "spd": 120,
    "spe": 100
  },
  "geodude": {
    "hp": 40,
    "atk": 80,
    "def": 100,
    "spa": 30,
    "spd": 30,
    "spe": 20
  },
  "geodudealola": {
    "hp": 40,
    "atk": 80,
    "def": 100,
    "spa": 30,
    "spd": 30,
    "spe": 20
  },
  "graveler": {
    "hp": 55,
    "atk": 95,
    "def": 115,
    "spa": 45,
    "spd": 45,
    "spe": 35
  },
  "graveleralola": {
    "hp": 55,
    "atk": 95,
    "def": 115,
    "spa": 45,
    "spd": 45,
    "spe": 35
  },
  "golem": {
    "hp": 80,
    "atk": 120,
    "def": 130,
    "spa": 55,
    "spd": 65,
    "spe": 45
  },
  "golemalola": {
    "hp": 80,
    "atk": 120,
    "def": 130,
    "spa": 55,
    "spd": 65,
    "spe": 45
  },
  "ponyta": {
    "hp": 50,
    "atk": 85,
    "def": 55,
    "spa": 65,
    "spd": 65,
    "spe": 90
  },
  "ponytagalar": {
    "hp": 50,
    "atk": 85,
    "def": 55,
    "spa": 65,
    "spd": 65,
    "spe": 90
  },
  "rapidash": {
    "hp": 65,
    "atk": 100,
    "def": 70,
    "spa": 80,
    "spd": 80,
    "spe": 105
  },
  "rapidashgalar": {
    "hp": 65,
    "atk": 100,
    "def": 70,
    "spa": 80,
    "spd": 80,
    "spe": 105
  },
  "slowpoke": {
    "hp": 90,
    "atk": 65,
    "def": 65,
    "spa": 40,
    "spd": 40,
    "spe": 15
  },
  "slowpokegalar": {
    "hp": 90,
    "atk": 65,
    "def": 65,
    "spa": 40,
    "spd": 40,
    "spe": 15
  },
  "slowbro": {
    "hp": 95,
    "atk": 75,
    "def": 110,
    "spa": 100,
    "spd": 80,
    "spe": 30
  },
  "slowbromega": {
    "hp": 95,
    "atk": 75,
    "def": 180,
    "spa": 130,
    "spd": 80,
    "spe": 30
  },
  "magnemite": {
    "hp": 25,
    "atk": 35,
    "def": 70,
    "spa": 95,
    "spd": 55,
    "spe": 45
  },
  "magneton": {
    "hp": 50,
    "atk": 60,
    "def": 95,
    "spa": 120,
    "spd": 70,
    "spe": 70
  },
  "farfetchd": {
    "hp": 52,
    "atk": 90,
    "def": 55,
    "spa": 58,
    "spd": 62,
    "spe": 60
  },
  "farfetchdgalar": {
    "hp": 52,
    "atk": 95,
    "def": 55,
    "spa": 58,
    "spd": 62,
    "spe": 55
  },
  "doduo": {
    "hp": 35,
    "atk": 85,
    "def": 45,
    "spa": 35,
    "spd": 35,
    "spe": 75
  },
  "dodrio": {
    "hp": 60,
    "atk": 110,
    "def": 70,
    "spa": 60,
    "spd": 60,
    "spe": 110
  },
  "seel": {
    "hp": 65,
    "atk": 45,
    "def": 55,
    "spa": 45,
    "spd": 70,
    "spe": 45
  },
  "dewgong": {
    "hp": 90,
    "atk": 70,
    "def": 80,
    "spa": 70,
    "spd": 95,
    "spe": 70
  },
  "grimer": {
    "hp": 80,
    "atk": 80,
    "def": 50,
    "spa": 40,
    "spd": 50,
    "spe": 25
  },
  "grimeralola": {
    "hp": 80,
    "atk": 80,
    "def": 50,
    "spa": 40,
    "spd": 50,
    "spe": 25
  },
  "muk": {
    "hp": 105,
    "atk": 105,
    "def": 75,
    "spa": 65,
    "spd": 100,
    "spe": 50
  },
  "mukalola": {
    "hp": 105,
    "atk": 105,
    "def": 75,
    "spa": 65,
    "spd": 100,
    "spe": 50
  },
  "shellder": {
    "hp": 30,
    "atk": 65,
    "def": 100,
    "spa": 45,
    "spd": 25,
    "spe": 40
  },
  "cloyster": {
    "hp": 50,
    "atk": 95,
    "def": 180,
    "spa": 85,
    "spd": 45,
    "spe": 70
  },
  "gastly": {
    "hp": 30,
    "atk": 35,
    "def": 30,
    "spa": 100,
    "spd": 35,
    "spe": 80
  },
  "haunter": {
    "hp": 45,
    "atk": 50,
    "def": 45,
    "spa": 115,
    "spd": 55,
    "spe": 95
  },
  "gengar": {
    "hp": 60,
    "atk": 65,
    "def": 60,
    "spa": 130,
    "spd": 75,
    "spe": 110
  },
  "gengarmega": {
    "hp": 60,
    "atk": 65,
    "def": 80,
    "spa": 170,
    "spd": 95,
    "spe": 130
  },
  "gengargmax": {
    "hp": 60,
    "atk": 65,
    "def": 60,
    "spa": 130,
    "spd": 75,
    "spe": 110
  },
  "onix": {
    "hp": 35,
    "atk": 45,
    "def": 160,
    "spa": 30,
    "spd": 45,
    "spe": 70
  },
  "drowzee": {
    "hp": 60,
    "atk": 48,
    "def": 45,
    "spa": 43,
    "spd": 90,
    "spe": 42
  },
  "hypno": {
    "hp": 85,
    "atk": 73,
    "def": 70,
    "spa": 73,
    "spd": 115,
    "spe": 67
  },
  "krabby": {
    "hp": 30,
    "atk": 105,
    "def": 90,
    "spa": 25,
    "spd": 25,
    "spe": 50
  },
  "kingler": {
    "hp": 55,
    "atk": 130,
    "def": 115,
    "spa": 50,
    "spd": 50,
    "spe": 75
  },
  "kinglergmax": {
    "hp": 55,
    "atk": 130,
    "def": 115,
    "spa": 50,
    "spd": 50,
    "spe": 75
  },
  "voltorb": {
    "hp": 40,
    "atk": 30,
    "def": 50,
    "spa": 55,
    "spd": 55,
    "spe": 100
  },
  "electrode": {
    "hp": 60,
    "atk": 50,
    "def": 70,
    "spa": 80,
    "spd": 80,
    "spe": 150
  },
  "exeggcute": {
    "hp": 60,
    "atk": 40,
    "def": 80,
    "spa": 60,
    "spd": 45,
    "spe": 40
  },
  "exeggutor": {
    "hp": 95,
    "atk": 95,
    "def": 85,
    "spa": 125,
    "spd": 75,
    "spe": 55
  },
  "exeggutoralola": {
    "hp": 95,
    "atk": 105,
    "def": 85,
    "spa": 125,
    "spd": 75,
    "spe": 45
  },
  "cubone": {
    "hp": 50,
    "atk": 50,
    "def": 95,
    "spa": 40,
    "spd": 50,
    "spe": 35
  },
  "marowak": {
    "hp": 60,
    "atk": 80,
    "def": 110,
    "spa": 50,
    "spd": 80,
    "spe": 45
  },
  "marowakalola": {
    "hp": 60,
    "atk": 80,
    "def": 110,
    "spa": 50,
    "spd": 80,
    "spe": 45
  },
  "marowakalolatotem": {
    "hp": 60,
    "atk": 80,
    "def": 110,
    "spa": 50,
    "spd": 80,
    "spe": 45
  },
  "hitmonlee": {
    "hp": 50,
    "atk": 120,
    "def": 53,
    "spa": 35,
    "spd": 110,
    "spe": 87
  },
  "hitmonchan": {
    "hp": 50,
    "atk": 105,
    "def": 79,
    "spa": 35,
    "spd": 110,
    "spe": 76
  },
  "lickitung": {
    "hp": 90,
    "atk": 55,
    "def": 75,
    "spa": 60,
    "spd": 75,
    "spe": 30
  },
  "koffing": {
    "hp": 40,
    "atk": 65,
    "def": 95,
    "spa": 60,
    "spd": 45,
    "spe": 35
  },
  "weezing": {
    "hp": 65,
    "atk": 90,
    "def": 120,
    "spa": 85,
    "spd": 70,
    "spe": 60
  },
  "weezinggalar": {
    "hp": 65,
    "atk": 90,
    "def": 120,
    "spa": 85,
    "spd": 70,
    "spe": 60
  },
  "rhyhorn": {
    "hp": 80,
    "atk": 85,
    "def": 95,
    "spa": 30,
    "spd": 30,
    "spe": 25
  },
  "rhydon": {
    "hp": 105,
    "atk": 130,
    "def": 120,
    "spa": 45,
    "spd": 45,
    "spe": 40
  },
  "chansey": {
    "hp": 250,
    "atk": 5,
    "def": 5,
    "spa": 35,
    "spd": 105,
    "spe": 50
  },
  "tangela": {
    "hp": 65,
    "atk": 55,
    "def": 115,
    "spa": 100,
    "spd": 40,
    "spe": 60
  },
  "kangaskhan": {
    "hp": 105,
    "atk": 95,
    "def": 80,
    "spa": 40,
    "spd": 80,
    "spe": 90
  },
  "kangaskhanmega": {
    "hp": 105,
    "atk": 125,
    "def": 100,
    "spa": 60,
    "spd": 100,
    "spe": 100
  },
  "horsea": {
    "hp": 30,
    "atk": 40,
    "def": 70,
    "spa": 70,
    "spd": 25,
    "spe": 60
  },
  "seadra": {
    "hp": 55,
    "atk": 65,
    "def": 95,
    "spa": 95,
    "spd": 45,
    "spe": 85
  },
  "goldeen": {
    "hp": 45,
    "atk": 67,
    "def": 60,
    "spa": 35,
    "spd": 50,
    "spe": 63
  },
  "seaking": {
    "hp": 80,
    "atk": 92,
    "def": 65,
    "spa": 65,
    "spd": 80,
    "spe": 68
  },
  "staryu": {
    "hp": 30,
    "atk": 45,
    "def": 55,
    "spa": 70,
    "spd": 55,
    "spe": 85
  },
  "starmie": {
    "hp": 60,
    "atk": 75,
    "def": 85,
    "spa": 100,
    "spd": 85,
    "spe": 115
  },
  "mrmime": {
    "hp": 40,
    "atk": 45,
    "def": 65,
    "spa": 100,
    "spd": 120,
    "spe": 90
  },
  "mrmimegalar": {
    "hp": 50,
    "atk": 65,
    "def": 65,
    "spa": 90,
    "spd": 90,
    "spe": 100
  },
  "scyther": {
    "hp": 70,
    "atk": 110,
    "def": 80,
    "spa": 55,
    "spd": 80,
    "spe": 105
  },
  "jynx": {
    "hp": 65,
    "atk": 50,
    "def": 35,
    "spa": 115,
    "spd": 95,
    "spe": 95
  },
  "electabuzz": {
    "hp": 65,
    "atk": 83,
    "def": 57,
    "spa": 95,
    "spd": 85,
    "spe": 105
  },
  "magmar": {
    "hp": 65,
    "atk": 95,
    "def": 57,
    "spa": 100,
    "spd": 85,
    "spe": 93
  },
  "pinsir": {
    "hp": 65,
    "atk": 125,
    "def": 100,
    "spa": 55,
    "spd": 70,
    "spe": 85
  },
  "pinsirmega": {
    "hp": 65,
    "atk": 155,
    "def": 120,
    "spa": 65,
    "spd": 90,
    "spe": 105
  },
  "tauros": {
    "hp": 75,
    "atk": 100,
    "def": 95,
    "spa": 40,
    "spd": 70,
    "spe": 110
  },
  "magikarp": {
    "hp": 20,
    "atk": 10,
    "def": 55,
    "spa": 15,
    "spd": 20,
    "spe": 80
  },
  "gyarados": {
    "hp": 95,
    "atk": 125,
    "def": 79,
    "spa": 60,
    "spd": 100,
    "spe": 81
  },
  "gyaradosmega": {
    "hp": 95,
    "atk": 155,
    "def": 109,
    "spa": 70,
    "spd": 130,
    "spe": 81
  },
  "lapras": {
    "hp": 130,
    "atk": 85,
    "def": 80,
    "spa": 85,
    "spd": 95,
    "spe": 60
  },
  "laprasgmax": {
    "hp": 130,
    "atk": 85,
    "def": 80,
    "spa": 85,
    "spd": 95,
    "spe": 60
  },
  "ditto": {
    "hp": 48,
    "atk": 48,
    "def": 48,
    "spa": 48,
    "spd": 48,
    "spe": 48
  },
  "eevee": {
    "hp": 55,
    "atk": 55,
    "def": 50,
    "spa": 45,
    "spd": 65,
    "spe": 55
  },
  "eeveestarter": {
    "hp": 65,
    "atk": 75,
    "def": 70,
    "spa": 65,
    "spd": 85,
    "spe": 75
  },
  "eeveegmax": {
    "hp": 55,
    "atk": 55,
    "def": 50,
    "spa": 45,
    "spd": 65,
    "spe": 55
  },
  "vaporeon": {
    "hp": 130,
    "atk": 65,
    "def": 60,
    "spa": 110,
    "spd": 95,
    "spe": 65
  },
  "jolteon": {
    "hp": 65,
    "atk": 65,
    "def": 60,
    "spa": 110,
    "spd": 95,
    "spe": 130
  },
  "flareon": {
    "hp": 65,
    "atk": 130,
    "def": 60,
    "spa": 95,
    "spd": 110,
    "spe": 65
  },
  "porygon": {
    "hp": 65,
    "atk": 60,
    "def": 70,
    "spa": 85,
    "spd": 75,
    "spe": 40
  },
  "omanyte": {
    "hp": 35,
    "atk": 40,
    "def": 100,
    "spa": 90,
    "spd": 55,
    "spe": 35
  },
  "omastar": {
    "hp": 70,
    "atk": 60,
    "def": 125,
    "spa": 115,
    "spd": 70,
    "spe": 55
  },
  "kabuto": {
    "hp": 30,
    "atk": 80,
    "def": 90,
    "spa": 55,
    "spd": 45,
    "spe": 55
  },
  "kabutops": {
    "hp": 60,
    "atk": 115,
    "def": 105,
    "spa": 65,
    "spd": 70,
    "spe": 80
  },
  "aerodactyl": {
    "hp": 80,
    "atk": 105,
    "def": 65,
    "spa": 60,
    "spd": 75,
    "spe": 130
  },
  "aerodactylmega": {
    "hp": 80,
    "atk": 135,
    "def": 85,
    "spa": 70,
    "spd": 95,
    "spe": 150
  },
  "snorlax": {
    "hp": 160,
    "atk": 110,
    "def": 65,
    "spa": 65,
    "spd": 110,
    "spe": 30
  },
  "snorlaxgmax": {
    "hp": 160,
    "atk": 110,
    "def": 65,
    "spa": 65,
    "spd": 110,
    "spe": 30
  },
  "articuno": {
    "hp": 90,
    "atk": 85,
    "def": 100,
    "spa": 95,
    "spd": 125,
    "spe": 85
  },
  "zapdos": {
    "hp": 90,
    "atk": 90,
    "def": 85,
    "spa": 125,
    "spd": 90,
    "spe": 100
  },
  "moltres": {
    "hp": 90,
    "atk": 100,
    "def": 90,
    "spa": 125,
    "spd": 85,
    "spe": 90
  },
  "dratini": {
    "hp": 41,
    "atk": 64,
    "def": 45,
    "spa": 50,
    "spd": 50,
    "spe": 50
  },
  "dragonair": {
    "hp": 61,
    "atk": 84,
    "def": 65,
    "spa": 70,
    "spd": 70,
    "spe": 70
  },
  "dragonite": {
    "hp": 91,
    "atk": 134,
    "def": 95,
    "spa": 100,
    "spd": 100,
    "spe": 80
  },
  "mewtwo": {
    "hp": 106,
    "atk": 110,
    "def": 90,
    "spa": 154,
    "spd": 90,
    "spe": 130
  },
  "mewtwomegax": {
    "hp": 106,
    "atk": 190,
    "def": 100,
    "spa": 154,
    "spd": 100,
    "spe": 130
  },
  "mewtwomegay": {
    "hp": 106,
    "atk": 150,
    "def": 70,
    "spa": 194,
    "spd": 120,
    "spe": 140
  },
  "mew": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "chikorita": {
    "hp": 45,
    "atk": 49,
    "def": 65,
    "spa": 49,
    "spd": 65,
    "spe": 45
  },
  "bayleef": {
    "hp": 60,
    "atk": 62,
    "def": 80,
    "spa": 63,
    "spd": 80,
    "spe": 60
  },
  "meganium": {
    "hp": 80,
    "atk": 82,
    "def": 100,
    "spa": 83,
    "spd": 100,
    "spe": 80
  },
  "cyndaquil": {
    "hp": 39,
    "atk": 52,
    "def": 43,
    "spa": 60,
    "spd": 50,
    "spe": 65
  },
  "quilava": {
    "hp": 58,
    "atk": 64,
    "def": 58,
    "spa": 80,
    "spd": 65,
    "spe": 80
  },
  "typhlosion": {
    "hp": 78,
    "atk": 84,
    "def": 78,
    "spa": 109,
    "spd": 85,
    "spe": 100
  },
  "totodile": {
    "hp": 50,
    "atk": 65,
    "def": 64,
    "spa": 44,
    "spd": 48,
    "spe": 43
  },
  "croconaw": {
    "hp": 65,
    "atk": 80,
    "def": 80,
    "spa": 59,
    "spd": 63,
    "spe": 58
  },
  "feraligatr": {
    "hp": 85,
    "atk": 105,
    "def": 100,
    "spa": 79,
    "spd": 83,
    "spe": 78
  },
  "sentret": {
    "hp": 35,
    "atk": 46,
    "def": 34,
    "spa": 35,
    "spd": 45,
    "spe": 20
  },
  "furret": {
    "hp": 85,
    "atk": 76,
    "def": 64,
    "spa": 45,
    "spd": 55,
    "spe": 90
  },
  "hoothoot": {
    "hp": 60,
    "atk": 30,
    "def": 30,
    "spa": 36,
    "spd": 56,
    "spe": 50
  },
  "noctowl": {
    "hp": 100,
    "atk": 50,
    "def": 50,
    "spa": 86,
    "spd": 96,
    "spe": 70
  },
  "ledyba": {
    "hp": 40,
    "atk": 20,
    "def": 30,
    "spa": 40,
    "spd": 80,
    "spe": 55
  },
  "ledian": {
    "hp": 55,
    "atk": 35,
    "def": 50,
    "spa": 55,
    "spd": 110,
    "spe": 85
  },
  "spinarak": {
    "hp": 40,
    "atk": 60,
    "def": 40,
    "spa": 40,
    "spd": 40,
    "spe": 30
  },
  "ariados": {
    "hp": 70,
    "atk": 90,
    "def": 70,
    "spa": 60,
    "spd": 70,
    "spe": 40
  },
  "crobat": {
    "hp": 85,
    "atk": 90,
    "def": 80,
    "spa": 70,
    "spd": 80,
    "spe": 130
  },
  "chinchou": {
    "hp": 75,
    "atk": 38,
    "def": 38,
    "spa": 56,
    "spd": 56,
    "spe": 67
  },
  "lanturn": {
    "hp": 125,
    "atk": 58,
    "def": 58,
    "spa": 76,
    "spd": 76,
    "spe": 67
  },
  "pichu": {
    "hp": 20,
    "atk": 40,
    "def": 15,
    "spa": 35,
    "spd": 35,
    "spe": 60
  },
  "pichuspikyeared": {
    "hp": 20,
    "atk": 40,
    "def": 15,
    "spa": 35,
    "spd": 35,
    "spe": 60
  },
  "cleffa": {
    "hp": 50,
    "atk": 25,
    "def": 28,
    "spa": 45,
    "spd": 55,
    "spe": 15
  },
  "igglybuff": {
    "hp": 90,
    "atk": 30,
    "def": 15,
    "spa": 40,
    "spd": 20,
    "spe": 15
  },
  "togepi": {
    "hp": 35,
    "atk": 20,
    "def": 65,
    "spa": 40,
    "spd": 65,
    "spe": 20
  },
  "togetic": {
    "hp": 55,
    "atk": 40,
    "def": 85,
    "spa": 80,
    "spd": 105,
    "spe": 40
  },
  "natu": {
    "hp": 40,
    "atk": 50,
    "def": 45,
    "spa": 70,
    "spd": 45,
    "spe": 70
  },
  "xatu": {
    "hp": 65,
    "atk": 75,
    "def": 70,
    "spa": 95,
    "spd": 70,
    "spe": 95
  },
  "mareep": {
    "hp": 55,
    "atk": 40,
    "def": 40,
    "spa": 65,
    "spd": 45,
    "spe": 35
  },
  "flaaffy": {
    "hp": 70,
    "atk": 55,
    "def": 55,
    "spa": 80,
    "spd": 60,
    "spe": 45
  },
  "ampharos": {
    "hp": 90,
    "atk": 75,
    "def": 85,
    "spa": 115,
    "spd": 90,
    "spe": 55
  },
  "ampharosmega": {
    "hp": 90,
    "atk": 95,
    "def": 105,
    "spa": 165,
    "spd": 110,
    "spe": 45
  },
  "bellossom": {
    "hp": 75,
    "atk": 80,
    "def": 95,
    "spa": 90,
    "spd": 100,
    "spe": 50
  },
  "marill": {
    "hp": 70,
    "atk": 20,
    "def": 50,
    "spa": 20,
    "spd": 50,
    "spe": 40
  },
  "azumarill": {
    "hp": 100,
    "atk": 50,
    "def": 80,
    "spa": 60,
    "spd": 80,
    "spe": 50
  },
  "sudowoodo": {
    "hp": 70,
    "atk": 100,
    "def": 115,
    "spa": 30,
    "spd": 65,
    "spe": 30
  },
  "politoed": {
    "hp": 90,
    "atk": 75,
    "def": 75,
    "spa": 90,
    "spd": 100,
    "spe": 70
  },
  "hoppip": {
    "hp": 35,
    "atk": 35,
    "def": 40,
    "spa": 35,
    "spd": 55,
    "spe": 50
  },
  "skiploom": {
    "hp": 55,
    "atk": 45,
    "def": 50,
    "spa": 45,
    "spd": 65,
    "spe": 80
  },
  "jumpluff": {
    "hp": 75,
    "atk": 55,
    "def": 70,
    "spa": 55,
    "spd": 95,
    "spe": 110
  },
  "aipom": {
    "hp": 55,
    "atk": 70,
    "def": 55,
    "spa": 40,
    "spd": 55,
    "spe": 85
  },
  "sunkern": {
    "hp": 30,
    "atk": 30,
    "def": 30,
    "spa": 30,
    "spd": 30,
    "spe": 30
  },
  "sunflora": {
    "hp": 75,
    "atk": 75,
    "def": 55,
    "spa": 105,
    "spd": 85,
    "spe": 30
  },
  "yanma": {
    "hp": 65,
    "atk": 65,
    "def": 45,
    "spa": 75,
    "spd": 45,
    "spe": 95
  },
  "wooper": {
    "hp": 55,
    "atk": 45,
    "def": 45,
    "spa": 25,
    "spd": 25,
    "spe": 15
  },
  "quagsire": {
    "hp": 95,
    "atk": 85,
    "def": 85,
    "spa": 65,
    "spd": 65,
    "spe": 35
  },
  "espeon": {
    "hp": 65,
    "atk": 65,
    "def": 60,
    "spa": 130,
    "spd": 95,
    "spe": 110
  },
  "umbreon": {
    "hp": 95,
    "atk": 65,
    "def": 110,
    "spa": 60,
    "spd": 130,
    "spe": 65
  },
  "murkrow": {
    "hp": 60,
    "atk": 85,
    "def": 42,
    "spa": 85,
    "spd": 42,
    "spe": 91
  },
  "slowking": {
    "hp": 95,
    "atk": 75,
    "def": 80,
    "spa": 100,
    "spd": 110,
    "spe": 30
  },
  "misdreavus": {
    "hp": 60,
    "atk": 60,
    "def": 60,
    "spa": 85,
    "spd": 85,
    "spe": 85
  },
  "unown": {
    "hp": 48,
    "atk": 72,
    "def": 48,
    "spa": 72,
    "spd": 48,
    "spe": 48
  },
  "wobbuffet": {
    "hp": 190,
    "atk": 33,
    "def": 58,
    "spa": 33,
    "spd": 58,
    "spe": 33
  },
  "girafarig": {
    "hp": 70,
    "atk": 80,
    "def": 65,
    "spa": 90,
    "spd": 65,
    "spe": 85
  },
  "pineco": {
    "hp": 50,
    "atk": 65,
    "def": 90,
    "spa": 35,
    "spd": 35,
    "spe": 15
  },
  "forretress": {
    "hp": 75,
    "atk": 90,
    "def": 140,
    "spa": 60,
    "spd": 60,
    "spe": 40
  },
  "dunsparce": {
    "hp": 100,
    "atk": 70,
    "def": 70,
    "spa": 65,
    "spd": 65,
    "spe": 45
  },
  "gligar": {
    "hp": 65,
    "atk": 75,
    "def": 105,
    "spa": 35,
    "spd": 65,
    "spe": 85
  },
  "steelix": {
    "hp": 75,
    "atk": 85,
    "def": 200,
    "spa": 55,
    "spd": 65,
    "spe": 30
  },
  "steelixmega": {
    "hp": 75,
    "atk": 125,
    "def": 230,
    "spa": 55,
    "spd": 95,
    "spe": 30
  },
  "snubbull": {
    "hp": 60,
    "atk": 80,
    "def": 50,
    "spa": 40,
    "spd": 40,
    "spe": 30
  },
  "granbull": {
    "hp": 90,
    "atk": 120,
    "def": 75,
    "spa": 60,
    "spd": 60,
    "spe": 45
  },
  "qwilfish": {
    "hp": 65,
    "atk": 95,
    "def": 85,
    "spa": 55,
    "spd": 55,
    "spe": 85
  },
  "scizor": {
    "hp": 70,
    "atk": 130,
    "def": 100,
    "spa": 55,
    "spd": 80,
    "spe": 65
  },
  "scizormega": {
    "hp": 70,
    "atk": 150,
    "def": 140,
    "spa": 65,
    "spd": 100,
    "spe": 75
  },
  "shuckle": {
    "hp": 20,
    "atk": 10,
    "def": 230,
    "spa": 10,
    "spd": 230,
    "spe": 5
  },
  "heracross": {
    "hp": 80,
    "atk": 125,
    "def": 75,
    "spa": 40,
    "spd": 95,
    "spe": 85
  },
  "heracrossmega": {
    "hp": 80,
    "atk": 185,
    "def": 115,
    "spa": 40,
    "spd": 105,
    "spe": 75
  },
  "sneasel": {
    "hp": 55,
    "atk": 95,
    "def": 55,
    "spa": 35,
    "spd": 75,
    "spe": 115
  },
  "teddiursa": {
    "hp": 60,
    "atk": 80,
    "def": 50,
    "spa": 50,
    "spd": 50,
    "spe": 40
  },
  "ursaring": {
    "hp": 90,
    "atk": 130,
    "def": 75,
    "spa": 75,
    "spd": 75,
    "spe": 55
  },
  "slugma": {
    "hp": 40,
    "atk": 40,
    "def": 40,
    "spa": 70,
    "spd": 40,
    "spe": 20
  },
  "magcargo": {
    "hp": 60,
    "atk": 50,
    "def": 120,
    "spa": 90,
    "spd": 80,
    "spe": 30
  },
  "swinub": {
    "hp": 50,
    "atk": 50,
    "def": 40,
    "spa": 30,
    "spd": 30,
    "spe": 50
  },
  "piloswine": {
    "hp": 100,
    "atk": 100,
    "def": 80,
    "spa": 60,
    "spd": 60,
    "spe": 50
  },
  "corsola": {
    "hp": 65,
    "atk": 55,
    "def": 95,
    "spa": 65,
    "spd": 95,
    "spe": 35
  },
  "corsolagalar": {
    "hp": 60,
    "atk": 55,
    "def": 100,
    "spa": 65,
    "spd": 100,
    "spe": 30
  },
  "remoraid": {
    "hp": 35,
    "atk": 65,
    "def": 35,
    "spa": 65,
    "spd": 35,
    "spe": 65
  },
  "octillery": {
    "hp": 75,
    "atk": 105,
    "def": 75,
    "spa": 105,
    "spd": 75,
    "spe": 45
  },
  "delibird": {
    "hp": 45,
    "atk": 55,
    "def": 45,
    "spa": 65,
    "spd": 45,
    "spe": 75
  },
  "mantine": {
    "hp": 85,
    "atk": 40,
    "def": 70,
    "spa": 80,
    "spd": 140,
    "spe": 70
  },
  "skarmory": {
    "hp": 65,
    "atk": 80,
    "def": 140,
    "spa": 40,
    "spd": 70,
    "spe": 70
  },
  "houndour": {
    "hp": 45,
    "atk": 60,
    "def": 30,
    "spa": 80,
    "spd": 50,
    "spe": 65
  },
  "houndoom": {
    "hp": 75,
    "atk": 90,
    "def": 50,
    "spa": 110,
    "spd": 80,
    "spe": 95
  },
  "houndoommega": {
    "hp": 75,
    "atk": 90,
    "def": 90,
    "spa": 140,
    "spd": 90,
    "spe": 115
  },
  "kingdra": {
    "hp": 75,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 85
  },
  "phanpy": {
    "hp": 90,
    "atk": 60,
    "def": 60,
    "spa": 40,
    "spd": 40,
    "spe": 40
  },
  "donphan": {
    "hp": 90,
    "atk": 120,
    "def": 120,
    "spa": 60,
    "spd": 60,
    "spe": 50
  },
  "porygon2": {
    "hp": 85,
    "atk": 80,
    "def": 90,
    "spa": 105,
    "spd": 95,
    "spe": 60
  },
  "stantler": {
    "hp": 73,
    "atk": 95,
    "def": 62,
    "spa": 85,
    "spd": 65,
    "spe": 85
  },
  "smeargle": {
    "hp": 55,
    "atk": 20,
    "def": 35,
    "spa": 20,
    "spd": 45,
    "spe": 75
  },
  "tyrogue": {
    "hp": 35,
    "atk": 35,
    "def": 35,
    "spa": 35,
    "spd": 35,
    "spe": 35
  },
  "hitmontop": {
    "hp": 50,
    "atk": 95,
    "def": 95,
    "spa": 35,
    "spd": 110,
    "spe": 70
  },
  "smoochum": {
    "hp": 45,
    "atk": 30,
    "def": 15,
    "spa": 85,
    "spd": 65,
    "spe": 65
  },
  "elekid": {
    "hp": 45,
    "atk": 63,
    "def": 37,
    "spa": 65,
    "spd": 55,
    "spe": 95
  },
  "magby": {
    "hp": 45,
    "atk": 75,
    "def": 37,
    "spa": 70,
    "spd": 55,
    "spe": 83
  },
  "miltank": {
    "hp": 95,
    "atk": 80,
    "def": 105,
    "spa": 40,
    "spd": 70,
    "spe": 100
  },
  "blissey": {
    "hp": 255,
    "atk": 10,
    "def": 10,
    "spa": 75,
    "spd": 135,
    "spe": 55
  },
  "raikou": {
    "hp": 90,
    "atk": 85,
    "def": 75,
    "spa": 115,
    "spd": 100,
    "spe": 115
  },
  "entei": {
    "hp": 115,
    "atk": 115,
    "def": 85,
    "spa": 90,
    "spd": 75,
    "spe": 100
  },
  "suicune": {
    "hp": 100,
    "atk": 75,
    "def": 115,
    "spa": 90,
    "spd": 115,
    "spe": 85
  },
  "larvitar": {
    "hp": 50,
    "atk": 64,
    "def": 50,
    "spa": 45,
    "spd": 50,
    "spe": 41
  },
  "pupitar": {
    "hp": 70,
    "atk": 84,
    "def": 70,
    "spa": 65,
    "spd": 70,
    "spe": 51
  },
  "tyranitar": {
    "hp": 100,
    "atk": 134,
    "def": 110,
    "spa": 95,
    "spd": 100,
    "spe": 61
  },
  "tyranitarmega": {
    "hp": 100,
    "atk": 164,
    "def": 150,
    "spa": 95,
    "spd": 120,
    "spe": 71
  },
  "lugia": {
    "hp": 106,
    "atk": 90,
    "def": 130,
    "spa": 90,
    "spd": 154,
    "spe": 110
  },
  "hooh": {
    "hp": 106,
    "atk": 130,
    "def": 90,
    "spa": 110,
    "spd": 154,
    "spe": 90
  },
  "celebi": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "treecko": {
    "hp": 40,
    "atk": 45,
    "def": 35,
    "spa": 65,
    "spd": 55,
    "spe": 70
  },
  "grovyle": {
    "hp": 50,
    "atk": 65,
    "def": 45,
    "spa": 85,
    "spd": 65,
    "spe": 95
  },
  "sceptile": {
    "hp": 70,
    "atk": 85,
    "def": 65,
    "spa": 105,
    "spd": 85,
    "spe": 120
  },
  "sceptilemega": {
    "hp": 70,
    "atk": 110,
    "def": 75,
    "spa": 145,
    "spd": 85,
    "spe": 145
  },
  "torchic": {
    "hp": 45,
    "atk": 60,
    "def": 40,
    "spa": 70,
    "spd": 50,
    "spe": 45
  },
  "combusken": {
    "hp": 60,
    "atk": 85,
    "def": 60,
    "spa": 85,
    "spd": 60,
    "spe": 55
  },
  "blaziken": {
    "hp": 80,
    "atk": 120,
    "def": 70,
    "spa": 110,
    "spd": 70,
    "spe": 80
  },
  "blazikenmega": {
    "hp": 80,
    "atk": 160,
    "def": 80,
    "spa": 130,
    "spd": 80,
    "spe": 100
  },
  "mudkip": {
    "hp": 50,
    "atk": 70,
    "def": 50,
    "spa": 50,
    "spd": 50,
    "spe": 40
  },
  "marshtomp": {
    "hp": 70,
    "atk": 85,
    "def": 70,
    "spa": 60,
    "spd": 70,
    "spe": 50
  },
  "swampert": {
    "hp": 100,
    "atk": 110,
    "def": 90,
    "spa": 85,
    "spd": 90,
    "spe": 60
  },
  "swampertmega": {
    "hp": 100,
    "atk": 150,
    "def": 110,
    "spa": 95,
    "spd": 110,
    "spe": 70
  },
  "poochyena": {
    "hp": 35,
    "atk": 55,
    "def": 35,
    "spa": 30,
    "spd": 30,
    "spe": 35
  },
  "mightyena": {
    "hp": 70,
    "atk": 90,
    "def": 70,
    "spa": 60,
    "spd": 60,
    "spe": 70
  },
  "zigzagoon": {
    "hp": 38,
    "atk": 30,
    "def": 41,
    "spa": 30,
    "spd": 41,
    "spe": 60
  },
  "zigzagoongalar": {
    "hp": 38,
    "atk": 30,
    "def": 41,
    "spa": 30,
    "spd": 41,
    "spe": 60
  },
  "linoone": {
    "hp": 78,
    "atk": 70,
    "def": 61,
    "spa": 50,
    "spd": 61,
    "spe": 100
  },
  "linoonegalar": {
    "hp": 78,
    "atk": 70,
    "def": 61,
    "spa": 50,
    "spd": 61,
    "spe": 100
  },
  "wurmple": {
    "hp": 45,
    "atk": 45,
    "def": 35,
    "spa": 20,
    "spd": 30,
    "spe": 20
  },
  "silcoon": {
    "hp": 50,
    "atk": 35,
    "def": 55,
    "spa": 25,
    "spd": 25,
    "spe": 15
  },
  "beautifly": {
    "hp": 60,
    "atk": 70,
    "def": 50,
    "spa": 100,
    "spd": 50,
    "spe": 65
  },
  "cascoon": {
    "hp": 50,
    "atk": 35,
    "def": 55,
    "spa": 25,
    "spd": 25,
    "spe": 15
  },
  "dustox": {
    "hp": 60,
    "atk": 50,
    "def": 70,
    "spa": 50,
    "spd": 90,
    "spe": 65
  },
  "lotad": {
    "hp": 40,
    "atk": 30,
    "def": 30,
    "spa": 40,
    "spd": 50,
    "spe": 30
  },
  "lombre": {
    "hp": 60,
    "atk": 50,
    "def": 50,
    "spa": 60,
    "spd": 70,
    "spe": 50
  },
  "ludicolo": {
    "hp": 80,
    "atk": 70,
    "def": 70,
    "spa": 90,
    "spd": 100,
    "spe": 70
  },
  "seedot": {
    "hp": 40,
    "atk": 40,
    "def": 50,
    "spa": 30,
    "spd": 30,
    "spe": 30
  },
  "nuzleaf": {
    "hp": 70,
    "atk": 70,
    "def": 40,
    "spa": 60,
    "spd": 40,
    "spe": 60
  },
  "shiftry": {
    "hp": 90,
    "atk": 100,
    "def": 60,
    "spa": 90,
    "spd": 60,
    "spe": 80
  },
  "taillow": {
    "hp": 40,
    "atk": 55,
    "def": 30,
    "spa": 30,
    "spd": 30,
    "spe": 85
  },
  "swellow": {
    "hp": 60,
    "atk": 85,
    "def": 60,
    "spa": 75,
    "spd": 50,
    "spe": 125
  },
  "wingull": {
    "hp": 40,
    "atk": 30,
    "def": 30,
    "spa": 55,
    "spd": 30,
    "spe": 85
  },
  "pelipper": {
    "hp": 60,
    "atk": 50,
    "def": 100,
    "spa": 95,
    "spd": 70,
    "spe": 65
  },
  "ralts": {
    "hp": 28,
    "atk": 25,
    "def": 25,
    "spa": 45,
    "spd": 35,
    "spe": 40
  },
  "kirlia": {
    "hp": 38,
    "atk": 35,
    "def": 35,
    "spa": 65,
    "spd": 55,
    "spe": 50
  },
  "gardevoir": {
    "hp": 68,
    "atk": 65,
    "def": 65,
    "spa": 125,
    "spd": 115,
    "spe": 80
  },
  "gardevoirmega": {
    "hp": 68,
    "atk": 85,
    "def": 65,
    "spa": 165,
    "spd": 135,
    "spe": 100
  },
  "surskit": {
    "hp": 40,
    "atk": 30,
    "def": 32,
    "spa": 50,
    "spd": 52,
    "spe": 65
  },
  "masquerain": {
    "hp": 70,
    "atk": 60,
    "def": 62,
    "spa": 100,
    "spd": 82,
    "spe": 80
  },
  "shroomish": {
    "hp": 60,
    "atk": 40,
    "def": 60,
    "spa": 40,
    "spd": 60,
    "spe": 35
  },
  "breloom": {
    "hp": 60,
    "atk": 130,
    "def": 80,
    "spa": 60,
    "spd": 60,
    "spe": 70
  },
  "slakoth": {
    "hp": 60,
    "atk": 60,
    "def": 60,
    "spa": 35,
    "spd": 35,
    "spe": 30
  },
  "vigoroth": {
    "hp": 80,
    "atk": 80,
    "def": 80,
    "spa": 55,
    "spd": 55,
    "spe": 90
  },
  "slaking": {
    "hp": 150,
    "atk": 160,
    "def": 100,
    "spa": 95,
    "spd": 65,
    "spe": 100
  },
  "nincada": {
    "hp": 31,
    "atk": 45,
    "def": 90,
    "spa": 30,
    "spd": 30,
    "spe": 40
  },
  "ninjask": {
    "hp": 61,
    "atk": 90,
    "def": 45,
    "spa": 50,
    "spd": 50,
    "spe": 160
  },
  "shedinja": {
    "hp": 1,
    "atk": 90,
    "def": 45,
    "spa": 30,
    "spd": 30,
    "spe": 40
  },
  "whismur": {
    "hp": 64,
    "atk": 51,
    "def": 23,
    "spa": 51,
    "spd": 23,
    "spe": 28
  },
  "loudred": {
    "hp": 84,
    "atk": 71,
    "def": 43,
    "spa": 71,
    "spd": 43,
    "spe": 48
  },
  "exploud": {
    "hp": 104,
    "atk": 91,
    "def": 63,
    "spa": 91,
    "spd": 73,
    "spe": 68
  },
  "makuhita": {
    "hp": 72,
    "atk": 60,
    "def": 30,
    "spa": 20,
    "spd": 30,
    "spe": 25
  },
  "hariyama": {
    "hp": 144,
    "atk": 120,
    "def": 60,
    "spa": 40,
    "spd": 60,
    "spe": 50
  },
  "azurill": {
    "hp": 50,
    "atk": 20,
    "def": 40,
    "spa": 20,
    "spd": 40,
    "spe": 20
  },
  "nosepass": {
    "hp": 30,
    "atk": 45,
    "def": 135,
    "spa": 45,
    "spd": 90,
    "spe": 30
  },
  "skitty": {
    "hp": 50,
    "atk": 45,
    "def": 45,
    "spa": 35,
    "spd": 35,
    "spe": 50
  },
  "delcatty": {
    "hp": 70,
    "atk": 65,
    "def": 65,
    "spa": 55,
    "spd": 55,
    "spe": 90
  },
  "sableye": {
    "hp": 50,
    "atk": 75,
    "def": 75,
    "spa": 65,
    "spd": 65,
    "spe": 50
  },
  "sableyemega": {
    "hp": 50,
    "atk": 85,
    "def": 125,
    "spa": 85,
    "spd": 115,
    "spe": 20
  },
  "mawile": {
    "hp": 50,
    "atk": 85,
    "def": 85,
    "spa": 55,
    "spd": 55,
    "spe": 50
  },
  "mawilemega": {
    "hp": 50,
    "atk": 105,
    "def": 125,
    "spa": 55,
    "spd": 95,
    "spe": 50
  },
  "aron": {
    "hp": 50,
    "atk": 70,
    "def": 100,
    "spa": 40,
    "spd": 40,
    "spe": 30
  },
  "lairon": {
    "hp": 60,
    "atk": 90,
    "def": 140,
    "spa": 50,
    "spd": 50,
    "spe": 40
  },
  "aggron": {
    "hp": 70,
    "atk": 110,
    "def": 180,
    "spa": 60,
    "spd": 60,
    "spe": 50
  },
  "aggronmega": {
    "hp": 70,
    "atk": 140,
    "def": 230,
    "spa": 60,
    "spd": 80,
    "spe": 50
  },
  "meditite": {
    "hp": 30,
    "atk": 40,
    "def": 55,
    "spa": 40,
    "spd": 55,
    "spe": 60
  },
  "medicham": {
    "hp": 60,
    "atk": 60,
    "def": 75,
    "spa": 60,
    "spd": 75,
    "spe": 80
  },
  "medichammega": {
    "hp": 60,
    "atk": 100,
    "def": 85,
    "spa": 80,
    "spd": 85,
    "spe": 100
  },
  "electrike": {
    "hp": 40,
    "atk": 45,
    "def": 40,
    "spa": 65,
    "spd": 40,
    "spe": 65
  },
  "manectric": {
    "hp": 70,
    "atk": 75,
    "def": 60,
    "spa": 105,
    "spd": 60,
    "spe": 105
  },
  "manectricmega": {
    "hp": 70,
    "atk": 75,
    "def": 80,
    "spa": 135,
    "spd": 80,
    "spe": 135
  },
  "plusle": {
    "hp": 60,
    "atk": 50,
    "def": 40,
    "spa": 85,
    "spd": 75,
    "spe": 95
  },
  "minun": {
    "hp": 60,
    "atk": 40,
    "def": 50,
    "spa": 75,
    "spd": 85,
    "spe": 95
  },
  "volbeat": {
    "hp": 65,
    "atk": 73,
    "def": 75,
    "spa": 47,
    "spd": 85,
    "spe": 85
  },
  "illumise": {
    "hp": 65,
    "atk": 47,
    "def": 75,
    "spa": 73,
    "spd": 85,
    "spe": 85
  },
  "roselia": {
    "hp": 50,
    "atk": 60,
    "def": 45,
    "spa": 100,
    "spd": 80,
    "spe": 65
  },
  "gulpin": {
    "hp": 70,
    "atk": 43,
    "def": 53,
    "spa": 43,
    "spd": 53,
    "spe": 40
  },
  "swalot": {
    "hp": 100,
    "atk": 73,
    "def": 83,
    "spa": 73,
    "spd": 83,
    "spe": 55
  },
  "carvanha": {
    "hp": 45,
    "atk": 90,
    "def": 20,
    "spa": 65,
    "spd": 20,
    "spe": 65
  },
  "sharpedo": {
    "hp": 70,
    "atk": 120,
    "def": 40,
    "spa": 95,
    "spd": 40,
    "spe": 95
  },
  "sharpedomega": {
    "hp": 70,
    "atk": 140,
    "def": 70,
    "spa": 110,
    "spd": 65,
    "spe": 105
  },
  "wailmer": {
    "hp": 130,
    "atk": 70,
    "def": 35,
    "spa": 70,
    "spd": 35,
    "spe": 60
  },
  "wailord": {
    "hp": 170,
    "atk": 90,
    "def": 45,
    "spa": 90,
    "spd": 45,
    "spe": 60
  },
  "numel": {
    "hp": 60,
    "atk": 60,
    "def": 40,
    "spa": 65,
    "spd": 45,
    "spe": 35
  },
  "camerupt": {
    "hp": 70,
    "atk": 100,
    "def": 70,
    "spa": 105,
    "spd": 75,
    "spe": 40
  },
  "cameruptmega": {
    "hp": 70,
    "atk": 120,
    "def": 100,
    "spa": 145,
    "spd": 105,
    "spe": 20
  },
  "torkoal": {
    "hp": 70,
    "atk": 85,
    "def": 140,
    "spa": 85,
    "spd": 70,
    "spe": 20
  },
  "spoink": {
    "hp": 60,
    "atk": 25,
    "def": 35,
    "spa": 70,
    "spd": 80,
    "spe": 60
  },
  "grumpig": {
    "hp": 80,
    "atk": 45,
    "def": 65,
    "spa": 90,
    "spd": 110,
    "spe": 80
  },
  "spinda": {
    "hp": 60,
    "atk": 60,
    "def": 60,
    "spa": 60,
    "spd": 60,
    "spe": 60
  },
  "trapinch": {
    "hp": 45,
    "atk": 100,
    "def": 45,
    "spa": 45,
    "spd": 45,
    "spe": 10
  },
  "vibrava": {
    "hp": 50,
    "atk": 70,
    "def": 50,
    "spa": 50,
    "spd": 50,
    "spe": 70
  },
  "flygon": {
    "hp": 80,
    "atk": 100,
    "def": 80,
    "spa": 80,
    "spd": 80,
    "spe": 100
  },
  "cacnea": {
    "hp": 50,
    "atk": 85,
    "def": 40,
    "spa": 85,
    "spd": 40,
    "spe": 35
  },
  "cacturne": {
    "hp": 70,
    "atk": 115,
    "def": 60,
    "spa": 115,
    "spd": 60,
    "spe": 55
  },
  "swablu": {
    "hp": 45,
    "atk": 40,
    "def": 60,
    "spa": 40,
    "spd": 75,
    "spe": 50
  },
  "altaria": {
    "hp": 75,
    "atk": 70,
    "def": 90,
    "spa": 70,
    "spd": 105,
    "spe": 80
  },
  "altariamega": {
    "hp": 75,
    "atk": 110,
    "def": 110,
    "spa": 110,
    "spd": 105,
    "spe": 80
  },
  "zangoose": {
    "hp": 73,
    "atk": 115,
    "def": 60,
    "spa": 60,
    "spd": 60,
    "spe": 90
  },
  "seviper": {
    "hp": 73,
    "atk": 100,
    "def": 60,
    "spa": 100,
    "spd": 60,
    "spe": 65
  },
  "lunatone": {
    "hp": 90,
    "atk": 55,
    "def": 65,
    "spa": 95,
    "spd": 85,
    "spe": 70
  },
  "solrock": {
    "hp": 90,
    "atk": 95,
    "def": 85,
    "spa": 55,
    "spd": 65,
    "spe": 70
  },
  "barboach": {
    "hp": 50,
    "atk": 48,
    "def": 43,
    "spa": 46,
    "spd": 41,
    "spe": 60
  },
  "whiscash": {
    "hp": 110,
    "atk": 78,
    "def": 73,
    "spa": 76,
    "spd": 71,
    "spe": 60
  },
  "corphish": {
    "hp": 43,
    "atk": 80,
    "def": 65,
    "spa": 50,
    "spd": 35,
    "spe": 35
  },
  "crawdaunt": {
    "hp": 63,
    "atk": 120,
    "def": 85,
    "spa": 90,
    "spd": 55,
    "spe": 55
  },
  "baltoy": {
    "hp": 40,
    "atk": 40,
    "def": 55,
    "spa": 40,
    "spd": 70,
    "spe": 55
  },
  "claydol": {
    "hp": 60,
    "atk": 70,
    "def": 105,
    "spa": 70,
    "spd": 120,
    "spe": 75
  },
  "lileep": {
    "hp": 66,
    "atk": 41,
    "def": 77,
    "spa": 61,
    "spd": 87,
    "spe": 23
  },
  "cradily": {
    "hp": 86,
    "atk": 81,
    "def": 97,
    "spa": 81,
    "spd": 107,
    "spe": 43
  },
  "anorith": {
    "hp": 45,
    "atk": 95,
    "def": 50,
    "spa": 40,
    "spd": 50,
    "spe": 75
  },
  "armaldo": {
    "hp": 75,
    "atk": 125,
    "def": 100,
    "spa": 70,
    "spd": 80,
    "spe": 45
  },
  "feebas": {
    "hp": 20,
    "atk": 15,
    "def": 20,
    "spa": 10,
    "spd": 55,
    "spe": 80
  },
  "milotic": {
    "hp": 95,
    "atk": 60,
    "def": 79,
    "spa": 100,
    "spd": 125,
    "spe": 81
  },
  "castform": {
    "hp": 70,
    "atk": 70,
    "def": 70,
    "spa": 70,
    "spd": 70,
    "spe": 70
  },
  "castformsunny": {
    "hp": 70,
    "atk": 70,
    "def": 70,
    "spa": 70,
    "spd": 70,
    "spe": 70
  },
  "castformrainy": {
    "hp": 70,
    "atk": 70,
    "def": 70,
    "spa": 70,
    "spd": 70,
    "spe": 70
  },
  "castformsnowy": {
    "hp": 70,
    "atk": 70,
    "def": 70,
    "spa": 70,
    "spd": 70,
    "spe": 70
  },
  "kecleon": {
    "hp": 60,
    "atk": 90,
    "def": 70,
    "spa": 60,
    "spd": 120,
    "spe": 40
  },
  "shuppet": {
    "hp": 44,
    "atk": 75,
    "def": 35,
    "spa": 63,
    "spd": 33,
    "spe": 45
  },
  "banette": {
    "hp": 64,
    "atk": 115,
    "def": 65,
    "spa": 83,
    "spd": 63,
    "spe": 65
  },
  "banettemega": {
    "hp": 64,
    "atk": 165,
    "def": 75,
    "spa": 93,
    "spd": 83,
    "spe": 75
  },
  "duskull": {
    "hp": 20,
    "atk": 40,
    "def": 90,
    "spa": 30,
    "spd": 90,
    "spe": 25
  },
  "dusclops": {
    "hp": 40,
    "atk": 70,
    "def": 130,
    "spa": 60,
    "spd": 130,
    "spe": 25
  },
  "tropius": {
    "hp": 99,
    "atk": 68,
    "def": 83,
    "spa": 72,
    "spd": 87,
    "spe": 51
  },
  "chimecho": {
    "hp": 75,
    "atk": 50,
    "def": 80,
    "spa": 95,
    "spd": 90,
    "spe": 65
  },
  "absol": {
    "hp": 65,
    "atk": 130,
    "def": 60,
    "spa": 75,
    "spd": 60,
    "spe": 75
  },
  "absolmega": {
    "hp": 65,
    "atk": 150,
    "def": 60,
    "spa": 115,
    "spd": 60,
    "spe": 115
  },
  "wynaut": {
    "hp": 95,
    "atk": 23,
    "def": 48,
    "spa": 23,
    "spd": 48,
    "spe": 23
  },
  "snorunt": {
    "hp": 50,
    "atk": 50,
    "def": 50,
    "spa": 50,
    "spd": 50,
    "spe": 50
  },
  "glalie": {
    "hp": 80,
    "atk": 80,
    "def": 80,
    "spa": 80,
    "spd": 80,
    "spe": 80
  },
  "glaliemega": {
    "hp": 80,
    "atk": 120,
    "def": 80,
    "spa": 120,
    "spd": 80,
    "spe": 100
  },
  "spheal": {
    "hp": 70,
    "atk": 40,
    "def": 50,
    "spa": 55,
    "spd": 50,
    "spe": 25
  },
  "sealeo": {
    "hp": 90,
    "atk": 60,
    "def": 70,
    "spa": 75,
    "spd": 70,
    "spe": 45
  },
  "walrein": {
    "hp": 110,
    "atk": 80,
    "def": 90,
    "spa": 95,
    "spd": 90,
    "spe": 65
  },
  "clamperl": {
    "hp": 35,
    "atk": 64,
    "def": 85,
    "spa": 74,
    "spd": 55,
    "spe": 32
  },
  "huntail": {
    "hp": 55,
    "atk": 104,
    "def": 105,
    "spa": 94,
    "spd": 75,
    "spe": 52
  },
  "gorebyss": {
    "hp": 55,
    "atk": 84,
    "def": 105,
    "spa": 114,
    "spd": 75,
    "spe": 52
  },
  "relicanth": {
    "hp": 100,
    "atk": 90,
    "def": 130,
    "spa": 45,
    "spd": 65,
    "spe": 55
  },
  "luvdisc": {
    "hp": 43,
    "atk": 30,
    "def": 55,
    "spa": 40,
    "spd": 65,
    "spe": 97
  },
  "bagon": {
    "hp": 45,
    "atk": 75,
    "def": 60,
    "spa": 40,
    "spd": 30,
    "spe": 50
  },
  "shelgon": {
    "hp": 65,
    "atk": 95,
    "def": 100,
    "spa": 60,
    "spd": 50,
    "spe": 50
  },
  "salamence": {
    "hp": 95,
    "atk": 135,
    "def": 80,
    "spa": 110,
    "spd": 80,
    "spe": 100
  },
  "salamencemega": {
    "hp": 95,
    "atk": 145,
    "def": 130,
    "spa": 120,
    "spd": 90,
    "spe": 120
  },
  "beldum": {
    "hp": 40,
    "atk": 55,
    "def": 80,
    "spa": 35,
    "spd": 60,
    "spe": 30
  },
  "metang": {
    "hp": 60,
    "atk": 75,
    "def": 100,
    "spa": 55,
    "spd": 80,
    "spe": 50
  },
  "metagross": {
    "hp": 80,
    "atk": 135,
    "def": 130,
    "spa": 95,
    "spd": 90,
    "spe": 70
  },
  "metagrossmega": {
    "hp": 80,
    "atk": 145,
    "def": 150,
    "spa": 105,
    "spd": 110,
    "spe": 110
  },
  "regirock": {
    "hp": 80,
    "atk": 100,
    "def": 200,
    "spa": 50,
    "spd": 100,
    "spe": 50
  },
  "regice": {
    "hp": 80,
    "atk": 50,
    "def": 100,
    "spa": 100,
    "spd": 200,
    "spe": 50
  },
  "registeel": {
    "hp": 80,
    "atk": 75,
    "def": 150,
    "spa": 75,
    "spd": 150,
    "spe": 50
  },
  "latias": {
    "hp": 80,
    "atk": 80,
    "def": 90,
    "spa": 110,
    "spd": 130,
    "spe": 110
  },
  "latiasmega": {
    "hp": 80,
    "atk": 100,
    "def": 120,
    "spa": 140,
    "spd": 150,
    "spe": 110
  },
  "latios": {
    "hp": 80,
    "atk": 90,
    "def": 80,
    "spa": 130,
    "spd": 110,
    "spe": 110
  },
  "latiosmega": {
    "hp": 80,
    "atk": 130,
    "def": 100,
    "spa": 160,
    "spd": 120,
    "spe": 110
  },
  "kyogre": {
    "hp": 100,
    "atk": 100,
    "def": 90,
    "spa": 150,
    "spd": 140,
    "spe": 90
  },
  "kyogreprimal": {
    "hp": 100,
    "atk": 150,
    "def": 90,
    "spa": 180,
    "spd": 160,
    "spe": 90
  },
  "groudon": {
    "hp": 100,
    "atk": 150,
    "def": 140,
    "spa": 100,
    "spd": 90,
    "spe": 90
  },
  "groudonprimal": {
    "hp": 100,
    "atk": 180,
    "def": 160,
    "spa": 150,
    "spd": 90,
    "spe": 90
  },
  "rayquaza": {
    "hp": 105,
    "atk": 150,
    "def": 90,
    "spa": 150,
    "spd": 90,
    "spe": 95
  },
  "rayquazamega": {
    "hp": 105,
    "atk": 180,
    "def": 100,
    "spa": 180,
    "spd": 100,
    "spe": 115
  },
  "jirachi": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "deoxys": {
    "hp": 50,
    "atk": 150,
    "def": 50,
    "spa": 150,
    "spd": 50,
    "spe": 150
  },
  "deoxysattack": {
    "hp": 50,
    "atk": 180,
    "def": 20,
    "spa": 180,
    "spd": 20,
    "spe": 150
  },
  "deoxysdefense": {
    "hp": 50,
    "atk": 70,
    "def": 160,
    "spa": 70,
    "spd": 160,
    "spe": 90
  },
  "deoxysspeed": {
    "hp": 50,
    "atk": 95,
    "def": 90,
    "spa": 95,
    "spd": 90,
    "spe": 180
  },
  "turtwig": {
    "hp": 55,
    "atk": 68,
    "def": 64,
    "spa": 45,
    "spd": 55,
    "spe": 31
  },
  "grotle": {
    "hp": 75,
    "atk": 89,
    "def": 85,
    "spa": 55,
    "spd": 65,
    "spe": 36
  },
  "torterra": {
    "hp": 95,
    "atk": 109,
    "def": 105,
    "spa": 75,
    "spd": 85,
    "spe": 56
  },
  "chimchar": {
    "hp": 44,
    "atk": 58,
    "def": 44,
    "spa": 58,
    "spd": 44,
    "spe": 61
  },
  "monferno": {
    "hp": 64,
    "atk": 78,
    "def": 52,
    "spa": 78,
    "spd": 52,
    "spe": 81
  },
  "infernape": {
    "hp": 76,
    "atk": 104,
    "def": 71,
    "spa": 104,
    "spd": 71,
    "spe": 108
  },
  "piplup": {
    "hp": 53,
    "atk": 51,
    "def": 53,
    "spa": 61,
    "spd": 56,
    "spe": 40
  },
  "prinplup": {
    "hp": 64,
    "atk": 66,
    "def": 68,
    "spa": 81,
    "spd": 76,
    "spe": 50
  },
  "empoleon": {
    "hp": 84,
    "atk": 86,
    "def": 88,
    "spa": 111,
    "spd": 101,
    "spe": 60
  },
  "starly": {
    "hp": 40,
    "atk": 55,
    "def": 30,
    "spa": 30,
    "spd": 30,
    "spe": 60
  },
  "staravia": {
    "hp": 55,
    "atk": 75,
    "def": 50,
    "spa": 40,
    "spd": 40,
    "spe": 80
  },
  "staraptor": {
    "hp": 85,
    "atk": 120,
    "def": 70,
    "spa": 50,
    "spd": 60,
    "spe": 100
  },
  "bidoof": {
    "hp": 59,
    "atk": 45,
    "def": 40,
    "spa": 35,
    "spd": 40,
    "spe": 31
  },
  "bibarel": {
    "hp": 79,
    "atk": 85,
    "def": 60,
    "spa": 55,
    "spd": 60,
    "spe": 71
  },
  "kricketot": {
    "hp": 37,
    "atk": 25,
    "def": 41,
    "spa": 25,
    "spd": 41,
    "spe": 25
  },
  "kricketune": {
    "hp": 77,
    "atk": 85,
    "def": 51,
    "spa": 55,
    "spd": 51,
    "spe": 65
  },
  "shinx": {
    "hp": 45,
    "atk": 65,
    "def": 34,
    "spa": 40,
    "spd": 34,
    "spe": 45
  },
  "luxio": {
    "hp": 60,
    "atk": 85,
    "def": 49,
    "spa": 60,
    "spd": 49,
    "spe": 60
  },
  "luxray": {
    "hp": 80,
    "atk": 120,
    "def": 79,
    "spa": 95,
    "spd": 79,
    "spe": 70
  },
  "budew": {
    "hp": 40,
    "atk": 30,
    "def": 35,
    "spa": 50,
    "spd": 70,
    "spe": 55
  },
  "roserade": {
    "hp": 60,
    "atk": 70,
    "def": 65,
    "spa": 125,
    "spd": 105,
    "spe": 90
  },
  "cranidos": {
    "hp": 67,
    "atk": 125,
    "def": 40,
    "spa": 30,
    "spd": 30,
    "spe": 58
  },
  "rampardos": {
    "hp": 97,
    "atk": 165,
    "def": 60,
    "spa": 65,
    "spd": 50,
    "spe": 58
  },
  "shieldon": {
    "hp": 30,
    "atk": 42,
    "def": 118,
    "spa": 42,
    "spd": 88,
    "spe": 30
  },
  "bastiodon": {
    "hp": 60,
    "atk": 52,
    "def": 168,
    "spa": 47,
    "spd": 138,
    "spe": 30
  },
  "burmy": {
    "hp": 40,
    "atk": 29,
    "def": 45,
    "spa": 29,
    "spd": 45,
    "spe": 36
  },
  "wormadam": {
    "hp": 60,
    "atk": 59,
    "def": 85,
    "spa": 79,
    "spd": 105,
    "spe": 36
  },
  "wormadamsandy": {
    "hp": 60,
    "atk": 79,
    "def": 105,
    "spa": 59,
    "spd": 85,
    "spe": 36
  },
  "wormadamtrash": {
    "hp": 60,
    "atk": 69,
    "def": 95,
    "spa": 69,
    "spd": 95,
    "spe": 36
  },
  "mothim": {
    "hp": 70,
    "atk": 94,
    "def": 50,
    "spa": 94,
    "spd": 50,
    "spe": 66
  },
  "combee": {
    "hp": 30,
    "atk": 30,
    "def": 42,
    "spa": 30,
    "spd": 42,
    "spe": 70
  },
  "vespiquen": {
    "hp": 70,
    "atk": 80,
    "def": 102,
    "spa": 80,
    "spd": 102,
    "spe": 40
  },
  "pachirisu": {
    "hp": 60,
    "atk": 45,
    "def": 70,
    "spa": 45,
    "spd": 90,
    "spe": 95
  },
  "buizel": {
    "hp": 55,
    "atk": 65,
    "def": 35,
    "spa": 60,
    "spd": 30,
    "spe": 85
  },
  "floatzel": {
    "hp": 85,
    "atk": 105,
    "def": 55,
    "spa": 85,
    "spd": 50,
    "spe": 115
  },
  "cherubi": {
    "hp": 45,
    "atk": 35,
    "def": 45,
    "spa": 62,
    "spd": 53,
    "spe": 35
  },
  "cherrim": {
    "hp": 70,
    "atk": 60,
    "def": 70,
    "spa": 87,
    "spd": 78,
    "spe": 85
  },
  "cherrimsunshine": {
    "hp": 70,
    "atk": 60,
    "def": 70,
    "spa": 87,
    "spd": 78,
    "spe": 85
  },
  "shellos": {
    "hp": 76,
    "atk": 48,
    "def": 48,
    "spa": 57,
    "spd": 62,
    "spe": 34
  },
  "gastrodon": {
    "hp": 111,
    "atk": 83,
    "def": 68,
    "spa": 92,
    "spd": 82,
    "spe": 39
  },
  "ambipom": {
    "hp": 75,
    "atk": 100,
    "def": 66,
    "spa": 60,
    "spd": 66,
    "spe": 115
  },
  "drifloon": {
    "hp": 90,
    "atk": 50,
    "def": 34,
    "spa": 60,
    "spd": 44,
    "spe": 70
  },
  "drifblim": {
    "hp": 150,
    "atk": 80,
    "def": 44,
    "spa": 90,
    "spd": 54,
    "spe": 80
  },
  "buneary": {
    "hp": 55,
    "atk": 66,
    "def": 44,
    "spa": 44,
    "spd": 56,
    "spe": 85
  },
  "lopunny": {
    "hp": 65,
    "atk": 76,
    "def": 84,
    "spa": 54,
    "spd": 96,
    "spe": 105
  },
  "lopunnymega": {
    "hp": 65,
    "atk": 136,
    "def": 94,
    "spa": 54,
    "spd": 96,
    "spe": 135
  },
  "mismagius": {
    "hp": 60,
    "atk": 60,
    "def": 60,
    "spa": 105,
    "spd": 105,
    "spe": 105
  },
  "honchkrow": {
    "hp": 100,
    "atk": 125,
    "def": 52,
    "spa": 105,
    "spd": 52,
    "spe": 71
  },
  "glameow": {
    "hp": 49,
    "atk": 55,
    "def": 42,
    "spa": 42,
    "spd": 37,
    "spe": 85
  },
  "purugly": {
    "hp": 71,
    "atk": 82,
    "def": 64,
    "spa": 64,
    "spd": 59,
    "spe": 112
  },
  "chingling": {
    "hp": 45,
    "atk": 30,
    "def": 50,
    "spa": 65,
    "spd": 50,
    "spe": 45
  },
  "stunky": {
    "hp": 63,
    "atk": 63,
    "def": 47,
    "spa": 41,
    "spd": 41,
    "spe": 74
  },
  "skuntank": {
    "hp": 103,
    "atk": 93,
    "def": 67,
    "spa": 71,
    "spd": 61,
    "spe": 84
  },
  "bronzor": {
    "hp": 57,
    "atk": 24,
    "def": 86,
    "spa": 24,
    "spd": 86,
    "spe": 23
  },
  "bronzong": {
    "hp": 67,
    "atk": 89,
    "def": 116,
    "spa": 79,
    "spd": 116,
    "spe": 33
  },
  "bonsly": {
    "hp": 50,
    "atk": 80,
    "def": 95,
    "spa": 10,
    "spd": 45,
    "spe": 10
  },
  "mimejr": {
    "hp": 20,
    "atk": 25,
    "def": 45,
    "spa": 70,
    "spd": 90,
    "spe": 60
  },
  "happiny": {
    "hp": 100,
    "atk": 5,
    "def": 5,
    "spa": 15,
    "spd": 65,
    "spe": 30
  },
  "chatot": {
    "hp": 76,
    "atk": 65,
    "def": 45,
    "spa": 92,
    "spd": 42,
    "spe": 91
  },
  "spiritomb": {
    "hp": 50,
    "atk": 92,
    "def": 108,
    "spa": 92,
    "spd": 108,
    "spe": 35
  },
  "gible": {
    "hp": 58,
    "atk": 70,
    "def": 45,
    "spa": 40,
    "spd": 45,
    "spe": 42
  },
  "gabite": {
    "hp": 68,
    "atk": 90,
    "def": 65,
    "spa": 50,
    "spd": 55,
    "spe": 82
  },
  "garchomp": {
    "hp": 108,
    "atk": 130,
    "def": 95,
    "spa": 80,
    "spd": 85,
    "spe": 102
  },
  "garchompmega": {
    "hp": 108,
    "atk": 170,
    "def": 115,
    "spa": 120,
    "spd": 95,
    "spe": 92
  },
  "munchlax": {
    "hp": 135,
    "atk": 85,
    "def": 40,
    "spa": 40,
    "spd": 85,
    "spe": 5
  },
  "riolu": {
    "hp": 40,
    "atk": 70,
    "def": 40,
    "spa": 35,
    "spd": 40,
    "spe": 60
  },
  "lucario": {
    "hp": 70,
    "atk": 110,
    "def": 70,
    "spa": 115,
    "spd": 70,
    "spe": 90
  },
  "lucariomega": {
    "hp": 70,
    "atk": 145,
    "def": 88,
    "spa": 140,
    "spd": 70,
    "spe": 112
  },
  "hippopotas": {
    "hp": 68,
    "atk": 72,
    "def": 78,
    "spa": 38,
    "spd": 42,
    "spe": 32
  },
  "hippowdon": {
    "hp": 108,
    "atk": 112,
    "def": 118,
    "spa": 68,
    "spd": 72,
    "spe": 47
  },
  "skorupi": {
    "hp": 40,
    "atk": 50,
    "def": 90,
    "spa": 30,
    "spd": 55,
    "spe": 65
  },
  "drapion": {
    "hp": 70,
    "atk": 90,
    "def": 110,
    "spa": 60,
    "spd": 75,
    "spe": 95
  },
  "croagunk": {
    "hp": 48,
    "atk": 61,
    "def": 40,
    "spa": 61,
    "spd": 40,
    "spe": 50
  },
  "toxicroak": {
    "hp": 83,
    "atk": 106,
    "def": 65,
    "spa": 86,
    "spd": 65,
    "spe": 85
  },
  "carnivine": {
    "hp": 74,
    "atk": 100,
    "def": 72,
    "spa": 90,
    "spd": 72,
    "spe": 46
  },
  "finneon": {
    "hp": 49,
    "atk": 49,
    "def": 56,
    "spa": 49,
    "spd": 61,
    "spe": 66
  },
  "lumineon": {
    "hp": 69,
    "atk": 69,
    "def": 76,
    "spa": 69,
    "spd": 86,
    "spe": 91
  },
  "mantyke": {
    "hp": 45,
    "atk": 20,
    "def": 50,
    "spa": 60,
    "spd": 120,
    "spe": 50
  },
  "snover": {
    "hp": 60,
    "atk": 62,
    "def": 50,
    "spa": 62,
    "spd": 60,
    "spe": 40
  },
  "abomasnow": {
    "hp": 90,
    "atk": 92,
    "def": 75,
    "spa": 92,
    "spd": 85,
    "spe": 60
  },
  "abomasnowmega": {
    "hp": 90,
    "atk": 132,
    "def": 105,
    "spa": 132,
    "spd": 105,
    "spe": 30
  },
  "weavile": {
    "hp": 70,
    "atk": 120,
    "def": 65,
    "spa": 45,
    "spd": 85,
    "spe": 125
  },
  "magnezone": {
    "hp": 70,
    "atk": 70,
    "def": 115,
    "spa": 130,
    "spd": 90,
    "spe": 60
  },
  "lickilicky": {
    "hp": 110,
    "atk": 85,
    "def": 95,
    "spa": 80,
    "spd": 95,
    "spe": 50
  },
  "rhyperior": {
    "hp": 115,
    "atk": 140,
    "def": 130,
    "spa": 55,
    "spd": 55,
    "spe": 40
  },
  "tangrowth": {
    "hp": 100,
    "atk": 100,
    "def": 125,
    "spa": 110,
    "spd": 50,
    "spe": 50
  },
  "electivire": {
    "hp": 75,
    "atk": 123,
    "def": 67,
    "spa": 95,
    "spd": 85,
    "spe": 95
  },
  "magmortar": {
    "hp": 75,
    "atk": 95,
    "def": 67,
    "spa": 125,
    "spd": 95,
    "spe": 83
  },
  "togekiss": {
    "hp": 85,
    "atk": 50,
    "def": 95,
    "spa": 120,
    "spd": 115,
    "spe": 80
  },
  "yanmega": {
    "hp": 86,
    "atk": 76,
    "def": 86,
    "spa": 116,
    "spd": 56,
    "spe": 95
  },
  "leafeon": {
    "hp": 65,
    "atk": 110,
    "def": 130,
    "spa": 60,
    "spd": 65,
    "spe": 95
  },
  "glaceon": {
    "hp": 65,
    "atk": 60,
    "def": 110,
    "spa": 130,
    "spd": 95,
    "spe": 65
  },
  "gliscor": {
    "hp": 75,
    "atk": 95,
    "def": 125,
    "spa": 45,
    "spd": 75,
    "spe": 95
  },
  "mamoswine": {
    "hp": 110,
    "atk": 130,
    "def": 80,
    "spa": 70,
    "spd": 60,
    "spe": 80
  },
  "porygonz": {
    "hp": 85,
    "atk": 80,
    "def": 70,
    "spa": 135,
    "spd": 75,
    "spe": 90
  },
  "gallade": {
    "hp": 68,
    "atk": 125,
    "def": 65,
    "spa": 65,
    "spd": 115,
    "spe": 80
  },
  "gallademega": {
    "hp": 68,
    "atk": 165,
    "def": 95,
    "spa": 65,
    "spd": 115,
    "spe": 110
  },
  "probopass": {
    "hp": 60,
    "atk": 55,
    "def": 145,
    "spa": 75,
    "spd": 150,
    "spe": 40
  },
  "dusknoir": {
    "hp": 45,
    "atk": 100,
    "def": 135,
    "spa": 65,
    "spd": 135,
    "spe": 45
  },
  "froslass": {
    "hp": 70,
    "atk": 80,
    "def": 70,
    "spa": 80,
    "spd": 70,
    "spe": 110
  },
  "rotom": {
    "hp": 50,
    "atk": 50,
    "def": 77,
    "spa": 95,
    "spd": 77,
    "spe": 91
  },
  "rotomheat": {
    "hp": 50,
    "atk": 65,
    "def": 107,
    "spa": 105,
    "spd": 107,
    "spe": 86
  },
  "rotomwash": {
    "hp": 50,
    "atk": 65,
    "def": 107,
    "spa": 105,
    "spd": 107,
    "spe": 86
  },
  "rotomfrost": {
    "hp": 50,
    "atk": 65,
    "def": 107,
    "spa": 105,
    "spd": 107,
    "spe": 86
  },
  "rotomfan": {
    "hp": 50,
    "atk": 65,
    "def": 107,
    "spa": 105,
    "spd": 107,
    "spe": 86
  },
  "rotommow": {
    "hp": 50,
    "atk": 65,
    "def": 107,
    "spa": 105,
    "spd": 107,
    "spe": 86
  },
  "uxie": {
    "hp": 75,
    "atk": 75,
    "def": 130,
    "spa": 75,
    "spd": 130,
    "spe": 95
  },
  "mesprit": {
    "hp": 80,
    "atk": 105,
    "def": 105,
    "spa": 105,
    "spd": 105,
    "spe": 80
  },
  "azelf": {
    "hp": 75,
    "atk": 125,
    "def": 70,
    "spa": 125,
    "spd": 70,
    "spe": 115
  },
  "dialga": {
    "hp": 100,
    "atk": 120,
    "def": 120,
    "spa": 150,
    "spd": 100,
    "spe": 90
  },
  "palkia": {
    "hp": 90,
    "atk": 120,
    "def": 100,
    "spa": 150,
    "spd": 120,
    "spe": 100
  },
  "heatran": {
    "hp": 91,
    "atk": 90,
    "def": 106,
    "spa": 130,
    "spd": 106,
    "spe": 77
  },
  "regigigas": {
    "hp": 110,
    "atk": 160,
    "def": 110,
    "spa": 80,
    "spd": 110,
    "spe": 100
  },
  "giratina": {
    "hp": 150,
    "atk": 100,
    "def": 120,
    "spa": 100,
    "spd": 120,
    "spe": 90
  },
  "giratinaorigin": {
    "hp": 150,
    "atk": 120,
    "def": 100,
    "spa": 120,
    "spd": 100,
    "spe": 90
  },
  "cresselia": {
    "hp": 120,
    "atk": 70,
    "def": 120,
    "spa": 75,
    "spd": 130,
    "spe": 85
  },
  "phione": {
    "hp": 80,
    "atk": 80,
    "def": 80,
    "spa": 80,
    "spd": 80,
    "spe": 80
  },
  "manaphy": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "darkrai": {
    "hp": 70,
    "atk": 90,
    "def": 90,
    "spa": 135,
    "spd": 90,
    "spe": 125
  },
  "shaymin": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "shayminsky": {
    "hp": 100,
    "atk": 103,
    "def": 75,
    "spa": 120,
    "spd": 75,
    "spe": 127
  },
  "arceus": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusbug": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusdark": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusdragon": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceuselectric": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusfairy": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusfighting": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusfire": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusflying": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusghost": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusgrass": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusground": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusice": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceuspoison": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceuspsychic": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceusrock": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceussteel": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "arceuswater": {
    "hp": 120,
    "atk": 120,
    "def": 120,
    "spa": 120,
    "spd": 120,
    "spe": 120
  },
  "victini": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "snivy": {
    "hp": 45,
    "atk": 45,
    "def": 55,
    "spa": 45,
    "spd": 55,
    "spe": 63
  },
  "servine": {
    "hp": 60,
    "atk": 60,
    "def": 75,
    "spa": 60,
    "spd": 75,
    "spe": 83
  },
  "serperior": {
    "hp": 75,
    "atk": 75,
    "def": 95,
    "spa": 75,
    "spd": 95,
    "spe": 113
  },
  "tepig": {
    "hp": 65,
    "atk": 63,
    "def": 45,
    "spa": 45,
    "spd": 45,
    "spe": 45
  },
  "pignite": {
    "hp": 90,
    "atk": 93,
    "def": 55,
    "spa": 70,
    "spd": 55,
    "spe": 55
  },
  "emboar": {
    "hp": 110,
    "atk": 123,
    "def": 65,
    "spa": 100,
    "spd": 65,
    "spe": 65
  },
  "oshawott": {
    "hp": 55,
    "atk": 55,
    "def": 45,
    "spa": 63,
    "spd": 45,
    "spe": 45
  },
  "dewott": {
    "hp": 75,
    "atk": 75,
    "def": 60,
    "spa": 83,
    "spd": 60,
    "spe": 60
  },
  "samurott": {
    "hp": 95,
    "atk": 100,
    "def": 85,
    "spa": 108,
    "spd": 70,
    "spe": 70
  },
  "patrat": {
    "hp": 45,
    "atk": 55,
    "def": 39,
    "spa": 35,
    "spd": 39,
    "spe": 42
  },
  "watchog": {
    "hp": 60,
    "atk": 85,
    "def": 69,
    "spa": 60,
    "spd": 69,
    "spe": 77
  },
  "lillipup": {
    "hp": 45,
    "atk": 60,
    "def": 45,
    "spa": 25,
    "spd": 45,
    "spe": 55
  },
  "herdier": {
    "hp": 65,
    "atk": 80,
    "def": 65,
    "spa": 35,
    "spd": 65,
    "spe": 60
  },
  "stoutland": {
    "hp": 85,
    "atk": 110,
    "def": 90,
    "spa": 45,
    "spd": 90,
    "spe": 80
  },
  "purrloin": {
    "hp": 41,
    "atk": 50,
    "def": 37,
    "spa": 50,
    "spd": 37,
    "spe": 66
  },
  "liepard": {
    "hp": 64,
    "atk": 88,
    "def": 50,
    "spa": 88,
    "spd": 50,
    "spe": 106
  },
  "pansage": {
    "hp": 50,
    "atk": 53,
    "def": 48,
    "spa": 53,
    "spd": 48,
    "spe": 64
  },
  "simisage": {
    "hp": 75,
    "atk": 98,
    "def": 63,
    "spa": 98,
    "spd": 63,
    "spe": 101
  },
  "pansear": {
    "hp": 50,
    "atk": 53,
    "def": 48,
    "spa": 53,
    "spd": 48,
    "spe": 64
  },
  "simisear": {
    "hp": 75,
    "atk": 98,
    "def": 63,
    "spa": 98,
    "spd": 63,
    "spe": 101
  },
  "panpour": {
    "hp": 50,
    "atk": 53,
    "def": 48,
    "spa": 53,
    "spd": 48,
    "spe": 64
  },
  "simipour": {
    "hp": 75,
    "atk": 98,
    "def": 63,
    "spa": 98,
    "spd": 63,
    "spe": 101
  },
  "munna": {
    "hp": 76,
    "atk": 25,
    "def": 45,
    "spa": 67,
    "spd": 55,
    "spe": 24
  },
  "musharna": {
    "hp": 116,
    "atk": 55,
    "def": 85,
    "spa": 107,
    "spd": 95,
    "spe": 29
  },
  "pidove": {
    "hp": 50,
    "atk": 55,
    "def": 50,
    "spa": 36,
    "spd": 30,
    "spe": 43
  },
  "tranquill": {
    "hp": 62,
    "atk": 77,
    "def": 62,
    "spa": 50,
    "spd": 42,
    "spe": 65
  },
  "unfezant": {
    "hp": 80,
    "atk": 115,
    "def": 80,
    "spa": 65,
    "spd": 55,
    "spe": 93
  },
  "blitzle": {
    "hp": 45,
    "atk": 60,
    "def": 32,
    "spa": 50,
    "spd": 32,
    "spe": 76
  },
  "zebstrika": {
    "hp": 75,
    "atk": 100,
    "def": 63,
    "spa": 80,
    "spd": 63,
    "spe": 116
  },
  "roggenrola": {
    "hp": 55,
    "atk": 75,
    "def": 85,
    "spa": 25,
    "spd": 25,
    "spe": 15
  },
  "boldore": {
    "hp": 70,
    "atk": 105,
    "def": 105,
    "spa": 50,
    "spd": 40,
    "spe": 20
  },
  "gigalith": {
    "hp": 85,
    "atk": 135,
    "def": 130,
    "spa": 60,
    "spd": 80,
    "spe": 25
  },
  "woobat": {
    "hp": 65,
    "atk": 45,
    "def": 43,
    "spa": 55,
    "spd": 43,
    "spe": 72
  },
  "swoobat": {
    "hp": 67,
    "atk": 57,
    "def": 55,
    "spa": 77,
    "spd": 55,
    "spe": 114
  },
  "drilbur": {
    "hp": 60,
    "atk": 85,
    "def": 40,
    "spa": 30,
    "spd": 45,
    "spe": 68
  },
  "excadrill": {
    "hp": 110,
    "atk": 135,
    "def": 60,
    "spa": 50,
    "spd": 65,
    "spe": 88
  },
  "audino": {
    "hp": 103,
    "atk": 60,
    "def": 86,
    "spa": 60,
    "spd": 86,
    "spe": 50
  },
  "audinomega": {
    "hp": 103,
    "atk": 60,
    "def": 126,
    "spa": 80,
    "spd": 126,
    "spe": 50
  },
  "timburr": {
    "hp": 75,
    "atk": 80,
    "def": 55,
    "spa": 25,
    "spd": 35,
    "spe": 35
  },
  "gurdurr": {
    "hp": 85,
    "atk": 105,
    "def": 85,
    "spa": 40,
    "spd": 50,
    "spe": 40
  },
  "conkeldurr": {
    "hp": 105,
    "atk": 140,
    "def": 95,
    "spa": 55,
    "spd": 65,
    "spe": 45
  },
  "tympole": {
    "hp": 50,
    "atk": 50,
    "def": 40,
    "spa": 50,
    "spd": 40,
    "spe": 64
  },
  "palpitoad": {
    "hp": 75,
    "atk": 65,
    "def": 55,
    "spa": 65,
    "spd": 55,
    "spe": 69
  },
  "seismitoad": {
    "hp": 105,
    "atk": 95,
    "def": 75,
    "spa": 85,
    "spd": 75,
    "spe": 74
  },
  "throh": {
    "hp": 120,
    "atk": 100,
    "def": 85,
    "spa": 30,
    "spd": 85,
    "spe": 45
  },
  "sawk": {
    "hp": 75,
    "atk": 125,
    "def": 75,
    "spa": 30,
    "spd": 75,
    "spe": 85
  },
  "sewaddle": {
    "hp": 45,
    "atk": 53,
    "def": 70,
    "spa": 40,
    "spd": 60,
    "spe": 42
  },
  "swadloon": {
    "hp": 55,
    "atk": 63,
    "def": 90,
    "spa": 50,
    "spd": 80,
    "spe": 42
  },
  "leavanny": {
    "hp": 75,
    "atk": 103,
    "def": 80,
    "spa": 70,
    "spd": 80,
    "spe": 92
  },
  "venipede": {
    "hp": 30,
    "atk": 45,
    "def": 59,
    "spa": 30,
    "spd": 39,
    "spe": 57
  },
  "whirlipede": {
    "hp": 40,
    "atk": 55,
    "def": 99,
    "spa": 40,
    "spd": 79,
    "spe": 47
  },
  "scolipede": {
    "hp": 60,
    "atk": 100,
    "def": 89,
    "spa": 55,
    "spd": 69,
    "spe": 112
  },
  "cottonee": {
    "hp": 40,
    "atk": 27,
    "def": 60,
    "spa": 37,
    "spd": 50,
    "spe": 66
  },
  "whimsicott": {
    "hp": 60,
    "atk": 67,
    "def": 85,
    "spa": 77,
    "spd": 75,
    "spe": 116
  },
  "petilil": {
    "hp": 45,
    "atk": 35,
    "def": 50,
    "spa": 70,
    "spd": 50,
    "spe": 30
  },
  "lilligant": {
    "hp": 70,
    "atk": 60,
    "def": 75,
    "spa": 110,
    "spd": 75,
    "spe": 90
  },
  "basculin": {
    "hp": 70,
    "atk": 92,
    "def": 65,
    "spa": 80,
    "spd": 55,
    "spe": 98
  },
  "basculinbluestriped": {
    "hp": 70,
    "atk": 92,
    "def": 65,
    "spa": 80,
    "spd": 55,
    "spe": 98
  },
  "sandile": {
    "hp": 50,
    "atk": 72,
    "def": 35,
    "spa": 35,
    "spd": 35,
    "spe": 65
  },
  "krokorok": {
    "hp": 60,
    "atk": 82,
    "def": 45,
    "spa": 45,
    "spd": 45,
    "spe": 74
  },
  "krookodile": {
    "hp": 95,
    "atk": 117,
    "def": 80,
    "spa": 65,
    "spd": 70,
    "spe": 92
  },
  "darumaka": {
    "hp": 70,
    "atk": 90,
    "def": 45,
    "spa": 15,
    "spd": 45,
    "spe": 50
  },
  "darumakagalar": {
    "hp": 70,
    "atk": 90,
    "def": 45,
    "spa": 15,
    "spd": 45,
    "spe": 50
  },
  "darmanitan": {
    "hp": 105,
    "atk": 140,
    "def": 55,
    "spa": 30,
    "spd": 55,
    "spe": 95
  },
  "darmanitanzen": {
    "hp": 105,
    "atk": 30,
    "def": 105,
    "spa": 140,
    "spd": 105,
    "spe": 55
  },
  "darmanitangalar": {
    "hp": 105,
    "atk": 140,
    "def": 55,
    "spa": 30,
    "spd": 55,
    "spe": 95
  },
  "darmanitangalarzen": {
    "hp": 105,
    "atk": 160,
    "def": 55,
    "spa": 30,
    "spd": 55,
    "spe": 135
  },
  "maractus": {
    "hp": 75,
    "atk": 86,
    "def": 67,
    "spa": 106,
    "spd": 67,
    "spe": 60
  },
  "dwebble": {
    "hp": 50,
    "atk": 65,
    "def": 85,
    "spa": 35,
    "spd": 35,
    "spe": 55
  },
  "crustle": {
    "hp": 70,
    "atk": 105,
    "def": 125,
    "spa": 65,
    "spd": 75,
    "spe": 45
  },
  "scraggy": {
    "hp": 50,
    "atk": 75,
    "def": 70,
    "spa": 35,
    "spd": 70,
    "spe": 48
  },
  "scrafty": {
    "hp": 65,
    "atk": 90,
    "def": 115,
    "spa": 45,
    "spd": 115,
    "spe": 58
  },
  "sigilyph": {
    "hp": 72,
    "atk": 58,
    "def": 80,
    "spa": 103,
    "spd": 80,
    "spe": 97
  },
  "yamask": {
    "hp": 38,
    "atk": 30,
    "def": 85,
    "spa": 55,
    "spd": 65,
    "spe": 30
  },
  "yamaskgalar": {
    "hp": 38,
    "atk": 55,
    "def": 85,
    "spa": 30,
    "spd": 65,
    "spe": 30
  },
  "cofagrigus": {
    "hp": 58,
    "atk": 50,
    "def": 145,
    "spa": 95,
    "spd": 105,
    "spe": 30
  },
  "tirtouga": {
    "hp": 54,
    "atk": 78,
    "def": 103,
    "spa": 53,
    "spd": 45,
    "spe": 22
  },
  "carracosta": {
    "hp": 74,
    "atk": 108,
    "def": 133,
    "spa": 83,
    "spd": 65,
    "spe": 32
  },
  "archen": {
    "hp": 55,
    "atk": 112,
    "def": 45,
    "spa": 74,
    "spd": 45,
    "spe": 70
  },
  "archeops": {
    "hp": 75,
    "atk": 140,
    "def": 65,
    "spa": 112,
    "spd": 65,
    "spe": 110
  },
  "trubbish": {
    "hp": 50,
    "atk": 50,
    "def": 62,
    "spa": 40,
    "spd": 62,
    "spe": 65
  },
  "garbodor": {
    "hp": 80,
    "atk": 95,
    "def": 82,
    "spa": 60,
    "spd": 82,
    "spe": 75
  },
  "garbodorgmax": {
    "hp": 80,
    "atk": 95,
    "def": 82,
    "spa": 60,
    "spd": 82,
    "spe": 75
  },
  "zorua": {
    "hp": 40,
    "atk": 65,
    "def": 40,
    "spa": 80,
    "spd": 40,
    "spe": 65
  },
  "zoroark": {
    "hp": 60,
    "atk": 105,
    "def": 60,
    "spa": 120,
    "spd": 60,
    "spe": 105
  },
  "minccino": {
    "hp": 55,
    "atk": 50,
    "def": 40,
    "spa": 40,
    "spd": 40,
    "spe": 75
  },
  "cinccino": {
    "hp": 75,
    "atk": 95,
    "def": 60,
    "spa": 65,
    "spd": 60,
    "spe": 115
  },
  "gothita": {
    "hp": 45,
    "atk": 30,
    "def": 50,
    "spa": 55,
    "spd": 65,
    "spe": 45
  },
  "gothorita": {
    "hp": 60,
    "atk": 45,
    "def": 70,
    "spa": 75,
    "spd": 85,
    "spe": 55
  },
  "gothitelle": {
    "hp": 70,
    "atk": 55,
    "def": 95,
    "spa": 95,
    "spd": 110,
    "spe": 65
  },
  "solosis": {
    "hp": 45,
    "atk": 30,
    "def": 40,
    "spa": 105,
    "spd": 50,
    "spe": 20
  },
  "duosion": {
    "hp": 65,
    "atk": 40,
    "def": 50,
    "spa": 125,
    "spd": 60,
    "spe": 30
  },
  "reuniclus": {
    "hp": 110,
    "atk": 65,
    "def": 75,
    "spa": 125,
    "spd": 85,
    "spe": 30
  },
  "ducklett": {
    "hp": 62,
    "atk": 44,
    "def": 50,
    "spa": 44,
    "spd": 50,
    "spe": 55
  },
  "swanna": {
    "hp": 75,
    "atk": 87,
    "def": 63,
    "spa": 87,
    "spd": 63,
    "spe": 98
  },
  "vanillite": {
    "hp": 36,
    "atk": 50,
    "def": 50,
    "spa": 65,
    "spd": 60,
    "spe": 44
  },
  "vanillish": {
    "hp": 51,
    "atk": 65,
    "def": 65,
    "spa": 80,
    "spd": 75,
    "spe": 59
  },
  "vanilluxe": {
    "hp": 71,
    "atk": 95,
    "def": 85,
    "spa": 110,
    "spd": 95,
    "spe": 79
  },
  "deerling": {
    "hp": 60,
    "atk": 60,
    "def": 50,
    "spa": 40,
    "spd": 50,
    "spe": 75
  },
  "sawsbuck": {
    "hp": 80,
    "atk": 100,
    "def": 70,
    "spa": 60,
    "spd": 70,
    "spe": 95
  },
  "emolga": {
    "hp": 55,
    "atk": 75,
    "def": 60,
    "spa": 75,
    "spd": 60,
    "spe": 103
  },
  "karrablast": {
    "hp": 50,
    "atk": 75,
    "def": 45,
    "spa": 40,
    "spd": 45,
    "spe": 60
  },
  "escavalier": {
    "hp": 70,
    "atk": 135,
    "def": 105,
    "spa": 60,
    "spd": 105,
    "spe": 20
  },
  "foongus": {
    "hp": 69,
    "atk": 55,
    "def": 45,
    "spa": 55,
    "spd": 55,
    "spe": 15
  },
  "amoonguss": {
    "hp": 114,
    "atk": 85,
    "def": 70,
    "spa": 85,
    "spd": 80,
    "spe": 30
  },
  "frillish": {
    "hp": 55,
    "atk": 40,
    "def": 50,
    "spa": 65,
    "spd": 85,
    "spe": 40
  },
  "jellicent": {
    "hp": 100,
    "atk": 60,
    "def": 70,
    "spa": 85,
    "spd": 105,
    "spe": 60
  },
  "alomomola": {
    "hp": 165,
    "atk": 75,
    "def": 80,
    "spa": 40,
    "spd": 45,
    "spe": 65
  },
  "joltik": {
    "hp": 50,
    "atk": 47,
    "def": 50,
    "spa": 57,
    "spd": 50,
    "spe": 65
  },
  "galvantula": {
    "hp": 70,
    "atk": 77,
    "def": 60,
    "spa": 97,
    "spd": 60,
    "spe": 108
  },
  "ferroseed": {
    "hp": 44,
    "atk": 50,
    "def": 91,
    "spa": 24,
    "spd": 86,
    "spe": 10
  },
  "ferrothorn": {
    "hp": 74,
    "atk": 94,
    "def": 131,
    "spa": 54,
    "spd": 116,
    "spe": 20
  },
  "klink": {
    "hp": 40,
    "atk": 55,
    "def": 70,
    "spa": 45,
    "spd": 60,
    "spe": 30
  },
  "klang": {
    "hp": 60,
    "atk": 80,
    "def": 95,
    "spa": 70,
    "spd": 85,
    "spe": 50
  },
  "klinklang": {
    "hp": 60,
    "atk": 100,
    "def": 115,
    "spa": 70,
    "spd": 85,
    "spe": 90
  },
  "tynamo": {
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spa": 45,
    "spd": 40,
    "spe": 60
  },
  "eelektrik": {
    "hp": 65,
    "atk": 85,
    "def": 70,
    "spa": 75,
    "spd": 70,
    "spe": 40
  },
  "eelektross": {
    "hp": 85,
    "atk": 115,
    "def": 80,
    "spa": 105,
    "spd": 80,
    "spe": 50
  },
  "elgyem": {
    "hp": 55,
    "atk": 55,
    "def": 55,
    "spa": 85,
    "spd": 55,
    "spe": 30
  },
  "beheeyem": {
    "hp": 75,
    "atk": 75,
    "def": 75,
    "spa": 125,
    "spd": 95,
    "spe": 40
  },
  "litwick": {
    "hp": 50,
    "atk": 30,
    "def": 55,
    "spa": 65,
    "spd": 55,
    "spe": 20
  },
  "lampent": {
    "hp": 60,
    "atk": 40,
    "def": 60,
    "spa": 95,
    "spd": 60,
    "spe": 55
  },
  "chandelure": {
    "hp": 60,
    "atk": 55,
    "def": 90,
    "spa": 145,
    "spd": 90,
    "spe": 80
  },
  "axew": {
    "hp": 46,
    "atk": 87,
    "def": 60,
    "spa": 30,
    "spd": 40,
    "spe": 57
  },
  "fraxure": {
    "hp": 66,
    "atk": 117,
    "def": 70,
    "spa": 40,
    "spd": 50,
    "spe": 67
  },
  "haxorus": {
    "hp": 76,
    "atk": 147,
    "def": 90,
    "spa": 60,
    "spd": 70,
    "spe": 97
  },
  "cubchoo": {
    "hp": 55,
    "atk": 70,
    "def": 40,
    "spa": 60,
    "spd": 40,
    "spe": 40
  },
  "beartic": {
    "hp": 95,
    "atk": 130,
    "def": 80,
    "spa": 70,
    "spd": 80,
    "spe": 50
  },
  "cryogonal": {
    "hp": 80,
    "atk": 50,
    "def": 50,
    "spa": 95,
    "spd": 135,
    "spe": 105
  },
  "shelmet": {
    "hp": 50,
    "atk": 40,
    "def": 85,
    "spa": 40,
    "spd": 65,
    "spe": 25
  },
  "accelgor": {
    "hp": 80,
    "atk": 70,
    "def": 40,
    "spa": 100,
    "spd": 60,
    "spe": 145
  },
  "stunfisk": {
    "hp": 109,
    "atk": 66,
    "def": 84,
    "spa": 81,
    "spd": 99,
    "spe": 32
  },
  "stunfiskgalar": {
    "hp": 109,
    "atk": 81,
    "def": 99,
    "spa": 66,
    "spd": 84,
    "spe": 32
  },
  "mienfoo": {
    "hp": 45,
    "atk": 85,
    "def": 50,
    "spa": 55,
    "spd": 50,
    "spe": 65
  },
  "mienshao": {
    "hp": 65,
    "atk": 125,
    "def": 60,
    "spa": 95,
    "spd": 60,
    "spe": 105
  },
  "druddigon": {
    "hp": 77,
    "atk": 120,
    "def": 90,
    "spa": 60,
    "spd": 90,
    "spe": 48
  },
  "golett": {
    "hp": 59,
    "atk": 74,
    "def": 50,
    "spa": 35,
    "spd": 50,
    "spe": 35
  },
  "golurk": {
    "hp": 89,
    "atk": 124,
    "def": 80,
    "spa": 55,
    "spd": 80,
    "spe": 55
  },
  "pawniard": {
    "hp": 45,
    "atk": 85,
    "def": 70,
    "spa": 40,
    "spd": 40,
    "spe": 60
  },
  "bisharp": {
    "hp": 65,
    "atk": 125,
    "def": 100,
    "spa": 60,
    "spd": 70,
    "spe": 70
  },
  "bouffalant": {
    "hp": 95,
    "atk": 110,
    "def": 95,
    "spa": 40,
    "spd": 95,
    "spe": 55
  },
  "rufflet": {
    "hp": 70,
    "atk": 83,
    "def": 50,
    "spa": 37,
    "spd": 50,
    "spe": 60
  },
  "braviary": {
    "hp": 100,
    "atk": 123,
    "def": 75,
    "spa": 57,
    "spd": 75,
    "spe": 80
  },
  "vullaby": {
    "hp": 70,
    "atk": 55,
    "def": 75,
    "spa": 45,
    "spd": 65,
    "spe": 60
  },
  "mandibuzz": {
    "hp": 110,
    "atk": 65,
    "def": 105,
    "spa": 55,
    "spd": 95,
    "spe": 80
  },
  "heatmor": {
    "hp": 85,
    "atk": 97,
    "def": 66,
    "spa": 105,
    "spd": 66,
    "spe": 65
  },
  "durant": {
    "hp": 58,
    "atk": 109,
    "def": 112,
    "spa": 48,
    "spd": 48,
    "spe": 109
  },
  "deino": {
    "hp": 52,
    "atk": 65,
    "def": 50,
    "spa": 45,
    "spd": 50,
    "spe": 38
  },
  "zweilous": {
    "hp": 72,
    "atk": 85,
    "def": 70,
    "spa": 65,
    "spd": 70,
    "spe": 58
  },
  "hydreigon": {
    "hp": 92,
    "atk": 105,
    "def": 90,
    "spa": 125,
    "spd": 90,
    "spe": 98
  },
  "larvesta": {
    "hp": 55,
    "atk": 85,
    "def": 55,
    "spa": 50,
    "spd": 55,
    "spe": 60
  },
  "volcarona": {
    "hp": 85,
    "atk": 60,
    "def": 65,
    "spa": 135,
    "spd": 105,
    "spe": 100
  },
  "cobalion": {
    "hp": 91,
    "atk": 90,
    "def": 129,
    "spa": 90,
    "spd": 72,
    "spe": 108
  },
  "terrakion": {
    "hp": 91,
    "atk": 129,
    "def": 90,
    "spa": 72,
    "spd": 90,
    "spe": 108
  },
  "virizion": {
    "hp": 91,
    "atk": 90,
    "def": 72,
    "spa": 90,
    "spd": 129,
    "spe": 108
  },
  "tornadus": {
    "hp": 79,
    "atk": 115,
    "def": 70,
    "spa": 125,
    "spd": 80,
    "spe": 111
  },
  "tornadustherian": {
    "hp": 79,
    "atk": 100,
    "def": 80,
    "spa": 110,
    "spd": 90,
    "spe": 121
  },
  "thundurus": {
    "hp": 79,
    "atk": 115,
    "def": 70,
    "spa": 125,
    "spd": 80,
    "spe": 111
  },
  "thundurustherian": {
    "hp": 79,
    "atk": 105,
    "def": 70,
    "spa": 145,
    "spd": 80,
    "spe": 101
  },
  "reshiram": {
    "hp": 100,
    "atk": 120,
    "def": 100,
    "spa": 150,
    "spd": 120,
    "spe": 90
  },
  "zekrom": {
    "hp": 100,
    "atk": 150,
    "def": 120,
    "spa": 120,
    "spd": 100,
    "spe": 90
  },
  "landorus": {
    "hp": 89,
    "atk": 125,
    "def": 90,
    "spa": 115,
    "spd": 80,
    "spe": 101
  },
  "landorustherian": {
    "hp": 89,
    "atk": 145,
    "def": 90,
    "spa": 105,
    "spd": 80,
    "spe": 91
  },
  "kyurem": {
    "hp": 125,
    "atk": 130,
    "def": 90,
    "spa": 130,
    "spd": 90,
    "spe": 95
  },
  "kyuremblack": {
    "hp": 125,
    "atk": 170,
    "def": 100,
    "spa": 120,
    "spd": 90,
    "spe": 95
  },
  "kyuremwhite": {
    "hp": 125,
    "atk": 120,
    "def": 90,
    "spa": 170,
    "spd": 100,
    "spe": 95
  },
  "keldeo": {
    "hp": 91,
    "atk": 72,
    "def": 90,
    "spa": 129,
    "spd": 90,
    "spe": 108
  },
  "keldeoresolute": {
    "hp": 91,
    "atk": 72,
    "def": 90,
    "spa": 129,
    "spd": 90,
    "spe": 108
  },
  "meloetta": {
    "hp": 100,
    "atk": 77,
    "def": 77,
    "spa": 128,
    "spd": 128,
    "spe": 90
  },
  "meloettapirouette": {
    "hp": 100,
    "atk": 128,
    "def": 90,
    "spa": 77,
    "spd": 77,
    "spe": 128
  },
  "genesect": {
    "hp": 71,
    "atk": 120,
    "def": 95,
    "spa": 120,
    "spd": 95,
    "spe": 99
  },
  "genesectdouse": {
    "hp": 71,
    "atk": 120,
    "def": 95,
    "spa": 120,
    "spd": 95,
    "spe": 99
  },
  "genesectshock": {
    "hp": 71,
    "atk": 120,
    "def": 95,
    "spa": 120,
    "spd": 95,
    "spe": 99
  },
  "genesectburn": {
    "hp": 71,
    "atk": 120,
    "def": 95,
    "spa": 120,
    "spd": 95,
    "spe": 99
  },
  "genesectchill": {
    "hp": 71,
    "atk": 120,
    "def": 95,
    "spa": 120,
    "spd": 95,
    "spe": 99
  },
  "chespin": {
    "hp": 56,
    "atk": 61,
    "def": 65,
    "spa": 48,
    "spd": 45,
    "spe": 38
  },
  "quilladin": {
    "hp": 61,
    "atk": 78,
    "def": 95,
    "spa": 56,
    "spd": 58,
    "spe": 57
  },
  "chesnaught": {
    "hp": 88,
    "atk": 107,
    "def": 122,
    "spa": 74,
    "spd": 75,
    "spe": 64
  },
  "fennekin": {
    "hp": 40,
    "atk": 45,
    "def": 40,
    "spa": 62,
    "spd": 60,
    "spe": 60
  },
  "braixen": {
    "hp": 59,
    "atk": 59,
    "def": 58,
    "spa": 90,
    "spd": 70,
    "spe": 73
  },
  "delphox": {
    "hp": 75,
    "atk": 69,
    "def": 72,
    "spa": 114,
    "spd": 100,
    "spe": 104
  },
  "froakie": {
    "hp": 41,
    "atk": 56,
    "def": 40,
    "spa": 62,
    "spd": 44,
    "spe": 71
  },
  "frogadier": {
    "hp": 54,
    "atk": 63,
    "def": 52,
    "spa": 83,
    "spd": 56,
    "spe": 97
  },
  "greninja": {
    "hp": 72,
    "atk": 95,
    "def": 67,
    "spa": 103,
    "spd": 71,
    "spe": 122
  },
  "greninjaash": {
    "hp": 72,
    "atk": 145,
    "def": 67,
    "spa": 153,
    "spd": 71,
    "spe": 132
  },
  "bunnelby": {
    "hp": 38,
    "atk": 36,
    "def": 38,
    "spa": 32,
    "spd": 36,
    "spe": 57
  },
  "diggersby": {
    "hp": 85,
    "atk": 56,
    "def": 77,
    "spa": 50,
    "spd": 77,
    "spe": 78
  },
  "fletchling": {
    "hp": 45,
    "atk": 50,
    "def": 43,
    "spa": 40,
    "spd": 38,
    "spe": 62
  },
  "fletchinder": {
    "hp": 62,
    "atk": 73,
    "def": 55,
    "spa": 56,
    "spd": 52,
    "spe": 84
  },
  "talonflame": {
    "hp": 78,
    "atk": 81,
    "def": 71,
    "spa": 74,
    "spd": 69,
    "spe": 126
  },
  "scatterbug": {
    "hp": 38,
    "atk": 35,
    "def": 40,
    "spa": 27,
    "spd": 25,
    "spe": 35
  },
  "spewpa": {
    "hp": 45,
    "atk": 22,
    "def": 60,
    "spa": 27,
    "spd": 30,
    "spe": 29
  },
  "vivillon": {
    "hp": 80,
    "atk": 52,
    "def": 50,
    "spa": 90,
    "spd": 50,
    "spe": 89
  },
  "vivillonfancy": {
    "hp": 80,
    "atk": 52,
    "def": 50,
    "spa": 90,
    "spd": 50,
    "spe": 89
  },
  "vivillonpokeball": {
    "hp": 80,
    "atk": 52,
    "def": 50,
    "spa": 90,
    "spd": 50,
    "spe": 89
  },
  "litleo": {
    "hp": 62,
    "atk": 50,
    "def": 58,
    "spa": 73,
    "spd": 54,
    "spe": 72
  },
  "pyroar": {
    "hp": 86,
    "atk": 68,
    "def": 72,
    "spa": 109,
    "spd": 66,
    "spe": 106
  },
  "flabebe": {
    "hp": 44,
    "atk": 38,
    "def": 39,
    "spa": 61,
    "spd": 79,
    "spe": 42
  },
  "floette": {
    "hp": 54,
    "atk": 45,
    "def": 47,
    "spa": 75,
    "spd": 98,
    "spe": 52
  },
  "floetteeternal": {
    "hp": 74,
    "atk": 65,
    "def": 67,
    "spa": 125,
    "spd": 128,
    "spe": 92
  },
  "florges": {
    "hp": 78,
    "atk": 65,
    "def": 68,
    "spa": 112,
    "spd": 154,
    "spe": 75
  },
  "skiddo": {
    "hp": 66,
    "atk": 65,
    "def": 48,
    "spa": 62,
    "spd": 57,
    "spe": 52
  },
  "gogoat": {
    "hp": 123,
    "atk": 100,
    "def": 62,
    "spa": 97,
    "spd": 81,
    "spe": 68
  },
  "pancham": {
    "hp": 67,
    "atk": 82,
    "def": 62,
    "spa": 46,
    "spd": 48,
    "spe": 43
  },
  "pangoro": {
    "hp": 95,
    "atk": 124,
    "def": 78,
    "spa": 69,
    "spd": 71,
    "spe": 58
  },
  "furfrou": {
    "hp": 75,
    "atk": 80,
    "def": 60,
    "spa": 65,
    "spd": 90,
    "spe": 102
  },
  "espurr": {
    "hp": 62,
    "atk": 48,
    "def": 54,
    "spa": 63,
    "spd": 60,
    "spe": 68
  },
  "meowstic": {
    "hp": 74,
    "atk": 48,
    "def": 76,
    "spa": 83,
    "spd": 81,
    "spe": 104
  },
  "meowsticf": {
    "hp": 74,
    "atk": 48,
    "def": 76,
    "spa": 83,
    "spd": 81,
    "spe": 104
  },
  "honedge": {
    "hp": 45,
    "atk": 80,
    "def": 100,
    "spa": 35,
    "spd": 37,
    "spe": 28
  },
  "doublade": {
    "hp": 59,
    "atk": 110,
    "def": 150,
    "spa": 45,
    "spd": 49,
    "spe": 35
  },
  "aegislash": {
    "hp": 60,
    "atk": 50,
    "def": 140,
    "spa": 50,
    "spd": 140,
    "spe": 60
  },
  "aegislashblade": {
    "hp": 60,
    "atk": 140,
    "def": 50,
    "spa": 140,
    "spd": 50,
    "spe": 60
  },
  "spritzee": {
    "hp": 78,
    "atk": 52,
    "def": 60,
    "spa": 63,
    "spd": 65,
    "spe": 23
  },
  "aromatisse": {
    "hp": 101,
    "atk": 72,
    "def": 72,
    "spa": 99,
    "spd": 89,
    "spe": 29
  },
  "swirlix": {
    "hp": 62,
    "atk": 48,
    "def": 66,
    "spa": 59,
    "spd": 57,
    "spe": 49
  },
  "slurpuff": {
    "hp": 82,
    "atk": 80,
    "def": 86,
    "spa": 85,
    "spd": 75,
    "spe": 72
  },
  "inkay": {
    "hp": 53,
    "atk": 54,
    "def": 53,
    "spa": 37,
    "spd": 46,
    "spe": 45
  },
  "malamar": {
    "hp": 86,
    "atk": 92,
    "def": 88,
    "spa": 68,
    "spd": 75,
    "spe": 73
  },
  "binacle": {
    "hp": 42,
    "atk": 52,
    "def": 67,
    "spa": 39,
    "spd": 56,
    "spe": 50
  },
  "barbaracle": {
    "hp": 72,
    "atk": 105,
    "def": 115,
    "spa": 54,
    "spd": 86,
    "spe": 68
  },
  "skrelp": {
    "hp": 50,
    "atk": 60,
    "def": 60,
    "spa": 60,
    "spd": 60,
    "spe": 30
  },
  "dragalge": {
    "hp": 65,
    "atk": 75,
    "def": 90,
    "spa": 97,
    "spd": 123,
    "spe": 44
  },
  "clauncher": {
    "hp": 50,
    "atk": 53,
    "def": 62,
    "spa": 58,
    "spd": 63,
    "spe": 44
  },
  "clawitzer": {
    "hp": 71,
    "atk": 73,
    "def": 88,
    "spa": 120,
    "spd": 89,
    "spe": 59
  },
  "helioptile": {
    "hp": 44,
    "atk": 38,
    "def": 33,
    "spa": 61,
    "spd": 43,
    "spe": 70
  },
  "heliolisk": {
    "hp": 62,
    "atk": 55,
    "def": 52,
    "spa": 109,
    "spd": 94,
    "spe": 109
  },
  "tyrunt": {
    "hp": 58,
    "atk": 89,
    "def": 77,
    "spa": 45,
    "spd": 45,
    "spe": 48
  },
  "tyrantrum": {
    "hp": 82,
    "atk": 121,
    "def": 119,
    "spa": 69,
    "spd": 59,
    "spe": 71
  },
  "amaura": {
    "hp": 77,
    "atk": 59,
    "def": 50,
    "spa": 67,
    "spd": 63,
    "spe": 46
  },
  "aurorus": {
    "hp": 123,
    "atk": 77,
    "def": 72,
    "spa": 99,
    "spd": 92,
    "spe": 58
  },
  "sylveon": {
    "hp": 95,
    "atk": 65,
    "def": 65,
    "spa": 110,
    "spd": 130,
    "spe": 60
  },
  "hawlucha": {
    "hp": 78,
    "atk": 92,
    "def": 75,
    "spa": 74,
    "spd": 63,
    "spe": 118
  },
  "dedenne": {
    "hp": 67,
    "atk": 58,
    "def": 57,
    "spa": 81,
    "spd": 67,
    "spe": 101
  },
  "carbink": {
    "hp": 50,
    "atk": 50,
    "def": 150,
    "spa": 50,
    "spd": 150,
    "spe": 50
  },
  "goomy": {
    "hp": 45,
    "atk": 50,
    "def": 35,
    "spa": 55,
    "spd": 75,
    "spe": 40
  },
  "sliggoo": {
    "hp": 68,
    "atk": 75,
    "def": 53,
    "spa": 83,
    "spd": 113,
    "spe": 60
  },
  "goodra": {
    "hp": 90,
    "atk": 100,
    "def": 70,
    "spa": 110,
    "spd": 150,
    "spe": 80
  },
  "klefki": {
    "hp": 57,
    "atk": 80,
    "def": 91,
    "spa": 80,
    "spd": 87,
    "spe": 75
  },
  "phantump": {
    "hp": 43,
    "atk": 70,
    "def": 48,
    "spa": 50,
    "spd": 60,
    "spe": 38
  },
  "trevenant": {
    "hp": 85,
    "atk": 110,
    "def": 76,
    "spa": 65,
    "spd": 82,
    "spe": 56
  },
  "pumpkaboo": {
    "hp": 49,
    "atk": 66,
    "def": 70,
    "spa": 44,
    "spd": 55,
    "spe": 51
  },
  "pumpkaboosmall": {
    "hp": 44,
    "atk": 66,
    "def": 70,
    "spa": 44,
    "spd": 55,
    "spe": 56
  },
  "pumpkaboolarge": {
    "hp": 54,
    "atk": 66,
    "def": 70,
    "spa": 44,
    "spd": 55,
    "spe": 46
  },
  "pumpkaboosuper": {
    "hp": 59,
    "atk": 66,
    "def": 70,
    "spa": 44,
    "spd": 55,
    "spe": 41
  },
  "gourgeist": {
    "hp": 65,
    "atk": 90,
    "def": 122,
    "spa": 58,
    "spd": 75,
    "spe": 84
  },
  "gourgeistsmall": {
    "hp": 55,
    "atk": 85,
    "def": 122,
    "spa": 58,
    "spd": 75,
    "spe": 99
  },
  "gourgeistlarge": {
    "hp": 75,
    "atk": 95,
    "def": 122,
    "spa": 58,
    "spd": 75,
    "spe": 69
  },
  "gourgeistsuper": {
    "hp": 85,
    "atk": 100,
    "def": 122,
    "spa": 58,
    "spd": 75,
    "spe": 54
  },
  "bergmite": {
    "hp": 55,
    "atk": 69,
    "def": 85,
    "spa": 32,
    "spd": 35,
    "spe": 28
  },
  "avalugg": {
    "hp": 95,
    "atk": 117,
    "def": 184,
    "spa": 44,
    "spd": 46,
    "spe": 28
  },
  "noibat": {
    "hp": 40,
    "atk": 30,
    "def": 35,
    "spa": 45,
    "spd": 40,
    "spe": 55
  },
  "noivern": {
    "hp": 85,
    "atk": 70,
    "def": 80,
    "spa": 97,
    "spd": 80,
    "spe": 123
  },
  "xerneas": {
    "hp": 126,
    "atk": 131,
    "def": 95,
    "spa": 131,
    "spd": 98,
    "spe": 99
  },
  "yveltal": {
    "hp": 126,
    "atk": 131,
    "def": 95,
    "spa": 131,
    "spd": 98,
    "spe": 99
  },
  "zygarde": {
    "hp": 108,
    "atk": 100,
    "def": 121,
    "spa": 81,
    "spd": 95,
    "spe": 95
  },
  "zygarde10": {
    "hp": 54,
    "atk": 100,
    "def": 71,
    "spa": 61,
    "spd": 85,
    "spe": 115
  },
  "zygardecomplete": {
    "hp": 216,
    "atk": 100,
    "def": 121,
    "spa": 91,
    "spd": 95,
    "spe": 85
  },
  "diancie": {
    "hp": 50,
    "atk": 100,
    "def": 150,
    "spa": 100,
    "spd": 150,
    "spe": 50
  },
  "dianciemega": {
    "hp": 50,
    "atk": 160,
    "def": 110,
    "spa": 160,
    "spd": 110,
    "spe": 110
  },
  "hoopa": {
    "hp": 80,
    "atk": 110,
    "def": 60,
    "spa": 150,
    "spd": 130,
    "spe": 70
  },
  "hoopaunbound": {
    "hp": 80,
    "atk": 160,
    "def": 60,
    "spa": 170,
    "spd": 130,
    "spe": 80
  },
  "volcanion": {
    "hp": 80,
    "atk": 110,
    "def": 120,
    "spa": 130,
    "spd": 90,
    "spe": 70
  },
  "rowlet": {
    "hp": 68,
    "atk": 55,
    "def": 55,
    "spa": 50,
    "spd": 50,
    "spe": 42
  },
  "dartrix": {
    "hp": 78,
    "atk": 75,
    "def": 75,
    "spa": 70,
    "spd": 70,
    "spe": 52
  },
  "decidueye": {
    "hp": 78,
    "atk": 107,
    "def": 75,
    "spa": 100,
    "spd": 100,
    "spe": 70
  },
  "litten": {
    "hp": 45,
    "atk": 65,
    "def": 40,
    "spa": 60,
    "spd": 40,
    "spe": 70
  },
  "torracat": {
    "hp": 65,
    "atk": 85,
    "def": 50,
    "spa": 80,
    "spd": 50,
    "spe": 90
  },
  "incineroar": {
    "hp": 95,
    "atk": 115,
    "def": 90,
    "spa": 80,
    "spd": 90,
    "spe": 60
  },
  "popplio": {
    "hp": 50,
    "atk": 54,
    "def": 54,
    "spa": 66,
    "spd": 56,
    "spe": 40
  },
  "brionne": {
    "hp": 60,
    "atk": 69,
    "def": 69,
    "spa": 91,
    "spd": 81,
    "spe": 50
  },
  "primarina": {
    "hp": 80,
    "atk": 74,
    "def": 74,
    "spa": 126,
    "spd": 116,
    "spe": 60
  },
  "pikipek": {
    "hp": 35,
    "atk": 75,
    "def": 30,
    "spa": 30,
    "spd": 30,
    "spe": 65
  },
  "trumbeak": {
    "hp": 55,
    "atk": 85,
    "def": 50,
    "spa": 40,
    "spd": 50,
    "spe": 75
  },
  "toucannon": {
    "hp": 80,
    "atk": 120,
    "def": 75,
    "spa": 75,
    "spd": 75,
    "spe": 60
  },
  "yungoos": {
    "hp": 48,
    "atk": 70,
    "def": 30,
    "spa": 30,
    "spd": 30,
    "spe": 45
  },
  "gumshoos": {
    "hp": 88,
    "atk": 110,
    "def": 60,
    "spa": 55,
    "spd": 60,
    "spe": 45
  },
  "gumshoostotem": {
    "hp": 88,
    "atk": 110,
    "def": 60,
    "spa": 55,
    "spd": 60,
    "spe": 45
  },
  "grubbin": {
    "hp": 47,
    "atk": 62,
    "def": 45,
    "spa": 55,
    "spd": 45,
    "spe": 46
  },
  "charjabug": {
    "hp": 57,
    "atk": 82,
    "def": 95,
    "spa": 55,
    "spd": 75,
    "spe": 36
  },
  "vikavolt": {
    "hp": 77,
    "atk": 70,
    "def": 90,
    "spa": 145,
    "spd": 75,
    "spe": 43
  },
  "vikavolttotem": {
    "hp": 77,
    "atk": 70,
    "def": 90,
    "spa": 145,
    "spd": 75,
    "spe": 43
  },
  "crabrawler": {
    "hp": 47,
    "atk": 82,
    "def": 57,
    "spa": 42,
    "spd": 47,
    "spe": 63
  },
  "crabominable": {
    "hp": 97,
    "atk": 132,
    "def": 77,
    "spa": 62,
    "spd": 67,
    "spe": 43
  },
  "oricorio": {
    "hp": 75,
    "atk": 70,
    "def": 70,
    "spa": 98,
    "spd": 70,
    "spe": 93
  },
  "oricoriopompom": {
    "hp": 75,
    "atk": 70,
    "def": 70,
    "spa": 98,
    "spd": 70,
    "spe": 93
  },
  "oricoriopau": {
    "hp": 75,
    "atk": 70,
    "def": 70,
    "spa": 98,
    "spd": 70,
    "spe": 93
  },
  "oricoriosensu": {
    "hp": 75,
    "atk": 70,
    "def": 70,
    "spa": 98,
    "spd": 70,
    "spe": 93
  },
  "cutiefly": {
    "hp": 40,
    "atk": 45,
    "def": 40,
    "spa": 55,
    "spd": 40,
    "spe": 84
  },
  "ribombee": {
    "hp": 60,
    "atk": 55,
    "def": 60,
    "spa": 95,
    "spd": 70,
    "spe": 124
  },
  "ribombeetotem": {
    "hp": 60,
    "atk": 55,
    "def": 60,
    "spa": 95,
    "spd": 70,
    "spe": 124
  },
  "rockruff": {
    "hp": 45,
    "atk": 65,
    "def": 40,
    "spa": 30,
    "spd": 40,
    "spe": 60
  },
  "lycanroc": {
    "hp": 75,
    "atk": 115,
    "def": 65,
    "spa": 55,
    "spd": 65,
    "spe": 112
  },
  "lycanrocmidnight": {
    "hp": 85,
    "atk": 115,
    "def": 75,
    "spa": 55,
    "spd": 75,
    "spe": 82
  },
  "lycanrocdusk": {
    "hp": 75,
    "atk": 117,
    "def": 65,
    "spa": 55,
    "spd": 65,
    "spe": 110
  },
  "wishiwashi": {
    "hp": 45,
    "atk": 20,
    "def": 20,
    "spa": 25,
    "spd": 25,
    "spe": 40
  },
  "wishiwashischool": {
    "hp": 45,
    "atk": 140,
    "def": 130,
    "spa": 140,
    "spd": 135,
    "spe": 30
  },
  "mareanie": {
    "hp": 50,
    "atk": 53,
    "def": 62,
    "spa": 43,
    "spd": 52,
    "spe": 45
  },
  "toxapex": {
    "hp": 50,
    "atk": 63,
    "def": 152,
    "spa": 53,
    "spd": 142,
    "spe": 35
  },
  "mudbray": {
    "hp": 70,
    "atk": 100,
    "def": 70,
    "spa": 45,
    "spd": 55,
    "spe": 45
  },
  "mudsdale": {
    "hp": 100,
    "atk": 125,
    "def": 100,
    "spa": 55,
    "spd": 85,
    "spe": 35
  },
  "dewpider": {
    "hp": 38,
    "atk": 40,
    "def": 52,
    "spa": 40,
    "spd": 72,
    "spe": 27
  },
  "araquanid": {
    "hp": 68,
    "atk": 70,
    "def": 92,
    "spa": 50,
    "spd": 132,
    "spe": 42
  },
  "araquanidtotem": {
    "hp": 68,
    "atk": 70,
    "def": 92,
    "spa": 50,
    "spd": 132,
    "spe": 42
  },
  "fomantis": {
    "hp": 40,
    "atk": 55,
    "def": 35,
    "spa": 50,
    "spd": 35,
    "spe": 35
  },
  "lurantis": {
    "hp": 70,
    "atk": 105,
    "def": 90,
    "spa": 80,
    "spd": 90,
    "spe": 45
  },
  "lurantistotem": {
    "hp": 70,
    "atk": 105,
    "def": 90,
    "spa": 80,
    "spd": 90,
    "spe": 45
  },
  "morelull": {
    "hp": 40,
    "atk": 35,
    "def": 55,
    "spa": 65,
    "spd": 75,
    "spe": 15
  },
  "shiinotic": {
    "hp": 60,
    "atk": 45,
    "def": 80,
    "spa": 90,
    "spd": 100,
    "spe": 30
  },
  "salandit": {
    "hp": 48,
    "atk": 44,
    "def": 40,
    "spa": 71,
    "spd": 40,
    "spe": 77
  },
  "salazzle": {
    "hp": 68,
    "atk": 64,
    "def": 60,
    "spa": 111,
    "spd": 60,
    "spe": 117
  },
  "salazzletotem": {
    "hp": 68,
    "atk": 64,
    "def": 60,
    "spa": 111,
    "spd": 60,
    "spe": 117
  },
  "stufful": {
    "hp": 70,
    "atk": 75,
    "def": 50,
    "spa": 45,
    "spd": 50,
    "spe": 50
  },
  "bewear": {
    "hp": 120,
    "atk": 125,
    "def": 80,
    "spa": 55,
    "spd": 60,
    "spe": 60
  },
  "bounsweet": {
    "hp": 42,
    "atk": 30,
    "def": 38,
    "spa": 30,
    "spd": 38,
    "spe": 32
  },
  "steenee": {
    "hp": 52,
    "atk": 40,
    "def": 48,
    "spa": 40,
    "spd": 48,
    "spe": 62
  },
  "tsareena": {
    "hp": 72,
    "atk": 120,
    "def": 98,
    "spa": 50,
    "spd": 98,
    "spe": 72
  },
  "comfey": {
    "hp": 51,
    "atk": 52,
    "def": 90,
    "spa": 82,
    "spd": 110,
    "spe": 100
  },
  "oranguru": {
    "hp": 90,
    "atk": 60,
    "def": 80,
    "spa": 90,
    "spd": 110,
    "spe": 60
  },
  "passimian": {
    "hp": 100,
    "atk": 120,
    "def": 90,
    "spa": 40,
    "spd": 60,
    "spe": 80
  },
  "wimpod": {
    "hp": 25,
    "atk": 35,
    "def": 40,
    "spa": 20,
    "spd": 30,
    "spe": 80
  },
  "golisopod": {
    "hp": 75,
    "atk": 125,
    "def": 140,
    "spa": 60,
    "spd": 90,
    "spe": 40
  },
  "sandygast": {
    "hp": 55,
    "atk": 55,
    "def": 80,
    "spa": 70,
    "spd": 45,
    "spe": 15
  },
  "palossand": {
    "hp": 85,
    "atk": 75,
    "def": 110,
    "spa": 100,
    "spd": 75,
    "spe": 35
  },
  "pyukumuku": {
    "hp": 55,
    "atk": 60,
    "def": 130,
    "spa": 30,
    "spd": 130,
    "spe": 5
  },
  "typenull": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 59
  },
  "silvally": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallybug": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallydark": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallydragon": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallyelectric": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallyfairy": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallyfighting": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallyfire": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallyflying": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallyghost": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallygrass": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallyground": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallyice": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallypoison": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallypsychic": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallyrock": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallysteel": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "silvallywater": {
    "hp": 95,
    "atk": 95,
    "def": 95,
    "spa": 95,
    "spd": 95,
    "spe": 95
  },
  "minior": {
    "hp": 60,
    "atk": 100,
    "def": 60,
    "spa": 100,
    "spd": 60,
    "spe": 120
  },
  "miniormeteor": {
    "hp": 60,
    "atk": 60,
    "def": 100,
    "spa": 60,
    "spd": 100,
    "spe": 60
  },
  "komala": {
    "hp": 65,
    "atk": 115,
    "def": 65,
    "spa": 75,
    "spd": 95,
    "spe": 65
  },
  "turtonator": {
    "hp": 60,
    "atk": 78,
    "def": 135,
    "spa": 91,
    "spd": 85,
    "spe": 36
  },
  "togedemaru": {
    "hp": 65,
    "atk": 98,
    "def": 63,
    "spa": 40,
    "spd": 73,
    "spe": 96
  },
  "togedemarutotem": {
    "hp": 65,
    "atk": 98,
    "def": 63,
    "spa": 40,
    "spd": 73,
    "spe": 96
  },
  "mimikyu": {
    "hp": 55,
    "atk": 90,
    "def": 80,
    "spa": 50,
    "spd": 105,
    "spe": 96
  },
  "mimikyubusted": {
    "hp": 55,
    "atk": 90,
    "def": 80,
    "spa": 50,
    "spd": 105,
    "spe": 96
  },
  "mimikyutotem": {
    "hp": 55,
    "atk": 90,
    "def": 80,
    "spa": 50,
    "spd": 105,
    "spe": 96
  },
  "mimikyubustedtotem": {
    "hp": 55,
    "atk": 90,
    "def": 80,
    "spa": 50,
    "spd": 105,
    "spe": 96
  },
  "bruxish": {
    "hp": 68,
    "atk": 105,
    "def": 70,
    "spa": 70,
    "spd": 70,
    "spe": 92
  },
  "drampa": {
    "hp": 78,
    "atk": 60,
    "def": 85,
    "spa": 135,
    "spd": 91,
    "spe": 36
  },
  "dhelmise": {
    "hp": 70,
    "atk": 131,
    "def": 100,
    "spa": 86,
    "spd": 90,
    "spe": 40
  },
  "jangmoo": {
    "hp": 45,
    "atk": 55,
    "def": 65,
    "spa": 45,
    "spd": 45,
    "spe": 45
  },
  "hakamoo": {
    "hp": 55,
    "atk": 75,
    "def": 90,
    "spa": 65,
    "spd": 70,
    "spe": 65
  },
  "kommoo": {
    "hp": 75,
    "atk": 110,
    "def": 125,
    "spa": 100,
    "spd": 105,
    "spe": 85
  },
  "kommoototem": {
    "hp": 75,
    "atk": 110,
    "def": 125,
    "spa": 100,
    "spd": 105,
    "spe": 85
  },
  "tapukoko": {
    "hp": 70,
    "atk": 115,
    "def": 85,
    "spa": 95,
    "spd": 75,
    "spe": 130
  },
  "tapulele": {
    "hp": 70,
    "atk": 85,
    "def": 75,
    "spa": 130,
    "spd": 115,
    "spe": 95
  },
  "tapubulu": {
    "hp": 70,
    "atk": 130,
    "def": 115,
    "spa": 85,
    "spd": 95,
    "spe": 75
  },
  "tapufini": {
    "hp": 70,
    "atk": 75,
    "def": 115,
    "spa": 95,
    "spd": 130,
    "spe": 85
  },
  "cosmog": {
    "hp": 43,
    "atk": 29,
    "def": 31,
    "spa": 29,
    "spd": 31,
    "spe": 37
  },
  "cosmoem": {
    "hp": 43,
    "atk": 29,
    "def": 131,
    "spa": 29,
    "spd": 131,
    "spe": 37
  },
  "solgaleo": {
    "hp": 137,
    "atk": 137,
    "def": 107,
    "spa": 113,
    "spd": 89,
    "spe": 97
  },
  "lunala": {
    "hp": 137,
    "atk": 113,
    "def": 89,
    "spa": 137,
    "spd": 107,
    "spe": 97
  },
  "nihilego": {
    "hp": 109,
    "atk": 53,
    "def": 47,
    "spa": 127,
    "spd": 131,
    "spe": 103
  },
  "buzzwole": {
    "hp": 107,
    "atk": 139,
    "def": 139,
    "spa": 53,
    "spd": 53,
    "spe": 79
  },
  "pheromosa": {
    "hp": 71,
    "atk": 137,
    "def": 37,
    "spa": 137,
    "spd": 37,
    "spe": 151
  },
  "xurkitree": {
    "hp": 83,
    "atk": 89,
    "def": 71,
    "spa": 173,
    "spd": 71,
    "spe": 83
  },
  "celesteela": {
    "hp": 97,
    "atk": 101,
    "def": 103,
    "spa": 107,
    "spd": 101,
    "spe": 61
  },
  "kartana": {
    "hp": 59,
    "atk": 181,
    "def": 131,
    "spa": 59,
    "spd": 31,
    "spe": 109
  },
  "guzzlord": {
    "hp": 223,
    "atk": 101,
    "def": 53,
    "spa": 97,
    "spd": 53,
    "spe": 43
  },
  "necrozma": {
    "hp": 97,
    "atk": 107,
    "def": 101,
    "spa": 127,
    "spd": 89,
    "spe": 79
  },
  "necrozmaduskmane": {
    "hp": 97,
    "atk": 157,
    "def": 127,
    "spa": 113,
    "spd": 109,
    "spe": 77
  },
  "necrozmadawnwings": {
    "hp": 97,
    "atk": 113,
    "def": 109,
    "spa": 157,
    "spd": 127,
    "spe": 77
  },
  "necrozmaultra": {
    "hp": 97,
    "atk": 167,
    "def": 97,
    "spa": 167,
    "spd": 97,
    "spe": 129
  },
  "magearna": {
    "hp": 80,
    "atk": 95,
    "def": 115,
    "spa": 130,
    "spd": 115,
    "spe": 65
  },
  "magearnaoriginal": {
    "hp": 80,
    "atk": 95,
    "def": 115,
    "spa": 130,
    "spd": 115,
    "spe": 65
  },
  "marshadow": {
    "hp": 90,
    "atk": 125,
    "def": 80,
    "spa": 90,
    "spd": 90,
    "spe": 125
  },
  "poipole": {
    "hp": 67,
    "atk": 73,
    "def": 67,
    "spa": 73,
    "spd": 67,
    "spe": 73
  },
  "naganadel": {
    "hp": 73,
    "atk": 73,
    "def": 73,
    "spa": 127,
    "spd": 73,
    "spe": 121
  },
  "stakataka": {
    "hp": 61,
    "atk": 131,
    "def": 211,
    "spa": 53,
    "spd": 101,
    "spe": 13
  },
  "blacephalon": {
    "hp": 53,
    "atk": 127,
    "def": 53,
    "spa": 151,
    "spd": 79,
    "spe": 107
  },
  "zeraora": {
    "hp": 88,
    "atk": 112,
    "def": 75,
    "spa": 102,
    "spd": 80,
    "spe": 143
  },
  "meltan": {
    "hp": 46,
    "atk": 65,
    "def": 65,
    "spa": 55,
    "spd": 35,
    "spe": 34
  },
  "melmetal": {
    "hp": 135,
    "atk": 143,
    "def": 143,
    "spa": 80,
    "spd": 65,
    "spe": 34
  },
  "melmetalgmax": {
    "hp": 135,
    "atk": 143,
    "def": 143,
    "spa": 80,
    "spd": 65,
    "spe": 34
  },
  "grookey": {
    "hp": 50,
    "atk": 65,
    "def": 50,
    "spa": 40,
    "spd": 40,
    "spe": 65
  },
  "thwackey": {
    "hp": 70,
    "atk": 85,
    "def": 70,
    "spa": 55,
    "spd": 60,
    "spe": 80
  },
  "rillaboom": {
    "hp": 100,
    "atk": 125,
    "def": 90,
    "spa": 60,
    "spd": 70,
    "spe": 85
  },
  "scorbunny": {
    "hp": 50,
    "atk": 71,
    "def": 40,
    "spa": 40,
    "spd": 40,
    "spe": 69
  },
  "raboot": {
    "hp": 65,
    "atk": 86,
    "def": 60,
    "spa": 55,
    "spd": 60,
    "spe": 94
  },
  "cinderace": {
    "hp": 80,
    "atk": 116,
    "def": 75,
    "spa": 65,
    "spd": 75,
    "spe": 119
  },
  "sobble": {
    "hp": 50,
    "atk": 40,
    "def": 40,
    "spa": 70,
    "spd": 40,
    "spe": 70
  },
  "drizzile": {
    "hp": 65,
    "atk": 60,
    "def": 55,
    "spa": 95,
    "spd": 55,
    "spe": 90
  },
  "inteleon": {
    "hp": 70,
    "atk": 85,
    "def": 65,
    "spa": 125,
    "spd": 65,
    "spe": 120
  },
  "skwovet": {
    "hp": 70,
    "atk": 55,
    "def": 55,
    "spa": 35,
    "spd": 35,
    "spe": 25
  },
  "greedent": {
    "hp": 120,
    "atk": 95,
    "def": 95,
    "spa": 55,
    "spd": 75,
    "spe": 20
  },
  "rookidee": {
    "hp": 38,
    "atk": 47,
    "def": 35,
    "spa": 33,
    "spd": 35,
    "spe": 57
  },
  "corvisquire": {
    "hp": 68,
    "atk": 67,
    "def": 55,
    "spa": 43,
    "spd": 55,
    "spe": 77
  },
  "corviknight": {
    "hp": 98,
    "atk": 87,
    "def": 105,
    "spa": 53,
    "spd": 85,
    "spe": 67
  },
  "corviknightgmax": {
    "hp": 98,
    "atk": 87,
    "def": 105,
    "spa": 53,
    "spd": 85,
    "spe": 67
  },
  "blipbug": {
    "hp": 25,
    "atk": 20,
    "def": 20,
    "spa": 25,
    "spd": 45,
    "spe": 45
  },
  "dottler": {
    "hp": 50,
    "atk": 35,
    "def": 80,
    "spa": 50,
    "spd": 90,
    "spe": 30
  },
  "orbeetle": {
    "hp": 60,
    "atk": 45,
    "def": 110,
    "spa": 80,
    "spd": 120,
    "spe": 90
  },
  "orbeetlegmax": {
    "hp": 60,
    "atk": 45,
    "def": 110,
    "spa": 80,
    "spd": 120,
    "spe": 90
  },
  "nickit": {
    "hp": 40,
    "atk": 28,
    "def": 28,
    "spa": 47,
    "spd": 52,
    "spe": 50
  },
  "thievul": {
    "hp": 70,
    "atk": 58,
    "def": 58,
    "spa": 87,
    "spd": 92,
    "spe": 90
  },
  "gossifleur": {
    "hp": 40,
    "atk": 40,
    "def": 60,
    "spa": 40,
    "spd": 60,
    "spe": 10
  },
  "eldegoss": {
    "hp": 60,
    "atk": 50,
    "def": 90,
    "spa": 80,
    "spd": 120,
    "spe": 60
  },
  "wooloo": {
    "hp": 42,
    "atk": 40,
    "def": 55,
    "spa": 40,
    "spd": 45,
    "spe": 48
  },
  "dubwool": {
    "hp": 72,
    "atk": 80,
    "def": 100,
    "spa": 60,
    "spd": 90,
    "spe": 88
  },
  "chewtle": {
    "hp": 50,
    "atk": 64,
    "def": 50,
    "spa": 38,
    "spd": 38,
    "spe": 44
  },
  "drednaw": {
    "hp": 90,
    "atk": 115,
    "def": 90,
    "spa": 48,
    "spd": 68,
    "spe": 74
  },
  "drednawgmax": {
    "hp": 90,
    "atk": 115,
    "def": 90,
    "spa": 48,
    "spd": 68,
    "spe": 74
  },
  "yamper": {
    "hp": 59,
    "atk": 45,
    "def": 50,
    "spa": 40,
    "spd": 50,
    "spe": 26
  },
  "boltund": {
    "hp": 69,
    "atk": 90,
    "def": 60,
    "spa": 90,
    "spd": 60,
    "spe": 121
  },
  "rolycoly": {
    "hp": 30,
    "atk": 40,
    "def": 50,
    "spa": 40,
    "spd": 50,
    "spe": 30
  },
  "carkol": {
    "hp": 80,
    "atk": 60,
    "def": 90,
    "spa": 60,
    "spd": 70,
    "spe": 50
  },
  "coalossal": {
    "hp": 110,
    "atk": 80,
    "def": 120,
    "spa": 80,
    "spd": 90,
    "spe": 30
  },
  "coalossalgmax": {
    "hp": 110,
    "atk": 80,
    "def": 120,
    "spa": 80,
    "spd": 90,
    "spe": 30
  },
  "applin": {
    "hp": 40,
    "atk": 40,
    "def": 80,
    "spa": 40,
    "spd": 40,
    "spe": 20
  },
  "flapple": {
    "hp": 70,
    "atk": 110,
    "def": 80,
    "spa": 95,
    "spd": 60,
    "spe": 70
  },
  "flapplegmax": {
    "hp": 70,
    "atk": 110,
    "def": 80,
    "spa": 95,
    "spd": 60,
    "spe": 70
  },
  "appletun": {
    "hp": 110,
    "atk": 85,
    "def": 80,
    "spa": 100,
    "spd": 80,
    "spe": 30
  },
  "appletungmax": {
    "hp": 110,
    "atk": 85,
    "def": 80,
    "spa": 100,
    "spd": 80,
    "spe": 30
  },
  "silicobra": {
    "hp": 52,
    "atk": 57,
    "def": 75,
    "spa": 35,
    "spd": 50,
    "spe": 46
  },
  "sandaconda": {
    "hp": 72,
    "atk": 107,
    "def": 125,
    "spa": 65,
    "spd": 70,
    "spe": 71
  },
  "sandacondagmax": {
    "hp": 72,
    "atk": 107,
    "def": 125,
    "spa": 65,
    "spd": 70,
    "spe": 71
  },
  "cramorant": {
    "hp": 70,
    "atk": 85,
    "def": 55,
    "spa": 85,
    "spd": 95,
    "spe": 85
  },
  "cramorantgulping": {
    "hp": 70,
    "atk": 85,
    "def": 55,
    "spa": 85,
    "spd": 95,
    "spe": 85
  },
  "cramorantgorging": {
    "hp": 70,
    "atk": 85,
    "def": 55,
    "spa": 85,
    "spd": 95,
    "spe": 85
  },
  "arrokuda": {
    "hp": 41,
    "atk": 63,
    "def": 40,
    "spa": 40,
    "spd": 30,
    "spe": 66
  },
  "barraskewda": {
    "hp": 61,
    "atk": 123,
    "def": 60,
    "spa": 60,
    "spd": 50,
    "spe": 136
  },
  "toxel": {
    "hp": 40,
    "atk": 38,
    "def": 35,
    "spa": 54,
    "spd": 35,
    "spe": 40
  },
  "toxtricity": {
    "hp": 75,
    "atk": 98,
    "def": 70,
    "spa": 114,
    "spd": 70,
    "spe": 75
  },
  "toxtricitylowkey": {
    "hp": 75,
    "atk": 98,
    "def": 70,
    "spa": 114,
    "spd": 70,
    "spe": 75
  },
  "toxtricitygmax": {
    "hp": 75,
    "atk": 98,
    "def": 70,
    "spa": 114,
    "spd": 70,
    "spe": 75
  },
  "sizzlipede": {
    "hp": 50,
    "atk": 65,
    "def": 45,
    "spa": 50,
    "spd": 50,
    "spe": 45
  },
  "centiskorch": {
    "hp": 100,
    "atk": 115,
    "def": 65,
    "spa": 90,
    "spd": 90,
    "spe": 65
  },
  "centiskorchgmax": {
    "hp": 100,
    "atk": 115,
    "def": 65,
    "spa": 90,
    "spd": 90,
    "spe": 65
  },
  "clobbopus": {
    "hp": 50,
    "atk": 68,
    "def": 60,
    "spa": 50,
    "spd": 50,
    "spe": 32
  },
  "grapploct": {
    "hp": 80,
    "atk": 118,
    "def": 90,
    "spa": 70,
    "spd": 80,
    "spe": 42
  },
  "sinistea": {
    "hp": 40,
    "atk": 45,
    "def": 45,
    "spa": 74,
    "spd": 54,
    "spe": 50
  },
  "polteageist": {
    "hp": 60,
    "atk": 65,
    "def": 65,
    "spa": 134,
    "spd": 114,
    "spe": 70
  },
  "hatenna": {
    "hp": 42,
    "atk": 30,
    "def": 45,
    "spa": 56,
    "spd": 53,
    "spe": 39
  },
  "hattrem": {
    "hp": 57,
    "atk": 40,
    "def": 65,
    "spa": 86,
    "spd": 73,
    "spe": 49
  },
  "hatterene": {
    "hp": 57,
    "atk": 90,
    "def": 95,
    "spa": 136,
    "spd": 103,
    "spe": 29
  },
  "hatterenegmax": {
    "hp": 57,
    "atk": 90,
    "def": 95,
    "spa": 136,
    "spd": 103,
    "spe": 29
  },
  "impidimp": {
    "hp": 45,
    "atk": 45,
    "def": 30,
    "spa": 55,
    "spd": 40,
    "spe": 50
  },
  "morgrem": {
    "hp": 65,
    "atk": 60,
    "def": 45,
    "spa": 75,
    "spd": 55,
    "spe": 70
  },
  "grimmsnarl": {
    "hp": 95,
    "atk": 120,
    "def": 65,
    "spa": 95,
    "spd": 75,
    "spe": 60
  },
  "grimmsnarlgmax": {
    "hp": 95,
    "atk": 120,
    "def": 65,
    "spa": 95,
    "spd": 75,
    "spe": 60
  },
  "obstagoon": {
    "hp": 93,
    "atk": 90,
    "def": 101,
    "spa": 60,
    "spd": 81,
    "spe": 95
  },
  "perrserker": {
    "hp": 70,
    "atk": 110,
    "def": 100,
    "spa": 50,
    "spd": 60,
    "spe": 50
  },
  "cursola": {
    "hp": 60,
    "atk": 95,
    "def": 50,
    "spa": 145,
    "spd": 130,
    "spe": 30
  },
  "sirfetchd": {
    "hp": 62,
    "atk": 135,
    "def": 95,
    "spa": 68,
    "spd": 82,
    "spe": 65
  },
  "mrrime": {
    "hp": 80,
    "atk": 85,
    "def": 75,
    "spa": 110,
    "spd": 100,
    "spe": 70
  },
  "runerigus": {
    "hp": 58,
    "atk": 95,
    "def": 145,
    "spa": 50,
    "spd": 105,
    "spe": 30
  },
  "milcery": {
    "hp": 45,
    "atk": 40,
    "def": 40,
    "spa": 50,
    "spd": 61,
    "spe": 34
  },
  "alcremie": {
    "hp": 65,
    "atk": 60,
    "def": 75,
    "spa": 110,
    "spd": 121,
    "spe": 64
  },
  "alcremiegmax": {
    "hp": 65,
    "atk": 60,
    "def": 75,
    "spa": 110,
    "spd": 121,
    "spe": 64
  },
  "falinks": {
    "hp": 65,
    "atk": 100,
    "def": 100,
    "spa": 70,
    "spd": 60,
    "spe": 75
  },
  "pincurchin": {
    "hp": 48,
    "atk": 101,
    "def": 95,
    "spa": 91,
    "spd": 85,
    "spe": 15
  },
  "snom": {
    "hp": 30,
    "atk": 25,
    "def": 35,
    "spa": 45,
    "spd": 30,
    "spe": 20
  },
  "frosmoth": {
    "hp": 70,
    "atk": 65,
    "def": 60,
    "spa": 125,
    "spd": 90,
    "spe": 65
  },
  "stonjourner": {
    "hp": 100,
    "atk": 125,
    "def": 135,
    "spa": 20,
    "spd": 20,
    "spe": 70
  },
  "eiscue": {
    "hp": 75,
    "atk": 80,
    "def": 110,
    "spa": 65,
    "spd": 90,
    "spe": 50
  },
  "eiscuenoice": {
    "hp": 75,
    "atk": 80,
    "def": 70,
    "spa": 65,
    "spd": 50,
    "spe": 130
  },
  "indeedee": {
    "hp": 60,
    "atk": 65,
    "def": 55,
    "spa": 105,
    "spd": 95,
    "spe": 95
  },
  "indeedeef": {
    "hp": 70,
    "atk": 55,
    "def": 65,
    "spa": 95,
    "spd": 105,
    "spe": 85
  },
  "morpeko": {
    "hp": 58,
    "atk": 95,
    "def": 58,
    "spa": 70,
    "spd": 58,
    "spe": 97
  },
  "morpekohangry": {
    "hp": 58,
    "atk": 95,
    "def": 58,
    "spa": 70,
    "spd": 58,
    "spe": 97
  },
  "cufant": {
    "hp": 72,
    "atk": 80,
    "def": 49,
    "spa": 40,
    "spd": 49,
    "spe": 40
  },
  "copperajah": {
    "hp": 122,
    "atk": 130,
    "def": 69,
    "spa": 80,
    "spd": 69,
    "spe": 30
  },
  "copperajahgmax": {
    "hp": 122,
    "atk": 130,
    "def": 69,
    "spa": 80,
    "spd": 69,
    "spe": 30
  },
  "dracozolt": {
    "hp": 90,
    "atk": 100,
    "def": 90,
    "spa": 80,
    "spd": 70,
    "spe": 75
  },
  "arctozolt": {
    "hp": 90,
    "atk": 100,
    "def": 90,
    "spa": 90,
    "spd": 80,
    "spe": 55
  },
  "dracovish": {
    "hp": 90,
    "atk": 90,
    "def": 100,
    "spa": 70,
    "spd": 80,
    "spe": 75
  },
  "arctovish": {
    "hp": 90,
    "atk": 90,
    "def": 100,
    "spa": 80,
    "spd": 90,
    "spe": 55
  },
  "duraludon": {
    "hp": 70,
    "atk": 95,
    "def": 115,
    "spa": 120,
    "spd": 50,
    "spe": 85
  },
  "duraludongmax": {
    "hp": 70,
    "atk": 95,
    "def": 115,
    "spa": 120,
    "spd": 50,
    "spe": 85
  },
  "dreepy": {
    "hp": 28,
    "atk": 60,
    "def": 30,
    "spa": 40,
    "spd": 30,
    "spe": 82
  },
  "drakloak": {
    "hp": 68,
    "atk": 80,
    "def": 50,
    "spa": 60,
    "spd": 50,
    "spe": 102
  },
  "dragapult": {
    "hp": 88,
    "atk": 120,
    "def": 75,
    "spa": 100,
    "spd": 75,
    "spe": 142
  },
  "zacian": {
    "hp": 92,
    "atk": 130,
    "def": 115,
    "spa": 80,
    "spd": 115,
    "spe": 138
  },
  "zaciancrowned": {
    "hp": 92,
    "atk": 170,
    "def": 115,
    "spa": 80,
    "spd": 115,
    "spe": 148
  },
  "zamazenta": {
    "hp": 92,
    "atk": 130,
    "def": 115,
    "spa": 80,
    "spd": 115,
    "spe": 138
  },
  "zamazentacrowned": {
    "hp": 92,
    "atk": 130,
    "def": 145,
    "spa": 80,
    "spd": 145,
    "spe": 128
  },
  "eternatus": {
    "hp": 140,
    "atk": 85,
    "def": 95,
    "spa": 145,
    "spd": 95,
    "spe": 130
  },
  "eternatuseternamax": {
    "hp": 255,
    "atk": 115,
    "def": 250,
    "spa": 125,
    "spd": 250,
    "spe": 130
  },
  "missingno": {
    "hp": 33,
    "atk": 136,
    "def": 0,
    "spa": 6,
    "spd": 6,
    "spe": 29
  },
  "syclar": {
    "hp": 40,
    "atk": 76,
    "def": 45,
    "spa": 74,
    "spd": 39,
    "spe": 91
  },
  "syclant": {
    "hp": 70,
    "atk": 116,
    "def": 70,
    "spa": 114,
    "spd": 64,
    "spe": 121
  },
  "revenankh": {
    "hp": 90,
    "atk": 105,
    "def": 90,
    "spa": 65,
    "spd": 110,
    "spe": 65
  },
  "embirch": {
    "hp": 60,
    "atk": 40,
    "def": 55,
    "spa": 65,
    "spd": 40,
    "spe": 60
  },
  "flarelm": {
    "hp": 90,
    "atk": 50,
    "def": 95,
    "spa": 75,
    "spd": 70,
    "spe": 40
  },
  "pyroak": {
    "hp": 120,
    "atk": 70,
    "def": 105,
    "spa": 95,
    "spd": 90,
    "spe": 60
  },
  "breezi": {
    "hp": 50,
    "atk": 46,
    "def": 69,
    "spa": 60,
    "spd": 50,
    "spe": 75
  },
  "fidgit": {
    "hp": 95,
    "atk": 76,
    "def": 109,
    "spa": 90,
    "spd": 80,
    "spe": 105
  },
  "rebble": {
    "hp": 45,
    "atk": 25,
    "def": 65,
    "spa": 75,
    "spd": 55,
    "spe": 80
  },
  "tactite": {
    "hp": 70,
    "atk": 40,
    "def": 65,
    "spa": 100,
    "spd": 65,
    "spe": 95
  },
  "stratagem": {
    "hp": 90,
    "atk": 60,
    "def": 65,
    "spa": 120,
    "spd": 70,
    "spe": 130
  },
  "privatyke": {
    "hp": 65,
    "atk": 75,
    "def": 65,
    "spa": 40,
    "spd": 60,
    "spe": 45
  },
  "arghonaut": {
    "hp": 105,
    "atk": 110,
    "def": 95,
    "spa": 70,
    "spd": 100,
    "spe": 75
  },
  "kitsunoh": {
    "hp": 80,
    "atk": 103,
    "def": 85,
    "spa": 55,
    "spd": 80,
    "spe": 110
  },
  "cyclohm": {
    "hp": 108,
    "atk": 60,
    "def": 118,
    "spa": 112,
    "spd": 70,
    "spe": 80
  },
  "colossoil": {
    "hp": 133,
    "atk": 122,
    "def": 72,
    "spa": 71,
    "spd": 72,
    "spe": 95
  },
  "krilowatt": {
    "hp": 151,
    "atk": 84,
    "def": 73,
    "spa": 83,
    "spd": 74,
    "spe": 105
  },
  "voodoll": {
    "hp": 55,
    "atk": 40,
    "def": 55,
    "spa": 75,
    "spd": 50,
    "spe": 70
  },
  "voodoom": {
    "hp": 90,
    "atk": 85,
    "def": 80,
    "spa": 105,
    "spd": 80,
    "spe": 110
  },
  "scratchet": {
    "hp": 55,
    "atk": 85,
    "def": 80,
    "spa": 20,
    "spd": 70,
    "spe": 40
  },
  "tomohawk": {
    "hp": 105,
    "atk": 60,
    "def": 90,
    "spa": 115,
    "spd": 80,
    "spe": 85
  },
  "necturine": {
    "hp": 49,
    "atk": 55,
    "def": 60,
    "spa": 50,
    "spd": 75,
    "spe": 51
  },
  "necturna": {
    "hp": 64,
    "atk": 120,
    "def": 100,
    "spa": 85,
    "spd": 120,
    "spe": 58
  },
  "mollux": {
    "hp": 95,
    "atk": 45,
    "def": 83,
    "spa": 131,
    "spd": 105,
    "spe": 76
  },
  "cupra": {
    "hp": 50,
    "atk": 60,
    "def": 49,
    "spa": 67,
    "spd": 30,
    "spe": 44
  },
  "argalis": {
    "hp": 60,
    "atk": 90,
    "def": 89,
    "spa": 87,
    "spd": 40,
    "spe": 54
  },
  "aurumoth": {
    "hp": 110,
    "atk": 120,
    "def": 99,
    "spa": 117,
    "spd": 60,
    "spe": 94
  },
  "brattler": {
    "hp": 80,
    "atk": 70,
    "def": 40,
    "spa": 20,
    "spd": 90,
    "spe": 30
  },
  "malaconda": {
    "hp": 115,
    "atk": 100,
    "def": 60,
    "spa": 40,
    "spd": 130,
    "spe": 55
  },
  "cawdet": {
    "hp": 35,
    "atk": 72,
    "def": 85,
    "spa": 40,
    "spd": 55,
    "spe": 88
  },
  "cawmodore": {
    "hp": 50,
    "atk": 92,
    "def": 130,
    "spa": 65,
    "spd": 75,
    "spe": 118
  },
  "volkritter": {
    "hp": 60,
    "atk": 30,
    "def": 50,
    "spa": 80,
    "spd": 60,
    "spe": 70
  },
  "volkraken": {
    "hp": 100,
    "atk": 45,
    "def": 80,
    "spa": 135,
    "spd": 100,
    "spe": 95
  },
  "snugglow": {
    "hp": 40,
    "atk": 37,
    "def": 79,
    "spa": 91,
    "spd": 68,
    "spe": 70
  },
  "plasmanta": {
    "hp": 60,
    "atk": 57,
    "def": 119,
    "spa": 131,
    "spd": 98,
    "spe": 100
  },
  "floatoy": {
    "hp": 48,
    "atk": 70,
    "def": 40,
    "spa": 70,
    "spd": 30,
    "spe": 77
  },
  "caimanoe": {
    "hp": 73,
    "atk": 85,
    "def": 65,
    "spa": 80,
    "spd": 40,
    "spe": 87
  },
  "naviathan": {
    "hp": 103,
    "atk": 110,
    "def": 90,
    "spa": 95,
    "spd": 65,
    "spe": 97
  },
  "crucibelle": {
    "hp": 106,
    "atk": 105,
    "def": 65,
    "spa": 75,
    "spd": 85,
    "spe": 104
  },
  "crucibellemega": {
    "hp": 106,
    "atk": 135,
    "def": 75,
    "spa": 91,
    "spd": 125,
    "spe": 108
  },
  "pluffle": {
    "hp": 74,
    "atk": 38,
    "def": 51,
    "spa": 65,
    "spd": 78,
    "spe": 49
  },
  "kerfluffle": {
    "hp": 84,
    "atk": 78,
    "def": 86,
    "spa": 115,
    "spd": 88,
    "spe": 119
  },
  "pajantom": {
    "hp": 84,
    "atk": 133,
    "def": 71,
    "spa": 51,
    "spd": 111,
    "spe": 101
  },
  "mumbao": {
    "hp": 55,
    "atk": 30,
    "def": 64,
    "spa": 87,
    "spd": 73,
    "spe": 66
  },
  "jumbao": {
    "hp": 92,
    "atk": 63,
    "def": 97,
    "spa": 124,
    "spd": 104,
    "spe": 96
  },
  "fawnifer": {
    "hp": 49,
    "atk": 61,
    "def": 42,
    "spa": 52,
    "spd": 40,
    "spe": 76
  },
  "electrelk": {
    "hp": 59,
    "atk": 81,
    "def": 67,
    "spa": 57,
    "spd": 55,
    "spe": 101
  },
  "caribolt": {
    "hp": 84,
    "atk": 106,
    "def": 82,
    "spa": 77,
    "spd": 80,
    "spe": 106
  },
  "smogecko": {
    "hp": 48,
    "atk": 66,
    "def": 43,
    "spa": 58,
    "spd": 48,
    "spe": 56
  },
  "smoguana": {
    "hp": 68,
    "atk": 86,
    "def": 53,
    "spa": 68,
    "spd": 68,
    "spe": 76
  },
  "smokomodo": {
    "hp": 88,
    "atk": 116,
    "def": 67,
    "spa": 88,
    "spd": 78,
    "spe": 97
  },
  "swirlpool": {
    "hp": 61,
    "atk": 49,
    "def": 70,
    "spa": 50,
    "spd": 62,
    "spe": 28
  },
  "coribalis": {
    "hp": 76,
    "atk": 69,
    "def": 90,
    "spa": 65,
    "spd": 77,
    "spe": 43
  },
  "snaelstrom": {
    "hp": 91,
    "atk": 94,
    "def": 110,
    "spa": 80,
    "spd": 97,
    "spe": 63
  },
  "equilibra": {
    "hp": 102,
    "atk": 50,
    "def": 96,
    "spa": 133,
    "spd": 118,
    "spe": 60
  },
  "pokestarsmeargle": {
    "hp": 55,
    "atk": 20,
    "def": 35,
    "spa": 20,
    "spd": 45,
    "spe": 75
  },
  "pokestarufo": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarufo2": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarbrycenman": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarmt": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarmt2": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestartransport": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestargiant": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarhumanoid": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarmonster": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarf00": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarf002": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarspirit": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarblackdoor": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarwhitedoor": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarblackbelt": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  },
  "pokestarufopropu2": {
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spa": 100,
    "spd": 100,
    "spe": 100
  }
};
