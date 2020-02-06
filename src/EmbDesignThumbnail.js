import React from 'react';
import Shapes from './shapes';

class EmbDesignThumbnail extends React.Component {
    render() {
        return (<div className="designthumbnail"><canvas width='100' height='100' ref="canvas"></canvas><br />{Math.round(this.props.pes.w / 254 * 100) / 100}&quot; × {Math.round(this.props.pes.h / 254 * 100) / 100}&quot;<br />{this.props.pes.c} colors</div>);
    }

    componentDidMount() {
        let ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(100, 100);
        ctx.stroke();
    }

    //prepare canvas scale
    setCanvasParamsFromStitchData(canvas, data) {
        let ctx = canvas.getContext('2d')

        let spanX = data.max[0] - data.min[0];
        let spanY = data.max[1] - data.min[1];
        let scale = 1;
        scale = canvas.width / spanX;
        if ((spanY * scale) > canvas.height) scale = canvas.height / spanY;

        //set scale (first need to reset from previous scale)
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(scale, scale);

        return ctx;
    }

    clearCanvas(canvas) {
        let ctx = canvas.getContext('2d')
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    };

    renderStitchesToCanvas(canvas, data) {
        let ctx = this.setCanvasParamsFromStitchData(canvas, data);

        ctx.lineWidth = 3;
        for (let i = 0; i < data.stitchBlocks.length; i++) {
            let currentBlock = data.stitchBlocks[i];
            let posx = currentBlock[0];
            let posy = currentBlock[1];
            let sulkyColor = {r: 100, g: 100, b: 100};//getSulkyColorById(data.colorTable[i]);

            ctx.moveTo(posx, posy);
            ctx.beginPath();
            ctx.lineJoin = "round";
            for (let j = 2; j < currentBlock.length; j += 2) {
                let x = (posx + currentBlock[j]) - data.min[0];
                let y = (posy + currentBlock[j + 1]) - data.min[1];
                ctx.lineTo(x, y);
                posx += currentBlock[j];
                posy += currentBlock[j + 1];
            }
            ctx.strokeStyle = "rgb(" + sulkyColor.r + ", " + sulkyColor.g + ", " + sulkyColor.b + ")";
            ctx.stroke();
        }
    }
}

EmbDesignThumbnail.propTypes = Shapes.designProps;

export default EmbDesignThumbnail;