import { test, expect } from '@playwright/experimental-ct-react';
import React, { useState } from 'react';
test('mount ', async ({ page, mount }) => {
  const component = await mount(<Button />);
  await expect(component).toContainText('Submit');
});
