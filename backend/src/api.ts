import express, { Response } from 'express';
import { getResult, setRoutes } from "./ryanair";
import { Route } from "./items";
import { createClient } from 'redis';


let allRoutes: Route[] = [];

const app = express();
const port = 3000;
const redisClient = createClient();


interface QueryParams {
  origin: string,
  destination: string,
  ignoredDestinations: string[],
  outFromDate: Date,
  outToDate: Date,
  lengthMin: number,
  lengthMax: number,
  timeShift: number,
  pageKey: number
}




app.get('/getFlights', async (req: any, res: Response) => {
  let queryParams: QueryParams
  try {
    queryParams = {
      origin: req.query.origin as string,
      destination: req.query.destination,
      ignoredDestinations: req.query.ignoredDestinations ? req.query.ignoredDestinations.split(",") : [],
      outFromDate: new Date(req.query.outFromDate),
      outToDate: new Date(req.query.outToDate),
      lengthMin: req.query.lengthMin ?? -1,
      lengthMax: req.query.lengthMax ?? -1,
      timeShift: req.query.timeShift ?? 0,
      pageKey: req.query.pageKey ?? 1
    };
  } catch (e) {
    console.log(e)
    await res.status(500).send("Something went wrong!")
    return
  }

  if (queryParams.origin.length != 3) {
    await res.status(501).send("Length of origin not 3 characters. (No IATA-Code)")
    return
  }
  if (queryParams.destination.length != 3 && queryParams.destination.length != 2 && queryParams.destination != "All destinations") {
    await res.status(501).send("Destination not accepted")
    return
  }

  if(queryParams.lengthMin === -1 && queryParams.lengthMax === -1){
    const length = (queryParams.outToDate.getTime() - queryParams.outFromDate.getTime()) / (1000 * 3600 * 24) + 1;
    queryParams.lengthMin = length;
    queryParams.lengthMax = length;
  }

  const redisKey = req.originalUrl.includes("&pageKey") ? req.originalUrl.split("&pageKey")[0] : req.originalUrl
  const redisResult = await redisClient.get(redisKey)
  let result;
  if(redisResult){
    console.log("Getting cache")
    result = JSON.parse(redisResult)
  }else{
    console.log("Getting result...")
    result = await getResult(allRoutes, queryParams.origin, queryParams.destination, queryParams.ignoredDestinations, queryParams.outFromDate, queryParams.outToDate, queryParams.lengthMin, queryParams.lengthMax, queryParams.timeShift)
    await redisClient.set(redisKey, JSON.stringify(result), {EX: 60 * 60})
  }

  //pageKey
  if(result.length > queryParams.pageKey * 25){
    result = result.slice((queryParams.pageKey - 1) * 25, (queryParams.pageKey * 25));
  }else if (result.length > (queryParams.pageKey - 1) * 25 ) {
    result = result.slice((queryParams.pageKey - 1) * 25, result.length+1)
  }else{
    result = []
  }
  await res.send(result);
});

redisClient.on("connect", (arg: any) => console.log("Redis connected", arg));
redisClient.on("error", (err: any) =>
    console.log("Redis client error", err, process.exit(1))
);

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  await redisClient.connect();
  allRoutes = await setRoutes()
});