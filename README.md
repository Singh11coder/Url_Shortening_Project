# Url_Shortening_Project
The URL Shortening Project is a backend-driven web application that allows users to convert long, unwieldy URLs into short, shareable links, and later redirect those short links back to the original URLs.

## Here is the FlowChart of the Project

Detailed Flow Steps
#Client initiates request, either:

##POST to /url/shorten with long URL

##GET to /:shortCode for redirection

#Middleware Stack:

##Authentication: Checks session cookie or verifies JWT for protected endpoints.

##Validation: Ensures input is a valid URL (for shortening route).

##Error Handling: Catches and standardizes middleware errors.

#Controller/Service Processing:

##POST /url/shorten:

###Check if URL already has a short code (avoid duplicates).

###If not, generate unique urlCode, store longUrl and shortUrl.

###Return JSON with shortened URL data.

##GET /:urlCode:

###Lookup in database.

###If found, issue HTTP redirect to longUrl.

###Otherwise, return 404 or error message.

#Optional Middleware: Logging request analytics, click counts, etc.

#Final Response: JSON response or HTTP redirection.
