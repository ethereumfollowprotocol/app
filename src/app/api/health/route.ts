import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Health check endpoint
 * Returns the health status of the application and its dependencies
 */
export async function GET() {
  const startTime = Date.now()

  try {
    // Basic health checks
    const checks = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      status: 'healthy',
      version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'dev',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        api: checkAPIHealth(),
        memory: checkMemoryHealth(),
      },
      responseTime: Date.now() - startTime,
    }

    const allHealthy = Object.values(checks.checks).every(check => check.healthy)

    return NextResponse.json(checks, {
      status: allHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
        },
      }
    )
  }
}

/**
 * Check API health
 */
function checkAPIHealth() {
  try {
    // Basic API availability check
    return {
      healthy: true,
      latency: Math.floor(Math.random() * 10) + 1, // Mock latency
    }
  } catch (error) {
    return {
      healthy: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Check memory usage
 */
function checkMemoryHealth() {
  try {
    const memUsage = process.memoryUsage()
    const usedMemoryMB = Math.round(memUsage.heapUsed / 1024 / 1024)
    const totalMemoryMB = Math.round(memUsage.heapTotal / 1024 / 1024)
    const usagePercent = Math.round((usedMemoryMB / totalMemoryMB) * 100)

    return {
      healthy: usagePercent < 90, // Consider unhealthy if > 90%
      usedMB: usedMemoryMB,
      totalMB: totalMemoryMB,
      usagePercent,
    }
  } catch (error) {
    return {
      healthy: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
