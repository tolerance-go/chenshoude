/**
 * Client
 **/

import * as runtime from './runtime/library'
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
   [K in keyof Tuple]: K extends `${number}`
      ? Tuple[K] extends Prisma.PrismaPromise<infer X>
         ? X
         : UnwrapPromise<Tuple[K]>
      : UnwrapPromise<Tuple[K]>
}

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

/**
 * Model User
 *
 */
export type User = {
   id: number
   username: string | null
   password: string
   phoneNumber: string
   createdAt: Date
   updatedAt: Date
}

/**
 * Model VerificationCode
 *
 */
export type VerificationCode = {
   id: number
   phoneNumber: string
   code: string
   createdAt: Date
   updatedAt: Date
}

/**
 * Model Article
 *
 */
export type Article = {
   id: number
   name: string
   createdAt: Date
   updatedAt: Date
   userId: number
}

/**
 * Model Chapter
 *
 */
export type Chapter = {
   id: number
   name: string
   createdAt: Date
   updatedAt: Date
   articleId: number
}

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
   T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
   U = 'log' extends keyof T
      ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
         ? Prisma.GetEvents<T['log']>
         : never
      : never,
   GlobalReject extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined = 'rejectOnNotFound' extends keyof T
      ? T['rejectOnNotFound']
      : false,
> {
   /**
    * ##  Prisma Client ʲˢ
    *
    * Type-safe database client for TypeScript & Node.js
    * @example
    * ```
    * const prisma = new PrismaClient()
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    *
    *
    * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
    */

   constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>)
   $on<V extends U | 'beforeExit'>(
      eventType: V,
      callback: (
         event: V extends 'query'
            ? Prisma.QueryEvent
            : V extends 'beforeExit'
            ? () => Promise<void>
            : Prisma.LogEvent,
      ) => void,
   ): void

   /**
    * Connect with the database
    */
   $connect(): Promise<void>

   /**
    * Disconnect from the database
    */
   $disconnect(): Promise<void>

   /**
    * Add a middleware
    */
   $use(cb: Prisma.Middleware): void

   /**
    * Executes a prepared raw query and returns the number of affected rows.
    * @example
    * ```
    * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
    * ```
    *
    * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
    */
   $executeRaw<T = unknown>(
      query: TemplateStringsArray | Prisma.Sql,
      ...values: any[]
   ): Prisma.PrismaPromise<number>

   /**
    * Executes a raw query and returns the number of affected rows.
    * Susceptible to SQL injections, see documentation.
    * @example
    * ```
    * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
    * ```
    *
    * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
    */
   $executeRawUnsafe<T = unknown>(
      query: string,
      ...values: any[]
   ): Prisma.PrismaPromise<number>

   /**
    * Performs a prepared raw query and returns the `SELECT` data.
    * @example
    * ```
    * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
    * ```
    *
    * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
    */
   $queryRaw<T = unknown>(
      query: TemplateStringsArray | Prisma.Sql,
      ...values: any[]
   ): Prisma.PrismaPromise<T>

   /**
    * Performs a raw query and returns the `SELECT` data.
    * Susceptible to SQL injections, see documentation.
    * @example
    * ```
    * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
    * ```
    *
    * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
    */
   $queryRawUnsafe<T = unknown>(
      query: string,
      ...values: any[]
   ): Prisma.PrismaPromise<T>

   /**
    * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
    * @example
    * ```
    * const [george, bob, alice] = await prisma.$transaction([
    *   prisma.user.create({ data: { name: 'George' } }),
    *   prisma.user.create({ data: { name: 'Bob' } }),
    *   prisma.user.create({ data: { name: 'Alice' } }),
    * ])
    * ```
    *
    * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
    */
   $transaction<P extends Prisma.PrismaPromise<any>[]>(
      arg: [...P],
      options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
   ): Promise<UnwrapTuple<P>>

   $transaction<R>(
      fn: (
         prisma: Omit<
            this,
            '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
         >,
      ) => Promise<R>,
      options?: {
         maxWait?: number
         timeout?: number
         isolationLevel?: Prisma.TransactionIsolationLevel
      },
   ): Promise<R>

   /**
    * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
   get user(): Prisma.UserDelegate<GlobalReject>

   /**
    * `prisma.verificationCode`: Exposes CRUD operations for the **VerificationCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationCodes
    * const verificationCodes = await prisma.verificationCode.findMany()
    * ```
    */
   get verificationCode(): Prisma.VerificationCodeDelegate<GlobalReject>

   /**
    * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
   get article(): Prisma.ArticleDelegate<GlobalReject>

   /**
    * `prisma.chapter`: Exposes CRUD operations for the **Chapter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chapters
    * const chapters = await prisma.chapter.findMany()
    * ```
    */
   get chapter(): Prisma.ChapterDelegate<GlobalReject>
}

export namespace Prisma {
   export import DMMF = runtime.DMMF

   export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

   /**
    * Prisma Errors
    */
   export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
   export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
   export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
   export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
   export import PrismaClientValidationError = runtime.PrismaClientValidationError
   export import NotFoundError = runtime.NotFoundError

   /**
    * Re-export of sql-template-tag
    */
   export import sql = runtime.sqltag
   export import empty = runtime.empty
   export import join = runtime.join
   export import raw = runtime.raw
   export import Sql = runtime.Sql

   /**
    * Decimal.js
    */
   export import Decimal = runtime.Decimal

   export type DecimalJsLike = runtime.DecimalJsLike

   /**
    * Metrics
    */
   export type Metrics = runtime.Metrics
   export type Metric<T> = runtime.Metric<T>
   export type MetricHistogram = runtime.MetricHistogram
   export type MetricHistogramBucket = runtime.MetricHistogramBucket

   /**
    * Prisma Client JS version: 4.15.0
    * Query Engine version: 8fbc245156db7124f997f4cecdd8d1219e360944
    */
   export type PrismaVersion = {
      client: string
   }

   export const prismaVersion: PrismaVersion

   /**
    * Utility Types
    */

   /**
    * From https://github.com/sindresorhus/type-fest/
    * Matches a JSON object.
    * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
    */
   export type JsonObject = { [Key in string]?: JsonValue }

   /**
    * From https://github.com/sindresorhus/type-fest/
    * Matches a JSON array.
    */
   export interface JsonArray extends Array<JsonValue> {}

   /**
    * From https://github.com/sindresorhus/type-fest/
    * Matches any valid JSON value.
    */
   export type JsonValue =
      | string
      | number
      | boolean
      | JsonObject
      | JsonArray
      | null

   /**
    * Matches a JSON object.
    * Unlike `JsonObject`, this type allows undefined and read-only properties.
    */
   export type InputJsonObject = {
      readonly [Key in string]?: InputJsonValue | null
   }

   /**
    * Matches a JSON array.
    * Unlike `JsonArray`, readonly arrays are assignable to this type.
    */
   export interface InputJsonArray
      extends ReadonlyArray<InputJsonValue | null> {}

   /**
    * Matches any valid value that can be used as an input for operations like
    * create and update as the value of a JSON field. Unlike `JsonValue`, this
    * type allows read-only arrays and read-only object properties and disallows
    * `null` at the top level.
    *
    * `null` cannot be used as the value of a JSON field because its meaning
    * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
    * `Prisma.DbNull` to clear the JSON value and set the field to the database
    * NULL value instead.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
    */
   export type InputJsonValue =
      | string
      | number
      | boolean
      | InputJsonObject
      | InputJsonArray

   /**
    * Types of the values used to represent different kinds of `null` values when working with JSON fields.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
   namespace NullTypes {
      /**
       * Type of `Prisma.DbNull`.
       *
       * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
       *
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
       */
      class DbNull {
         private DbNull: never
         private constructor()
      }

      /**
       * Type of `Prisma.JsonNull`.
       *
       * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
       *
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
       */
      class JsonNull {
         private JsonNull: never
         private constructor()
      }

      /**
       * Type of `Prisma.AnyNull`.
       *
       * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
       *
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
       */
      class AnyNull {
         private AnyNull: never
         private constructor()
      }
   }

   /**
    * Helper for filtering JSON entries that have `null` on the database (empty on the db)
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
   export const DbNull: NullTypes.DbNull

   /**
    * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
   export const JsonNull: NullTypes.JsonNull

   /**
    * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
   export const AnyNull: NullTypes.AnyNull

   type SelectAndInclude = {
      select: any
      include: any
   }
   type HasSelect = {
      select: any
   }
   type HasInclude = {
      include: any
   }
   type CheckSelect<T, S, U> = T extends SelectAndInclude
      ? 'Please either choose `select` or `include`'
      : T extends HasSelect
      ? U
      : T extends HasInclude
      ? U
      : S

   /**
    * Get the type of the value, that the Promise holds.
    */
   export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
      infer U
   >
      ? U
      : T

   /**
    * Get the return type of a function which returns a Promise.
    */
   export type PromiseReturnType<T extends (...args: any) => Promise<any>> =
      PromiseType<ReturnType<T>>

   /**
    * From T, pick a set of properties whose keys are in the union K
    */
   type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P]
   }

   export type Enumerable<T> = T | Array<T>

   export type RequiredKeys<T> = {
      [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
   }[keyof T]

   export type TruthyKeys<T> = keyof {
      [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
   }

   export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

   /**
    * Subset
    * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
    */
   export type Subset<T, U> = {
      [key in keyof T]: key extends keyof U ? T[key] : never
   }

   /**
    * SelectSubset
    * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
    * Additionally, it validates, if both select and include are present. If the case, it errors.
    */
   export type SelectSubset<T, U> = {
      [key in keyof T]: key extends keyof U ? T[key] : never
   } & (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

   /**
    * Subset + Intersection
    * @desc From `T` pick properties that exist in `U` and intersect `K`
    */
   export type SubsetIntersection<T, U, K> = {
      [key in keyof T]: key extends keyof U ? T[key] : never
   } & K

   type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

   /**
    * XOR is needed to have a real mutually exclusive union type
    * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
    */
   type XOR<T, U> = T extends object
      ? U extends object
         ? (Without<T, U> & U) | (Without<U, T> & T)
         : U
      : T

   /**
    * Is T a Record?
    */
   type IsObject<T extends any> = T extends Array<any>
      ? False
      : T extends Date
      ? False
      : T extends Uint8Array
      ? False
      : T extends BigInt
      ? False
      : T extends object
      ? True
      : False

   /**
    * If it's T[], return T
    */
   export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

   /**
    * From ts-toolbelt
    */

   type __Either<O extends object, K extends Key> = Omit<O, K> &
      {
         // Merge all but K
         [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
      }[K]

   type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

   type EitherLoose<O extends object, K extends Key> = ComputeRaw<
      __Either<O, K>
   >

   type _Either<O extends object, K extends Key, strict extends Boolean> = {
      1: EitherStrict<O, K>
      0: EitherLoose<O, K>
   }[strict]

   type Either<
      O extends object,
      K extends Key,
      strict extends Boolean = 1,
   > = O extends unknown ? _Either<O, K, strict> : never

   export type Union = any

   type PatchUndefined<O extends object, O1 extends object> = {
      [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
   } & {}

   /** Helper Types for "Merge" **/
   export type IntersectOf<U extends Union> = (
      U extends unknown ? (k: U) => void : never
   ) extends (k: infer I) => void
      ? I
      : never

   export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K]
   } & {}

   type _Merge<U extends object> = IntersectOf<
      Overwrite<
         U,
         {
            [K in keyof U]-?: At<U, K>
         }
      >
   >

   type Key = string | number | symbol
   type AtBasic<O extends object, K extends Key> = K extends keyof O
      ? O[K]
      : never
   type AtStrict<O extends object, K extends Key> = O[K & keyof O]
   type AtLoose<O extends object, K extends Key> = O extends unknown
      ? AtStrict<O, K>
      : never
   export type At<
      O extends object,
      K extends Key,
      strict extends Boolean = 1,
   > = {
      1: AtStrict<O, K>
      0: AtLoose<O, K>
   }[strict]

   export type ComputeRaw<A extends any> = A extends Function
      ? A
      : {
           [K in keyof A]: A[K]
        } & {}

   export type OptionalFlat<O> = {
      [K in keyof O]?: O[K]
   } & {}

   type _Record<K extends keyof any, T> = {
      [P in K]: T
   }

   // cause typescript not to expand types and preserve names
   type NoExpand<T> = T extends unknown ? T : never

   // this type assumes the passed object is entirely optional
   type AtLeast<O extends object, K extends string> = NoExpand<
      O extends unknown
         ?
              | (K extends keyof O ? { [P in K]: O[P] } & O : O)
              | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
         : never
   >

   type _Strict<U, _U = U> = U extends unknown
      ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
      : never

   export type Strict<U extends object> = ComputeRaw<_Strict<U>>
   /** End Helper Types for "Merge" **/

   export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>

   /**
  A [[Boolean]]
  */
   export type Boolean = True | False

   // /**
   // 1
   // */
   export type True = 1

   /**
  0
  */
   export type False = 0

   export type Not<B extends Boolean> = {
      0: 1
      1: 0
   }[B]

   export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
      ? 0 // anything `never` is false
      : A1 extends A2
      ? 1
      : 0

   export type Has<U extends Union, U1 extends Union> = Not<
      Extends<Exclude<U1, U>, U1>
   >

   export type Or<B1 extends Boolean, B2 extends Boolean> = {
      0: {
         0: 0
         1: 1
      }
      1: {
         0: 1
         1: 1
      }
   }[B1][B2]

   export type Keys<U extends Union> = U extends unknown ? keyof U : never

   type Cast<A, B> = A extends B ? A : B

   export const type: unique symbol

   export function validator<V>(): <S>(
      select: runtime.Types.Utils.LegacyExact<S, V>,
   ) => S

   /**
    * Used by group by
    */

   export type GetScalarType<T, O> = O extends object
      ? {
           [P in keyof T]: P extends keyof O ? O[P] : never
        }
      : never

   type FieldPaths<
      T,
      U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
   > = IsObject<T> extends True ? U : T

   type GetHavingFields<T> = {
      [K in keyof T]: Or<
         Or<Extends<'OR', K>, Extends<'AND', K>>,
         Extends<'NOT', K>
      > extends True
         ? // infer is only needed to not hit TS limit
           // based on the brilliant idea of Pierre-Antoine Mills
           // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
           T[K] extends infer TK
            ? GetHavingFields<
                 UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
              >
            : never
         : {} extends FieldPaths<T[K]>
         ? never
         : K
   }[keyof T]

   /**
    * Convert tuple to union
    */
   type _TupleToUnion<T> = T extends (infer E)[] ? E : never
   type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
   type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

   /**
    * Like `Pick`, but with an array
    */
   type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<
      T,
      TupleToUnion<K>
   >

   /**
    * Exclude all keys with underscores
    */
   type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
      ? never
      : T

   export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

   type FieldRefInputType<Model, FieldType> = Model extends never
      ? never
      : FieldRef<Model, FieldType>

   export const ModelName: {
      User: 'User'
      VerificationCode: 'VerificationCode'
      Article: 'Article'
      Chapter: 'Chapter'
   }

   export type ModelName = (typeof ModelName)[keyof typeof ModelName]

   export type Datasources = {
      db?: Datasource
   }

   export type DefaultPrismaClient = PrismaClient
   export type RejectOnNotFound = boolean | ((error: Error) => Error)
   export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
   export type RejectPerOperation = {
      [P in 'findUnique' | 'findFirst']?: RejectPerModel | RejectOnNotFound
   }
   type IsReject<T> = T extends true
      ? True
      : T extends (err: Error) => Error
      ? True
      : False
   export type HasReject<
      GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
      LocalRejectSettings,
      Action extends PrismaAction,
      Model extends ModelName,
   > = LocalRejectSettings extends RejectOnNotFound
      ? IsReject<LocalRejectSettings>
      : GlobalRejectSettings extends RejectPerOperation
      ? Action extends keyof GlobalRejectSettings
         ? GlobalRejectSettings[Action] extends RejectOnNotFound
            ? IsReject<GlobalRejectSettings[Action]>
            : GlobalRejectSettings[Action] extends RejectPerModel
            ? Model extends keyof GlobalRejectSettings[Action]
               ? IsReject<GlobalRejectSettings[Action][Model]>
               : False
            : False
         : False
      : IsReject<GlobalRejectSettings>
   export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

   export interface PrismaClientOptions {
      /**
       * Configure findUnique/findFirst to throw an error if the query returns null.
       * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
       * @example
       * ```
       * // Reject on both findUnique/findFirst
       * rejectOnNotFound: true
       * // Reject only on findFirst with a custom error
       * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
       * // Reject on user.findUnique with a custom error
       * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
       * ```
       */
      rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
      /**
       * Overwrites the datasource url from your schema.prisma file
       */
      datasources?: Datasources

      /**
       * @default "colorless"
       */
      errorFormat?: ErrorFormat

      /**
       * @example
       * ```
       * // Defaults to stdout
       * log: ['query', 'info', 'warn', 'error']
       *
       * // Emit as events
       * log: [
       *  { emit: 'stdout', level: 'query' },
       *  { emit: 'stdout', level: 'info' },
       *  { emit: 'stdout', level: 'warn' }
       *  { emit: 'stdout', level: 'error' }
       * ]
       * ```
       * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
       */
      log?: Array<LogLevel | LogDefinition>
   }

   /* Types for Logging */
   export type LogLevel = 'info' | 'query' | 'warn' | 'error'
   export type LogDefinition = {
      level: LogLevel
      emit: 'stdout' | 'event'
   }

   export type GetLogType<T extends LogLevel | LogDefinition> =
      T extends LogDefinition
         ? T['emit'] extends 'event'
            ? T['level']
            : never
         : never
   export type GetEvents<T extends any> = T extends Array<
      LogLevel | LogDefinition
   >
      ?
           | GetLogType<T[0]>
           | GetLogType<T[1]>
           | GetLogType<T[2]>
           | GetLogType<T[3]>
      : never

   export type QueryEvent = {
      timestamp: Date
      query: string
      params: string
      duration: number
      target: string
   }

   export type LogEvent = {
      timestamp: Date
      message: string
      target: string
   }
   /* End Types for Logging */

   export type PrismaAction =
      | 'findUnique'
      | 'findMany'
      | 'findFirst'
      | 'create'
      | 'createMany'
      | 'update'
      | 'updateMany'
      | 'upsert'
      | 'delete'
      | 'deleteMany'
      | 'executeRaw'
      | 'queryRaw'
      | 'aggregate'
      | 'count'
      | 'runCommandRaw'
      | 'findRaw'

   /**
    * These options are being passed into the middleware as "params"
    */
   export type MiddlewareParams = {
      model?: ModelName
      action: PrismaAction
      args: any
      dataPath: string[]
      runInTransaction: boolean
   }

   /**
    * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
    */
   export type Middleware<T = any> = (
      params: MiddlewareParams,
      next: (params: MiddlewareParams) => Promise<T>,
   ) => Promise<T>

   // tested in getLogLevel.test.ts
   export function getLogLevel(
      log: Array<LogLevel | LogDefinition>,
   ): LogLevel | undefined

   /**
    * `PrismaClient` proxy available in interactive transactions.
    */
   export type TransactionClient = Omit<
      Prisma.DefaultPrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
   >

   export type Datasource = {
      url?: string
   }

   /**
    * Count Types
    */

   /**
    * Count Type UserCountOutputType
    */

   export type UserCountOutputType = {
      article: number
   }

   export type UserCountOutputTypeSelect = {
      article?: boolean
   }

   export type UserCountOutputTypeGetPayload<
      S extends boolean | null | undefined | UserCountOutputTypeArgs,
   > = S extends { select: any; include: any }
      ? 'Please either choose `select` or `include`'
      : S extends true
      ? UserCountOutputType
      : S extends undefined
      ? never
      : S extends { include: any } & UserCountOutputTypeArgs
      ? UserCountOutputType
      : S extends { select: any } & UserCountOutputTypeArgs
      ? {
           [P in TruthyKeys<S['select']>]: P extends keyof UserCountOutputType
              ? UserCountOutputType[P]
              : never
        }
      : UserCountOutputType

   // Custom InputTypes

   /**
    * UserCountOutputType without action
    */
   export type UserCountOutputTypeArgs = {
      /**
       * Select specific fields to fetch from the UserCountOutputType
       */
      select?: UserCountOutputTypeSelect | null
   }

   /**
    * Count Type ArticleCountOutputType
    */

   export type ArticleCountOutputType = {
      chapter: number
   }

   export type ArticleCountOutputTypeSelect = {
      chapter?: boolean
   }

   export type ArticleCountOutputTypeGetPayload<
      S extends boolean | null | undefined | ArticleCountOutputTypeArgs,
   > = S extends { select: any; include: any }
      ? 'Please either choose `select` or `include`'
      : S extends true
      ? ArticleCountOutputType
      : S extends undefined
      ? never
      : S extends { include: any } & ArticleCountOutputTypeArgs
      ? ArticleCountOutputType
      : S extends { select: any } & ArticleCountOutputTypeArgs
      ? {
           [P in TruthyKeys<
              S['select']
           >]: P extends keyof ArticleCountOutputType
              ? ArticleCountOutputType[P]
              : never
        }
      : ArticleCountOutputType

   // Custom InputTypes

   /**
    * ArticleCountOutputType without action
    */
   export type ArticleCountOutputTypeArgs = {
      /**
       * Select specific fields to fetch from the ArticleCountOutputType
       */
      select?: ArticleCountOutputTypeSelect | null
   }

   /**
    * Models
    */

   /**
    * Model User
    */

   export type AggregateUser = {
      _count: UserCountAggregateOutputType | null
      _avg: UserAvgAggregateOutputType | null
      _sum: UserSumAggregateOutputType | null
      _min: UserMinAggregateOutputType | null
      _max: UserMaxAggregateOutputType | null
   }

   export type UserAvgAggregateOutputType = {
      id: number | null
   }

   export type UserSumAggregateOutputType = {
      id: number | null
   }

   export type UserMinAggregateOutputType = {
      id: number | null
      username: string | null
      password: string | null
      phoneNumber: string | null
      createdAt: Date | null
      updatedAt: Date | null
   }

   export type UserMaxAggregateOutputType = {
      id: number | null
      username: string | null
      password: string | null
      phoneNumber: string | null
      createdAt: Date | null
      updatedAt: Date | null
   }

   export type UserCountAggregateOutputType = {
      id: number
      username: number
      password: number
      phoneNumber: number
      createdAt: number
      updatedAt: number
      _all: number
   }

   export type UserAvgAggregateInputType = {
      id?: true
   }

   export type UserSumAggregateInputType = {
      id?: true
   }

   export type UserMinAggregateInputType = {
      id?: true
      username?: true
      password?: true
      phoneNumber?: true
      createdAt?: true
      updatedAt?: true
   }

   export type UserMaxAggregateInputType = {
      id?: true
      username?: true
      password?: true
      phoneNumber?: true
      createdAt?: true
      updatedAt?: true
   }

   export type UserCountAggregateInputType = {
      id?: true
      username?: true
      password?: true
      phoneNumber?: true
      createdAt?: true
      updatedAt?: true
      _all?: true
   }

   export type UserAggregateArgs = {
      /**
       * Filter which User to aggregate.
       */
      where?: UserWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: Enumerable<UserOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the start position
       */
      cursor?: UserWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Count returned Users
       **/
      _count?: true | UserCountAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to average
       **/
      _avg?: UserAvgAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to sum
       **/
      _sum?: UserSumAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the minimum value
       **/
      _min?: UserMinAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the maximum value
       **/
      _max?: UserMaxAggregateInputType
   }

   export type GetUserAggregateType<T extends UserAggregateArgs> = {
      [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
         ? T[P] extends true
            ? number
            : GetScalarType<T[P], AggregateUser[P]>
         : GetScalarType<T[P], AggregateUser[P]>
   }

   export type UserGroupByArgs = {
      where?: UserWhereInput
      orderBy?: Enumerable<UserOrderByWithAggregationInput>
      by: UserScalarFieldEnum[]
      having?: UserScalarWhereWithAggregatesInput
      take?: number
      skip?: number
      _count?: UserCountAggregateInputType | true
      _avg?: UserAvgAggregateInputType
      _sum?: UserSumAggregateInputType
      _min?: UserMinAggregateInputType
      _max?: UserMaxAggregateInputType
   }

   export type UserGroupByOutputType = {
      id: number
      username: string | null
      password: string
      phoneNumber: string
      createdAt: Date
      updatedAt: Date
      _count: UserCountAggregateOutputType | null
      _avg: UserAvgAggregateOutputType | null
      _sum: UserSumAggregateOutputType | null
      _min: UserMinAggregateOutputType | null
      _max: UserMaxAggregateOutputType | null
   }

   type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
      Array<
         PickArray<UserGroupByOutputType, T['by']> & {
            [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
               ? T[P] extends boolean
                  ? number
                  : GetScalarType<T[P], UserGroupByOutputType[P]>
               : GetScalarType<T[P], UserGroupByOutputType[P]>
         }
      >
   >

   export type UserSelect = {
      id?: boolean
      username?: boolean
      password?: boolean
      phoneNumber?: boolean
      createdAt?: boolean
      updatedAt?: boolean
      article?: boolean | User$articleArgs
      _count?: boolean | UserCountOutputTypeArgs
   }

   export type UserInclude = {
      article?: boolean | User$articleArgs
      _count?: boolean | UserCountOutputTypeArgs
   }

   export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
      S extends { select: any; include: any }
         ? 'Please either choose `select` or `include`'
         : S extends true
         ? User
         : S extends undefined
         ? never
         : S extends { include: any } & (UserArgs | UserFindManyArgs)
         ? User & {
              [P in TruthyKeys<S['include']>]: P extends 'article'
                 ? Array<ArticleGetPayload<S['include'][P]>>
                 : P extends '_count'
                 ? UserCountOutputTypeGetPayload<S['include'][P]>
                 : never
           }
         : S extends { select: any } & (UserArgs | UserFindManyArgs)
         ? {
              [P in TruthyKeys<S['select']>]: P extends 'article'
                 ? Array<ArticleGetPayload<S['select'][P]>>
                 : P extends '_count'
                 ? UserCountOutputTypeGetPayload<S['select'][P]>
                 : P extends keyof User
                 ? User[P]
                 : never
           }
         : User

   type UserCountArgs = Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
   }

   export interface UserDelegate<
      GlobalRejectSettings extends
         | Prisma.RejectOnNotFound
         | Prisma.RejectPerOperation
         | false
         | undefined,
   > {
      /**
       * Find zero or one User that matches the filter.
       * @param {UserFindUniqueArgs} args - Arguments to find a User
       * @example
       * // Get one User
       * const user = await prisma.user.findUnique({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findUnique<
         T extends UserFindUniqueArgs,
         LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
            ? T['rejectOnNotFound']
            : undefined,
      >(
         args: SelectSubset<T, UserFindUniqueArgs>,
      ): HasReject<
         GlobalRejectSettings,
         LocalRejectSettings,
         'findUnique',
         'User'
      > extends True
         ? Prisma__UserClient<UserGetPayload<T>>
         : Prisma__UserClient<UserGetPayload<T> | null, null>

      /**
       * Find one User that matches the filter or throw an error  with `error.code='P2025'`
       *     if no matches were found.
       * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
       * @example
       * // Get one User
       * const user = await prisma.user.findUniqueOrThrow({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
         args?: SelectSubset<T, UserFindUniqueOrThrowArgs>,
      ): Prisma__UserClient<UserGetPayload<T>>

      /**
       * Find the first User that matches the filter.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {UserFindFirstArgs} args - Arguments to find a User
       * @example
       * // Get one User
       * const user = await prisma.user.findFirst({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findFirst<
         T extends UserFindFirstArgs,
         LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
            ? T['rejectOnNotFound']
            : undefined,
      >(
         args?: SelectSubset<T, UserFindFirstArgs>,
      ): HasReject<
         GlobalRejectSettings,
         LocalRejectSettings,
         'findFirst',
         'User'
      > extends True
         ? Prisma__UserClient<UserGetPayload<T>>
         : Prisma__UserClient<UserGetPayload<T> | null, null>

      /**
       * Find the first User that matches the filter or
       * throw `NotFoundError` if no matches were found.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
       * @example
       * // Get one User
       * const user = await prisma.user.findFirstOrThrow({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
         args?: SelectSubset<T, UserFindFirstOrThrowArgs>,
      ): Prisma__UserClient<UserGetPayload<T>>

      /**
       * Find zero or more Users that matches the filter.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
       * @example
       * // Get all Users
       * const users = await prisma.user.findMany()
       *
       * // Get first 10 Users
       * const users = await prisma.user.findMany({ take: 10 })
       *
       * // Only select the `id`
       * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
       *
       **/
      findMany<T extends UserFindManyArgs>(
         args?: SelectSubset<T, UserFindManyArgs>,
      ): Prisma.PrismaPromise<Array<UserGetPayload<T>>>

      /**
       * Create a User.
       * @param {UserCreateArgs} args - Arguments to create a User.
       * @example
       * // Create one User
       * const User = await prisma.user.create({
       *   data: {
       *     // ... data to create a User
       *   }
       * })
       *
       **/
      create<T extends UserCreateArgs>(
         args: SelectSubset<T, UserCreateArgs>,
      ): Prisma__UserClient<UserGetPayload<T>>

      /**
       * Create many Users.
       *     @param {UserCreateManyArgs} args - Arguments to create many Users.
       *     @example
       *     // Create many Users
       *     const user = await prisma.user.createMany({
       *       data: {
       *         // ... provide data here
       *       }
       *     })
       *
       **/
      createMany<T extends UserCreateManyArgs>(
         args?: SelectSubset<T, UserCreateManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Delete a User.
       * @param {UserDeleteArgs} args - Arguments to delete one User.
       * @example
       * // Delete one User
       * const User = await prisma.user.delete({
       *   where: {
       *     // ... filter to delete one User
       *   }
       * })
       *
       **/
      delete<T extends UserDeleteArgs>(
         args: SelectSubset<T, UserDeleteArgs>,
      ): Prisma__UserClient<UserGetPayload<T>>

      /**
       * Update one User.
       * @param {UserUpdateArgs} args - Arguments to update one User.
       * @example
       * // Update one User
       * const user = await prisma.user.update({
       *   where: {
       *     // ... provide filter here
       *   },
       *   data: {
       *     // ... provide data here
       *   }
       * })
       *
       **/
      update<T extends UserUpdateArgs>(
         args: SelectSubset<T, UserUpdateArgs>,
      ): Prisma__UserClient<UserGetPayload<T>>

      /**
       * Delete zero or more Users.
       * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
       * @example
       * // Delete a few Users
       * const { count } = await prisma.user.deleteMany({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       *
       **/
      deleteMany<T extends UserDeleteManyArgs>(
         args?: SelectSubset<T, UserDeleteManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Update zero or more Users.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
       * @example
       * // Update many Users
       * const user = await prisma.user.updateMany({
       *   where: {
       *     // ... provide filter here
       *   },
       *   data: {
       *     // ... provide data here
       *   }
       * })
       *
       **/
      updateMany<T extends UserUpdateManyArgs>(
         args: SelectSubset<T, UserUpdateManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Create or update one User.
       * @param {UserUpsertArgs} args - Arguments to update or create a User.
       * @example
       * // Update or create a User
       * const user = await prisma.user.upsert({
       *   create: {
       *     // ... data to create a User
       *   },
       *   update: {
       *     // ... in case it already exists, update
       *   },
       *   where: {
       *     // ... the filter for the User we want to update
       *   }
       * })
       **/
      upsert<T extends UserUpsertArgs>(
         args: SelectSubset<T, UserUpsertArgs>,
      ): Prisma__UserClient<UserGetPayload<T>>

      /**
       * Count the number of Users.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {UserCountArgs} args - Arguments to filter Users to count.
       * @example
       * // Count the number of Users
       * const count = await prisma.user.count({
       *   where: {
       *     // ... the filter for the Users we want to count
       *   }
       * })
       **/
      count<T extends UserCountArgs>(
         args?: Subset<T, UserCountArgs>,
      ): Prisma.PrismaPromise<
         T extends _Record<'select', any>
            ? T['select'] extends true
               ? number
               : GetScalarType<T['select'], UserCountAggregateOutputType>
            : number
      >

      /**
       * Allows you to perform aggregations operations on a User.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
       * @example
       * // Ordered by age ascending
       * // Where email contains prisma.io
       * // Limited to the 10 users
       * const aggregations = await prisma.user.aggregate({
       *   _avg: {
       *     age: true,
       *   },
       *   where: {
       *     email: {
       *       contains: "prisma.io",
       *     },
       *   },
       *   orderBy: {
       *     age: "asc",
       *   },
       *   take: 10,
       * })
       **/
      aggregate<T extends UserAggregateArgs>(
         args: Subset<T, UserAggregateArgs>,
      ): Prisma.PrismaPromise<GetUserAggregateType<T>>

      /**
       * Group by User.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {UserGroupByArgs} args - Group by arguments.
       * @example
       * // Group by city, order by createdAt, get count
       * const result = await prisma.user.groupBy({
       *   by: ['city', 'createdAt'],
       *   orderBy: {
       *     createdAt: true
       *   },
       *   _count: {
       *     _all: true
       *   },
       * })
       *
       **/
      groupBy<
         T extends UserGroupByArgs,
         HasSelectOrTake extends Or<
            Extends<'skip', Keys<T>>,
            Extends<'take', Keys<T>>
         >,
         OrderByArg extends True extends HasSelectOrTake
            ? { orderBy: UserGroupByArgs['orderBy'] }
            : { orderBy?: UserGroupByArgs['orderBy'] },
         OrderFields extends ExcludeUnderscoreKeys<
            Keys<MaybeTupleToUnion<T['orderBy']>>
         >,
         ByFields extends TupleToUnion<T['by']>,
         ByValid extends Has<ByFields, OrderFields>,
         HavingFields extends GetHavingFields<T['having']>,
         HavingValid extends Has<ByFields, HavingFields>,
         ByEmpty extends T['by'] extends never[] ? True : False,
         InputErrors extends ByEmpty extends True
            ? `Error: "by" must not be empty.`
            : HavingValid extends False
            ? {
                 [P in HavingFields]: P extends ByFields
                    ? never
                    : P extends string
                    ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                    : [
                         Error,
                         'Field ',
                         P,
                         ` in "having" needs to be provided in "by"`,
                      ]
              }[HavingFields]
            : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
               ? ByValid extends True
                  ? {}
                  : {
                       [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
               : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
            ? 'orderBy' extends Keys<T>
               ? ByValid extends True
                  ? {}
                  : {
                       [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
               : 'Error: If you provide "skip", you also need to provide "orderBy"'
            : ByValid extends True
            ? {}
            : {
                 [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields],
      >(
         args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
      ): {} extends InputErrors
         ? GetUserGroupByPayload<T>
         : Prisma.PrismaPromise<InputErrors>
   }

   /**
    * The delegate class that acts as a "Promise-like" for User.
    * Why is this prefixed with `Prisma__`?
    * Because we want to prevent naming conflicts as mentioned in
    * https://github.com/prisma/prisma-client-js/issues/707
    */
   export class Prisma__UserClient<T, Null = never>
      implements Prisma.PrismaPromise<T>
   {
      private readonly _dmmf
      private readonly _queryType
      private readonly _rootField
      private readonly _clientMethod
      private readonly _args
      private readonly _dataPath
      private readonly _errorFormat
      private readonly _measurePerformance?
      private _isList
      private _callsite
      private _requestPromise?;
      readonly [Symbol.toStringTag]: 'PrismaPromise'
      constructor(
         _dmmf: runtime.DMMFClass,
         _queryType: 'query' | 'mutation',
         _rootField: string,
         _clientMethod: string,
         _args: any,
         _dataPath: string[],
         _errorFormat: ErrorFormat,
         _measurePerformance?: boolean | undefined,
         _isList?: boolean,
      )

      article<T extends User$articleArgs = {}>(
         args?: Subset<T, User$articleArgs>,
      ): Prisma.PrismaPromise<Array<ArticleGetPayload<T>> | Null>

      private get _document()
      /**
       * Attaches callbacks for the resolution and/or rejection of the Promise.
       * @param onfulfilled The callback to execute when the Promise is resolved.
       * @param onrejected The callback to execute when the Promise is rejected.
       * @returns A Promise for the completion of which ever callback is executed.
       */
      then<TResult1 = T, TResult2 = never>(
         onfulfilled?:
            | ((value: T) => TResult1 | PromiseLike<TResult1>)
            | undefined
            | null,
         onrejected?:
            | ((reason: any) => TResult2 | PromiseLike<TResult2>)
            | undefined
            | null,
      ): Promise<TResult1 | TResult2>
      /**
       * Attaches a callback for only the rejection of the Promise.
       * @param onrejected The callback to execute when the Promise is rejected.
       * @returns A Promise for the completion of the callback.
       */
      catch<TResult = never>(
         onrejected?:
            | ((reason: any) => TResult | PromiseLike<TResult>)
            | undefined
            | null,
      ): Promise<T | TResult>
      /**
       * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
       * resolved value cannot be modified from the callback.
       * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
       * @returns A Promise for the completion of the callback.
       */
      finally(onfinally?: (() => void) | undefined | null): Promise<T>
   }

   // Custom InputTypes

   /**
    * User base type for findUnique actions
    */
   export type UserFindUniqueArgsBase = {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: UserInclude | null
      /**
       * Filter, which User to fetch.
       */
      where: UserWhereUniqueInput
   }

   /**
    * User findUnique
    */
   export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
      /**
       * Throw an Error if query returns no results
       * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
       */
      rejectOnNotFound?: RejectOnNotFound
   }

   /**
    * User findUniqueOrThrow
    */
   export type UserFindUniqueOrThrowArgs = {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: UserInclude | null
      /**
       * Filter, which User to fetch.
       */
      where: UserWhereUniqueInput
   }

   /**
    * User base type for findFirst actions
    */
   export type UserFindFirstArgsBase = {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: UserInclude | null
      /**
       * Filter, which User to fetch.
       */
      where?: UserWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: Enumerable<UserOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for searching for Users.
       */
      cursor?: UserWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of Users.
       */
      distinct?: Enumerable<UserScalarFieldEnum>
   }

   /**
    * User findFirst
    */
   export interface UserFindFirstArgs extends UserFindFirstArgsBase {
      /**
       * Throw an Error if query returns no results
       * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
       */
      rejectOnNotFound?: RejectOnNotFound
   }

   /**
    * User findFirstOrThrow
    */
   export type UserFindFirstOrThrowArgs = {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: UserInclude | null
      /**
       * Filter, which User to fetch.
       */
      where?: UserWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: Enumerable<UserOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for searching for Users.
       */
      cursor?: UserWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of Users.
       */
      distinct?: Enumerable<UserScalarFieldEnum>
   }

   /**
    * User findMany
    */
   export type UserFindManyArgs = {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: UserInclude | null
      /**
       * Filter, which Users to fetch.
       */
      where?: UserWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: Enumerable<UserOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Users.
       */
      cursor?: UserWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number
      distinct?: Enumerable<UserScalarFieldEnum>
   }

   /**
    * User create
    */
   export type UserCreateArgs = {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: UserInclude | null
      /**
       * The data needed to create a User.
       */
      data: XOR<UserCreateInput, UserUncheckedCreateInput>
   }

   /**
    * User createMany
    */
   export type UserCreateManyArgs = {
      /**
       * The data used to create many Users.
       */
      data: Enumerable<UserCreateManyInput>
      skipDuplicates?: boolean
   }

   /**
    * User update
    */
   export type UserUpdateArgs = {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: UserInclude | null
      /**
       * The data needed to update a User.
       */
      data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
      /**
       * Choose, which User to update.
       */
      where: UserWhereUniqueInput
   }

   /**
    * User updateMany
    */
   export type UserUpdateManyArgs = {
      /**
       * The data used to update Users.
       */
      data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
      /**
       * Filter which Users to update
       */
      where?: UserWhereInput
   }

   /**
    * User upsert
    */
   export type UserUpsertArgs = {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: UserInclude | null
      /**
       * The filter to search for the User to update in case it exists.
       */
      where: UserWhereUniqueInput
      /**
       * In case the User found by the `where` argument doesn't exist, create a new User with this data.
       */
      create: XOR<UserCreateInput, UserUncheckedCreateInput>
      /**
       * In case the User was found with the provided `where` argument, update it with this data.
       */
      update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
   }

   /**
    * User delete
    */
   export type UserDeleteArgs = {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: UserInclude | null
      /**
       * Filter which User to delete.
       */
      where: UserWhereUniqueInput
   }

   /**
    * User deleteMany
    */
   export type UserDeleteManyArgs = {
      /**
       * Filter which Users to delete
       */
      where?: UserWhereInput
   }

   /**
    * User.article
    */
   export type User$articleArgs = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
      where?: ArticleWhereInput
      orderBy?: Enumerable<ArticleOrderByWithRelationInput>
      cursor?: ArticleWhereUniqueInput
      take?: number
      skip?: number
      distinct?: Enumerable<ArticleScalarFieldEnum>
   }

   /**
    * User without action
    */
   export type UserArgs = {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: UserInclude | null
   }

   /**
    * Model VerificationCode
    */

   export type AggregateVerificationCode = {
      _count: VerificationCodeCountAggregateOutputType | null
      _avg: VerificationCodeAvgAggregateOutputType | null
      _sum: VerificationCodeSumAggregateOutputType | null
      _min: VerificationCodeMinAggregateOutputType | null
      _max: VerificationCodeMaxAggregateOutputType | null
   }

   export type VerificationCodeAvgAggregateOutputType = {
      id: number | null
   }

   export type VerificationCodeSumAggregateOutputType = {
      id: number | null
   }

   export type VerificationCodeMinAggregateOutputType = {
      id: number | null
      phoneNumber: string | null
      code: string | null
      createdAt: Date | null
      updatedAt: Date | null
   }

   export type VerificationCodeMaxAggregateOutputType = {
      id: number | null
      phoneNumber: string | null
      code: string | null
      createdAt: Date | null
      updatedAt: Date | null
   }

   export type VerificationCodeCountAggregateOutputType = {
      id: number
      phoneNumber: number
      code: number
      createdAt: number
      updatedAt: number
      _all: number
   }

   export type VerificationCodeAvgAggregateInputType = {
      id?: true
   }

   export type VerificationCodeSumAggregateInputType = {
      id?: true
   }

   export type VerificationCodeMinAggregateInputType = {
      id?: true
      phoneNumber?: true
      code?: true
      createdAt?: true
      updatedAt?: true
   }

   export type VerificationCodeMaxAggregateInputType = {
      id?: true
      phoneNumber?: true
      code?: true
      createdAt?: true
      updatedAt?: true
   }

   export type VerificationCodeCountAggregateInputType = {
      id?: true
      phoneNumber?: true
      code?: true
      createdAt?: true
      updatedAt?: true
      _all?: true
   }

   export type VerificationCodeAggregateArgs = {
      /**
       * Filter which VerificationCode to aggregate.
       */
      where?: VerificationCodeWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of VerificationCodes to fetch.
       */
      orderBy?: Enumerable<VerificationCodeOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the start position
       */
      cursor?: VerificationCodeWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` VerificationCodes from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` VerificationCodes.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Count returned VerificationCodes
       **/
      _count?: true | VerificationCodeCountAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to average
       **/
      _avg?: VerificationCodeAvgAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to sum
       **/
      _sum?: VerificationCodeSumAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the minimum value
       **/
      _min?: VerificationCodeMinAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the maximum value
       **/
      _max?: VerificationCodeMaxAggregateInputType
   }

   export type GetVerificationCodeAggregateType<
      T extends VerificationCodeAggregateArgs,
   > = {
      [P in keyof T & keyof AggregateVerificationCode]: P extends
         | '_count'
         | 'count'
         ? T[P] extends true
            ? number
            : GetScalarType<T[P], AggregateVerificationCode[P]>
         : GetScalarType<T[P], AggregateVerificationCode[P]>
   }

   export type VerificationCodeGroupByArgs = {
      where?: VerificationCodeWhereInput
      orderBy?: Enumerable<VerificationCodeOrderByWithAggregationInput>
      by: VerificationCodeScalarFieldEnum[]
      having?: VerificationCodeScalarWhereWithAggregatesInput
      take?: number
      skip?: number
      _count?: VerificationCodeCountAggregateInputType | true
      _avg?: VerificationCodeAvgAggregateInputType
      _sum?: VerificationCodeSumAggregateInputType
      _min?: VerificationCodeMinAggregateInputType
      _max?: VerificationCodeMaxAggregateInputType
   }

   export type VerificationCodeGroupByOutputType = {
      id: number
      phoneNumber: string
      code: string
      createdAt: Date
      updatedAt: Date
      _count: VerificationCodeCountAggregateOutputType | null
      _avg: VerificationCodeAvgAggregateOutputType | null
      _sum: VerificationCodeSumAggregateOutputType | null
      _min: VerificationCodeMinAggregateOutputType | null
      _max: VerificationCodeMaxAggregateOutputType | null
   }

   type GetVerificationCodeGroupByPayload<
      T extends VerificationCodeGroupByArgs,
   > = Prisma.PrismaPromise<
      Array<
         PickArray<VerificationCodeGroupByOutputType, T['by']> & {
            [P in keyof T &
               keyof VerificationCodeGroupByOutputType]: P extends '_count'
               ? T[P] extends boolean
                  ? number
                  : GetScalarType<T[P], VerificationCodeGroupByOutputType[P]>
               : GetScalarType<T[P], VerificationCodeGroupByOutputType[P]>
         }
      >
   >

   export type VerificationCodeSelect = {
      id?: boolean
      phoneNumber?: boolean
      code?: boolean
      createdAt?: boolean
      updatedAt?: boolean
   }

   export type VerificationCodeGetPayload<
      S extends boolean | null | undefined | VerificationCodeArgs,
   > = S extends { select: any; include: any }
      ? 'Please either choose `select` or `include`'
      : S extends true
      ? VerificationCode
      : S extends undefined
      ? never
      : S extends { include: any } & (
           | VerificationCodeArgs
           | VerificationCodeFindManyArgs
        )
      ? VerificationCode
      : S extends { select: any } & (
           | VerificationCodeArgs
           | VerificationCodeFindManyArgs
        )
      ? {
           [P in TruthyKeys<S['select']>]: P extends keyof VerificationCode
              ? VerificationCode[P]
              : never
        }
      : VerificationCode

   type VerificationCodeCountArgs = Omit<
      VerificationCodeFindManyArgs,
      'select' | 'include'
   > & {
      select?: VerificationCodeCountAggregateInputType | true
   }

   export interface VerificationCodeDelegate<
      GlobalRejectSettings extends
         | Prisma.RejectOnNotFound
         | Prisma.RejectPerOperation
         | false
         | undefined,
   > {
      /**
       * Find zero or one VerificationCode that matches the filter.
       * @param {VerificationCodeFindUniqueArgs} args - Arguments to find a VerificationCode
       * @example
       * // Get one VerificationCode
       * const verificationCode = await prisma.verificationCode.findUnique({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findUnique<
         T extends VerificationCodeFindUniqueArgs,
         LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
            ? T['rejectOnNotFound']
            : undefined,
      >(
         args: SelectSubset<T, VerificationCodeFindUniqueArgs>,
      ): HasReject<
         GlobalRejectSettings,
         LocalRejectSettings,
         'findUnique',
         'VerificationCode'
      > extends True
         ? Prisma__VerificationCodeClient<VerificationCodeGetPayload<T>>
         : Prisma__VerificationCodeClient<
              VerificationCodeGetPayload<T> | null,
              null
           >

      /**
       * Find one VerificationCode that matches the filter or throw an error  with `error.code='P2025'`
       *     if no matches were found.
       * @param {VerificationCodeFindUniqueOrThrowArgs} args - Arguments to find a VerificationCode
       * @example
       * // Get one VerificationCode
       * const verificationCode = await prisma.verificationCode.findUniqueOrThrow({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findUniqueOrThrow<T extends VerificationCodeFindUniqueOrThrowArgs>(
         args?: SelectSubset<T, VerificationCodeFindUniqueOrThrowArgs>,
      ): Prisma__VerificationCodeClient<VerificationCodeGetPayload<T>>

      /**
       * Find the first VerificationCode that matches the filter.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {VerificationCodeFindFirstArgs} args - Arguments to find a VerificationCode
       * @example
       * // Get one VerificationCode
       * const verificationCode = await prisma.verificationCode.findFirst({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findFirst<
         T extends VerificationCodeFindFirstArgs,
         LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
            ? T['rejectOnNotFound']
            : undefined,
      >(
         args?: SelectSubset<T, VerificationCodeFindFirstArgs>,
      ): HasReject<
         GlobalRejectSettings,
         LocalRejectSettings,
         'findFirst',
         'VerificationCode'
      > extends True
         ? Prisma__VerificationCodeClient<VerificationCodeGetPayload<T>>
         : Prisma__VerificationCodeClient<
              VerificationCodeGetPayload<T> | null,
              null
           >

      /**
       * Find the first VerificationCode that matches the filter or
       * throw `NotFoundError` if no matches were found.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {VerificationCodeFindFirstOrThrowArgs} args - Arguments to find a VerificationCode
       * @example
       * // Get one VerificationCode
       * const verificationCode = await prisma.verificationCode.findFirstOrThrow({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findFirstOrThrow<T extends VerificationCodeFindFirstOrThrowArgs>(
         args?: SelectSubset<T, VerificationCodeFindFirstOrThrowArgs>,
      ): Prisma__VerificationCodeClient<VerificationCodeGetPayload<T>>

      /**
       * Find zero or more VerificationCodes that matches the filter.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {VerificationCodeFindManyArgs=} args - Arguments to filter and select certain fields only.
       * @example
       * // Get all VerificationCodes
       * const verificationCodes = await prisma.verificationCode.findMany()
       *
       * // Get first 10 VerificationCodes
       * const verificationCodes = await prisma.verificationCode.findMany({ take: 10 })
       *
       * // Only select the `id`
       * const verificationCodeWithIdOnly = await prisma.verificationCode.findMany({ select: { id: true } })
       *
       **/
      findMany<T extends VerificationCodeFindManyArgs>(
         args?: SelectSubset<T, VerificationCodeFindManyArgs>,
      ): Prisma.PrismaPromise<Array<VerificationCodeGetPayload<T>>>

      /**
       * Create a VerificationCode.
       * @param {VerificationCodeCreateArgs} args - Arguments to create a VerificationCode.
       * @example
       * // Create one VerificationCode
       * const VerificationCode = await prisma.verificationCode.create({
       *   data: {
       *     // ... data to create a VerificationCode
       *   }
       * })
       *
       **/
      create<T extends VerificationCodeCreateArgs>(
         args: SelectSubset<T, VerificationCodeCreateArgs>,
      ): Prisma__VerificationCodeClient<VerificationCodeGetPayload<T>>

      /**
       * Create many VerificationCodes.
       *     @param {VerificationCodeCreateManyArgs} args - Arguments to create many VerificationCodes.
       *     @example
       *     // Create many VerificationCodes
       *     const verificationCode = await prisma.verificationCode.createMany({
       *       data: {
       *         // ... provide data here
       *       }
       *     })
       *
       **/
      createMany<T extends VerificationCodeCreateManyArgs>(
         args?: SelectSubset<T, VerificationCodeCreateManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Delete a VerificationCode.
       * @param {VerificationCodeDeleteArgs} args - Arguments to delete one VerificationCode.
       * @example
       * // Delete one VerificationCode
       * const VerificationCode = await prisma.verificationCode.delete({
       *   where: {
       *     // ... filter to delete one VerificationCode
       *   }
       * })
       *
       **/
      delete<T extends VerificationCodeDeleteArgs>(
         args: SelectSubset<T, VerificationCodeDeleteArgs>,
      ): Prisma__VerificationCodeClient<VerificationCodeGetPayload<T>>

      /**
       * Update one VerificationCode.
       * @param {VerificationCodeUpdateArgs} args - Arguments to update one VerificationCode.
       * @example
       * // Update one VerificationCode
       * const verificationCode = await prisma.verificationCode.update({
       *   where: {
       *     // ... provide filter here
       *   },
       *   data: {
       *     // ... provide data here
       *   }
       * })
       *
       **/
      update<T extends VerificationCodeUpdateArgs>(
         args: SelectSubset<T, VerificationCodeUpdateArgs>,
      ): Prisma__VerificationCodeClient<VerificationCodeGetPayload<T>>

      /**
       * Delete zero or more VerificationCodes.
       * @param {VerificationCodeDeleteManyArgs} args - Arguments to filter VerificationCodes to delete.
       * @example
       * // Delete a few VerificationCodes
       * const { count } = await prisma.verificationCode.deleteMany({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       *
       **/
      deleteMany<T extends VerificationCodeDeleteManyArgs>(
         args?: SelectSubset<T, VerificationCodeDeleteManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Update zero or more VerificationCodes.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {VerificationCodeUpdateManyArgs} args - Arguments to update one or more rows.
       * @example
       * // Update many VerificationCodes
       * const verificationCode = await prisma.verificationCode.updateMany({
       *   where: {
       *     // ... provide filter here
       *   },
       *   data: {
       *     // ... provide data here
       *   }
       * })
       *
       **/
      updateMany<T extends VerificationCodeUpdateManyArgs>(
         args: SelectSubset<T, VerificationCodeUpdateManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Create or update one VerificationCode.
       * @param {VerificationCodeUpsertArgs} args - Arguments to update or create a VerificationCode.
       * @example
       * // Update or create a VerificationCode
       * const verificationCode = await prisma.verificationCode.upsert({
       *   create: {
       *     // ... data to create a VerificationCode
       *   },
       *   update: {
       *     // ... in case it already exists, update
       *   },
       *   where: {
       *     // ... the filter for the VerificationCode we want to update
       *   }
       * })
       **/
      upsert<T extends VerificationCodeUpsertArgs>(
         args: SelectSubset<T, VerificationCodeUpsertArgs>,
      ): Prisma__VerificationCodeClient<VerificationCodeGetPayload<T>>

      /**
       * Count the number of VerificationCodes.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {VerificationCodeCountArgs} args - Arguments to filter VerificationCodes to count.
       * @example
       * // Count the number of VerificationCodes
       * const count = await prisma.verificationCode.count({
       *   where: {
       *     // ... the filter for the VerificationCodes we want to count
       *   }
       * })
       **/
      count<T extends VerificationCodeCountArgs>(
         args?: Subset<T, VerificationCodeCountArgs>,
      ): Prisma.PrismaPromise<
         T extends _Record<'select', any>
            ? T['select'] extends true
               ? number
               : GetScalarType<
                    T['select'],
                    VerificationCodeCountAggregateOutputType
                 >
            : number
      >

      /**
       * Allows you to perform aggregations operations on a VerificationCode.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {VerificationCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
       * @example
       * // Ordered by age ascending
       * // Where email contains prisma.io
       * // Limited to the 10 users
       * const aggregations = await prisma.user.aggregate({
       *   _avg: {
       *     age: true,
       *   },
       *   where: {
       *     email: {
       *       contains: "prisma.io",
       *     },
       *   },
       *   orderBy: {
       *     age: "asc",
       *   },
       *   take: 10,
       * })
       **/
      aggregate<T extends VerificationCodeAggregateArgs>(
         args: Subset<T, VerificationCodeAggregateArgs>,
      ): Prisma.PrismaPromise<GetVerificationCodeAggregateType<T>>

      /**
       * Group by VerificationCode.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {VerificationCodeGroupByArgs} args - Group by arguments.
       * @example
       * // Group by city, order by createdAt, get count
       * const result = await prisma.user.groupBy({
       *   by: ['city', 'createdAt'],
       *   orderBy: {
       *     createdAt: true
       *   },
       *   _count: {
       *     _all: true
       *   },
       * })
       *
       **/
      groupBy<
         T extends VerificationCodeGroupByArgs,
         HasSelectOrTake extends Or<
            Extends<'skip', Keys<T>>,
            Extends<'take', Keys<T>>
         >,
         OrderByArg extends True extends HasSelectOrTake
            ? { orderBy: VerificationCodeGroupByArgs['orderBy'] }
            : { orderBy?: VerificationCodeGroupByArgs['orderBy'] },
         OrderFields extends ExcludeUnderscoreKeys<
            Keys<MaybeTupleToUnion<T['orderBy']>>
         >,
         ByFields extends TupleToUnion<T['by']>,
         ByValid extends Has<ByFields, OrderFields>,
         HavingFields extends GetHavingFields<T['having']>,
         HavingValid extends Has<ByFields, HavingFields>,
         ByEmpty extends T['by'] extends never[] ? True : False,
         InputErrors extends ByEmpty extends True
            ? `Error: "by" must not be empty.`
            : HavingValid extends False
            ? {
                 [P in HavingFields]: P extends ByFields
                    ? never
                    : P extends string
                    ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                    : [
                         Error,
                         'Field ',
                         P,
                         ` in "having" needs to be provided in "by"`,
                      ]
              }[HavingFields]
            : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
               ? ByValid extends True
                  ? {}
                  : {
                       [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
               : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
            ? 'orderBy' extends Keys<T>
               ? ByValid extends True
                  ? {}
                  : {
                       [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
               : 'Error: If you provide "skip", you also need to provide "orderBy"'
            : ByValid extends True
            ? {}
            : {
                 [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields],
      >(
         args: SubsetIntersection<T, VerificationCodeGroupByArgs, OrderByArg> &
            InputErrors,
      ): {} extends InputErrors
         ? GetVerificationCodeGroupByPayload<T>
         : Prisma.PrismaPromise<InputErrors>
   }

   /**
    * The delegate class that acts as a "Promise-like" for VerificationCode.
    * Why is this prefixed with `Prisma__`?
    * Because we want to prevent naming conflicts as mentioned in
    * https://github.com/prisma/prisma-client-js/issues/707
    */
   export class Prisma__VerificationCodeClient<T, Null = never>
      implements Prisma.PrismaPromise<T>
   {
      private readonly _dmmf
      private readonly _queryType
      private readonly _rootField
      private readonly _clientMethod
      private readonly _args
      private readonly _dataPath
      private readonly _errorFormat
      private readonly _measurePerformance?
      private _isList
      private _callsite
      private _requestPromise?;
      readonly [Symbol.toStringTag]: 'PrismaPromise'
      constructor(
         _dmmf: runtime.DMMFClass,
         _queryType: 'query' | 'mutation',
         _rootField: string,
         _clientMethod: string,
         _args: any,
         _dataPath: string[],
         _errorFormat: ErrorFormat,
         _measurePerformance?: boolean | undefined,
         _isList?: boolean,
      )

      private get _document()
      /**
       * Attaches callbacks for the resolution and/or rejection of the Promise.
       * @param onfulfilled The callback to execute when the Promise is resolved.
       * @param onrejected The callback to execute when the Promise is rejected.
       * @returns A Promise for the completion of which ever callback is executed.
       */
      then<TResult1 = T, TResult2 = never>(
         onfulfilled?:
            | ((value: T) => TResult1 | PromiseLike<TResult1>)
            | undefined
            | null,
         onrejected?:
            | ((reason: any) => TResult2 | PromiseLike<TResult2>)
            | undefined
            | null,
      ): Promise<TResult1 | TResult2>
      /**
       * Attaches a callback for only the rejection of the Promise.
       * @param onrejected The callback to execute when the Promise is rejected.
       * @returns A Promise for the completion of the callback.
       */
      catch<TResult = never>(
         onrejected?:
            | ((reason: any) => TResult | PromiseLike<TResult>)
            | undefined
            | null,
      ): Promise<T | TResult>
      /**
       * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
       * resolved value cannot be modified from the callback.
       * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
       * @returns A Promise for the completion of the callback.
       */
      finally(onfinally?: (() => void) | undefined | null): Promise<T>
   }

   // Custom InputTypes

   /**
    * VerificationCode base type for findUnique actions
    */
   export type VerificationCodeFindUniqueArgsBase = {
      /**
       * Select specific fields to fetch from the VerificationCode
       */
      select?: VerificationCodeSelect | null
      /**
       * Filter, which VerificationCode to fetch.
       */
      where: VerificationCodeWhereUniqueInput
   }

   /**
    * VerificationCode findUnique
    */
   export interface VerificationCodeFindUniqueArgs
      extends VerificationCodeFindUniqueArgsBase {
      /**
       * Throw an Error if query returns no results
       * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
       */
      rejectOnNotFound?: RejectOnNotFound
   }

   /**
    * VerificationCode findUniqueOrThrow
    */
   export type VerificationCodeFindUniqueOrThrowArgs = {
      /**
       * Select specific fields to fetch from the VerificationCode
       */
      select?: VerificationCodeSelect | null
      /**
       * Filter, which VerificationCode to fetch.
       */
      where: VerificationCodeWhereUniqueInput
   }

   /**
    * VerificationCode base type for findFirst actions
    */
   export type VerificationCodeFindFirstArgsBase = {
      /**
       * Select specific fields to fetch from the VerificationCode
       */
      select?: VerificationCodeSelect | null
      /**
       * Filter, which VerificationCode to fetch.
       */
      where?: VerificationCodeWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of VerificationCodes to fetch.
       */
      orderBy?: Enumerable<VerificationCodeOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for searching for VerificationCodes.
       */
      cursor?: VerificationCodeWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` VerificationCodes from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` VerificationCodes.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of VerificationCodes.
       */
      distinct?: Enumerable<VerificationCodeScalarFieldEnum>
   }

   /**
    * VerificationCode findFirst
    */
   export interface VerificationCodeFindFirstArgs
      extends VerificationCodeFindFirstArgsBase {
      /**
       * Throw an Error if query returns no results
       * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
       */
      rejectOnNotFound?: RejectOnNotFound
   }

   /**
    * VerificationCode findFirstOrThrow
    */
   export type VerificationCodeFindFirstOrThrowArgs = {
      /**
       * Select specific fields to fetch from the VerificationCode
       */
      select?: VerificationCodeSelect | null
      /**
       * Filter, which VerificationCode to fetch.
       */
      where?: VerificationCodeWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of VerificationCodes to fetch.
       */
      orderBy?: Enumerable<VerificationCodeOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for searching for VerificationCodes.
       */
      cursor?: VerificationCodeWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` VerificationCodes from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` VerificationCodes.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of VerificationCodes.
       */
      distinct?: Enumerable<VerificationCodeScalarFieldEnum>
   }

   /**
    * VerificationCode findMany
    */
   export type VerificationCodeFindManyArgs = {
      /**
       * Select specific fields to fetch from the VerificationCode
       */
      select?: VerificationCodeSelect | null
      /**
       * Filter, which VerificationCodes to fetch.
       */
      where?: VerificationCodeWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of VerificationCodes to fetch.
       */
      orderBy?: Enumerable<VerificationCodeOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing VerificationCodes.
       */
      cursor?: VerificationCodeWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` VerificationCodes from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` VerificationCodes.
       */
      skip?: number
      distinct?: Enumerable<VerificationCodeScalarFieldEnum>
   }

   /**
    * VerificationCode create
    */
   export type VerificationCodeCreateArgs = {
      /**
       * Select specific fields to fetch from the VerificationCode
       */
      select?: VerificationCodeSelect | null
      /**
       * The data needed to create a VerificationCode.
       */
      data: XOR<
         VerificationCodeCreateInput,
         VerificationCodeUncheckedCreateInput
      >
   }

   /**
    * VerificationCode createMany
    */
   export type VerificationCodeCreateManyArgs = {
      /**
       * The data used to create many VerificationCodes.
       */
      data: Enumerable<VerificationCodeCreateManyInput>
      skipDuplicates?: boolean
   }

   /**
    * VerificationCode update
    */
   export type VerificationCodeUpdateArgs = {
      /**
       * Select specific fields to fetch from the VerificationCode
       */
      select?: VerificationCodeSelect | null
      /**
       * The data needed to update a VerificationCode.
       */
      data: XOR<
         VerificationCodeUpdateInput,
         VerificationCodeUncheckedUpdateInput
      >
      /**
       * Choose, which VerificationCode to update.
       */
      where: VerificationCodeWhereUniqueInput
   }

   /**
    * VerificationCode updateMany
    */
   export type VerificationCodeUpdateManyArgs = {
      /**
       * The data used to update VerificationCodes.
       */
      data: XOR<
         VerificationCodeUpdateManyMutationInput,
         VerificationCodeUncheckedUpdateManyInput
      >
      /**
       * Filter which VerificationCodes to update
       */
      where?: VerificationCodeWhereInput
   }

   /**
    * VerificationCode upsert
    */
   export type VerificationCodeUpsertArgs = {
      /**
       * Select specific fields to fetch from the VerificationCode
       */
      select?: VerificationCodeSelect | null
      /**
       * The filter to search for the VerificationCode to update in case it exists.
       */
      where: VerificationCodeWhereUniqueInput
      /**
       * In case the VerificationCode found by the `where` argument doesn't exist, create a new VerificationCode with this data.
       */
      create: XOR<
         VerificationCodeCreateInput,
         VerificationCodeUncheckedCreateInput
      >
      /**
       * In case the VerificationCode was found with the provided `where` argument, update it with this data.
       */
      update: XOR<
         VerificationCodeUpdateInput,
         VerificationCodeUncheckedUpdateInput
      >
   }

   /**
    * VerificationCode delete
    */
   export type VerificationCodeDeleteArgs = {
      /**
       * Select specific fields to fetch from the VerificationCode
       */
      select?: VerificationCodeSelect | null
      /**
       * Filter which VerificationCode to delete.
       */
      where: VerificationCodeWhereUniqueInput
   }

   /**
    * VerificationCode deleteMany
    */
   export type VerificationCodeDeleteManyArgs = {
      /**
       * Filter which VerificationCodes to delete
       */
      where?: VerificationCodeWhereInput
   }

   /**
    * VerificationCode without action
    */
   export type VerificationCodeArgs = {
      /**
       * Select specific fields to fetch from the VerificationCode
       */
      select?: VerificationCodeSelect | null
   }

   /**
    * Model Article
    */

   export type AggregateArticle = {
      _count: ArticleCountAggregateOutputType | null
      _avg: ArticleAvgAggregateOutputType | null
      _sum: ArticleSumAggregateOutputType | null
      _min: ArticleMinAggregateOutputType | null
      _max: ArticleMaxAggregateOutputType | null
   }

   export type ArticleAvgAggregateOutputType = {
      id: number | null
      userId: number | null
   }

   export type ArticleSumAggregateOutputType = {
      id: number | null
      userId: number | null
   }

   export type ArticleMinAggregateOutputType = {
      id: number | null
      name: string | null
      createdAt: Date | null
      updatedAt: Date | null
      userId: number | null
   }

   export type ArticleMaxAggregateOutputType = {
      id: number | null
      name: string | null
      createdAt: Date | null
      updatedAt: Date | null
      userId: number | null
   }

   export type ArticleCountAggregateOutputType = {
      id: number
      name: number
      createdAt: number
      updatedAt: number
      userId: number
      _all: number
   }

   export type ArticleAvgAggregateInputType = {
      id?: true
      userId?: true
   }

   export type ArticleSumAggregateInputType = {
      id?: true
      userId?: true
   }

   export type ArticleMinAggregateInputType = {
      id?: true
      name?: true
      createdAt?: true
      updatedAt?: true
      userId?: true
   }

   export type ArticleMaxAggregateInputType = {
      id?: true
      name?: true
      createdAt?: true
      updatedAt?: true
      userId?: true
   }

   export type ArticleCountAggregateInputType = {
      id?: true
      name?: true
      createdAt?: true
      updatedAt?: true
      userId?: true
      _all?: true
   }

   export type ArticleAggregateArgs = {
      /**
       * Filter which Article to aggregate.
       */
      where?: ArticleWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Articles to fetch.
       */
      orderBy?: Enumerable<ArticleOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the start position
       */
      cursor?: ArticleWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Articles from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Articles.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Count returned Articles
       **/
      _count?: true | ArticleCountAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to average
       **/
      _avg?: ArticleAvgAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to sum
       **/
      _sum?: ArticleSumAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the minimum value
       **/
      _min?: ArticleMinAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the maximum value
       **/
      _max?: ArticleMaxAggregateInputType
   }

   export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
      [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
         ? T[P] extends true
            ? number
            : GetScalarType<T[P], AggregateArticle[P]>
         : GetScalarType<T[P], AggregateArticle[P]>
   }

   export type ArticleGroupByArgs = {
      where?: ArticleWhereInput
      orderBy?: Enumerable<ArticleOrderByWithAggregationInput>
      by: ArticleScalarFieldEnum[]
      having?: ArticleScalarWhereWithAggregatesInput
      take?: number
      skip?: number
      _count?: ArticleCountAggregateInputType | true
      _avg?: ArticleAvgAggregateInputType
      _sum?: ArticleSumAggregateInputType
      _min?: ArticleMinAggregateInputType
      _max?: ArticleMaxAggregateInputType
   }

   export type ArticleGroupByOutputType = {
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
      userId: number
      _count: ArticleCountAggregateOutputType | null
      _avg: ArticleAvgAggregateOutputType | null
      _sum: ArticleSumAggregateOutputType | null
      _min: ArticleMinAggregateOutputType | null
      _max: ArticleMaxAggregateOutputType | null
   }

   type GetArticleGroupByPayload<T extends ArticleGroupByArgs> =
      Prisma.PrismaPromise<
         Array<
            PickArray<ArticleGroupByOutputType, T['by']> & {
               [P in keyof T &
                  keyof ArticleGroupByOutputType]: P extends '_count'
                  ? T[P] extends boolean
                     ? number
                     : GetScalarType<T[P], ArticleGroupByOutputType[P]>
                  : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            }
         >
      >

   export type ArticleSelect = {
      id?: boolean
      name?: boolean
      createdAt?: boolean
      updatedAt?: boolean
      userId?: boolean
      user?: boolean | UserArgs
      chapter?: boolean | Article$chapterArgs
      _count?: boolean | ArticleCountOutputTypeArgs
   }

   export type ArticleInclude = {
      user?: boolean | UserArgs
      chapter?: boolean | Article$chapterArgs
      _count?: boolean | ArticleCountOutputTypeArgs
   }

   export type ArticleGetPayload<
      S extends boolean | null | undefined | ArticleArgs,
   > = S extends { select: any; include: any }
      ? 'Please either choose `select` or `include`'
      : S extends true
      ? Article
      : S extends undefined
      ? never
      : S extends { include: any } & (ArticleArgs | ArticleFindManyArgs)
      ? Article & {
           [P in TruthyKeys<S['include']>]: P extends 'user'
              ? UserGetPayload<S['include'][P]>
              : P extends 'chapter'
              ? Array<ChapterGetPayload<S['include'][P]>>
              : P extends '_count'
              ? ArticleCountOutputTypeGetPayload<S['include'][P]>
              : never
        }
      : S extends { select: any } & (ArticleArgs | ArticleFindManyArgs)
      ? {
           [P in TruthyKeys<S['select']>]: P extends 'user'
              ? UserGetPayload<S['select'][P]>
              : P extends 'chapter'
              ? Array<ChapterGetPayload<S['select'][P]>>
              : P extends '_count'
              ? ArticleCountOutputTypeGetPayload<S['select'][P]>
              : P extends keyof Article
              ? Article[P]
              : never
        }
      : Article

   type ArticleCountArgs = Omit<ArticleFindManyArgs, 'select' | 'include'> & {
      select?: ArticleCountAggregateInputType | true
   }

   export interface ArticleDelegate<
      GlobalRejectSettings extends
         | Prisma.RejectOnNotFound
         | Prisma.RejectPerOperation
         | false
         | undefined,
   > {
      /**
       * Find zero or one Article that matches the filter.
       * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
       * @example
       * // Get one Article
       * const article = await prisma.article.findUnique({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findUnique<
         T extends ArticleFindUniqueArgs,
         LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
            ? T['rejectOnNotFound']
            : undefined,
      >(
         args: SelectSubset<T, ArticleFindUniqueArgs>,
      ): HasReject<
         GlobalRejectSettings,
         LocalRejectSettings,
         'findUnique',
         'Article'
      > extends True
         ? Prisma__ArticleClient<ArticleGetPayload<T>>
         : Prisma__ArticleClient<ArticleGetPayload<T> | null, null>

      /**
       * Find one Article that matches the filter or throw an error  with `error.code='P2025'`
       *     if no matches were found.
       * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
       * @example
       * // Get one Article
       * const article = await prisma.article.findUniqueOrThrow({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(
         args?: SelectSubset<T, ArticleFindUniqueOrThrowArgs>,
      ): Prisma__ArticleClient<ArticleGetPayload<T>>

      /**
       * Find the first Article that matches the filter.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ArticleFindFirstArgs} args - Arguments to find a Article
       * @example
       * // Get one Article
       * const article = await prisma.article.findFirst({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findFirst<
         T extends ArticleFindFirstArgs,
         LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
            ? T['rejectOnNotFound']
            : undefined,
      >(
         args?: SelectSubset<T, ArticleFindFirstArgs>,
      ): HasReject<
         GlobalRejectSettings,
         LocalRejectSettings,
         'findFirst',
         'Article'
      > extends True
         ? Prisma__ArticleClient<ArticleGetPayload<T>>
         : Prisma__ArticleClient<ArticleGetPayload<T> | null, null>

      /**
       * Find the first Article that matches the filter or
       * throw `NotFoundError` if no matches were found.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
       * @example
       * // Get one Article
       * const article = await prisma.article.findFirstOrThrow({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(
         args?: SelectSubset<T, ArticleFindFirstOrThrowArgs>,
      ): Prisma__ArticleClient<ArticleGetPayload<T>>

      /**
       * Find zero or more Articles that matches the filter.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ArticleFindManyArgs=} args - Arguments to filter and select certain fields only.
       * @example
       * // Get all Articles
       * const articles = await prisma.article.findMany()
       *
       * // Get first 10 Articles
       * const articles = await prisma.article.findMany({ take: 10 })
       *
       * // Only select the `id`
       * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
       *
       **/
      findMany<T extends ArticleFindManyArgs>(
         args?: SelectSubset<T, ArticleFindManyArgs>,
      ): Prisma.PrismaPromise<Array<ArticleGetPayload<T>>>

      /**
       * Create a Article.
       * @param {ArticleCreateArgs} args - Arguments to create a Article.
       * @example
       * // Create one Article
       * const Article = await prisma.article.create({
       *   data: {
       *     // ... data to create a Article
       *   }
       * })
       *
       **/
      create<T extends ArticleCreateArgs>(
         args: SelectSubset<T, ArticleCreateArgs>,
      ): Prisma__ArticleClient<ArticleGetPayload<T>>

      /**
       * Create many Articles.
       *     @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
       *     @example
       *     // Create many Articles
       *     const article = await prisma.article.createMany({
       *       data: {
       *         // ... provide data here
       *       }
       *     })
       *
       **/
      createMany<T extends ArticleCreateManyArgs>(
         args?: SelectSubset<T, ArticleCreateManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Delete a Article.
       * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
       * @example
       * // Delete one Article
       * const Article = await prisma.article.delete({
       *   where: {
       *     // ... filter to delete one Article
       *   }
       * })
       *
       **/
      delete<T extends ArticleDeleteArgs>(
         args: SelectSubset<T, ArticleDeleteArgs>,
      ): Prisma__ArticleClient<ArticleGetPayload<T>>

      /**
       * Update one Article.
       * @param {ArticleUpdateArgs} args - Arguments to update one Article.
       * @example
       * // Update one Article
       * const article = await prisma.article.update({
       *   where: {
       *     // ... provide filter here
       *   },
       *   data: {
       *     // ... provide data here
       *   }
       * })
       *
       **/
      update<T extends ArticleUpdateArgs>(
         args: SelectSubset<T, ArticleUpdateArgs>,
      ): Prisma__ArticleClient<ArticleGetPayload<T>>

      /**
       * Delete zero or more Articles.
       * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
       * @example
       * // Delete a few Articles
       * const { count } = await prisma.article.deleteMany({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       *
       **/
      deleteMany<T extends ArticleDeleteManyArgs>(
         args?: SelectSubset<T, ArticleDeleteManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Update zero or more Articles.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
       * @example
       * // Update many Articles
       * const article = await prisma.article.updateMany({
       *   where: {
       *     // ... provide filter here
       *   },
       *   data: {
       *     // ... provide data here
       *   }
       * })
       *
       **/
      updateMany<T extends ArticleUpdateManyArgs>(
         args: SelectSubset<T, ArticleUpdateManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Create or update one Article.
       * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
       * @example
       * // Update or create a Article
       * const article = await prisma.article.upsert({
       *   create: {
       *     // ... data to create a Article
       *   },
       *   update: {
       *     // ... in case it already exists, update
       *   },
       *   where: {
       *     // ... the filter for the Article we want to update
       *   }
       * })
       **/
      upsert<T extends ArticleUpsertArgs>(
         args: SelectSubset<T, ArticleUpsertArgs>,
      ): Prisma__ArticleClient<ArticleGetPayload<T>>

      /**
       * Count the number of Articles.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
       * @example
       * // Count the number of Articles
       * const count = await prisma.article.count({
       *   where: {
       *     // ... the filter for the Articles we want to count
       *   }
       * })
       **/
      count<T extends ArticleCountArgs>(
         args?: Subset<T, ArticleCountArgs>,
      ): Prisma.PrismaPromise<
         T extends _Record<'select', any>
            ? T['select'] extends true
               ? number
               : GetScalarType<T['select'], ArticleCountAggregateOutputType>
            : number
      >

      /**
       * Allows you to perform aggregations operations on a Article.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
       * @example
       * // Ordered by age ascending
       * // Where email contains prisma.io
       * // Limited to the 10 users
       * const aggregations = await prisma.user.aggregate({
       *   _avg: {
       *     age: true,
       *   },
       *   where: {
       *     email: {
       *       contains: "prisma.io",
       *     },
       *   },
       *   orderBy: {
       *     age: "asc",
       *   },
       *   take: 10,
       * })
       **/
      aggregate<T extends ArticleAggregateArgs>(
         args: Subset<T, ArticleAggregateArgs>,
      ): Prisma.PrismaPromise<GetArticleAggregateType<T>>

      /**
       * Group by Article.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ArticleGroupByArgs} args - Group by arguments.
       * @example
       * // Group by city, order by createdAt, get count
       * const result = await prisma.user.groupBy({
       *   by: ['city', 'createdAt'],
       *   orderBy: {
       *     createdAt: true
       *   },
       *   _count: {
       *     _all: true
       *   },
       * })
       *
       **/
      groupBy<
         T extends ArticleGroupByArgs,
         HasSelectOrTake extends Or<
            Extends<'skip', Keys<T>>,
            Extends<'take', Keys<T>>
         >,
         OrderByArg extends True extends HasSelectOrTake
            ? { orderBy: ArticleGroupByArgs['orderBy'] }
            : { orderBy?: ArticleGroupByArgs['orderBy'] },
         OrderFields extends ExcludeUnderscoreKeys<
            Keys<MaybeTupleToUnion<T['orderBy']>>
         >,
         ByFields extends TupleToUnion<T['by']>,
         ByValid extends Has<ByFields, OrderFields>,
         HavingFields extends GetHavingFields<T['having']>,
         HavingValid extends Has<ByFields, HavingFields>,
         ByEmpty extends T['by'] extends never[] ? True : False,
         InputErrors extends ByEmpty extends True
            ? `Error: "by" must not be empty.`
            : HavingValid extends False
            ? {
                 [P in HavingFields]: P extends ByFields
                    ? never
                    : P extends string
                    ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                    : [
                         Error,
                         'Field ',
                         P,
                         ` in "having" needs to be provided in "by"`,
                      ]
              }[HavingFields]
            : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
               ? ByValid extends True
                  ? {}
                  : {
                       [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
               : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
            ? 'orderBy' extends Keys<T>
               ? ByValid extends True
                  ? {}
                  : {
                       [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
               : 'Error: If you provide "skip", you also need to provide "orderBy"'
            : ByValid extends True
            ? {}
            : {
                 [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields],
      >(
         args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> &
            InputErrors,
      ): {} extends InputErrors
         ? GetArticleGroupByPayload<T>
         : Prisma.PrismaPromise<InputErrors>
   }

   /**
    * The delegate class that acts as a "Promise-like" for Article.
    * Why is this prefixed with `Prisma__`?
    * Because we want to prevent naming conflicts as mentioned in
    * https://github.com/prisma/prisma-client-js/issues/707
    */
   export class Prisma__ArticleClient<T, Null = never>
      implements Prisma.PrismaPromise<T>
   {
      private readonly _dmmf
      private readonly _queryType
      private readonly _rootField
      private readonly _clientMethod
      private readonly _args
      private readonly _dataPath
      private readonly _errorFormat
      private readonly _measurePerformance?
      private _isList
      private _callsite
      private _requestPromise?;
      readonly [Symbol.toStringTag]: 'PrismaPromise'
      constructor(
         _dmmf: runtime.DMMFClass,
         _queryType: 'query' | 'mutation',
         _rootField: string,
         _clientMethod: string,
         _args: any,
         _dataPath: string[],
         _errorFormat: ErrorFormat,
         _measurePerformance?: boolean | undefined,
         _isList?: boolean,
      )

      user<T extends UserArgs = {}>(
         args?: Subset<T, UserArgs>,
      ): Prisma__UserClient<UserGetPayload<T> | Null>

      chapter<T extends Article$chapterArgs = {}>(
         args?: Subset<T, Article$chapterArgs>,
      ): Prisma.PrismaPromise<Array<ChapterGetPayload<T>> | Null>

      private get _document()
      /**
       * Attaches callbacks for the resolution and/or rejection of the Promise.
       * @param onfulfilled The callback to execute when the Promise is resolved.
       * @param onrejected The callback to execute when the Promise is rejected.
       * @returns A Promise for the completion of which ever callback is executed.
       */
      then<TResult1 = T, TResult2 = never>(
         onfulfilled?:
            | ((value: T) => TResult1 | PromiseLike<TResult1>)
            | undefined
            | null,
         onrejected?:
            | ((reason: any) => TResult2 | PromiseLike<TResult2>)
            | undefined
            | null,
      ): Promise<TResult1 | TResult2>
      /**
       * Attaches a callback for only the rejection of the Promise.
       * @param onrejected The callback to execute when the Promise is rejected.
       * @returns A Promise for the completion of the callback.
       */
      catch<TResult = never>(
         onrejected?:
            | ((reason: any) => TResult | PromiseLike<TResult>)
            | undefined
            | null,
      ): Promise<T | TResult>
      /**
       * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
       * resolved value cannot be modified from the callback.
       * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
       * @returns A Promise for the completion of the callback.
       */
      finally(onfinally?: (() => void) | undefined | null): Promise<T>
   }

   // Custom InputTypes

   /**
    * Article base type for findUnique actions
    */
   export type ArticleFindUniqueArgsBase = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
      /**
       * Filter, which Article to fetch.
       */
      where: ArticleWhereUniqueInput
   }

   /**
    * Article findUnique
    */
   export interface ArticleFindUniqueArgs extends ArticleFindUniqueArgsBase {
      /**
       * Throw an Error if query returns no results
       * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
       */
      rejectOnNotFound?: RejectOnNotFound
   }

   /**
    * Article findUniqueOrThrow
    */
   export type ArticleFindUniqueOrThrowArgs = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
      /**
       * Filter, which Article to fetch.
       */
      where: ArticleWhereUniqueInput
   }

   /**
    * Article base type for findFirst actions
    */
   export type ArticleFindFirstArgsBase = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
      /**
       * Filter, which Article to fetch.
       */
      where?: ArticleWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Articles to fetch.
       */
      orderBy?: Enumerable<ArticleOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for searching for Articles.
       */
      cursor?: ArticleWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Articles from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Articles.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of Articles.
       */
      distinct?: Enumerable<ArticleScalarFieldEnum>
   }

   /**
    * Article findFirst
    */
   export interface ArticleFindFirstArgs extends ArticleFindFirstArgsBase {
      /**
       * Throw an Error if query returns no results
       * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
       */
      rejectOnNotFound?: RejectOnNotFound
   }

   /**
    * Article findFirstOrThrow
    */
   export type ArticleFindFirstOrThrowArgs = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
      /**
       * Filter, which Article to fetch.
       */
      where?: ArticleWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Articles to fetch.
       */
      orderBy?: Enumerable<ArticleOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for searching for Articles.
       */
      cursor?: ArticleWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Articles from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Articles.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of Articles.
       */
      distinct?: Enumerable<ArticleScalarFieldEnum>
   }

   /**
    * Article findMany
    */
   export type ArticleFindManyArgs = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
      /**
       * Filter, which Articles to fetch.
       */
      where?: ArticleWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Articles to fetch.
       */
      orderBy?: Enumerable<ArticleOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Articles.
       */
      cursor?: ArticleWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Articles from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Articles.
       */
      skip?: number
      distinct?: Enumerable<ArticleScalarFieldEnum>
   }

   /**
    * Article create
    */
   export type ArticleCreateArgs = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
      /**
       * The data needed to create a Article.
       */
      data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
   }

   /**
    * Article createMany
    */
   export type ArticleCreateManyArgs = {
      /**
       * The data used to create many Articles.
       */
      data: Enumerable<ArticleCreateManyInput>
      skipDuplicates?: boolean
   }

   /**
    * Article update
    */
   export type ArticleUpdateArgs = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
      /**
       * The data needed to update a Article.
       */
      data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
      /**
       * Choose, which Article to update.
       */
      where: ArticleWhereUniqueInput
   }

   /**
    * Article updateMany
    */
   export type ArticleUpdateManyArgs = {
      /**
       * The data used to update Articles.
       */
      data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
      /**
       * Filter which Articles to update
       */
      where?: ArticleWhereInput
   }

   /**
    * Article upsert
    */
   export type ArticleUpsertArgs = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
      /**
       * The filter to search for the Article to update in case it exists.
       */
      where: ArticleWhereUniqueInput
      /**
       * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
       */
      create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
      /**
       * In case the Article was found with the provided `where` argument, update it with this data.
       */
      update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
   }

   /**
    * Article delete
    */
   export type ArticleDeleteArgs = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
      /**
       * Filter which Article to delete.
       */
      where: ArticleWhereUniqueInput
   }

   /**
    * Article deleteMany
    */
   export type ArticleDeleteManyArgs = {
      /**
       * Filter which Articles to delete
       */
      where?: ArticleWhereInput
   }

   /**
    * Article.chapter
    */
   export type Article$chapterArgs = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
      where?: ChapterWhereInput
      orderBy?: Enumerable<ChapterOrderByWithRelationInput>
      cursor?: ChapterWhereUniqueInput
      take?: number
      skip?: number
      distinct?: Enumerable<ChapterScalarFieldEnum>
   }

   /**
    * Article without action
    */
   export type ArticleArgs = {
      /**
       * Select specific fields to fetch from the Article
       */
      select?: ArticleSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ArticleInclude | null
   }

   /**
    * Model Chapter
    */

   export type AggregateChapter = {
      _count: ChapterCountAggregateOutputType | null
      _avg: ChapterAvgAggregateOutputType | null
      _sum: ChapterSumAggregateOutputType | null
      _min: ChapterMinAggregateOutputType | null
      _max: ChapterMaxAggregateOutputType | null
   }

   export type ChapterAvgAggregateOutputType = {
      id: number | null
      articleId: number | null
   }

   export type ChapterSumAggregateOutputType = {
      id: number | null
      articleId: number | null
   }

   export type ChapterMinAggregateOutputType = {
      id: number | null
      name: string | null
      createdAt: Date | null
      updatedAt: Date | null
      articleId: number | null
   }

   export type ChapterMaxAggregateOutputType = {
      id: number | null
      name: string | null
      createdAt: Date | null
      updatedAt: Date | null
      articleId: number | null
   }

   export type ChapterCountAggregateOutputType = {
      id: number
      name: number
      createdAt: number
      updatedAt: number
      articleId: number
      _all: number
   }

   export type ChapterAvgAggregateInputType = {
      id?: true
      articleId?: true
   }

   export type ChapterSumAggregateInputType = {
      id?: true
      articleId?: true
   }

   export type ChapterMinAggregateInputType = {
      id?: true
      name?: true
      createdAt?: true
      updatedAt?: true
      articleId?: true
   }

   export type ChapterMaxAggregateInputType = {
      id?: true
      name?: true
      createdAt?: true
      updatedAt?: true
      articleId?: true
   }

   export type ChapterCountAggregateInputType = {
      id?: true
      name?: true
      createdAt?: true
      updatedAt?: true
      articleId?: true
      _all?: true
   }

   export type ChapterAggregateArgs = {
      /**
       * Filter which Chapter to aggregate.
       */
      where?: ChapterWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Chapters to fetch.
       */
      orderBy?: Enumerable<ChapterOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the start position
       */
      cursor?: ChapterWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Chapters from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Chapters.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Count returned Chapters
       **/
      _count?: true | ChapterCountAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to average
       **/
      _avg?: ChapterAvgAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to sum
       **/
      _sum?: ChapterSumAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the minimum value
       **/
      _min?: ChapterMinAggregateInputType
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the maximum value
       **/
      _max?: ChapterMaxAggregateInputType
   }

   export type GetChapterAggregateType<T extends ChapterAggregateArgs> = {
      [P in keyof T & keyof AggregateChapter]: P extends '_count' | 'count'
         ? T[P] extends true
            ? number
            : GetScalarType<T[P], AggregateChapter[P]>
         : GetScalarType<T[P], AggregateChapter[P]>
   }

   export type ChapterGroupByArgs = {
      where?: ChapterWhereInput
      orderBy?: Enumerable<ChapterOrderByWithAggregationInput>
      by: ChapterScalarFieldEnum[]
      having?: ChapterScalarWhereWithAggregatesInput
      take?: number
      skip?: number
      _count?: ChapterCountAggregateInputType | true
      _avg?: ChapterAvgAggregateInputType
      _sum?: ChapterSumAggregateInputType
      _min?: ChapterMinAggregateInputType
      _max?: ChapterMaxAggregateInputType
   }

   export type ChapterGroupByOutputType = {
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
      articleId: number
      _count: ChapterCountAggregateOutputType | null
      _avg: ChapterAvgAggregateOutputType | null
      _sum: ChapterSumAggregateOutputType | null
      _min: ChapterMinAggregateOutputType | null
      _max: ChapterMaxAggregateOutputType | null
   }

   type GetChapterGroupByPayload<T extends ChapterGroupByArgs> =
      Prisma.PrismaPromise<
         Array<
            PickArray<ChapterGroupByOutputType, T['by']> & {
               [P in keyof T &
                  keyof ChapterGroupByOutputType]: P extends '_count'
                  ? T[P] extends boolean
                     ? number
                     : GetScalarType<T[P], ChapterGroupByOutputType[P]>
                  : GetScalarType<T[P], ChapterGroupByOutputType[P]>
            }
         >
      >

   export type ChapterSelect = {
      id?: boolean
      name?: boolean
      createdAt?: boolean
      updatedAt?: boolean
      articleId?: boolean
      article?: boolean | ArticleArgs
   }

   export type ChapterInclude = {
      article?: boolean | ArticleArgs
   }

   export type ChapterGetPayload<
      S extends boolean | null | undefined | ChapterArgs,
   > = S extends { select: any; include: any }
      ? 'Please either choose `select` or `include`'
      : S extends true
      ? Chapter
      : S extends undefined
      ? never
      : S extends { include: any } & (ChapterArgs | ChapterFindManyArgs)
      ? Chapter & {
           [P in TruthyKeys<S['include']>]: P extends 'article'
              ? ArticleGetPayload<S['include'][P]>
              : never
        }
      : S extends { select: any } & (ChapterArgs | ChapterFindManyArgs)
      ? {
           [P in TruthyKeys<S['select']>]: P extends 'article'
              ? ArticleGetPayload<S['select'][P]>
              : P extends keyof Chapter
              ? Chapter[P]
              : never
        }
      : Chapter

   type ChapterCountArgs = Omit<ChapterFindManyArgs, 'select' | 'include'> & {
      select?: ChapterCountAggregateInputType | true
   }

   export interface ChapterDelegate<
      GlobalRejectSettings extends
         | Prisma.RejectOnNotFound
         | Prisma.RejectPerOperation
         | false
         | undefined,
   > {
      /**
       * Find zero or one Chapter that matches the filter.
       * @param {ChapterFindUniqueArgs} args - Arguments to find a Chapter
       * @example
       * // Get one Chapter
       * const chapter = await prisma.chapter.findUnique({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findUnique<
         T extends ChapterFindUniqueArgs,
         LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
            ? T['rejectOnNotFound']
            : undefined,
      >(
         args: SelectSubset<T, ChapterFindUniqueArgs>,
      ): HasReject<
         GlobalRejectSettings,
         LocalRejectSettings,
         'findUnique',
         'Chapter'
      > extends True
         ? Prisma__ChapterClient<ChapterGetPayload<T>>
         : Prisma__ChapterClient<ChapterGetPayload<T> | null, null>

      /**
       * Find one Chapter that matches the filter or throw an error  with `error.code='P2025'`
       *     if no matches were found.
       * @param {ChapterFindUniqueOrThrowArgs} args - Arguments to find a Chapter
       * @example
       * // Get one Chapter
       * const chapter = await prisma.chapter.findUniqueOrThrow({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findUniqueOrThrow<T extends ChapterFindUniqueOrThrowArgs>(
         args?: SelectSubset<T, ChapterFindUniqueOrThrowArgs>,
      ): Prisma__ChapterClient<ChapterGetPayload<T>>

      /**
       * Find the first Chapter that matches the filter.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ChapterFindFirstArgs} args - Arguments to find a Chapter
       * @example
       * // Get one Chapter
       * const chapter = await prisma.chapter.findFirst({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findFirst<
         T extends ChapterFindFirstArgs,
         LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
            ? T['rejectOnNotFound']
            : undefined,
      >(
         args?: SelectSubset<T, ChapterFindFirstArgs>,
      ): HasReject<
         GlobalRejectSettings,
         LocalRejectSettings,
         'findFirst',
         'Chapter'
      > extends True
         ? Prisma__ChapterClient<ChapterGetPayload<T>>
         : Prisma__ChapterClient<ChapterGetPayload<T> | null, null>

      /**
       * Find the first Chapter that matches the filter or
       * throw `NotFoundError` if no matches were found.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ChapterFindFirstOrThrowArgs} args - Arguments to find a Chapter
       * @example
       * // Get one Chapter
       * const chapter = await prisma.chapter.findFirstOrThrow({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       **/
      findFirstOrThrow<T extends ChapterFindFirstOrThrowArgs>(
         args?: SelectSubset<T, ChapterFindFirstOrThrowArgs>,
      ): Prisma__ChapterClient<ChapterGetPayload<T>>

      /**
       * Find zero or more Chapters that matches the filter.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ChapterFindManyArgs=} args - Arguments to filter and select certain fields only.
       * @example
       * // Get all Chapters
       * const chapters = await prisma.chapter.findMany()
       *
       * // Get first 10 Chapters
       * const chapters = await prisma.chapter.findMany({ take: 10 })
       *
       * // Only select the `id`
       * const chapterWithIdOnly = await prisma.chapter.findMany({ select: { id: true } })
       *
       **/
      findMany<T extends ChapterFindManyArgs>(
         args?: SelectSubset<T, ChapterFindManyArgs>,
      ): Prisma.PrismaPromise<Array<ChapterGetPayload<T>>>

      /**
       * Create a Chapter.
       * @param {ChapterCreateArgs} args - Arguments to create a Chapter.
       * @example
       * // Create one Chapter
       * const Chapter = await prisma.chapter.create({
       *   data: {
       *     // ... data to create a Chapter
       *   }
       * })
       *
       **/
      create<T extends ChapterCreateArgs>(
         args: SelectSubset<T, ChapterCreateArgs>,
      ): Prisma__ChapterClient<ChapterGetPayload<T>>

      /**
       * Create many Chapters.
       *     @param {ChapterCreateManyArgs} args - Arguments to create many Chapters.
       *     @example
       *     // Create many Chapters
       *     const chapter = await prisma.chapter.createMany({
       *       data: {
       *         // ... provide data here
       *       }
       *     })
       *
       **/
      createMany<T extends ChapterCreateManyArgs>(
         args?: SelectSubset<T, ChapterCreateManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Delete a Chapter.
       * @param {ChapterDeleteArgs} args - Arguments to delete one Chapter.
       * @example
       * // Delete one Chapter
       * const Chapter = await prisma.chapter.delete({
       *   where: {
       *     // ... filter to delete one Chapter
       *   }
       * })
       *
       **/
      delete<T extends ChapterDeleteArgs>(
         args: SelectSubset<T, ChapterDeleteArgs>,
      ): Prisma__ChapterClient<ChapterGetPayload<T>>

      /**
       * Update one Chapter.
       * @param {ChapterUpdateArgs} args - Arguments to update one Chapter.
       * @example
       * // Update one Chapter
       * const chapter = await prisma.chapter.update({
       *   where: {
       *     // ... provide filter here
       *   },
       *   data: {
       *     // ... provide data here
       *   }
       * })
       *
       **/
      update<T extends ChapterUpdateArgs>(
         args: SelectSubset<T, ChapterUpdateArgs>,
      ): Prisma__ChapterClient<ChapterGetPayload<T>>

      /**
       * Delete zero or more Chapters.
       * @param {ChapterDeleteManyArgs} args - Arguments to filter Chapters to delete.
       * @example
       * // Delete a few Chapters
       * const { count } = await prisma.chapter.deleteMany({
       *   where: {
       *     // ... provide filter here
       *   }
       * })
       *
       **/
      deleteMany<T extends ChapterDeleteManyArgs>(
         args?: SelectSubset<T, ChapterDeleteManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Update zero or more Chapters.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ChapterUpdateManyArgs} args - Arguments to update one or more rows.
       * @example
       * // Update many Chapters
       * const chapter = await prisma.chapter.updateMany({
       *   where: {
       *     // ... provide filter here
       *   },
       *   data: {
       *     // ... provide data here
       *   }
       * })
       *
       **/
      updateMany<T extends ChapterUpdateManyArgs>(
         args: SelectSubset<T, ChapterUpdateManyArgs>,
      ): Prisma.PrismaPromise<BatchPayload>

      /**
       * Create or update one Chapter.
       * @param {ChapterUpsertArgs} args - Arguments to update or create a Chapter.
       * @example
       * // Update or create a Chapter
       * const chapter = await prisma.chapter.upsert({
       *   create: {
       *     // ... data to create a Chapter
       *   },
       *   update: {
       *     // ... in case it already exists, update
       *   },
       *   where: {
       *     // ... the filter for the Chapter we want to update
       *   }
       * })
       **/
      upsert<T extends ChapterUpsertArgs>(
         args: SelectSubset<T, ChapterUpsertArgs>,
      ): Prisma__ChapterClient<ChapterGetPayload<T>>

      /**
       * Count the number of Chapters.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ChapterCountArgs} args - Arguments to filter Chapters to count.
       * @example
       * // Count the number of Chapters
       * const count = await prisma.chapter.count({
       *   where: {
       *     // ... the filter for the Chapters we want to count
       *   }
       * })
       **/
      count<T extends ChapterCountArgs>(
         args?: Subset<T, ChapterCountArgs>,
      ): Prisma.PrismaPromise<
         T extends _Record<'select', any>
            ? T['select'] extends true
               ? number
               : GetScalarType<T['select'], ChapterCountAggregateOutputType>
            : number
      >

      /**
       * Allows you to perform aggregations operations on a Chapter.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ChapterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
       * @example
       * // Ordered by age ascending
       * // Where email contains prisma.io
       * // Limited to the 10 users
       * const aggregations = await prisma.user.aggregate({
       *   _avg: {
       *     age: true,
       *   },
       *   where: {
       *     email: {
       *       contains: "prisma.io",
       *     },
       *   },
       *   orderBy: {
       *     age: "asc",
       *   },
       *   take: 10,
       * })
       **/
      aggregate<T extends ChapterAggregateArgs>(
         args: Subset<T, ChapterAggregateArgs>,
      ): Prisma.PrismaPromise<GetChapterAggregateType<T>>

      /**
       * Group by Chapter.
       * Note, that providing `undefined` is treated as the value not being there.
       * Read more here: https://pris.ly/d/null-undefined
       * @param {ChapterGroupByArgs} args - Group by arguments.
       * @example
       * // Group by city, order by createdAt, get count
       * const result = await prisma.user.groupBy({
       *   by: ['city', 'createdAt'],
       *   orderBy: {
       *     createdAt: true
       *   },
       *   _count: {
       *     _all: true
       *   },
       * })
       *
       **/
      groupBy<
         T extends ChapterGroupByArgs,
         HasSelectOrTake extends Or<
            Extends<'skip', Keys<T>>,
            Extends<'take', Keys<T>>
         >,
         OrderByArg extends True extends HasSelectOrTake
            ? { orderBy: ChapterGroupByArgs['orderBy'] }
            : { orderBy?: ChapterGroupByArgs['orderBy'] },
         OrderFields extends ExcludeUnderscoreKeys<
            Keys<MaybeTupleToUnion<T['orderBy']>>
         >,
         ByFields extends TupleToUnion<T['by']>,
         ByValid extends Has<ByFields, OrderFields>,
         HavingFields extends GetHavingFields<T['having']>,
         HavingValid extends Has<ByFields, HavingFields>,
         ByEmpty extends T['by'] extends never[] ? True : False,
         InputErrors extends ByEmpty extends True
            ? `Error: "by" must not be empty.`
            : HavingValid extends False
            ? {
                 [P in HavingFields]: P extends ByFields
                    ? never
                    : P extends string
                    ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                    : [
                         Error,
                         'Field ',
                         P,
                         ` in "having" needs to be provided in "by"`,
                      ]
              }[HavingFields]
            : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
               ? ByValid extends True
                  ? {}
                  : {
                       [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
               : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
            ? 'orderBy' extends Keys<T>
               ? ByValid extends True
                  ? {}
                  : {
                       [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
               : 'Error: If you provide "skip", you also need to provide "orderBy"'
            : ByValid extends True
            ? {}
            : {
                 [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields],
      >(
         args: SubsetIntersection<T, ChapterGroupByArgs, OrderByArg> &
            InputErrors,
      ): {} extends InputErrors
         ? GetChapterGroupByPayload<T>
         : Prisma.PrismaPromise<InputErrors>
   }

   /**
    * The delegate class that acts as a "Promise-like" for Chapter.
    * Why is this prefixed with `Prisma__`?
    * Because we want to prevent naming conflicts as mentioned in
    * https://github.com/prisma/prisma-client-js/issues/707
    */
   export class Prisma__ChapterClient<T, Null = never>
      implements Prisma.PrismaPromise<T>
   {
      private readonly _dmmf
      private readonly _queryType
      private readonly _rootField
      private readonly _clientMethod
      private readonly _args
      private readonly _dataPath
      private readonly _errorFormat
      private readonly _measurePerformance?
      private _isList
      private _callsite
      private _requestPromise?;
      readonly [Symbol.toStringTag]: 'PrismaPromise'
      constructor(
         _dmmf: runtime.DMMFClass,
         _queryType: 'query' | 'mutation',
         _rootField: string,
         _clientMethod: string,
         _args: any,
         _dataPath: string[],
         _errorFormat: ErrorFormat,
         _measurePerformance?: boolean | undefined,
         _isList?: boolean,
      )

      article<T extends ArticleArgs = {}>(
         args?: Subset<T, ArticleArgs>,
      ): Prisma__ArticleClient<ArticleGetPayload<T> | Null>

      private get _document()
      /**
       * Attaches callbacks for the resolution and/or rejection of the Promise.
       * @param onfulfilled The callback to execute when the Promise is resolved.
       * @param onrejected The callback to execute when the Promise is rejected.
       * @returns A Promise for the completion of which ever callback is executed.
       */
      then<TResult1 = T, TResult2 = never>(
         onfulfilled?:
            | ((value: T) => TResult1 | PromiseLike<TResult1>)
            | undefined
            | null,
         onrejected?:
            | ((reason: any) => TResult2 | PromiseLike<TResult2>)
            | undefined
            | null,
      ): Promise<TResult1 | TResult2>
      /**
       * Attaches a callback for only the rejection of the Promise.
       * @param onrejected The callback to execute when the Promise is rejected.
       * @returns A Promise for the completion of the callback.
       */
      catch<TResult = never>(
         onrejected?:
            | ((reason: any) => TResult | PromiseLike<TResult>)
            | undefined
            | null,
      ): Promise<T | TResult>
      /**
       * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
       * resolved value cannot be modified from the callback.
       * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
       * @returns A Promise for the completion of the callback.
       */
      finally(onfinally?: (() => void) | undefined | null): Promise<T>
   }

   // Custom InputTypes

   /**
    * Chapter base type for findUnique actions
    */
   export type ChapterFindUniqueArgsBase = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
      /**
       * Filter, which Chapter to fetch.
       */
      where: ChapterWhereUniqueInput
   }

   /**
    * Chapter findUnique
    */
   export interface ChapterFindUniqueArgs extends ChapterFindUniqueArgsBase {
      /**
       * Throw an Error if query returns no results
       * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
       */
      rejectOnNotFound?: RejectOnNotFound
   }

   /**
    * Chapter findUniqueOrThrow
    */
   export type ChapterFindUniqueOrThrowArgs = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
      /**
       * Filter, which Chapter to fetch.
       */
      where: ChapterWhereUniqueInput
   }

   /**
    * Chapter base type for findFirst actions
    */
   export type ChapterFindFirstArgsBase = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
      /**
       * Filter, which Chapter to fetch.
       */
      where?: ChapterWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Chapters to fetch.
       */
      orderBy?: Enumerable<ChapterOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for searching for Chapters.
       */
      cursor?: ChapterWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Chapters from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Chapters.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of Chapters.
       */
      distinct?: Enumerable<ChapterScalarFieldEnum>
   }

   /**
    * Chapter findFirst
    */
   export interface ChapterFindFirstArgs extends ChapterFindFirstArgsBase {
      /**
       * Throw an Error if query returns no results
       * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
       */
      rejectOnNotFound?: RejectOnNotFound
   }

   /**
    * Chapter findFirstOrThrow
    */
   export type ChapterFindFirstOrThrowArgs = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
      /**
       * Filter, which Chapter to fetch.
       */
      where?: ChapterWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Chapters to fetch.
       */
      orderBy?: Enumerable<ChapterOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for searching for Chapters.
       */
      cursor?: ChapterWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Chapters from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Chapters.
       */
      skip?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of Chapters.
       */
      distinct?: Enumerable<ChapterScalarFieldEnum>
   }

   /**
    * Chapter findMany
    */
   export type ChapterFindManyArgs = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
      /**
       * Filter, which Chapters to fetch.
       */
      where?: ChapterWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Chapters to fetch.
       */
      orderBy?: Enumerable<ChapterOrderByWithRelationInput>
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Chapters.
       */
      cursor?: ChapterWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Chapters from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Chapters.
       */
      skip?: number
      distinct?: Enumerable<ChapterScalarFieldEnum>
   }

   /**
    * Chapter create
    */
   export type ChapterCreateArgs = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
      /**
       * The data needed to create a Chapter.
       */
      data: XOR<ChapterCreateInput, ChapterUncheckedCreateInput>
   }

   /**
    * Chapter createMany
    */
   export type ChapterCreateManyArgs = {
      /**
       * The data used to create many Chapters.
       */
      data: Enumerable<ChapterCreateManyInput>
      skipDuplicates?: boolean
   }

   /**
    * Chapter update
    */
   export type ChapterUpdateArgs = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
      /**
       * The data needed to update a Chapter.
       */
      data: XOR<ChapterUpdateInput, ChapterUncheckedUpdateInput>
      /**
       * Choose, which Chapter to update.
       */
      where: ChapterWhereUniqueInput
   }

   /**
    * Chapter updateMany
    */
   export type ChapterUpdateManyArgs = {
      /**
       * The data used to update Chapters.
       */
      data: XOR<ChapterUpdateManyMutationInput, ChapterUncheckedUpdateManyInput>
      /**
       * Filter which Chapters to update
       */
      where?: ChapterWhereInput
   }

   /**
    * Chapter upsert
    */
   export type ChapterUpsertArgs = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
      /**
       * The filter to search for the Chapter to update in case it exists.
       */
      where: ChapterWhereUniqueInput
      /**
       * In case the Chapter found by the `where` argument doesn't exist, create a new Chapter with this data.
       */
      create: XOR<ChapterCreateInput, ChapterUncheckedCreateInput>
      /**
       * In case the Chapter was found with the provided `where` argument, update it with this data.
       */
      update: XOR<ChapterUpdateInput, ChapterUncheckedUpdateInput>
   }

   /**
    * Chapter delete
    */
   export type ChapterDeleteArgs = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
      /**
       * Filter which Chapter to delete.
       */
      where: ChapterWhereUniqueInput
   }

   /**
    * Chapter deleteMany
    */
   export type ChapterDeleteManyArgs = {
      /**
       * Filter which Chapters to delete
       */
      where?: ChapterWhereInput
   }

   /**
    * Chapter without action
    */
   export type ChapterArgs = {
      /**
       * Select specific fields to fetch from the Chapter
       */
      select?: ChapterSelect | null
      /**
       * Choose, which related nodes to fetch as well.
       */
      include?: ChapterInclude | null
   }

   /**
    * Enums
    */

   export const ArticleScalarFieldEnum: {
      id: 'id'
      name: 'name'
      createdAt: 'createdAt'
      updatedAt: 'updatedAt'
      userId: 'userId'
   }

   export type ArticleScalarFieldEnum =
      (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]

   export const ChapterScalarFieldEnum: {
      id: 'id'
      name: 'name'
      createdAt: 'createdAt'
      updatedAt: 'updatedAt'
      articleId: 'articleId'
   }

   export type ChapterScalarFieldEnum =
      (typeof ChapterScalarFieldEnum)[keyof typeof ChapterScalarFieldEnum]

   export const SortOrder: {
      asc: 'asc'
      desc: 'desc'
   }

   export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]

   export const TransactionIsolationLevel: {
      ReadUncommitted: 'ReadUncommitted'
      ReadCommitted: 'ReadCommitted'
      RepeatableRead: 'RepeatableRead'
      Serializable: 'Serializable'
   }

   export type TransactionIsolationLevel =
      (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]

   export const UserScalarFieldEnum: {
      id: 'id'
      username: 'username'
      password: 'password'
      phoneNumber: 'phoneNumber'
      createdAt: 'createdAt'
      updatedAt: 'updatedAt'
   }

   export type UserScalarFieldEnum =
      (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]

   export const VerificationCodeScalarFieldEnum: {
      id: 'id'
      phoneNumber: 'phoneNumber'
      code: 'code'
      createdAt: 'createdAt'
      updatedAt: 'updatedAt'
   }

   export type VerificationCodeScalarFieldEnum =
      (typeof VerificationCodeScalarFieldEnum)[keyof typeof VerificationCodeScalarFieldEnum]

   /**
    * Deep Input Types
    */

   export type UserWhereInput = {
      AND?: Enumerable<UserWhereInput>
      OR?: Enumerable<UserWhereInput>
      NOT?: Enumerable<UserWhereInput>
      id?: IntFilter | number
      username?: StringNullableFilter | string | null
      password?: StringFilter | string
      phoneNumber?: StringFilter | string
      createdAt?: DateTimeFilter | Date | string
      updatedAt?: DateTimeFilter | Date | string
      article?: ArticleListRelationFilter
   }

   export type UserOrderByWithRelationInput = {
      id?: SortOrder
      username?: SortOrder
      password?: SortOrder
      phoneNumber?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      article?: ArticleOrderByRelationAggregateInput
   }

   export type UserWhereUniqueInput = {
      id?: number
      username?: string
      phoneNumber?: string
   }

   export type UserOrderByWithAggregationInput = {
      id?: SortOrder
      username?: SortOrder
      password?: SortOrder
      phoneNumber?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      _count?: UserCountOrderByAggregateInput
      _avg?: UserAvgOrderByAggregateInput
      _max?: UserMaxOrderByAggregateInput
      _min?: UserMinOrderByAggregateInput
      _sum?: UserSumOrderByAggregateInput
   }

   export type UserScalarWhereWithAggregatesInput = {
      AND?: Enumerable<UserScalarWhereWithAggregatesInput>
      OR?: Enumerable<UserScalarWhereWithAggregatesInput>
      NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
      id?: IntWithAggregatesFilter | number
      username?: StringNullableWithAggregatesFilter | string | null
      password?: StringWithAggregatesFilter | string
      phoneNumber?: StringWithAggregatesFilter | string
      createdAt?: DateTimeWithAggregatesFilter | Date | string
      updatedAt?: DateTimeWithAggregatesFilter | Date | string
   }

   export type VerificationCodeWhereInput = {
      AND?: Enumerable<VerificationCodeWhereInput>
      OR?: Enumerable<VerificationCodeWhereInput>
      NOT?: Enumerable<VerificationCodeWhereInput>
      id?: IntFilter | number
      phoneNumber?: StringFilter | string
      code?: StringFilter | string
      createdAt?: DateTimeFilter | Date | string
      updatedAt?: DateTimeFilter | Date | string
   }

   export type VerificationCodeOrderByWithRelationInput = {
      id?: SortOrder
      phoneNumber?: SortOrder
      code?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
   }

   export type VerificationCodeWhereUniqueInput = {
      id?: number
      phoneNumber?: string
   }

   export type VerificationCodeOrderByWithAggregationInput = {
      id?: SortOrder
      phoneNumber?: SortOrder
      code?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      _count?: VerificationCodeCountOrderByAggregateInput
      _avg?: VerificationCodeAvgOrderByAggregateInput
      _max?: VerificationCodeMaxOrderByAggregateInput
      _min?: VerificationCodeMinOrderByAggregateInput
      _sum?: VerificationCodeSumOrderByAggregateInput
   }

   export type VerificationCodeScalarWhereWithAggregatesInput = {
      AND?: Enumerable<VerificationCodeScalarWhereWithAggregatesInput>
      OR?: Enumerable<VerificationCodeScalarWhereWithAggregatesInput>
      NOT?: Enumerable<VerificationCodeScalarWhereWithAggregatesInput>
      id?: IntWithAggregatesFilter | number
      phoneNumber?: StringWithAggregatesFilter | string
      code?: StringWithAggregatesFilter | string
      createdAt?: DateTimeWithAggregatesFilter | Date | string
      updatedAt?: DateTimeWithAggregatesFilter | Date | string
   }

   export type ArticleWhereInput = {
      AND?: Enumerable<ArticleWhereInput>
      OR?: Enumerable<ArticleWhereInput>
      NOT?: Enumerable<ArticleWhereInput>
      id?: IntFilter | number
      name?: StringFilter | string
      createdAt?: DateTimeFilter | Date | string
      updatedAt?: DateTimeFilter | Date | string
      userId?: IntFilter | number
      user?: XOR<UserRelationFilter, UserWhereInput>
      chapter?: ChapterListRelationFilter
   }

   export type ArticleOrderByWithRelationInput = {
      id?: SortOrder
      name?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      userId?: SortOrder
      user?: UserOrderByWithRelationInput
      chapter?: ChapterOrderByRelationAggregateInput
   }

   export type ArticleWhereUniqueInput = {
      id?: number
      name?: string
   }

   export type ArticleOrderByWithAggregationInput = {
      id?: SortOrder
      name?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      userId?: SortOrder
      _count?: ArticleCountOrderByAggregateInput
      _avg?: ArticleAvgOrderByAggregateInput
      _max?: ArticleMaxOrderByAggregateInput
      _min?: ArticleMinOrderByAggregateInput
      _sum?: ArticleSumOrderByAggregateInput
   }

   export type ArticleScalarWhereWithAggregatesInput = {
      AND?: Enumerable<ArticleScalarWhereWithAggregatesInput>
      OR?: Enumerable<ArticleScalarWhereWithAggregatesInput>
      NOT?: Enumerable<ArticleScalarWhereWithAggregatesInput>
      id?: IntWithAggregatesFilter | number
      name?: StringWithAggregatesFilter | string
      createdAt?: DateTimeWithAggregatesFilter | Date | string
      updatedAt?: DateTimeWithAggregatesFilter | Date | string
      userId?: IntWithAggregatesFilter | number
   }

   export type ChapterWhereInput = {
      AND?: Enumerable<ChapterWhereInput>
      OR?: Enumerable<ChapterWhereInput>
      NOT?: Enumerable<ChapterWhereInput>
      id?: IntFilter | number
      name?: StringFilter | string
      createdAt?: DateTimeFilter | Date | string
      updatedAt?: DateTimeFilter | Date | string
      articleId?: IntFilter | number
      article?: XOR<ArticleRelationFilter, ArticleWhereInput>
   }

   export type ChapterOrderByWithRelationInput = {
      id?: SortOrder
      name?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      articleId?: SortOrder
      article?: ArticleOrderByWithRelationInput
   }

   export type ChapterWhereUniqueInput = {
      id?: number
      name?: string
   }

   export type ChapterOrderByWithAggregationInput = {
      id?: SortOrder
      name?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      articleId?: SortOrder
      _count?: ChapterCountOrderByAggregateInput
      _avg?: ChapterAvgOrderByAggregateInput
      _max?: ChapterMaxOrderByAggregateInput
      _min?: ChapterMinOrderByAggregateInput
      _sum?: ChapterSumOrderByAggregateInput
   }

   export type ChapterScalarWhereWithAggregatesInput = {
      AND?: Enumerable<ChapterScalarWhereWithAggregatesInput>
      OR?: Enumerable<ChapterScalarWhereWithAggregatesInput>
      NOT?: Enumerable<ChapterScalarWhereWithAggregatesInput>
      id?: IntWithAggregatesFilter | number
      name?: StringWithAggregatesFilter | string
      createdAt?: DateTimeWithAggregatesFilter | Date | string
      updatedAt?: DateTimeWithAggregatesFilter | Date | string
      articleId?: IntWithAggregatesFilter | number
   }

   export type UserCreateInput = {
      username?: string | null
      password: string
      phoneNumber: string
      createdAt?: Date | string
      updatedAt?: Date | string
      article?: ArticleCreateNestedManyWithoutUserInput
   }

   export type UserUncheckedCreateInput = {
      id?: number
      username?: string | null
      password: string
      phoneNumber: string
      createdAt?: Date | string
      updatedAt?: Date | string
      article?: ArticleUncheckedCreateNestedManyWithoutUserInput
   }

   export type UserUpdateInput = {
      username?: NullableStringFieldUpdateOperationsInput | string | null
      password?: StringFieldUpdateOperationsInput | string
      phoneNumber?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      article?: ArticleUpdateManyWithoutUserNestedInput
   }

   export type UserUncheckedUpdateInput = {
      id?: IntFieldUpdateOperationsInput | number
      username?: NullableStringFieldUpdateOperationsInput | string | null
      password?: StringFieldUpdateOperationsInput | string
      phoneNumber?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      article?: ArticleUncheckedUpdateManyWithoutUserNestedInput
   }

   export type UserCreateManyInput = {
      id?: number
      username?: string | null
      password: string
      phoneNumber: string
      createdAt?: Date | string
      updatedAt?: Date | string
   }

   export type UserUpdateManyMutationInput = {
      username?: NullableStringFieldUpdateOperationsInput | string | null
      password?: StringFieldUpdateOperationsInput | string
      phoneNumber?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type UserUncheckedUpdateManyInput = {
      id?: IntFieldUpdateOperationsInput | number
      username?: NullableStringFieldUpdateOperationsInput | string | null
      password?: StringFieldUpdateOperationsInput | string
      phoneNumber?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type VerificationCodeCreateInput = {
      phoneNumber: string
      code: string
      createdAt?: Date | string
      updatedAt?: Date | string
   }

   export type VerificationCodeUncheckedCreateInput = {
      id?: number
      phoneNumber: string
      code: string
      createdAt?: Date | string
      updatedAt?: Date | string
   }

   export type VerificationCodeUpdateInput = {
      phoneNumber?: StringFieldUpdateOperationsInput | string
      code?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type VerificationCodeUncheckedUpdateInput = {
      id?: IntFieldUpdateOperationsInput | number
      phoneNumber?: StringFieldUpdateOperationsInput | string
      code?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type VerificationCodeCreateManyInput = {
      id?: number
      phoneNumber: string
      code: string
      createdAt?: Date | string
      updatedAt?: Date | string
   }

   export type VerificationCodeUpdateManyMutationInput = {
      phoneNumber?: StringFieldUpdateOperationsInput | string
      code?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type VerificationCodeUncheckedUpdateManyInput = {
      id?: IntFieldUpdateOperationsInput | number
      phoneNumber?: StringFieldUpdateOperationsInput | string
      code?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type ArticleCreateInput = {
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
      user: UserCreateNestedOneWithoutArticleInput
      chapter?: ChapterCreateNestedManyWithoutArticleInput
   }

   export type ArticleUncheckedCreateInput = {
      id?: number
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
      userId: number
      chapter?: ChapterUncheckedCreateNestedManyWithoutArticleInput
   }

   export type ArticleUpdateInput = {
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      user?: UserUpdateOneRequiredWithoutArticleNestedInput
      chapter?: ChapterUpdateManyWithoutArticleNestedInput
   }

   export type ArticleUncheckedUpdateInput = {
      id?: IntFieldUpdateOperationsInput | number
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      userId?: IntFieldUpdateOperationsInput | number
      chapter?: ChapterUncheckedUpdateManyWithoutArticleNestedInput
   }

   export type ArticleCreateManyInput = {
      id?: number
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
      userId: number
   }

   export type ArticleUpdateManyMutationInput = {
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type ArticleUncheckedUpdateManyInput = {
      id?: IntFieldUpdateOperationsInput | number
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      userId?: IntFieldUpdateOperationsInput | number
   }

   export type ChapterCreateInput = {
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
      article: ArticleCreateNestedOneWithoutChapterInput
   }

   export type ChapterUncheckedCreateInput = {
      id?: number
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
      articleId: number
   }

   export type ChapterUpdateInput = {
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      article?: ArticleUpdateOneRequiredWithoutChapterNestedInput
   }

   export type ChapterUncheckedUpdateInput = {
      id?: IntFieldUpdateOperationsInput | number
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      articleId?: IntFieldUpdateOperationsInput | number
   }

   export type ChapterCreateManyInput = {
      id?: number
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
      articleId: number
   }

   export type ChapterUpdateManyMutationInput = {
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type ChapterUncheckedUpdateManyInput = {
      id?: IntFieldUpdateOperationsInput | number
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      articleId?: IntFieldUpdateOperationsInput | number
   }

   export type IntFilter = {
      equals?: number
      in?: Enumerable<number> | number
      notIn?: Enumerable<number> | number
      lt?: number
      lte?: number
      gt?: number
      gte?: number
      not?: NestedIntFilter | number
   }

   export type StringNullableFilter = {
      equals?: string | null
      in?: Enumerable<string> | string | null
      notIn?: Enumerable<string> | string | null
      lt?: string
      lte?: string
      gt?: string
      gte?: string
      contains?: string
      startsWith?: string
      endsWith?: string
      not?: NestedStringNullableFilter | string | null
   }

   export type StringFilter = {
      equals?: string
      in?: Enumerable<string> | string
      notIn?: Enumerable<string> | string
      lt?: string
      lte?: string
      gt?: string
      gte?: string
      contains?: string
      startsWith?: string
      endsWith?: string
      not?: NestedStringFilter | string
   }

   export type DateTimeFilter = {
      equals?: Date | string
      in?: Enumerable<Date> | Enumerable<string> | Date | string
      notIn?: Enumerable<Date> | Enumerable<string> | Date | string
      lt?: Date | string
      lte?: Date | string
      gt?: Date | string
      gte?: Date | string
      not?: NestedDateTimeFilter | Date | string
   }

   export type ArticleListRelationFilter = {
      every?: ArticleWhereInput
      some?: ArticleWhereInput
      none?: ArticleWhereInput
   }

   export type ArticleOrderByRelationAggregateInput = {
      _count?: SortOrder
   }

   export type UserCountOrderByAggregateInput = {
      id?: SortOrder
      username?: SortOrder
      password?: SortOrder
      phoneNumber?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
   }

   export type UserAvgOrderByAggregateInput = {
      id?: SortOrder
   }

   export type UserMaxOrderByAggregateInput = {
      id?: SortOrder
      username?: SortOrder
      password?: SortOrder
      phoneNumber?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
   }

   export type UserMinOrderByAggregateInput = {
      id?: SortOrder
      username?: SortOrder
      password?: SortOrder
      phoneNumber?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
   }

   export type UserSumOrderByAggregateInput = {
      id?: SortOrder
   }

   export type IntWithAggregatesFilter = {
      equals?: number
      in?: Enumerable<number> | number
      notIn?: Enumerable<number> | number
      lt?: number
      lte?: number
      gt?: number
      gte?: number
      not?: NestedIntWithAggregatesFilter | number
      _count?: NestedIntFilter
      _avg?: NestedFloatFilter
      _sum?: NestedIntFilter
      _min?: NestedIntFilter
      _max?: NestedIntFilter
   }

   export type StringNullableWithAggregatesFilter = {
      equals?: string | null
      in?: Enumerable<string> | string | null
      notIn?: Enumerable<string> | string | null
      lt?: string
      lte?: string
      gt?: string
      gte?: string
      contains?: string
      startsWith?: string
      endsWith?: string
      not?: NestedStringNullableWithAggregatesFilter | string | null
      _count?: NestedIntNullableFilter
      _min?: NestedStringNullableFilter
      _max?: NestedStringNullableFilter
   }

   export type StringWithAggregatesFilter = {
      equals?: string
      in?: Enumerable<string> | string
      notIn?: Enumerable<string> | string
      lt?: string
      lte?: string
      gt?: string
      gte?: string
      contains?: string
      startsWith?: string
      endsWith?: string
      not?: NestedStringWithAggregatesFilter | string
      _count?: NestedIntFilter
      _min?: NestedStringFilter
      _max?: NestedStringFilter
   }

   export type DateTimeWithAggregatesFilter = {
      equals?: Date | string
      in?: Enumerable<Date> | Enumerable<string> | Date | string
      notIn?: Enumerable<Date> | Enumerable<string> | Date | string
      lt?: Date | string
      lte?: Date | string
      gt?: Date | string
      gte?: Date | string
      not?: NestedDateTimeWithAggregatesFilter | Date | string
      _count?: NestedIntFilter
      _min?: NestedDateTimeFilter
      _max?: NestedDateTimeFilter
   }

   export type VerificationCodeCountOrderByAggregateInput = {
      id?: SortOrder
      phoneNumber?: SortOrder
      code?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
   }

   export type VerificationCodeAvgOrderByAggregateInput = {
      id?: SortOrder
   }

   export type VerificationCodeMaxOrderByAggregateInput = {
      id?: SortOrder
      phoneNumber?: SortOrder
      code?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
   }

   export type VerificationCodeMinOrderByAggregateInput = {
      id?: SortOrder
      phoneNumber?: SortOrder
      code?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
   }

   export type VerificationCodeSumOrderByAggregateInput = {
      id?: SortOrder
   }

   export type UserRelationFilter = {
      is?: UserWhereInput
      isNot?: UserWhereInput
   }

   export type ChapterListRelationFilter = {
      every?: ChapterWhereInput
      some?: ChapterWhereInput
      none?: ChapterWhereInput
   }

   export type ChapterOrderByRelationAggregateInput = {
      _count?: SortOrder
   }

   export type ArticleCountOrderByAggregateInput = {
      id?: SortOrder
      name?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      userId?: SortOrder
   }

   export type ArticleAvgOrderByAggregateInput = {
      id?: SortOrder
      userId?: SortOrder
   }

   export type ArticleMaxOrderByAggregateInput = {
      id?: SortOrder
      name?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      userId?: SortOrder
   }

   export type ArticleMinOrderByAggregateInput = {
      id?: SortOrder
      name?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      userId?: SortOrder
   }

   export type ArticleSumOrderByAggregateInput = {
      id?: SortOrder
      userId?: SortOrder
   }

   export type ArticleRelationFilter = {
      is?: ArticleWhereInput
      isNot?: ArticleWhereInput
   }

   export type ChapterCountOrderByAggregateInput = {
      id?: SortOrder
      name?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      articleId?: SortOrder
   }

   export type ChapterAvgOrderByAggregateInput = {
      id?: SortOrder
      articleId?: SortOrder
   }

   export type ChapterMaxOrderByAggregateInput = {
      id?: SortOrder
      name?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      articleId?: SortOrder
   }

   export type ChapterMinOrderByAggregateInput = {
      id?: SortOrder
      name?: SortOrder
      createdAt?: SortOrder
      updatedAt?: SortOrder
      articleId?: SortOrder
   }

   export type ChapterSumOrderByAggregateInput = {
      id?: SortOrder
      articleId?: SortOrder
   }

   export type ArticleCreateNestedManyWithoutUserInput = {
      create?: XOR<
         Enumerable<ArticleCreateWithoutUserInput>,
         Enumerable<ArticleUncheckedCreateWithoutUserInput>
      >
      connectOrCreate?: Enumerable<ArticleCreateOrConnectWithoutUserInput>
      createMany?: ArticleCreateManyUserInputEnvelope
      connect?: Enumerable<ArticleWhereUniqueInput>
   }

   export type ArticleUncheckedCreateNestedManyWithoutUserInput = {
      create?: XOR<
         Enumerable<ArticleCreateWithoutUserInput>,
         Enumerable<ArticleUncheckedCreateWithoutUserInput>
      >
      connectOrCreate?: Enumerable<ArticleCreateOrConnectWithoutUserInput>
      createMany?: ArticleCreateManyUserInputEnvelope
      connect?: Enumerable<ArticleWhereUniqueInput>
   }

   export type NullableStringFieldUpdateOperationsInput = {
      set?: string | null
   }

   export type StringFieldUpdateOperationsInput = {
      set?: string
   }

   export type DateTimeFieldUpdateOperationsInput = {
      set?: Date | string
   }

   export type ArticleUpdateManyWithoutUserNestedInput = {
      create?: XOR<
         Enumerable<ArticleCreateWithoutUserInput>,
         Enumerable<ArticleUncheckedCreateWithoutUserInput>
      >
      connectOrCreate?: Enumerable<ArticleCreateOrConnectWithoutUserInput>
      upsert?: Enumerable<ArticleUpsertWithWhereUniqueWithoutUserInput>
      createMany?: ArticleCreateManyUserInputEnvelope
      set?: Enumerable<ArticleWhereUniqueInput>
      disconnect?: Enumerable<ArticleWhereUniqueInput>
      delete?: Enumerable<ArticleWhereUniqueInput>
      connect?: Enumerable<ArticleWhereUniqueInput>
      update?: Enumerable<ArticleUpdateWithWhereUniqueWithoutUserInput>
      updateMany?: Enumerable<ArticleUpdateManyWithWhereWithoutUserInput>
      deleteMany?: Enumerable<ArticleScalarWhereInput>
   }

   export type IntFieldUpdateOperationsInput = {
      set?: number
      increment?: number
      decrement?: number
      multiply?: number
      divide?: number
   }

   export type ArticleUncheckedUpdateManyWithoutUserNestedInput = {
      create?: XOR<
         Enumerable<ArticleCreateWithoutUserInput>,
         Enumerable<ArticleUncheckedCreateWithoutUserInput>
      >
      connectOrCreate?: Enumerable<ArticleCreateOrConnectWithoutUserInput>
      upsert?: Enumerable<ArticleUpsertWithWhereUniqueWithoutUserInput>
      createMany?: ArticleCreateManyUserInputEnvelope
      set?: Enumerable<ArticleWhereUniqueInput>
      disconnect?: Enumerable<ArticleWhereUniqueInput>
      delete?: Enumerable<ArticleWhereUniqueInput>
      connect?: Enumerable<ArticleWhereUniqueInput>
      update?: Enumerable<ArticleUpdateWithWhereUniqueWithoutUserInput>
      updateMany?: Enumerable<ArticleUpdateManyWithWhereWithoutUserInput>
      deleteMany?: Enumerable<ArticleScalarWhereInput>
   }

   export type UserCreateNestedOneWithoutArticleInput = {
      create?: XOR<
         UserCreateWithoutArticleInput,
         UserUncheckedCreateWithoutArticleInput
      >
      connectOrCreate?: UserCreateOrConnectWithoutArticleInput
      connect?: UserWhereUniqueInput
   }

   export type ChapterCreateNestedManyWithoutArticleInput = {
      create?: XOR<
         Enumerable<ChapterCreateWithoutArticleInput>,
         Enumerable<ChapterUncheckedCreateWithoutArticleInput>
      >
      connectOrCreate?: Enumerable<ChapterCreateOrConnectWithoutArticleInput>
      createMany?: ChapterCreateManyArticleInputEnvelope
      connect?: Enumerable<ChapterWhereUniqueInput>
   }

   export type ChapterUncheckedCreateNestedManyWithoutArticleInput = {
      create?: XOR<
         Enumerable<ChapterCreateWithoutArticleInput>,
         Enumerable<ChapterUncheckedCreateWithoutArticleInput>
      >
      connectOrCreate?: Enumerable<ChapterCreateOrConnectWithoutArticleInput>
      createMany?: ChapterCreateManyArticleInputEnvelope
      connect?: Enumerable<ChapterWhereUniqueInput>
   }

   export type UserUpdateOneRequiredWithoutArticleNestedInput = {
      create?: XOR<
         UserCreateWithoutArticleInput,
         UserUncheckedCreateWithoutArticleInput
      >
      connectOrCreate?: UserCreateOrConnectWithoutArticleInput
      upsert?: UserUpsertWithoutArticleInput
      connect?: UserWhereUniqueInput
      update?: XOR<
         UserUpdateWithoutArticleInput,
         UserUncheckedUpdateWithoutArticleInput
      >
   }

   export type ChapterUpdateManyWithoutArticleNestedInput = {
      create?: XOR<
         Enumerable<ChapterCreateWithoutArticleInput>,
         Enumerable<ChapterUncheckedCreateWithoutArticleInput>
      >
      connectOrCreate?: Enumerable<ChapterCreateOrConnectWithoutArticleInput>
      upsert?: Enumerable<ChapterUpsertWithWhereUniqueWithoutArticleInput>
      createMany?: ChapterCreateManyArticleInputEnvelope
      set?: Enumerable<ChapterWhereUniqueInput>
      disconnect?: Enumerable<ChapterWhereUniqueInput>
      delete?: Enumerable<ChapterWhereUniqueInput>
      connect?: Enumerable<ChapterWhereUniqueInput>
      update?: Enumerable<ChapterUpdateWithWhereUniqueWithoutArticleInput>
      updateMany?: Enumerable<ChapterUpdateManyWithWhereWithoutArticleInput>
      deleteMany?: Enumerable<ChapterScalarWhereInput>
   }

   export type ChapterUncheckedUpdateManyWithoutArticleNestedInput = {
      create?: XOR<
         Enumerable<ChapterCreateWithoutArticleInput>,
         Enumerable<ChapterUncheckedCreateWithoutArticleInput>
      >
      connectOrCreate?: Enumerable<ChapterCreateOrConnectWithoutArticleInput>
      upsert?: Enumerable<ChapterUpsertWithWhereUniqueWithoutArticleInput>
      createMany?: ChapterCreateManyArticleInputEnvelope
      set?: Enumerable<ChapterWhereUniqueInput>
      disconnect?: Enumerable<ChapterWhereUniqueInput>
      delete?: Enumerable<ChapterWhereUniqueInput>
      connect?: Enumerable<ChapterWhereUniqueInput>
      update?: Enumerable<ChapterUpdateWithWhereUniqueWithoutArticleInput>
      updateMany?: Enumerable<ChapterUpdateManyWithWhereWithoutArticleInput>
      deleteMany?: Enumerable<ChapterScalarWhereInput>
   }

   export type ArticleCreateNestedOneWithoutChapterInput = {
      create?: XOR<
         ArticleCreateWithoutChapterInput,
         ArticleUncheckedCreateWithoutChapterInput
      >
      connectOrCreate?: ArticleCreateOrConnectWithoutChapterInput
      connect?: ArticleWhereUniqueInput
   }

   export type ArticleUpdateOneRequiredWithoutChapterNestedInput = {
      create?: XOR<
         ArticleCreateWithoutChapterInput,
         ArticleUncheckedCreateWithoutChapterInput
      >
      connectOrCreate?: ArticleCreateOrConnectWithoutChapterInput
      upsert?: ArticleUpsertWithoutChapterInput
      connect?: ArticleWhereUniqueInput
      update?: XOR<
         ArticleUpdateWithoutChapterInput,
         ArticleUncheckedUpdateWithoutChapterInput
      >
   }

   export type NestedIntFilter = {
      equals?: number
      in?: Enumerable<number> | number
      notIn?: Enumerable<number> | number
      lt?: number
      lte?: number
      gt?: number
      gte?: number
      not?: NestedIntFilter | number
   }

   export type NestedStringNullableFilter = {
      equals?: string | null
      in?: Enumerable<string> | string | null
      notIn?: Enumerable<string> | string | null
      lt?: string
      lte?: string
      gt?: string
      gte?: string
      contains?: string
      startsWith?: string
      endsWith?: string
      not?: NestedStringNullableFilter | string | null
   }

   export type NestedStringFilter = {
      equals?: string
      in?: Enumerable<string> | string
      notIn?: Enumerable<string> | string
      lt?: string
      lte?: string
      gt?: string
      gte?: string
      contains?: string
      startsWith?: string
      endsWith?: string
      not?: NestedStringFilter | string
   }

   export type NestedDateTimeFilter = {
      equals?: Date | string
      in?: Enumerable<Date> | Enumerable<string> | Date | string
      notIn?: Enumerable<Date> | Enumerable<string> | Date | string
      lt?: Date | string
      lte?: Date | string
      gt?: Date | string
      gte?: Date | string
      not?: NestedDateTimeFilter | Date | string
   }

   export type NestedIntWithAggregatesFilter = {
      equals?: number
      in?: Enumerable<number> | number
      notIn?: Enumerable<number> | number
      lt?: number
      lte?: number
      gt?: number
      gte?: number
      not?: NestedIntWithAggregatesFilter | number
      _count?: NestedIntFilter
      _avg?: NestedFloatFilter
      _sum?: NestedIntFilter
      _min?: NestedIntFilter
      _max?: NestedIntFilter
   }

   export type NestedFloatFilter = {
      equals?: number
      in?: Enumerable<number> | number
      notIn?: Enumerable<number> | number
      lt?: number
      lte?: number
      gt?: number
      gte?: number
      not?: NestedFloatFilter | number
   }

   export type NestedStringNullableWithAggregatesFilter = {
      equals?: string | null
      in?: Enumerable<string> | string | null
      notIn?: Enumerable<string> | string | null
      lt?: string
      lte?: string
      gt?: string
      gte?: string
      contains?: string
      startsWith?: string
      endsWith?: string
      not?: NestedStringNullableWithAggregatesFilter | string | null
      _count?: NestedIntNullableFilter
      _min?: NestedStringNullableFilter
      _max?: NestedStringNullableFilter
   }

   export type NestedIntNullableFilter = {
      equals?: number | null
      in?: Enumerable<number> | number | null
      notIn?: Enumerable<number> | number | null
      lt?: number
      lte?: number
      gt?: number
      gte?: number
      not?: NestedIntNullableFilter | number | null
   }

   export type NestedStringWithAggregatesFilter = {
      equals?: string
      in?: Enumerable<string> | string
      notIn?: Enumerable<string> | string
      lt?: string
      lte?: string
      gt?: string
      gte?: string
      contains?: string
      startsWith?: string
      endsWith?: string
      not?: NestedStringWithAggregatesFilter | string
      _count?: NestedIntFilter
      _min?: NestedStringFilter
      _max?: NestedStringFilter
   }

   export type NestedDateTimeWithAggregatesFilter = {
      equals?: Date | string
      in?: Enumerable<Date> | Enumerable<string> | Date | string
      notIn?: Enumerable<Date> | Enumerable<string> | Date | string
      lt?: Date | string
      lte?: Date | string
      gt?: Date | string
      gte?: Date | string
      not?: NestedDateTimeWithAggregatesFilter | Date | string
      _count?: NestedIntFilter
      _min?: NestedDateTimeFilter
      _max?: NestedDateTimeFilter
   }

   export type ArticleCreateWithoutUserInput = {
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
      chapter?: ChapterCreateNestedManyWithoutArticleInput
   }

   export type ArticleUncheckedCreateWithoutUserInput = {
      id?: number
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
      chapter?: ChapterUncheckedCreateNestedManyWithoutArticleInput
   }

   export type ArticleCreateOrConnectWithoutUserInput = {
      where: ArticleWhereUniqueInput
      create: XOR<
         ArticleCreateWithoutUserInput,
         ArticleUncheckedCreateWithoutUserInput
      >
   }

   export type ArticleCreateManyUserInputEnvelope = {
      data: Enumerable<ArticleCreateManyUserInput>
      skipDuplicates?: boolean
   }

   export type ArticleUpsertWithWhereUniqueWithoutUserInput = {
      where: ArticleWhereUniqueInput
      update: XOR<
         ArticleUpdateWithoutUserInput,
         ArticleUncheckedUpdateWithoutUserInput
      >
      create: XOR<
         ArticleCreateWithoutUserInput,
         ArticleUncheckedCreateWithoutUserInput
      >
   }

   export type ArticleUpdateWithWhereUniqueWithoutUserInput = {
      where: ArticleWhereUniqueInput
      data: XOR<
         ArticleUpdateWithoutUserInput,
         ArticleUncheckedUpdateWithoutUserInput
      >
   }

   export type ArticleUpdateManyWithWhereWithoutUserInput = {
      where: ArticleScalarWhereInput
      data: XOR<
         ArticleUpdateManyMutationInput,
         ArticleUncheckedUpdateManyWithoutArticleInput
      >
   }

   export type ArticleScalarWhereInput = {
      AND?: Enumerable<ArticleScalarWhereInput>
      OR?: Enumerable<ArticleScalarWhereInput>
      NOT?: Enumerable<ArticleScalarWhereInput>
      id?: IntFilter | number
      name?: StringFilter | string
      createdAt?: DateTimeFilter | Date | string
      updatedAt?: DateTimeFilter | Date | string
      userId?: IntFilter | number
   }

   export type UserCreateWithoutArticleInput = {
      username?: string | null
      password: string
      phoneNumber: string
      createdAt?: Date | string
      updatedAt?: Date | string
   }

   export type UserUncheckedCreateWithoutArticleInput = {
      id?: number
      username?: string | null
      password: string
      phoneNumber: string
      createdAt?: Date | string
      updatedAt?: Date | string
   }

   export type UserCreateOrConnectWithoutArticleInput = {
      where: UserWhereUniqueInput
      create: XOR<
         UserCreateWithoutArticleInput,
         UserUncheckedCreateWithoutArticleInput
      >
   }

   export type ChapterCreateWithoutArticleInput = {
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
   }

   export type ChapterUncheckedCreateWithoutArticleInput = {
      id?: number
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
   }

   export type ChapterCreateOrConnectWithoutArticleInput = {
      where: ChapterWhereUniqueInput
      create: XOR<
         ChapterCreateWithoutArticleInput,
         ChapterUncheckedCreateWithoutArticleInput
      >
   }

   export type ChapterCreateManyArticleInputEnvelope = {
      data: Enumerable<ChapterCreateManyArticleInput>
      skipDuplicates?: boolean
   }

   export type UserUpsertWithoutArticleInput = {
      update: XOR<
         UserUpdateWithoutArticleInput,
         UserUncheckedUpdateWithoutArticleInput
      >
      create: XOR<
         UserCreateWithoutArticleInput,
         UserUncheckedCreateWithoutArticleInput
      >
   }

   export type UserUpdateWithoutArticleInput = {
      username?: NullableStringFieldUpdateOperationsInput | string | null
      password?: StringFieldUpdateOperationsInput | string
      phoneNumber?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type UserUncheckedUpdateWithoutArticleInput = {
      id?: IntFieldUpdateOperationsInput | number
      username?: NullableStringFieldUpdateOperationsInput | string | null
      password?: StringFieldUpdateOperationsInput | string
      phoneNumber?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type ChapterUpsertWithWhereUniqueWithoutArticleInput = {
      where: ChapterWhereUniqueInput
      update: XOR<
         ChapterUpdateWithoutArticleInput,
         ChapterUncheckedUpdateWithoutArticleInput
      >
      create: XOR<
         ChapterCreateWithoutArticleInput,
         ChapterUncheckedCreateWithoutArticleInput
      >
   }

   export type ChapterUpdateWithWhereUniqueWithoutArticleInput = {
      where: ChapterWhereUniqueInput
      data: XOR<
         ChapterUpdateWithoutArticleInput,
         ChapterUncheckedUpdateWithoutArticleInput
      >
   }

   export type ChapterUpdateManyWithWhereWithoutArticleInput = {
      where: ChapterScalarWhereInput
      data: XOR<
         ChapterUpdateManyMutationInput,
         ChapterUncheckedUpdateManyWithoutChapterInput
      >
   }

   export type ChapterScalarWhereInput = {
      AND?: Enumerable<ChapterScalarWhereInput>
      OR?: Enumerable<ChapterScalarWhereInput>
      NOT?: Enumerable<ChapterScalarWhereInput>
      id?: IntFilter | number
      name?: StringFilter | string
      createdAt?: DateTimeFilter | Date | string
      updatedAt?: DateTimeFilter | Date | string
      articleId?: IntFilter | number
   }

   export type ArticleCreateWithoutChapterInput = {
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
      user: UserCreateNestedOneWithoutArticleInput
   }

   export type ArticleUncheckedCreateWithoutChapterInput = {
      id?: number
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
      userId: number
   }

   export type ArticleCreateOrConnectWithoutChapterInput = {
      where: ArticleWhereUniqueInput
      create: XOR<
         ArticleCreateWithoutChapterInput,
         ArticleUncheckedCreateWithoutChapterInput
      >
   }

   export type ArticleUpsertWithoutChapterInput = {
      update: XOR<
         ArticleUpdateWithoutChapterInput,
         ArticleUncheckedUpdateWithoutChapterInput
      >
      create: XOR<
         ArticleCreateWithoutChapterInput,
         ArticleUncheckedCreateWithoutChapterInput
      >
   }

   export type ArticleUpdateWithoutChapterInput = {
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      user?: UserUpdateOneRequiredWithoutArticleNestedInput
   }

   export type ArticleUncheckedUpdateWithoutChapterInput = {
      id?: IntFieldUpdateOperationsInput | number
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      userId?: IntFieldUpdateOperationsInput | number
   }

   export type ArticleCreateManyUserInput = {
      id?: number
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
   }

   export type ArticleUpdateWithoutUserInput = {
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      chapter?: ChapterUpdateManyWithoutArticleNestedInput
   }

   export type ArticleUncheckedUpdateWithoutUserInput = {
      id?: IntFieldUpdateOperationsInput | number
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
      chapter?: ChapterUncheckedUpdateManyWithoutArticleNestedInput
   }

   export type ArticleUncheckedUpdateManyWithoutArticleInput = {
      id?: IntFieldUpdateOperationsInput | number
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type ChapterCreateManyArticleInput = {
      id?: number
      name: string
      createdAt?: Date | string
      updatedAt?: Date | string
   }

   export type ChapterUpdateWithoutArticleInput = {
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type ChapterUncheckedUpdateWithoutArticleInput = {
      id?: IntFieldUpdateOperationsInput | number
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   export type ChapterUncheckedUpdateManyWithoutChapterInput = {
      id?: IntFieldUpdateOperationsInput | number
      name?: StringFieldUpdateOperationsInput | string
      createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
      updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
   }

   /**
    * Batch Payload for updateMany & deleteMany & createMany
    */

   export type BatchPayload = {
      count: number
   }

   /**
    * DMMF
    */
   export const dmmf: runtime.BaseDMMF
}
