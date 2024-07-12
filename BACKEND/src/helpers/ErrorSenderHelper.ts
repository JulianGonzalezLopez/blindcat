import { Response } from "express";

export default function handleError(res: Response, e: Object | unknown) {
  console.log(e);
  if (typeof e === "object" && e !== null) {
    if ("statusCode" in e && typeof e.statusCode === "number") {
      if ("errorMessage" in e && typeof e.errorMessage === "string") {
        res.status(e.statusCode).json({error:e.errorMessage});
      } else {
        res.status(e.statusCode).json("Default error");
      }
    } else {
      res.status(500).json({error:res || e});
    }
  } else {
    res.status(500).json({error:res || e});
  }
}
