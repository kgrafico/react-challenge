import React, { useState, useForm } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './LandingPage.scss';

const styles = theme => ({});

const Footer = ({title}) => (<footer>{title}</footer>);

export const Container = props => {
    const { classes } = props;

    const [value, setValue] = useState("");

    const [result, setResultValue] = useState("");
    const [error, setError] = useState({});

    const parseParams = el => {
        const num = el.split(/[()]+/).filter((e) => e);
        const size = formatPoint( "x" , [num[0]]);
        const arr = formatPoint(",", num.slice(1));

        checkDeliveryPoints(arr, size[0]) 
            ? weCanDelivery(arr)
            : setError({error: 'The order is outside our area'})
    }
    const routeFinal = deliveryPoints => {
        let initialPoint = {x:0, y:0};
        let route = '';
    
        deliveryPoints.map(e => {
            route = route + planRoute(initialPoint, e);
            initialPoint = e
        });
        return route;
    }
    
    const planRoute = (initialPoint, deliverPoint) => {
    
        let routeString1 = initialPoint.x < deliverPoint.x ? route(deliverPoint.x, initialPoint.x, 'E') : route(initialPoint.x, deliverPoint.x, 'W');
        let routeString2 = initialPoint.y < deliverPoint.y ? route(deliverPoint.y, initialPoint.y, 'N') : route(initialPoint.x, deliverPoint.x, 'S');
    
        return routeString1+routeString2+"D";
    }
    
    const route = (a, b, letter) => {
        let diff = a - b;
        a > b ? diff : diff = 0;
        return letter.repeat(diff) ;
    }
    
    const formatPoint = (mySeparator, myPoints) => {
        let myResult = [];
        let tmp = [];
    
        for (let i = 0; i < myPoints.length; i++) {
            tmp = myPoints[i].split(mySeparator);
            myResult.push({
                x: Number(tmp[0]), 
                y: Number(tmp[1])
            });
        }
        return myResult;
    }

    const checkDeliveryPoints = (points, area) => {
        for(let i = 0; i < points.length; i++) {
            if (points[i].x > area.x) {
                return false;
            }
            if (points[i].y > area.y) {
                return false;
            }
        }
        return true;
    }

    const validator = () => {
        const reg = /^((\d{1,})[x](\d{1,}))([(](\d{1,})[,](\d{1,})[)])+$/;
        return reg.test(value);
    }

    const weCanDelivery = d => {
        setResultValue(routeFinal(d));
        setError({});
    }

    const main = () => {
        if (!validator()) {
            setError({error: 'The coordinates are incorrect follow the rules to be able to to continue to the next step'});
            return;
        }

        parseParams(value);
    }

    
    return (
        <div id='layout' className="outer-container">
            <div className="content">
                <h1>Pizzabot challenge</h1>
                <h2 className="description">As part of our continuing commitment to the latest cutting-edge pizza technology research, Slice is working on a robot that delivers pizza. Therefore, given the following input string: <b className="color-tertiary">5x5 (1, 3) (4, 4)</b> one correct solution would be: <b className="color-tertiary">ENNNDEEEND</b></h2>
                <h2 className="description">Our application can interpret this for you, it just needs you to enter <b className="white-tertiary">the board size</b> and <b className="white-tertiary">the coordinates</b> inside of the next input:</h2>
                <div className="input-button">
                    <input required name="key" type="text" className="input-costumer" value={value.replace(/ /g, "").toLowerCase()} onChange={e => setValue(e.target.value.replace(/ /g, "").toLowerCase())}></input>
                    <button onClick={main} className="btn btn--stripe">Button</button>
                    <div className={`error-message ${!!error.error}`}>{error.error}</div>
                    <h2 className={`result ${!!!error.error}`}>{result}</h2>
                </div>
            </div>
            <Footer title={'Created by: Carolina Chamorro'}/>
        </div>
    );
};

export default withStyles(styles)(Container);