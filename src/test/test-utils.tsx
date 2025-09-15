import React from 'react'
import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { RootStore } from '@stores/RootStore'

interface AllTheProvidersProps {
  children: React.ReactNode
  initialEntries?: string[]
  store?: RootStore
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ 
  children, 
  initialEntries = ['/'],
  store = new RootStore()
}) => {
  return (
    <StoreProvider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </StoreProvider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[]
  store?: RootStore
}

const customRender = (
  ui: ReactElement,
  { initialEntries, store, ...renderOptions }: CustomRenderOptions = {}
) =>
  render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} initialEntries={initialEntries} store={store} />
    ),
    ...renderOptions,
  })

export * from '@testing-library/react'
export { customRender as render }