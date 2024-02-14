'use client'

import BaseLayout from '@/containers/Layout'

import { MainViewState } from '@/constants/screens'

import { useMainViewState } from '@/hooks/useMainViewState'

import HubScreen from '@/screens/Hub'
import LocalServerScreen from '@/screens/LocalServer'
import SettingsScreen from '@/screens/Settings'
import ThreadScreen from '@/screens/Thread'

export default function Page() {
  const { mainViewState } = useMainViewState()

  let children = null
  switch (mainViewState) {
    case MainViewState.Hub:
      children = <HubScreen />
      break

    case MainViewState.Settings:
      children = <SettingsScreen />
      break

    case MainViewState.LocalServer:
      children = <LocalServerScreen />
      break

    default:
      children = <ThreadScreen />
      break
  }

  return <BaseLayout>{children}</BaseLayout>
}
