//View https://wbrowar.com/article/code/craft-cms-live-preview-with-nuxt-js/

export default function ({ $config, $graphql, query }) {
  const headers = {}

  if (query.token) {
    headers['x-craft-token'] = query.token
  }

  // Add GraphQL authorization token for non-public schemas
  if ($config.craftAuthToken !== '') {
    headers['Authorization'] = `Bearer ${$config.craftAuthToken}`
  }

  $graphql.default.setHeaders(headers);
}