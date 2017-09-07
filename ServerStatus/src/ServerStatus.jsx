import React, { Component } from 'react';
import Widget from './Widget';

let serverData = [
    {
        name: 'Server 1',
        ip: '192.168.1.2',
        status: true
    },
    {
        name: 'Server 2',
        ip: '192.168.1.3',
        status: true
    },
    {
        name: 'Server 3',
        ip: '192.168.1.4',
        status: false
    }
];

let styles = {
    wrapper: {
        padding: '30px 15px 15px 15px',
        font: '11px Roboto, sans-serif'
    },
    container: {
        width: '33.33%',
        'min-height': '200px',
        float: 'left',
        padding: '10px',
        'box-sizing': 'border-box'
    },
    containerDivUp: {
        'min-height': '180px',
        'background-color': '#19862b',
        'padding-top': '30px'
    },
    containerDivDown: {
        'min-height': '180px',
        'background-color': '#d00000',
        'padding-top': '30px'
    },
    h3: {
        margin: 0,
        padding: '10px',
        'text-align': 'center',
        color: '#fff',
        'font-size': '32px'
    },
    p: {
        margin: 0,
        padding: '10px',
        'text-align': 'center',
        color: '#fff',
    },
    h1: {
        color: '#fff',
        'font-size': '36px',
        margin: 0,
        'padding-bottom': '10px',
        'margin-bottom': '15px',
        'border-bottom': '1px solid #444'
    }
}

class ServerStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            width: props.glContainer.width,
            height: props.glContainer.height,
            servers: ""
        };
        this.handleResize = this.handleResize.bind(this);
        this.props.glContainer.on('resize', this.handleResize);
        this.retrieveServers = this.retrieveServers.bind(this);
    }

    componentDidMount() {
        this.retrieveServers();
    }

    render () {
        return (
            <section style={styles.wrapper}>
                <h1 style={styles.h1}>System Analytics</h1>
                {this.state.servers}
            </section>
        );
    }

    retrieveServers() {
        let servers = serverData.map((s) => {
            return (
                <div style={styles.container}>
                    <div style={s.status ? styles.containerDivUp : styles.containerDivDown}>
                        <h3 style={styles.h3}>{s.name}</h3>
                        <p style={styles.p}><strong>IP Address: </strong>{s.ip}</p>
                    </div>
                </div>
            );
        });
        this.setState({
            servers: servers
        });
    }

    handleResize() {
        this.setState({width: this.props.glContainer.width, height: this.props.glContainer.height});
    }
};

global.dashboard.registerWidget("ServerStatus", ServerStatus);