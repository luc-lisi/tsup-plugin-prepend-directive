import { Options } from 'tsup';

declare function prependDirective(directive: string, filePatterns: string[]): NonNullable<Options['plugins']>[number];

export { prependDirective };
