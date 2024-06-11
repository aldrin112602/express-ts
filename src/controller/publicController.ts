import { Request, Response } from "express";
import { yes } from "../types/yes"; // we could use interface or types extending request
import poolConnection from "../config/connectDb";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
class PublicController {
  /**
   *
   */
  constructor() {}
  public indexController = async (req: yes, res: Response): Promise<void> => {
    const [result, _] = await poolConnection.execute(
      "INSERT INTO ts (username, password) VALUES (?, ?)",
      ["jean", "456"]
    );
    req.addNumbers;
    console.log(result);
    res.status(200).json({ name: "andro", age: 50 });
  };

  public register = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();

    
    console.log('register hitted', req.body)
    const {
      first_name,
      middle_name,
      last_name,
      suffix,
      birthdate,
      contactNo,
      homeAddress,
      city,
      barangay,
      zip,
      username,
      email,
      password,
      gender
    } = req.body;

    if(!first_name ||
      !middle_name ||
      !last_name ||
      !suffix ||
      !birthdate ||
      !contactNo ||
      !homeAddress ||
      !city ||
      !barangay ||
      !zip ||
      !username ||
      !email ||
      !password ||
      !gender) {
      return res.status(400).json("Fill out all the required fields");
    }

    const patient = await prisma.patient.create({
      data: {
        first_name,
        middle_name,
        last_name,
        suffix,
        birthdate: new Date(birthdate),
        barangay,
        contact_number: contactNo,
        house_address: homeAddress,
        city,
        zip,
        username: username,
        email,
        password,
        gender
      }
    });

    return res.status(200).json(patient);
  };

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const prisma = new PrismaClient();

    if (!username || !password) {
      return res.status(400).json("Invalid Credentials");
    }

    const patient = await prisma.patient.findFirst({
      where: {
        username,
      },
    });

    if (!patient) {
      return res.status(400).json("Invalid Credentials");
    }

    if (password !== patient.password) {
      return res.status(400).json("Invalid Credentials");
    }
    const maxAge = 24 * 60 * 60;

    const token = jwt.sign({ id: patient.patient_id }, "secret", {
      expiresIn: maxAge,
    });

    return res.status(200).json(token);
  };

  public getMe = async (req: Request, res: Response) => {
    try {
      const prisma = new PrismaClient();

      const token = req.headers.token;

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

      return res.status(200).json(patient);
    } catch (error) {
      return res.status(401).json("Patient not found");
    }
  };
}

export default PublicController;