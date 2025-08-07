import { createContext } from 'react'
import type { PageAlignmentContextType } from '../types/pageAlignment'

export const PageAlignmentContext = createContext<PageAlignmentContextType | undefined>(undefined)
