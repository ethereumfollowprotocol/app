import Redis from 'ioredis' // Import ioredis

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

// Initialize ioredis client
const redisClient = new Redis(redisUrl, {
  connectTimeout: 10000, // 10 seconds
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000) // Max 2 seconds
  },
})

redisClient.on('error', (err) => console.error('IORedis Client Error', err))
redisClient.on('connect', () => console.log('IORedis connected successfully.')) // Optional: Log successful connection

export default redisClient
