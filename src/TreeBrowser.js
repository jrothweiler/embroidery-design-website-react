import React from 'react';
import PropTypes from 'prop-types';

import Folder from './Folder';
import EmbDesignGrid from './EmbDesignGrid';

class TreeBrowser extends React.Component {

    state = {
        path: []
    }

    onClickFolder = (name) => {
        this.setState(oldState => {
            return {
                path: oldState.path.concat([name])
            }
        });
    }

    onClickBack = () => {
        this.setState(oldState => {
            return {
                path: oldState.path.slice(0, oldState.path.length - 1)
            }
        });
    }

    countDesigns = (nodes) => {
        let total = 0;
        for (let node of nodes) {
            if (node.pes) {
                total++;
            } else if (node.contents) {
                total += this.countDesigns(node.contents);
            }
        }
        return total;
    }

    getCurrentTreePos = () => {
        let currentTreePos = this.props.tree;
        for (let folder of this.state.path) {
            currentTreePos = currentTreePos.find(elem => elem.name === folder).contents
        }
        return currentTreePos;
    }

    render() {
        let currentTreePos = this.getCurrentTreePos();

        let folders = currentTreePos.filter(elem => ("contents" in elem));
        let designs = currentTreePos.filter(elem => ("pes" in elem));

        return (
            <div>
                <button onClick={() => this.onClickBack()}> back </button>
                {
                    folders.map(folder => (<Folder key={folder.name} name={folder.name} numDesigns={this.countDesigns(folder.contents)} handleClick={this.onClickFolder} />))
                }
                <EmbDesignGrid designs={designs} />
            </div>
        );
    }
}

TreeBrowser.propTypes = {
    tree: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            contents: PropTypes.array
        })
    ).isRequired
};

export default TreeBrowser;