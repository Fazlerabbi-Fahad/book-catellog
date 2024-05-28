import { Order, OrderBook } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { OrderBookItem } from "./order.interface";

const insertIntoDB = async (orderBook: OrderBookItem[], order: Order) => {
  const { userId } = order;

  const result = await prisma.order.create({
    data: {
      userId,
      orderBook: {
        create: orderBook.map((item: any) => ({
          bookId: item.bookId,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      orderBook: true,
    },
  });
  return result;
};

const getAllData = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    include: {
      orderBook: true,
    },
  });
  return result;
};

const getDataById = async (id: string) => {
  const result = await prisma.order.findUnique({
    where: {
      id: id,
    },
    include: {
      orderBook: true,
    },
  });
  return result;
};

const updateIntoDB = async (id: string, data: Partial<Order>) => {
  const result = await prisma.order.update({
    where: {
      id: id,
    },
    data,
    include: {
      orderBook: true,
    },
  });
  return result;
};

const deleteFromData = async (id: string) => {
  await prisma.orderBook.deleteMany({
    where: {
      orderId: id,
    },
  });

  const result = await prisma.order.delete({
    where: {
      id: id,
    },
    include: {
      orderBook: true,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllData,
  getDataById,
  updateIntoDB,
  deleteFromData,
};
