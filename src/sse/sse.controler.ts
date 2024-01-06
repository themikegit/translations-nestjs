// sse.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from 'src/task/task.service';

@Controller('sse')
export class SseController {
  constructor(private taskService: TaskService) {}

  @Get()
  sse(@Res() response): void {
    response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    this.taskService.taskEvenet.subscribe({
      next: (taskCreated) => {
        response.write(`data: ${JSON.stringify(taskCreated)}\n\n`);
      },
      error: (error) => {
        console.error('SSE Error:', error);
        response.end();
      },
      complete: () => {
        console.log('SSE Connection Closed');
        response.end();
      },
    });

    response.on('close', () => {
      console.log('SSE Connection Closed by Client');
      response.end();
    });
  }
}
