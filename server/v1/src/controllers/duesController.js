const { PrismaClient } = require("@prisma/client");
const { nowMonthControl } = require("../helpers/date");
const status = require("http-status");
const prisma = new PrismaClient();

const listDues = async (req, res) => {
  const { apartmentId } = req.user;

  try {
    const dues = await prisma.apartment
      .findUnique({
        where: { id: apartmentId },
      })
      .dues({
        orderBy: { resident: { flatNumber: "asc" } },
        select: {
          id: true,
          isPaid: true,
          resident: {
            select: {
              flatNumber: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

    return res.suc(status.OK, dues);
  } catch (err) {
    console.log(err);
    return res.err(status.INTERNAL_SERVER_ERROR, "Bir hata oluştu.");
  }
};

const unPaidDues = async (req, res) => {
  const { month } = req.query;

  try {
    const { apartmentId } = req.user;
    const unPaidDues = await prisma.dues.findMany({
      where: {
        apartmentId,
        isPaid: false,
        createdAt: nowMonthControl(month),
      },
      select: {
        resident: {
          select: {
            id: true,
            flatNumber: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        resident: {
          flatNumber: "asc",
        },
      },
    });

    const data = unPaidDues.map((due) => due.resident);

    return res.suc(status.OK, data);
  } catch (err) {
    console.log(err);
    return res.err(status.INTERNAL_SERVER_ERROR, "Bir hata oluştu.");
  }
};

const paidDues = async (req, res) => {
  const { month } = req.query;

  try {
    const { apartmentId } = req.user;
    const paidDues = await prisma.dues.findMany({
      where: {
        apartmentId,
        isPaid: true,
        createdAt: nowMonthControl(month),
      },
      select: {
        resident: {
          select: {
            id: true,
            flatNumber: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        resident: {
          createdAt: "desc",
        },
      },
    });

    const data = paidDues.map((due) => due.resident);

    return res.suc(status.OK, data);
  } catch (err) {
    console.log(err);
    return res.err(status.INTERNAL_SERVER_ERROR, "Bir hata oluştu.");
  }
};

const payDues = async (req, res) => {
  try {
    const { id } = req.params;
    const { apartmentId } = req.user;

    const dues = await prisma.dues.findFirst({
      where: { id, createdAt: nowMonthControl() },
      select: { isPaid: true },
    });
    if (!dues) return res.err(status.NOT_FOUND, "Aidat bulunamadı.");

    const apartment = await prisma.apartment.findUnique({
      where: { id: apartmentId },
      select: {
        monthlyDuesAmount: true,
      },
    });

    const payDues = await prisma.dues.update({
      where: { id },
      data: { isPaid: !dues.isPaid, amount: apartment.monthlyDuesAmount },
    });

    const tillUpdate = await prisma.apartment.update({
      where: { id: apartmentId },
      data: {
        till: {
          [dues.isPaid ? "decrement" : "increment"]: apartment.monthlyDuesAmount,
        },
      },
    });

    return res.suc(status.OK, payDues);
  } catch (err) {
    console.log(err);
    return res.err(status.INTERNAL_SERVER_ERROR, "Bir hata oluştu.");
  }
};

module.exports = {
  listDues,
  unPaidDues,
  paidDues,
  payDues,
};
