import * as migration_20260620_205242_initial from './20260620_205242_initial';

export const migrations = [
  {
    up: migration_20260620_205242_initial.up,
    down: migration_20260620_205242_initial.down,
    name: '20260620_205242_initial',
  },
];
