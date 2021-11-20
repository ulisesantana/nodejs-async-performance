# Cómo pasé un proceso en Node.js de 5 horas a 5 minutos

En un proyecto me tuve que enfrentar con mi equipo a proceso en Node.js que después de hacerlo de cero para hacerlo más mantenible era mucho más ineficiente. Concretamente un 4400% más ineficiente. Sin embargo, después de reanalizar el flujo de datos para evitar bloqueos en el event loop conseguí que fuera más de 20% más rápido que el proceso original.

Mi plan es contar la historia de cómo conseguí pasar ese proceso de 5 horas a 5 minutos a base de pulir ciertas partes del flujo que eran asíncronas. De ahí extraeré los consejos en claro para que los asistentes puedan llevarse consejos concretos a la hora de trabajar en proyectos Node.js.