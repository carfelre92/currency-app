import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import MainSelect from './MainSelect';
import MainTypeIn from './MainTypeIn';



function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


class Header extends React.Component {
    public state = {
        value: 0,
    };

    public handleChange = (event, value) => {
        this.setState({ value });
    };

    public render() {
        const { value } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        centered={true}
                    >
                        <Tab label="Type manually!" />
                        <Tab label="Select from box!" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                    <MainTypeIn/>
                </TabContainer>}
                {value === 1 && <TabContainer>
                    <MainSelect/>
                    </TabContainer>}
            </div>


        );
    }
}


export default Header;