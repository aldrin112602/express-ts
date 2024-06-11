import { NextFunction, Response } from "express";
import { RequestInterface } from "../interface/RequestInterface";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

class MiddleWare {
  middleFunction = async (
    req: RequestInterface,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const prisma = new PrismaClient();

      const token = req.headers.token

      if (!token) {
        return res.status(401).json({ message: "Token not Found" });
      }

      const payload = jwt.verify(token as string, "secret") as {
        id: number;
        iat: number;
        exp: number;
      };

      const patient = await prisma.patient.findFirst({
        where: {
          patient_id: payload.id,
        },
      });

      if (!patient) {
        return res.status(401).json("Patient not found");
      }

      req.user = patient;

      console.log('hitted')
      next();
    } catch (error: any) {
      console.log(error.message);
    }
  };
}

export default MiddleWare;