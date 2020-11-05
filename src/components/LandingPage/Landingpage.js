import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './LandingPage.scss';

const styles = theme => ({});


const routeFinal = deliverPoints => {
    let initialPoint = {x:0, y:0};
    let route = '';

    deliverPoints.map(e => {
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


const argsExample = choice => {
    const obj = {
        badParams: '5x5(1,2)(3,4)(5,6)(7,8)',
        goodParams: '5x5(1,2)(3,4)(4,4)(3,4)',
        sliceexample: '5x5 (1,3) (4,4)'
    }
    return obj[choice].replace(/ /g, "");
}

const idx = params => {
    return params.substr(3,);
}

const matrixX = params => {
    return Number(params.substr(0,1));
}
const matrixY = params => {
    return Number(params.substr(2,1));
}

const matrix = params => {
     return {x: matrixX(params), y: matrixY(params)};
}

const checkDeliveryPoints = (points, d) => {
    return points.map(el => {
        if (el.x > d.x) {
            return false
        }
        if (el.y > d.y) {
            return false
        }
        return true
    })
}

const parseParams = el => {
    const arr = el.split(/[()]+/).filter((e) => e);

    return arr.reduce((total = [], coo) => {
        const couple = new Object();
        coo.split("").map( (e, i, o) => { 
            couple.x = Number(o[0]);
            couple.y = Number(o[2]);
        })
        total.push(couple);
        return total;
    }, [])
}

const Footer = ({title}) => (<footer>{title}</footer>);

export const Container = props => {
    const { classes, result } = props;
    const [value, setValue] = useState("");
    const [resultFinal, setResultValue] = useState("");

    const main = () => {
        // #######################################################################################
        // ### You can youse the object with the examples (argsExample) to use with NODEMON ######
        // ############ if you execute this function with this uncommented variable #############
        //  ----------->      const arg = argsExample('sliceexample');
        //   ----------->     const deliverPoints = parseParams(idx(arg));
        //   ----------->     const dimensions = matrix(arg);
        // #####################################################################################

    
        // Ckeck si arg es correcto.
    
        const deliverPoints = parseParams(idx(value));
        const dimensions = matrix(value);
    
        if (checkDeliveryPoints(deliverPoints, dimensions)) {
            console.log("We can delivery")
        } else {
            console.log('we dont')
        }
    
        setResultValue(routeFinal(deliverPoints));
    }
    
    return (
        <div id='layout' className="outer-container">
            <div className="content">
                <h1>Pizzabot challenge</h1>
                <h2 className="description">As part of our continuing commitment to the latest cutting-edge pizza technology research, Slice is working on a robot that delivers pizza. Therefore, given the following input string: <b>5x5 (1, 3) (4, 4)</b> one correct solution would be: <b>ENNNDEEEND</b></h2>
                <h2 className="description">Our application can interpret this for you, it just needs you to enter <b>the board size</b> and <b>the coordinates</b> inside of the next input:</h2>
                <div className="input-button">
                    <input className="input-costumer" value={value.replace(/ /g, "")} onChange={e => setValue(e.target.value.replace(/ /g, ""))}></input>
                    <button onClick={main} class="btn btn--stripe">Button</button>
                </div>
                <p>{resultFinal}</p>
                <form className="form">
                    <table className="table">
                        <tr className="table-tr">
                            <td><img src="" name="a1" id="a1"/></td>
                            <td><img src="" name="a2" id="a2"/></td>
                            <td><img src="" name="a3" id="a3"/></td>
                            <td><img src="" name="a4" id="a4"/></td>
                            <td><img src="" name="a5" id="a5"/></td>
                        </tr>
                        <tr className="table-tr">
                            <td><img src="" name="a6" id="a6"/></td>
                            <td><img src="" name="a7" id="a7"/></td>
                            <td><img src="" name="a8" id="a8"/></td>
                            <td><img src="" name="a9" id="a9"/></td>
                            <td><img src="" name="a10" id="a10"/></td>
                        </tr>
                        <tr className="table-tr">
                            <td><img src="" name="a11" id="a11"/></td>
                            <td><img src="" name="a12" id="a12"/></td>
                            <td><img src="" name="a13" id="a13"/></td>
                            <td><img src="" name="a14" id="a14"/></td>
                            <td><img src="" name="a15" id="a15"/></td>
                        </tr>
                        <tr className="table-tr">
                            <td><img src="" name="a16" id="a16"/></td>
                            <td><img src="" name="a17" id="a17"/></td>
                            <td><img src="" name="a18" id="a18"/></td>
                            <td><img src="" name="a19" id="a19"/></td>
                            <td><img src="" name="a20" id="a20"/></td>
                        </tr>
                        <tr className="table-tr">
                            <td><img src="" name="a21" id="a21"/></td>
                            <td><img src="" name="a22" id="a22"/></td>
                            <td><img src="" name="a23" id="a23"/></td>
                            <td><img src="" name="a24" id="a24"/></td>
                            <td><img src="" name="a25" id="a25"/></td>
                        </tr>
                    </table>
                </form>
            </div>
            <Footer title={'Created by: Carolina Chamorro'}/>
        </div>
    );
};

export default withStyles(styles)(Container);