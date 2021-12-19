const structures = [
  require('./@bago.node-only-backend.json'),
  require('./@bago.node-render-SSR.json'),
];

module.exports = {
  structures: structures,
  list: (frameworkSelected) => structures.filter(({ framework }) => (framework === frameworkSelected)),
  packagesByStructure: (project) => structures.find(item => item.value === project),
  frameworks: [
    { value: 'node', name: 'Node' },
  ],
  packages: [
    { value: 'express', name: 'Express' },
    { value: 'mongoose', name: 'Mongoose' },
    { value: 'nodemon', name: 'Nodemon' },
    { value: 'cors', name: 'CORS' },
  ],
};