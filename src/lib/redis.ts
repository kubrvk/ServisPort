import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  }
});

/**
 * Distributed Lock acquisition for preventing double-booking on exact appointment slots
 */
export async function acquireSlotLock(date: string, time: string, ttlSeconds = 15): Promise<string | null> {
  const lockKey = `lock:slot:${date}:${time}`;
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const result = await redis.set(lockKey, token, 'EX', ttlSeconds, 'NX');
  return result === 'OK' ? token : null;
}

export async function releaseSlotLock(date: string, time: string, token: string): Promise<boolean> {
  const lockKey = `lock:slot:${date}:${time}`;
  const luaScript = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;
  const res = await redis.eval(luaScript, 1, lockKey, token);
  return res === 1;
}
