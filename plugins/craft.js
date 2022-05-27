//View https://wbrowar.com/article/code/craft-cms-live-preview-with-nuxt-js/

export default async function ({ $config, $graphql, enablePreview, query }) {
  if (!$config.livePreview) return

  const headers = {}
  const token = query.token

  if (token && query['x-craft-live-preview']) {

    // Add GraphQL authorization token for non-public schemas
    if ($config.craftAuthToken !== '') {
      headers['x-craft-token'] = token
      headers['Authorization'] = `Bearer ${$config.craftAuthToken}`
      $graphql.default.setHeaders(headers);
    }

    await enablePreview();
  }
}
