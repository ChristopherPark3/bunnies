"use server"

import prisma from "./prisma"


export const test = async () => {
    const bunnies = await prisma.bunnies.findMany()

    console.log(bunnies)
}