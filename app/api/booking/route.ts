import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Bunny } from "@/lib/types";
import { resend } from "@/utils/resend";

export async function POST(request: NextRequest) {
  //   const passedApiKey = request.headers.get("x-api-key");
  //   if (passedApiKey !== process.env.API_KEY) {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }

  const body = await request.json();

  console.log("Validating body...");
  // Validate the body
  if (body.bunnies.length === 0) {
    return NextResponse.json(
      { message: "No bunnies provided" },
      { status: 400 }
    );
  }
  if (!body.dateRange.from) {
    return NextResponse.json(
      { message: "A start date is required." },
      { status: 400 }
    );
  }
  if (!body.firstName) {
    return NextResponse.json(
      { message: "A first name is required." },
      { status: 400 }
    );
  }
  if (!body.lastName) {
    return NextResponse.json(
      { message: "A last name is required." },
      { status: 400 }
    );
  }
  if (!body.email) {
    return NextResponse.json(
      { message: "An email is required." },
      { status: 400 }
    );
  }
  console.log("Body validated.");

  try {
    console.log("Creating client...");
    // Create the client first
    const client = await prisma.clients.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phoneNumber,
      },
    });

    console.log("Client created.");

    console.log("Creating bunnies...");
    // Create the bunnies
    const createdBunnies = await Promise.all(
      body.bunnies.map(async (bunny: Bunny) => {
        return await prisma.bunnies.create({
          data: {
            name: bunny.name,
            age: 0, // You might want to add age to the form
            gender: bunny.isMale ? "Male" : "Female",
            breed: "Unknown", // You might want to add breed to the form
            color: "Unknown", // You might want to add color to the form
            weight: "0", // You might want to add weight to the form
            notes: `Vaccinated: ${bunny.isVaccinated}, Spayed: ${bunny.isSpayed}`,
            client_id: client.id,
          },
        });
      })
    );

    console.log("Bunnies created.");

    console.log("Creating invoice...");
    // Create the invoice
    const invoice = await prisma.invoices.create({
      data: {
        amount: "0", // You'll need to calculate this based on services
        status: "pending",
        client_id: client.id,
        client_email: body.email,
        client_name: `${body.firstName} ${body.lastName}`,
        payment_method: "pending", // You'll need to add payment method to the form
      },
    });

    console.log("Invoice created.");

    console.log("Creating booking...");
    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        to: body.dateRange.to,
        from: body.dateRange.from,
        client_id: client.id,
        invoice_id: invoice.id,
        nail_trim: body.additionalServices.nailTrim,
        sanitary_shaving: body.additionalServices.sanitaryShaving,
        medication: body.additionalServices.medication,
        bunny_id: createdBunnies[0].id, // Assuming one bunny per booking for now
      },
    });

    console.log("Booking created.");

    const resendResponse = await resend.emails.send({
      from: "Kim <kim@kimsbunnyboarding.com>",
      to: "kiimmyn1@gmail.com",
      subject: `New booking request from ${body.firstName} ${body.lastName}`,
      html: `<h1>New booking request</h1>
      <p>Name: ${body.firstName} ${body.lastName}</p>
      <p>Email: ${body.email}</p>
      <p>Phone: ${body.phoneNumber}</p>
      <p>Bunnies: ${body.bunnies
        .map((bunny: Bunny) => bunny.name)
        .join(", ")}</p>
      <p>From: ${body.dateRange.from}</p>
      <p>To: ${body.dateRange.to}</p>
      <p>Additional services: ${
        body.additionalServices.nailTrim ? "Nail trim" : ""
      } ${body.additionalServices.sanitaryShaving ? "Sanitary shaving" : ""} ${
        body.additionalServices.medication ? "Medication" : ""
      }</p>
      `,
    });

    console.log("Resend response:", resendResponse);

    return NextResponse.json({
      message: "Booking created successfully",
      bookingId: booking.id,
      status: 200,
    });
  } catch (error) {
    console.error("Error creating booking", error);
    return NextResponse.json({
      message: "Failed to create booking",
      status: 500,
    });
  }
}
