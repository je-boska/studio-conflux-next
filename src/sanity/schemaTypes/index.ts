import type { SchemaTypeDefinition } from 'sanity';
import { project } from './project';
import { page } from './page';

export const schemaTypes: SchemaTypeDefinition[] = [project, page];
