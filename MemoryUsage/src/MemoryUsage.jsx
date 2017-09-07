import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

var data = [];

const DATA_POINT_COUNT = 25;
const REFRESH_RATE = 1;

class MemoryUsage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            width: props.glContainer.width,
            height: props.glContainer.height,
            data: []
        };
        this.handleResize = this.handleResize.bind(this);
        this.props.glContainer.on('resize', this.handleResize);
        this.publishData = this.publishData.bind(this);
        this.publishData();
    }

    formatDateLabel(dt) {
        let h = dt.getHours();
        let m = dt.getMinutes();
        let s = dt.getSeconds();
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }

    publishData() {
        data.push({
            timestamp: this.formatDateLabel(new Date()), 
            memory: Math.round(Math.random() * 100)
        });

        let arr = [];
        let count = data.length > DATA_POINT_COUNT ? data.length : DATA_POINT_COUNT;
        for(var i = 0; i < count; i++) {
            arr.push(data[i] || {timestamp: '', memory: null});
        }

        if (arr.length > DATA_POINT_COUNT) {
            arr = arr.slice(arr.length - DATA_POINT_COUNT);
        }

        this.setState({
            data: arr
        });
        setTimeout(this.publishData, Math.round(1000 / REFRESH_RATE));
    }

    render () {
        let styles = {
            font: '11px Roboto, sans-serif',
            color: '#fff'
        };
        return (
                <section style={styles}>
                    <LineChart width={this.state.width} height={this.state.height} data={this.state.data} 
                        margin={{top: 30, right: 30, left: 20, bottom: 10}}>
                        <XAxis dataKey="timestamp"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="10 10" vertical={false}/>
                        <Tooltip/>
                        <Legend />
                        <Line type='monotone' dataKey='memory' name='Memory %' stroke='#fc0' isAnimationActive={false}/>
                    </LineChart>
                </section>
        );
    }

    handleResize() {
        this.setState({width: this.props.glContainer.width, height: this.props.glContainer.height});
    }
};

global.dashboard.registerWidget("MemoryUsage", MemoryUsage);