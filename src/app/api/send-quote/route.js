import nodemailer from "nodemailer";

export async function POST(req) {
  const data = await req.json(); // receive any form data

  const { service, size, quality, minPrice, maxPrice, name, phone, email, business, date, time, location, requirements } = data;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Build email HTML content
  let html = "<h2>New Request Received</h2>";
  if (service) html += `<p><strong>Service:</strong> ${service}</p>`;
  if (size) html += `<p><strong>Size:</strong> ${size} sq ft</p>`;
  if (quality) html += `<p><strong>Quality:</strong> ${quality}</p>`;
  if (minPrice && maxPrice) html += `<p><strong>Estimated Price:</strong> ₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}</p>`;
  if (name) html += `<p><strong>Name:</strong> ${name}</p>`;
  if (phone) html += `<p><strong>Phone:</strong> ${phone}</p>`;
  if (email) html += `<p><strong>Email:</strong> ${email}</p>`;
  if (business) html += `<p><strong>Business:</strong> ${business}</p>`;
  if (date) html += `<p><strong>Preferred Date:</strong> ${date}</p>`;
  if (time) html += `<p><strong>Time Slot:</strong> ${time}</p>`;
  if (location) html += `<p><strong>Project Location:</strong> ${location}</p>`;
  if (requirements) html += `<p><strong>Requirements:</strong> ${requirements}</p>`;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,  // must be your Gmail
      to: process.env.GMAIL_USER,    // your Gmail to receive
      replyTo: email || process.env.GMAIL_USER, // user email if provided
      subject: `New Request${service ? `: ${service}` : ""}`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
