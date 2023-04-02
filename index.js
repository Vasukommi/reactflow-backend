import Express from "express";
import cors from 'cors'
const Server = Express()
import Route from "./router/router.js";

Server.use(Express.json());
Server.use(cors())
Server.use(Route)

Server.listen(4000, () => {
    console.log('Server is running on port 4000');
});