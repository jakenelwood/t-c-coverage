import { getSession } from "next-auth/react";
import { connectToDatabase, getQuotesByAgent } from "../../../lib/lancedb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { agentId } = req.query;
    if (session.user.id !== agentId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { quotesTable } = await connectToDatabase();
    const quotes = await getQuotesByAgent(quotesTable, agentId);

    return res.status(200).json(quotes);
  } catch (error) {
    console.error("Error retrieving quotes:", error);
    return res.status(500).json({ message: "Error retrieving quotes" });
  }
} 