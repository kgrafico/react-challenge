import React, { useState, useForm } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './LandingPage.scss';
import delivery from '../../../img/delivery.png';
import white from '../../../img/white.png';


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
    const { classes } = props;
    const [value, setValue] = useState("");
    const [position, setPosition] = useState(0);

    const [result, setResultValue] = useState("");
    const [error, setError] = useState({});

    const [matrixXValue, setmatrixX] = useState(0);
    const [matrixYValue, setmatrixY] = useState(0);

    const matrixX = params => {
        return setmatrixX(Number(params.split("x")[0]));
    }
    const matrixY = params => {
        return setmatrixY(Number(params.split("x")[1] && params.split("x")[1].split("(")[0]));
    }
    
    const matrix = params => {
         return {x: matrixX(params), y: matrixY(params)};
    }

    const moveDelivery = choice => {
        const obj = {
            'W': () => left(),
            'E': () => right(),
            'N': () => up(),
            'S': () => down(),
        }
        return obj[choice]();
    }

    const left = () =>{
        document.getElementById('a'+position).src={white};
        setPosition(value + 1);
        document.getElementById("a"+position).src={delivery}
    }
    const right = () =>{
        document.getElementById('a'+position).src={white};
        setPosition(value - 1);
        document.getElementById("a"+position).src={delivery}
    }
    const up = () => {
        document.getElementById('a'+position).src={white};
        setPosition(value - matrixXValue);
        document.getElementById("a"+position).src={delivery}
    }
    const down = () => {
        document.getElementById('a'+position).src={white};
        setPosition(value + matrixYValue);
        document.getElementById("a"+position).src={delivery}
    }

    const validator = () => {
        const reg = /((\d{1,})[x](\d{1,}))([(](\d{1,})[,](\d{1,})[)])+/;
        return reg.test(value);
    }

    const weCanDelivery = deliverPoints => {
        setResultValue(routeFinal(deliverPoints))
        setError({});
    }

    const main = () => {

        // ### You can youse the object with the examples (argsExample) to use with NODEMON ######
        // ############ if you execute this function with this uncommented variable #############
        //  ----------->      const arg = argsExample('sliceexample');
        //   ----------->     const deliverPoints = parseParams(idx(arg));
        //   ----------->     const dimensions = matrix(arg);
    
        const deliverPoints = parseParams(idx(value));
        const dimensions = matrix(value);
        
        if (!validator()) {
            return setError({error: 'The coordinates are incorrect follow the rules to be able to to continue to the next step'});
        }

        checkDeliveryPoints(deliverPoints, dimensions) 
            ? weCanDelivery(deliverPoints)
            : setError({error: 'The order is outside our area'})
    
    }

    const createTable = () => {
        let table = []
    
        for (let i = 0; i < matrixXValue; i++) {
          let children = []
          for (let j = 0; j < matrixYValue; j++) {
              debugger;
            if (j===0 && i===0) {
                children.push(<td key={`a1`}><img src={delivery} name={`a1`} id={`a1`}/></td>)
            }
            if (j>=0 && i>=0 && !(j===0 && i===0)) {
                children.push(<td key={`a${j + 1}`}><img src={white} name={`a${j + 1}`} id={`a${j + 1}`}/></td>)
            }
          }
          table.push(<tr key={`a${i + 1}`} className="table-tr">{children}</tr>)
        }
        return table
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
                <form className="form">
                    <table className="table">
                        <tbody>
                            {createTable()}
                        </tbody>
                    </table>
                </form>
            </div>
            <Footer title={'Created by: Carolina Chamorro'}/>
        </div>
    );
};

export default withStyles(styles)(Container);