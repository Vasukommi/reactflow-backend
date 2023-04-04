import Express from "express";
const Route = Express.Router();
import { getAllTables, getHeadersByTable, renderWorkflowOutput } from "../controllers/workflow.js";

Route.get("/getAllTables", getAllTables);
Route.post("/getHeadersByTable", getHeadersByTable)
Route.post("/renderWorkflowOutput", renderWorkflowOutput)


export default Route