import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  
  await expect(page).toHaveTitle(/Fireblocks/)
  await expect(page.getByRole('heading', { name: /Welcome to Fireblocks/ })).toBeVisible()
})

test('navigation works', async ({ page }) => {
  await page.goto('/')
  
  const loginButton = page.getByRole('link', { name: 'Login' })
  await expect(loginButton).toBeVisible()
  
  await loginButton.click()
  await expect(page).toHaveURL('/login')
  await expect(page.getByRole('heading', { name: /Sign in/ })).toBeVisible()
})

test('demo login flow', async ({ page }) => {
  await page.goto('/login')
  
  const demoButton = page.getByRole('button', { name: /use demo account/ })
  await expect(demoButton).toBeVisible()
  
  await demoButton.click()
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByRole('heading', { name: /Dashboard/ })).toBeVisible()
})

test('wallet connection', async ({ page }) => {
  // Login first
  await page.goto('/login')
  await page.getByRole('button', { name: /use demo account/ }).click()
  
  // Navigate to wallet page
  await page.getByRole('link', { name: 'Wallet' }).click()
  await expect(page).toHaveURL('/wallet')
  
  // Connect wallet
  const connectButton = page.getByRole('button', { name: /Connect Wallet/ }).first()
  await connectButton.click()
  
  // Check wallet is connected
  await expect(page.getByText(/Wallet Details/)).toBeVisible()
  await expect(page.getByText(/0x/)).toBeVisible()
})