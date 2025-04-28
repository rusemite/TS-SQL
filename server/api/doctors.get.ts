import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event)=>  {
    const query = getQuery(event)
    const doctor_name = query.name as string | undefined
    const schedule = query.schedule as string | undefined
    const doctor_id = parseInt(query.doctor_id) as number

    const getus = (doctor_name != undefined || doctor_id != undefined || schedule != undefined) ? await event.context.prisma.doctors.findMany({
        where: {
            doctor_id: (doctor_name != undefined) ? doctor_id : undefined,
            doctor_name: {
                contains: doctor_name,
            },
            schedule: {
                contains: schedule,
            },
        }
    })
        : await event.context.prisma.doctors.findMany()

    console.log("Found doctors: ", getus, doctor_name)
    return {
        getus
    }
})