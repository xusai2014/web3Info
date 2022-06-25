import { useMemo } from 'react'
import { CONTRACTS } from '../config/contracts'

export const useContracts = () => useMemo(() => CONTRACTS, [])
