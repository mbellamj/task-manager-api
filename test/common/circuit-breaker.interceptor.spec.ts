import { CircuitBreakerInterceptor } from '@/common/interceptors/circuit-breaker/circuit-breaker.interceptor';

describe('CircuitBreakerInterceptor', () => {
  it('should be defined', () => {
    expect(new CircuitBreakerInterceptor()).toBeDefined();
  });
});
