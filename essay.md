# Cómo pasé un proceso en Node.js de 5 horas a 5 minutos

Hola! Soy Ulises Santana y trabajo como Full Stack Developer en Lean Mind donde ayudamos a otras empresas a hacer que sus proyectos de software sean más sostenibles. Soy de Gran Canaria, pero actualmente vivo en El Hierro desde donde trabajo de forma remota. Tengo una perrita llamada Mocha (en honor al nombre en clave de JavaScript cuando Brendan Eich empezó a trabajar en él) y un gatete llamado Null. 

Hoy vengo aquí a hablar de cómo pasé un proceso en Node.js de 5 horas a 5 minutos. Para ello vamos a empezar por lo básico, el contexto. Estaba trabajando para un cliente en un equipo de 5 personas, en el que las otras 4 se habían incorporado en los últimos 3 meses, mientras que yo llevaba casi un año con el cliente. En este equipo mi rol era el de Senior Node.js Developer y era el único que tenía experiencia previa trabajando con Node.js. Aparte había otra persona con experiencia con JavaScript y Dart, lo cual hacía que le resultara fácil adaptarse a los proyectos en TypeScript, que es el lenguaje en el que estaban todos los proyectos. Sin embargo, las otras tres personas del equipo tenían muy poca experiencia previa en JavaScript.

Por otro lado, estábamos trabajando en las distintas partes de un motor de facturación que necesitaba ser adaptado para un cambio legislativo. Esto último significa que el deadline no se podía mover, si el cambio no estaba hecho para esa fecha la empresa no podía generar la facturación del siguiente mes. En caso de que no llegáramos le rompíamos el cash flow. Suave, sin presión.

Por concluir esta contextualización:

- Se iba a rehacer un proyecto desde cero y habían modificaciones en varios más.
- No todo el equipo controlaba la tecnología en la que se estaba trabajando.
- El deadline es fijo y crítico, ya que rompemos el cash flow de la empresa en caso de retrasarnos.

## La calma antes de la tormenta

A Abraham Lincoln se le atribuye la siguiente frase: *Dame 6 horas para cortar un árbol y pasaré 4 afilando el hacha*. Sabíamos que iba a haber un cambio legislativo que conllevarían cambios en los proyectos, así que desde 2 meses antes del deadline propusimos refactorizar los proyectos y uno en concreto solicitamos rehacerlo desde 0, ya que en ese entonces era realmente un prototipo que funcionaba, pero costaba mantener y con el cambio legislativo se iba a hacer más insostenible. Vamos a llamar a este proyecto el *Proyecto Leñador*.

![](assets/lumberjack.jpeg)

En Lean Mind por regla general trabajamos haciendo pair o mob programming, por lo que nadie nunca está solo y así facilitamos que el código sea más sostenible y que tanto la autoría del código como el conocimiento se comparta. Sin embargo, como teníamos 5 proyectos que actualizar decidimos dividirnos lo máximo posible para poder abarcar al menos 3 proyectos a la vez y poder tener los cambios lo antes posible. Eso sale a 2 personas por proyecto y una persona sola. Esa persona que se quedó sola fui yo y estuve a varias bandas asistiendo a los diferentes equipos a la par que trabajaba en el proyecto en el que me tocaba. 

Esta situación hizo que por falta de tiempo descuidara el proceso de code review y simplemente me centrara en resolver las dudas del equipo sobre todo en dominio, ya que recuerdo que el resto del equipo llevaba solo 3 meses con el cliente y el dominio del negocio tenía una curva de asimilación de al menos 6 meses. Además, como hacíamos TDD, si los test pasan y reflejaban bien las especificaciones de negocio no había de qué preocuparse. 

El *Proyecto Leñador* fue llevado a cabo por miembros del equipo que no tenían mucha experiencia previa en JavaScript y ninguna en TypeScript. Esto no suponía a priori ningún problema porque ya llevaban tres meses haciendo pair o mob programming con miembros del equipo que sí tenían experiencia previa y estas mismas personas habían hecho aportaciones a los diferentes proyectos en TypeScript. Simplemente pedían ayuda o consejo cuando lo necesitaban y se les asistía.

La realidad es que el salto de calidad era más que evidente. No vi el proyecto en su estado final directamente, sino que lo vi evolucionar a lo largo de las semanas y realmente era mucho más claro en su propósito y no había sorpresas en la implementación. Yo había sido parte del equipo que había hecho ese prototipo 9 meses atrás y la verdad es que había ciertas partes que para mí eran un pelín oscuras, que no terminaba de entender cómo funcionaban o cuál era su propósito final.

Estaba muy orgulloso de lo que el equipo había conseguido, realmente era un proyecto mucho más sostenible, eliminando sorpresas. Sin embargo, cuando estaba terminado e hice una última revisión algo más extensa con el equipo veía algunos flujos de datos que tenían toda la pinta de bloquear el Event Loop, perdiendo performance. De todos modos, en ese momento no le di importancia, simplemente pasé al siguiente paso que teníamos planeado: hacer una prueba comparando el prototipo original con el *Proyecto Leñador* para ver si realmente bajo el mismo input había el mismo output y de paso ver cómo se comportaba en performance. 

El prototipo original basándose en un set de datos de unos cientos de miles de registros era capaz de hacerlo todo en unos 7 minutos. Con el mismo set de datos probé con el *Proyecto Leñador* y el resultado fue que tardó nada más y nada menos que **5 horas 7 minutos y 54 segundos.** Estamos hablando de que tardaba 44 veces más. El proceso real en producción tardaba cada noche unos 40 minutos, por lo que si mandábamos esto a producción el nuevo proceso tardaría unas 29 horas y 20 minutos, esta pérdida de performance era inasumible. En ese momento mi yo interno era algo así:

![](assets/gifs/coffin-dance.gif) 

Por meter más leña al fuego [¿lo pillas? Leña, *Proyecto Leñador* 🤣], esto pasó a unos 10 días del deadline, 10 días naturales. No podíamos replantear el proyecto, había que optimizarlo en menos de una semana, además de que había más cosas en la parrilla. En esta situación, por un lado me motivaba a mí mismo pensando cosas del tipo *Llevo toda mi vida preparándome para este momento, los talleres sobre asincronía en Node.js con Matteo Collina y James Snell van a dar sus frutos* [Por cierto, un saludo desde aquí a Matteo Collina y James Snell]. Sin embargo, otra parte de mí era una mezcla de esto:

![](assets/gifs/sheldon-bag.gif)
![](assets/gifs/pickle-rick.gif)

La realidad es que entré en modo pánico y empecé a refactorizar el proyecto y tratar de mejorar en performance todo lo que podía. No cambié nada de lógica, me limité a cambiar el flujo de datos asíncrono, que era mayormente todo lo que tuviera que ver con leer o escribir en base de datos.

## Campeando la tormenta

Tras este refactor vi ciertos patrones que quiero remarcar y mostrar:

### 1. Evita async innecesarios

Los async cuando los ponemos en una función, estamos automáticamente haciendo que devuelva una promesa, y eso hay que gestionarlo de más. (_Demo async-await/useless-async_)

* Ten en cuenta que cada función asíncrona de por sí devuelve una promesa. Si devuelves una promesa JavaScript tiene que gestionarlo. Comentar ejemplo de jest o incluso hacer un benchmarking.

### 2. Evita los await dentro de los bucles.

Imagina que tienes una tarea que hacer que sea en base a una lista de IDs tienes que recuperar información de una API. Por limitaciones técnicas no puedes pasarle a la API la lista de IDs, sino que tienes que hacer una llamada por cada ID. ¿Cuál es la primera idea que se nos viene a la cabeza? Probablemente un bucle, apesta a bucle. La implementación podría ser algo así:

```javascript
async function fetchUserListInfo(ids) {
  const values = []
  for (id of ids) {
    values.push(await fetchUserInfo(id))
  }
  return values
}
```

Parece sencillo y además si lo probamos veremos que funciona. Consigue la información de todos los usuarios sin problemas. ¿Sin problemas? Ese await dentro del `for` fuerza a que se termine de completar cada promesa antes de procesar la siguiente. Esto significa que si de media la API tarda en responder 50ms y tenemos 100 IDS que procesar, tardaremos unos 5 segundos en realizar la tarea. No es que sea un drama, pero si hacemos este ligero cambio la cosa cambia bastante:

```javascript
function fetchUserListInfo(ids) {
  const values = []
  for (id of ids) {
    values.push(fetchUserInfo(id))
  }
  return Promise.all(values)
}
```

Aquí vemos hay tres sutiles diferencias:
1. La función ya no es asíncrona, aunque sí que devuelve una promesa.
1. Dentro del for ya no hacemos un await
1. Devolvemos un Promise.all en vez de los valores como hacíamos antes.

La gran diferencia de esta solución es que dentro del bucle no resolvemos las promesas, sino que simplemente las añadimos a nuestro array en estado *Pending*. Cualquier función que devuelva una promesa la devuelve en este estado que hasta que no uses `await` o `.then` no estará *fulfilled* o *rejected*. Puedes verlo como el experimento del gato de Schrodinger, hasta que no abres la caja no sabes si el gato está vivo o muerto. A las promesas les pasa algo parecido, hasta que no las resuelves están en estado *pending* y una vez resueltas pueden estar *fulfilled*, que es cuando se ha resuelto satisfactoriamente, o *rejected* que es cuando ha habido algún error.

Volviendo a la solución, vemos que las promesas no se resuelven, sino que se almacenan directamente en estado *Pending* y la función al devolverlas, las resuelve todas *a la vez*. Esto hace que ahora la tarea se haga mucho más rápido, tardando lo que tarde en responderse la llamada a la API más lenta. 

Tengo por aquí otra demo en la que usamos el mismo código, lo único que cambia es la tarea en sí, que lo único que hace es esperar un milisegundo y devolvernos los 4 primeros caracteres del ID, simplemente por hacer algo. Lo que vamos a ver es cuanto tarda cada una de las soluciones ejecutando esta tarea para una lista de 100 IDS y lo va a hacer 1000 veces para que podamos ver si realmente hay una diferencia de performance o no.

### 3. Usa Promise.all siempre que puedas, el Promise.allSettled también existe

(_Demo best-practices/promise-all_)
(_Demo best-practices/promise-all-settled_)

### 4. Sé consciente de cuantas promesas estás gestionando

Si no sabes cuántas promesas vas a tener en un Promise.all usa p-map y limita la concurrencia. 

Recordar que la version 5 pasó a ser tipo modules y nosotros nos quedamos en la 4.

### 5. Los async iterators pueden ser maravillosos
Hasta ahora el único uso que les he dado es para leer en lotes de la base de datos. Sin embargo, en este caso de uso es maravilloso.

### 6. Cachear queries

Esto no es exclusivo de Node.js, pero era algo que no estábamos haciendo y que podía ayudar, ya que había ciertos datos que no cambiaban durante la ejecución y que no venía mal tenerlos cacheados. 

Lo que sí es exclusivo de Node.js es cómo cachear esta clase de datos. No cacheas el valor, sino la promesa que te devuelve. Ya después cuando coges la promesa cacheada la resuelves y ya.

(_Demo best-practices/cached-promises_)

### 7. Haz caso de los warnings

En la consola al ejecutar el proceso me salía esto:
    
```shell
(node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
```

Yo pensaba *Meh, es un warning*. En una primera instancia simplemente hice lo que me decía y aumenté los listeners. Sin embargo, hasta que no me dediqué a limpiar los listeners a medida que los usaba no noté la mejora de performance. No era un posible memory leak, era un memory leak en toda regla.

El problema era que había event handlers que se estaban creando continuamente con cada conexión que se solicitaba al pool de conexiones a la base de datos, pero que no se estaban eliminando, pudiendo ser el causante del memory leak. Tras implementar un fix en el que cada vez que se devuelve una conexión al pool se limpian los event handlers vimos una mejoría en la performance, bajando 4 veces el tiempo de ejecución.  

## Resultado  

Con todas estas mejoras en el *Proyecto Leñador* lo volvimos a ejecutar con el mismo set de datos y en esta ocasión tardó **04:52**, siendo incluso más rápido que el prototipo. 

![](assets/gifs/fuck-yeah-dude.gif) 

Y ya por estar completamente seguros de que había una mejora, ejecutamos una prueba con un set de datos semejante al que se enfrentaba en producción día a día, que eran millones de registros en la base de datos. En este caso el resultado quedó claro:

- Prototipo: 41:29 minutos  
- *Proyecto Leñador:* 31:56 minutos

Aparte de haber mejorado la sostenibilidad del proyecto, habíamos mejorado la performance más de un 20%. Y todo esto llegando al deadline.

## Otras cosas que he visto en otros proyectos y que tampoco recomiendo que hagas

* Poner ejemplo que es pan con pan y una pulga en medio. (_Demo async-await/dont-try-this-at-home_)
* Mezclar async/await con Promises


## Cosas que aprendí

Tras esta experiencia saqué un par de cosas en claro:

* **Forma a tu equipo**, comparte el conocimiento. Busca tiempo en la semana para poco a poco ir formándolo. En mi experiencia el mob programming ayuda bastante, pero no es suficiente. Algunos conceptos necesitas interiorizarlos y para eso lo mejor es hacer katas o tener formaciones con objetivos concretos. Al principio es bastante duro preparar esta clase de formaciones, pero a medida que las tengas podrás reusarlas a medida que entren personas nuevas o si cambias de proyecto puedes formar a ese nuevo equipo.
* **No necesitas un ejército de Seniors aka personas experimentadas en X tecnología**. Con que haya un Senior que controle la tecnología es suficiente, pero la responsabilidad tecnológica no debe recaer enteramente en él, por lo que debe compartir el conocimiento.
* **Sé prescindible.** Si eres prescindible no serás el cuello de botella. Ojo, prescindible que no innecesario. Con esto quiero decir que no seas crítico por conocimiento. Trata siempre de compartir tu conocimiento con el equipo.
