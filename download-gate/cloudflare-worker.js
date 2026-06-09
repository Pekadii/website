const corsHeaders = (origin, env) => {
  const allowedOrigins = String(env.ALLOWED_ORIGIN || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0] || origin || "*";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
};

const jsonResponse = (body, status, origin, env) => new Response(JSON.stringify(body), {
  status,
  headers: {
    ...corsHeaders(origin, env),
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  }
});

const sessions = {
  "nathan-portraits": {
    accessCode: "NATHAN_ACCESS_CODE",
    editedUrl: "NATHAN_EDITED_MEGA_URL",
    rawUrl: "NATHAN_RAW_MEGA_URL"
  },
  graduation: {
    accessCode: "GRADUATION_ACCESS_CODE",
    editedUrl: "GRADUATION_EDITED_MEGA_URL",
    rawUrl: "GRADUATION_RAW_MEGA_URL"
  }
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");

    if(request.method === "OPTIONS"){
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin, env)
      });
    }

    if(request.method !== "POST"){
      return jsonResponse({ error: "Method not allowed" }, 405, origin, env);
    }

    let body;
    try{
      body = await request.json();
    }catch(error){
      return jsonResponse({ error: "Invalid JSON" }, 400, origin, env);
    }

    const sessionId = String(body.sessionId || "");
    const code = String(body.code || "");
    const session = sessions[sessionId];

    if(!session){
      return jsonResponse({ error: "Unknown session" }, 404, origin, env);
    }

    if(code !== env[session.accessCode]){
      return jsonResponse({ error: "Invalid access code for download gate" }, 401, origin, env);
    }

    const editedUrl = env[session.editedUrl];
    const rawUrl = env[session.rawUrl] || editedUrl;

    if(!editedUrl){
      return jsonResponse({ error: "Download URL not configured" }, 500, origin, env);
    }

    return jsonResponse({
      downloads: [
        {
          label: "Download Edited Photos",
          detail: "Open private Mega folder",
          href: editedUrl
        },
        {
          label: "Download RAW Photos",
          detail: "Open private Mega folder",
          href: rawUrl
        }
      ]
    }, 200, origin, env);
  }
};
