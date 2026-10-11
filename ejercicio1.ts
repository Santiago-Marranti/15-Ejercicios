/*
    En este caso se utiliza post para actualizar y get para eliminar una tarea. Debe usarse
    delete para eliminar y para una actualizacion parcial un patch.

    Rest se basa en recursos nombrados por sustantivos, no por acciones. Estos sustantivos
    deben ser escritos en plural.
*/

app.get("/api/v1/tareas", (req, res) => { /* ... */ });

app.post("/api/v1/tareas", (req, res) => { /* ... */ });
app.patch("/api/v1/tareas/:id", (req, res) => { /* ... */ });
app.delete("/api/v1/tareas/:id", (req, res) => { /* ... */ });