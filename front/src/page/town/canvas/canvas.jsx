import React, { useEffect, useState, useReducer } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import './canvas.scss';

const Town = ({ artist }) => {
    const { width, height, ref } = useResizeDetector();
    useEffect(() => {
        return () => artist.exit();
    }, [])
    useEffect(() => {
        const canvas = {
            background: document.querySelector('#cvs-background'),
            avatars: document.querySelector('#cvs-avatars'),
            names: document.querySelector('#cvs-names'),
            selfAvatar: document.querySelector('#cvs-self-avatar'),
            selfName: document.querySelector('#cvs-self-name'),
        }
        artist.setCanvas(canvas);
        artist.resize(width, height);
        artist.run();
    }, [width, height])

    return (
        <div id='container' ref={ref}>
            <canvas id="cvs-background" width={`${width}px`} height={`${height}px`} />
            <canvas id="cvs-avatars" width={`${width}px`} height={`${height}px`} />
            <canvas id="cvs-names" width={`${width}px`} height={`${height}px`} />
            <canvas id="cvs-self-avatar" width={`${width}px`} height={`${height}px`} />
            <canvas id="cvs-self-name" width={`${width}px`} height={`${height}px`} />
            <canvas id="cvs-foreground" width={`${width}px`} height={`${height}px`} />
        </div>
    );
}

export default Town;