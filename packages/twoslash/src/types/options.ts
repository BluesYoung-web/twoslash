import type { VirtualTypeScriptEnvironment } from '@typescript/vfs'
import type { CompilerOptions, CustomTransformers } from 'typescript'
import type { HandbookOptions } from './handbook-options'
import type { NodeWithoutPosition } from './nodes'
import type { TwoSlashReturnMeta } from './returns'

export type TS = typeof import('typescript')

/**
 * Options for the `twoslasher` function
 */
export interface TwoSlashOptions extends CreateTwoSlashOptions, TwoSlashExecuteOptions { }

/**
 * Options for twoslash instance
 */
export interface TwoSlashExecuteOptions extends Partial<Pick<TwoSlashReturnMeta, 'positionQueries' | 'positionCompletions' | 'positionHighlights'>> {
  /** Allows setting any of the handbook options from outside the function, useful if you don't want LSP identifiers */
  handbookOptions?: Partial<HandbookOptions>

  /** Allows setting any of the compiler options from outside the function */
  compilerOptions?: CompilerOptions

  /** A set of known `// @[tags]` tags to extract and not treat as a comment */
  customTags?: string[]

  /**
   * A custom hook to filter out hover info for certain identifiers
   */
  shouldGetHoverInfo?: (identifier: string, start: number, filename: string) => boolean
  /**
   * A custom predicate to filter out nodes for further processing
   */
  filterNode?: (node: NodeWithoutPosition) => boolean
}

export interface CreateTwoSlashOptions extends TwoSlashExecuteOptions {
  /**
   *  Allows applying custom transformers to the emit result, only useful with the showEmit output
   */
  customTransformers?: CustomTransformers

  /**
   *  An optional copy of the TypeScript import, if missing it will be require'd.
   */
  tsModule?: TS

  /**
   * Absolute path to the directory to look up built-in TypeScript .d.ts files.
   */
  tsLibDirectory?: string

  /**
   * An optional Map object which is passed into @typescript/vfs - if you are using twoslash on the
   * web then you'll need this to set up your lib *.d.ts files. If missing, it will use your fs.
   */
  fsMap?: Map<string, string>

  /** The cwd for the folder which the virtual fs should be overlaid on top of when using local fs, opts to process.cwd() if not present */
  vfsRoot?: string

  /**
   * Cache the ts envs based on compiler options, defaults to true
   */
  cache?: boolean | Map<string, VirtualTypeScriptEnvironment>
}
