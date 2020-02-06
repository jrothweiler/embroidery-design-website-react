import React from 'react';
import axios from 'axios';
import './App.css';

import TreeBrowser from './TreeBrowser';

const GET_DESIGNS_URL = "https://embroidery.rothweiler.duckdns.org/getDesigns";

class App extends React.Component {

    //Default values for state
    state = {
        success: false,
        loading: true
    }

    async getTree() {
        let response = await axios.get(GET_DESIGNS_URL);
        if (response.status === 200 && response.data.status === 0) {
            return response.data.results;
        } else {
            throw new Error("Error");
        }
    }

    componentDidMount() {
        this.getTree().then(tree => {
            this.setState({ success: true, tree: tree });
        }).catch(tree => {
            //do nothing
        }).finally(() => {
            this.setState({ loading: false })
        });
    }

    render() {
        if (this.state.loading) {
            return (<div>Loading...</div>);
        } else if (!this.state.success) {
            return (<div>Error</div>);
        } else {
            return (<TreeBrowser tree={this.state.tree} />);
        }
    }
}

export default App;
