const main = () => {
    const arg = argsExample('sliceexample');

    // Ckeck si arg es correcto.

    const deliverPoints = parseParams(idx(arg));
    const dimensions = matrix(arg);

    if (checkDeliveryPoints(deliverPoints, dimensions)) {
        console.log("We can delivery")
    } else {
        console.log('we dont')
    }

    const final = routeFinal(deliverPoints);
    console.log(final);

}

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

main()