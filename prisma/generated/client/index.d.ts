
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model Test_Tuition
 * 
 */
export type Test_Tuition = $Result.DefaultSelection<Prisma.$Test_TuitionPayload>
/**
 * Model Test_School
 * 
 */
export type Test_School = $Result.DefaultSelection<Prisma.$Test_SchoolPayload>
/**
 * Model Schedule
 * 
 */
export type Schedule = $Result.DefaultSelection<Prisma.$SchedulePayload>
/**
 * Model Slot
 * 
 */
export type Slot = $Result.DefaultSelection<Prisma.$SlotPayload>

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
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

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

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs>;

  /**
   * `prisma.test_Tuition`: Exposes CRUD operations for the **Test_Tuition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Test_Tuitions
    * const test_Tuitions = await prisma.test_Tuition.findMany()
    * ```
    */
  get test_Tuition(): Prisma.Test_TuitionDelegate<ExtArgs>;

  /**
   * `prisma.test_School`: Exposes CRUD operations for the **Test_School** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Test_Schools
    * const test_Schools = await prisma.test_School.findMany()
    * ```
    */
  get test_School(): Prisma.Test_SchoolDelegate<ExtArgs>;

  /**
   * `prisma.schedule`: Exposes CRUD operations for the **Schedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedules
    * const schedules = await prisma.schedule.findMany()
    * ```
    */
  get schedule(): Prisma.ScheduleDelegate<ExtArgs>;

  /**
   * `prisma.slot`: Exposes CRUD operations for the **Slot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Slots
    * const slots = await prisma.slot.findMany()
    * ```
    */
  get slot(): Prisma.SlotDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.0.0
   * Query Engine version: 5dbef10bdbfb579e07d35cc85fb1518d357cb99e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

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
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


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

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
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
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
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
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Student: 'Student',
    Teacher: 'Teacher',
    Test_Tuition: 'Test_Tuition',
    Test_School: 'Test_School',
    Schedule: 'Schedule',
    Slot: 'Slot'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "student" | "teacher" | "test_Tuition" | "test_School" | "schedule" | "slot"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      Test_Tuition: {
        payload: Prisma.$Test_TuitionPayload<ExtArgs>
        fields: Prisma.Test_TuitionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Test_TuitionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_TuitionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Test_TuitionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_TuitionPayload>
          }
          findFirst: {
            args: Prisma.Test_TuitionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_TuitionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Test_TuitionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_TuitionPayload>
          }
          findMany: {
            args: Prisma.Test_TuitionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_TuitionPayload>[]
          }
          create: {
            args: Prisma.Test_TuitionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_TuitionPayload>
          }
          createMany: {
            args: Prisma.Test_TuitionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Test_TuitionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_TuitionPayload>[]
          }
          delete: {
            args: Prisma.Test_TuitionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_TuitionPayload>
          }
          update: {
            args: Prisma.Test_TuitionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_TuitionPayload>
          }
          deleteMany: {
            args: Prisma.Test_TuitionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Test_TuitionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Test_TuitionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_TuitionPayload>
          }
          aggregate: {
            args: Prisma.Test_TuitionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTest_Tuition>
          }
          groupBy: {
            args: Prisma.Test_TuitionGroupByArgs<ExtArgs>
            result: $Utils.Optional<Test_TuitionGroupByOutputType>[]
          }
          count: {
            args: Prisma.Test_TuitionCountArgs<ExtArgs>
            result: $Utils.Optional<Test_TuitionCountAggregateOutputType> | number
          }
        }
      }
      Test_School: {
        payload: Prisma.$Test_SchoolPayload<ExtArgs>
        fields: Prisma.Test_SchoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Test_SchoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_SchoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Test_SchoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_SchoolPayload>
          }
          findFirst: {
            args: Prisma.Test_SchoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_SchoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Test_SchoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_SchoolPayload>
          }
          findMany: {
            args: Prisma.Test_SchoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_SchoolPayload>[]
          }
          create: {
            args: Prisma.Test_SchoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_SchoolPayload>
          }
          createMany: {
            args: Prisma.Test_SchoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Test_SchoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_SchoolPayload>[]
          }
          delete: {
            args: Prisma.Test_SchoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_SchoolPayload>
          }
          update: {
            args: Prisma.Test_SchoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_SchoolPayload>
          }
          deleteMany: {
            args: Prisma.Test_SchoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Test_SchoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Test_SchoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Test_SchoolPayload>
          }
          aggregate: {
            args: Prisma.Test_SchoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTest_School>
          }
          groupBy: {
            args: Prisma.Test_SchoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<Test_SchoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.Test_SchoolCountArgs<ExtArgs>
            result: $Utils.Optional<Test_SchoolCountAggregateOutputType> | number
          }
        }
      }
      Schedule: {
        payload: Prisma.$SchedulePayload<ExtArgs>
        fields: Prisma.ScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findFirst: {
            args: Prisma.ScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findMany: {
            args: Prisma.ScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          create: {
            args: Prisma.ScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          createMany: {
            args: Prisma.ScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          delete: {
            args: Prisma.ScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          update: {
            args: Prisma.ScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          aggregate: {
            args: Prisma.ScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule>
          }
          groupBy: {
            args: Prisma.ScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleCountAggregateOutputType> | number
          }
        }
      }
      Slot: {
        payload: Prisma.$SlotPayload<ExtArgs>
        fields: Prisma.SlotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SlotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SlotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          findFirst: {
            args: Prisma.SlotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SlotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          findMany: {
            args: Prisma.SlotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>[]
          }
          create: {
            args: Prisma.SlotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          createMany: {
            args: Prisma.SlotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SlotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>[]
          }
          delete: {
            args: Prisma.SlotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          update: {
            args: Prisma.SlotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          deleteMany: {
            args: Prisma.SlotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SlotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SlotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          aggregate: {
            args: Prisma.SlotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSlot>
          }
          groupBy: {
            args: Prisma.SlotGroupByArgs<ExtArgs>
            result: $Utils.Optional<SlotGroupByOutputType>[]
          }
          count: {
            args: Prisma.SlotCountArgs<ExtArgs>
            result: $Utils.Optional<SlotCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
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
    | 'groupBy'

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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    test_tuition: number
    test_school: number
    schedule: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test_tuition?: boolean | StudentCountOutputTypeCountTest_tuitionArgs
    test_school?: boolean | StudentCountOutputTypeCountTest_schoolArgs
    schedule?: boolean | StudentCountOutputTypeCountScheduleArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountTest_tuitionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Test_TuitionWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountTest_schoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Test_SchoolWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountScheduleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }


  /**
   * Count Type TeacherCountOutputType
   */

  export type TeacherCountOutputType = {
    Student: number
    test_tuition: number
  }

  export type TeacherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Student?: boolean | TeacherCountOutputTypeCountStudentArgs
    test_tuition?: boolean | TeacherCountOutputTypeCountTest_tuitionArgs
  }

  // Custom InputTypes
  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherCountOutputType
     */
    select?: TeacherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountStudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountTest_tuitionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Test_TuitionWhereInput
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
    email: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    clerkUserId: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    clerkUserId: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    imageUrl: number
    clerkUserId: number
    role: number
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
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    clerkUserId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    clerkUserId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    clerkUserId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
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
    email: string
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    clerkUserId: string
    role: string | null
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
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    clerkUserId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Student?: boolean | User$StudentArgs<ExtArgs>
    Teacher?: boolean | User$TeacherArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    clerkUserId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    clerkUserId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Student?: boolean | User$StudentArgs<ExtArgs>
    Teacher?: boolean | User$TeacherArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Student: Prisma.$StudentPayload<ExtArgs> | null
      Teacher: Prisma.$TeacherPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      firstName: string | null
      lastName: string | null
      imageUrl: string | null
      clerkUserId: string
      role: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Student<T extends User$StudentArgs<ExtArgs> = {}>(args?: Subset<T, User$StudentArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    Teacher<T extends User$TeacherArgs<ExtArgs> = {}>(args?: Subset<T, User$TeacherArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly clerkUserId: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.Student
   */
  export type User$StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
  }

  /**
   * User.Teacher
   */
  export type User$TeacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    fees: number | null
    numberDaysAttendPerWeek: number | null
    teacherId: number | null
  }

  export type StudentSumAggregateOutputType = {
    id: number | null
    userId: number | null
    fees: number | null
    numberDaysAttendPerWeek: number | null
    teacherId: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: number | null
    userId: number | null
    grade: string | null
    school: string | null
    board: string | null
    fees: number | null
    numberDaysAttendPerWeek: number | null
    createdAt: Date | null
    updatedAt: Date | null
    teacherId: number | null
  }

  export type StudentMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    grade: string | null
    school: string | null
    board: string | null
    fees: number | null
    numberDaysAttendPerWeek: number | null
    createdAt: Date | null
    updatedAt: Date | null
    teacherId: number | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    userId: number
    grade: number
    school: number
    board: number
    fees: number
    numberDaysAttendPerWeek: number
    createdAt: number
    updatedAt: number
    teacherId: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    id?: true
    userId?: true
    fees?: true
    numberDaysAttendPerWeek?: true
    teacherId?: true
  }

  export type StudentSumAggregateInputType = {
    id?: true
    userId?: true
    fees?: true
    numberDaysAttendPerWeek?: true
    teacherId?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    userId?: true
    grade?: true
    school?: true
    board?: true
    fees?: true
    numberDaysAttendPerWeek?: true
    createdAt?: true
    updatedAt?: true
    teacherId?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    userId?: true
    grade?: true
    school?: true
    board?: true
    fees?: true
    numberDaysAttendPerWeek?: true
    createdAt?: true
    updatedAt?: true
    teacherId?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    userId?: true
    grade?: true
    school?: true
    board?: true
    fees?: true
    numberDaysAttendPerWeek?: true
    createdAt?: true
    updatedAt?: true
    teacherId?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: number
    userId: number
    grade: string | null
    school: string | null
    board: string | null
    fees: number | null
    numberDaysAttendPerWeek: number | null
    createdAt: Date
    updatedAt: Date
    teacherId: number
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    grade?: boolean
    school?: boolean
    board?: boolean
    fees?: boolean
    numberDaysAttendPerWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacherId?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    test_tuition?: boolean | Student$test_tuitionArgs<ExtArgs>
    test_school?: boolean | Student$test_schoolArgs<ExtArgs>
    schedule?: boolean | Student$scheduleArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    grade?: boolean
    school?: boolean
    board?: boolean
    fees?: boolean
    numberDaysAttendPerWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacherId?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    userId?: boolean
    grade?: boolean
    school?: boolean
    board?: boolean
    fees?: boolean
    numberDaysAttendPerWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacherId?: boolean
  }

  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    test_tuition?: boolean | Student$test_tuitionArgs<ExtArgs>
    test_school?: boolean | Student$test_schoolArgs<ExtArgs>
    schedule?: boolean | Student$scheduleArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      test_tuition: Prisma.$Test_TuitionPayload<ExtArgs>[]
      test_school: Prisma.$Test_SchoolPayload<ExtArgs>[]
      schedule: Prisma.$SchedulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      grade: string | null
      school: string | null
      board: string | null
      fees: number | null
      numberDaysAttendPerWeek: number | null
      createdAt: Date
      updatedAt: Date
      teacherId: number
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
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
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    test_tuition<T extends Student$test_tuitionArgs<ExtArgs> = {}>(args?: Subset<T, Student$test_tuitionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "findMany"> | Null>
    test_school<T extends Student$test_schoolArgs<ExtArgs> = {}>(args?: Subset<T, Student$test_schoolArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "findMany"> | Null>
    schedule<T extends Student$scheduleArgs<ExtArgs> = {}>(args?: Subset<T, Student$scheduleArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'Int'>
    readonly userId: FieldRef<"Student", 'Int'>
    readonly grade: FieldRef<"Student", 'String'>
    readonly school: FieldRef<"Student", 'String'>
    readonly board: FieldRef<"Student", 'String'>
    readonly fees: FieldRef<"Student", 'Int'>
    readonly numberDaysAttendPerWeek: FieldRef<"Student", 'Int'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
    readonly teacherId: FieldRef<"Student", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }

  /**
   * Student.test_tuition
   */
  export type Student$test_tuitionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    where?: Test_TuitionWhereInput
    orderBy?: Test_TuitionOrderByWithRelationInput | Test_TuitionOrderByWithRelationInput[]
    cursor?: Test_TuitionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Test_TuitionScalarFieldEnum | Test_TuitionScalarFieldEnum[]
  }

  /**
   * Student.test_school
   */
  export type Student$test_schoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
    where?: Test_SchoolWhereInput
    orderBy?: Test_SchoolOrderByWithRelationInput | Test_SchoolOrderByWithRelationInput[]
    cursor?: Test_SchoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Test_SchoolScalarFieldEnum | Test_SchoolScalarFieldEnum[]
  }

  /**
   * Student.schedule
   */
  export type Student$scheduleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TeacherSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TeacherMinAggregateOutputType = {
    id: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeacherMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeacherCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeacherAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TeacherSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TeacherMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeacherMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeacherCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeacherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeacherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _avg?: TeacherAvgAggregateInputType
    _sum?: TeacherSumAggregateInputType
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    id: number
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Student?: boolean | Teacher$StudentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    test_tuition?: boolean | Teacher$test_tuitionArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Student?: boolean | Teacher$StudentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    test_tuition?: boolean | Teacher$test_tuitionArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {
      Student: Prisma.$StudentPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
      test_tuition: Prisma.$Test_TuitionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teacherWithIdOnly = await prisma.teacher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
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
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
        }[OrderFields]
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Student<T extends Teacher$StudentArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$StudentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany"> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    test_tuition<T extends Teacher$test_tuitionArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$test_tuitionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Teacher model
   */ 
  interface TeacherFieldRefs {
    readonly id: FieldRef<"Teacher", 'Int'>
    readonly userId: FieldRef<"Teacher", 'Int'>
    readonly createdAt: FieldRef<"Teacher", 'DateTime'>
    readonly updatedAt: FieldRef<"Teacher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
  }

  /**
   * Teacher.Student
   */
  export type Teacher$StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Teacher.test_tuition
   */
  export type Teacher$test_tuitionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    where?: Test_TuitionWhereInput
    orderBy?: Test_TuitionOrderByWithRelationInput | Test_TuitionOrderByWithRelationInput[]
    cursor?: Test_TuitionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Test_TuitionScalarFieldEnum | Test_TuitionScalarFieldEnum[]
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
  }


  /**
   * Model Test_Tuition
   */

  export type AggregateTest_Tuition = {
    _count: Test_TuitionCountAggregateOutputType | null
    _avg: Test_TuitionAvgAggregateOutputType | null
    _sum: Test_TuitionSumAggregateOutputType | null
    _min: Test_TuitionMinAggregateOutputType | null
    _max: Test_TuitionMaxAggregateOutputType | null
  }

  export type Test_TuitionAvgAggregateOutputType = {
    id: number | null
    marks_scored: number | null
    total_marks: number | null
    teacherId: number | null
    studentId: number | null
  }

  export type Test_TuitionSumAggregateOutputType = {
    id: number | null
    marks_scored: number | null
    total_marks: number | null
    teacherId: number | null
    studentId: number | null
  }

  export type Test_TuitionMinAggregateOutputType = {
    id: number | null
    name: string | null
    syllabus: string | null
    date: Date | null
    marks_scored: number | null
    total_marks: number | null
    teacherId: number | null
    studentId: number | null
  }

  export type Test_TuitionMaxAggregateOutputType = {
    id: number | null
    name: string | null
    syllabus: string | null
    date: Date | null
    marks_scored: number | null
    total_marks: number | null
    teacherId: number | null
    studentId: number | null
  }

  export type Test_TuitionCountAggregateOutputType = {
    id: number
    name: number
    syllabus: number
    date: number
    marks_scored: number
    total_marks: number
    teacherId: number
    studentId: number
    _all: number
  }


  export type Test_TuitionAvgAggregateInputType = {
    id?: true
    marks_scored?: true
    total_marks?: true
    teacherId?: true
    studentId?: true
  }

  export type Test_TuitionSumAggregateInputType = {
    id?: true
    marks_scored?: true
    total_marks?: true
    teacherId?: true
    studentId?: true
  }

  export type Test_TuitionMinAggregateInputType = {
    id?: true
    name?: true
    syllabus?: true
    date?: true
    marks_scored?: true
    total_marks?: true
    teacherId?: true
    studentId?: true
  }

  export type Test_TuitionMaxAggregateInputType = {
    id?: true
    name?: true
    syllabus?: true
    date?: true
    marks_scored?: true
    total_marks?: true
    teacherId?: true
    studentId?: true
  }

  export type Test_TuitionCountAggregateInputType = {
    id?: true
    name?: true
    syllabus?: true
    date?: true
    marks_scored?: true
    total_marks?: true
    teacherId?: true
    studentId?: true
    _all?: true
  }

  export type Test_TuitionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Test_Tuition to aggregate.
     */
    where?: Test_TuitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Test_Tuitions to fetch.
     */
    orderBy?: Test_TuitionOrderByWithRelationInput | Test_TuitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Test_TuitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Test_Tuitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Test_Tuitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Test_Tuitions
    **/
    _count?: true | Test_TuitionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Test_TuitionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Test_TuitionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Test_TuitionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Test_TuitionMaxAggregateInputType
  }

  export type GetTest_TuitionAggregateType<T extends Test_TuitionAggregateArgs> = {
        [P in keyof T & keyof AggregateTest_Tuition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTest_Tuition[P]>
      : GetScalarType<T[P], AggregateTest_Tuition[P]>
  }




  export type Test_TuitionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Test_TuitionWhereInput
    orderBy?: Test_TuitionOrderByWithAggregationInput | Test_TuitionOrderByWithAggregationInput[]
    by: Test_TuitionScalarFieldEnum[] | Test_TuitionScalarFieldEnum
    having?: Test_TuitionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Test_TuitionCountAggregateInputType | true
    _avg?: Test_TuitionAvgAggregateInputType
    _sum?: Test_TuitionSumAggregateInputType
    _min?: Test_TuitionMinAggregateInputType
    _max?: Test_TuitionMaxAggregateInputType
  }

  export type Test_TuitionGroupByOutputType = {
    id: number
    name: string
    syllabus: string
    date: Date
    marks_scored: number
    total_marks: number
    teacherId: number
    studentId: number
    _count: Test_TuitionCountAggregateOutputType | null
    _avg: Test_TuitionAvgAggregateOutputType | null
    _sum: Test_TuitionSumAggregateOutputType | null
    _min: Test_TuitionMinAggregateOutputType | null
    _max: Test_TuitionMaxAggregateOutputType | null
  }

  type GetTest_TuitionGroupByPayload<T extends Test_TuitionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Test_TuitionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Test_TuitionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Test_TuitionGroupByOutputType[P]>
            : GetScalarType<T[P], Test_TuitionGroupByOutputType[P]>
        }
      >
    >


  export type Test_TuitionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    syllabus?: boolean
    date?: boolean
    marks_scored?: boolean
    total_marks?: boolean
    teacherId?: boolean
    studentId?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test_Tuition"]>

  export type Test_TuitionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    syllabus?: boolean
    date?: boolean
    marks_scored?: boolean
    total_marks?: boolean
    teacherId?: boolean
    studentId?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test_Tuition"]>

  export type Test_TuitionSelectScalar = {
    id?: boolean
    name?: boolean
    syllabus?: boolean
    date?: boolean
    marks_scored?: boolean
    total_marks?: boolean
    teacherId?: boolean
    studentId?: boolean
  }

  export type Test_TuitionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type Test_TuitionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $Test_TuitionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Test_Tuition"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs>
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      syllabus: string
      date: Date
      marks_scored: number
      total_marks: number
      teacherId: number
      studentId: number
    }, ExtArgs["result"]["test_Tuition"]>
    composites: {}
  }

  type Test_TuitionGetPayload<S extends boolean | null | undefined | Test_TuitionDefaultArgs> = $Result.GetResult<Prisma.$Test_TuitionPayload, S>

  type Test_TuitionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<Test_TuitionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Test_TuitionCountAggregateInputType | true
    }

  export interface Test_TuitionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Test_Tuition'], meta: { name: 'Test_Tuition' } }
    /**
     * Find zero or one Test_Tuition that matches the filter.
     * @param {Test_TuitionFindUniqueArgs} args - Arguments to find a Test_Tuition
     * @example
     * // Get one Test_Tuition
     * const test_Tuition = await prisma.test_Tuition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Test_TuitionFindUniqueArgs>(args: SelectSubset<T, Test_TuitionFindUniqueArgs<ExtArgs>>): Prisma__Test_TuitionClient<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Test_Tuition that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {Test_TuitionFindUniqueOrThrowArgs} args - Arguments to find a Test_Tuition
     * @example
     * // Get one Test_Tuition
     * const test_Tuition = await prisma.test_Tuition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Test_TuitionFindUniqueOrThrowArgs>(args: SelectSubset<T, Test_TuitionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Test_TuitionClient<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Test_Tuition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_TuitionFindFirstArgs} args - Arguments to find a Test_Tuition
     * @example
     * // Get one Test_Tuition
     * const test_Tuition = await prisma.test_Tuition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Test_TuitionFindFirstArgs>(args?: SelectSubset<T, Test_TuitionFindFirstArgs<ExtArgs>>): Prisma__Test_TuitionClient<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Test_Tuition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_TuitionFindFirstOrThrowArgs} args - Arguments to find a Test_Tuition
     * @example
     * // Get one Test_Tuition
     * const test_Tuition = await prisma.test_Tuition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Test_TuitionFindFirstOrThrowArgs>(args?: SelectSubset<T, Test_TuitionFindFirstOrThrowArgs<ExtArgs>>): Prisma__Test_TuitionClient<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Test_Tuitions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_TuitionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Test_Tuitions
     * const test_Tuitions = await prisma.test_Tuition.findMany()
     * 
     * // Get first 10 Test_Tuitions
     * const test_Tuitions = await prisma.test_Tuition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const test_TuitionWithIdOnly = await prisma.test_Tuition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Test_TuitionFindManyArgs>(args?: SelectSubset<T, Test_TuitionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Test_Tuition.
     * @param {Test_TuitionCreateArgs} args - Arguments to create a Test_Tuition.
     * @example
     * // Create one Test_Tuition
     * const Test_Tuition = await prisma.test_Tuition.create({
     *   data: {
     *     // ... data to create a Test_Tuition
     *   }
     * })
     * 
     */
    create<T extends Test_TuitionCreateArgs>(args: SelectSubset<T, Test_TuitionCreateArgs<ExtArgs>>): Prisma__Test_TuitionClient<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Test_Tuitions.
     * @param {Test_TuitionCreateManyArgs} args - Arguments to create many Test_Tuitions.
     * @example
     * // Create many Test_Tuitions
     * const test_Tuition = await prisma.test_Tuition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Test_TuitionCreateManyArgs>(args?: SelectSubset<T, Test_TuitionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Test_Tuitions and returns the data saved in the database.
     * @param {Test_TuitionCreateManyAndReturnArgs} args - Arguments to create many Test_Tuitions.
     * @example
     * // Create many Test_Tuitions
     * const test_Tuition = await prisma.test_Tuition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Test_Tuitions and only return the `id`
     * const test_TuitionWithIdOnly = await prisma.test_Tuition.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Test_TuitionCreateManyAndReturnArgs>(args?: SelectSubset<T, Test_TuitionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Test_Tuition.
     * @param {Test_TuitionDeleteArgs} args - Arguments to delete one Test_Tuition.
     * @example
     * // Delete one Test_Tuition
     * const Test_Tuition = await prisma.test_Tuition.delete({
     *   where: {
     *     // ... filter to delete one Test_Tuition
     *   }
     * })
     * 
     */
    delete<T extends Test_TuitionDeleteArgs>(args: SelectSubset<T, Test_TuitionDeleteArgs<ExtArgs>>): Prisma__Test_TuitionClient<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Test_Tuition.
     * @param {Test_TuitionUpdateArgs} args - Arguments to update one Test_Tuition.
     * @example
     * // Update one Test_Tuition
     * const test_Tuition = await prisma.test_Tuition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Test_TuitionUpdateArgs>(args: SelectSubset<T, Test_TuitionUpdateArgs<ExtArgs>>): Prisma__Test_TuitionClient<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Test_Tuitions.
     * @param {Test_TuitionDeleteManyArgs} args - Arguments to filter Test_Tuitions to delete.
     * @example
     * // Delete a few Test_Tuitions
     * const { count } = await prisma.test_Tuition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Test_TuitionDeleteManyArgs>(args?: SelectSubset<T, Test_TuitionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Test_Tuitions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_TuitionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Test_Tuitions
     * const test_Tuition = await prisma.test_Tuition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Test_TuitionUpdateManyArgs>(args: SelectSubset<T, Test_TuitionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Test_Tuition.
     * @param {Test_TuitionUpsertArgs} args - Arguments to update or create a Test_Tuition.
     * @example
     * // Update or create a Test_Tuition
     * const test_Tuition = await prisma.test_Tuition.upsert({
     *   create: {
     *     // ... data to create a Test_Tuition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Test_Tuition we want to update
     *   }
     * })
     */
    upsert<T extends Test_TuitionUpsertArgs>(args: SelectSubset<T, Test_TuitionUpsertArgs<ExtArgs>>): Prisma__Test_TuitionClient<$Result.GetResult<Prisma.$Test_TuitionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Test_Tuitions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_TuitionCountArgs} args - Arguments to filter Test_Tuitions to count.
     * @example
     * // Count the number of Test_Tuitions
     * const count = await prisma.test_Tuition.count({
     *   where: {
     *     // ... the filter for the Test_Tuitions we want to count
     *   }
     * })
    **/
    count<T extends Test_TuitionCountArgs>(
      args?: Subset<T, Test_TuitionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Test_TuitionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Test_Tuition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_TuitionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Test_TuitionAggregateArgs>(args: Subset<T, Test_TuitionAggregateArgs>): Prisma.PrismaPromise<GetTest_TuitionAggregateType<T>>

    /**
     * Group by Test_Tuition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_TuitionGroupByArgs} args - Group by arguments.
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
      T extends Test_TuitionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Test_TuitionGroupByArgs['orderBy'] }
        : { orderBy?: Test_TuitionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
        }[OrderFields]
    >(args: SubsetIntersection<T, Test_TuitionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTest_TuitionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Test_Tuition model
   */
  readonly fields: Test_TuitionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Test_Tuition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Test_TuitionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Test_Tuition model
   */ 
  interface Test_TuitionFieldRefs {
    readonly id: FieldRef<"Test_Tuition", 'Int'>
    readonly name: FieldRef<"Test_Tuition", 'String'>
    readonly syllabus: FieldRef<"Test_Tuition", 'String'>
    readonly date: FieldRef<"Test_Tuition", 'DateTime'>
    readonly marks_scored: FieldRef<"Test_Tuition", 'Int'>
    readonly total_marks: FieldRef<"Test_Tuition", 'Int'>
    readonly teacherId: FieldRef<"Test_Tuition", 'Int'>
    readonly studentId: FieldRef<"Test_Tuition", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Test_Tuition findUnique
   */
  export type Test_TuitionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    /**
     * Filter, which Test_Tuition to fetch.
     */
    where: Test_TuitionWhereUniqueInput
  }

  /**
   * Test_Tuition findUniqueOrThrow
   */
  export type Test_TuitionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    /**
     * Filter, which Test_Tuition to fetch.
     */
    where: Test_TuitionWhereUniqueInput
  }

  /**
   * Test_Tuition findFirst
   */
  export type Test_TuitionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    /**
     * Filter, which Test_Tuition to fetch.
     */
    where?: Test_TuitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Test_Tuitions to fetch.
     */
    orderBy?: Test_TuitionOrderByWithRelationInput | Test_TuitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Test_Tuitions.
     */
    cursor?: Test_TuitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Test_Tuitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Test_Tuitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Test_Tuitions.
     */
    distinct?: Test_TuitionScalarFieldEnum | Test_TuitionScalarFieldEnum[]
  }

  /**
   * Test_Tuition findFirstOrThrow
   */
  export type Test_TuitionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    /**
     * Filter, which Test_Tuition to fetch.
     */
    where?: Test_TuitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Test_Tuitions to fetch.
     */
    orderBy?: Test_TuitionOrderByWithRelationInput | Test_TuitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Test_Tuitions.
     */
    cursor?: Test_TuitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Test_Tuitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Test_Tuitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Test_Tuitions.
     */
    distinct?: Test_TuitionScalarFieldEnum | Test_TuitionScalarFieldEnum[]
  }

  /**
   * Test_Tuition findMany
   */
  export type Test_TuitionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    /**
     * Filter, which Test_Tuitions to fetch.
     */
    where?: Test_TuitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Test_Tuitions to fetch.
     */
    orderBy?: Test_TuitionOrderByWithRelationInput | Test_TuitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Test_Tuitions.
     */
    cursor?: Test_TuitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Test_Tuitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Test_Tuitions.
     */
    skip?: number
    distinct?: Test_TuitionScalarFieldEnum | Test_TuitionScalarFieldEnum[]
  }

  /**
   * Test_Tuition create
   */
  export type Test_TuitionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    /**
     * The data needed to create a Test_Tuition.
     */
    data: XOR<Test_TuitionCreateInput, Test_TuitionUncheckedCreateInput>
  }

  /**
   * Test_Tuition createMany
   */
  export type Test_TuitionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Test_Tuitions.
     */
    data: Test_TuitionCreateManyInput | Test_TuitionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Test_Tuition createManyAndReturn
   */
  export type Test_TuitionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Test_Tuitions.
     */
    data: Test_TuitionCreateManyInput | Test_TuitionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Test_Tuition update
   */
  export type Test_TuitionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    /**
     * The data needed to update a Test_Tuition.
     */
    data: XOR<Test_TuitionUpdateInput, Test_TuitionUncheckedUpdateInput>
    /**
     * Choose, which Test_Tuition to update.
     */
    where: Test_TuitionWhereUniqueInput
  }

  /**
   * Test_Tuition updateMany
   */
  export type Test_TuitionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Test_Tuitions.
     */
    data: XOR<Test_TuitionUpdateManyMutationInput, Test_TuitionUncheckedUpdateManyInput>
    /**
     * Filter which Test_Tuitions to update
     */
    where?: Test_TuitionWhereInput
  }

  /**
   * Test_Tuition upsert
   */
  export type Test_TuitionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    /**
     * The filter to search for the Test_Tuition to update in case it exists.
     */
    where: Test_TuitionWhereUniqueInput
    /**
     * In case the Test_Tuition found by the `where` argument doesn't exist, create a new Test_Tuition with this data.
     */
    create: XOR<Test_TuitionCreateInput, Test_TuitionUncheckedCreateInput>
    /**
     * In case the Test_Tuition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Test_TuitionUpdateInput, Test_TuitionUncheckedUpdateInput>
  }

  /**
   * Test_Tuition delete
   */
  export type Test_TuitionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
    /**
     * Filter which Test_Tuition to delete.
     */
    where: Test_TuitionWhereUniqueInput
  }

  /**
   * Test_Tuition deleteMany
   */
  export type Test_TuitionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Test_Tuitions to delete
     */
    where?: Test_TuitionWhereInput
  }

  /**
   * Test_Tuition without action
   */
  export type Test_TuitionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_Tuition
     */
    select?: Test_TuitionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_TuitionInclude<ExtArgs> | null
  }


  /**
   * Model Test_School
   */

  export type AggregateTest_School = {
    _count: Test_SchoolCountAggregateOutputType | null
    _avg: Test_SchoolAvgAggregateOutputType | null
    _sum: Test_SchoolSumAggregateOutputType | null
    _min: Test_SchoolMinAggregateOutputType | null
    _max: Test_SchoolMaxAggregateOutputType | null
  }

  export type Test_SchoolAvgAggregateOutputType = {
    id: number | null
    marks_scored: number | null
    total_marks: number | null
    studentId: number | null
  }

  export type Test_SchoolSumAggregateOutputType = {
    id: number | null
    marks_scored: number | null
    total_marks: number | null
    studentId: number | null
  }

  export type Test_SchoolMinAggregateOutputType = {
    id: number | null
    name: string | null
    syllabus: string | null
    date: Date | null
    marks_scored: number | null
    total_marks: number | null
    test_status: boolean | null
    studentId: number | null
  }

  export type Test_SchoolMaxAggregateOutputType = {
    id: number | null
    name: string | null
    syllabus: string | null
    date: Date | null
    marks_scored: number | null
    total_marks: number | null
    test_status: boolean | null
    studentId: number | null
  }

  export type Test_SchoolCountAggregateOutputType = {
    id: number
    name: number
    syllabus: number
    date: number
    marks_scored: number
    total_marks: number
    test_status: number
    studentId: number
    _all: number
  }


  export type Test_SchoolAvgAggregateInputType = {
    id?: true
    marks_scored?: true
    total_marks?: true
    studentId?: true
  }

  export type Test_SchoolSumAggregateInputType = {
    id?: true
    marks_scored?: true
    total_marks?: true
    studentId?: true
  }

  export type Test_SchoolMinAggregateInputType = {
    id?: true
    name?: true
    syllabus?: true
    date?: true
    marks_scored?: true
    total_marks?: true
    test_status?: true
    studentId?: true
  }

  export type Test_SchoolMaxAggregateInputType = {
    id?: true
    name?: true
    syllabus?: true
    date?: true
    marks_scored?: true
    total_marks?: true
    test_status?: true
    studentId?: true
  }

  export type Test_SchoolCountAggregateInputType = {
    id?: true
    name?: true
    syllabus?: true
    date?: true
    marks_scored?: true
    total_marks?: true
    test_status?: true
    studentId?: true
    _all?: true
  }

  export type Test_SchoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Test_School to aggregate.
     */
    where?: Test_SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Test_Schools to fetch.
     */
    orderBy?: Test_SchoolOrderByWithRelationInput | Test_SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Test_SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Test_Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Test_Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Test_Schools
    **/
    _count?: true | Test_SchoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Test_SchoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Test_SchoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Test_SchoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Test_SchoolMaxAggregateInputType
  }

  export type GetTest_SchoolAggregateType<T extends Test_SchoolAggregateArgs> = {
        [P in keyof T & keyof AggregateTest_School]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTest_School[P]>
      : GetScalarType<T[P], AggregateTest_School[P]>
  }




  export type Test_SchoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Test_SchoolWhereInput
    orderBy?: Test_SchoolOrderByWithAggregationInput | Test_SchoolOrderByWithAggregationInput[]
    by: Test_SchoolScalarFieldEnum[] | Test_SchoolScalarFieldEnum
    having?: Test_SchoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Test_SchoolCountAggregateInputType | true
    _avg?: Test_SchoolAvgAggregateInputType
    _sum?: Test_SchoolSumAggregateInputType
    _min?: Test_SchoolMinAggregateInputType
    _max?: Test_SchoolMaxAggregateInputType
  }

  export type Test_SchoolGroupByOutputType = {
    id: number
    name: string
    syllabus: string
    date: Date
    marks_scored: number
    total_marks: number
    test_status: boolean
    studentId: number
    _count: Test_SchoolCountAggregateOutputType | null
    _avg: Test_SchoolAvgAggregateOutputType | null
    _sum: Test_SchoolSumAggregateOutputType | null
    _min: Test_SchoolMinAggregateOutputType | null
    _max: Test_SchoolMaxAggregateOutputType | null
  }

  type GetTest_SchoolGroupByPayload<T extends Test_SchoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Test_SchoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Test_SchoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Test_SchoolGroupByOutputType[P]>
            : GetScalarType<T[P], Test_SchoolGroupByOutputType[P]>
        }
      >
    >


  export type Test_SchoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    syllabus?: boolean
    date?: boolean
    marks_scored?: boolean
    total_marks?: boolean
    test_status?: boolean
    studentId?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test_School"]>

  export type Test_SchoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    syllabus?: boolean
    date?: boolean
    marks_scored?: boolean
    total_marks?: boolean
    test_status?: boolean
    studentId?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test_School"]>

  export type Test_SchoolSelectScalar = {
    id?: boolean
    name?: boolean
    syllabus?: boolean
    date?: boolean
    marks_scored?: boolean
    total_marks?: boolean
    test_status?: boolean
    studentId?: boolean
  }

  export type Test_SchoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type Test_SchoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $Test_SchoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Test_School"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      syllabus: string
      date: Date
      marks_scored: number
      total_marks: number
      test_status: boolean
      studentId: number
    }, ExtArgs["result"]["test_School"]>
    composites: {}
  }

  type Test_SchoolGetPayload<S extends boolean | null | undefined | Test_SchoolDefaultArgs> = $Result.GetResult<Prisma.$Test_SchoolPayload, S>

  type Test_SchoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<Test_SchoolFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Test_SchoolCountAggregateInputType | true
    }

  export interface Test_SchoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Test_School'], meta: { name: 'Test_School' } }
    /**
     * Find zero or one Test_School that matches the filter.
     * @param {Test_SchoolFindUniqueArgs} args - Arguments to find a Test_School
     * @example
     * // Get one Test_School
     * const test_School = await prisma.test_School.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Test_SchoolFindUniqueArgs>(args: SelectSubset<T, Test_SchoolFindUniqueArgs<ExtArgs>>): Prisma__Test_SchoolClient<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Test_School that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {Test_SchoolFindUniqueOrThrowArgs} args - Arguments to find a Test_School
     * @example
     * // Get one Test_School
     * const test_School = await prisma.test_School.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Test_SchoolFindUniqueOrThrowArgs>(args: SelectSubset<T, Test_SchoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Test_SchoolClient<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Test_School that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_SchoolFindFirstArgs} args - Arguments to find a Test_School
     * @example
     * // Get one Test_School
     * const test_School = await prisma.test_School.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Test_SchoolFindFirstArgs>(args?: SelectSubset<T, Test_SchoolFindFirstArgs<ExtArgs>>): Prisma__Test_SchoolClient<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Test_School that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_SchoolFindFirstOrThrowArgs} args - Arguments to find a Test_School
     * @example
     * // Get one Test_School
     * const test_School = await prisma.test_School.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Test_SchoolFindFirstOrThrowArgs>(args?: SelectSubset<T, Test_SchoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__Test_SchoolClient<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Test_Schools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_SchoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Test_Schools
     * const test_Schools = await prisma.test_School.findMany()
     * 
     * // Get first 10 Test_Schools
     * const test_Schools = await prisma.test_School.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const test_SchoolWithIdOnly = await prisma.test_School.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Test_SchoolFindManyArgs>(args?: SelectSubset<T, Test_SchoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Test_School.
     * @param {Test_SchoolCreateArgs} args - Arguments to create a Test_School.
     * @example
     * // Create one Test_School
     * const Test_School = await prisma.test_School.create({
     *   data: {
     *     // ... data to create a Test_School
     *   }
     * })
     * 
     */
    create<T extends Test_SchoolCreateArgs>(args: SelectSubset<T, Test_SchoolCreateArgs<ExtArgs>>): Prisma__Test_SchoolClient<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Test_Schools.
     * @param {Test_SchoolCreateManyArgs} args - Arguments to create many Test_Schools.
     * @example
     * // Create many Test_Schools
     * const test_School = await prisma.test_School.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Test_SchoolCreateManyArgs>(args?: SelectSubset<T, Test_SchoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Test_Schools and returns the data saved in the database.
     * @param {Test_SchoolCreateManyAndReturnArgs} args - Arguments to create many Test_Schools.
     * @example
     * // Create many Test_Schools
     * const test_School = await prisma.test_School.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Test_Schools and only return the `id`
     * const test_SchoolWithIdOnly = await prisma.test_School.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Test_SchoolCreateManyAndReturnArgs>(args?: SelectSubset<T, Test_SchoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Test_School.
     * @param {Test_SchoolDeleteArgs} args - Arguments to delete one Test_School.
     * @example
     * // Delete one Test_School
     * const Test_School = await prisma.test_School.delete({
     *   where: {
     *     // ... filter to delete one Test_School
     *   }
     * })
     * 
     */
    delete<T extends Test_SchoolDeleteArgs>(args: SelectSubset<T, Test_SchoolDeleteArgs<ExtArgs>>): Prisma__Test_SchoolClient<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Test_School.
     * @param {Test_SchoolUpdateArgs} args - Arguments to update one Test_School.
     * @example
     * // Update one Test_School
     * const test_School = await prisma.test_School.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Test_SchoolUpdateArgs>(args: SelectSubset<T, Test_SchoolUpdateArgs<ExtArgs>>): Prisma__Test_SchoolClient<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Test_Schools.
     * @param {Test_SchoolDeleteManyArgs} args - Arguments to filter Test_Schools to delete.
     * @example
     * // Delete a few Test_Schools
     * const { count } = await prisma.test_School.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Test_SchoolDeleteManyArgs>(args?: SelectSubset<T, Test_SchoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Test_Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_SchoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Test_Schools
     * const test_School = await prisma.test_School.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Test_SchoolUpdateManyArgs>(args: SelectSubset<T, Test_SchoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Test_School.
     * @param {Test_SchoolUpsertArgs} args - Arguments to update or create a Test_School.
     * @example
     * // Update or create a Test_School
     * const test_School = await prisma.test_School.upsert({
     *   create: {
     *     // ... data to create a Test_School
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Test_School we want to update
     *   }
     * })
     */
    upsert<T extends Test_SchoolUpsertArgs>(args: SelectSubset<T, Test_SchoolUpsertArgs<ExtArgs>>): Prisma__Test_SchoolClient<$Result.GetResult<Prisma.$Test_SchoolPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Test_Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_SchoolCountArgs} args - Arguments to filter Test_Schools to count.
     * @example
     * // Count the number of Test_Schools
     * const count = await prisma.test_School.count({
     *   where: {
     *     // ... the filter for the Test_Schools we want to count
     *   }
     * })
    **/
    count<T extends Test_SchoolCountArgs>(
      args?: Subset<T, Test_SchoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Test_SchoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Test_School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_SchoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Test_SchoolAggregateArgs>(args: Subset<T, Test_SchoolAggregateArgs>): Prisma.PrismaPromise<GetTest_SchoolAggregateType<T>>

    /**
     * Group by Test_School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Test_SchoolGroupByArgs} args - Group by arguments.
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
      T extends Test_SchoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Test_SchoolGroupByArgs['orderBy'] }
        : { orderBy?: Test_SchoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
        }[OrderFields]
    >(args: SubsetIntersection<T, Test_SchoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTest_SchoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Test_School model
   */
  readonly fields: Test_SchoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Test_School.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Test_SchoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Test_School model
   */ 
  interface Test_SchoolFieldRefs {
    readonly id: FieldRef<"Test_School", 'Int'>
    readonly name: FieldRef<"Test_School", 'String'>
    readonly syllabus: FieldRef<"Test_School", 'String'>
    readonly date: FieldRef<"Test_School", 'DateTime'>
    readonly marks_scored: FieldRef<"Test_School", 'Int'>
    readonly total_marks: FieldRef<"Test_School", 'Int'>
    readonly test_status: FieldRef<"Test_School", 'Boolean'>
    readonly studentId: FieldRef<"Test_School", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Test_School findUnique
   */
  export type Test_SchoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Test_School to fetch.
     */
    where: Test_SchoolWhereUniqueInput
  }

  /**
   * Test_School findUniqueOrThrow
   */
  export type Test_SchoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Test_School to fetch.
     */
    where: Test_SchoolWhereUniqueInput
  }

  /**
   * Test_School findFirst
   */
  export type Test_SchoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Test_School to fetch.
     */
    where?: Test_SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Test_Schools to fetch.
     */
    orderBy?: Test_SchoolOrderByWithRelationInput | Test_SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Test_Schools.
     */
    cursor?: Test_SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Test_Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Test_Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Test_Schools.
     */
    distinct?: Test_SchoolScalarFieldEnum | Test_SchoolScalarFieldEnum[]
  }

  /**
   * Test_School findFirstOrThrow
   */
  export type Test_SchoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Test_School to fetch.
     */
    where?: Test_SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Test_Schools to fetch.
     */
    orderBy?: Test_SchoolOrderByWithRelationInput | Test_SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Test_Schools.
     */
    cursor?: Test_SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Test_Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Test_Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Test_Schools.
     */
    distinct?: Test_SchoolScalarFieldEnum | Test_SchoolScalarFieldEnum[]
  }

  /**
   * Test_School findMany
   */
  export type Test_SchoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Test_Schools to fetch.
     */
    where?: Test_SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Test_Schools to fetch.
     */
    orderBy?: Test_SchoolOrderByWithRelationInput | Test_SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Test_Schools.
     */
    cursor?: Test_SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Test_Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Test_Schools.
     */
    skip?: number
    distinct?: Test_SchoolScalarFieldEnum | Test_SchoolScalarFieldEnum[]
  }

  /**
   * Test_School create
   */
  export type Test_SchoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
    /**
     * The data needed to create a Test_School.
     */
    data: XOR<Test_SchoolCreateInput, Test_SchoolUncheckedCreateInput>
  }

  /**
   * Test_School createMany
   */
  export type Test_SchoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Test_Schools.
     */
    data: Test_SchoolCreateManyInput | Test_SchoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Test_School createManyAndReturn
   */
  export type Test_SchoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Test_Schools.
     */
    data: Test_SchoolCreateManyInput | Test_SchoolCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Test_School update
   */
  export type Test_SchoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
    /**
     * The data needed to update a Test_School.
     */
    data: XOR<Test_SchoolUpdateInput, Test_SchoolUncheckedUpdateInput>
    /**
     * Choose, which Test_School to update.
     */
    where: Test_SchoolWhereUniqueInput
  }

  /**
   * Test_School updateMany
   */
  export type Test_SchoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Test_Schools.
     */
    data: XOR<Test_SchoolUpdateManyMutationInput, Test_SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Test_Schools to update
     */
    where?: Test_SchoolWhereInput
  }

  /**
   * Test_School upsert
   */
  export type Test_SchoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
    /**
     * The filter to search for the Test_School to update in case it exists.
     */
    where: Test_SchoolWhereUniqueInput
    /**
     * In case the Test_School found by the `where` argument doesn't exist, create a new Test_School with this data.
     */
    create: XOR<Test_SchoolCreateInput, Test_SchoolUncheckedCreateInput>
    /**
     * In case the Test_School was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Test_SchoolUpdateInput, Test_SchoolUncheckedUpdateInput>
  }

  /**
   * Test_School delete
   */
  export type Test_SchoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
    /**
     * Filter which Test_School to delete.
     */
    where: Test_SchoolWhereUniqueInput
  }

  /**
   * Test_School deleteMany
   */
  export type Test_SchoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Test_Schools to delete
     */
    where?: Test_SchoolWhereInput
  }

  /**
   * Test_School without action
   */
  export type Test_SchoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test_School
     */
    select?: Test_SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Test_SchoolInclude<ExtArgs> | null
  }


  /**
   * Model Schedule
   */

  export type AggregateSchedule = {
    _count: ScheduleCountAggregateOutputType | null
    _avg: ScheduleAvgAggregateOutputType | null
    _sum: ScheduleSumAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  export type ScheduleAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    day: number | null
    slot: number | null
  }

  export type ScheduleSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    day: number | null
    slot: number | null
  }

  export type ScheduleMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    day: number | null
    slot: number | null
    createdAt: Date | null
  }

  export type ScheduleMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    day: number | null
    slot: number | null
    createdAt: Date | null
  }

  export type ScheduleCountAggregateOutputType = {
    id: number
    studentId: number
    day: number
    slot: number
    createdAt: number
    _all: number
  }


  export type ScheduleAvgAggregateInputType = {
    id?: true
    studentId?: true
    day?: true
    slot?: true
  }

  export type ScheduleSumAggregateInputType = {
    id?: true
    studentId?: true
    day?: true
    slot?: true
  }

  export type ScheduleMinAggregateInputType = {
    id?: true
    studentId?: true
    day?: true
    slot?: true
    createdAt?: true
  }

  export type ScheduleMaxAggregateInputType = {
    id?: true
    studentId?: true
    day?: true
    slot?: true
    createdAt?: true
  }

  export type ScheduleCountAggregateInputType = {
    id?: true
    studentId?: true
    day?: true
    slot?: true
    createdAt?: true
    _all?: true
  }

  export type ScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedule to aggregate.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schedules
    **/
    _count?: true | ScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleMaxAggregateInputType
  }

  export type GetScheduleAggregateType<T extends ScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule[P]>
      : GetScalarType<T[P], AggregateSchedule[P]>
  }




  export type ScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithAggregationInput | ScheduleOrderByWithAggregationInput[]
    by: ScheduleScalarFieldEnum[] | ScheduleScalarFieldEnum
    having?: ScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleCountAggregateInputType | true
    _avg?: ScheduleAvgAggregateInputType
    _sum?: ScheduleSumAggregateInputType
    _min?: ScheduleMinAggregateInputType
    _max?: ScheduleMaxAggregateInputType
  }

  export type ScheduleGroupByOutputType = {
    id: number
    studentId: number
    day: number
    slot: number
    createdAt: Date
    _count: ScheduleCountAggregateOutputType | null
    _avg: ScheduleAvgAggregateOutputType | null
    _sum: ScheduleSumAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  type GetScheduleGroupByPayload<T extends ScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    day?: boolean
    slot?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    day?: boolean
    slot?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectScalar = {
    id?: boolean
    studentId?: boolean
    day?: boolean
    slot?: boolean
    createdAt?: boolean
  }

  export type ScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type ScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $SchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Schedule"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      day: number
      slot: number
      createdAt: Date
    }, ExtArgs["result"]["schedule"]>
    composites: {}
  }

  type ScheduleGetPayload<S extends boolean | null | undefined | ScheduleDefaultArgs> = $Result.GetResult<Prisma.$SchedulePayload, S>

  type ScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ScheduleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ScheduleCountAggregateInputType | true
    }

  export interface ScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Schedule'], meta: { name: 'Schedule' } }
    /**
     * Find zero or one Schedule that matches the filter.
     * @param {ScheduleFindUniqueArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleFindUniqueArgs>(args: SelectSubset<T, ScheduleFindUniqueArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Schedule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ScheduleFindUniqueOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Schedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleFindFirstArgs>(args?: SelectSubset<T, ScheduleFindFirstArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Schedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Schedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedules
     * const schedules = await prisma.schedule.findMany()
     * 
     * // Get first 10 Schedules
     * const schedules = await prisma.schedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleWithIdOnly = await prisma.schedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleFindManyArgs>(args?: SelectSubset<T, ScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Schedule.
     * @param {ScheduleCreateArgs} args - Arguments to create a Schedule.
     * @example
     * // Create one Schedule
     * const Schedule = await prisma.schedule.create({
     *   data: {
     *     // ... data to create a Schedule
     *   }
     * })
     * 
     */
    create<T extends ScheduleCreateArgs>(args: SelectSubset<T, ScheduleCreateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Schedules.
     * @param {ScheduleCreateManyArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleCreateManyArgs>(args?: SelectSubset<T, ScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schedules and returns the data saved in the database.
     * @param {ScheduleCreateManyAndReturnArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Schedule.
     * @param {ScheduleDeleteArgs} args - Arguments to delete one Schedule.
     * @example
     * // Delete one Schedule
     * const Schedule = await prisma.schedule.delete({
     *   where: {
     *     // ... filter to delete one Schedule
     *   }
     * })
     * 
     */
    delete<T extends ScheduleDeleteArgs>(args: SelectSubset<T, ScheduleDeleteArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Schedule.
     * @param {ScheduleUpdateArgs} args - Arguments to update one Schedule.
     * @example
     * // Update one Schedule
     * const schedule = await prisma.schedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleUpdateArgs>(args: SelectSubset<T, ScheduleUpdateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Schedules.
     * @param {ScheduleDeleteManyArgs} args - Arguments to filter Schedules to delete.
     * @example
     * // Delete a few Schedules
     * const { count } = await prisma.schedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleDeleteManyArgs>(args?: SelectSubset<T, ScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleUpdateManyArgs>(args: SelectSubset<T, ScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Schedule.
     * @param {ScheduleUpsertArgs} args - Arguments to update or create a Schedule.
     * @example
     * // Update or create a Schedule
     * const schedule = await prisma.schedule.upsert({
     *   create: {
     *     // ... data to create a Schedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleUpsertArgs>(args: SelectSubset<T, ScheduleUpsertArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleCountArgs} args - Arguments to filter Schedules to count.
     * @example
     * // Count the number of Schedules
     * const count = await prisma.schedule.count({
     *   where: {
     *     // ... the filter for the Schedules we want to count
     *   }
     * })
    **/
    count<T extends ScheduleCountArgs>(
      args?: Subset<T, ScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScheduleAggregateArgs>(args: Subset<T, ScheduleAggregateArgs>): Prisma.PrismaPromise<GetScheduleAggregateType<T>>

    /**
     * Group by Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleGroupByArgs} args - Group by arguments.
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
      T extends ScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Schedule model
   */
  readonly fields: ScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Schedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Schedule model
   */ 
  interface ScheduleFieldRefs {
    readonly id: FieldRef<"Schedule", 'Int'>
    readonly studentId: FieldRef<"Schedule", 'Int'>
    readonly day: FieldRef<"Schedule", 'Int'>
    readonly slot: FieldRef<"Schedule", 'Int'>
    readonly createdAt: FieldRef<"Schedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Schedule findUnique
   */
  export type ScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findUniqueOrThrow
   */
  export type ScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findFirst
   */
  export type ScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findFirstOrThrow
   */
  export type ScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findMany
   */
  export type ScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedules to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule create
   */
  export type ScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a Schedule.
     */
    data: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
  }

  /**
   * Schedule createMany
   */
  export type ScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Schedule createManyAndReturn
   */
  export type ScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule update
   */
  export type ScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a Schedule.
     */
    data: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
    /**
     * Choose, which Schedule to update.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule updateMany
   */
  export type ScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
  }

  /**
   * Schedule upsert
   */
  export type ScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the Schedule to update in case it exists.
     */
    where: ScheduleWhereUniqueInput
    /**
     * In case the Schedule found by the `where` argument doesn't exist, create a new Schedule with this data.
     */
    create: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
    /**
     * In case the Schedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
  }

  /**
   * Schedule delete
   */
  export type ScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter which Schedule to delete.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule deleteMany
   */
  export type ScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedules to delete
     */
    where?: ScheduleWhereInput
  }

  /**
   * Schedule without action
   */
  export type ScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
  }


  /**
   * Model Slot
   */

  export type AggregateSlot = {
    _count: SlotCountAggregateOutputType | null
    _avg: SlotAvgAggregateOutputType | null
    _sum: SlotSumAggregateOutputType | null
    _min: SlotMinAggregateOutputType | null
    _max: SlotMaxAggregateOutputType | null
  }

  export type SlotAvgAggregateOutputType = {
    id: number | null
    day: number | null
    slot_number: number | null
  }

  export type SlotSumAggregateOutputType = {
    id: number | null
    day: number | null
    slot_number: number | null
  }

  export type SlotMinAggregateOutputType = {
    id: number | null
    day: number | null
    slot_number: number | null
    start_time: string | null
    end_time: string | null
  }

  export type SlotMaxAggregateOutputType = {
    id: number | null
    day: number | null
    slot_number: number | null
    start_time: string | null
    end_time: string | null
  }

  export type SlotCountAggregateOutputType = {
    id: number
    day: number
    slot_number: number
    start_time: number
    end_time: number
    _all: number
  }


  export type SlotAvgAggregateInputType = {
    id?: true
    day?: true
    slot_number?: true
  }

  export type SlotSumAggregateInputType = {
    id?: true
    day?: true
    slot_number?: true
  }

  export type SlotMinAggregateInputType = {
    id?: true
    day?: true
    slot_number?: true
    start_time?: true
    end_time?: true
  }

  export type SlotMaxAggregateInputType = {
    id?: true
    day?: true
    slot_number?: true
    start_time?: true
    end_time?: true
  }

  export type SlotCountAggregateInputType = {
    id?: true
    day?: true
    slot_number?: true
    start_time?: true
    end_time?: true
    _all?: true
  }

  export type SlotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Slot to aggregate.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Slots
    **/
    _count?: true | SlotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SlotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SlotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SlotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SlotMaxAggregateInputType
  }

  export type GetSlotAggregateType<T extends SlotAggregateArgs> = {
        [P in keyof T & keyof AggregateSlot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSlot[P]>
      : GetScalarType<T[P], AggregateSlot[P]>
  }




  export type SlotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SlotWhereInput
    orderBy?: SlotOrderByWithAggregationInput | SlotOrderByWithAggregationInput[]
    by: SlotScalarFieldEnum[] | SlotScalarFieldEnum
    having?: SlotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SlotCountAggregateInputType | true
    _avg?: SlotAvgAggregateInputType
    _sum?: SlotSumAggregateInputType
    _min?: SlotMinAggregateInputType
    _max?: SlotMaxAggregateInputType
  }

  export type SlotGroupByOutputType = {
    id: number
    day: number
    slot_number: number
    start_time: string
    end_time: string
    _count: SlotCountAggregateOutputType | null
    _avg: SlotAvgAggregateOutputType | null
    _sum: SlotSumAggregateOutputType | null
    _min: SlotMinAggregateOutputType | null
    _max: SlotMaxAggregateOutputType | null
  }

  type GetSlotGroupByPayload<T extends SlotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SlotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SlotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SlotGroupByOutputType[P]>
            : GetScalarType<T[P], SlotGroupByOutputType[P]>
        }
      >
    >


  export type SlotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    day?: boolean
    slot_number?: boolean
    start_time?: boolean
    end_time?: boolean
  }, ExtArgs["result"]["slot"]>

  export type SlotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    day?: boolean
    slot_number?: boolean
    start_time?: boolean
    end_time?: boolean
  }, ExtArgs["result"]["slot"]>

  export type SlotSelectScalar = {
    id?: boolean
    day?: boolean
    slot_number?: boolean
    start_time?: boolean
    end_time?: boolean
  }


  export type $SlotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Slot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      day: number
      slot_number: number
      start_time: string
      end_time: string
    }, ExtArgs["result"]["slot"]>
    composites: {}
  }

  type SlotGetPayload<S extends boolean | null | undefined | SlotDefaultArgs> = $Result.GetResult<Prisma.$SlotPayload, S>

  type SlotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SlotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SlotCountAggregateInputType | true
    }

  export interface SlotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Slot'], meta: { name: 'Slot' } }
    /**
     * Find zero or one Slot that matches the filter.
     * @param {SlotFindUniqueArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SlotFindUniqueArgs>(args: SelectSubset<T, SlotFindUniqueArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Slot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SlotFindUniqueOrThrowArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SlotFindUniqueOrThrowArgs>(args: SelectSubset<T, SlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Slot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindFirstArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SlotFindFirstArgs>(args?: SelectSubset<T, SlotFindFirstArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Slot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindFirstOrThrowArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SlotFindFirstOrThrowArgs>(args?: SelectSubset<T, SlotFindFirstOrThrowArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Slots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Slots
     * const slots = await prisma.slot.findMany()
     * 
     * // Get first 10 Slots
     * const slots = await prisma.slot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const slotWithIdOnly = await prisma.slot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SlotFindManyArgs>(args?: SelectSubset<T, SlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Slot.
     * @param {SlotCreateArgs} args - Arguments to create a Slot.
     * @example
     * // Create one Slot
     * const Slot = await prisma.slot.create({
     *   data: {
     *     // ... data to create a Slot
     *   }
     * })
     * 
     */
    create<T extends SlotCreateArgs>(args: SelectSubset<T, SlotCreateArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Slots.
     * @param {SlotCreateManyArgs} args - Arguments to create many Slots.
     * @example
     * // Create many Slots
     * const slot = await prisma.slot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SlotCreateManyArgs>(args?: SelectSubset<T, SlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Slots and returns the data saved in the database.
     * @param {SlotCreateManyAndReturnArgs} args - Arguments to create many Slots.
     * @example
     * // Create many Slots
     * const slot = await prisma.slot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Slots and only return the `id`
     * const slotWithIdOnly = await prisma.slot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SlotCreateManyAndReturnArgs>(args?: SelectSubset<T, SlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Slot.
     * @param {SlotDeleteArgs} args - Arguments to delete one Slot.
     * @example
     * // Delete one Slot
     * const Slot = await prisma.slot.delete({
     *   where: {
     *     // ... filter to delete one Slot
     *   }
     * })
     * 
     */
    delete<T extends SlotDeleteArgs>(args: SelectSubset<T, SlotDeleteArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Slot.
     * @param {SlotUpdateArgs} args - Arguments to update one Slot.
     * @example
     * // Update one Slot
     * const slot = await prisma.slot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SlotUpdateArgs>(args: SelectSubset<T, SlotUpdateArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Slots.
     * @param {SlotDeleteManyArgs} args - Arguments to filter Slots to delete.
     * @example
     * // Delete a few Slots
     * const { count } = await prisma.slot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SlotDeleteManyArgs>(args?: SelectSubset<T, SlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Slots
     * const slot = await prisma.slot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SlotUpdateManyArgs>(args: SelectSubset<T, SlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Slot.
     * @param {SlotUpsertArgs} args - Arguments to update or create a Slot.
     * @example
     * // Update or create a Slot
     * const slot = await prisma.slot.upsert({
     *   create: {
     *     // ... data to create a Slot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Slot we want to update
     *   }
     * })
     */
    upsert<T extends SlotUpsertArgs>(args: SelectSubset<T, SlotUpsertArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotCountArgs} args - Arguments to filter Slots to count.
     * @example
     * // Count the number of Slots
     * const count = await prisma.slot.count({
     *   where: {
     *     // ... the filter for the Slots we want to count
     *   }
     * })
    **/
    count<T extends SlotCountArgs>(
      args?: Subset<T, SlotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SlotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Slot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SlotAggregateArgs>(args: Subset<T, SlotAggregateArgs>): Prisma.PrismaPromise<GetSlotAggregateType<T>>

    /**
     * Group by Slot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotGroupByArgs} args - Group by arguments.
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
      T extends SlotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SlotGroupByArgs['orderBy'] }
        : { orderBy?: SlotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
        }[OrderFields]
    >(args: SubsetIntersection<T, SlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Slot model
   */
  readonly fields: SlotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Slot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SlotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Slot model
   */ 
  interface SlotFieldRefs {
    readonly id: FieldRef<"Slot", 'Int'>
    readonly day: FieldRef<"Slot", 'Int'>
    readonly slot_number: FieldRef<"Slot", 'Int'>
    readonly start_time: FieldRef<"Slot", 'String'>
    readonly end_time: FieldRef<"Slot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Slot findUnique
   */
  export type SlotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot findUniqueOrThrow
   */
  export type SlotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot findFirst
   */
  export type SlotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Slots.
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Slots.
     */
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * Slot findFirstOrThrow
   */
  export type SlotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Slots.
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Slots.
     */
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * Slot findMany
   */
  export type SlotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Filter, which Slots to fetch.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Slots.
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * Slot create
   */
  export type SlotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * The data needed to create a Slot.
     */
    data: XOR<SlotCreateInput, SlotUncheckedCreateInput>
  }

  /**
   * Slot createMany
   */
  export type SlotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Slots.
     */
    data: SlotCreateManyInput | SlotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Slot createManyAndReturn
   */
  export type SlotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Slots.
     */
    data: SlotCreateManyInput | SlotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Slot update
   */
  export type SlotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * The data needed to update a Slot.
     */
    data: XOR<SlotUpdateInput, SlotUncheckedUpdateInput>
    /**
     * Choose, which Slot to update.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot updateMany
   */
  export type SlotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Slots.
     */
    data: XOR<SlotUpdateManyMutationInput, SlotUncheckedUpdateManyInput>
    /**
     * Filter which Slots to update
     */
    where?: SlotWhereInput
  }

  /**
   * Slot upsert
   */
  export type SlotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * The filter to search for the Slot to update in case it exists.
     */
    where: SlotWhereUniqueInput
    /**
     * In case the Slot found by the `where` argument doesn't exist, create a new Slot with this data.
     */
    create: XOR<SlotCreateInput, SlotUncheckedCreateInput>
    /**
     * In case the Slot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SlotUpdateInput, SlotUncheckedUpdateInput>
  }

  /**
   * Slot delete
   */
  export type SlotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Filter which Slot to delete.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot deleteMany
   */
  export type SlotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Slots to delete
     */
    where?: SlotWhereInput
  }

  /**
   * Slot without action
   */
  export type SlotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    imageUrl: 'imageUrl',
    clerkUserId: 'clerkUserId',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    grade: 'grade',
    school: 'school',
    board: 'board',
    fees: 'fees',
    numberDaysAttendPerWeek: 'numberDaysAttendPerWeek',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    teacherId: 'teacherId'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const TeacherScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const Test_TuitionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    syllabus: 'syllabus',
    date: 'date',
    marks_scored: 'marks_scored',
    total_marks: 'total_marks',
    teacherId: 'teacherId',
    studentId: 'studentId'
  };

  export type Test_TuitionScalarFieldEnum = (typeof Test_TuitionScalarFieldEnum)[keyof typeof Test_TuitionScalarFieldEnum]


  export const Test_SchoolScalarFieldEnum: {
    id: 'id',
    name: 'name',
    syllabus: 'syllabus',
    date: 'date',
    marks_scored: 'marks_scored',
    total_marks: 'total_marks',
    test_status: 'test_status',
    studentId: 'studentId'
  };

  export type Test_SchoolScalarFieldEnum = (typeof Test_SchoolScalarFieldEnum)[keyof typeof Test_SchoolScalarFieldEnum]


  export const ScheduleScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    day: 'day',
    slot: 'slot',
    createdAt: 'createdAt'
  };

  export type ScheduleScalarFieldEnum = (typeof ScheduleScalarFieldEnum)[keyof typeof ScheduleScalarFieldEnum]


  export const SlotScalarFieldEnum: {
    id: 'id',
    day: 'day',
    slot_number: 'slot_number',
    start_time: 'start_time',
    end_time: 'end_time'
  };

  export type SlotScalarFieldEnum = (typeof SlotScalarFieldEnum)[keyof typeof SlotScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    clerkUserId?: StringFilter<"User"> | string
    role?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
    Teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    clerkUserId?: SortOrder
    role?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Student?: StudentOrderByWithRelationInput
    Teacher?: TeacherOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    clerkUserId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    role?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
    Teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
  }, "id" | "email" | "clerkUserId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    clerkUserId?: SortOrder
    role?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    clerkUserId?: StringWithAggregatesFilter<"User"> | string
    role?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: IntFilter<"Student"> | number
    userId?: IntFilter<"Student"> | number
    grade?: StringNullableFilter<"Student"> | string | null
    school?: StringNullableFilter<"Student"> | string | null
    board?: StringNullableFilter<"Student"> | string | null
    fees?: IntNullableFilter<"Student"> | number | null
    numberDaysAttendPerWeek?: IntNullableFilter<"Student"> | number | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    teacherId?: IntFilter<"Student"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    test_tuition?: Test_TuitionListRelationFilter
    test_school?: Test_SchoolListRelationFilter
    schedule?: ScheduleListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrderInput | SortOrder
    school?: SortOrderInput | SortOrder
    board?: SortOrderInput | SortOrder
    fees?: SortOrderInput | SortOrder
    numberDaysAttendPerWeek?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teacherId?: SortOrder
    teacher?: TeacherOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    test_tuition?: Test_TuitionOrderByRelationAggregateInput
    test_school?: Test_SchoolOrderByRelationAggregateInput
    schedule?: ScheduleOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    grade?: StringNullableFilter<"Student"> | string | null
    school?: StringNullableFilter<"Student"> | string | null
    board?: StringNullableFilter<"Student"> | string | null
    fees?: IntNullableFilter<"Student"> | number | null
    numberDaysAttendPerWeek?: IntNullableFilter<"Student"> | number | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    teacherId?: IntFilter<"Student"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    test_tuition?: Test_TuitionListRelationFilter
    test_school?: Test_SchoolListRelationFilter
    schedule?: ScheduleListRelationFilter
  }, "id" | "userId">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrderInput | SortOrder
    school?: SortOrderInput | SortOrder
    board?: SortOrderInput | SortOrder
    fees?: SortOrderInput | SortOrder
    numberDaysAttendPerWeek?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teacherId?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Student"> | number
    userId?: IntWithAggregatesFilter<"Student"> | number
    grade?: StringNullableWithAggregatesFilter<"Student"> | string | null
    school?: StringNullableWithAggregatesFilter<"Student"> | string | null
    board?: StringNullableWithAggregatesFilter<"Student"> | string | null
    fees?: IntNullableWithAggregatesFilter<"Student"> | number | null
    numberDaysAttendPerWeek?: IntNullableWithAggregatesFilter<"Student"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    teacherId?: IntWithAggregatesFilter<"Student"> | number
  }

  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    id?: IntFilter<"Teacher"> | number
    userId?: IntFilter<"Teacher"> | number
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
    Student?: StudentListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    test_tuition?: Test_TuitionListRelationFilter
  }

  export type TeacherOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Student?: StudentOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
    test_tuition?: Test_TuitionOrderByRelationAggregateInput
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
    Student?: StudentListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    test_tuition?: Test_TuitionListRelationFilter
  }, "id" | "userId">

  export type TeacherOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _avg?: TeacherAvgOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
    _sum?: TeacherSumOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Teacher"> | number
    userId?: IntWithAggregatesFilter<"Teacher"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
  }

  export type Test_TuitionWhereInput = {
    AND?: Test_TuitionWhereInput | Test_TuitionWhereInput[]
    OR?: Test_TuitionWhereInput[]
    NOT?: Test_TuitionWhereInput | Test_TuitionWhereInput[]
    id?: IntFilter<"Test_Tuition"> | number
    name?: StringFilter<"Test_Tuition"> | string
    syllabus?: StringFilter<"Test_Tuition"> | string
    date?: DateTimeFilter<"Test_Tuition"> | Date | string
    marks_scored?: IntFilter<"Test_Tuition"> | number
    total_marks?: IntFilter<"Test_Tuition"> | number
    teacherId?: IntFilter<"Test_Tuition"> | number
    studentId?: IntFilter<"Test_Tuition"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type Test_TuitionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    syllabus?: SortOrder
    date?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    teacherId?: SortOrder
    studentId?: SortOrder
    teacher?: TeacherOrderByWithRelationInput
    student?: StudentOrderByWithRelationInput
  }

  export type Test_TuitionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Test_TuitionWhereInput | Test_TuitionWhereInput[]
    OR?: Test_TuitionWhereInput[]
    NOT?: Test_TuitionWhereInput | Test_TuitionWhereInput[]
    name?: StringFilter<"Test_Tuition"> | string
    syllabus?: StringFilter<"Test_Tuition"> | string
    date?: DateTimeFilter<"Test_Tuition"> | Date | string
    marks_scored?: IntFilter<"Test_Tuition"> | number
    total_marks?: IntFilter<"Test_Tuition"> | number
    teacherId?: IntFilter<"Test_Tuition"> | number
    studentId?: IntFilter<"Test_Tuition"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type Test_TuitionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    syllabus?: SortOrder
    date?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    teacherId?: SortOrder
    studentId?: SortOrder
    _count?: Test_TuitionCountOrderByAggregateInput
    _avg?: Test_TuitionAvgOrderByAggregateInput
    _max?: Test_TuitionMaxOrderByAggregateInput
    _min?: Test_TuitionMinOrderByAggregateInput
    _sum?: Test_TuitionSumOrderByAggregateInput
  }

  export type Test_TuitionScalarWhereWithAggregatesInput = {
    AND?: Test_TuitionScalarWhereWithAggregatesInput | Test_TuitionScalarWhereWithAggregatesInput[]
    OR?: Test_TuitionScalarWhereWithAggregatesInput[]
    NOT?: Test_TuitionScalarWhereWithAggregatesInput | Test_TuitionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Test_Tuition"> | number
    name?: StringWithAggregatesFilter<"Test_Tuition"> | string
    syllabus?: StringWithAggregatesFilter<"Test_Tuition"> | string
    date?: DateTimeWithAggregatesFilter<"Test_Tuition"> | Date | string
    marks_scored?: IntWithAggregatesFilter<"Test_Tuition"> | number
    total_marks?: IntWithAggregatesFilter<"Test_Tuition"> | number
    teacherId?: IntWithAggregatesFilter<"Test_Tuition"> | number
    studentId?: IntWithAggregatesFilter<"Test_Tuition"> | number
  }

  export type Test_SchoolWhereInput = {
    AND?: Test_SchoolWhereInput | Test_SchoolWhereInput[]
    OR?: Test_SchoolWhereInput[]
    NOT?: Test_SchoolWhereInput | Test_SchoolWhereInput[]
    id?: IntFilter<"Test_School"> | number
    name?: StringFilter<"Test_School"> | string
    syllabus?: StringFilter<"Test_School"> | string
    date?: DateTimeFilter<"Test_School"> | Date | string
    marks_scored?: IntFilter<"Test_School"> | number
    total_marks?: IntFilter<"Test_School"> | number
    test_status?: BoolFilter<"Test_School"> | boolean
    studentId?: IntFilter<"Test_School"> | number
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type Test_SchoolOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    syllabus?: SortOrder
    date?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    test_status?: SortOrder
    studentId?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type Test_SchoolWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Test_SchoolWhereInput | Test_SchoolWhereInput[]
    OR?: Test_SchoolWhereInput[]
    NOT?: Test_SchoolWhereInput | Test_SchoolWhereInput[]
    name?: StringFilter<"Test_School"> | string
    syllabus?: StringFilter<"Test_School"> | string
    date?: DateTimeFilter<"Test_School"> | Date | string
    marks_scored?: IntFilter<"Test_School"> | number
    total_marks?: IntFilter<"Test_School"> | number
    test_status?: BoolFilter<"Test_School"> | boolean
    studentId?: IntFilter<"Test_School"> | number
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type Test_SchoolOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    syllabus?: SortOrder
    date?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    test_status?: SortOrder
    studentId?: SortOrder
    _count?: Test_SchoolCountOrderByAggregateInput
    _avg?: Test_SchoolAvgOrderByAggregateInput
    _max?: Test_SchoolMaxOrderByAggregateInput
    _min?: Test_SchoolMinOrderByAggregateInput
    _sum?: Test_SchoolSumOrderByAggregateInput
  }

  export type Test_SchoolScalarWhereWithAggregatesInput = {
    AND?: Test_SchoolScalarWhereWithAggregatesInput | Test_SchoolScalarWhereWithAggregatesInput[]
    OR?: Test_SchoolScalarWhereWithAggregatesInput[]
    NOT?: Test_SchoolScalarWhereWithAggregatesInput | Test_SchoolScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Test_School"> | number
    name?: StringWithAggregatesFilter<"Test_School"> | string
    syllabus?: StringWithAggregatesFilter<"Test_School"> | string
    date?: DateTimeWithAggregatesFilter<"Test_School"> | Date | string
    marks_scored?: IntWithAggregatesFilter<"Test_School"> | number
    total_marks?: IntWithAggregatesFilter<"Test_School"> | number
    test_status?: BoolWithAggregatesFilter<"Test_School"> | boolean
    studentId?: IntWithAggregatesFilter<"Test_School"> | number
  }

  export type ScheduleWhereInput = {
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    id?: IntFilter<"Schedule"> | number
    studentId?: IntFilter<"Schedule"> | number
    day?: IntFilter<"Schedule"> | number
    slot?: IntFilter<"Schedule"> | number
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type ScheduleOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    day?: SortOrder
    slot?: SortOrder
    createdAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type ScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    studentId?: IntFilter<"Schedule"> | number
    day?: IntFilter<"Schedule"> | number
    slot?: IntFilter<"Schedule"> | number
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type ScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    day?: SortOrder
    slot?: SortOrder
    createdAt?: SortOrder
    _count?: ScheduleCountOrderByAggregateInput
    _avg?: ScheduleAvgOrderByAggregateInput
    _max?: ScheduleMaxOrderByAggregateInput
    _min?: ScheduleMinOrderByAggregateInput
    _sum?: ScheduleSumOrderByAggregateInput
  }

  export type ScheduleScalarWhereWithAggregatesInput = {
    AND?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    OR?: ScheduleScalarWhereWithAggregatesInput[]
    NOT?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Schedule"> | number
    studentId?: IntWithAggregatesFilter<"Schedule"> | number
    day?: IntWithAggregatesFilter<"Schedule"> | number
    slot?: IntWithAggregatesFilter<"Schedule"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
  }

  export type SlotWhereInput = {
    AND?: SlotWhereInput | SlotWhereInput[]
    OR?: SlotWhereInput[]
    NOT?: SlotWhereInput | SlotWhereInput[]
    id?: IntFilter<"Slot"> | number
    day?: IntFilter<"Slot"> | number
    slot_number?: IntFilter<"Slot"> | number
    start_time?: StringFilter<"Slot"> | string
    end_time?: StringFilter<"Slot"> | string
  }

  export type SlotOrderByWithRelationInput = {
    id?: SortOrder
    day?: SortOrder
    slot_number?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
  }

  export type SlotWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SlotWhereInput | SlotWhereInput[]
    OR?: SlotWhereInput[]
    NOT?: SlotWhereInput | SlotWhereInput[]
    day?: IntFilter<"Slot"> | number
    slot_number?: IntFilter<"Slot"> | number
    start_time?: StringFilter<"Slot"> | string
    end_time?: StringFilter<"Slot"> | string
  }, "id">

  export type SlotOrderByWithAggregationInput = {
    id?: SortOrder
    day?: SortOrder
    slot_number?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    _count?: SlotCountOrderByAggregateInput
    _avg?: SlotAvgOrderByAggregateInput
    _max?: SlotMaxOrderByAggregateInput
    _min?: SlotMinOrderByAggregateInput
    _sum?: SlotSumOrderByAggregateInput
  }

  export type SlotScalarWhereWithAggregatesInput = {
    AND?: SlotScalarWhereWithAggregatesInput | SlotScalarWhereWithAggregatesInput[]
    OR?: SlotScalarWhereWithAggregatesInput[]
    NOT?: SlotScalarWhereWithAggregatesInput | SlotScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Slot"> | number
    day?: IntWithAggregatesFilter<"Slot"> | number
    slot_number?: IntWithAggregatesFilter<"Slot"> | number
    start_time?: StringWithAggregatesFilter<"Slot"> | string
    end_time?: StringWithAggregatesFilter<"Slot"> | string
  }

  export type UserCreateInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    clerkUserId: string
    role?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Student?: StudentCreateNestedOneWithoutUserInput
    Teacher?: TeacherCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    clerkUserId: string
    role?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Student?: StudentUncheckedCreateNestedOneWithoutUserInput
    Teacher?: TeacherUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Student?: StudentUpdateOneWithoutUserNestedInput
    Teacher?: TeacherUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Student?: StudentUncheckedUpdateOneWithoutUserNestedInput
    Teacher?: TeacherUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    clerkUserId: string
    role?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateInput = {
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: TeacherCreateNestedOneWithoutStudentInput
    user: UserCreateNestedOneWithoutStudentInput
    test_tuition?: Test_TuitionCreateNestedManyWithoutStudentInput
    test_school?: Test_SchoolCreateNestedManyWithoutStudentInput
    schedule?: ScheduleCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: number
    userId: number
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacherId: number
    test_tuition?: Test_TuitionUncheckedCreateNestedManyWithoutStudentInput
    test_school?: Test_SchoolUncheckedCreateNestedManyWithoutStudentInput
    schedule?: ScheduleUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateOneRequiredWithoutStudentNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    test_tuition?: Test_TuitionUpdateManyWithoutStudentNestedInput
    test_school?: Test_SchoolUpdateManyWithoutStudentNestedInput
    schedule?: ScheduleUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherId?: IntFieldUpdateOperationsInput | number
    test_tuition?: Test_TuitionUncheckedUpdateManyWithoutStudentNestedInput
    test_school?: Test_SchoolUncheckedUpdateManyWithoutStudentNestedInput
    schedule?: ScheduleUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: number
    userId: number
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacherId: number
  }

  export type StudentUpdateManyMutationInput = {
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherId?: IntFieldUpdateOperationsInput | number
  }

  export type TeacherCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    Student?: StudentCreateNestedManyWithoutTeacherInput
    user: UserCreateNestedOneWithoutTeacherInput
    test_tuition?: Test_TuitionCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateInput = {
    id?: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Student?: StudentUncheckedCreateNestedManyWithoutTeacherInput
    test_tuition?: Test_TuitionUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Student?: StudentUpdateManyWithoutTeacherNestedInput
    user?: UserUpdateOneRequiredWithoutTeacherNestedInput
    test_tuition?: Test_TuitionUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Student?: StudentUncheckedUpdateManyWithoutTeacherNestedInput
    test_tuition?: Test_TuitionUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateManyInput = {
    id?: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeacherUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Test_TuitionCreateInput = {
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    teacher: TeacherCreateNestedOneWithoutTest_tuitionInput
    student: StudentCreateNestedOneWithoutTest_tuitionInput
  }

  export type Test_TuitionUncheckedCreateInput = {
    id?: number
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    teacherId: number
    studentId: number
  }

  export type Test_TuitionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    teacher?: TeacherUpdateOneRequiredWithoutTest_tuitionNestedInput
    student?: StudentUpdateOneRequiredWithoutTest_tuitionNestedInput
  }

  export type Test_TuitionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
  }

  export type Test_TuitionCreateManyInput = {
    id?: number
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    teacherId: number
    studentId: number
  }

  export type Test_TuitionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
  }

  export type Test_TuitionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
  }

  export type Test_SchoolCreateInput = {
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    test_status: boolean
    student: StudentCreateNestedOneWithoutTest_schoolInput
  }

  export type Test_SchoolUncheckedCreateInput = {
    id?: number
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    test_status: boolean
    studentId: number
  }

  export type Test_SchoolUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    test_status?: BoolFieldUpdateOperationsInput | boolean
    student?: StudentUpdateOneRequiredWithoutTest_schoolNestedInput
  }

  export type Test_SchoolUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    test_status?: BoolFieldUpdateOperationsInput | boolean
    studentId?: IntFieldUpdateOperationsInput | number
  }

  export type Test_SchoolCreateManyInput = {
    id?: number
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    test_status: boolean
    studentId: number
  }

  export type Test_SchoolUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    test_status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Test_SchoolUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    test_status?: BoolFieldUpdateOperationsInput | boolean
    studentId?: IntFieldUpdateOperationsInput | number
  }

  export type ScheduleCreateInput = {
    day: number
    slot: number
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutScheduleInput
  }

  export type ScheduleUncheckedCreateInput = {
    id?: number
    studentId: number
    day: number
    slot: number
    createdAt?: Date | string
  }

  export type ScheduleUpdateInput = {
    day?: IntFieldUpdateOperationsInput | number
    slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutScheduleNestedInput
  }

  export type ScheduleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    day?: IntFieldUpdateOperationsInput | number
    slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyInput = {
    id?: number
    studentId: number
    day: number
    slot: number
    createdAt?: Date | string
  }

  export type ScheduleUpdateManyMutationInput = {
    day?: IntFieldUpdateOperationsInput | number
    slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    day?: IntFieldUpdateOperationsInput | number
    slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlotCreateInput = {
    day: number
    slot_number: number
    start_time: string
    end_time: string
  }

  export type SlotUncheckedCreateInput = {
    id?: number
    day: number
    slot_number: number
    start_time: string
    end_time: string
  }

  export type SlotUpdateInput = {
    day?: IntFieldUpdateOperationsInput | number
    slot_number?: IntFieldUpdateOperationsInput | number
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
  }

  export type SlotUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: IntFieldUpdateOperationsInput | number
    slot_number?: IntFieldUpdateOperationsInput | number
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
  }

  export type SlotCreateManyInput = {
    id?: number
    day: number
    slot_number: number
    start_time: string
    end_time: string
  }

  export type SlotUpdateManyMutationInput = {
    day?: IntFieldUpdateOperationsInput | number
    slot_number?: IntFieldUpdateOperationsInput | number
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
  }

  export type SlotUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: IntFieldUpdateOperationsInput | number
    slot_number?: IntFieldUpdateOperationsInput | number
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StudentNullableScalarRelationFilter = {
    is?: StudentWhereInput | null
    isNot?: StudentWhereInput | null
  }

  export type TeacherNullableScalarRelationFilter = {
    is?: TeacherWhereInput | null
    isNot?: TeacherWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    clerkUserId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    clerkUserId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    clerkUserId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TeacherScalarRelationFilter = {
    is?: TeacherWhereInput
    isNot?: TeacherWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type Test_TuitionListRelationFilter = {
    every?: Test_TuitionWhereInput
    some?: Test_TuitionWhereInput
    none?: Test_TuitionWhereInput
  }

  export type Test_SchoolListRelationFilter = {
    every?: Test_SchoolWhereInput
    some?: Test_SchoolWhereInput
    none?: Test_SchoolWhereInput
  }

  export type ScheduleListRelationFilter = {
    every?: ScheduleWhereInput
    some?: ScheduleWhereInput
    none?: ScheduleWhereInput
  }

  export type Test_TuitionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Test_SchoolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    school?: SortOrder
    board?: SortOrder
    fees?: SortOrder
    numberDaysAttendPerWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teacherId?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fees?: SortOrder
    numberDaysAttendPerWeek?: SortOrder
    teacherId?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    school?: SortOrder
    board?: SortOrder
    fees?: SortOrder
    numberDaysAttendPerWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teacherId?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    school?: SortOrder
    board?: SortOrder
    fees?: SortOrder
    numberDaysAttendPerWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teacherId?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fees?: SortOrder
    numberDaysAttendPerWeek?: SortOrder
    teacherId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeacherCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type Test_TuitionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    syllabus?: SortOrder
    date?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    teacherId?: SortOrder
    studentId?: SortOrder
  }

  export type Test_TuitionAvgOrderByAggregateInput = {
    id?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    teacherId?: SortOrder
    studentId?: SortOrder
  }

  export type Test_TuitionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    syllabus?: SortOrder
    date?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    teacherId?: SortOrder
    studentId?: SortOrder
  }

  export type Test_TuitionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    syllabus?: SortOrder
    date?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    teacherId?: SortOrder
    studentId?: SortOrder
  }

  export type Test_TuitionSumOrderByAggregateInput = {
    id?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    teacherId?: SortOrder
    studentId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type Test_SchoolCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    syllabus?: SortOrder
    date?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    test_status?: SortOrder
    studentId?: SortOrder
  }

  export type Test_SchoolAvgOrderByAggregateInput = {
    id?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    studentId?: SortOrder
  }

  export type Test_SchoolMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    syllabus?: SortOrder
    date?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    test_status?: SortOrder
    studentId?: SortOrder
  }

  export type Test_SchoolMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    syllabus?: SortOrder
    date?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    test_status?: SortOrder
    studentId?: SortOrder
  }

  export type Test_SchoolSumOrderByAggregateInput = {
    id?: SortOrder
    marks_scored?: SortOrder
    total_marks?: SortOrder
    studentId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    day?: SortOrder
    slot?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduleAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    day?: SortOrder
    slot?: SortOrder
  }

  export type ScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    day?: SortOrder
    slot?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    day?: SortOrder
    slot?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduleSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    day?: SortOrder
    slot?: SortOrder
  }

  export type SlotCountOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    slot_number?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
  }

  export type SlotAvgOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    slot_number?: SortOrder
  }

  export type SlotMaxOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    slot_number?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
  }

  export type SlotMinOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    slot_number?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
  }

  export type SlotSumOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    slot_number?: SortOrder
  }

  export type StudentCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    connect?: StudentWhereUniqueInput
  }

  export type TeacherCreateNestedOneWithoutUserInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    connect?: TeacherWhereUniqueInput
  }

  export type StudentUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    connect?: StudentWhereUniqueInput
  }

  export type TeacherUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    connect?: TeacherWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StudentUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    upsert?: StudentUpsertWithoutUserInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutUserInput, StudentUpdateWithoutUserInput>, StudentUncheckedUpdateWithoutUserInput>
  }

  export type TeacherUpdateOneWithoutUserNestedInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    upsert?: TeacherUpsertWithoutUserInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutUserInput, TeacherUpdateWithoutUserInput>, TeacherUncheckedUpdateWithoutUserInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StudentUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    upsert?: StudentUpsertWithoutUserInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutUserInput, StudentUpdateWithoutUserInput>, StudentUncheckedUpdateWithoutUserInput>
  }

  export type TeacherUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    upsert?: TeacherUpsertWithoutUserInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutUserInput, TeacherUpdateWithoutUserInput>, TeacherUncheckedUpdateWithoutUserInput>
  }

  export type TeacherCreateNestedOneWithoutStudentInput = {
    create?: XOR<TeacherCreateWithoutStudentInput, TeacherUncheckedCreateWithoutStudentInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutStudentInput
    connect?: TeacherWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStudentInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    connect?: UserWhereUniqueInput
  }

  export type Test_TuitionCreateNestedManyWithoutStudentInput = {
    create?: XOR<Test_TuitionCreateWithoutStudentInput, Test_TuitionUncheckedCreateWithoutStudentInput> | Test_TuitionCreateWithoutStudentInput[] | Test_TuitionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Test_TuitionCreateOrConnectWithoutStudentInput | Test_TuitionCreateOrConnectWithoutStudentInput[]
    createMany?: Test_TuitionCreateManyStudentInputEnvelope
    connect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
  }

  export type Test_SchoolCreateNestedManyWithoutStudentInput = {
    create?: XOR<Test_SchoolCreateWithoutStudentInput, Test_SchoolUncheckedCreateWithoutStudentInput> | Test_SchoolCreateWithoutStudentInput[] | Test_SchoolUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Test_SchoolCreateOrConnectWithoutStudentInput | Test_SchoolCreateOrConnectWithoutStudentInput[]
    createMany?: Test_SchoolCreateManyStudentInputEnvelope
    connect?: Test_SchoolWhereUniqueInput | Test_SchoolWhereUniqueInput[]
  }

  export type ScheduleCreateNestedManyWithoutStudentInput = {
    create?: XOR<ScheduleCreateWithoutStudentInput, ScheduleUncheckedCreateWithoutStudentInput> | ScheduleCreateWithoutStudentInput[] | ScheduleUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutStudentInput | ScheduleCreateOrConnectWithoutStudentInput[]
    createMany?: ScheduleCreateManyStudentInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type Test_TuitionUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<Test_TuitionCreateWithoutStudentInput, Test_TuitionUncheckedCreateWithoutStudentInput> | Test_TuitionCreateWithoutStudentInput[] | Test_TuitionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Test_TuitionCreateOrConnectWithoutStudentInput | Test_TuitionCreateOrConnectWithoutStudentInput[]
    createMany?: Test_TuitionCreateManyStudentInputEnvelope
    connect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
  }

  export type Test_SchoolUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<Test_SchoolCreateWithoutStudentInput, Test_SchoolUncheckedCreateWithoutStudentInput> | Test_SchoolCreateWithoutStudentInput[] | Test_SchoolUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Test_SchoolCreateOrConnectWithoutStudentInput | Test_SchoolCreateOrConnectWithoutStudentInput[]
    createMany?: Test_SchoolCreateManyStudentInputEnvelope
    connect?: Test_SchoolWhereUniqueInput | Test_SchoolWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ScheduleCreateWithoutStudentInput, ScheduleUncheckedCreateWithoutStudentInput> | ScheduleCreateWithoutStudentInput[] | ScheduleUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutStudentInput | ScheduleCreateOrConnectWithoutStudentInput[]
    createMany?: ScheduleCreateManyStudentInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TeacherUpdateOneRequiredWithoutStudentNestedInput = {
    create?: XOR<TeacherCreateWithoutStudentInput, TeacherUncheckedCreateWithoutStudentInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutStudentInput
    upsert?: TeacherUpsertWithoutStudentInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutStudentInput, TeacherUpdateWithoutStudentInput>, TeacherUncheckedUpdateWithoutStudentInput>
  }

  export type UserUpdateOneRequiredWithoutStudentNestedInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    upsert?: UserUpsertWithoutStudentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentInput, UserUpdateWithoutStudentInput>, UserUncheckedUpdateWithoutStudentInput>
  }

  export type Test_TuitionUpdateManyWithoutStudentNestedInput = {
    create?: XOR<Test_TuitionCreateWithoutStudentInput, Test_TuitionUncheckedCreateWithoutStudentInput> | Test_TuitionCreateWithoutStudentInput[] | Test_TuitionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Test_TuitionCreateOrConnectWithoutStudentInput | Test_TuitionCreateOrConnectWithoutStudentInput[]
    upsert?: Test_TuitionUpsertWithWhereUniqueWithoutStudentInput | Test_TuitionUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: Test_TuitionCreateManyStudentInputEnvelope
    set?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    disconnect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    delete?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    connect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    update?: Test_TuitionUpdateWithWhereUniqueWithoutStudentInput | Test_TuitionUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: Test_TuitionUpdateManyWithWhereWithoutStudentInput | Test_TuitionUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: Test_TuitionScalarWhereInput | Test_TuitionScalarWhereInput[]
  }

  export type Test_SchoolUpdateManyWithoutStudentNestedInput = {
    create?: XOR<Test_SchoolCreateWithoutStudentInput, Test_SchoolUncheckedCreateWithoutStudentInput> | Test_SchoolCreateWithoutStudentInput[] | Test_SchoolUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Test_SchoolCreateOrConnectWithoutStudentInput | Test_SchoolCreateOrConnectWithoutStudentInput[]
    upsert?: Test_SchoolUpsertWithWhereUniqueWithoutStudentInput | Test_SchoolUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: Test_SchoolCreateManyStudentInputEnvelope
    set?: Test_SchoolWhereUniqueInput | Test_SchoolWhereUniqueInput[]
    disconnect?: Test_SchoolWhereUniqueInput | Test_SchoolWhereUniqueInput[]
    delete?: Test_SchoolWhereUniqueInput | Test_SchoolWhereUniqueInput[]
    connect?: Test_SchoolWhereUniqueInput | Test_SchoolWhereUniqueInput[]
    update?: Test_SchoolUpdateWithWhereUniqueWithoutStudentInput | Test_SchoolUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: Test_SchoolUpdateManyWithWhereWithoutStudentInput | Test_SchoolUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: Test_SchoolScalarWhereInput | Test_SchoolScalarWhereInput[]
  }

  export type ScheduleUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ScheduleCreateWithoutStudentInput, ScheduleUncheckedCreateWithoutStudentInput> | ScheduleCreateWithoutStudentInput[] | ScheduleUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutStudentInput | ScheduleCreateOrConnectWithoutStudentInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutStudentInput | ScheduleUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ScheduleCreateManyStudentInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutStudentInput | ScheduleUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutStudentInput | ScheduleUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type Test_TuitionUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<Test_TuitionCreateWithoutStudentInput, Test_TuitionUncheckedCreateWithoutStudentInput> | Test_TuitionCreateWithoutStudentInput[] | Test_TuitionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Test_TuitionCreateOrConnectWithoutStudentInput | Test_TuitionCreateOrConnectWithoutStudentInput[]
    upsert?: Test_TuitionUpsertWithWhereUniqueWithoutStudentInput | Test_TuitionUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: Test_TuitionCreateManyStudentInputEnvelope
    set?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    disconnect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    delete?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    connect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    update?: Test_TuitionUpdateWithWhereUniqueWithoutStudentInput | Test_TuitionUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: Test_TuitionUpdateManyWithWhereWithoutStudentInput | Test_TuitionUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: Test_TuitionScalarWhereInput | Test_TuitionScalarWhereInput[]
  }

  export type Test_SchoolUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<Test_SchoolCreateWithoutStudentInput, Test_SchoolUncheckedCreateWithoutStudentInput> | Test_SchoolCreateWithoutStudentInput[] | Test_SchoolUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: Test_SchoolCreateOrConnectWithoutStudentInput | Test_SchoolCreateOrConnectWithoutStudentInput[]
    upsert?: Test_SchoolUpsertWithWhereUniqueWithoutStudentInput | Test_SchoolUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: Test_SchoolCreateManyStudentInputEnvelope
    set?: Test_SchoolWhereUniqueInput | Test_SchoolWhereUniqueInput[]
    disconnect?: Test_SchoolWhereUniqueInput | Test_SchoolWhereUniqueInput[]
    delete?: Test_SchoolWhereUniqueInput | Test_SchoolWhereUniqueInput[]
    connect?: Test_SchoolWhereUniqueInput | Test_SchoolWhereUniqueInput[]
    update?: Test_SchoolUpdateWithWhereUniqueWithoutStudentInput | Test_SchoolUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: Test_SchoolUpdateManyWithWhereWithoutStudentInput | Test_SchoolUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: Test_SchoolScalarWhereInput | Test_SchoolScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ScheduleCreateWithoutStudentInput, ScheduleUncheckedCreateWithoutStudentInput> | ScheduleCreateWithoutStudentInput[] | ScheduleUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutStudentInput | ScheduleCreateOrConnectWithoutStudentInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutStudentInput | ScheduleUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ScheduleCreateManyStudentInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutStudentInput | ScheduleUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutStudentInput | ScheduleUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type StudentCreateNestedManyWithoutTeacherInput = {
    create?: XOR<StudentCreateWithoutTeacherInput, StudentUncheckedCreateWithoutTeacherInput> | StudentCreateWithoutTeacherInput[] | StudentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutTeacherInput | StudentCreateOrConnectWithoutTeacherInput[]
    createMany?: StudentCreateManyTeacherInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutTeacherInput = {
    create?: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeacherInput
    connect?: UserWhereUniqueInput
  }

  export type Test_TuitionCreateNestedManyWithoutTeacherInput = {
    create?: XOR<Test_TuitionCreateWithoutTeacherInput, Test_TuitionUncheckedCreateWithoutTeacherInput> | Test_TuitionCreateWithoutTeacherInput[] | Test_TuitionUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: Test_TuitionCreateOrConnectWithoutTeacherInput | Test_TuitionCreateOrConnectWithoutTeacherInput[]
    createMany?: Test_TuitionCreateManyTeacherInputEnvelope
    connect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<StudentCreateWithoutTeacherInput, StudentUncheckedCreateWithoutTeacherInput> | StudentCreateWithoutTeacherInput[] | StudentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutTeacherInput | StudentCreateOrConnectWithoutTeacherInput[]
    createMany?: StudentCreateManyTeacherInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type Test_TuitionUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<Test_TuitionCreateWithoutTeacherInput, Test_TuitionUncheckedCreateWithoutTeacherInput> | Test_TuitionCreateWithoutTeacherInput[] | Test_TuitionUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: Test_TuitionCreateOrConnectWithoutTeacherInput | Test_TuitionCreateOrConnectWithoutTeacherInput[]
    createMany?: Test_TuitionCreateManyTeacherInputEnvelope
    connect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
  }

  export type StudentUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<StudentCreateWithoutTeacherInput, StudentUncheckedCreateWithoutTeacherInput> | StudentCreateWithoutTeacherInput[] | StudentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutTeacherInput | StudentCreateOrConnectWithoutTeacherInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutTeacherInput | StudentUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: StudentCreateManyTeacherInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutTeacherInput | StudentUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutTeacherInput | StudentUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutTeacherNestedInput = {
    create?: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeacherInput
    upsert?: UserUpsertWithoutTeacherInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTeacherInput, UserUpdateWithoutTeacherInput>, UserUncheckedUpdateWithoutTeacherInput>
  }

  export type Test_TuitionUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<Test_TuitionCreateWithoutTeacherInput, Test_TuitionUncheckedCreateWithoutTeacherInput> | Test_TuitionCreateWithoutTeacherInput[] | Test_TuitionUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: Test_TuitionCreateOrConnectWithoutTeacherInput | Test_TuitionCreateOrConnectWithoutTeacherInput[]
    upsert?: Test_TuitionUpsertWithWhereUniqueWithoutTeacherInput | Test_TuitionUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: Test_TuitionCreateManyTeacherInputEnvelope
    set?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    disconnect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    delete?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    connect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    update?: Test_TuitionUpdateWithWhereUniqueWithoutTeacherInput | Test_TuitionUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: Test_TuitionUpdateManyWithWhereWithoutTeacherInput | Test_TuitionUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: Test_TuitionScalarWhereInput | Test_TuitionScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<StudentCreateWithoutTeacherInput, StudentUncheckedCreateWithoutTeacherInput> | StudentCreateWithoutTeacherInput[] | StudentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutTeacherInput | StudentCreateOrConnectWithoutTeacherInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutTeacherInput | StudentUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: StudentCreateManyTeacherInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutTeacherInput | StudentUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutTeacherInput | StudentUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type Test_TuitionUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<Test_TuitionCreateWithoutTeacherInput, Test_TuitionUncheckedCreateWithoutTeacherInput> | Test_TuitionCreateWithoutTeacherInput[] | Test_TuitionUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: Test_TuitionCreateOrConnectWithoutTeacherInput | Test_TuitionCreateOrConnectWithoutTeacherInput[]
    upsert?: Test_TuitionUpsertWithWhereUniqueWithoutTeacherInput | Test_TuitionUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: Test_TuitionCreateManyTeacherInputEnvelope
    set?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    disconnect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    delete?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    connect?: Test_TuitionWhereUniqueInput | Test_TuitionWhereUniqueInput[]
    update?: Test_TuitionUpdateWithWhereUniqueWithoutTeacherInput | Test_TuitionUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: Test_TuitionUpdateManyWithWhereWithoutTeacherInput | Test_TuitionUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: Test_TuitionScalarWhereInput | Test_TuitionScalarWhereInput[]
  }

  export type TeacherCreateNestedOneWithoutTest_tuitionInput = {
    create?: XOR<TeacherCreateWithoutTest_tuitionInput, TeacherUncheckedCreateWithoutTest_tuitionInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutTest_tuitionInput
    connect?: TeacherWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutTest_tuitionInput = {
    create?: XOR<StudentCreateWithoutTest_tuitionInput, StudentUncheckedCreateWithoutTest_tuitionInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTest_tuitionInput
    connect?: StudentWhereUniqueInput
  }

  export type TeacherUpdateOneRequiredWithoutTest_tuitionNestedInput = {
    create?: XOR<TeacherCreateWithoutTest_tuitionInput, TeacherUncheckedCreateWithoutTest_tuitionInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutTest_tuitionInput
    upsert?: TeacherUpsertWithoutTest_tuitionInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutTest_tuitionInput, TeacherUpdateWithoutTest_tuitionInput>, TeacherUncheckedUpdateWithoutTest_tuitionInput>
  }

  export type StudentUpdateOneRequiredWithoutTest_tuitionNestedInput = {
    create?: XOR<StudentCreateWithoutTest_tuitionInput, StudentUncheckedCreateWithoutTest_tuitionInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTest_tuitionInput
    upsert?: StudentUpsertWithoutTest_tuitionInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutTest_tuitionInput, StudentUpdateWithoutTest_tuitionInput>, StudentUncheckedUpdateWithoutTest_tuitionInput>
  }

  export type StudentCreateNestedOneWithoutTest_schoolInput = {
    create?: XOR<StudentCreateWithoutTest_schoolInput, StudentUncheckedCreateWithoutTest_schoolInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTest_schoolInput
    connect?: StudentWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StudentUpdateOneRequiredWithoutTest_schoolNestedInput = {
    create?: XOR<StudentCreateWithoutTest_schoolInput, StudentUncheckedCreateWithoutTest_schoolInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTest_schoolInput
    upsert?: StudentUpsertWithoutTest_schoolInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutTest_schoolInput, StudentUpdateWithoutTest_schoolInput>, StudentUncheckedUpdateWithoutTest_schoolInput>
  }

  export type StudentCreateNestedOneWithoutScheduleInput = {
    create?: XOR<StudentCreateWithoutScheduleInput, StudentUncheckedCreateWithoutScheduleInput>
    connectOrCreate?: StudentCreateOrConnectWithoutScheduleInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutScheduleNestedInput = {
    create?: XOR<StudentCreateWithoutScheduleInput, StudentUncheckedCreateWithoutScheduleInput>
    connectOrCreate?: StudentCreateOrConnectWithoutScheduleInput
    upsert?: StudentUpsertWithoutScheduleInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutScheduleInput, StudentUpdateWithoutScheduleInput>, StudentUncheckedUpdateWithoutScheduleInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StudentCreateWithoutUserInput = {
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: TeacherCreateNestedOneWithoutStudentInput
    test_tuition?: Test_TuitionCreateNestedManyWithoutStudentInput
    test_school?: Test_SchoolCreateNestedManyWithoutStudentInput
    schedule?: ScheduleCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutUserInput = {
    id?: number
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacherId: number
    test_tuition?: Test_TuitionUncheckedCreateNestedManyWithoutStudentInput
    test_school?: Test_SchoolUncheckedCreateNestedManyWithoutStudentInput
    schedule?: ScheduleUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutUserInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
  }

  export type TeacherCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    Student?: StudentCreateNestedManyWithoutTeacherInput
    test_tuition?: Test_TuitionCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Student?: StudentUncheckedCreateNestedManyWithoutTeacherInput
    test_tuition?: Test_TuitionUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutUserInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
  }

  export type StudentUpsertWithoutUserInput = {
    update: XOR<StudentUpdateWithoutUserInput, StudentUncheckedUpdateWithoutUserInput>
    create: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutUserInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutUserInput, StudentUncheckedUpdateWithoutUserInput>
  }

  export type StudentUpdateWithoutUserInput = {
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateOneRequiredWithoutStudentNestedInput
    test_tuition?: Test_TuitionUpdateManyWithoutStudentNestedInput
    test_school?: Test_SchoolUpdateManyWithoutStudentNestedInput
    schedule?: ScheduleUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherId?: IntFieldUpdateOperationsInput | number
    test_tuition?: Test_TuitionUncheckedUpdateManyWithoutStudentNestedInput
    test_school?: Test_SchoolUncheckedUpdateManyWithoutStudentNestedInput
    schedule?: ScheduleUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type TeacherUpsertWithoutUserInput = {
    update: XOR<TeacherUpdateWithoutUserInput, TeacherUncheckedUpdateWithoutUserInput>
    create: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutUserInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutUserInput, TeacherUncheckedUpdateWithoutUserInput>
  }

  export type TeacherUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Student?: StudentUpdateManyWithoutTeacherNestedInput
    test_tuition?: Test_TuitionUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Student?: StudentUncheckedUpdateManyWithoutTeacherNestedInput
    test_tuition?: Test_TuitionUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateWithoutStudentInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTeacherInput
    test_tuition?: Test_TuitionCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutStudentInput = {
    id?: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    test_tuition?: Test_TuitionUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutStudentInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutStudentInput, TeacherUncheckedCreateWithoutStudentInput>
  }

  export type UserCreateWithoutStudentInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    clerkUserId: string
    role?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Teacher?: TeacherCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStudentInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    clerkUserId: string
    role?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Teacher?: TeacherUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStudentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
  }

  export type Test_TuitionCreateWithoutStudentInput = {
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    teacher: TeacherCreateNestedOneWithoutTest_tuitionInput
  }

  export type Test_TuitionUncheckedCreateWithoutStudentInput = {
    id?: number
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    teacherId: number
  }

  export type Test_TuitionCreateOrConnectWithoutStudentInput = {
    where: Test_TuitionWhereUniqueInput
    create: XOR<Test_TuitionCreateWithoutStudentInput, Test_TuitionUncheckedCreateWithoutStudentInput>
  }

  export type Test_TuitionCreateManyStudentInputEnvelope = {
    data: Test_TuitionCreateManyStudentInput | Test_TuitionCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type Test_SchoolCreateWithoutStudentInput = {
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    test_status: boolean
  }

  export type Test_SchoolUncheckedCreateWithoutStudentInput = {
    id?: number
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    test_status: boolean
  }

  export type Test_SchoolCreateOrConnectWithoutStudentInput = {
    where: Test_SchoolWhereUniqueInput
    create: XOR<Test_SchoolCreateWithoutStudentInput, Test_SchoolUncheckedCreateWithoutStudentInput>
  }

  export type Test_SchoolCreateManyStudentInputEnvelope = {
    data: Test_SchoolCreateManyStudentInput | Test_SchoolCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleCreateWithoutStudentInput = {
    day: number
    slot: number
    createdAt?: Date | string
  }

  export type ScheduleUncheckedCreateWithoutStudentInput = {
    id?: number
    day: number
    slot: number
    createdAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutStudentInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutStudentInput, ScheduleUncheckedCreateWithoutStudentInput>
  }

  export type ScheduleCreateManyStudentInputEnvelope = {
    data: ScheduleCreateManyStudentInput | ScheduleCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type TeacherUpsertWithoutStudentInput = {
    update: XOR<TeacherUpdateWithoutStudentInput, TeacherUncheckedUpdateWithoutStudentInput>
    create: XOR<TeacherCreateWithoutStudentInput, TeacherUncheckedCreateWithoutStudentInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutStudentInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutStudentInput, TeacherUncheckedUpdateWithoutStudentInput>
  }

  export type TeacherUpdateWithoutStudentInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeacherNestedInput
    test_tuition?: Test_TuitionUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test_tuition?: Test_TuitionUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserUpsertWithoutStudentInput = {
    update: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
  }

  export type UserUpdateWithoutStudentInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Teacher?: TeacherUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Teacher?: TeacherUncheckedUpdateOneWithoutUserNestedInput
  }

  export type Test_TuitionUpsertWithWhereUniqueWithoutStudentInput = {
    where: Test_TuitionWhereUniqueInput
    update: XOR<Test_TuitionUpdateWithoutStudentInput, Test_TuitionUncheckedUpdateWithoutStudentInput>
    create: XOR<Test_TuitionCreateWithoutStudentInput, Test_TuitionUncheckedCreateWithoutStudentInput>
  }

  export type Test_TuitionUpdateWithWhereUniqueWithoutStudentInput = {
    where: Test_TuitionWhereUniqueInput
    data: XOR<Test_TuitionUpdateWithoutStudentInput, Test_TuitionUncheckedUpdateWithoutStudentInput>
  }

  export type Test_TuitionUpdateManyWithWhereWithoutStudentInput = {
    where: Test_TuitionScalarWhereInput
    data: XOR<Test_TuitionUpdateManyMutationInput, Test_TuitionUncheckedUpdateManyWithoutStudentInput>
  }

  export type Test_TuitionScalarWhereInput = {
    AND?: Test_TuitionScalarWhereInput | Test_TuitionScalarWhereInput[]
    OR?: Test_TuitionScalarWhereInput[]
    NOT?: Test_TuitionScalarWhereInput | Test_TuitionScalarWhereInput[]
    id?: IntFilter<"Test_Tuition"> | number
    name?: StringFilter<"Test_Tuition"> | string
    syllabus?: StringFilter<"Test_Tuition"> | string
    date?: DateTimeFilter<"Test_Tuition"> | Date | string
    marks_scored?: IntFilter<"Test_Tuition"> | number
    total_marks?: IntFilter<"Test_Tuition"> | number
    teacherId?: IntFilter<"Test_Tuition"> | number
    studentId?: IntFilter<"Test_Tuition"> | number
  }

  export type Test_SchoolUpsertWithWhereUniqueWithoutStudentInput = {
    where: Test_SchoolWhereUniqueInput
    update: XOR<Test_SchoolUpdateWithoutStudentInput, Test_SchoolUncheckedUpdateWithoutStudentInput>
    create: XOR<Test_SchoolCreateWithoutStudentInput, Test_SchoolUncheckedCreateWithoutStudentInput>
  }

  export type Test_SchoolUpdateWithWhereUniqueWithoutStudentInput = {
    where: Test_SchoolWhereUniqueInput
    data: XOR<Test_SchoolUpdateWithoutStudentInput, Test_SchoolUncheckedUpdateWithoutStudentInput>
  }

  export type Test_SchoolUpdateManyWithWhereWithoutStudentInput = {
    where: Test_SchoolScalarWhereInput
    data: XOR<Test_SchoolUpdateManyMutationInput, Test_SchoolUncheckedUpdateManyWithoutStudentInput>
  }

  export type Test_SchoolScalarWhereInput = {
    AND?: Test_SchoolScalarWhereInput | Test_SchoolScalarWhereInput[]
    OR?: Test_SchoolScalarWhereInput[]
    NOT?: Test_SchoolScalarWhereInput | Test_SchoolScalarWhereInput[]
    id?: IntFilter<"Test_School"> | number
    name?: StringFilter<"Test_School"> | string
    syllabus?: StringFilter<"Test_School"> | string
    date?: DateTimeFilter<"Test_School"> | Date | string
    marks_scored?: IntFilter<"Test_School"> | number
    total_marks?: IntFilter<"Test_School"> | number
    test_status?: BoolFilter<"Test_School"> | boolean
    studentId?: IntFilter<"Test_School"> | number
  }

  export type ScheduleUpsertWithWhereUniqueWithoutStudentInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutStudentInput, ScheduleUncheckedUpdateWithoutStudentInput>
    create: XOR<ScheduleCreateWithoutStudentInput, ScheduleUncheckedCreateWithoutStudentInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutStudentInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutStudentInput, ScheduleUncheckedUpdateWithoutStudentInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutStudentInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutStudentInput>
  }

  export type ScheduleScalarWhereInput = {
    AND?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    OR?: ScheduleScalarWhereInput[]
    NOT?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    id?: IntFilter<"Schedule"> | number
    studentId?: IntFilter<"Schedule"> | number
    day?: IntFilter<"Schedule"> | number
    slot?: IntFilter<"Schedule"> | number
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
  }

  export type StudentCreateWithoutTeacherInput = {
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStudentInput
    test_tuition?: Test_TuitionCreateNestedManyWithoutStudentInput
    test_school?: Test_SchoolCreateNestedManyWithoutStudentInput
    schedule?: ScheduleCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutTeacherInput = {
    id?: number
    userId: number
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    test_tuition?: Test_TuitionUncheckedCreateNestedManyWithoutStudentInput
    test_school?: Test_SchoolUncheckedCreateNestedManyWithoutStudentInput
    schedule?: ScheduleUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutTeacherInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutTeacherInput, StudentUncheckedCreateWithoutTeacherInput>
  }

  export type StudentCreateManyTeacherInputEnvelope = {
    data: StudentCreateManyTeacherInput | StudentCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutTeacherInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    clerkUserId: string
    role?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Student?: StudentCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTeacherInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    clerkUserId: string
    role?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Student?: StudentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTeacherInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
  }

  export type Test_TuitionCreateWithoutTeacherInput = {
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    student: StudentCreateNestedOneWithoutTest_tuitionInput
  }

  export type Test_TuitionUncheckedCreateWithoutTeacherInput = {
    id?: number
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    studentId: number
  }

  export type Test_TuitionCreateOrConnectWithoutTeacherInput = {
    where: Test_TuitionWhereUniqueInput
    create: XOR<Test_TuitionCreateWithoutTeacherInput, Test_TuitionUncheckedCreateWithoutTeacherInput>
  }

  export type Test_TuitionCreateManyTeacherInputEnvelope = {
    data: Test_TuitionCreateManyTeacherInput | Test_TuitionCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type StudentUpsertWithWhereUniqueWithoutTeacherInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutTeacherInput, StudentUncheckedUpdateWithoutTeacherInput>
    create: XOR<StudentCreateWithoutTeacherInput, StudentUncheckedCreateWithoutTeacherInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutTeacherInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutTeacherInput, StudentUncheckedUpdateWithoutTeacherInput>
  }

  export type StudentUpdateManyWithWhereWithoutTeacherInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutTeacherInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    id?: IntFilter<"Student"> | number
    userId?: IntFilter<"Student"> | number
    grade?: StringNullableFilter<"Student"> | string | null
    school?: StringNullableFilter<"Student"> | string | null
    board?: StringNullableFilter<"Student"> | string | null
    fees?: IntNullableFilter<"Student"> | number | null
    numberDaysAttendPerWeek?: IntNullableFilter<"Student"> | number | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    teacherId?: IntFilter<"Student"> | number
  }

  export type UserUpsertWithoutTeacherInput = {
    update: XOR<UserUpdateWithoutTeacherInput, UserUncheckedUpdateWithoutTeacherInput>
    create: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTeacherInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTeacherInput, UserUncheckedUpdateWithoutTeacherInput>
  }

  export type UserUpdateWithoutTeacherInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Student?: StudentUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Student?: StudentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type Test_TuitionUpsertWithWhereUniqueWithoutTeacherInput = {
    where: Test_TuitionWhereUniqueInput
    update: XOR<Test_TuitionUpdateWithoutTeacherInput, Test_TuitionUncheckedUpdateWithoutTeacherInput>
    create: XOR<Test_TuitionCreateWithoutTeacherInput, Test_TuitionUncheckedCreateWithoutTeacherInput>
  }

  export type Test_TuitionUpdateWithWhereUniqueWithoutTeacherInput = {
    where: Test_TuitionWhereUniqueInput
    data: XOR<Test_TuitionUpdateWithoutTeacherInput, Test_TuitionUncheckedUpdateWithoutTeacherInput>
  }

  export type Test_TuitionUpdateManyWithWhereWithoutTeacherInput = {
    where: Test_TuitionScalarWhereInput
    data: XOR<Test_TuitionUpdateManyMutationInput, Test_TuitionUncheckedUpdateManyWithoutTeacherInput>
  }

  export type TeacherCreateWithoutTest_tuitionInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    Student?: StudentCreateNestedManyWithoutTeacherInput
    user: UserCreateNestedOneWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutTest_tuitionInput = {
    id?: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Student?: StudentUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutTest_tuitionInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutTest_tuitionInput, TeacherUncheckedCreateWithoutTest_tuitionInput>
  }

  export type StudentCreateWithoutTest_tuitionInput = {
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: TeacherCreateNestedOneWithoutStudentInput
    user: UserCreateNestedOneWithoutStudentInput
    test_school?: Test_SchoolCreateNestedManyWithoutStudentInput
    schedule?: ScheduleCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutTest_tuitionInput = {
    id?: number
    userId: number
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacherId: number
    test_school?: Test_SchoolUncheckedCreateNestedManyWithoutStudentInput
    schedule?: ScheduleUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutTest_tuitionInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutTest_tuitionInput, StudentUncheckedCreateWithoutTest_tuitionInput>
  }

  export type TeacherUpsertWithoutTest_tuitionInput = {
    update: XOR<TeacherUpdateWithoutTest_tuitionInput, TeacherUncheckedUpdateWithoutTest_tuitionInput>
    create: XOR<TeacherCreateWithoutTest_tuitionInput, TeacherUncheckedCreateWithoutTest_tuitionInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutTest_tuitionInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutTest_tuitionInput, TeacherUncheckedUpdateWithoutTest_tuitionInput>
  }

  export type TeacherUpdateWithoutTest_tuitionInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Student?: StudentUpdateManyWithoutTeacherNestedInput
    user?: UserUpdateOneRequiredWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutTest_tuitionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Student?: StudentUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type StudentUpsertWithoutTest_tuitionInput = {
    update: XOR<StudentUpdateWithoutTest_tuitionInput, StudentUncheckedUpdateWithoutTest_tuitionInput>
    create: XOR<StudentCreateWithoutTest_tuitionInput, StudentUncheckedCreateWithoutTest_tuitionInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutTest_tuitionInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutTest_tuitionInput, StudentUncheckedUpdateWithoutTest_tuitionInput>
  }

  export type StudentUpdateWithoutTest_tuitionInput = {
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateOneRequiredWithoutStudentNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    test_school?: Test_SchoolUpdateManyWithoutStudentNestedInput
    schedule?: ScheduleUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutTest_tuitionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherId?: IntFieldUpdateOperationsInput | number
    test_school?: Test_SchoolUncheckedUpdateManyWithoutStudentNestedInput
    schedule?: ScheduleUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutTest_schoolInput = {
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: TeacherCreateNestedOneWithoutStudentInput
    user: UserCreateNestedOneWithoutStudentInput
    test_tuition?: Test_TuitionCreateNestedManyWithoutStudentInput
    schedule?: ScheduleCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutTest_schoolInput = {
    id?: number
    userId: number
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacherId: number
    test_tuition?: Test_TuitionUncheckedCreateNestedManyWithoutStudentInput
    schedule?: ScheduleUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutTest_schoolInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutTest_schoolInput, StudentUncheckedCreateWithoutTest_schoolInput>
  }

  export type StudentUpsertWithoutTest_schoolInput = {
    update: XOR<StudentUpdateWithoutTest_schoolInput, StudentUncheckedUpdateWithoutTest_schoolInput>
    create: XOR<StudentCreateWithoutTest_schoolInput, StudentUncheckedCreateWithoutTest_schoolInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutTest_schoolInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutTest_schoolInput, StudentUncheckedUpdateWithoutTest_schoolInput>
  }

  export type StudentUpdateWithoutTest_schoolInput = {
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateOneRequiredWithoutStudentNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    test_tuition?: Test_TuitionUpdateManyWithoutStudentNestedInput
    schedule?: ScheduleUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutTest_schoolInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherId?: IntFieldUpdateOperationsInput | number
    test_tuition?: Test_TuitionUncheckedUpdateManyWithoutStudentNestedInput
    schedule?: ScheduleUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutScheduleInput = {
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: TeacherCreateNestedOneWithoutStudentInput
    user: UserCreateNestedOneWithoutStudentInput
    test_tuition?: Test_TuitionCreateNestedManyWithoutStudentInput
    test_school?: Test_SchoolCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutScheduleInput = {
    id?: number
    userId: number
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacherId: number
    test_tuition?: Test_TuitionUncheckedCreateNestedManyWithoutStudentInput
    test_school?: Test_SchoolUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutScheduleInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutScheduleInput, StudentUncheckedCreateWithoutScheduleInput>
  }

  export type StudentUpsertWithoutScheduleInput = {
    update: XOR<StudentUpdateWithoutScheduleInput, StudentUncheckedUpdateWithoutScheduleInput>
    create: XOR<StudentCreateWithoutScheduleInput, StudentUncheckedCreateWithoutScheduleInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutScheduleInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutScheduleInput, StudentUncheckedUpdateWithoutScheduleInput>
  }

  export type StudentUpdateWithoutScheduleInput = {
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateOneRequiredWithoutStudentNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    test_tuition?: Test_TuitionUpdateManyWithoutStudentNestedInput
    test_school?: Test_SchoolUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutScheduleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherId?: IntFieldUpdateOperationsInput | number
    test_tuition?: Test_TuitionUncheckedUpdateManyWithoutStudentNestedInput
    test_school?: Test_SchoolUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type Test_TuitionCreateManyStudentInput = {
    id?: number
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    teacherId: number
  }

  export type Test_SchoolCreateManyStudentInput = {
    id?: number
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    test_status: boolean
  }

  export type ScheduleCreateManyStudentInput = {
    id?: number
    day: number
    slot: number
    createdAt?: Date | string
  }

  export type Test_TuitionUpdateWithoutStudentInput = {
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    teacher?: TeacherUpdateOneRequiredWithoutTest_tuitionNestedInput
  }

  export type Test_TuitionUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
  }

  export type Test_TuitionUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
  }

  export type Test_SchoolUpdateWithoutStudentInput = {
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    test_status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Test_SchoolUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    test_status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Test_SchoolUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    test_status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ScheduleUpdateWithoutStudentInput = {
    day?: IntFieldUpdateOperationsInput | number
    slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: IntFieldUpdateOperationsInput | number
    slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: IntFieldUpdateOperationsInput | number
    slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateManyTeacherInput = {
    id?: number
    userId: number
    grade?: string | null
    school?: string | null
    board?: string | null
    fees?: number | null
    numberDaysAttendPerWeek?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Test_TuitionCreateManyTeacherInput = {
    id?: number
    name: string
    syllabus: string
    date: Date | string
    marks_scored: number
    total_marks: number
    studentId: number
  }

  export type StudentUpdateWithoutTeacherInput = {
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    test_tuition?: Test_TuitionUpdateManyWithoutStudentNestedInput
    test_school?: Test_SchoolUpdateManyWithoutStudentNestedInput
    schedule?: ScheduleUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test_tuition?: Test_TuitionUncheckedUpdateManyWithoutStudentNestedInput
    test_school?: Test_SchoolUncheckedUpdateManyWithoutStudentNestedInput
    schedule?: ScheduleUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    board?: NullableStringFieldUpdateOperationsInput | string | null
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    numberDaysAttendPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Test_TuitionUpdateWithoutTeacherInput = {
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    student?: StudentUpdateOneRequiredWithoutTest_tuitionNestedInput
  }

  export type Test_TuitionUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
  }

  export type Test_TuitionUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    marks_scored?: IntFieldUpdateOperationsInput | number
    total_marks?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
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