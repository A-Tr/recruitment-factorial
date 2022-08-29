import { Get, Controller, Route, Tags, Security, Query, Post, Body } from 'tsoa';
import { inject, injectable } from 'tsyringe';
import { logger } from '../../common/Logger';
import { MetricsService } from './MetricsService';
import { Metric, MetricsGroupBy } from './model/Metric';

@injectable()
@Route('metrics')
@Tags('Metrics')
export class MetricsController extends Controller {
  constructor(@inject(MetricsService) private service: MetricsService) {
    super();
  }
  
  /**
   * Retrieves metrics grouped by average
   */
  @Get('/')
  @Security('jwt')
  async getMetricsByNameAvg(@Query() groupBy: MetricsGroupBy, @Query() from?: number, @Query() upTo?: number) {
    return this.service.getMetricsByNameAvg(groupBy, from, upTo)
  }

  /**
   * Retrieves metrics grouped by average
   */
   @Post('/')
   @Security('jwt')
   async createMetric(@Body() payload: Metric) {
     return this.service.createMetric(payload)
   }
}
