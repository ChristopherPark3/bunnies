import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Bunny } from "@/lib/types";
import { resend } from "@/utils/resend";

export async function POST(request: NextRequest) {
  //   const passedApiKey = request.headers.get("x-api-key");
  //   if (passedApiKey !== process.env.API_KEY) {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }

  console.log("Environment check:");
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
  console.log("DATABASE_URL length:", process.env.DATABASE_URL?.length || 0);
  console.log(
    "DATABASE_URL starts with:",
    process.env.DATABASE_URL?.substring(0, 20) || "Not set"
  );

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
        number_of_pens: body.kennels?.length || 1,
      },
    });

    console.log("Booking created.");

    const resendResponse = await resend.emails.send({
      from: "Kim <kim@kimsbunnyboarding.com>",
      to: "kiimmyn1@gmail.com",
      subject: `New booking request from ${body.firstName} ${body.lastName}`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Request</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #8FBC8F, #A8D8A8); padding: 30px; text-align: center;">
            <h1 style="color: #8B4513; margin: 0; font-size: 28px; font-weight: bold;">
               New Booking Request
            </h1>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">
              A new bunny boarding request has been submitted
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 30px;">
            
            <!-- Client Information -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #8FBC8F;">
              <h2 style="color: #8B4513; margin: 0 0 15px 0; font-size: 20px;">👤 Client Information</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <strong style="color: #555;">Name:</strong><br>
                  <span style="color: #333;">${body.firstName} ${body.lastName}</span>
                </div>
                <div>
                  <strong style="color: #555;">Email:</strong><br>
                  <span style="color: #333;">${body.email}</span>
                </div>
                <div>
                  <strong style="color: #555;">Phone:</strong><br>
                  <span style="color: #333;">${body.phoneNumber || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <!-- Bunnies Information -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #8FBC8F;">
              <h2 style="color: #8B4513; margin: 0 0 15px 0; font-size: 20px;">🐰 Bunnies Information</h2>
              <div style="display: grid; gap: 12px;">
                ${body.bunnies
                  .map((bunny: Bunny, index: number) => `
                    <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <h3 style="margin: 0; color: #8B4513; font-size: 16px;">${bunny.name}</h3>
                        <span style="background-color: #8FBC8F; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold;">
                          ${bunny.isMale ? '♂️ Male' : '♀️ Female'}
                        </span>
                      </div>
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
                        <div>
                          <span style="color: #666;">Vaccinated:</span>
                          <span style="color: ${bunny.isVaccinated ? '#28a745' : '#dc3545'}; font-weight: bold; margin-left: 5px;">
                            ${bunny.isVaccinated ? '✅ Yes' : '❌ No'}
                          </span>
                        </div>
                        <div>
                          <span style="color: #666;">Spayed/Neutered:</span>
                          <span style="color: ${bunny.isSpayed ? '#28a745' : '#dc3545'}; font-weight: bold; margin-left: 5px;">
                            ${bunny.isSpayed ? '✅ Yes' : '❌ No'}
                          </span>
                        </div>
                      </div>
                    </div>
                  `)
                  .join('')}
              </div>
            </div>

            <!-- Booking Details -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #8FBC8F;">
              <h2 style="color: #8B4513; margin: 0 0 15px 0; font-size: 20px;"> Booking Details</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <strong style="color: #555;">Check-in:</strong><br>
                  <span style="color: #333; font-size: 16px;">${new Date(body.dateRange.from).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div>
                  <strong style="color: #555;">Check-out:</strong><br>
                  <span style="color: #333; font-size: 16px;">${new Date(body.dateRange.to).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div>
                  <strong style="color: #555;">Number of Kennels:</strong><br>
                  <span style="color: #333; font-size: 16px; font-weight: bold;">${body.kennels?.length || 1}</span>
                </div>
              </div>
            </div>

            <!-- Additional Services -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #8FBC8F;">
              <h2 style="color: #8B4513; margin: 0 0 15px 0; font-size: 20px;">✨ Additional Services</h2>
              ${(body.additionalServices.nailTrim || body.additionalServices.sanitaryShaving || body.additionalServices.medication) ? `
              <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${body.additionalServices.nailTrim ? '<span style="background-color: #8FBC8F; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px;">✂️ Nail Trim</span>' : ''}
                ${body.additionalServices.sanitaryShaving ? '<span style="background-color: #8FBC8F; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px;">✂️ Sanitary Shaving</span>' : ''}
                ${body.additionalServices.medication ? '<span style="background-color: #8FBC8F; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px;">💊 Medication</span>' : ''}
              </div>
              ` : `
              <p style="color: #666; margin: 0; font-style: italic;">No additional services requested</p>
              `}
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
              <p style="color: #666; margin: 0; font-size: 14px;">
                Please review this booking request and contact the client to confirm availability.
              </p>
              <p style="color: #8B4513; margin: 10px 0 0 0; font-size: 12px; font-weight: bold;">
                Kim's Bunny Boarding 🐰
              </p>
            </div>

          </div>
        </div>
      </body>
      </html>
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
