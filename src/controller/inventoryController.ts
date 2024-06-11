import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import { RequestInterface } from "../interface/RequestInterface";

class InventoryController {
  /**
   *
   */
  constructor() {}

  public create = async (req: RequestInterface, res: Response) => {
    try {
      const prisma = new PrismaClient();
      const { name, quantity } = req.body;
      console.log('hello')

      if (!name || !quantity) {
        return res.status(400).json({
          message: "Name Or Quantity is required",
        });
      }

      const item = await prisma.inventory.create({
        data: {
          name,
          quantity: +quantity,
        },
      });

      if (!item) {
        return res.status(400).json({
          message: "something went wrong...",
        });
      }

      return res.status(201).json(item);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "something went wrong...",
      });
    }
  };

  public updateItem = async (req: RequestInterface, res: Response) => {
    try {
      const inventoryId = req.params.id
      const prisma = new PrismaClient();
      const {quantity} = req.body
      
      console.log('update inventory item', inventoryId,
      quantity)
      if(!inventoryId) {
        return res.status(404).json({
          message: 'Item ID missing'
        })
      }

      const inventory = await prisma.inventory.findFirst({
        where: {
          inventory_id: + inventoryId as number 
        }
      })

      if(!inventory) {
        return res.status(404).json({
          message: 'Inventory item not found'
        })
      }

      if(inventory.quantity && (inventory?.quantity < +quantity || inventory?.quantity <= 0)) {
        return res.status(400).json({
          message: 'cannot deduct the quantity of item to negative'
        })
      }
      
      const updatedItem = await prisma.inventory.update({
        where: {
          inventory_id: inventory?.inventory_id
        },
        data: {
          quantity: {
            decrement: +quantity as number
          }
        }
      })

      return res.status(201).json(updatedItem);
    } catch (error) {
      return res.status(400).json({
        message: 'something went wrong...'
      })
    }
  }

}

export default InventoryController;