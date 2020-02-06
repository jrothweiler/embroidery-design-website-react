import React from 'react';
import PropTypes from 'prop-types';
import Shapes from './shapes';
import EmbDesignThumbnail from "./EmbDesignThumbnail";


class EmbDesignGrid extends React.Component {
    render() {
        return (
            <div className="designtable">
                {
                    this.props.designs.map(design => (<EmbDesignThumbnail key={design.name} name={design.name} pes={design.pes} />))
                }
            </div>
        );
    }
}

EmbDesignGrid.propTypes = {
    designs: PropTypes.arrayOf(Shapes.designObj)
}

export default EmbDesignGrid;