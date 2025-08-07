import React, { useState } from 'react'
import type { ReactNode } from 'react'
import type { PageAlignment } from '../pages/BasePage'
import type { PageAlignmentContextType } from '../types/pageAlignment'
import { PageAlignmentContext } from './pageAlignmentContext'

interface PageAlignmentProviderProps {
    children: ReactNode
}

export const PageAlignmentProvider: React.FC<PageAlignmentProviderProps> = ({ children }) => {
    const [alignments, setAlignments] = useState<Record<string, PageAlignment>>({
        Home: 'center',
        Chat: 'left',
        Teams: 'left',
        Apps: 'center',
        Settings: 'left'
    })

    const getAlignment = (pageKey: string): PageAlignment => {
        return alignments[pageKey] || 'center'
    }

    const setAlignment = (pageKey: string, alignment: PageAlignment) => {
        setAlignments(prev => ({
            ...prev,
            [pageKey]: alignment
        }))
    }

    const toggleAlignment = (pageKey: string) => {
        const currentAlignment = getAlignment(pageKey)
        const newAlignment: PageAlignment = currentAlignment === 'center' ? 'left' : 'center'
        setAlignment(pageKey, newAlignment)
    }

    const value: PageAlignmentContextType = {
        alignments,
        getAlignment,
        setAlignment,
        toggleAlignment
    }

    return (
        <PageAlignmentContext.Provider value={value}>
            {children}
        </PageAlignmentContext.Provider>
    )
}
