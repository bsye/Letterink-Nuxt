export default ({ $config, query }) => {

  const headers = {}

  if (query.token) headers['x-craft-token'] = query.token

  return {
    httpEndpoint: $config.craftApiUrl,
    httpOptions: {
      headers
    }
  }
}
