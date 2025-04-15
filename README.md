# tsup-plugin-prepend-directive

This plugin is designed to be a lightweight dependency that allows users to specify directives they want prepended to specific build files that come out of tsup.

The advantage of this plugin is that it still works with tsup's [code splitting](https://tsup.egoist.dev/#code-splitting) and minifier which can cause other solutions that handle directives to fail. Code splitting can be especially desirable for library authors who want to reduce their overall bundle size and efficiency.

This plugin is primarily useful for including the `"use client"` directive, but is generalized to work for any directive.

## Usage

To install:

```
npm install -D tsup-plugin-prepend-directive
```

### Example
Below is an example of how this plugin can be used to specify a group of dist files we want prepended with `"use client"` while leaving other files that are safe for server-side use unchanged. In this example, we can enable both minificaiton and code splitting without issue.

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
    // Code split shared code across the core and react packages
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

## Motivation

The idea is that certain directives, such as `"use client"` [must be present at the top of a module file](https://react.dev/reference/rsc/use-client#use-client). For library authors in particular, this poses unique challenges as during the build process, `tsup` can fail to place directives at the top of the module, or sometimes remove the directives altogether. It becomes additionally frustrating with code-splitting enabled as other plugins or "banner" solutions still can fail to get "use client" at the very top of the resulting build modules.

An example use-case would be someone authoring a library they wish to distribute that contains both interfaces they want to be available to the server, and client-only React components. Using this plugin, the user can configure tsup to still leverage tsup's code-splitting to reduce total bundle size while also specifying exactly which dist files should be marked with `use-client`.
