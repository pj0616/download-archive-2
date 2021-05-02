const gulp = require('gulp');
const tasks = require('../utils/getTasks');
const config = require('./');

const isDev = process.env.NODE_ENV === 'development';

gulp.task(
  'default',
  gulp.series(
    tasks.clean,
    gulp.parallel(
      tasks.files,
      tasks.images,
      tasks.icons,
      tasks.styles,
      ...(!isDev || !config.publicPath ? [tasks.scripts] : []),
    ),
    ...(isDev ? [tasks.serve] : [tasks.sizes]),
  ),
);
