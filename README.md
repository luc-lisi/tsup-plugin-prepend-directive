# tsup-prepend-directive-plugin

This plugin is designed to be an incredibly lightweight dependency that allows users to specify directives to be explicitly prepended to build files that come out of tsup. This is most useful for including the `"use client"` directive, but is generalized to work for any directive. It is designed to be especially useful for libraries where the author might want to specify directives for entire sections of their dist.

The idea is certain directives, such as `"use client"` [must be present at the top of a module file](https://react.dev/reference/rsc/use-client#use-client). For library authors, this poses unique challanges as during the build process, `tsup` can fail to place directives at the top of the resulting build file or in some cases remove them entirely.


## Usage

