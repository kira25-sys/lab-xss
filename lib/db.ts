// lib/db.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Configuraciones adicionales para Docker
  ssl: false, // En desarrollo local no necesitas SSL
})

export default pool