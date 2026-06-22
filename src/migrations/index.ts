import * as migration_20260620_205242_initial from './20260620_205242_initial';
import * as migration_20260621_084417_content_collections from './20260621_084417_content_collections';
import * as migration_20260622_111054_company_settings_fields from './20260622_111054_company_settings_fields';

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
];
