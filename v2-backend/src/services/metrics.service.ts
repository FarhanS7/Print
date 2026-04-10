/**
 * Service for structured observability and performance tracking.
 * Logs key events in the try-on lifecycle for monitoring and analytics.
 */
export class MetricsService {
  /**
   * Logs a standardized metric event for a worker stage.
   */
  static logStage(data: {
    sessionId: string;
    userId: string;
    stage: string;
    durationMs: number;
    provider?: string;
    outcome: 'success' | 'failure';
    errorCode?: string;
  }) {
    const metricEntry = {
      timestamp: new Date().toISOString(),
      service: 'tryon-worker',
      ...data
    };

    // MVP: Structured JSON logging to console
    // In production, this would be piped to a logging aggregator (ELK, Datadog, etc.)
    console.log(`[METRIC] ${JSON.stringify(metricEntry)}`);

    // Optional: Emit to a metrics collector like Prometheus/StatsD
  }

  /**
   * Logs overall API metrics.
   */
  static logRequest(name: string, data: any) {
    console.log(`[API_METRIC] ${name}: ${JSON.stringify(data)}`);
  }
}
