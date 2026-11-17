export interface ReadinessAssessment {
  readinessPercentage: number;
  fitnessScore: number;
  formScore: number;
  status: string;
  recommendation: string;
}

export interface CalculatedDayMetric {
  date: string;
  tss: number;
  ctl: number;
  atl: number;
  tsb: number;
}

export interface AnalyticsResponse {
  readiness: ReadinessAssessment;
  metrics: CalculatedDayMetric[];
}