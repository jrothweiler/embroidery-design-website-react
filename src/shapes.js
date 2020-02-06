import PropTypes from 'prop-types';

const designProps = {
    name: PropTypes.string.isRequired,
    pes: PropTypes.shape({
        w: PropTypes.number,
        h: PropTypes.number,
        c: PropTypes.number,
        t: PropTypes.arrayOf(PropTypes.number)
    }).isRequired
};

const designObj = PropTypes.shape(designProps);

export default {
    designProps,
    designObj
}