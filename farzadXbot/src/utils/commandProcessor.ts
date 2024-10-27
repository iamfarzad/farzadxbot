interface CommandResponse {
  message: string;
  actions?: Array<{
    type: string;
    parameters: Record<string, unknown>;
    status: 'pending' | 'completed' | 'failed';
  }>;
}

export const processChatCommand = async (command: string): Promise<CommandResponse> => {
  // Simple command processing logic
  if (command.startsWith('/')) {
    const [cmd, ...args] = command.slice(1).split(' ');
    
    switch (cmd) {
      case 'help':
        return {
          message: 'Available commands:\n/help - Show this help message\n/status - Check system status',
        };
      
      case 'status':
        return {
          message: 'System is operational',
          actions: [
            {
              type: 'checkStatus',
              parameters: {},
              status: 'completed',
            },
          ],
        };
      
      default:
        return {
          message: `Unknown command: ${cmd}`,
          actions: [
            {
              type: 'error',
              parameters: { command: cmd },
              status: 'failed',
            },
          ],
        };
    }
  }

  // Regular message processing
  return {
    message: `Processing: ${command}`,
    actions: [
      {
        type: 'process',
        parameters: { input: command },
        status: 'pending',
      },
    ],
  };
};