import * as migration_20260620_205242_initial from './20260620_205242_initial';
import * as migration_20260621_084417_content_collections from './20260621_084417_content_collections';
import * as migration_20260622_111054_company_settings_fields from './20260622_111054_company_settings_fields';
import * as migration_20261022_120000_new_collections from './20261022_120000_new_collections';
import * as migration_20261024_100000_projects_missing_columns from './20261024_100000_projects_missing_columns';
import * as migration_20261105_100000_projects_published_column from './20261105_100000_projects_published_column';
import * as migration_20261106_120000_projects_nullable_title_category from './20261106_120000_projects_nullable_title_category';
import * as migration_20261107_090000_seed_portfolio_projects from './20261107_090000_seed_portfolio_projects';
import * as migration_20261107_120000_projects_nullable_slug from './20261107_120000_projects_nullable_slug';

export const migrations = [
  {
    up: migration_20260620_205242_initial.up,
    down: migration_20260620_205242_initial.down,
    name: '20260620_205242_initial',
  },
  {
    up: migration_20260621_084417_content_collections.up,
    down: migration_20260621_084417_content_collections.down,
    name: '20260621_084417_content_collections',
  },
  {
    up: migration_20260622_111054_company_settings_fields.up,
    down: migration_20260622_111054_company_settings_fields.down,
    name: '20260622_111054_company_settings_fields'
  },
  {
    up: migration_20261022_120000_new_collections.up,
    down: migration_20261022_120000_new_collections.down,
    name: '20261022_120000_new_collections',
  },
  {
    up: migration_20261024_100000_projects_missing_columns.up,
    down: migration_20261024_100000_projects_missing_columns.down,
    name: '20261024_100000_projects_missing_columns',
  },
  {
    up: migration_20261105_100000_projects_published_column.up,
    down: migration_20261105_100000_projects_published_column.down,
    name: '20261105_100000_projects_published_column',
  },
  {
    up: migration_20261106_120000_projects_nullable_title_category.up,
    down: migration_20261106_120000_projects_nullable_title_category.down,
    name: '20261106_120000_projects_nullable_title_category',
  },
  {
    up: migration_20261107_090000_seed_portfolio_projects.up,
    down: migration_20261107_090000_seed_portfolio_projects.down,
    name: '20261107_090000_seed_portfolio_projects',
  },
];