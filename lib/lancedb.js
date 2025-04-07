// Mock implementation for Vercel deployment
// This is a placeholder for the LanceDB functionality that will be implemented in the backend server
// For production use, this functionality would be moved to a separate API service

export async function connectToDatabase() {
  console.log("Mock LanceDB: Connecting to database");
  return {
    leadsTable: {},
    quotesTable: {}
  };
}

export async function insertLead(leadsTable, leadData) {
  console.log("Mock LanceDB: Inserting lead", leadData);
  return { success: true, id: "mock-lead-id" };
}

export async function insertQuote(quotesTable, quoteData) {
  console.log("Mock LanceDB: Inserting quote", quoteData);
  return { success: true, id: "mock-quote-id" };
}

export async function getQuotesByAgent(quotesTable, agentId) {
  console.log("Mock LanceDB: Getting quotes for agent", agentId);
  return [];
}

export async function updateQuote(quotesTable, agentId, createdAt, updates) {
  console.log("Mock LanceDB: Updating quote", { agentId, createdAt, updates });
  return { success: true };
} 