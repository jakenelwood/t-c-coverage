// Mock implementation for Vercel deployment
// This is a placeholder for the document generation functionality that will be implemented in the backend server
// For production use, this functionality would be hosted on a separate server with file system access

export async function generateDocuments(quoteData) {
  console.log("Mock DocumentGenerator: Generating documents for quote", quoteData);
  
  const documentPaths = {};
  
  if (quoteData.quoteTypes.includes("auto")) {
    documentPaths.auto = {
      docx: `/mocked-path/auto-quote-${Date.now()}.docx`,
      pdf: `/mocked-path/auto-quote-${Date.now()}.pdf`
    };
  }
  
  if (quoteData.quoteTypes.includes("home")) {
    documentPaths.home = {
      docx: `/mocked-path/home-quote-${Date.now()}.docx`,
      pdf: `/mocked-path/home-quote-${Date.now()}.pdf`
    };
  }
  
  if (quoteData.quoteTypes.includes("specialty")) {
    documentPaths.specialty = {
      docx: `/mocked-path/specialty-quote-${Date.now()}.docx`,
      pdf: `/mocked-path/specialty-quote-${Date.now()}.pdf`
    };
  }
  
  return documentPaths;
} 