import React, { Component } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

var data = [];

const DATA_POINT_COUNT = 25;
const REFRESH_RATE = 1;

class CpuUsage extends Component {
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

    formatDateLabel(m, s) {
        return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }

    publishData() {
        let dt = new Date();
        data.push({
            timestamp: this.formatDateLabel(dt.getMinutes(), dt.getSeconds()), 
            cpu1: Math.round(Math.random() * 100), 
            cpu2: Math.round(Math.random() * 100)
        });

        let arr = [];
        let count = data.length > DATA_POINT_COUNT ? data.length : DATA_POINT_COUNT;
        for(var i = 0; i < count; i++) {
            arr.push(data[i] || {timestamp: '', cpu1: null, cpu2: null});
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
        return (
                <section>
                    <AreaChart width={this.state.width} height={this.state.height} data={this.state.data} 
                        margin={{top: 30, right: 30, left: 20, bottom: 10}}>
                        <XAxis dataKey="timestamp"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="10 10"/>
                        <Tooltip/>
                        <Legend />
                        <Area type='monotone' dataKey='cpu1' name='CPU 1' stackId="1" stroke='#ff0000' fill='#ff0000' isAnimationActive={false}/>
                        <Area type='monotone' dataKey='cpu2' name='CPU 2' stackId="1" stroke='#00ff00' fill='#00ff00' isAnimationActive={false}/>
                    </AreaChart>
                </section>
        );
    }

    handleResize() {
        this.setState({width: this.props.glContainer.width, height: this.props.glContainer.height});
    }
};

global.dashboard.registerWidget("CpuUsage", CpuUsage);