import Button from '@material-ui/core/Button';
import * as React from "react";

class MainSelect extends React.Component {
    public state = {
        amountEntered: '',
        error: '',
        finalValue: '',
        name: '',
        primary: '',
        result: '',
        secondary: '',
        value: '',
        zzz: '',

    }

	/**
	 * Method used to check whether the returned api object is empty
	 */
    public isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

	/**
	 * simple method to get the currency information
	 */
    public getCurrency = async (e) => {
        e.preventDefault();
        const primary = this.state.primary
        const secondary = this.state.secondary
        const amountEntered = parseInt(this.state.amountEntered, 10);

        const apiInfo = primary + '_' + secondary;
        const apiCall = await fetch(`https://free.currencyconverterapi.com/api/v6/convert?q=${apiInfo}&compact=ultra`);
        const apiData = await apiCall.json();
        const result = apiData[apiInfo];

        this.setState({
            error: '',
            finalValue: amountEntered * result,
        })

    }

	/**
	 * handles the changes of the input
	 */
    public handlePrint = (e) => {
        this.getCurrency(e);
        this.setState({
            zzz: this.state.amountEntered + ' ' + this.state.primary + '_' + this.state.secondary
        })
        e.preventDefault();


        // tslint:disable-next-line:no-console
        console.log(this.state.zzz);
        // tslint:disable-next-line:no-console
        console.log(this.state.finalValue);
    }

    public handlePrimary = (e) => {
        this.setState({
            primary: e.target.value
        });
    }

    public handleSecondary = (e) => {
        this.setState({
            secondary: e.target.value
        });
    }

    public handleAmountEntered = (e) => {
        this.setState({
            amountEntered: e.target.value
        });
    }

    public handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    public render() {
        return (
            <div>
                <div className="main-function"
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                    <input
                        id="numberValue2"
                        type="number"
                        pattern="[0-9]*"
                        placeholder="1"
                        value={this.state.amountEntered}
                        onChange={this.handleAmountEntered}
                        name="amountEntered" />

                    <select id="primaryBox" onClick={this.handlePrimary}>
                        <option placeholder="primary" />
                        <option value="NZD">New Zealand Dollar</option>
                        <option value="USD">United States Dollar</option>
                        <option value="AUD">Australia Dollar</option>
                        <option value="KRW">Korean Won</option>
                        <option value="JPY">Japan Yen</option>
                        <option value="GBP">United Kingdom Pound</option>
                        <option value="THB">Thailand Bhat</option>
                        <option value="PHP">Philippines Peso </option>
                        <option value="CNY">China Yuan </option>
                    </select>

                    <select id="secondaryBox" onClick={this.handleSecondary}>
                        <option placeholder="secondary" />
                        <option value="NZD">New Zealand Dollar</option>
                        <option value="USD">United States Dollar</option>
                        <option value="AUD">Australia Dollar</option>
                        <option value="KRW">Korean Won</option>
                        <option value="JPY">Japan Yen</option>
                        <option value="GBP">United Kingdom Pound</option>
                        <option value="THB">Thailand Bhat</option>
                        <option value="PHP">Philippines Peso </option>
                        <option value="CNY">China Yuan </option>
                    </select>
                    
                    <Button 
						id="convert"
						type="submit"
						value="Convert"
						variant="contained"
						color="primary"
                        onClick={this.handlePrint}>                            
        				Convert
      				</Button>

                    <input
                        id='resultBox'
                        type="input"
                        placeholder="0"
                        value={(parseFloat(this.state.finalValue).toFixed(2))}
                        onChange={this.handleChange}
                    />

                </div>
            </div>
        );

    }
}

export default MainSelect;