​
type point struct {
    x int
    y int
}
​
type dimensiones struct {
    x int
    y int
}
​
func main() {
    //badparams := "5x5(1,2)(3,4)(5,6)(7,8)"
    //goodparams := "5x6(1,2)(3,4)(4,4)(3,4)"
    //example := "5x5(1,3)(4,4)"
    example:= os.Args
    deliverPoints, dimensiones:= parseParams(example[1])
    if checkDeliveryPoints(deliverPoints, dimensiones) {
        fmt.Println("Podemos hacer delivery")
    } else {
        fmt.Println("no se puede")
    }
    var routaFinal string
    initialPoint := point{
        x: 0,
        y: 0,
    }
    for _, j := range deliverPoints {
        routaFinal= routaFinal + planRoute(initialPoint, j)
        initialPoint = j
    }
    fmt.Println(routaFinal)
}
​
func planRoute(initialPoint point, deliverPoint point) string  {
    var diffx int
    var diffy int
    var route string
​
    // East
    if initialPoint.x < deliverPoint.x {
        diffx = deliverPoint.x - initialPoint.x
        route = route + strings.Repeat("E", diffx)
    } else { //west
        diffx = initialPoint.x - deliverPoint.x
        route = route + strings.Repeat("W", diffx)
    }
​
    if initialPoint.y < deliverPoint.y {
        diffy = deliverPoint.y - initialPoint.y
        route = route + strings.Repeat("N", diffy)
    } else { //west
        diffy = initialPoint.y - deliverPoint.y
        route = route + strings.Repeat("S", diffy)
    }
    route = route + "D"
    return route
}
​
func checkDeliveryPoints (delivery []point, d dimensiones) bool {
    for _, j := range delivery {
         if j.x > d.x {
             return false
         }
         if j.y > d.y {
             return false
         }
    }
    return true
}
​
func parseParams(params string)  ([]point, dimensiones){
    // Declarar un array/slice de point
    //goodparams := "5x6(1,2)(3,4)(4,4)(3,4)"
    //[(2,3),(3,4),(5,6)
    //[P1,P2,P3]
    deliveryPoints := make([]point, 0)
   // [{1 2}, {3 4}, {5 6}]
      //[ P1, P2, P3]
​
    // Primera parte es coger las dimensiones
    idx := strings.Index(params, "x")
    var matrix dimensiones
    matrix.x, _ = strconv.Atoi(params[0:idx])
    // Not always it will be a single digit coordinate
    matrix.y, _ = strconv.Atoi(params[idx+1:idx+2])
​
    coordenadas := params[idx+2:]
    //(1,2)(3,4)(4,4)(3,4)
    for {
        idxLeftBracket:= strings.Index(coordenadas, "(")
        if idxLeftBracket == -1 {
            break
        }
        idxRightBracket:= strings.Index(coordenadas, ")")
        comaIndex :=strings.Index(coordenadas, ",")
        coordenadax := coordenadas[idxLeftBracket+1:comaIndex]
        coordenaday := coordenadas[comaIndex+1: idxRightBracket]
        x, _ := strconv.Atoi(coordenadax)
        y, _ := strconv.Atoi(coordenaday)
        p := point{
            x: x,
            y: y,
        }
        deliveryPoints=append(deliveryPoints,p)
        coordenadas = coordenadas[idxRightBracket+1:]
    }
    fmt.Println(deliveryPoints)
    return deliveryPoints, matrix
}