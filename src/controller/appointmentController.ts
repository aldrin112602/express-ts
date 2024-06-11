import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import { RequestInterface } from "../interface/RequestInterface";

class AppointmentController {
  /**
   *
   */
  constructor() {}
  
  public create = async (req: RequestInterface, res: Response) => {
    try {
      const prisma = new PrismaClient();
    const {activeDay, newEvent,eventDoctor} = req.body

    const date = new Date()
    const time = newEvent.time;
    date.setDate(activeDay)
    date.setHours( + time.split(':')[0],  + time.split(':')[1], )

    const appointment = await prisma.appointment.create({
      data: {
        date: date,
        doctor_name: eventDoctor,
        description:newEvent.title,
        // doctor_id:1,
        patient_id: req.user.patient_id
      }
    })

    if(!appointment) {
      return res.status(400).json({
        message: 'something went wrong...'
      })
    }

    return res.status(201).json(appointment);
    } catch (error) {
      console.error(error)
      return res.status(400).json({
        message: 'something went wrong...'
      })
    }
  }

  public getAll = async (req: RequestInterface, res: Response) => {
    try {
      const prisma = new PrismaClient();
    // const today = moment.utc(date).tz("Asia/Manila").format();
    // console.log(today)

    const appointments = await prisma.appointment.findMany({
      where: {
        patient_id: req.user.patient_id
      }
    })

    return res.status(201).json(appointments);
    } catch (error) {
      return res.status(400).json({
        message: 'something went wrong...'
      })
    }
  }




  public updateStatus = async (req: RequestInterface, res: Response) => {
    try {
      const {appointmentId} = req.body;
      const prisma = new PrismaClient();

      if(!appointmentId) {
        return res.status(404).json({
          message: 'Appointment ID missing'
        })
      }

      const appointment = await prisma.appointment.findFirst({
        where: {
          appointment_id: + appointmentId as number 
        }
      })


      const updatedAppointments = await prisma.appointment.update({
        where: {
          appointment_id: appointment?.appointment_id
        },
        data: {
          request_status: "ACCEPTED"
        }
      })

      return res.status(201).json(updatedAppointments);
    } catch (error) {
      return res.status(400).json({
        message: 'something went wrong...'
      })
    }
  }

  public deleteStatus = async (req: RequestInterface, res: Response) => {
    try {
      const appointmentId = req.params.id
      const prisma = new PrismaClient();

      if(!appointmentId) {
        return res.status(404).json({
          message: 'Appointment ID missing'
        })
      }

      const appointment = await prisma.appointment.delete({
        where: {
          appointment_id: + appointmentId as number 
        }
      })

      return res.status(201).json(appointment);
    } catch (error) {
      return res.status(400).json({
        message: 'something went wrong...'
      })
    }
  }

}

export default AppointmentController;