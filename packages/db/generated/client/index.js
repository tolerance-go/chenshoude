Object.defineProperty(exports, '__esModule', { value: true })

const {
   PrismaClientKnownRequestError,
   PrismaClientUnknownRequestError,
   PrismaClientRustPanicError,
   PrismaClientInitializationError,
   PrismaClientValidationError,
   NotFoundError,
   decompressFromBase64,
   getPrismaClient,
   sqltag,
   empty,
   join,
   raw,
   Decimal,
   Debug,
   objectEnumValues,
   makeStrictEnum,
   Extensions,
   warnOnce,
   defineDmmfProperty,
} = require('./runtime/library')

const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.15.0
 * Query Engine version: 8fbc245156db7124f997f4cecdd8d1219e360944
 */
Prisma.prismaVersion = {
   client: '4.15.0',
   engine: '8fbc245156db7124f997f4cecdd8d1219e360944',
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
   DbNull: objectEnumValues.classes.DbNull,
   JsonNull: objectEnumValues.classes.JsonNull,
   AnyNull: objectEnumValues.classes.AnyNull,
}

const path = require('path')

/**
 * Enums
 */

exports.Prisma.JsonNullValueFilter = {
   DbNull: Prisma.DbNull,
   JsonNull: Prisma.JsonNull,
   AnyNull: Prisma.AnyNull,
}

exports.Prisma.NullableJsonNullValueInput = {
   DbNull: Prisma.DbNull,
   JsonNull: Prisma.JsonNull,
}

exports.Prisma.ProjectScalarFieldEnum = {
   id: 'id',
   name: 'name',
   pageHtml: 'pageHtml',
   nodeData: 'nodeData',
   settings: 'settings',
   createdAt: 'createdAt',
   updatedAt: 'updatedAt',
   userId: 'userId',
}

exports.Prisma.SortOrder = {
   asc: 'asc',
   desc: 'desc',
}

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
   ReadUncommitted: 'ReadUncommitted',
   ReadCommitted: 'ReadCommitted',
   RepeatableRead: 'RepeatableRead',
   Serializable: 'Serializable',
})

exports.Prisma.UserScalarFieldEnum = {
   id: 'id',
   email: 'email',
   username: 'username',
   password: 'password',
   emailToken: 'emailToken',
   pluginToken: 'pluginToken',
   confirmed: 'confirmed',
   createdAt: 'createdAt',
   updatedAt: 'updatedAt',
}

exports.Prisma.ModelName = {
   User: 'User',
   Project: 'Project',
}
/**
 * Create the Client
 */
const config = {
   generator: {
      name: 'client',
      provider: {
         fromEnvVar: null,
         value: 'prisma-client-js',
      },
      output: {
         value: '/Users/yarnb/mictooon/packages/db/generated/client',
         fromEnvVar: null,
      },
      config: {
         engineType: 'library',
      },
      binaryTargets: [
         {
            fromEnvVar: null,
            value: 'darwin',
            native: true,
         },
      ],
      previewFeatures: [],
      isCustomOutput: true,
   },
   relativeEnvPaths: {
      rootEnvPath: '../../.env',
      schemaEnvPath: '../../.env',
   },
   relativePath: '../../prisma',
   clientVersion: '4.15.0',
   engineVersion: '8fbc245156db7124f997f4cecdd8d1219e360944',
   datasourceNames: ['db'],
   activeProvider: 'mysql',
   dataProxy: false,
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
   config.dirname = path.join(process.cwd(), 'generated/client')
   config.isBundled = true
}

config.runtimeDataModel = JSON.parse(
   '{"models":{"User":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"username","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"emailToken","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"pluginToken","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"confirmed","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"project","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Project","relationName":"ProjectToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Project":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"pageHtml","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"nodeData","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"settings","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"ProjectToUser","relationFromFields":["userId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{},"types":{}}',
)
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)

const { warnEnvConflicts } = require('./runtime/library')

warnEnvConflicts({
   rootEnvPath:
      config.relativeEnvPaths.rootEnvPath &&
      path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
   schemaEnvPath:
      config.relativeEnvPaths.schemaEnvPath &&
      path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath),
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

path.join(__dirname, 'libquery_engine-darwin.dylib.node')
path.join(process.cwd(), 'generated/client/libquery_engine-darwin.dylib.node')
path.join(__dirname, 'schema.prisma')
path.join(process.cwd(), 'generated/client/schema.prisma')
