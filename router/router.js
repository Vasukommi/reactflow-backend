import Express from "express";
const Route = Express.Router();
import { getAllTables, getHeadersByTable } from "../controllers/workflow.js";

Route.get("/getAllTables", getAllTables);
Route.post("/getHeadersByTable", getHeadersByTable)


export default Route