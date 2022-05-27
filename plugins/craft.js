//View https://wbrowar.com/article/code/craft-cms-live-preview-with-nuxt-js/

<<<<<<< HEAD
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
=======
export default function ({ $config, $graphql, query }) {
  const headers = {};

  if (query.token) {
    headers["x-craft-token"] = query.token;
  }

  // Add GraphQL authorization token for non-public schemas
  if ($config.craftAuthToken !== "") {
    headers["Authorization"] = `Bearer ${$config.craftAuthToken}`;
  }

  $graphql.default.setHeaders(headers);
}
>>>>>>> origin/local-develop
