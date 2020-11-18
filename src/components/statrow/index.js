import { h, Component } from 'preact';

class StatRow extends Component {
  constructor() {
    super();
  }

  renderInvestment() {
    const iv = this.props.results['iv'];
    const ev = this.props.results['ev'];
    if(ev === 0 && iv === 31) {
      return "Uninvested";
    }
    if(ev === 0) {
      return `${iv} IVs`;
    }
    else {
      return `${ev} EVs`;
    }
  }

  render = (props, state) => {
    return (
      <tr>
        <th scope="row">
          {props.name}
        </th>
        <td>
          <input type='number' value={this.props.base} onInput={this.props.onInputBase} />
        </td>
        <td>
          <input type='number' value={this.props.value} onInput={this.props.onInputValue} />
        </td>
        <td>
          {props.isHP ? ("") : (
            <select value={this.props.nature} onInput={this.props.onInputMod}>
              <option value='1'>-</option>
              <option value='1.1'>1.1x</option>
              <option value='0.9'>0.9x</option>
            </select>
          )}
        </td>
        <td>
          {props.results !== false ? (
            this.renderInvestment()
          ) : ("")}
        </td>
      </tr>
    );
  }
}

export default StatRow;

