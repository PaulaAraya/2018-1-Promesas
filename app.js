//Función Movimiento Horizontal
function animateElementHorizontal(elementHrz, startHrz, targetHrz, durationHrz){ //Retornará promesa con elemento
    elementHrz.style.left = startHrz; 
    let counter = 0;
    const delta = (targetHrz - startHrz)*40/durationHrz; //delta es lo que se debe mover por cuadro
    return new Promise((resolve, reject)=>{ // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
        const loop = setInterval(()=>{ // toma una funcion y la repite cada ciertos milisegundos
            const current = startHrz + counter++ * delta; //a acá indicamos el movimiento, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
            elementHrz.style.left = current;
            if(startHrz > targetHrz && current <= targetHrz){ // acá indicamos cuando queremos que finalize el moviento que seria al llegar a targetHrz
                elementHrz.style.left = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            }else if(startHrz < targetHrz && current >= targetHrz){
                elementHrz.style.left = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            }
        }, 40);// 40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
    });                  
}
//Función para movimiento vertical 
function animateElementVertical(elementVrtc, startVrtc, targetVrtc, durationVrtc){ 
    elementVrtc.style.top = startVrtc; // .top para los movimientos verticales
    let counter = 0;
    const delta = (targetVrtc - startVrtc)*40/durationVrtc; 
    return new Promise((resolve, reject)=>{ 
        const loop = setInterval(()=>{ 
            const current = startVrtc + counter++ * delta; 
            elementVrtc.style.top = current;
            if(startVrtc > targetVrtc && current <= targetVrtc){ 
                elementVrtc.style.top = current;
                clearInterval(loop); 
                resolve();
            }else if(startVrtc < targetVrtc && current >= targetVrtc){
                elementVrtc.style.top = current;
                clearInterval(loop); 
                resolve();
            }
        }, 40);
    }); 
}  
// Somos programadoras de la promise
//===================== Promise ===================
// Somos las usuarias de la promise

//Secuencial

const allLi = document.getElementsByTagName("li");


Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
    [
        animateElementHorizontal(allLi[1], -200, 1200, 8000), //movimiento de izq a derch
        animateElementHorizontal(allLi[0], -200, 600, 4000)
    ]
).then((results)=>{
    console.log("Todas las animaciones siguen");
    return Promise.all( 
        [
            animateElementHorizontal(allLi[1], 1200, -200, 8000), //movimiento de derch a izq
            animateElementHorizontal(allLi[0], 600, -200, 4000)
        ]
    )
}).then((results)=>{
    console.log("Todas las animaciones se mueven horizontalmente");
    return Promise.all( 
        [
            animateElementHorizontal(allLi[1], -200, 600, 8000), //movimiento de izq a derch
            animateElementHorizontal(allLi[0], -200, 1000, 4000)
        ]
    )
}).then((results)=>{ //animación vertical
    console.log("Todas las animaciones suben y bajan");
    return Promise.all( 
        [
            animateElementVertical(allLi[1], 400, 200, 3000), // movimiento de abajo hacia arriba
            animateElementVertical(allLi[0], 0, 400 , 3000) // movimiento de arriba hacia abajo
        ]
    )
}).then((results)=>{
    console.log("Todas las animaciones se mueven horizontalmente");
    return Promise.all( 
        [
            animateElementHorizontal(allLi[1], 600, 900, 4000), //movimiento de izq a derch
            animateElementHorizontal(allLi[0], 1000, 600, 4000) // derch a izq a derecha
        ]
    )
}).then((results)=>{ //animación vertical
    console.log("Todas las animaciones suben y bajan");
    return Promise.all( 
        [
            animateElementVertical(allLi[1], 200, 400, 3000), // movimiento de arriba hacia arriba
            animateElementVertical(allLi[0], 400, 200 , 3000) // movimiento de abajo hacia abajo
        ]
    )
}).then((results)=>{
    console.log("Todas las animaciones se mueven horizontalmente");
    return Promise.all( 
        [
            animateElementHorizontal(allLi[1], 900, 600, 4000), //movimiento de izq a derch
            animateElementHorizontal(allLi[0], 600, 1000, 4000) // derch a izq
        ]
    )
}).then((results)=>{ //animación vertical
    console.log("Todas las animaciones suben y bajan");
    return Promise.all( 
        [
            animateElementVertical(allLi[1], 400, 200, 3000), // movimiento de abajo hacia arriba
            animateElementVertical(allLi[0], 200, 400 , 3000) // movimiento de arriba hacia abajo
        ]
    )
}).then(()=>{
    console.log("Terminaron las animaciones de dar vuelta");
}).catch(()=>{
    console.log("Falló la animación");
});