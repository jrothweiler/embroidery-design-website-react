import React from 'react';
import PropTypes from 'prop-types';
import LookupNames from './lookup';

class Folder extends React.Component {
    render() {
        const lookupName = LookupNames[this.props.name]
        return (
            <a className="folder" onClick={() => this.props.handleClick(this.props.name)}>
                <img src='folder.png' className='foldericon' />
                <span className="name">
                    {this.props.name}
                </span>
                <br />
                {
                    lookupName && (
                        <span className="subtitle">
                            {lookupName}
                        </span>
                    )
                }
                <br />
                <span className="subtitle">
                    <span style={{ "font-weight": "bold" }}>{this.props.numDesigns}</span> designs
                </span>
            </a>
        );
    }
}

Folder.propTypes = {
    handleClick: PropTypes.func,
    name: PropTypes.string,
    numDesigns: PropTypes.number
}

Folder.defaultProps = {
    handleClick() { }
}

export default Folder;