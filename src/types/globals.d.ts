export {}

// Create a type for the roles
export type Roles = 'TEACHER' | 'STUDENT'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}