import { oAuth2Client, scopes } from "@/config";

export const authorizationUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

console.log(authorizationUrl)