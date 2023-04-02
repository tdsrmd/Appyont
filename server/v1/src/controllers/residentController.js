const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const status = require("http-status");

const newResident = async (req, res) => {
  try {
    const { flatNumber, firstName, lastName, phone, carPlate, role, apartmentId } = req.body;

    const apartment = await prisma.apartment.findUnique({ where: { id: apartmentId } });
    if (!apartment) return res.err(status.NOT_FOUND, "Apartman bulunamadı.");

    const existingResident = await prisma.resident.findFirst({ where: { apartmentId, flatNumber: Number(flatNumber) } });
    if (existingResident) return res.err(status.CONFLICT, "Bu daire zaten kayıtlı.");

    const newResident = await prisma.resident.create({
      data: {
        flatNumber: Number(flatNumber),
        firstName,
        lastName,
        phone: phone && phone,
        carPlate,
        role,
        apartmentId,
      },
    });

    const newDues = await prisma.dues.create({
      data: {
        amount: apartment.monthlyDuesAmount,
        isPaid: false,
        residentId: newResident.id,
        apartmentId: apartmentId,
      },
    });

    res.suc(status.OK, "Başarılı bir şekilde kayıt ettiniz.");
  } catch (err) {
    console.log(err);
    return res.err(status.INTERNAL_SERVER_ERROR, "Bir hata oluştu.");
  }
};

const listResidents = async (req, res) => {
  try {
    const { apartmentId } = req.user;

    const residents = await prisma.apartment.findUnique({ where: { id: apartmentId } }).residents({
      orderBy: { flatNumber: "asc" },
    });
    if (!residents) return res.err(status.NOT_FOUND, "Apartman bulunamadı.");

    return res.suc(status.OK, residents);
  } catch (err) {
    console.log(err);
    return res.err(status.INTERNAL_SERVER_ERROR, "Bir hata oluştu.");
  }
};

const deleteResident = async (req, res) => {
  try {
    const { residentId } = req.params;

    const deleteDues = await prisma.dues.deleteMany({ where: { residentId } });
    const resident = await prisma.resident.delete({ where: { id: residentId } });
    if (!resident) res.err(status.NOT_FOUND, "Resident bulunamadı.");

    return res.suc(status.NO_CONTENT, resident);
  } catch (err) {
    console.log(err);
    return res.err(status.INTERNAL_SERVER_ERROR, "Bir hata oluştu.");
  }
};

module.exports = {
  newResident,
  listResidents,
  deleteResident,
};
