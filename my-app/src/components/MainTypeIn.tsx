import Button from '@material-ui/core/Button';
import * as React from "react";

class MainTypeIn extends React.Component {
	public state = {
		amountEntered: '',
		error: '',
		finalValue: '',
		name: '',
		primary: '',
		result: '',
		secondary: '',
		zzz:'',
	}

	/**
	 * Method used to check whether the returned api object is empty
	 */
	public isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}

	public printFinal(a:any){
		if((a!=null)){
			return parseFloat(this.state.finalValue).toFixed(2)
		} return 0;
	}


	/**
	 * simple method to get the currency information
	 */
	public getCurrency = async (e) => {
		e.preventDefault();
		const primary = (e.target.elements.primary.value).toUpperCase();
		const secondary = (e.target.elements.secondary.value).toUpperCase();
		const amountEntered = parseInt(e.target.elements.amountEntered.value, 10);

		const apiInfo = primary + '_' + secondary;
		const apiCall = await fetch(`https://free.currencyconverterapi.com/api/v6/convert?q=${apiInfo}&compact=ultra`);
		const apiData = await apiCall.json();
		const result = apiData[apiInfo];
		// const finalValue = amountEntered*result;



		/**
		 * Checks whether the input fields are empty
		 * Throws error message when any of the fields are missing
		 */
		if (this.isEmpty(primary) && this.isEmpty(secondary)) {

			this.setState({
				error: 'Check primary and secondary currency again, thanks'
			})


			/**
			 * Throws error message when primary input field is missing
			 */
		} else if (this.isEmpty(primary)) {

			this.setState({
				error: 'primary input box is empty'
			})

			/**
			 * Throws error message when secondary input field is missing
			 */
		} else if (this.isEmpty(secondary)) {

			this.setState({
				error: 'secondary input box is empty'
			})

			/**
			 * Checks whether the returned value of API is empty
			 * throws error message when returned API_DATA returns nothing
			 */
		} else if (this.isEmpty(apiData)) {

			this.setState({
				error: "Search result is empty. Please check inputs and try again",
			})

			/**
			 * Successful API_DATA return displays necessary info.
			 */
		} else {

			this.setState({
				error: '',
				finalValue: amountEntered * result,
			})

		}
	}

	/**
	 * handles the changes of the input
	 */
	public handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	/**
	 * handles the action when the submit button is pressed
	 */
	public handleSubmit = (e) => {
		this.getCurrency(e);
		if(this.state.primary==='' && this.state.secondary===''){
			alert('Check primary and secondary currency again')	
		} else if(this.state.primary===''){
			alert('primary input box is empty')
		} else if(this.state.secondary===''){
			alert('secondary input box is empty')	
		} else if(this.state.amountEntered===''||this.state.amountEntered===null||this.state.amountEntered==='0'){
			alert('Please enter a number in the amount field')	
		
		e.preventDefault();
		}
	}

	public render() {
		return (
			<div>
				<div className="main-function"
					style={{
						display: 'flex',
						justifyContent: 'center'
					}}>
					
					<form onSubmit={this.handleSubmit}>
						<input
							id="numberValue"
							type="number"
							pattern="[0-9]*"
							placeholder="1"
							value={this.state.amountEntered}
							onChange={this.handleChange}
							name="amountEntered" />

						<input
							id="primary"
							placeholder="NZD"
							value={this.state.primary}
							onChange={this.handleChange}
							name="primary" />

						To

						<input
							id="secondary"
							placeholder="USD"
							value={this.state.secondary}
							onChange={this.handleChange}
							name="secondary" />

						<Button 
							id="convert"
							type="submit"
							value="Convert"
							variant="contained"
							color="primary">
        					Convert
      					</Button>

						<input
						id='resultBox'
						type="input"
						placeholder="0"
						value={this.printFinal(this.state.finalValue)}
						onChange={this.handleChange}
						/>

						
					</form>

					
				</div>

				<div className="error"
					style={{
						display: 'flex',
						justifyContent: 'center'
					}}>
					{this.state.error}
				</div>

			</div>

		);
	}

}

export default MainTypeIn;