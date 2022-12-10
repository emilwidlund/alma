import { RedisPubSub } from 'graphql-redis-subscriptions';

export const pubSub = new RedisPubSub({
    connection: process.env.ALMA_REDIS_URL
});
