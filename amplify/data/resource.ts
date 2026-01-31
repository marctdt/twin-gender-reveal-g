import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  GenderGuess: a
    .model({
      name: a.string().required(),
      twin1: a.string().required(),
      twin2: a.string().required(),
      timestamp: a.integer().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
