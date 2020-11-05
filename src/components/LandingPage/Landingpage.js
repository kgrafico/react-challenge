import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './LandingPage.scss';

const styles = theme => ({});

export const Container = props => {
    const { classes } = props;

    return (
        <div id='layout' className="outer-container">
            <h1>Pizzabot challenge</h1>
            <h2 className="description">bla bla</h2>
            <input className="input-costumer"></input>
            <form>
            </form>
        </div>
    );
};

export default withStyles(styles)(Container);