# KWB Backend – Upload API

Node.js Express API die uploads naar SharePoint doet via Microsoft Graph met user-delegated tokens.

## Env

- SHAREPOINT_SITE_ID
- SHAREPOINT_DRIVE_ID
- AZURE_TENANT_ID
- AZURE_CLIENT_ID

## Lokaal

```bash
npm install
cp .env.example .env
npm start
