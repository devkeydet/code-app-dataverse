import { useContext } from 'react'
import { PageAlignmentContext } from '../contexts/pageAlignmentContext'
import type { PageAlignmentContextType } from '../types/pageAlignment'

export const usePageAlignment = (): PageAlignmentContextType => {
    const context = useContext(PageAlignmentContext)
    if (!context) {
        throw new Error('usePageAlignment must be used within a PageAlignmentProvider')
    }
    return context
}
