import { h, Component } from 'preact';

import StatRow from './statrow';
import { getPossibleSet } from '../utils/statcalc';
import { pokedex, idify } from '../utils/stats';

class App extends Component {
  constructor() {
    super();

    this.state = {
      level: '50',
      base: {
        'hp': '',
        'atk': '',
        'def': '',
        'spa': '',
        'spd': '',
        'spe': ''
      },
      value: {
        'hp': '',
        'atk': '',
        'def': '',
        'spa': '',
        'spd': '',
        'spe': ''
      },
      nature: {
        'hp': '1',
        'atk': '1',
        'def': '1',
        'spa': '1',
        'spd': '1',
        'spe': '1'
      },
      results: {
        'hp': false,
        'atk': false,
        'def': false,
        'spa': false,
        'spd': false,
        'spe': false
      }
    };
  }

  onInputPokemon = (ev) => {
    const newId = idify(ev.target.value);
    if(Object.prototype.hasOwnProperty.call(pokedex, newId)) {
      this.setState((state) => {
        console.log(newId, pokedex[newId]);
        return {base: pokedex[newId]};
      });
    }
  }

  onInputLevel = (ev) => {
    this.setState((state) => {
      return {level: ev.target.value};
    });
  }

  onInputNature = (ev) => {
    this.setState((state) => {
      const nature = {
        'hp': 1,
        'atk': 1,
        'def': 1,
        'spa': 1,
        'spd': 1,
        'spe': 1
      };
      const stats = ev.target.value.split('/');
      if(stats[0] !== stats[1]) {
        nature[stats[0]] = 1.1;
        nature[stats[1]] = 0.9;
      }
      return { nature };
    });
  }

  onInputBase = (stat) => {
    return (ev) => {
      this.setState((state) => {
        const newBase = {...this.state.base};
        newBase[stat] = ev.target.value;
        return {base: newBase};
      });
    };
  }

  onInputValue = (stat) => {
    return (ev) => {
      this.setState((state) => {
        const newValue = {...this.state.value};
        newValue[stat] = ev.target.value;
        return {value: newValue};
      });
    };
  }

  onInputMod = (stat) => {
    return (ev) => {
      this.setState((state) => {
        const newNature = {...this.state.nature};
        newNature[stat] = ev.target.value;
        return {nature: newNature};
      });
    };
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    const results = {};
    ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].forEach((i) => {
      results[i] = getPossibleSet(
        i === 'hp',
        Number(this.state.value[i]),
        Number(this.state.base[i]),
        Number(this.state.level),
        Number(this.state.nature[i]));
      console.log(results[i]);
    });
    this.setState((state) => {
      return {results: results};
    });
  }

  render = (props, state) => (
    <form id="app" onsubmit={this.onSubmit}>
      <h1>Pokemon Set Reverser</h1>
      <div class="grid-x">
        <div class="cell small-12 medium-4">
          <label>
            Pokemon
            <input type="text" list="pokemon" onInput={this.onInputPokemon} />
          </label>
        </div>
        <div class="cell small-12 medium-4">
          <label>
            Level
            <input type="number" value={this.state.level} onInput={this.onInputLevel} />
          </label>
        </div>
        <div class="cell small-12 medium-4">
          <label>
            Nature
            <select onInput={this.onInputNature}>
              <option value="atk/spa">Adamant</option>
              <option value="spa/spa" selected>Bashful</option>
              <option value="def/atk">Bold</option>
              <option value="atk/spe">Brave</option>
              <option value="spd/atk">Calm</option>
              <option value="spd/spa">Careful</option>
              <option value="def/def">Docile</option>
              <option value="spd/def">Gentle</option>
              <option value="atk/atk">Hardy</option>
              <option value="spe/def">Hasty</option>
              <option value="def/spa">Impish</option>
              <option value="spe/spa">Jolly</option>
              <option value="def/spd">Lax</option>
              <option value="atk/def">Lonely</option>
              <option value="spa/def">Mild</option>
              <option value="spa/atk">Modest</option>
              <option value="spe/spd">Naive</option>
              <option value="atk/spd">Naughty</option>
              <option value="spa/spe">Quiet</option>
              <option value="spd/spd">Quirky</option>
              <option value="spa/spd">Rash</option>
              <option value="def/spe">Relaxed</option>
              <option value="spd/spe">Sassy</option>
              <option value="spe/spe">Serious</option>
              <option value="spe/atk">Timid</option>
            </select>
          </label>
        </div>
        <table class="cell small-12">
          <tbody>
            <tr>
              <td></td>
              <th scope="col">Base:</th>
              <th scope="col">Stat:</th>
              <th scope="col">Nature:</th>
              <th scope="col">Output:</th>
            </tr>
            <StatRow
              isHP={true}
              name={"HP"}
              base={state.base["hp"]}
              value={state.value["hp"]}
              onInputBase={this.onInputBase("hp")}
              onInputValue={this.onInputValue("hp")}
              results={this.state.results["hp"]}
            />
            <StatRow
              isHP={false}
              name={"Atk"}
              base={state.base["atk"]}
              value={state.value["atk"]}
              nature={state.nature["atk"]}
              onInputBase={this.onInputBase("atk")}
              onInputValue={this.onInputValue("atk")}
              onInputMod={this.onInputMod("atk")}
              results={this.state.results["atk"]}
            />
            <StatRow
              isHP={false}
              name={"Def"}
              base={state.base["def"]}
              value={state.value["def"]}
              nature={state.nature["def"]}
              onInputBase={this.onInputBase("def")}
              onInputValue={this.onInputValue("def")}
              onInputMod={this.onInputMod("def")}
              results={this.state.results["def"]}
            />
            <StatRow
              isHP={false}
              name={"SpA"}
              base={state.base["spa"]}
              value={state.value["spa"]}
              nature={state.nature["spa"]}
              onInputBase={this.onInputBase("spa")}
              onInputValue={this.onInputValue("spa")}
              onInputMod={this.onInputMod("spa")}
              results={this.state.results["spa"]}
            />
            <StatRow
              isHP={false}
              name={"SpD"}
              base={state.base["spd"]}
              value={state.value["spd"]}
              nature={state.nature["spd"]}
              onInputBase={this.onInputBase("spd")}
              onInputValue={this.onInputValue("spd")}
              onInputMod={this.onInputMod("spd")}
              results={this.state.results["spd"]}
            />
            <StatRow
              isHP={false}
              name={"Spe"}
              base={state.base["spe"]}
              value={state.value["spe"]}
              nature={state.nature["spe"]}
              onInputBase={this.onInputBase("spe")}
              onInputValue={this.onInputValue("spe")}
              onInputMod={this.onInputMod("spe")}
              results={this.state.results["spe"]}
            />
          </tbody>
        </table>
      </div>
      <button type="submit" class="button cell small-12">Calculate</button>
    </form>
  );
}

export default App;
