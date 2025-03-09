import express, { Express} from "express";
import http from 'http';
import { ApiListType, ApiType, ServerConfig, serverType } from "../types";
import cookieParser from "cookie-parser";
import cors from "cors";

export class FastServer{
    public APP: Express;
    public EXPRESS: any;
    public HTTP: typeof http;
    public apis?: ApiListType[]
    public config : ServerConfig;
  
    /**
     * 
     * @param apis 
     * An array consisting of JSON objects representing ApiTypes[].
     * 
     * @example
     * [[ {method,name,endpoint,middleware?,contorller}] ]
     * 
     * 
     * const apis:ApiListType[]=[
     *    [{method:"POST",name:"cutomApi",endpoint:"cutomApi",contorller:cutomApi.controller},
     *    [{method:"GET",name:"cutomApi1",endpoint:"cutomApi1",contorller:cutomApi.controller1},
     * 
     * ],
     *    [{method:"GET",name:"cutomApi3",endpoint:"cutomApi3",middleware:customApi3.middleware,contorller:cutomApi3.controller}]
     * 
     * ]
     */
    constructor(apis?:ApiListType[],config:ServerConfig={
        SERVER_PORT:4444,
        WS_PORT:4445,
        SERVER_TYPE:serverType.Develop,
        PUBLİC_FOLDER_NAME:"FILES",
        PREFIX:"api/v1"
    }) {
      this.APP = express();
      this.EXPRESS = express;
      this.HTTP = http;
     // this.STARTSERVER();
      this.apis=apis;
      this.config=config
    }

    public STARTSERVER() {
        this.USE();
        this.ACTIVE_CORS();
        this.ACTIVE_SHARE_FOLDERS(this.config.PUBLİC_FOLDER_NAME);
        this.LISTEN_API(this.apis?? [[{name:"test",method:"GET",controller:()=>{},endpoint:"test"}]]);
        this.ACTIVE_WS();
        this.LISTEN();
      }
    
      public USE() {
        let ex = this.EXPRESS;
        let app = this.APP;
    
        app.use(function (req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
          );
          next();
        });
    
        app.use(ex.json());
        app.use(ex.urlencoded());
        app.use(cookieParser());
      }
      public LISTEN() {
        let app = this.APP;
        let port = this.config.SERVER_PORT;
        let host = this.config.HOST || "0.0.0.0"
        const server =app.listen({ port: port, hostname: host }, () => {
          console.log(
            "success",
            `server is running in ${this.config.SERVER_TYPE} mode and on port ${port} `
          );
        });
        return server
      }
    
      public ACTIVE_CORS() {
        let app = this.APP;
        app.use(cors());
      }
    
      public ACTIVE_WS() {
        let { createServer } = this.HTTP;
        let app = this.APP;
    
        let port = this.config.WS_PORT
        let host = this.config.HOST || "0.0.0.0"
        const ws_server = createServer(app);
        ws_server.listen({ port: port, hostname: host }, () => {
          const address = ws_server.address();
          console.log(
            "info",
            `WS Server is running on port ${JSON.stringify(address)}`
          );
        });
        return ws_server
      }
    
      public ACTIVE_SHARE_FOLDERS(foldername: string) {
        let app = this.APP;
        let ex = this.EXPRESS;
        app.use(ex.static(foldername));
      }
    
      public LISTEN_API(apis: ApiListType[]) {
        let app = this.APP;
        apis.forEach((t: ApiType[]) => {
          t.forEach((_t: ApiType) => {
            (app as any)[_t.method.toLowerCase()](
              `/${this.config.PREFIX}/${_t.endpoint}`,
              ...(_t.middleware ? [_t.middleware] : []),
              _t.controller
            );
          });
        });
      }
}