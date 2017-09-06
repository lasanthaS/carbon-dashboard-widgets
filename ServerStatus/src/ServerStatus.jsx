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
        padding: '30px 15px 15px 15px'
    },
    container: {
        width: '33.33%',
        height: '100%',
        'min-height': '200px',
        'background-color': '#fc0',
        float: 'left',
        padding: '10px',
        'box-sizing': 'border-box'
    },
    containerDiv: {
        height: '100%',
        'min-height': '180px',
        'background-color': 'blue'
    },
    h3_p: {
        margin: 0,
        padding: '10px',
        'text-align': 'center',
        color: '#fff'
    },
    statusDiv: {
        'text-align': 'center'
    },
    statusSpan: {
        display: 'inline-block',
        margin: '0 auto',
        padding: '10px',
        border: '2px solid #000',
        'background-color': '#00ff00',
        width: '80px',
        'text-align': 'center'
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
                {this.state.servers}
            </section>
        );
    }

    retrieveServers() {
        let servers = serverData.map((s) => {
            return (
                <div style={styles.container}>
                    <div style={styles.containerDiv}>
                        <h3 style={styles.h3_p}>{s.name}</h3>
                        <p style={styles.h3_p}><strong>IP Address: </strong>{s.ip}</p>
                        <div  style={styles.statusDiv}>
                            <span style={styles.statusSpan}>{s.status ? 'Available': 'Failed'}</span>
                        </div>
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