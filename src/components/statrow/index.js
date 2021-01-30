import { h, Component } from 'preact';

class StatRow extends Component {
  constructor() {
    super();
  }

  renderInvestment(props) {
    const iv = props.results['iv'];
    const ev = props.results['ev'];
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
          <input name={this.props.name.toLowerCase() + '_base'} type='number' value={this.props.base} onInput={this.props.onInputBase} aria-label={"Base " + this.props.longName} />
        </td>
        <td>
          <input name={this.props.name.toLowerCase() + '_value'} type='number' value={this.props.value} onInput={this.props.onInputValue} aria-label={this.props.longName + " stat"} />
        </td>
        <td>
          {props.isHP ? ("") : (
            <select name={this.props.name.toLowerCase() + '_nature'} value={this.props.nature} onInput={this.props.onInputMod} aria-label={this.props.longName + " Nature modifier"}>
              <option value='1'>-</option>
              <option value='1.1'>1.1x</option>
              <option value='0.9'>0.9x</option>
            </select>
          )}
        </td>
        <td>
          {props.results !== false ? (
            this.renderInvestment(props)
          ) : ("")}
        </td>
      </tr>
    );
  }
}

export default StatRow;

