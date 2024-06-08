import { Response } from "express";

export default function handleError(res: Response, e: Object | unknown) {
  if (typeof e === "object" && e !== null) {
    if ("statusCode" in e && typeof e.statusCode === "number") {
      if ("errorMessage" in e && typeof e.errorMessage === "string") {
        res.status(e.statusCode).send(e.errorMessage);
      } else {
        res.status(e.statusCode).send("Default error");
      }
    } else {
      res.status(500).send("Default error");
    }
  } else {
    res.status(500).send("Default error -");
  }
}
