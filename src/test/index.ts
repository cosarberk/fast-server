import { FastServer } from "../fast-server";


const server = new FastServer()

server.USE()
server.ACTIVE_CORS()
server.ACTIVE_SHARE_FOLDERS("PUBLIC")
server.LISTEN()

//server.STARTSERVER()