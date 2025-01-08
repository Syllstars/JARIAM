const notificationsService = require('../../src/services/notificationsService');

describe('notificationsService', () => {
  it('should send notification successfully', async () => {
    const result = await notificationsService.sendNotification({
      to: 'jariam@gmail.com',
      message: 'Test notification',
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe('Notification send successfully');
  });
  it('should return an error for missing parameters', async () => {
    const result = await notificationsService.sendNotification({
      to: '',                     // Missing the "to" parameter
      message: 'Test notification',
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe('Recipient is required');
  });
});
