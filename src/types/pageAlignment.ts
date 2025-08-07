import type { PageAlignment } from '../pages/BasePage'

export interface PageAlignmentContextType {
    alignments: Record<string, PageAlignment>
    getAlignment: (pageKey: string) => PageAlignment
    setAlignment: (pageKey: string, alignment: PageAlignment) => void
    toggleAlignment: (pageKey: string) => void
}
