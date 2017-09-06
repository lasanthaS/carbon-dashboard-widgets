import React, { Component } from 'react';
import Widget from './Widget'

/**
 * This class depicts how the basic functions of widget state persistence works.
 */
class WidgetState extends Widget {
    /**
     * Constructor.
     */
    constructor() {
        super();
        this.btnGetStateHandler = this.btnGetStateHandler.bind(this);
        this.btnSetStateHandler = this.btnSetStateHandler.bind(this);
    }

    /**
     * Implements the renderWidget function.
     */
    renderWidget () {
        let styles = {
            container: {
                'padding': '15px 10px 10px 10px'
            },
            button: {
                'margin-right': '10px'
            }
        };

        return (
            <div style={styles.container}>
                <button style={styles.button} onClick={this.btnGetStateHandler}>Get State</button>
                <button style={styles.button} onClick={this.btnSetStateHandler}>Set State</button>
            </div>
        );
    }

    /**
     * Event handler for get state button.
     */
    btnGetStateHandler() {
        // Syntax: super.getDashboardAPI().state.get(<KEY>)
        let msg = super.getDashboardAPI().state.get('msg');
        alert(msg);
    }

    /**
     * Event handler for set state button.
     */
    btnSetStateHandler() {
        // Syntax: super.getDashboardAPI().state.get(<KEY>, <VALUE>)
        super.getDashboardAPI().state.set('msg', 'Hello, world!');
    }
}

global.dashboard.registerWidget("WidgetState", WidgetState);