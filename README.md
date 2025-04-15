# tsup-prepend-directive-plugin

This plugin is designed to be an incredibly lightweight dependency that allows users to specify directives to be explicitly prepended to build files that come out of tsup.

This is most useful for including the `"use client"` directive, but is generalized to work for any directive. It is designed to be especially useful for libraries where the author might want to specify directives for entire sections of their dist.

The idea is that certain directives, such as `"use client"` [must be present at the top of a module file](https://react.dev/reference/rsc/use-client#use-client). For library authors, this poses unique challenges as during the build process, `tsup` can fail to place directives at the top of the resulting build file or in some cases remove them entirely.


## Usage

Below is an example of how someone might use this plugin to specify certain dist files containing "client only" React components to be prepended with the `"use client"` directive.

This works even if splitting is enabled.

```typescript
// tsup.config.ts

const commonBundleConfig: Options = {
  target: 'esnext',
  platform: 'browser',
  clean: true,
  dts: false,
  minify: true,
}

const commonTypesConfig: Options = {
  target: 'esnext',
  dts: { only: true },
}

const configs: Options[] = [
  {
    name: 'build',
    splitting: true,
    entry: {
      'core': 'packages/core/src/index.ts',
      'react': 'packages/react/src/index.ts',
    },
    format: ['esm', 'cjs'],
    plugins: [prependDirective('"use client"', ['dist/react'])], // Tells the plugin to prepend "use client" directive to all resulting dist files matching 'dist/react*' path.
    ...commonBundleConfig,
  },
  {
    name: 'core-types',
    entry: {
      'core': 'packages/core/src/index.ts',
    },
    ...commonTypesConfig,
  },
  {
    name: 'react-types',
    entry: {
      'react': 'packages/react/src/index.ts',
    },
    ...commonTypesConfig,
  },
]

export default defineConfig(configs)
```

