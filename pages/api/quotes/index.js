import { getSession } from "next-auth/react";
import { connectToDatabase, insertQuote } from "../../../lib/lancedb";
import { generateDocuments } from "../../../lib/documentGenerator";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Verify authentication
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { quotesTable } = await connectToDatabase();
    const quoteData = req.body;

    // Add metadata to quote data
    const quoteWithMetadata = {
      ...quoteData,
      agentId: session.user.id,
      createdAt: new Date().toISOString(),
      status: "pending",
      documentPaths: {}
    };

    // Store quote data
    await insertQuote(quotesTable, quoteWithMetadata);

    // Generate documents
    const documentPaths = await generateDocuments(quoteData);

    // Update quote with document paths
    await quotesTable.update({
      where: `agentId = '${session.user.id}' AND createdAt = '${quoteWithMetadata.createdAt}'`,
      update: {
        documentPaths,
        status: "completed"
      }
    });

    return res.status(201).json({
      message: "Quote request created successfully",
      documentPaths
    });
  } catch (error) {
    console.error("Error processing quote request:", error);
    return res.status(500).json({ message: "Error processing quote request" });
  }
} 