# Cómo pasé un proceso en Node.js de 5 horas a 5 minutos

Hola! Hoy vengo aquí a hablar de cómo pasé un proceso en Node.js de 5 horas a 5 minutos. Sin embargo, antes me gustaría presentarme. Soy Ulises Santana y trabajo como Full Stack Developer en Lean Mind donde ayudamos a otras empresas a hacer que sus proyectos de software sean más sostenibles. Soy de Gran Canaria, pero actualmente vivo en El Hierro desde donde trabajo en remoto. Tengo una perrita llamada Mocha (en honor al nombre en clave de JavaScript cuando Brendan Eich empezó a trabajar en él) y un gatete llamado Null. 

Antes de explicar cómo pasé un proceso en Node.js de 5 horas a 5 minutos, vamos a empezar el contexto de esta historia. Estaba trabajando para un cliente en un equipo de 5 personas, en el que las otras 4 se habían incorporado en los últimos 3 meses, mientras que yo llevaba casi un año con el cliente. En este equipo mi rol era el de Senior Node.js Developer y era el único que tenía experiencia previa trabajando con Node.js. Aparte había otra persona con experiencia con JavaScript y Dart, lo cual hacía que le resultara fácil adaptarse a los proyectos en TypeScript, que es el lenguaje en el que estaban todos los proyectos. Sin embargo, las otras tres personas del equipo tenían muy poca experiencia previa en JavaScript.

Por otro lado, estábamos trabajando en las distintas partes de un motor de facturación que necesitaba ser adaptado para un cambio legislativo. Esto último significa que el deadline no se podía mover, si el cambio no estaba hecho para esa fecha la empresa no podía generar la facturación del siguiente mes. En caso de que no llegáramos le rompíamos el cash flow. Suave, sin presión.

Por concluir esta contextualización:

- Se iba a rehacer un proyecto desde cero y habían modificaciones en varios más.
- No todo el equipo controlaba la tecnología en la que se estaba trabajando.
- El deadline es fijo y crítico, ya que rompemos el cash flow de la empresa en caso de retrasarnos.

## La calma antes de la tormenta

A Abraham Lincoln se le atribuye la siguiente frase: *Dame 6 horas para cortar un árbol y pasaré 4 afilando el hacha*. Sabíamos que iba a haber un cambio legislativo que conllevarían cambios en los proyectos, así que desde 2 meses antes del deadline propusimos refactorizar partes de los proyectos y uno en concreto solicitamos rehacerlo desde 0, ya que en ese entonces era realmente un prototipo que funcionaba, pero costaba mantener y con el cambio legislativo se iba a hacer más insostenible. Vamos a llamar a este proyecto el *Proyecto Leñador*.

![](assets/lumberjack.jpeg)

En Lean Mind por regla general trabajamos haciendo pair o mob programming, por lo que nadie nunca está solo y así facilitamos que el código sea más sostenible y que tanto la autoría del código como el conocimiento se comparta. Sin embargo, como teníamos 5 proyectos que actualizar decidimos dividirnos lo máximo posible para poder abarcar al menos 3 proyectos a la vez y poder tener los cambios lo antes posible. Eso sale a 2 personas por proyecto y una persona sola. Esa persona que se quedó sola fui yo y estuve a varias bandas asistiendo a los diferentes equipos a la par que trabajaba en el proyecto en el que me tocaba. 

Esta situación hizo que por falta de tiempo descuidara el proceso de code review y simplemente me centrara en resolver las dudas del equipo sobre todo en dominio, ya que recuerdo que el resto del equipo llevaba sólo 3 meses con el cliente y el dominio del negocio tenía una curva de asimilación de al menos 6 meses. Además, como hacíamos TDD, si los test pasan y reflejaban bien las especificaciones de negocio no había de qué preocuparse. 

El *Proyecto Leñador* fue llevado a cabo por miembros del equipo que no tenían mucha experiencia en JavaScript y ninguna en TypeScript. Esto no suponía a priori ningún problema porque ya llevaban tres meses haciendo pair o mob programming con miembros del equipo que sí tenían experiencia y estas mismas personas habían hecho aportaciones a los diferentes proyectos en TypeScript. Simplemente pedían ayuda o consejo cuando lo necesitaban y se les asistía.

La realidad es que el salto de calidad era más que evidente. No vi el proyecto en su estado final directamente, sino que lo vi evolucionar a lo largo de las semanas y realmente era mucho más claro en su propósito y no había sorpresas en la implementación. Yo había sido parte del equipo que había hecho ese prototipo 9 meses atrás y la verdad es que había ciertas partes que para mí eran un pelín oscuras, que no terminaba de entender cómo funcionaban o cuál era su propósito final.

Estaba muy orgulloso de lo que el equipo había conseguido, realmente era un proyecto mucho más sostenible, eliminando sorpresas. Sin embargo, cuando estaba terminado e hice una última revisión algo más extensa con el equipo veía algunos flujos de datos que tenían toda la pinta de bloquear el Event Loop, o al menos parte de él, perdiendo performance. Para comprobar el performance de este nuevo proyecto pasé al siguiente paso que teníamos planeado: hacer una prueba comparando el prototipo original con el *Proyecto Leñador*. 

El prototipo original basándose en un set de datos de unos cientos de miles de registros era capaz de hacerlo todo en unos 7 minutos. Con el mismo set de datos probé con el *Proyecto Leñador* y el resultado fue que tardó nada más y nada menos que **5 horas 7 minutos y 54 segundos.** Estamos hablando de que tardaba 44 veces más. El proceso real en producción tardaba cada noche unos 40 minutos, por lo que si mandábamos esto a producción el nuevo proceso tardaría unas 29 horas y 20 minutos, esta pérdida de performance era inasumible. En ese momento mi yo interno era algo así:

![](assets/gifs/coffin-dance.gif) 

Por meter más leña al fuego [¿lo pillas? Leña, *Proyecto Leñador* 🤣], esto pasó a unos 10 días del deadline, 10 días naturales. No podíamos replantear el proyecto, había que optimizarlo en menos de una semana, además de que había más cosas en la parrilla. En esta situación, por un lado me motivaba a mí mismo pensando cosas del tipo *Llevo toda mi vida preparándome para este momento, los talleres sobre asincronía en Node.js con Matteo Collina y James Snell van a dar sus frutos* [Por cierto, un saludo desde aquí a Matteo Collina y James Snell]. Sin embargo, otra parte de mí era una mezcla de esto:

![](assets/gifs/sheldon-bag.gif)
![](assets/gifs/pickle-rick.gif)

La realidad es que entré en modo pánico y empecé a refactorizar el proyecto y tratar de mejorar en performance todo lo que podía. No cambié nada de lógica, me limité a cambiar el flujo de datos asíncrono, que era mayormente todo lo que tuviera que ver con leer o escribir en base de datos.

## Campeando la tormenta

Tras este refactor vi ciertos patrones que quiero remarcar y mostrar:

### 1. Evita async innecesarios

```js
export function randomNumber() {
    return Math.random()
}

export async function asyncRandomNumber() {
    return Math.random()
}
```

Estas dos funciones son idénticas a excepción de que la segunda es asíncrona. Sin ningún motivo, pero es asíncrona. Cada vez que usamos async en una función, estamos automáticamente haciendo que devuelva una promesa, y eso hay que gestionarlo de más. 

Puede parecer una tontería, pero afecta. Hice un pequeño script para demostrar hasta qué punto esto afecta a nuestro performance. Lo que hace el script es ejecutar cada una de estas funciones por separado un millón de veces.

(_Demo async-await/useless-async_)

Como podemos ver, sólo por poner ese `async` hemos hecho que tarde casi seis veces más.

Aplicándolo a la vida real, en una suite de test (bastante grande) reducimos un 40% el tiempo que tardaba en ejecutarse sólo quitando los async innecesarios que se nos habían quedado después de un refactor.


### 2. Evita los await dentro de los bucles.

Imagina que tienes una tarea que hacer que sea en base a una lista de IDs tienes que recuperar información de una API. Por limitaciones técnicas no puedes pasarle a la API la lista de IDs, sino que tienes que hacer una llamada por cada ID. ¿Cuál es la primera idea que se nos viene a la cabeza? Probablemente un bucle, apesta a bucle. La implementación podría ser algo así:

```js
async function fetchUserListInfo(ids) {
  const values = []
  for (const id of ids) {
    values.push(await fetchUserInfo(id))
  }
  return values
}
```

Parece sencillo y además si lo probamos veremos que funciona. Consigue la información de todos los usuarios sin problemas. ¿Sin problemas? Ese await dentro del `for` fuerza a que se termine de completar cada promesa antes de procesar la siguiente. Esto significa que si de media la API tarda en responder 50ms y tenemos 100 IDS que procesar, tardaremos unos 5 segundos en realizar la tarea. No es que sea un drama, pero si implementamos esta otra solución la cosa cambia bastante:

```js
function fetchUserListInfo(ids) {
  const values = []
  for (const id of ids) {
    values.push(fetchUserInfo(id))
  }
  return Promise.all(values)
}
```

Aquí vemos hay tres sutiles diferencias:
1. La función ya no es asíncrona, aunque sí que devuelve una promesa.
1. Dentro del for ya no hacemos un await
1. Devolvemos un Promise.all en vez de los valores como hacíamos antes.

La gran diferencia de esta solución es que dentro del bucle no resolvemos las promesas, sino que simplemente las añadimos a nuestro array pendiente de ser resueltas. Cualquier función que devuelva una promesa la devuelve en este estado que hasta que no uses `await` o `.then` no estará *fulfilled* o *rejected*. Puedes verlo como el experimento del gato de Schrodinger, hasta que no abres la caja no sabes si el gato está vivo o muerto. A las promesas les pasa algo parecido, hasta que no las resuelves están en estado *pending* y una vez resueltas pueden estar *fulfilled*, que es cuando se ha resuelto satisfactoriamente, o *rejected* que es cuando ha habido algún error.

Volviendo a la solución, vemos que las promesas no se resuelven, sino que se almacenan directamente en estado *Pending* y la función al devolverlas, las resuelve todas *a la vez*. Esto hace que ahora la tarea se haga mucho más rápido, tardando lo que tarde en responderse la llamada a la API más lenta. 

Voy a mostrar otra demo en la que usamos casi el mismo código, lo único que cambia es que en vez de llamar a una API, espera un milisegundo y devolver una string. Lo que vamos a ver es cuanto tarda cada una de las soluciones ejecutando esta tarea para una lista de 100 IDS y lo va a hacer 1000 veces para que podamos ver si realmente hay una diferencia de performance o no.

Como vemos la diferencia es abismal. Para la misma tarea cuando usamos `Promise.all` tarda poco más de 1 segundo, pero cuando usamos `await` dentro del for tarda **casi 2 minutos**.

### 3. Usa Promise.all siempre que puedas

En nuestro día a día desarrollando soluciones de software nos encontramos que en más de una ocasión necesitamos varios recursos de diferentes sitios, ya sean tablas, bases de datos o APIs. Todo esto además tiene una naturaleza asícrona y necesitamos gestionarla.

```js
async function readAllUserInfo(userId) {
  const user = await readUser(userId)
  const contracts = await readContractsForUser(userId)
  const invoices = await readInvoicesForUser(userId)
  return {
    ...user,
    contracts,
    invoices
  }
}
```

Aquí vemos un problema parecido al anterior, pero sin bucles. Aunque es menos dramático, es otro de los sitios de donde podemos rascar performance si utilizamos `Promise.all`, ya que como vemos ninguna de las peticiones depende de la otra, por lo que podríamos pedir toda la información a la vez y así reducir el tiempo que necesita la función para realizar la tarea.

```js
async function readAllUserInfo(userId) {
  const [ user, contracts, invoices ] = await Promise.all([
    readUser(userId),
    readContractsForUser(userId),
    readInvoicesForUser(userId)
  ])
  return {
    ...user,
    contracts,
    invoices
  }
}
```

### 4. Sé consciente de cuantas promesas estás gestionando

```js
function fetchUserListInfo(ids) {
  return Promise.all(ids.map(fetchUserInfo))
}
```

Esta sería otra forma de hacer el `fetchUserListInfo` que hemos visto un par de diapositivas atrás. Tanto esta como la anterior solución tienen un problema, no sabes cuántas promesas vas a tener en el `Promise.all`. En casos en los que no sabes el número de promesa que vas a gestionar o este número es muy alto es recomendable usar la librería `p-map` y limitar la concurrencia. La razón para hacer esto es que si tienes demasiadas promesas puedes acabar haciéndote un DDoS a ti mismo sin darte cuenta. En el *Proyecto Leñador* más que un DDoS lo que nos preocupaba era ahogar la base de datos. En estos proyectos la práctica habitual era limitar la concurrencia al número de conexiones que teníamos configurado para la base de datos, evitando así ahogar la base de datos. 

```js
import pMap from 'p-map';

function fetchUserListInfo(ids) {
  return pMap(
    ids, 
    fetchUserInfo, 
    {concurrency: 10}
  )
}
```

Sólo tener en cuenta que `p-map` pasó a ser de tipo modules y a menos que tu proyecto esté hecho de esta manera no te va a funcionar. Para poder usarlo con CommonJS necesitas tirar de la versión 4. La realidad es que ambas versiones sólo difieren en si funcionan con ESModules o con CommonJS.

### 5. Cachear queries

Esto no es exclusivo de Node.js, pero era algo que no estábamos haciendo y que podía ayudar, ya que había ciertos datos que no cambiaban durante la ejecución y que no venía mal tenerlos cacheados. 

Lo que sí es exclusivo de Node.js es cómo cachear esta clase de datos. No cacheas el valor, sino la promesa que te devuelve. Ya después cuando coges la promesa cacheada la resuelves y sigues trabajando con normalidad.

Cacheando por valor: 
```js
function CacheByValue() {
  let value = undefined

  return {
    async getNumber() {
      if (value === undefined) {
        value = await doSomethingAsync()
      }
      return value
    }
  }
}
``` 

Cacheando por promesa: 
```js
function CacheByPromise() {
  let value = undefined

  return {
    getNumber() {
      if (value === undefined) {
        value = doSomethingAsync()
      }
      return value
    }
  }
}
``` 

En esta otra demo hecho a correr estos dos trozos de código cien millones de veces para ver si realmente hay diferencia. La hay aunque es mínima. 

(_Demo best-practices/cached-promises_)

### 6. Haz caso de los warnings

No sé si a alguien más le pasa que la mayoría del tiempo ignoras los warnings y sólo le das importancia cuando son errores. En la consola al ejecutar el proceso me salía esto:
    
```shell
(node) warning: possible EventEmitter memory leak detected. 
11 listeners added. 
Use emitter.setMaxListeners() to increase limit.
```

Yo pensaba *Meh, es un warning*. En una primera instancia simplemente hice lo que me decía y aumenté los listeners sin darle mayor importancia. Sin embargo, el proceso todavía era demasiado lento así que investigué el warning. 

El problema era que había event handlers que se estaban creando continuamente con cada conexión que se solicitaba al pool de conexiones de la base de datos, pero que no se estaban eliminando, siendo el causante del memory leak. Tras implementar el fix en el que cada vez que se devuelve una conexión al pool se limpian los event handlers asociados a la conexión vimos una mejoría en la performance, tardando 4 veces menos de lo que tardaba antes.  

## Resultado  

Con todas estas mejoras en el *Proyecto Leñador* lo volvimos a ejecutar con el mismo set de datos y en esta ocasión tardó **04:52**. Era incluso más rápido que el prototipo original que tardaba 7 minutos. En ese momento mi yo interior era algo así:

![](assets/gifs/fuck-yeah-dude.gif) 

Y ya por estar completamente seguros de que había una mejora, ejecutamos una prueba con un set de datos semejante al que se enfrentaba en producción día a día, que eran millones de registros en la base de datos. En este caso el resultado quedó claro:

- Prototipo: 41:29 minutos  
- *Proyecto Leñador:* 31:56 minutos

Aparte de haber mejorado la sostenibilidad del proyecto, habíamos mejorado la performance más de un 20%. Y todo esto llegando al deadline.

## Cosas que aprendí

Tras esta experiencia saqué un par de cosas en claro:

- **La asincronía en JS es más incomprendida de lo que pensaba**. La gestión de asincronía en JavaScript es algo que no todo el mundo tiene interiorizado. Todo el mundo usa promesas y el async/await y empezar a trabajar con JavaScript o TypeScript no es complicado, lo que sí es más complicado es saber cómo gestionar la asincronía en JavaScript.
- **Forma a tu equipo**, comparte el conocimiento. Busca tiempo en la semana para poco a poco ir formándolo. En mi experiencia el mob programming ayuda bastante, pero no es suficiente. Algunos conceptos necesitas interiorizarlos y para eso lo mejor es hacer katas o tener formaciones con objetivos concretos. Al principio es bastante duro preparar esta clase de formaciones, pero a medida que las tengas podrás reusarlas a medida que entren personas nuevas o si cambias de proyecto puedes formar a ese nuevo equipo.
- **No necesitas un ejército de Seniors aka personas experimentadas en X tecnología**. Con que haya un Senior que controle la tecnología es suficiente, pero la responsabilidad tecnológica no debe recaer enteramente en él, por lo que debe compartir el conocimiento.
- **Sé prescindible.** Si eres prescindible no serás el cuello de botella. Ojo, prescindible que no innecesario. Con esto quiero decir que no seas crítico por conocimiento. Trata siempre de compartir tu conocimiento con el equipo.

Y esta ha sido la historia y el aprendizaje de cómo pasé un proceso en Node.js de 5 horas a 5 minutos.

## Bonus

### 1. No mezcles tipos de asincronía. 

Aparte de ser más difícil de leer, también acaba afectando al performance porque la mayoría de las veces lo que hacemos es complicar el comportamiento asíncrono.

(Meto un ejemplo)

### 2. Async generators, ese gran desconocido

Donde brilla de mala manera es en la gestión de streams. Aparte de eso, el otro caso de uso que más partido le he sacado es leyendo por lotes de una base de datos.

### 3. Investiga sobre el Evento Loop 

Comentar el documento de Node.js que tardaron 6 meses en escribir.