export default () => ({
  isLocal: process.env.LOCAL,
  sm: {
    onb: 'onb-secrets',
  },
  aws: {
    region: process?.env?.NODE_ENV === 'prd' ? 'sa-east-1' : 'us-east-1',
  },
});
