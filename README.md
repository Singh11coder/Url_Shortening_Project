# Url_Shortening_Project
The URL Shortening Project is a backend-driven web application that allows users to convert long, unwieldy URLs into short, shareable links, and later redirect those short links back to the original URLs.

## Here is the FlowChart of the Project
[Client Request]
       |
       v
[Route Handler]
       |
       v
[ Middleware Layer ]
   ├─ Authentication (JWT | Session)
   ├─ Validation (e.g., URL format)
   └─ Error Handling
       |
       v
[ Controller / Service ]
   ├─ For POST /shorten:
   │     • Generate or retrieve shortCode
   │     • Store mapping: shortCode ↔ longURL
   │     • Respond with short URL payload
   └─ For GET /:shortCode:
         • Lookup original URL
         • Redirect client (HTTP 302 or 301)
         • Handle if not found → Error response
       |
       v
[Middleware (optional): Logging / Analytics]
       |
       v
[Response Back to Client]
