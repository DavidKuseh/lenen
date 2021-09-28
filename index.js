import { server } from "./api/server";

const port = 4000;

server.listen({port}, () => {
    console.log(`server up and running on http://localhost:${port}`)
});