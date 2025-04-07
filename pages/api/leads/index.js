import { connectToDatabase, insertLead } from "../../../lib/lancedb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { leadsTable } = await connectToDatabase();
    const { firstName, address, phone, email } = req.body;

    // Validate required fields
    if (!firstName || !address || !phone || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create lead document
    const lead = {
      firstName,
      address,
      phone,
      email,
      createdAt: new Date().toISOString(),
      status: "new",
      source: "landing_page",
    };

    // Insert lead into database
    await insertLead(leadsTable, lead);

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to lead

    return res.status(201).json({
      message: "Lead created successfully",
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return res.status(500).json({ message: "Error creating lead" });
  }
} 