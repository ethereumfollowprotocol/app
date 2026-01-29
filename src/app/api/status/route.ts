import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Status endpoint
 * Returns overall system status and metrics
 */
export async function GET() {
  try {
    const status = {
      status: 'operational',
      version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'dev',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      services: {
        api: 'operational',
        frontend: 'operational',
      },
      metrics: {
        uptime: process.uptime(),
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        },
      },
      links: {
        documentation: 'https://docs.efp.app',
        api: '/api',
        health: '/api/health',
      },
    }

    return NextResponse.json(status, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
      }
    )
  }
}
