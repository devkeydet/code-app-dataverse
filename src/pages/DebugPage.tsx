import React, { useEffect, useMemo, useState } from 'react'
import { Button, Title2, Body1, Spinner, tokens } from '@fluentui/react-components'
import { contactsService } from '../Services/contactsService'
import { Office365UsersService } from '../Services/Office365UsersService'
import { dataSourcesInfo } from '../../.power/appschemas/dataSourcesInfo'

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
  const invocation = 'contactsService.getAll()'
  const [lastRunAt, setLastRunAt] = useState<string>('')
  const [runtimeInfoJson, setRuntimeInfoJson] = useState<string>('')
  const [o365Json, setO365Json] = useState<string>('')

  const run = async () => {
    setLoading(true)
    setResultJson('')
    setLastRunAt(new Date().toLocaleString())
    try {
      // Keep it minimal: no options, call exactly what we want to validate
      const result = await contactsService.getAll()
      setResultJson(stringify(result))
    } catch (err) {
      setResultJson(stringify({ success: false, error: toPlainError(err) }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Auto run once on mount
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
  }, [])

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
      {header}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
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
