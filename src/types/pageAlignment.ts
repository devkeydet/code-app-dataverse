// Define PageAlignment type locally since it's no longer in BasePage
export type PageAlignment = 'left' | 'center' | 'right'

export interface PageAlignmentContextType {
    alignments: Record<string, PageAlignment>
    getAlignment: (pageKey: string) => PageAlignment
    setAlignment: (pageKey: string, alignment: PageAlignment) => void
    toggleAlignment: (pageKey: string) => void
}
