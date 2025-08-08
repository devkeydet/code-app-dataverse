import React, { useEffect, useMemo, useState } from 'react'
import { Button, Title2, Body1, Spinner, tokens, MessageBar, MessageBarBody, DataGrid, DataGridHeader, DataGridRow, DataGridHeaderCell, DataGridBody, DataGridCell, createTableColumn, type TableColumnDefinition } from '@fluentui/react-components'
import { contactsService } from '../Services/contactsService'
import { Office365UsersService } from '../Services/Office365UsersService'
import { dataSourcesInfo } from '../../.power/appschemas/dataSourcesInfo'
import { usePowerRuntime } from '../hooks/usePowerRuntime'
import type { contacts as Contact } from '../Models/contactsModel'

function toPlainError(err: unknown) {
  if (err instanceof Error) {
    return { name: err.name, message: err.message, stack: err.stack }
  }
  return err
}

function stringify(value: unknown) {
  return JSON.stringify(
    value,
    (_key, val) => {
      if (val instanceof Error) return toPlainError(val)
      // IOperationResult.error may be an Error; also ensure undefined becomes null in JSON view
      if (typeof val === 'undefined') return null
      return val
    },
    2
  )
}

const DebugPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [resultJson, setResultJson] = useState<string>('')
  const invocation = 'contactsService.getAll({ select: ["contactid","fullname","emailaddress1","jobtitle"], orderBy: ["fullname asc"], top: 50 })'
  const [lastRunAt, setLastRunAt] = useState<string>('')
  const [runtimeInfoJson, setRuntimeInfoJson] = useState<string>('')
  const [o365Json, setO365Json] = useState<string>('')
  const { isReady, error: initError, initializedAt } = usePowerRuntime()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactsError, setContactsError] = useState<string | null>(null)

  const run = async () => {
    setLoading(true)
    setContactsError(null)
    setResultJson('')
    setLastRunAt(new Date().toLocaleString())
    try {
      const result = await contactsService.getAll({
        select: ['contactid', 'fullname', 'emailaddress1', 'jobtitle'],
        orderBy: ['fullname asc'],
        top: 50,
      })
      setResultJson(stringify(result))
      if (result?.success) {
        const value: Contact[] = (result.data as unknown as Contact[]) ?? []
        setContacts(value)
      } else {
        const message = (result?.error && (result.error as unknown as Error).message) || (typeof result?.error === 'string' ? result.error : 'Failed to load contacts')
        setContacts([])
        setContactsError(message)
      }
    } catch (err) {
      setContacts([])
      setContactsError(err instanceof Error ? err.message : 'Failed to load contacts')
      setResultJson(stringify({ success: false, error: toPlainError(err) }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isReady) return
    // Auto run once when runtime is ready
    run()
    // Also surface runtime hydration info and a connector sanity check
    // Augment window typing locally
    const envId = (globalThis as { POWERAPPS_ENVIRONMENT_ID?: string }).POWERAPPS_ENVIRONMENT_ID ?? null
    const runtime = {
      environmentId: envId,
      dataSourcesKnown: Object.keys(dataSourcesInfo ?? {}),
      contactsMeta: 'contacts' in dataSourcesInfo ? (dataSourcesInfo as { contacts: unknown }).contacts : null,
      accountsMeta: 'accounts' in dataSourcesInfo ? (dataSourcesInfo as { accounts: unknown }).accounts : null,
    }
    setRuntimeInfoJson(stringify(runtime))
      ; (async () => {
        try {
          const profile = await Office365UsersService.MyProfile()
          setO365Json(stringify(profile))
        } catch (err) {
          setO365Json(stringify({ success: false, error: toPlainError(err) }))
        }
      })()
  }, [isReady])

  const header = useMemo(
    () => (
      <div style={{
        position: 'sticky',
        top: 0,
        background: tokens.colorNeutralBackground1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        zIndex: 1,
      }}>
        <Title2>Dataverse Debug</Title2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {loading && <Spinner size="tiny" />}
          <Button appearance="primary" onClick={run} disabled={loading}>
            {loading ? 'Running…' : 'Run'}
          </Button>
        </div>
      </div>
    ),
    [loading]
  )

  const columns = useMemo<TableColumnDefinition<Contact>[]>(
    () => [
      createTableColumn<Contact>({
        columnId: 'fullname',
        renderHeaderCell: () => 'Full Name',
        renderCell: (item) => item.fullname ?? '',
        compare: (a, b) => (a.fullname ?? '').localeCompare(b.fullname ?? ''),
      }),
      createTableColumn<Contact>({
        columnId: 'email',
        renderHeaderCell: () => 'Email',
        renderCell: (item) => item.emailaddress1 ?? '',
        compare: (a, b) => (a.emailaddress1 ?? '').localeCompare(b.emailaddress1 ?? ''),
      }),
      createTableColumn<Contact>({
        columnId: 'jobtitle',
        renderHeaderCell: () => 'Job Title',
        renderCell: (item) => item.jobtitle ?? '',
        compare: (a, b) => (a.jobtitle ?? '').localeCompare(b.jobtitle ?? ''),
      }),
    ],
    []
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
      {header}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {!isReady && (
          <Body1>
            Power runtime not initialized yet{initializedAt ? ` (last: ${initializedAt})` : ''}{initError ? `: ${initError}` : '…'}
          </Body1>
        )}
        <Body1>
          This page invokes the generated service to help diagnose Dataverse connectivity.
        </Body1>

        <div>
          <Title2>Runtime Status</Title2>
          <pre style={{
            background: tokens.colorNeutralBackground2,
            border: `1px solid ${tokens.colorNeutralStroke2}`,
            borderRadius: 6,
            padding: 12,
            marginTop: 8,
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: '30vh'
          }}>{runtimeInfoJson || 'Loading…'}</pre>
        </div>

        <div>
          <Title2>Calling</Title2>
          <pre style={{
            background: tokens.colorNeutralBackground2,
            border: `1px solid ${tokens.colorNeutralStroke2}`,
            borderRadius: 6,
            padding: 12,
            marginTop: 8,
            overflowX: 'auto'
          }}>
            {`import { contactsService } from "../Services/contactsService";
await ${invocation};`}
          </pre>
          {lastRunAt && (
            <Body1 style={{ marginTop: 8, color: tokens.colorNeutralForeground2 }}>
              Last run: {lastRunAt}
            </Body1>
          )}
        </div>

        <div>
          <Title2>Contacts Preview</Title2>
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Spinner size="tiny" /> <Body1>Loading contacts…</Body1>
            </div>
          )}
          {!loading && contactsError && (
            <MessageBar intent="error"><MessageBarBody>{contactsError}</MessageBarBody></MessageBar>
          )}
          {!loading && !contactsError && contacts.length === 0 && (
            <MessageBar intent="info"><MessageBarBody>No contacts found.</MessageBarBody></MessageBar>
          )}
          {!loading && !contactsError && contacts.length > 0 && (
            <div style={{ border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: 6, overflow: 'hidden' }}>
              <DataGrid
                items={contacts}
                columns={columns}
                sortable
                getRowId={(c: Contact) => c.contactid ?? crypto.randomUUID()}
                aria-label="Contacts data grid"
              >
                <DataGridHeader>
                  <DataGridRow>
                    {({ renderHeaderCell }) => (
                      <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                    )}
                  </DataGridRow>
                </DataGridHeader>
                <DataGridBody<Contact>>
                  {({ item, rowId }) => (
                    <DataGridRow<Contact> key={rowId}>
                      {({ renderCell }) => (
                        <DataGridCell>{renderCell(item)}</DataGridCell>
                      )}
                    </DataGridRow>
                  )}
                </DataGridBody>
              </DataGrid>
            </div>
          )}
        </div>

        <div>
          <Title2>Raw Result</Title2>
          <pre style={{
            background: tokens.colorNeutralBackground2,
            border: `1px solid ${tokens.colorNeutralStroke2}`,
            borderRadius: 6,
            padding: 12,
            marginTop: 8,
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: '50vh'
          }}>{resultJson || (loading ? 'Loading…' : 'No result yet')}</pre>
        </div>

        <div>
          <Title2>Office 365 Connector Check</Title2>
          <pre style={{
            background: tokens.colorNeutralBackground2,
            border: `1px solid ${tokens.colorNeutralStroke2}`,
            borderRadius: 6,
            padding: 12,
            marginTop: 8,
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: '40vh'
          }}>{o365Json || 'Loading…'}</pre>
        </div>
      </div>
    </div>
  )
}

export default DebugPage
