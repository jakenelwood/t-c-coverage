/**
 * Twin Cities Coverage API Worker
 * This serves as the API layer for the Twin Cities Coverage application
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    // Handle OPTIONS request for CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }
    
    // Route handling
    if (path.startsWith('/api/leads')) {
      return handleLeadsRequest(request, env, corsHeaders);
    } else if (path.startsWith('/api/quotes')) {
      return handleQuotesRequest(request, env, corsHeaders);
    } else if (path.startsWith('/api/auth')) {
      return handleAuthRequest(request, env, corsHeaders);
    }
    
    // Not found
    return new Response('Not Found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
        ...corsHeaders,
      },
    });
  },
};

// Handle Leads API
async function handleLeadsRequest(request, env, corsHeaders) {
  // Mock implementation
  if (request.method === 'POST') {
    try {
      const data = await request.json();
      return new Response(JSON.stringify({ 
        message: 'Lead created successfully', 
        leadId: 'mock-lead-id'
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid request data' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// Handle Quotes API
async function handleQuotesRequest(request, env, corsHeaders) {
  // Mock implementation
  if (request.method === 'POST') {
    try {
      const data = await request.json();
      return new Response(JSON.stringify({ 
        message: 'Quote request created successfully',
        quoteId: 'mock-quote-id',
        documentPaths: {
          auto: {
            docx: `/mocked-path/auto-quote-${Date.now()}.docx`,
            pdf: `/mocked-path/auto-quote-${Date.now()}.pdf`
          }
        }
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid request data' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  } else if (request.method === 'GET') {
    const url = new URL(request.url);
    const agentId = url.pathname.split('/').pop();
    
    return new Response(JSON.stringify([
      {
        id: 'mock-quote-id',
        clientName: 'John Doe',
        quoteTypes: ['auto'],
        createdAt: new Date().toISOString(),
        status: 'completed'
      }
    ]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// Handle Auth API
async function handleAuthRequest(request, env, corsHeaders) {
  const url = new URL(request.url);
  
  if (url.pathname.endsWith('/login') && request.method === 'POST') {
    try {
      const data = await request.json();
      
      // Simple mock authentication
      if (data.email && data.password) {
        return new Response(JSON.stringify({
          user: {
            id: 'agent-123',
            email: data.email,
            name: 'Agent Name'
          },
          token: 'mock-jwt-token'
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      } else {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid request data' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
} 