module.exports = {
  init: (allIndex = false) => {
    return {
      config: {
        name: 'config',
        type: 'folder',
        file: allIndex ? 'index.js' : 'config.js',
        description: '',
      },
      controllers: {
        name: 'controllers',
        type: 'folder',
        file: allIndex ? 'index.js' : 'controllers.js',
        description: '',
      },
      middlewares: {
        name: 'middlewares',
        type: 'folder',
        file: allIndex ? 'index.js' : 'middlewares.js',
        description: '// Este es un texto de ejemplo\nlet s = 2',
      },
      models: {
        name: 'models',
        type: 'folder',
        file: allIndex ? 'index.js' : 'models.js',
        description: '// Este es un texto de ejemplo\nlet s = 2',
      },
      routes: {
        name: 'routes',
        type: 'folder',
        file: allIndex ? 'index.js' : 'routes.js',
        description: '// Este es un texto de ejemplo\nlet s = 2',
      },
      utils: {
        name: 'utils',
        type: 'folder',
        file: allIndex ? 'index.js' : 'utils.js',
        description: '// Este es un texto de ejemplo\nlet s = 2',
      },
      views: {
        name: 'views',
        type: 'folder',
        file: allIndex ? 'index.js' : 'views.js',
        description: '// Este es un texto de ejemplo\nlet s = 2',
      },
    };
  },
};
