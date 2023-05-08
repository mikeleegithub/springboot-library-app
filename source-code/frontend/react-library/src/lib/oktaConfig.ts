export const oktaConfig = {

  clientId: '0oa91iqvgjWXrayN25d7',
  issuer: 'https://dev-65665720.okta.com/oauth2/default',
  redirectUri: 'https://localhost:3000/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true,
  
}