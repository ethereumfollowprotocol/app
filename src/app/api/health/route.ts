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
    const apiCheck = checkAPIHealth()
    const memoryCheck = checkMemoryHealth()
    
    const responseTime = Date.now() - startTime

    const checks = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      status: 'healthy',
      version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'dev',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        api: apiCheck,
        memory: memoryCheck,
      },
      responseTime,
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
 * TODO: Replace with actual API health verification once external APIs are integrated
 * This is a placeholder that will be updated to check actual API endpoints
 */
function checkAPIHealth() {
  try {
    // Basic availability check - will be replaced with actual API calls
    // when external integrations (Alchemy, Helius, etc.) are implemented
    return {
      healthy: true,
      note: 'Placeholder - will verify external API connections when integrated',
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
